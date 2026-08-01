'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './Reveal.module.css'

export default function Reveal({
  children,
  className = '',
  from = 'left',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  from?: 'left' | 'right'
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={[
        styles.reveal,
        styles[from],
        visible ? styles.visible : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
