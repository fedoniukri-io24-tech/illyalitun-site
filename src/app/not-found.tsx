import Link from 'next/link'
import { SERVICES } from './brand'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={`litunSky ${styles.page}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.glowAlt} aria-hidden="true" />

      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          TURBO <span>EDUCATION</span>
        </Link>

        <p className={styles.code} aria-hidden="true">
          404
        </p>

        <h1 className={styles.title}>
          Сторінку
          <br />
          <em>не знайдено</em>
        </h1>

        <p className={styles.lead}>
          Маршрут загубився — але бізнес ні. Поверніться на головну або оберіть формат роботи.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.cta}>
            <span>На головну</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 14 L14 2 M6 2 H14 V10" />
              </svg>
            </span>
          </Link>
        </div>

        <nav className={styles.formats} aria-label="Формати">
          {SERVICES.map((s) => (
            <Link key={s.slug} href={s.href} className={styles.formatLink}>
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
