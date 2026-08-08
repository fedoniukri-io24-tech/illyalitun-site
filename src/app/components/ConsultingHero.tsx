'use client'

import Image from 'next/image'
import { CONSULTING } from '../konsaltyng/data'
import { APPLY_FORMS } from '../brand'
import PillCta from './PillCta'
import hero from './Hero.module.css'
import consult from './ConsultationHero.module.css'
import styles from './ConsultingHero.module.css'

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

export default function ConsultingHero() {
  const { hero: data } = CONSULTING

  return (
    <div className="litunSky">
      <section className={`${hero.hero} ${consult.consultHero} ${styles.hero}`}>
        <div className={`${hero.portrait} ${styles.portrait}`}>
          <Image
            src={data.image}
            alt="Ілля Літун"
            fill
            priority
            sizes="(max-width: 768px) 55vw, 55vw"
            className={`${hero.portraitImage} ${styles.portraitImg}`}
          />
        </div>

        <div className={`${hero.body} ${consult.body} ${styles.body}`}>
          <a href="/" className={consult.back}>← На головну</a>

          <div className={`${hero.copy} ${consult.copy} ${styles.copy}`}>
            <h1 className={`${hero.headline} ${consult.headline} ${styles.headline}`}>
              {data.headlineTop}
              <br />
              <em>{data.headlineBottom}</em>
            </h1>
            <p className={`${hero.role} ${consult.role} ${styles.lead}`}>{data.lead}</p>
            <div className={styles.actions}>
              <PillCta label={data.cta} href={APPLY_FORMS.konsaltyng} external />
            </div>
          </div>

          <div className={hero.glassCells} aria-label="Переваги консалтингу">
            <GlassStat
              value="1:1"
              lines={['особистий', 'супровід']}
              className={hero.glassLeft}
            />
            <GlassStat
              value="ТОПи"
              lines={['команда', 'експертів']}
              className={hero.glassMid}
            />
            <GlassStat
              value="×2"
              lines={['чистий', 'прибуток']}
              className={hero.glassRight}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
