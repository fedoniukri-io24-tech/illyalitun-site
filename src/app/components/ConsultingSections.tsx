'use client'

import Image from 'next/image'
import { APPLY_FORMS } from '../brand'
import { CONSULTING } from '../konsaltyng/data'
import BookCta from './BookCta'
import CasesCarousel from './CasesCarousel'
import Reveal from './Reveal'
import page from '../konsultatsiya/consultation.module.css'
import styles from './ConsultingSections.module.css'

function Join({ label = 'Доєднатися' }: { label?: string }) {
  return (
    <Reveal from="pop" delay={60}>
      <div className={page.sectionCta}>
        <BookCta label={label} href={APPLY_FORMS.konsaltyng} />
      </div>
    </Reveal>
  )
}

export default function ConsultingSections() {
  const d = CONSULTING

  return (
    <>
      <section className={page.sectionLight} id="biznes">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.pains.title}</h2>
          </Reveal>
          <Reveal from="up" delay={60}>
            <p className={styles.sectionLead}>{d.pains.lead}</p>
          </Reveal>
          <div className={styles.painGrid}>
            {d.pains.items.map((item, i) => (
              <Reveal key={item} from="tilt" delay={i * 45}>
                <article className={styles.painCard}>
                  <span className={styles.keyN} aria-hidden="true">
                    {['!', '@', '#', '$', '%', '&', '*', '?', '~'][i]}
                  </span>
                  <p>{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal from="up" delay={80}>
            <div className={styles.bridge}>
              <p className={styles.bridgeTitle}>{d.pains.bridge}</p>
              <p className={styles.bridgeLead}>{d.pains.bridgeLead}</p>
            </div>
          </Reveal>
          <Join />
        </div>
      </section>

      <section className={`${page.sectionLight} ${styles.bandSoft}`}>
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.benefits.title}</h2>
          </Reveal>
          <div className={styles.benefitGrid}>
            {d.benefits.items.map((item, i) => (
              <Reveal key={item} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 50}>
                <article className={styles.benefitCard}>
                  <span className={styles.keyN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Join />
        </div>
      </section>

      {/* Video — uncomment when ready
      <section className={page.sectionLight} id="video">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.video.title}</h2>
          </Reveal>
          <Reveal from="blur" delay={100}>
            <div className={styles.video}>
              <span>Відео Іллі</span>
              <p>{d.video.placeholder}</p>
            </div>
          </Reveal>
        </div>
      </section>
      */}

      <section className={`${page.sectionLight} ${styles.bandSoft}`} id="plan">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.roadmap.title}</h2>
          </Reveal>
          <Reveal from="up" delay={40}>
            <p className={styles.sectionLead}>{d.roadmap.note}</p>
          </Reveal>
          <div className={styles.roadmap}>
            {d.roadmap.steps.map((step, i) => (
              <Reveal key={step.n} from="up" delay={i * 55}>
                <article className={styles.step}>
                  <span className={styles.keyN} aria-hidden="true">{step.n}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Join />
        </div>
      </section>

      <section className={page.sectionLight} id="rezultat">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.after.title}</h2>
          </Reveal>
          <div className={`splitMedia ${styles.afterLayout}`}>
            <div className={styles.afterGrid}>
              {d.after.items.map((item, i) => {
                /* Irregular size mix — not alternating Lg/Md/Sm */
                const sizes = [
                  styles.afterLg,
                  styles.afterSm,
                  styles.afterMd,
                  styles.afterLg,
                  styles.afterSm,
                  styles.afterMd,
                  styles.afterSm,
                  styles.afterLg,
                ] as const
                return (
                  <Reveal key={item} from="pop" delay={i * 55}>
                    <article
                      className={`${styles.afterBubble} ${sizes[i]} ${
                        i % 3 === 0 ? styles.afterFilled : styles.afterOutline
                      }`}
                    >
                      <p>{item}</p>
                    </article>
                  </Reveal>
                )
              })}
            </div>
            <Reveal from="tilt" delay={120} className={`splitMediaPhotoWrap ${styles.afterPhotoReveal}`}>
              <div className={`splitMediaPhoto ${styles.afterPhoto}`}>
                <Image
                  src={d.after.image}
                  alt="Після консалтингу"
                  fill
                  sizes="(max-width: 900px) 70vw, 380px"
                  className={`splitMediaPhotoImg ${styles.afterPhotoImg}`}
                />
              </div>
            </Reveal>
          </div>
          <Join />
        </div>
      </section>

      <section className={`${page.sectionLight} ${styles.bandSoft}`} id="taryfy">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.tariffs.title}</h2>
          </Reveal>
          <div className={styles.tariffs}>
            {d.tariffs.items.map((tariff, i) => (
              <Reveal key={tariff.name} from="up" delay={i * 80}>
                <article className={`${styles.tariff} ${tariff.featured ? styles.tariffFeatured : ''}`}>
                  {'badge' in tariff && tariff.badge ? (
                    <span className={styles.tariffBadge}>{tariff.badge}</span>
                  ) : null}
                  <h3>{tariff.name}</h3>
                  <ul>
                    {tariff.features.map((f) => {
                      const text = typeof f === 'string' ? f : f.text
                      const struck = typeof f !== 'string' && f.struck
                      return (
                        <li key={text} className={struck ? styles.tariffStruck : undefined}>
                          {text}
                        </li>
                      )
                    })}
                  </ul>
                  <div className={styles.tariffFooter}>
                    <p className={styles.tariffPrice}>{tariff.price}</p>
                    <BookCta
                      label="Доєднатися"
                      tariff={`${tariff.name} · ${tariff.price}`}
                      href={APPLY_FORMS.konsaltyng}
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={page.sectionLight} id="keisy">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.cases.title}</h2>
          </Reveal>
          <CasesCarousel
            items={d.cases.items}
            beforeLabel="Точка А"
            afterLabel="Точка Б"
            variant="instagram"
          />
        </div>
      </section>

      <section className={styles.aboutBand}>
        <div className={page.wrap}>
          <Reveal from="blur">
            <h2 className={styles.aboutTitle}>{d.about.title}</h2>
          </Reveal>
          <div className={`splitMedia ${styles.aboutLayout}`}>
            <div className={`splitMediaCopy ${styles.aboutCopy}`}>
              <Reveal from="up" delay={80}>
                <p className={styles.aboutLead}>{d.about.p1}</p>
              </Reveal>
              <Reveal from="up" delay={140}>
                <p>{d.about.p2}</p>
              </Reveal>
              <Reveal from="clip" delay={200}>
                <blockquote className={styles.aboutQuote}>
                  <p>{d.about.p3}</p>
                  <footer>— {d.about.name}</footer>
                </blockquote>
              </Reveal>
            </div>
            <Reveal from="tilt" delay={120} className={`splitMediaPhotoWrap ${styles.aboutPhotoReveal}`}>
              <div className={`splitMediaPhoto ${styles.aboutPhoto}`}>
                <Image
                  src={d.about.image}
                  alt={d.about.name}
                  fill
                  sizes="(max-width: 900px) 86vw, 380px"
                  className={`splitMediaPhotoImg ${styles.aboutPhotoImg}`}
                />
              </div>
            </Reveal>
          </div>
          <div className={`${page.sectionCta} ${styles.aboutCta}`}>
            <Reveal from="pop" delay={100}>
              <BookCta label="Доєднатися" href={APPLY_FORMS.konsaltyng} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
