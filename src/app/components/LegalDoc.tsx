import type { ReactNode } from 'react'
import styles from './LegalDoc.module.css'

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string
  updated?: string
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <article className={styles.doc}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Юридичні документи</p>
        <h1 className={styles.title}>{title}</h1>
        {updated ? <p className={styles.updated}>{updated}</p> : null}
        {intro ? <div className={styles.intro}>{intro}</div> : null}
      </header>
      <div className={styles.body}>{children}</div>
    </article>
  )
}

export function Section({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

export function P({ children }: { children: ReactNode }) {
  return <p className={styles.p}>{children}</p>
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className={styles.list}>{children}</ul>
}

export function Li({ children }: { children: ReactNode }) {
  return <li>{children}</li>
}

export function Def({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className={styles.def}>
      <dt>{term}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export function Reqs({ children }: { children: ReactNode }) {
  return <div className={styles.reqs}>{children}</div>
}
