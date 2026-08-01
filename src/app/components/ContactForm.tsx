'use client'

import { useState } from 'react'
import styles from './ContactSection.module.css'

type FormState = {
  name: string
  phone: string
  comment: string
  consent: boolean
}

type Status = 'idle' | 'loading' | 'success'

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

export default function ContactForm({
  idPrefix = '',
  compact = false,
}: {
  idPrefix?: string
  compact?: boolean
}) {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    comment: '',
    consent: false,
  })
  const [status, setStatus] = useState<Status>('idle')
  const [touched, setTouched] = useState({ name: false, phone: false })

  const id = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name)

  const nameOk = form.name.trim().length >= 2
  const phoneOk = phoneDigits(form.phone).length === 12
  const canSubmit = nameOk && phoneOk && form.consent && status !== 'loading'

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, phone: formatUaPhone(e.target.value) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, phone: true })
    if (!canSubmit) return
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('success')
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
          <p className={styles.formEyebrow}>Контакти</p>
          <p className={styles.formLead}>Залиште ім&apos;я та телефон — відповімо протягом дня.</p>
        </div>
      )}

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
        <span>Погоджуюсь на обробку персональних даних</span>
      </label>

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
