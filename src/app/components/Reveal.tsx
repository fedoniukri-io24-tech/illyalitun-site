'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import styles from './Reveal.module.css'

export type RevealEffect = 'up' | 'left' | 'right' | 'clip' | 'blur' | 'tilt' | 'pop' | 'fan'

function isInView(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  const vw = window.innerWidth || document.documentElement.clientWidth
  return rect.top < vh * 0.92 && rect.bottom > 0 && rect.left < vw && rect.right > 0
}

export default function Reveal({
  children,
  className = '',
  from = 'up',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  from?: RevealEffect
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isInView(el)) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={[styles.reveal, styles[from], visible ? styles.visible : '', className]
        .filter(Boolean)
        .join(' ')}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
