import { SOCIALS } from '../brand'
import { SOCIAL_ICONS } from '../socialIcons'
import Reveal from './Reveal'
import styles from './SocialsSection.module.css'

export default function SocialsSection({ tone = 'default' }: { tone?: 'default' | 'forest' }) {
  return (
    <section
      className={`${styles.section} ${tone === 'forest' ? styles.toneForest : ''}`}
      aria-label="Соціальні мережі"
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          {SOCIALS.map((s, i) => (
            <Reveal key={s.label} from="fan" delay={i * 70}>
              <a
                href={s.href}
                className={styles.badge}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.iconWrap}>{SOCIAL_ICONS[s.label]}</span>
                <span className={styles.badgeName}>{s.label}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
