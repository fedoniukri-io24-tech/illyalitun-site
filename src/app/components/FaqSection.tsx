'use client'

import { useState } from 'react'
import Reveal from './Reveal'
import page from '../konsultatsiya/consultation.module.css'
import styles from './ConsultationFaq.module.css'

type FaqItem = { q: string; a: string }

export default function FaqSection({
  items,
  lead,
  title = 'Часті питання',
}: {
  items: readonly FaqItem[]
  lead: string
  title?: string
}) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className={`${page.sectionLight} ${styles.section}`} id="faq">
      <div className={`${page.wrap} ${styles.inner}`}>
        <div className={styles.header}>
          <h2 className={page.sectionTitle}>{title}</h2>
          <p className={styles.lead}>{lead}</p>
        </div>
        <div className={styles.list}>
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} from="up" delay={i * 55}>
                <div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                  <button
                    type="button"
                    className={styles.q}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.icon} aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
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
