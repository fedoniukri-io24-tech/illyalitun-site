'use client'

import Image from 'next/image'
import { STRAT } from '../strat-sesiya/data'
import BookCta from './BookCta'
import CasesCarousel from './CasesCarousel'
import Reveal from './Reveal'
import page from '../konsultatsiya/consultation.module.css'
import styles from './StratSections.module.css'

function Book({ label = 'Забронювати місце' }: { label?: string }) {
  return (
    <Reveal from="pop" delay={60}>
      <div className={page.sectionCta}>
        <BookCta label={label} />
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

      <section className={`${page.sectionLight} ${styles.bandSoft}`} id="fasylitator">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.facilitator.title}</h2>
          </Reveal>
          <Reveal from="up" delay={40}>
            <p className={styles.sectionLead}>{d.facilitator.lead}</p>
          </Reveal>
          <Reveal from="up" delay={70}>
            <p className={styles.sectionIntro}>{d.facilitator.intro}</p>
          </Reveal>
          <div className={styles.threeGrid}>
            {d.facilitator.items.map((item, i) => (
              <Reveal key={item.title} from="tilt" delay={i * 70}>
                <article className={styles.featureCard}>
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

      <section className={page.sectionLight} id="pidhotovka">
        <div className={page.wrap}>
          <div className={styles.prepLayout}>
            <div>
              <Reveal from="clip">
                <h2 className={page.sectionTitle}>{d.prep.title}</h2>
              </Reveal>
              <Reveal from="up" delay={50}>
                <p className={styles.prepLead}>{d.prep.lead}</p>
              </Reveal>
              <Reveal from="up" delay={80}>
                <p className={styles.prepText}>{d.prep.text}</p>
              </Reveal>
            </div>
            <div className={styles.prepList}>
              {d.prep.items.map((item, i) => (
                <Reveal key={item.title} from="right" delay={i * 50}>
                  <article className={styles.prepItem}>
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
          </div>
        </div>
      </section>

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

      <section className={page.sectionLight} id="rozklad">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.schedule.title}</h2>
          </Reveal>
          <Reveal from="up" delay={40}>
            <p className={styles.sectionLead}>{d.schedule.lead}</p>
          </Reveal>
          <Reveal from="up" delay={60}>
            <p className={styles.sectionNote}>{d.schedule.note}</p>
          </Reveal>
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
                  <BookCta label="Забронювати місце" />
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
          <div className={styles.aboutLayout}>
            <div className={styles.aboutCopy}>
              <Reveal from="up" delay={80}>
                <p className={styles.aboutLead}>{d.about.name}</p>
              </Reveal>
              <Reveal from="up" delay={120}>
                <p>{d.about.p1}</p>
              </Reveal>
              <Reveal from="up" delay={150}>
                <p>{d.about.p2}</p>
              </Reveal>
              <Reveal from="clip" delay={180}>
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
            <Reveal from="tilt" delay={100}>
              <div className={styles.aboutPhoto}>
                <Image
                  src={d.about.image}
                  alt={d.about.name}
                  fill
                  sizes="(max-width: 900px) 90vw, 300px"
                  className={styles.aboutPhotoImg}
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
          <CasesCarousel
            items={d.results.items}
            beforeLabel="До сесії"
            afterLabel="Після сесії"
          />
        </div>
      </section>
    </>
  )
}
