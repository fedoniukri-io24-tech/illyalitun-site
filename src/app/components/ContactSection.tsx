import Image from 'next/image'
import { BRAND } from '../brand'
import ContactForm from './ContactForm'
import Reveal from './Reveal'
import styles from './ContactSection.module.css'

export default function ContactSection({ tightTop = false }: { tightTop?: boolean }) {
  return (
    <section id="kontakt" className={`${styles.section} ${tightTop ? styles.tightTop : ''}`}>
      <div className={styles.inner}>
        <Reveal from="clip">
          <div className={styles.intro}>
            <h2 className={styles.heading}>
              Поговорімо<br /><em>про ріст</em>
            </h2>
            <p className={styles.lead}>
              Залиште заявку — підберемо формат роботи під ваш етап освітнього бізнесу.
            </p>
          </div>
        </Reveal>

        <Reveal from="tilt" delay={80}>
          <div className={styles.panel}>
            <div className={styles.visual}>
              <Image
                src={BRAND.contactImage}
                alt="Освітній бізнес з Іллею Літуном"
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
                className={styles.img}
              />
              <div className={styles.visualOverlay} aria-hidden="true" />
              <div className={styles.visualContent}>
                <p className={styles.visualText}>
                  Консалтинг · Консультація · Страт сесія · Клуб
                </p>
                <div className={styles.visualContacts}>
                  <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</a>
                  <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                </div>
              </div>
            </div>

            <div className={styles.formCard}>
              <ContactForm idPrefix="page" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
