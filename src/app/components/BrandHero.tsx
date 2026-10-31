'use client'

import Image from 'next/image'
import { BRAND_COURSE } from '../brend/data'
import PillCta from './PillCta'
import { useLeadModal } from './LeadModalContext'
import hero from './Hero.module.css'
import consult from './ConsultationHero.module.css'
import styles from './BrandHero.module.css'

export default function BrandHero() {
  const { hero: data } = BRAND_COURSE
  const { openModal } = useLeadModal()
  const [start, duration] = data.meta

  return (
    <div className={styles.sky}>
      <section className={`${hero.hero} ${styles.hero} ${consult.consultHero} ${styles.page}`}>
        <div className={styles.bg} aria-hidden="true">
          <Image
            src={data.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`${styles.bgImage} ${styles.bgDesktop}`}
          />
          <Image
            src={data.imageMobile}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`${styles.bgImage} ${styles.bgMobile}`}
          />
          <div className={styles.bgOverlay} />
        </div>

        <div className={`${hero.body} ${consult.body} ${styles.body}`}>
          <a href="/" className={`${consult.back} ${styles.back}`}>
            ← На головну
          </a>

          <div className={styles.mobileTopSpacer} aria-hidden="true" />

          <div className={styles.layout}>
            <div className={`${hero.copy} ${consult.copy} ${styles.copy}`}>
              <h1 className={`${hero.headline} ${consult.headline} ${consult.consultHeadline} ${styles.headline}`}>
                {data.title}
              </h1>
              <p className={`${hero.role} ${consult.role} ${consult.consultLead} ${styles.lead}`}>{data.lead}</p>
            </div>

            <div className={styles.photoSlot} aria-hidden="true" />
          </div>

          <div className={styles.footBar} aria-label="Старт курсу та запис">
            <p className={styles.metaItem}>
              <span className={styles.metaLabel}>{start.label}:</span>
              <span className={styles.metaValue}>{start.value}</span>
            </p>
            <p className={styles.metaItem}>
              <span className={styles.metaLabel}>{duration.label}:</span>
              <span className={styles.metaValue}>{duration.value}</span>
            </p>
            <div className={styles.footCta}>
              <PillCta label={data.cta} onClick={openModal} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
