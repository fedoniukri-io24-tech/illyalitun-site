'use client'

import Image from 'next/image'
import { CLUB } from '../klub/data'
import PillCta from './PillCta'
import HeroThought from './HeroThought'
import { useLeadModal } from './LeadModalContext'
import hero from './Hero.module.css'
import consult from './ConsultationHero.module.css'
import styles from './ClubHero.module.css'

export default function ClubHero() {
  const { hero: data } = CLUB
  const { openModal } = useLeadModal()

  return (
    <div className="litunSkyOrange">
      <section className={`${hero.hero} ${consult.consultHero} ${styles.hero}`}>
        <div className={`${hero.body} ${consult.body} ${styles.body}`}>
          <a href="/" className={consult.back}>← На головну</a>

          <div className={`${hero.copy} ${consult.copy} ${styles.copy}`}>
            <div className={styles.titleRow}>
              <h1 className={`${hero.headline} ${consult.headline}`}>
                {data.titleTop}
                <br />
                <em>{data.titleBottom}</em>
              </h1>
              <div className={styles.thoughtWrap}>
                <HeroThought>{data.badge}</HeroThought>
              </div>
            </div>
            <p className={`${hero.role} ${consult.role} ${styles.lead}`}>{data.lead}</p>
            <div className={styles.actions}>
              <PillCta label={data.cta} onClick={openModal} />
            </div>
          </div>
        </div>

        <div className={styles.photo}>
          <Image
            src={data.image}
            alt="Turbo Education Club"
            width={1290}
            height={946}
            priority
            sizes="(max-width: 768px) 92vw, 48vw"
            className={styles.photoImg}
          />
        </div>
      </section>
    </div>
  )
}
