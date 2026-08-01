import { SOCIALS } from '../brand'
import { SOCIAL_ICONS } from '../socialIcons'
import styles from './SocialsSection.module.css'

export default function SocialsSection() {
  return (
    <section className={styles.section} aria-label="Соціальні мережі">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.badge}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.iconWrap}>{SOCIAL_ICONS[s.label]}</span>
              <span className={styles.badgeText}>
                <span className={styles.badgeName}>{s.label}</span>
                <span className={styles.badgeShort}>{s.short}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
