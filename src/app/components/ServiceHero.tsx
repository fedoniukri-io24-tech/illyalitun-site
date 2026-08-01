import type { SERVICES } from '../brand'
import styles from './ServiceHero.module.css'

type Service = (typeof SERVICES)[number]

export default function ServiceHero({ service }: { service: Service }) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <a href="/" className={styles.back}>← На головну</a>
        <p className={styles.eyebrow}>Формат роботи</p>
        <h1 className={styles.title}>{service.title}</h1>
        <p className={styles.lead}>{service.lead}</p>

        <ul className={styles.points}>
          {service.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <a href="#kontakt" className={styles.cta}>
          Залишити заявку
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 14 L14 2 M6 2 H14 V10"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
