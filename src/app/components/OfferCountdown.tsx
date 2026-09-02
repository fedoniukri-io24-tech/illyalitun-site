'use client'

import { useEffect, useState } from 'react'
import styles from './OfferCountdown.module.css'

type Props = {
  /** ISO datetime string, e.g. 2026-09-02T23:59:00+03:00 */
  endsAt: string
  label?: string
  className?: string
}

type Parts = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getParts(endsAtMs: number, nowMs: number): Parts | null {
  const diff = endsAtMs - nowMs
  if (diff <= 0) return null
  const totalSec = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function OfferCountdown({
  endsAt,
  label = 'Пропозиція доступна до 2 вересня 23:59',
  className,
}: Props) {
  const endsAtMs = new Date(endsAt).getTime()
  const [parts, setParts] = useState<Parts | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const tick = () => setParts(getParts(endsAtMs, Date.now()))
    tick()
    setReady(true)
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [endsAtMs])

  if (!ready || !parts) return null

  const units = [
    { value: parts.days, label: 'дні' },
    { value: parts.hours, label: 'год' },
    { value: parts.minutes, label: 'хв' },
    { value: parts.seconds, label: 'сек' },
  ]

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <p className={styles.label}>{label}</p>
      <div className={styles.timer} aria-live="polite">
        {units.map((u, i) => (
          <div key={u.label} className={styles.unit}>
            {i > 0 ? <span className={styles.sep} aria-hidden="true">:</span> : null}
            <div className={styles.cell}>
              <span className={styles.value}>{pad(u.value)}</span>
              <span className={styles.unitLabel}>{u.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
