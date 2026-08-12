'use client'

import Image from 'next/image'
import { APPLY_FORMS } from '../brand'
import { CONSULTATION } from '../konsultatsiya/data'
import PillCta from './PillCta'
import hero from './Hero.module.css'
import styles from './ConsultationHero.module.css'

function GlassStat({
  value,
  lines,
  className,
}: {
  value: string
  lines: readonly string[]
  className?: string
}) {
  return (
    <div className={`${hero.glassCard} ${className ?? ''}`}>
      <span className={hero.glassOrb} aria-hidden="true" />
      <div className={hero.glassRow}>
        <span className={hero.glassValue}>{value}</span>
        <span className={hero.glassMeta}>
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      </div>
    </div>
  )
}

export default function ConsultationHero() {
  const { hero: data } = CONSULTATION

  return (
    <div className="litunSkyMint">
      <section className={`${hero.hero} ${styles.consultHero} ${styles.page}`}>
        <div className={`${hero.portrait} ${styles.portrait}`}>
          <Image
            src={data.image}
            alt="Ілля Літун"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 55vw"
            className={`${hero.portraitImage} ${styles.portraitBlend}`}
          />
        </div>

        <div className={`${hero.body} ${styles.body}`}>
          <a href="/" className={styles.back}>← На головну</a>

          <div className={`${hero.copy} ${styles.copy}`}>
            <h1 className={`${hero.headline} ${styles.headline} ${styles.consultHeadline}`}>
              {data.headlineTop}
              <br />
              <em>{data.headlineBottom}</em>
            </h1>
            <p className={`${hero.role} ${styles.role} ${styles.consultLead}`}>{data.lead}</p>
            <div className={styles.actions}>
              <PillCta label="Забронювати місце" href={APPLY_FORMS.konsultatsiya} external />
              <PillCta href="#dlya-koho" label="Деталі" />
            </div>
          </div>

          <div className={`${hero.glassCells} ${styles.glassCells}`} aria-label="Деталі консультації">
            <GlassStat
              value={data.stats[0].value}
              lines={data.stats[0].lines}
              className={`${hero.glassLeft} ${styles.gLeft}`}
            />
            <GlassStat
              value={data.stats[1].value}
              lines={data.stats[1].lines}
              className={`${hero.glassMid} ${styles.gMid}`}
            />
            <div className={`${hero.glassCard} ${hero.glassRight} ${styles.formatCard} ${styles.gRight}`}>
              <span className={hero.glassOrb} aria-hidden="true" />
              <p className={styles.formatLabel}>{data.formatLabel}</p>
              <p className={styles.formatText}>{data.formatText}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
