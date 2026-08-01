import Image from 'next/image'
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
    <section className={`${hero.hero} ${styles.consultHero} litunSky`}>
      <div className={hero.portrait}>
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
          <h1 className={`${hero.headline} ${styles.headline}`}>
            {data.headlineTop}
            <br />
            <em>{data.headlineBottom}</em>
          </h1>
          <p className={`${hero.role} ${styles.role}`}>{data.lead}</p>
          <div className={styles.actions}>
            <PillCta href="#kontakt" label="Забронювати місце" />
            <PillCta href="#dlya-koho" label="Деталі" />
          </div>
        </div>

        <div className={hero.glassCells} aria-label="Деталі консультації">
          <GlassStat
            value={data.statLeft.value}
            lines={data.statLeft.lines}
            className={hero.glassLeft}
          />
          <GlassStat
            value={data.statRight.value}
            lines={data.statRight.lines}
            className={hero.glassMid}
          />
          <div className={`${hero.glassCard} ${hero.glassRight} ${styles.formatCard}`}>
            <span className={hero.glassOrb} aria-hidden="true" />
            <p className={styles.formatLabel}>{data.formatLabel}</p>
            <p className={styles.formatText}>{data.formatText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
