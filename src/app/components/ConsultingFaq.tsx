'use client'

import { useState } from 'react'
import { CONSULTING } from '../konsaltyng/data'
import Reveal from './Reveal'
import page from '../konsultatsiya/consultation.module.css'
import styles from './ConsultationFaq.module.css'

export default function ConsultingFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className={page.sectionLight} id="faq">
      <div className={`${page.wrapNarrow} ${styles.inner}`}>
        <Reveal from="clip">
          <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>Часті питання</h2>
        </Reveal>
        <div className={styles.list}>
          {CONSULTING.faq.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} from="up" delay={i * 70}>
                <div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
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
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
