'use client'

import Image from 'next/image'
import { APPLY_FORMS } from '../brand'
import { CONSULTATION } from '../konsultatsiya/data'
import PillCta from './PillCta'
import hero from './Hero.module.css'
import styles from './ConsultationHero.module.css'

export default function ConsultationHero() {
  const { hero: data } = CONSULTATION

  return (
    <div className="litunSkyMint">
      <section className={`${hero.hero} ${styles.consultHero}`}>
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
            <h1 className={`${hero.headline} ${styles.headline}`}>
              {data.headlineTop}
              <br />
              <em>{data.headlineBottom}</em>
            </h1>
            <p className={`${hero.role} ${styles.role}`}>{data.lead}</p>
            <div className={styles.actions}>
              <PillCta label="Забронювати" href={APPLY_FORMS.konsultatsiya} external />
              <PillCta href="#dlya-koho" label="Деталі" />
            </div>
          </div>

          <div className={hero.glassCells} aria-label="Деталі консультації">
            <div className={`${hero.glassCard} ${hero.glassRight} ${styles.formatCard}`}>
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
