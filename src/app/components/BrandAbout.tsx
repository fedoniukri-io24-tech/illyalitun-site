'use client'

import Image from 'next/image'
import { BRAND_COURSE } from '../brend/data'
import { useLeadModal } from './LeadModalContext'
import styles from './BrandAbout.module.css'

export default function BrandAbout() {
  const { about } = BRAND_COURSE
  const { openModal } = useLeadModal()

  return (
    <section className={styles.section} id="pro-avtora">
      <div className={styles.frame}>
        <div className={styles.photoCol}>
          <Image
            src={about.image}
            alt={about.name}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.photo}
          />
          <p className={styles.caption}>{about.caption}</p>
        </div>

        <div className={styles.copyCol}>
          <h2 className={styles.title}>{about.title}</h2>
          <p className={styles.intro}>{about.intro}</p>

          <div className={styles.facts}>
            <p className={styles.factsTitle}>{about.factsTitle}</p>
            <ul className={styles.factsList}>
              {about.facts.map((fact, i) => (
                <li key={fact} className={styles.fact}>
                  <span className={styles.factN} aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>{fact}</p>
                </li>
              ))}
            </ul>
          </div>

          <button type="button" className={styles.cta} onClick={() => openModal()}>
            {about.cta}
          </button>
        </div>
      </div>
    </section>
  )
}
