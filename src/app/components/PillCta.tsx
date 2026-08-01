import styles from './PillCta.module.css'

export default function PillCta({
  href = '#kontakt',
  label = 'Забронювати місце',
}: {
  href?: string
  label?: string
}) {
  return (
    <a href={href} className={`${styles.cta} ${styles.primary}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.arrow} aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 14 L14 2 M6 2 H14 V10" />
        </svg>
      </span>
    </a>
  )
}
