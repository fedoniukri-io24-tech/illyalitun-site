'use client'

import { BRAND_COURSE } from '../brend/data'
import BookCta from './BookCta'
import Reveal from './Reveal'
import page from '../konsultatsiya/consultation.module.css'
import styles from './BrandIncludes.module.css'

export default function BrandIncludes() {
  const d = BRAND_COURSE.includes

  return (
    <section className={styles.section} id="napovnennya">
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>{d.title}</h2>
          <p className={styles.lead}>{d.lead}</p>
        </header>

        <div className={styles.journey}>
          <div className={styles.rail} aria-hidden="true">
            <svg className={styles.railSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                className={styles.railPath}
                d="M 50 2 C 50 2, 78 18, 50 34 S 22 50, 50 66 S 78 82, 50 98"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <ol className={styles.stops}>
            {d.items.map((item, i) => {
              const side = i % 2 === 0 ? styles.stopLeft : styles.stopRight
              return (
                <li key={item.title} className={`${styles.stop} ${side}`}>
                  <Reveal from="up" delay={i * 45} className={styles.stopReveal}>
                    <div className={styles.stopBody}>
                      <span className={styles.stopNum}>{String(i + 1).padStart(2, '0')}</span>
                      <p className={styles.stopTitle}>{item.title}</p>
                      <p className={styles.stopText}>{item.text}</p>
                    </div>
                  </Reveal>
                  <span className={styles.railDot} aria-hidden="true" />
                </li>
              )
            })}
          </ol>
        </div>

        <Reveal from="pop" delay={80}>
          <div className={`${page.sectionCta} ${styles.cta}`}>
            <BookCta label="Доєднатися" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
