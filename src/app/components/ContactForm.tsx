'use client'

import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SERVICES } from '../brand'
import styles from './ContactSection.module.css'

type FormState = {
  name: string
  phone: string
  instagram: string
  telegram: string
  comment: string
  consent: boolean
  website: string // honeypot
}

type Status = 'idle' | 'loading' | 'success' | 'error'

/** Format UA phone as +380 XX XXX XX XX */
function formatUaPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '')

  if (digits.startsWith('380')) {
    // keep
  } else if (digits.startsWith('80')) {
    digits = `3${digits}`
  } else if (digits.startsWith('0')) {
    digits = `38${digits}`
  } else if (digits.length > 0) {
    digits = `380${digits}`
  }

  digits = digits.slice(0, 12)
  const local = digits.slice(3)

  let out = '+380'
  if (local.length > 0) out += ` ${local.slice(0, 2)}`
  if (local.length > 2) out += ` ${local.slice(2, 5)}`
  if (local.length > 5) out += ` ${local.slice(5, 7)}`
  if (local.length > 7) out += ` ${local.slice(7, 9)}`
  return out
}

function phoneDigits(phone: string) {
  return phone.replace(/\D/g, '')
}

/** Keep @handle — strip spaces/invalid chars, ensure single leading @ */
function formatHandle(raw: string): string {
  const cleaned = raw.replace(/^@+/, '').replace(/[^\w.]/g, '')
  if (!cleaned) return raw.startsWith('@') && raw.length === 1 ? '@' : ''
  return `@${cleaned.slice(0, 30)}`
}

function collectUtm() {
  if (typeof window === 'undefined') return {} as Record<string, string>
  const params = new URLSearchParams(window.location.search)
  const keys = [
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
  ]
  const out: Record<string, string> = {}
  for (const key of keys) {
    const value = params.get(key)
    if (value) out[key] = value
  }

  // restore from session if landing UTMs were stripped
  try {
    const saved = sessionStorage.getItem('lead_utm')
    if (saved) {
      const parsed = JSON.parse(saved) as Record<string, string>
      for (const [k, v] of Object.entries(parsed)) {
        if (!out[k] && v) out[k] = v
      }
    }
    if (Object.keys(out).length) {
      sessionStorage.setItem('lead_utm', JSON.stringify(out))
    }
  } catch {
    // ignore
  }

  return out
}

function serviceFromPathname(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path === '/') return { slug: 'home', label: 'Головна (загальна заявка)' }
  const match = SERVICES.find((s) => s.href === path)
  if (match) return { slug: match.slug, label: match.title }
  return { slug: path, label: path }
}

