import type { ReactNode } from 'react'
import styles from './HeroThought.module.css'

export default function HeroThought({
  children,
}: {
  children: ReactNode
  /** @deprecated kept for call-site compatibility */
  tone?: 'blue' | 'orange' | 'deep'
}) {
  return (
    <aside className={styles.wrap} aria-label={typeof children === 'string' ? children : undefined}>
      <p className={styles.cloud}>{children}</p>
    </aside>
  )
}
