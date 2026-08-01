'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ContactForm from './ContactForm'
import styles from './LeadModal.module.css'

function lockScroll() {
  const scrollY = window.scrollY
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
  const scrollY = Number(body.dataset.scrollLockY || '0')

  body.style.overflow = ''
  body.style.position = ''
  body.style.top = ''
  body.style.left = ''
  body.style.right = ''
  body.style.width = ''
  documentElement.style.overflow = ''
  delete body.dataset.scrollLockY

  window.scrollTo(0, scrollY)
}

export default function LeadModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    lockScroll()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!mounted || !open) return null

  return createPortal(
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Закрити">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 4 L20 20 M20 4 L4 20" />
          </svg>
        </button>

        <div className={styles.head}>
          <h2 id="lead-modal-title" className={styles.title}>Забронювати місце</h2>
          <p className={styles.lead}>Залиште контакти — узгодимо час і деталі.</p>
        </div>

        <ContactForm idPrefix="modal" compact />
      </div>
    </div>,
    document.body,
  )
}
