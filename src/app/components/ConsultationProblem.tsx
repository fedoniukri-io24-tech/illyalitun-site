'use client'

import { useEffect, useRef, useState } from 'react'
import { APPLY_FORMS } from '../brand'
import { CONSULTATION } from '../konsultatsiya/data'
import BookCta from './BookCta'
import page from '../konsultatsiya/consultation.module.css'
import styles from './ConsultationProblem.module.css'

export default function ConsultationProblem() {
  const { problem } = CONSULTATION
  const stageRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setRevealed(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { threshold: 0.28, rootMargin: '0px 0px -10% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className={styles.section} id="problem">
      <div className={styles.chart} aria-hidden="true" />

      <div
        ref={stageRef}
        className={`${styles.stage} ${revealed ? styles.revealed : ''}`}
      >
        <div className={styles.copy}>
          <p className={styles.eyebrow}>[ {problem.eyebrow} ]</p>

          <h2 className={styles.title}>
            {problem.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <p className={styles.question}>{problem.question}</p>
        </div>

        <div className={styles.bubbles} aria-label="Базові речі">
          {problem.bubbles.map((b, i) => (
            <div
              key={b.text}
              className={`${styles.bubble} ${styles[`pos${i}`]} ${b.tone === 'filled' ? styles.filled : styles.outline}`}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
            >
              {b.text}
            </div>
          ))}
        </div>
      </div>

      <div className={page.sectionCta}>
        <BookCta href={APPLY_FORMS.konsultatsiya} />
      </div>
    </section>
  )
}
