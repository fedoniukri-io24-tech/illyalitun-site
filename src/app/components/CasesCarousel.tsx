'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react'
import Image from 'next/image'
import styles from './ConsultationSections.module.css'

const AXIS_LOCK_PX = 10
const MIN_SWIPE_PX = 48
const SWIPE_RATIO = 0.18
const FLICK_VELOCITY = 0.42

type CaseItem = {
  name: string
  before: readonly string[]
  after: readonly string[]
  photo?: string
  shot?: string
  role?: string
  handle?: string
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
            alt={c.handle ? `Instagram ${c.handle}` : c.name}
            fill
            sizes="(max-width: 900px) 42vw, 280px"
            className={styles.igShotImg}
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
                draggable={false}
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
  variant?: 'plain' | 'instagram'
}) {
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const isIg = variant === 'instagram'
  const last = items.length - 1
  const canSwipe = last > 0

  const viewportRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(active)
  activeRef.current = active

  const gesture = useRef<{
    pointerId: number
    startX: number
    startY: number
    lastX: number
    lastT: number
    vx: number
    axis: 'undecided' | 'x' | 'y'
  } | null>(null)
  const suppressClick = useRef(false)

  const goTo = useCallback((index: number) => {
    setActive(Math.max(0, Math.min(last, index)))
  }, [last])

  const dragRef = useRef(0)

  const setDragPx = useCallback((px: number) => {
    dragRef.current = px
    viewportRef.current?.style.setProperty('--drag', `${px}px`)
  }, [])

  useEffect(() => {
    viewportRef.current?.style.setProperty('--i', String(active))
  }, [active])

  const rubber = (dx: number, index: number) => {
    const atStart = index <= 0 && dx > 0
    const atEnd = index >= last && dx < 0
    if (atStart || atEnd) return dx * 0.32
    return dx
  }

  const releasePointer = (el: HTMLDivElement, pointerId: number) => {
    gesture.current = null
    if (el.hasPointerCapture(pointerId)) {
      el.releasePointerCapture(pointerId)
    }
  }

  const settle = (next: number) => {
    const el = viewportRef.current
    const from = activeRef.current
    const slide = el?.querySelector(`.${styles.caseSlide}`) as HTMLElement | null
    const gap = el ? parseFloat(getComputedStyle(el).getPropertyValue('--gap')) || 0 : 0
    const step = (slide?.offsetWidth ?? el?.clientWidth ?? 0) + gap
    const remainder = dragRef.current + (next - from) * step

    el?.style.setProperty('--i', String(next))
    setDragPx(remainder)
    goTo(next)

    requestAnimationFrame(() => {
      setDragging(false)
      requestAnimationFrame(() => {
        setDragPx(0)
      })
    })
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!canSwipe || e.button !== 0) return
    if (gesture.current) return
    suppressClick.current = false
    gesture.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastT: e.timeStamp,
      vx: 0,
      axis: 'undecided',
    }
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = gesture.current
    if (!g || g.pointerId !== e.pointerId) return

    const dx = e.clientX - g.startX
    const dy = e.clientY - g.startY
    const dt = e.timeStamp - g.lastT

    if (dt > 0) {
      g.vx = (e.clientX - g.lastX) / dt
      g.lastX = e.clientX
      g.lastT = e.timeStamp
    }

    if (g.axis === 'undecided') {
      if (Math.abs(dx) < AXIS_LOCK_PX && Math.abs(dy) < AXIS_LOCK_PX) return
      // Vertical wins on ties so page scroll is never stolen.
      g.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (g.axis === 'y') {
        gesture.current = null
        return
      }
      e.currentTarget.setPointerCapture(e.pointerId)
      setDragging(true)
    }

    if (g.axis !== 'x') return

    suppressClick.current = true
    setDragPx(rubber(dx, activeRef.current))
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = gesture.current
    if (!g || g.pointerId !== e.pointerId) return

    const el = e.currentTarget
    const index = activeRef.current
    const dx = e.clientX - g.startX
    const width = el.clientWidth || 1
    const threshold = Math.max(MIN_SWIPE_PX, width * SWIPE_RATIO)
    const flicked = Math.abs(g.vx) >= FLICK_VELOCITY
    const wasSwipe = g.axis === 'x'

    releasePointer(el, e.pointerId)

    if (!wasSwipe) {
      setDragging(false)
      setDragPx(0)
      return
    }

    let next = index
    if (dx <= -threshold || (flicked && g.vx < 0 && dx < 0)) next = index + 1
    else if (dx >= threshold || (flicked && g.vx > 0 && dx > 0)) next = index - 1
    next = Math.max(0, Math.min(last, next))
    settle(next)
  }

  const onPointerCancel = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = gesture.current
    if (!g || g.pointerId !== e.pointerId) return
    const wasSwipe = g.axis === 'x'
    releasePointer(e.currentTarget, e.pointerId)
    if (wasSwipe) settle(activeRef.current)
    else {
      setDragging(false)
      setDragPx(0)
    }
  }

  const onClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return
    e.preventDefault()
    e.stopPropagation()
    suppressClick.current = false
  }

  return (
    <div
      className={`${styles.casesWrap} ${isIg ? styles.casesWrapIg : ''}`}
      aria-roledescription="carousel"
      aria-label={isIg ? 'Результати учасників' : 'Відгуки'}
    >
      <div
        ref={viewportRef}
        className={`${styles.casesViewport} ${isIg ? styles.casesViewportIg : styles.casesViewportPlain} ${
          dragging ? styles.casesViewportDragging : ''
        } ${canSwipe ? styles.casesViewportSwipe : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onLostPointerCapture={onPointerCancel}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          className={`${styles.casesTrack} ${isIg ? styles.casesTrackIg : styles.casesTrackPlain} ${
            dragging ? styles.casesTrackDragging : ''
          }`}
        >
          {items.map((c, i) => (
            <div key={`${c.name}-${i}`} className={styles.caseSlide}>
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
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.casesControls} ${styles.casesControlsVisible}`} aria-label="Навігація">
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
            disabled={active >= last}
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
