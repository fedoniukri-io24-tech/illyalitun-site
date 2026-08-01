'use client'
import Image from 'next/image'
import { useState } from 'react'
import { BRAND, FORM_OPTIONS } from '../brand'
import styles from './ContactSection.module.css'

type FormState = { name: string; phone: string; service: string; comment: string; consent: boolean }
type Status = 'idle' | 'loading' | 'success'

export default function ContactSection({
  defaultService = '',
  tightTop = false,
}: {
  defaultService?: string
  tightTop?: boolean
}) {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    service: defaultService,
    comment: '',
    consent: false,
  })
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm(f => ({ ...f, [k]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1400))
    setStatus('success')
  }

  return (
    <section id="kontakt" className={`${styles.section} ${tightTop ? styles.tightTop : ''}`}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>
            Поговорімо<br /><em>про ріст</em>
          </h2>
          <p className={styles.lead}>
            Залиште заявку — підберемо формат роботи під ваш етап освітнього бізнесу.
          </p>
        </div>

        <div className={styles.panel}>
          <div className={styles.visual}>
            <Image
              src={BRAND.contactImage}
              alt="Освітній бізнес з Іллею Літуном"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.img}
            />
            <div className={styles.visualOverlay} aria-hidden="true" />
            <div className={styles.visualContent}>
              <p className={styles.visualText}>
                Консалтинг · Консультація · Страт сесія · Клуб
              </p>
              <div className={styles.visualContacts}>
                <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</a>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            {status === 'success' ? (
              <div className={styles.success}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="24" cy="24" r="20"/>
                  <path d="M14 24 L21 31 L34 18"/>
                </svg>
                <h3>Дякуємо!</h3>
                <p>Ми зв&apos;яжемося з вами найближчим часом.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <p className={styles.formTitle}>Заявка</p>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name">Ім&apos;я</label>
                    <input id="name" type="text" placeholder="Ваше ім&apos;я" value={form.name} onChange={set('name')} required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone">Телефон</label>
                    <input id="phone" type="tel" placeholder="+380" value={form.phone} onChange={set('phone')} required />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="service">Формат</label>
                  <div className={styles.selectWrap}>
                    <select id="service" value={form.service} onChange={set('service')}>
                      <option value="">Оберіть варіант</option>
                      {FORM_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--stone)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 6 L8 11 L13 6"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="comment">Коментар</label>
                  <textarea id="comment" placeholder="Етап бізнесу, запит, цілі..." rows={3} value={form.comment} onChange={set('comment')} />
                </div>
                <label className={styles.consent}>
                  <input type="checkbox" checked={form.consent} onChange={set('consent')} required />
                  <span>Надсилаючи форму, ви погоджуєтесь на обробку персональних даних</span>
                </label>
                <button type="submit" className={styles.submit} disabled={!form.consent || status === 'loading'}>
                  {status === 'loading' ? 'Надсилання…' : 'Надіслати заявку'}
                  {status !== 'loading' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 14 L14 2 M6 2 H14 V10"/>
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
