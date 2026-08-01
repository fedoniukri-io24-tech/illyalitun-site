'use client'

import { useState } from 'react'
import type { SERVICES } from '../brand'
import LeadModal from './LeadModal'
import Reveal from './Reveal'
import styles from './ServiceHero.module.css'

type Service = (typeof SERVICES)[number]

export default function ServiceHero({ service }: { service: Service }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <Reveal from="up">
          <a href="/" className={styles.back}>← На головну</a>
        </Reveal>
        <Reveal from="clip" delay={60}>
          <p className={styles.eyebrow}>Формат роботи</p>
        </Reveal>
        <Reveal from="clip" delay={100}>
          <h1 className={styles.title}>{service.title}</h1>
        </Reveal>
        <Reveal from="blur" delay={140}>
          <p className={styles.lead}>{service.lead}</p>
        </Reveal>

        <Reveal from="left" delay={160}>
          <ul className={styles.points}>
            {service.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal from="pop" delay={280}>
          <button type="button" className={styles.cta} onClick={() => setModalOpen(true)}>
            Забронювати місце
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 14 L14 2 M6 2 H14 V10" />
            </svg>
          </button>
        </Reveal>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
