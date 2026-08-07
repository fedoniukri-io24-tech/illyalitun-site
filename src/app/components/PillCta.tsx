import styles from './PillCta.module.css'

export default function PillCta({
  href = '#kontakt',
  label = 'Забронювати місце',
  onClick,
  external = false,
}: {
  href?: string
  label?: string
  onClick?: () => void
  /** Open in new tab (Google Form etc.) */
  external?: boolean
}) {
  const cls = `${styles.cta} ${styles.primary}`
  const content = (
    <>
      <span className={styles.label}>{label}</span>
      <span className={styles.arrow} aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 14 L14 2 M6 2 H14 V10" />
        </svg>
      </span>
    </>
  )

  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        {content}
      </button>
    )
  }

  return (
    <a
      href={href}
      className={cls}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {content}
    </a>
  )
}
