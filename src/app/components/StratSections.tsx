'use client'

import Image from 'next/image'
import { APPLY_FORMS } from '../brand'
import { STRAT } from '../strat-sesiya/data'
import BookCta from './BookCta'
import Reveal from './Reveal'
import page from '../konsultatsiya/consultation.module.css'
import styles from './StratSections.module.css'

function Book({ label = 'Забронювати місце' }: { label?: string }) {
  return (
    <Reveal from="pop" delay={60}>
      <div className={page.sectionCta}>
        <BookCta label={label} href={APPLY_FORMS.stratSesiya} />
      </div>
    </Reveal>
  )
}

export default function StratSections() {
  const d = STRAT

  return (
    <>
      <section className={page.sectionLight} id="dlya-koho">
        <div className={page.wrap}>
          <Reveal from="blur">
            <p className={styles.quote}>{d.pains.quote}</p>
          </Reveal>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.pains.title}</h2>
          </Reveal>
          <div className={styles.painGrid}>
            {d.pains.items.map((item, i) => (
              <Reveal key={item} from="tilt" delay={i * 40}>
                <article className={styles.painCard}>
                  <span className={styles.keyN} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
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
          <Book label="Забронювати сесію" />
        </div>
      </section>

      <section className={styles.facilitatorBand} id="fasylitator">
        <div className={styles.facilitatorBg} aria-hidden="true">
          <Image
            src={d.facilitator.image}
            alt=""
            fill
            sizes="100vw"
            className={styles.facilitatorBgImg}
          />
        </div>
        <div className={`${page.wrap} ${styles.facilitatorInner}`}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter} ${styles.facilitatorTitle}`}>
              {d.facilitator.title}
            </h2>
          </Reveal>
          <Reveal from="up" delay={40}>
            <p className={`${styles.sectionLead} ${styles.facilitatorLead}`}>{d.facilitator.lead}</p>
          </Reveal>
          <Reveal from="up" delay={70}>
            <p className={`${styles.sectionIntro} ${styles.facilitatorIntro}`}>{d.facilitator.intro}</p>
          </Reveal>
          <div className={styles.threeGrid}>
            {d.facilitator.items.map((item, i) => (
              <Reveal key={item.title} from="tilt" delay={i * 70}>
                <article className={`${styles.featureCard} ${styles.facilitatorCard}`}>
                  <span className={styles.keyN} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Book />
        </div>
      </section>

      <section className={`${page.sectionLight} ${styles.prepSection}`} id="pidhotovka">
        <div className={`${page.wrap} ${styles.prepLayout}`}>
          <div className={styles.prepHeader}>
            <h2 className={page.sectionTitle}>{d.prep.title}</h2>
            <p className={styles.prepLead}>{d.prep.lead}</p>
            <p className={styles.prepText}>{d.prep.text}</p>
          </div>
          <div className={styles.prepList}>
            {d.prep.items.map((item, i) => (
              <Reveal key={item.title} from="right" delay={i * 50}>
                <article className={styles.prepItem}>
                  <span className={styles.prepIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video — uncomment when ready
      <section className={`${page.sectionLight} ${styles.bandSoft}`} id="video">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.video.title}</h2>
          </Reveal>
          <Reveal from="blur" delay={80}>
            <div className={styles.video}>
              <span>Відео Іллі</span>
              <p>{d.video.placeholder}</p>
            </div>
          </Reveal>
        </div>
      </section>
      */}

      <section className={`${page.sectionLight} ${styles.scheduleSection}`} id="rozklad">
        <div className={`${page.wrap} ${styles.scheduleLayout}`}>
          <div className={styles.scheduleHeader}>
            <h2 className={page.sectionTitle}>{d.schedule.title}</h2>
            <p className={styles.scheduleLead}>{d.schedule.lead}</p>
            <p className={styles.scheduleNote}>{d.schedule.note}</p>
          </div>
          <div className={styles.schedule}>
            {d.schedule.blocks.map((block, i) => (
              <div key={block.time} className={styles.scheduleBlock}>
                {'breakBefore' in block && block.breakBefore ? (
                  <Reveal from="up" delay={i * 40}>
                    <p className={styles.breakLabel}>{block.breakBefore}</p>
                  </Reveal>
                ) : null}
                <Reveal from="up" delay={i * 50 + 20}>
                  <article className={styles.scheduleCard}>
                    <div className={styles.scheduleTime}>{block.time}</div>
                    <div>
                      <h3>{block.title}</h3>
                      <ul>
                        {block.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
        <div className={page.wrap}>
          <Book />
        </div>
      </section>

      <section className={`${page.sectionLight} ${styles.bandSoft}`} id="transformatsiya">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.transform.title}</h2>
          </Reveal>
          <Reveal from="up" delay={40}>
            <p className={styles.sectionLead}>{d.transform.lead}</p>
          </Reveal>
          <div className={styles.transformTable}>
            <div className={styles.transformHead}>
              <span>До</span>
              <span>Після</span>
            </div>
            {d.transform.rows.map((row, i) => (
              <Reveal key={row.before} from="up" delay={i * 50}>
                <div className={styles.transformRow}>
                  <p className={styles.transformBefore}>{row.before}</p>
                  <p className={styles.transformAfter}>{row.after}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Book />
        </div>
      </section>

      <section className={page.sectionLight} id="oferta">
        <div className={page.wrap}>
          <div className={styles.offerLayout}>
            <Reveal from="clip">
              <h2 className={page.sectionTitle}>{d.offer.title}</h2>
            </Reveal>
            <Reveal from="tilt" delay={80}>
              <div className={styles.offerCard}>
                <ul className={styles.offerList}>
                  {d.offer.items.map((item, i) => (
                    <li key={item}>
                      <span className={styles.keyN} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.offerFooter}>
                  <div>
                    <span className={styles.priceLabel}>Вартість</span>
                    <p className={styles.price}>{d.offer.price}</p>
                  </div>
                  <BookCta label="Забронювати місце" href={APPLY_FORMS.stratSesiya} />
                </div>
              </div>
            </Reveal>
          </div>
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
              <Reveal from="up" delay={120}>
                <p>{d.about.p2}</p>
              </Reveal>
              <Reveal from="clip" delay={160}>
                <blockquote className={styles.aboutQuote}>
                  <p>{d.about.p3}</p>
                  <footer>— {d.about.name}</footer>
                </blockquote>
              </Reveal>
              <div className={styles.aboutStats}>
                {d.about.stats.map((s) => (
                  <div key={s.label} className={styles.aboutStat}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <Reveal from="tilt" delay={100} className={`splitMediaPhotoWrap ${styles.aboutPhotoReveal}`}>
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
        </div>
      </section>

      <section className={page.sectionLight} id="rezultat">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.results.title}</h2>
          </Reveal>
          <Reveal from="up" delay={80}>
            <article className={styles.resultFeature}>
              <div className={styles.resultPhoto}>
                <Image
                  src={d.results.photo}
                  alt={`Фото з ${d.results.name}`}
                  fill
                  sizes="(max-width: 900px) 92vw, 44vw"
                  className={styles.resultPhotoImg}
                  priority={false}
                />
              </div>
              <div className={styles.resultBody}>
                <p className={styles.resultName}>{d.results.name}</p>
                <div className={styles.resultCols}>
                  <div>
                    <p className={styles.resultLabel}>До сесії</p>
                    <ul>
                      {d.results.before.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.resultFlow} aria-hidden="true">
                    <span className={styles.resultFlowLine} />
                    <span className={styles.resultFlowArrow}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14" />
                        <path d="M6 13l6 6 6-6" />
                      </svg>
                    </span>
                    <span className={styles.resultFlowLine} />
                  </div>
                  <div>
                    <p className={styles.resultLabelAfter}>Після сесії</p>
                    <ul>
                      {d.results.after.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
