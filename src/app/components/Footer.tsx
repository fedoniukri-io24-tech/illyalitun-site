import { BRAND, SERVICES, SOCIALS } from '../brand'
import { SOCIAL_ICONS } from '../socialIcons'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.brandBlock}>
            <a href="/" className={styles.brand}>Turbo <span>Education</span></a>
            <p className={styles.tagline}>{BRAND.tagline}</p>
            <div className={styles.socials}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.social}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SOCIAL_ICONS[s.label]}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <h3>Формати</h3>
              {SERVICES.map((s) => (
                <a key={s.slug} href={s.href}>{s.label}</a>
              ))}
            </div>

            <div className={styles.col}>
              <h3>Контакти</h3>
              <p>{BRAND.address}</p>
              <p>{BRAND.city}</p>
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</a>
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} {BRAND.name}</span>
          <a
            href="https://telebots.site/uk"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.credit}
          >
            <span className={styles.creditLabel}>Сайт розроблено TeleBots</span>
            <span className={styles.creditArrow} aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 14 L14 2 M6 2 H14 V10" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
