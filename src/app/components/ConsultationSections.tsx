import Image from 'next/image'
import { CONSULTATION } from '../konsultatsiya/data'
import PillCta from './PillCta'
import Reveal from './Reveal'
import page from '../konsultatsiya/consultation.module.css'
import styles from './ConsultationSections.module.css'

const TOPIC_SIZES = [
  styles.topicLg,
  styles.topicSm,
  styles.topicMd,
  styles.topicLg,
  styles.topicSm,
  styles.topicMd,
] as const

function Book() {
  return (
    <div className={page.sectionCta}>
      <PillCta href="#kontakt" />
    </div>
  )
}

export default function ConsultationSections() {
  const d = CONSULTATION

  return (
    <>
      <section className={page.sectionLight} id="dlya-koho">
        <div className={page.wrap}>
          <h2 className={page.sectionTitle}>{d.audience.title}</h2>
          <div className={styles.audienceGrid}>
            {d.audience.items.map((item, i) => (
              <article key={item} className={styles.audienceCard}>
                <span className={styles.audienceN}>{String(i + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <Book />
        </div>
      </section>

      <section className={page.sectionLight}>
        <div className={page.wrap}>
          <h2 className={page.sectionTitle}>{d.topics.title}</h2>
          <div className={styles.topics}>
            {d.topics.items.map((t, i) => (
              <Reveal
                key={t.n}
                from={i % 2 === 0 ? 'left' : 'right'}
                delay={i * 70}
                className={`${styles.topic} ${TOPIC_SIZES[i]}`}
              >
                <span className={styles.topicN}>{`//${t.n}`}</span>
                <p>{t.text}</p>
              </Reveal>
            ))}
          </div>
          <Book />
        </div>
      </section>

      <section className={page.sectionLight}>
        <div className={page.wrap}>
          <div className={styles.split}>
            <div>
              <h2 className={page.sectionTitle}>{d.outcomes.title}</h2>
              <ul className={page.checkList}>
                {d.outcomes.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Book />
            </div>
            <div className={styles.video}>
              <span>Відео Іллі</span>
              <p>Незабаром</p>
            </div>
          </div>
        </div>
      </section>

      <section className={page.sectionLight} id="oferta">
        <div className={page.wrap}>
          <div className={styles.offerLayout}>
            <div>
              <h2 className={page.sectionTitle}>{d.offer.title}</h2>
              <p className={styles.offerLead}>
                Все необхідне, щоб після сесії вийти з чітким планом і підтримкою на впровадження.
              </p>
            </div>
            <div className={styles.offerCard}>
              <ul className={styles.offerList}>
                {d.offer.items.map((item, i) => (
                  <li key={item}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.offerFooter}>
                <p className={styles.price}>{d.offer.price}</p>
                <PillCta href="#kontakt" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={page.sectionLight}>
        <div className={page.wrap}>
          <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.testimonials.title}</h2>
          <div className={styles.cases}>
            {d.testimonials.items.map((c) => (
              <article key={c.name} className={styles.case}>
                <div className={styles.caseHead}>
                  <div className={styles.casePhoto}>
                    <Image
                      src={c.photo}
                      alt={c.name}
                      fill
                      sizes="96px"
                      className={styles.casePhotoImg}
                    />
                  </div>
                  <h3>{c.name}</h3>
                </div>
                <div className={styles.caseCols}>
                  <div>
                    <p className={styles.caseLabel}>До</p>
                    <ul>
                      {c.before.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className={styles.caseLabelAfter}>Після</p>
                    <ul>
                      {c.after.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.aboutBand} litunSky`}>
        <div className={page.wrapNarrow}>
          <p className={styles.aboutName}>{d.about.name}</p>
          <h2 className={styles.aboutTitle}>{d.about.title}</h2>
          <div className={styles.aboutText}>
            <p>{d.about.p1}</p>
            <p>{d.about.p2}</p>
            <p className={styles.aboutAccent}>{d.about.p3}</p>
          </div>
          <div className={page.sectionCta}>
            <PillCta href="#kontakt" />
          </div>
        </div>
      </section>
    </>
  )
}
