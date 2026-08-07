'use client'

import Image from 'next/image'
import { CLUB } from '../klub/data'
import BookCta from './BookCta'
import Reveal from './Reveal'
import page from '../konsultatsiya/consultation.module.css'
import styles from './ClubSections.module.css'

function Join({ label = 'Доєднатися' }: { label?: string }) {
  return (
    <Reveal from="pop" delay={60}>
      <div className={page.sectionCta}>
        <BookCta label={label} />
      </div>
    </Reveal>
  )
}

export default function ClubSections() {
  const d = CLUB

  return (
    <>
      <section className={page.sectionLight} id="fit">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.fit.title}</h2>
          </Reveal>
          <Reveal from="up" delay={50}>
            <p className={styles.sectionLead}>{d.fit.lead}</p>
          </Reveal>
          <div className={styles.fitGrid}>
            {d.fit.items.map((item, i) => (
              <Reveal key={item.title} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 55}>
                <article className={styles.fitCard}>
                  <span className={styles.keyN} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Join />
        </div>
      </section>

      <section className={`${page.sectionLight} ${styles.bandSoft}`} id="vkhodyt">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.includes.title}</h2>
          </Reveal>
          <Reveal from="up" delay={50}>
            <p className={styles.sectionLeadWide}>{d.includes.lead}</p>
          </Reveal>
          <div className={styles.includeGrid}>
            {d.includes.items.map((item, i) => (
              <Reveal key={item.title} from="tilt" delay={i * 45} className={styles.includeReveal}>
                <article className={styles.includeCard}>
                  <span className={`${styles.cadence} ${styles.cadenceRight}`}>
                    {item.cadence}
                  </span>
                  <div className={styles.includeTop}>
                    <span className={styles.keyN} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Join />
        </div>
      </section>

      <section className={styles.programBand} id="programa">
        <div className={`${page.wrap} ${styles.programLayout}`}>
          <div className={styles.programSticky}>
            <Reveal from="clip">
              <h2 className={styles.programTitle}>{d.program.title}</h2>
            </Reveal>
            <Reveal from="up" delay={60}>
              <p className={styles.programLead}>{d.program.lead}</p>
            </Reveal>
          </div>
          <div className={styles.programTopics}>
            {d.program.topics.map((topic, i) => (
              <Reveal key={topic.title} from="up" delay={i * 50}>
                <article className={styles.programCard}>
                  <span className={styles.keyN} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{topic.title}</h3>
                    <p>{topic.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
              <Reveal key={tariff.name} from="up" delay={i * 70}>
                <article className={`${styles.tariff} ${tariff.featured ? styles.tariffFeatured : ''}`}>
                  <h3>{tariff.name}</h3>
                  <div className={styles.tariffPriceRow}>
                    <p className={styles.tariffPrice}>{tariff.price}</p>
                    {tariff.oldPrice ? (
                      <span className={styles.tariffOld}>{tariff.oldPrice}</span>
                    ) : null}
                  </div>
                  {tariff.perMonth ? (
                    <p className={styles.tariffPer}>
                      <span>{tariff.perMonth}</span>
                      {'perMonthOld' in tariff && tariff.perMonthOld ? (
                        <span className={styles.tariffOldSm}>{tariff.perMonthOld}</span>
                      ) : null}
                      <span className={styles.tariffPerLabel}> / міс</span>
                    </p>
                  ) : (
                    <p className={styles.tariffPerSpacer} aria-hidden="true">&nbsp;</p>
                  )}
                  {tariff.save ? (
                    <p className={styles.tariffSave}>{tariff.save}</p>
                  ) : (
                    <p className={styles.tariffSaveSpacer} aria-hidden="true">&nbsp;</p>
                  )}
                  <BookCta
                    label="Обрати"
                    tariff={`${tariff.name} · ${tariff.price}${tariff.perMonth ? ` (${tariff.perMonth}/міс)` : ''}`}
                    href={tariff.href}
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.aboutBand}>
        <div className={page.wrap}>
          <Reveal from="blur">
            <h2 className={styles.aboutTitle}>{d.about.title}</h2>
          </Reveal>
          <div className={styles.aboutLayout}>
            <div className={styles.aboutCopy}>
              <Reveal from="up" delay={80}>
                <p className={styles.aboutLead}>{d.about.p1}</p>
              </Reveal>
              <Reveal from="up" delay={140}>
                <p>{d.about.role}</p>
              </Reveal>
              <Reveal from="clip" delay={180}>
                <blockquote className={styles.aboutQuote}>
                  <p>{d.about.p2}</p>
                  <footer>— {d.about.name}</footer>
                </blockquote>
              </Reveal>
            </div>
            <Reveal from="tilt" delay={120} className={styles.aboutPhotoReveal}>
              <div className={styles.aboutPhoto}>
                <Image
                  src={d.about.image}
                  alt={d.about.name}
                  fill
                  sizes="(max-width: 900px) 86vw, 400px"
                  className={styles.aboutPhotoImg}
                />
              </div>
            </Reveal>
          </div>
          <div className={`${page.sectionCta} ${styles.aboutCta}`}>
            <Reveal from="pop" delay={100}>
              <BookCta label="Доєднатися" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
