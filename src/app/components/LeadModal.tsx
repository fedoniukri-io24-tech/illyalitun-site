'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ContactForm from './ContactForm'
import type { LeadIntent } from './LeadModalContext'
import styles from './LeadModal.module.css'

function lockScroll() {
  const scrollY = window.scrollY || window.pageYOffset || 0
  const { body, documentElement } = document

  body.dataset.scrollLockY = String(scrollY)
  body.style.overflow = 'hidden'
  body.style.position = 'fixed'
  body.style.top = `-${scrollY}px`
  body.style.left = '0'
  body.style.right = '0'
  body.style.width = '100%'
  documentElement.style.overflow = 'hidden'
}

function unlockScroll() {
  const { body, documentElement } = document
  const raw = body.dataset.scrollLockY
  const scrollY = raw != null && Number.isFinite(Number(raw)) ? Number(raw) : 0

  body.style.overflow = ''
  body.style.position = ''
  body.style.top = ''
  body.style.left = ''
  body.style.right = ''
  body.style.width = ''
  documentElement.style.overflow = ''
  delete body.dataset.scrollLockY

  // Restore immediately (no smooth scroll) — also set scrollTop for Safari
  const prev = documentElement.style.scrollBehavior
  documentElement.style.scrollBehavior = 'auto'
  window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' })
  documentElement.scrollTop = scrollY
  body.scrollTop = scrollY
  documentElement.style.scrollBehavior = prev
}

export default function LeadModal({
  open,
  onClose,
  intent = null,
}: {
  open: boolean
  onClose: () => void
  intent?: LeadIntent | null
}) {
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    lockScroll()

    // Focus dialog container (not a far-off page control after close)
    const t = window.setTimeout(() => {
      dialogRef.current?.focus({ preventScroll: true })
    }, 0)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      unlockScroll()
      // Restore focus without scrolling the page to the trigger
      const el = previouslyFocused.current
      if (el && typeof el.focus === 'function') {
        try {
          el.focus({ preventScroll: true })
        } catch {
          // ignore
        }
      }
    }
  }, [open])

  if (!mounted || !open) return null

  return createPortal(
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Закрити">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 4 L20 20 M20 4 L4 20" />
          </svg>
        </button>

        <div className={styles.head}>
          <h2 id="lead-modal-title" className={styles.title}>Забронювати місце</h2>
          <p className={styles.lead}>
            {intent?.tariff
              ? `Обраний тариф: ${intent.tariff}. Залиште контакти — узгодимо час і деталі.`
              : 'Залиште контакти — узгодимо час і деталі.'}
          </p>
        </div>

        <ContactForm idPrefix="modal" compact tariff={intent?.tariff} />
      </div>
    </div>,
    document.body,
  )
}
