'use client'

import { useState } from 'react'
import { BRAND_COURSE } from '../brend/data'
import { useLeadModal } from './LeadModalContext'
import styles from './BrandProgram.module.css'

export default function BrandProgram() {
  const { program } = BRAND_COURSE
  const { openModal } = useLeadModal()
  const [open, setOpen] = useState<number | null>(0)
  const last = String(program.topics.length - 1).padStart(2, '0')

  return (
    <section className={styles.section} id="programa">
      <div className={styles.layout}>
        <div className={styles.aside}>
          <h2 className={styles.title}>
            Програма
            <br />
            навчання
          </h2>

          <div className={styles.ctaRow}>
            <button type="button" className={styles.cta} onClick={() => openModal()}>
              {program.cta}
            </button>
            <span className={styles.ctaDivider} aria-hidden="true" />
            <button
              type="button"
              className={styles.ctaIcon}
              onClick={() => openModal()}
              aria-label={program.cta}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 4h10a2 2 0 0 1 2 2v14l-7-3.5L5 20V6a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.list} role="list">
          {program.topics.map((topic, i) => {
            const isOpen = open === i
            const n = String(i).padStart(2, '0')
            return (
              <div
                key={topic.title}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                role="listitem"
              >
                <button
                  type="button"
                  className={styles.row}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className={styles.num}>
                    {n}/{last}
                  </span>
                  <span className={styles.rowTitle}>{topic.title}</span>
                  <span className={styles.toggle} aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className={styles.panel} hidden={!isOpen}>
                  <p>{topic.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
