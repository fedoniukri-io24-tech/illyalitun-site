import { CONSULTATION } from '../konsultatsiya/data'
import PillCta from './PillCta'
import page from '../konsultatsiya/consultation.module.css'
import styles from './ConsultationProblem.module.css'

export default function ConsultationProblem() {
  const { problem } = CONSULTATION

  return (
    <section className={styles.section} id="problem">
      <div className={styles.chart} aria-hidden="true" />

      <div className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>[ {problem.eyebrow} ]</p>

          <h2 className={styles.title}>
            {problem.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <p className={styles.question}>{problem.question}</p>
        </div>

        <div className={styles.bubbles} aria-label="Базові речі">
          {problem.bubbles.map((b, i) => (
            <div
              key={b.text}
              className={`${styles.bubble} ${styles[`pos${i}`]} ${b.tone === 'filled' ? styles.filled : styles.outline}`}
            >
              {b.text}
            </div>
          ))}
        </div>
      </div>

      <div className={page.sectionCta}>
        <PillCta href="#kontakt" />
      </div>
    </section>
  )
}
