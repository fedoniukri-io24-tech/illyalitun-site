'use client'

import Image from 'next/image'
import { APPLY_FORMS } from '../brand'
import { CONSULTATION } from '../konsultatsiya/data'
import BookCta from './BookCta'
import CasesCarousel from './CasesCarousel'
import ConsultationProblem from './ConsultationProblem'
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
    <Reveal from="pop" delay={80}>
      <div className={page.sectionCta}>
        <BookCta href={APPLY_FORMS.konsultatsiya} />
      </div>
    </Reveal>
  )
}

export default function ConsultationSections() {
  const d = CONSULTATION

  return (
    <>
      {/* 1 — Консультація для */}
      <section className={page.sectionLight} id="dlya-koho">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={page.sectionTitle}>{d.audience.title}</h2>
          </Reveal>
          <div className={styles.audienceGrid}>
            {d.audience.items.map((item, i) => (
              <Reveal key={item} from="tilt" delay={i * 55}>
                <article className={styles.audienceCard}>
                  <span className={styles.keyN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Book />
        </div>
      </section>

      {/* 2 — Повністю прописаний шлях / 80% */}
      <ConsultationProblem />

      {/* 3 — Пропрацюємо будь-який запит */}
      <section className={page.sectionLight} id="zapyt">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={page.sectionTitle}>{d.topics.title}</h2>
          </Reveal>
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

      {/* 4 — Як результат консультації */}
      <section className={page.sectionLight}>
        <div className={page.wrap}>
          <div className={`splitMedia ${styles.split}`}>
            <div className="splitMediaCopy">
              <Reveal from="clip">
                <h2 className={page.sectionTitle}>{d.outcomes.title}</h2>
              </Reveal>
              <Reveal from="left" delay={80}>
                <ul className={page.checkList}>
                  {d.outcomes.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
              <Book />
            </div>
            <Reveal from="tilt" delay={120} className={`splitMediaPhotoWrap ${styles.outcomesPhotoReveal}`}>
              <div className={`splitMediaPhoto ${styles.outcomesPhoto}`}>
                <Image
                  src={d.outcomes.image}
                  alt={d.outcomes.title}
                  fill
                  sizes="(max-width: 900px) 86vw, 380px"
                  className={`splitMediaPhotoImg ${styles.outcomesPhotoImg}`}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5 — Що входить */}
      <section className={page.sectionLight} id="oferta">
        <div className={page.wrap}>
          <div className={styles.offerLayout}>
            <Reveal from="clip">
              <div>
                <h2 className={page.sectionTitle}>{d.offer.title}</h2>
                <p className={styles.offerLead}>{d.offer.lead}</p>
              </div>
            </Reveal>
            <Reveal from="tilt" delay={100}>
              <div className={styles.offerCard}>
                <ul className={styles.offerList}>
                  {d.offer.items.map((item, i) => (
                    <li key={item}>
                      <span className={styles.keyN} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={styles.offerText}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.offerFooter}>
                  <div className={styles.priceBlock}>
                    <span className={styles.priceLabel}>Вартість</span>
                    <p className={styles.priceRow}>
                      <span className={styles.priceOld}>{d.offer.oldPrice}</span>
                      <span className={styles.price}>{d.offer.price}</span>
                    </p>
                  </div>
                  <BookCta href={APPLY_FORMS.konsultatsiya} label={d.offer.cta} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6 — Результати учасників */}
      <section className={`${page.sectionLight} ${styles.resultsSection}`} id="rezultaty">
        <div className={page.wrap}>
          <Reveal from="clip">
            <h2 className={`${page.sectionTitle} ${page.sectionTitleCenter}`}>{d.results.title}</h2>
          </Reveal>
          <CasesCarousel
            items={d.results.items}
            beforeLabel="До"
            afterLabel="Після"
            variant="instagram"
          />
        </div>
      </section>

      {/* 7 — Чому варто прийти */}
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
                <p>{d.about.p2}</p>
              </Reveal>
              <Reveal from="clip" delay={200}>
                <blockquote className={styles.aboutQuote}>
                  <p>{d.about.p3}</p>
                  <footer>— {d.about.name}</footer>
                </blockquote>
              </Reveal>
            </div>
          </div>

          <div className={`${page.sectionCta} ${styles.aboutCta}`}>
            <Reveal from="pop" delay={120}>
              <BookCta href={APPLY_FORMS.konsultatsiya} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
