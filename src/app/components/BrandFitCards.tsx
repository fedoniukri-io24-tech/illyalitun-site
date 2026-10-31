'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { BRAND_COURSE } from '../brend/data'
import styles from './BrandFitCards.module.css'

const items = BRAND_COURSE.fit.items
const TOTAL = items.length

const FINAL_ROTATE = [-3.2, 2.4, -2.0, 3.0] as const
const FLY_FROM = [
  { x: 18, y: -8, r: 14 },
  { x: -16, y: 10, r: -12 },
  { x: 20, y: 6, r: 16 },
  { x: -14, y: -6, r: -10 },
] as const

type Pose = { left: number; top: number; rotate: number }

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function easeOutBack(t: number) {
  const c = 1.35
  const t1 = t - 1
  return 1 + c * t1 * t1 * t1 + t1 * t1
}

function desktopTarget(index: number): Pose {
  const gap = 2
  const width = (100 - gap * (TOTAL - 1)) / TOTAL
  return {
    left: index * (width + gap),
    top: 6 + (index % 2 === 0 ? 0 : 6),
    rotate: FINAL_ROTATE[index] ?? 0,
  }
}

function mobileTarget(index: number): Pose {
  return {
    left: 3 + (index % 2) * 2,
    // Overlap more so larger cards still fit in the viewport
    top: 2 + index * 18,
    rotate: FINAL_ROTATE[index] ?? 0,
  }
}

/**
 * progress 0→1 over sticky scroll.
 * Each segment flies one card into its slot beside the others.
 * Settled cards stay visible next to each other.
 */
function cardMotion(
  index: number,
  progress: number,
  isMobile: boolean,
): CSSProperties {
  const span = 1 / TOTAL
  const start = index * span
  const flyEnd = start + span * 0.45
  const target = isMobile ? mobileTarget(index) : desktopTarget(index)
  const from = FLY_FROM[index] ?? FLY_FROM[0]
  const cardW = isMobile ? 94 : (100 - 2 * (TOTAL - 1)) / TOTAL

  const settled = (): CSSProperties => ({
    opacity: 1,
    zIndex: 10 + index,
    left: `${target.left}%`,
    top: `${target.top}%`,
    width: isMobile ? `${cardW}%` : `${cardW}%`,
    transform: `rotate(${target.rotate}deg) scale(1)`,
    pointerEvents: 'auto',
  })

  // First card already in place when section pins
  if (index === 0) {
    if (progress < flyEnd) return settled()
    return settled()
  }

  // Waiting off-stage
  if (progress < start) {
    return {
      opacity: 0,
      zIndex: index,
      left: `${target.left + from.x}%`,
      top: `${target.top + from.y}%`,
      width: `${cardW}%`,
      transform: `rotate(${from.r}deg) scale(0.88)`,
      pointerEvents: 'none',
    }
  }

  // Flying into slot
  if (progress < flyEnd) {
    const t = easeOutBack(clamp((progress - start) / (flyEnd - start), 0, 1))
    const left = target.left + from.x * (1 - t)
    const top = target.top + from.y * (1 - t)
    const rotate = from.r + (target.rotate - from.r) * t
    return {
      opacity: clamp(0.2 + t * 0.8, 0, 1),
      zIndex: 20 + index,
      left: `${left}%`,
      top: `${top}%`,
      width: `${cardW}%`,
      transform: `rotate(${rotate}deg) scale(${0.88 + 0.12 * t})`,
      pointerEvents: t > 0.55 ? 'auto' : 'none',
    }
  }

  // Settled beside previous cards — never leave
  return settled()
}

function FitCard({
  index,
  title,
  fitIf,
  style,
}: {
  index: number
  title: string
  fitIf: string
  style: CSSProperties
}) {
  const n = String(index + 1).padStart(2, '0')
  const total = String(TOTAL).padStart(2, '0')

  return (
    <article className={styles.card} style={style}>
      <span className={`${styles.rivet} ${styles.rivetTl}`} aria-hidden />
      <span className={`${styles.rivet} ${styles.rivetTr}`} aria-hidden />
      <span className={`${styles.rivet} ${styles.rivetBl}`} aria-hidden />
      <span className={`${styles.rivet} ${styles.rivetBr}`} aria-hidden />

      <div className={styles.cardTop}>
        <span className={styles.index}>
          {n} / {total}
        </span>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>

      <div className={styles.cardBottom}>
        <p className={styles.fitLabel}>Підійде, якщо:</p>
        <p className={styles.fitText}>{fitIf}</p>
      </div>
    </article>
  )
}

export default function BrandFitCards() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = window.matchMedia('(max-width: 900px)')
    const sync = () => {
      setReduceMotion(motion.matches)
      setIsMobile(mobile.matches)
    }
    sync()
    motion.addEventListener('change', sync)
    mobile.addEventListener('change', sync)
    return () => {
      motion.removeEventListener('change', sync)
      mobile.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1)
      return
    }

    const section = sectionRef.current
    if (!section) return

    let frame = 0

    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const scrollable = Math.max(section.offsetHeight - vh, 1)
      const scrolled = clamp(-rect.top, 0, scrollable)
      const next = scrolled / scrollable
      setProgress((current) => (Math.abs(current - next) < 0.0015 ? current : next))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduceMotion])

  const motionProgress = reduceMotion ? 1 : progress
  const active = Math.min(Math.floor(motionProgress * TOTAL), TOTAL - 1)

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${reduceMotion ? styles.sectionStatic : styles.sectionScroll}`}
      id="dlya-koho"
      aria-label={BRAND_COURSE.fit.title}
      style={{ '--scroll-steps': TOTAL } as CSSProperties}
    >
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h2 className={styles.title}>{BRAND_COURSE.fit.title}</h2>
            <p className={styles.lead}>{BRAND_COURSE.fit.lead}</p>
            {!reduceMotion ? (
              <p className={styles.stepHint} aria-live="polite">
                {String(active + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
              </p>
            ) : null}
          </header>

          <div className={styles.stage}>
            {items.map((item, index) => (
              <FitCard
                key={item.title}
                index={index}
                title={item.title}
                fitIf={item.fitIf}
                style={cardMotion(index, motionProgress, isMobile)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
