'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Reveal from './Reveal'
import styles from './ConsultationSections.module.css'

type CaseItem = {
  name: string
  before: readonly string[]
  after: readonly string[]
  photo?: string
  shot?: string
  role?: string
  handle?: string
  /** Instagram profile URL; derived from handle if omitted */
  href?: string
}

function instagramHref(item: CaseItem): string | undefined {
  if (item.href) return item.href
  if (!item.handle) return undefined
  return `https://www.instagram.com/${item.handle.replace(/^@/, '')}/`
}

function CaseCardBody({
  c,
  isIg,
  beforeLabel,
  afterLabel,
}: {
  c: CaseItem
  isIg: boolean
  beforeLabel: string
  afterLabel: string
}) {
  const href = isIg ? instagramHref(c) : undefined

  return (
    <>
      {isIg && c.shot ? (
        <div className={styles.igShot}>
          <Image
            src={c.shot}
            alt={`Instagram ${c.handle || c.name}`}
            width={998}
            height={1362}
            sizes="(max-width: 900px) 100vw, 280px"
            className={styles.igShotImg}
            style={{ width: '100%', height: 'auto' }}
            draggable={false}
          />
        </div>
      ) : null}

      <div className={styles.caseContent}>
        <div className={styles.caseHead}>
          {!isIg && c.photo ? (
            <div className={styles.casePhoto}>
              <Image
                src={c.photo}
                alt={c.name}
                fill
                sizes="96px"
                className={styles.casePhotoImg}
              />
            </div>
          ) : null}
          <div className={styles.caseIdentity}>
            <h3>{c.name}</h3>
            {c.handle ? (
              href ? (
                <a
                  className={`${styles.caseHandle} ${styles.caseHandleLink}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {c.handle}
                </a>
              ) : (
                <span className={styles.caseHandle}>{c.handle}</span>
              )
            ) : null}
            {c.role ? <p className={styles.caseRole}>{c.role}</p> : null}
          </div>
        </div>

        <div className={styles.caseCols}>
          <div>
            <p className={styles.caseLabel}>{beforeLabel}</p>
            <ul>
              {c.before.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className={styles.caseFlow} aria-hidden="true">
            <span className={styles.caseFlowLine} />
            <span className={styles.caseFlowArrow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M6 13l6 6 6-6" />
              </svg>
            </span>
            <span className={styles.caseFlowLine} />
          </div>
          <div>
            <p className={styles.caseLabelAfter}>{afterLabel}</p>
            <ul>
              {c.after.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default function CasesCarousel({
  items,
  beforeLabel = 'До',
  afterLabel = 'Після',
  variant = 'plain',
}: {
  items: readonly CaseItem[]
  beforeLabel?: string
  afterLabel?: string
  /** plain = text cards; instagram = gallery with swipe */
  variant?: 'plain' | 'instagram'
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const isIg = variant === 'instagram'

  const goTo = useCallback((index: number) => {
    const el = scrollerRef.current
    if (!el) return
    const next = Math.max(0, Math.min(items.length - 1, index))
    const card = el.children[next] as HTMLElement | undefined
    if (!card) return
    // Scroll only the track — avoid scrollIntoView (it steals page scroll)
    const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
    el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
    setActive(next)
  }, [items.length])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const update = () => {
      const cards = Array.from(el.children) as HTMLElement[]
      if (!cards.length) return
      const center = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      cards.forEach((card, i) => {
        const mid = card.offsetLeft + card.offsetWidth / 2
        const dist = Math.abs(mid - center)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items.length, variant])

  useEffect(() => {
    const root = scrollerRef.current?.closest('[aria-roledescription="carousel"]')
    if (!root) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      // Don't steal arrows from inputs or when carousel isn't the active target
      const target = e.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      if (!root.contains(document.activeElement) && !root.matches(':hover')) return
      e.preventDefault()
      if (e.key === 'ArrowLeft') goTo(active - 1)
      if (e.key === 'ArrowRight') goTo(active + 1)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, goTo])

  return (
    <div
      className={`${styles.casesWrap} ${isIg ? styles.casesWrapIg : ''}`}
      aria-roledescription="carousel"
      aria-label={isIg ? 'Результати учасників' : 'Відгуки'}
    >
      <div
        ref={scrollerRef}
        className={`${styles.cases} ${isIg ? styles.casesIg : styles.casesPlain}`}
      >
        {items.map((c, i) => (
          <div key={`${c.name}-${i}`} className={styles.caseSlide}>
            <Reveal
              from={i % 2 === 0 ? 'fan' : 'tilt'}
              delay={isIg ? 0 : i * 90}
              className={styles.caseReveal}
            >
              <article
                className={`${styles.case} ${isIg ? styles.caseIg : styles.casePlain} ${
                  isIg && i % 2 === 1 ? styles.caseIgTiltAlt : ''
                }`}
              >
                <CaseCardBody
                  c={c}
                  isIg={isIg}
                  beforeLabel={beforeLabel}
                  afterLabel={afterLabel}
                />
              </article>
            </Reveal>
          </div>
        ))}
      </div>

      <div
        className={`${styles.casesControls} ${styles.casesControlsVisible}`}
        aria-label="Навігація"
      >
        <div className={styles.casesGalleryNav}>
          <button
            type="button"
            className={`${styles.casesArrow} ${styles.casesGalleryArrow}`}
            onClick={() => goTo(active - 1)}
            disabled={active <= 0}
            aria-label="Попередній"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18 L9 12 L15 6" />
            </svg>
          </button>

          <div className={styles.casesDots} role="tablist" aria-label="Слайди">
            {items.map((item, i) => (
              <button
                key={`${item.name}-dot-${i}`}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Відгук ${i + 1}${item.name ? `: ${item.name}` : ''}`}
                className={`${styles.casesDot} ${active === i ? styles.casesDotActive : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className={`${styles.casesArrow} ${styles.casesGalleryArrow}`}
            onClick={() => goTo(active + 1)}
            disabled={active >= items.length - 1}
            aria-label="Наступний"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6 L15 12 L9 18" />
            </svg>
          </button>
        </div>
        {isIg ? (
          <p className={styles.casesGalleryCount} aria-live="polite">
            {active + 1} / {items.length}
          </p>
        ) : null}
      </div>
    </div>
  )
}
