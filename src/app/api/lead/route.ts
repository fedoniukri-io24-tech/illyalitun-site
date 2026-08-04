import { NextRequest, NextResponse } from 'next/server'
import { SERVICES } from '../../brand'

export const runtime = 'nodejs'

const MAX_NAME = 120
const MAX_PHONE = 32
const MAX_COMMENT = 2000
const MAX_META = 500

function clean(value: unknown, max = 300) {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function serviceFromPath(pathname: string) {
  const path = pathname.split('?')[0].replace(/\/$/, '') || '/'
  if (path === '/') return { slug: 'home', label: 'Головна (загальна заявка)' }
  const match = SERVICES.find((s) => s.href === path || path.startsWith(s.href + '/'))
  if (match) return { slug: match.slug, label: match.title }
  return { slug: path, label: path }
}

function formatUaPhone(raw: string) {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('380')) {
    // ok
  } else if (digits.startsWith('80')) {
    digits = `3${digits}`
  } else if (digits.startsWith('0')) {
    digits = `38${digits}`
  } else if (digits.length > 0) {
    digits = `380${digits}`
  }
  digits = digits.slice(0, 12)
  return digits
}

function formatKyivTime(date = new Date()) {
  // Europe/Kyiv — normal human format for UA
  const parts = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value || ''

  return `${get('day')}.${get('month')}.${get('year')}, ${get('hour')}:${get('minute')}:${get('second')} (Київ)`
}

function line(label: string, value: string) {
  if (!value) return `• <b>${escapeHtml(label)}:</b> —`
  return `• <b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`
}

function buildMessage(payload: {
  name: string
  phone: string
  comment: string
  serviceLabel: string
  formSource: string
  utm: Record<string, string>
  timeKyiv: string
}) {
  const utmLines = Object.entries(payload.utm)
    .filter(([, v]) => v)
    .map(([k, v]) => line(k, v))
    .join('\n')

  return [
    `🆕 <b>Нова заявка з сайту</b>`,
    ``,
    `👤 <b>Контакт</b>`,
    line('Імʼя', payload.name),
    line('Телефон', payload.phone),
    line('Коментар', payload.comment || '—'),
    ``,
    `🎯 <b>Послуга</b>`,
    line('Послуга', payload.serviceLabel),
    line('Джерело форми', payload.formSource),
    ``,
    `🏷 <b>UTM / мітки</b>`,
    utmLines || '• немає',
    ``,
    `🕒 <b>Час</b>`,
    line('Київ', payload.timeKyiv),
  ].join('\n')
}

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing')
    return NextResponse.json({ ok: false, error: 'server_misconfigured' }, { status: 500 })
  }

  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  // Honeypot
  if (clean(body.website, 80)) {
    return NextResponse.json({ ok: true })
  }

  const name = clean(body.name, MAX_NAME)
  const phone = clean(body.phone, MAX_PHONE)
  const comment = clean(body.comment, MAX_COMMENT)
  const pagePath = clean(body.pagePath, MAX_META) || '/'
  const pageUrl = clean(body.pageUrl, MAX_META)
  const formSource = clean(body.formSource, 80) || 'unknown'

  const consent = body.consent === true
  const digits = formatUaPhone(phone)

  if (name.length < 2 || digits.length !== 12 || !consent) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 })
  }

  const utmKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'gclid',
    'fbclid',
    'ttclid',
    'msclkid',
    'ref',
  ] as const

  const utmRaw = (body.utm && typeof body.utm === 'object' ? body.utm : {}) as Record<
    string,
    unknown
  >
  const utm: Record<string, string> = {}
  for (const key of utmKeys) {
    const fromBody = clean(utmRaw[key], 180)
    let fromUrl = ''
    if (pageUrl) {
      try {
        fromUrl = clean(new URL(pageUrl).searchParams.get(key) || '', 180)
      } catch {
        fromUrl = ''
      }
    }
    const value = fromBody || fromUrl
    if (value) utm[key] = value
  }

  for (const [key, value] of Object.entries(utmRaw)) {
    if (key.startsWith('utm_') && !utm[key]) {
      const v = clean(value, 180)
      if (v) utm[key] = v
    }
  }

  const service =
    typeof body.serviceLabel === 'string' && body.serviceLabel.trim()
      ? { label: clean(body.serviceLabel, 160) }
      : serviceFromPath(pagePath)

  const text = buildMessage({
    name,
    phone,
    comment,
    serviceLabel: service.label,
    formSource,
    utm,
    timeKyiv: formatKyivTime(),
  })

  const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`
  const tgRes = await fetch(tgUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })

  if (!tgRes.ok) {
    const errText = await tgRes.text().catch(() => '')
    console.error('Telegram API error', tgRes.status, errText)
    return NextResponse.json({ ok: false, error: 'telegram_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