export default function ContactForm({
  idPrefix = '',
  compact = false,
  tariff,
}: {
  idPrefix?: string
  compact?: boolean
  /** Selected tariff when opened from pricing cards */
  tariff?: string
}) {
  const pathname = usePathname() || '/'
  const service = useMemo(() => serviceFromPathname(pathname), [pathname])
  const selectedTariff = tariff?.trim() || ''

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    instagram: '',
    telegram: '',
    comment: '',
    consent: false,
    website: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [touched, setTouched] = useState({ name: false, phone: false })
  const [errorMsg, setErrorMsg] = useState('')

  const id = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name)

  const nameOk = form.name.trim().length >= 2
  const phoneOk = phoneDigits(form.phone).length === 12
  const canSubmit = nameOk && phoneOk && form.consent && status !== 'loading'

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, phone: formatUaPhone(e.target.value) }))
  }

  const handleHandle =
    (field: 'instagram' | 'telegram') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: formatHandle(e.target.value) }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, phone: true })
    if (!canSubmit) return
    setStatus('loading')
    setErrorMsg('')

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      instagram: form.instagram.trim(),
      telegram: form.telegram.trim(),
      comment: form.comment.trim(),
      consent: form.consent,
      website: form.website,
      formSource: compact ? `modal:${idPrefix || 'lead'}` : `page:${idPrefix || 'contact'}`,
      pagePath: pathname,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      pageTitle: typeof document !== 'undefined' ? document.title : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      serviceSlug: service.slug,
      serviceLabel: service.label,
      tariff: selectedTariff,
      utm: collectUtm(),
      language: typeof navigator !== 'undefined' ? navigator.language : '',
      timezone:
        typeof Intl !== 'undefined'
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : '',
      screen:
        typeof window !== 'undefined'
          ? `${window.screen.width}x${window.screen.height}`
          : '',
      viewport:
        typeof window !== 'undefined'
          ? `${window.innerWidth}x${window.innerHeight}`
          : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean }
      if (!res.ok || !data.ok) {
        throw new Error('send_failed')
      }
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Не вдалося надіслати. Спробуйте ще раз або напишіть у месенджер.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`${styles.success} ${compact ? styles.successCompact : ''}`}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="24" cy="24" r="20" />
          <path d="M14 24 L21 31 L34 18" />
        </svg>
        <h3>Дякуємо!</h3>
        <p>Ми зв&apos;яжемося з вами найближчим часом.</p>
      </div>
    )
  }

  return (
    <form
      className={`${styles.form} ${compact ? styles.formCompact : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {!compact && (
        <div className={styles.formHead}>
          <p className={styles.formLead}>Залиште ім&apos;я та телефон — відповімо протягом дня.</p>
        </div>
      )}

      {/* Honeypot */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
      >
        <label htmlFor={id('website')}>Website</label>
        <input
          id={id('website')}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        />
      </div>

      <div className={`${styles.field} ${touched.name && !nameOk ? styles.fieldError : ''}`}>
        <label htmlFor={id('name')}>Ім&apos;я</label>
        <input
          id={id('name')}
          type="text"
          placeholder="Як до вас звертатися"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          required
          autoComplete="name"
        />
        {touched.name && !nameOk && (
          <span className={styles.hint}>Вкажіть ім&apos;я</span>
        )}
      </div>

      <div className={`${styles.field} ${touched.phone && !phoneOk ? styles.fieldError : ''}`}>
        <label htmlFor={id('phone')}>Телефон</label>
        <input
          id={id('phone')}
          type="tel"
          inputMode="tel"
          placeholder="+380 XX XXX XX XX"
          value={form.phone}
          onChange={handlePhone}
          onFocus={() => {
            if (!form.phone) setForm((f) => ({ ...f, phone: '+380 ' }))
          }}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          required
          autoComplete="tel"
        />
        {touched.phone && !phoneOk && (
          <span className={styles.hint}>Введіть повний номер</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor={id('instagram')}>
          Instagram <span className={styles.optional}>необовʼязково</span>
        </label>
        <input
          id={id('instagram')}
          type="text"
          inputMode="text"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="@nickname"
          value={form.instagram}
          onChange={handleHandle('instagram')}
          onFocus={() => {
            if (!form.instagram) setForm((f) => ({ ...f, instagram: '@' }))
          }}
          autoComplete="username"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={id('telegram')}>
          Telegram <span className={styles.optional}>необовʼязково</span>
        </label>
        <input
          id={id('telegram')}
          type="text"
          inputMode="text"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="@nickname"
          value={form.telegram}
          onChange={handleHandle('telegram')}
          onFocus={() => {
            if (!form.telegram) setForm((f) => ({ ...f, telegram: '@' }))
          }}
          autoComplete="username"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={id('comment')}>
          Коментар <span className={styles.optional}>необовʼязково</span>
        </label>
        <textarea
          id={id('comment')}
          placeholder="Коротко про бізнес і запит"
          rows={compact ? 2 : 3}
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
        />
      </div>

      <label className={styles.consent}>
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
          required
        />
        <span>
          Погоджуюсь з{' '}
          <a href="/polityka" target="_blank" rel="noopener noreferrer">
            політикою конфіденційності
          </a>{' '}
          та обробкою персональних даних
        </span>
      </label>

      {status === 'error' && errorMsg ? (
        <p className={styles.hint} role="alert" style={{ margin: 0, color: '#c0392b' }}>
          {errorMsg}
        </p>
      ) : null}

      <button type="submit" className={styles.submit} disabled={!canSubmit}>
        {status === 'loading' ? 'Надсилання…' : 'Надіслати заявку'}
        {status !== 'loading' && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 14 L14 2 M6 2 H14 V10" />
          </svg>
        )}
      </button>
    </form>
  )
}
