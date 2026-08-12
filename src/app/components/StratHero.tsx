'use client'

import Image from 'next/image'
import { APPLY_FORMS } from '../brand'
import { STRAT } from '../strat-sesiya/data'
import PillCta from './PillCta'
import HeroThought from './HeroThought'
import hero from './Hero.module.css'
import consult from './ConsultationHero.module.css'
import styles from './StratHero.module.css'

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

export default function StratHero() {
  const { hero: data } = STRAT

  return (
    <div className="litunSkyDeep">
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
          <a href="/" className={`${consult.back} ${styles.back}`}>← На головну</a>

          <div className={`${hero.copy} ${consult.copy} ${styles.copy}`}>
            <div className={styles.eyebrow}>
              <HeroThought tone="deep">{data.eyebrow}</HeroThought>
            </div>
            <h1 className={`${hero.headline} ${consult.headline} ${styles.headline}`}>
              {data.headlineTop}
              <br />
              <em>{data.headlineBottom}</em>
            </h1>
            <p className={`${hero.role} ${consult.role} ${styles.lead}`}>
              Без стратегії власник 24/7 загрузає в операційці, а команда працює без мети.{' '}
              <em className={styles.leadAccent}>Стратегічна сесія —</em> момент, де стає видно, що працює, а що ні.
            </p>
            <div className={styles.actions}>
              <PillCta label={data.cta} href={APPLY_FORMS.stratSesiya} external />
            </div>
          </div>

          <div className={hero.glassCells} aria-label="Деталі страт сесії">
            {data.stats.map((stat, index) => (
              <GlassStat
                key={stat.value}
                value={stat.value}
                lines={stat.lines}
                className={[
                  `${hero.glassLeft} ${styles.gLeft}`,
                  `${hero.glassMid} ${styles.gMid}`,
                  `${hero.glassRight} ${styles.gRight}`,
                ][index]}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
