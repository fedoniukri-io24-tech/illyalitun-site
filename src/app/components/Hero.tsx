import Image from 'next/image'
import { BRAND, SERVICES, STATS } from '../brand'
import styles from './Hero.module.css'

const COLOR_CLASS: Record<(typeof SERVICES)[number]['color'], string> = {
  blue: styles.cardBlue,
  teal: styles.cardTeal,
  indigo: styles.cardIndigo,
  orange: styles.cardOrange,
}

const GLASS_POS = [styles.glassLeft, styles.glassMid, styles.glassRight] as const

function statLines(label: string): string[] {
  if (label === 'Next 250') return ['Next', '250']
  if (label === 'активних учнів') return ['активних', 'учнів']
  if (label === 'випускників') return ['випускників']
  return [label]
}

export default function Hero() {
  return (
    <section className={`${styles.hero} ${styles.home}`}>
      <div className={styles.portrait}>
        <Image
          src={BRAND.heroDesktop}
          alt={BRAND.name}
          fill
          priority
          sizes="(max-width: 768px) 90vw, 55vw"
          className={styles.portraitImage}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.cards} aria-label="Послуги">
          {SERVICES.map((service) => (
            <a
              key={service.slug}
              href={service.href}
              className={`${styles.card} ${COLOR_CLASS[service.color]}`}
            >
              <p className={styles.cardTitle}>{service.label}</p>
              <div className={styles.cardArrow}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 14 L14 2 M6 2 H14 V10" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.copy}>
          <h1 className={styles.headline}>
            Освітній бізнес<br />з&nbsp;<em>Іллею Літуном</em>
          </h1>
          <p className={styles.role}>{BRAND.role}</p>
        </div>

        <div className={styles.glassCells} aria-label="Досягнення">
          {STATS.map((stat, index) => (
            <div key={stat.label} className={`${styles.glassCard} ${GLASS_POS[index]}`}>
              <span className={styles.glassOrb} aria-hidden="true" />
              <div className={styles.glassRow}>
                <span className={styles.glassValue}>{stat.value}</span>
                <span className={styles.glassMeta}>
                  {statLines(stat.label).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
