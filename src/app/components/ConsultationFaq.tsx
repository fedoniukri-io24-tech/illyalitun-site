'use client'
import { useState } from 'react'
import { CONSULTATION } from '../konsultatsiya/data'
import page from '../konsultatsiya/consultation.module.css'
import styles from './ConsultationFaq.module.css'

export default function ConsultationFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className={page.sectionLight} id="faq">
      <div className={`${page.wrapNarrow} ${styles.inner}`}>
        <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>FAQ</h2>
        <div className={styles.list}>
          {CONSULTATION.faq.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <button
                  type="button"
                  className={styles.q}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className={styles.a}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className={styles.legal}>
          <a href="#">Договір оферти</a>
          <a href="#">Політика конфіденційності</a>
        </div>
      </div>
    </section>
  )
}
