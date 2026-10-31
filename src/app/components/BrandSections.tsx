'use client'

import { BRAND_COURSE } from '../brend/data'
import BookCta from './BookCta'
import BrandAbout from './BrandAbout'
import BrandFitCards from './BrandFitCards'
import BrandIncludes from './BrandIncludes'
import BrandProgram from './BrandProgram'
import Reveal from './Reveal'
import { useLeadModal } from './LeadModalContext'
import page from '../konsultatsiya/consultation.module.css'
import styles from './BrandSections.module.css'

function Join({ label = 'Доєднатися' }: { label?: string }) {
  return (
    <Reveal from="pop" delay={60}>
      <div className={page.sectionCta}>
        <BookCta label={label} />
      </div>
    </Reveal>
  )
}

export default function BrandSections() {
  const d = BRAND_COURSE
  const { openModal } = useLeadModal()

  return (
    <>
      <BrandFitCards />

      <section className={`${page.sectionLight} ${styles.fitBridgeSection}`}>
        <div className={page.wrap}>
          <Reveal from="up" delay={40}>
            <div className={styles.bridge}>
              <p className={styles.bridgeTitle}>{d.fit.bridge}</p>
              <p className={styles.bridgeLead}>{d.fit.bridgeLead}</p>
            </div>
          </Reveal>
          <Join />
        </div>
      </section>

      <BrandIncludes />

      <BrandProgram />

      <section className={`${page.sectionLight} ${styles.bandSoft}`} id="taryfy">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.tariffs.title}</h2>
          </Reveal>
          <Reveal from="up" delay={40}>
            <p className={styles.sectionLead}>{d.tariffs.lead}</p>
          </Reveal>
          <div className={styles.tariffs}>
            {d.tariffs.items.map((tariff, i) => (
              <Reveal key={tariff.name} from="up" delay={i * 80}>
                <article className={`${styles.tariff} ${tariff.featured ? styles.tariffFeatured : ''}`}>
                  <div className={styles.tariffHead}>
                    <h3>{tariff.name}</h3>
                    <span className={styles.tariffSeats}>{tariff.seats}</span>
                  </div>
                  <p className={styles.tariffPrice}>{tariff.price}</p>
                  <ul>
                    {tariff.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className={styles.tariffFooter}>
                    <BookCta
                      label={tariff.cta}
                      tariff={`${tariff.name} · ${tariff.price}`}
                    />
                    <button
                      type="button"
                      className={styles.tariffSecondary}
                      onClick={() => openModal({ tariff: `${tariff.name} · ${tariff.price}` })}
                    >
                      {tariff.secondaryCta}
                    </button>
                    <button
                      type="button"
                      className={styles.tariffAsk}
                      onClick={() => openModal({ tariff: `${tariff.name} · питання` })}
                    >
                      {tariff.askCta}
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BrandAbout />
    </>
  )
}
