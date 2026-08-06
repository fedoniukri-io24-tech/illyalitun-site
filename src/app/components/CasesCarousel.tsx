'use client'

import { useEffect, useRef, useState } from 'react'
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

export default function CasesCarousel({
  items,
  beforeLabel = 'До',
  afterLabel = 'Після',
  variant = 'plain',
}: {
  items: readonly CaseItem[]
  beforeLabel?: string
  afterLabel?: string
  /** plain = text cards; instagram = phone screenshots + scroll */
  variant?: 'plain' | 'instagram'
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const isIg = variant === 'instagram'

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

  const goTo = (index: number) => {
    const el = scrollerRef.current
    if (!el) return
    const next = Math.max(0, Math.min(items.length - 1, index))
    const card = el.children[next] as HTMLElement | undefined
    if (!card) return
    card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <div className={`${styles.casesWrap} ${isIg ? styles.casesWrapIg : ''}`}>
      <div
        ref={scrollerRef}
        className={`${styles.cases} ${isIg ? styles.casesIg : styles.casesPlain}`}
      >
        {items.map((c, i) => {
          const href = isIg ? instagramHref(c) : undefined
          const cardClass = `${styles.case} ${isIg ? styles.caseIg : styles.casePlain} ${
            isIg && i % 2 === 1 ? styles.caseIgTiltAlt : ''
          } ${href ? styles.caseLink : ''}`

          const body = (
            <>
              {isIg && c.shot ? (
                <div className={styles.igShot}>
                  <Image
                    src={c.shot}
                    alt={`Instagram ${c.handle || c.name}`}
                    width={998}
                    height={1362}
                    sizes="(max-width: 900px) 70vw, 320px"
                    className={styles.igShotImg}
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
                    {c.handle ? <span className={styles.caseHandle}>{c.handle}</span> : null}
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

          return (
            <Reveal
              key={`${c.name}-${i}`}
              from={i % 2 === 0 ? 'fan' : 'tilt'}
              delay={i * 90}
              className={styles.caseReveal}
            >
              {href ? (
                <a
                  className={cardClass}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.name} в Instagram`}
                >
                  {body}
                </a>
              ) : (
                <article className={cardClass}>{body}</article>
              )}
            </Reveal>
          )
        })}
      </div>

      <div
        className={`${styles.casesControls} ${isIg ? styles.casesControlsVisible : ''}`}
        aria-label="Навігація відгуків"
      >
        <button
          type="button"
          className={styles.casesArrow}
          onClick={() => goTo(active - 1)}
          disabled={active <= 0}
          aria-label="Попередній"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18 L9 12 L15 6" />
          </svg>
        </button>

        <div className={styles.casesDots} role="tablist" aria-label="Слайди">
          {items.map((c, i) => (
            <button
              key={`${c.name}-dot-${i}`}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Відгук ${i + 1}`}
              className={`${styles.casesDot} ${active === i ? styles.casesDotActive : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.casesArrow}
          onClick={() => goTo(active + 1)}
          disabled={active >= items.length - 1}
          aria-label="Наступний"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6 L15 12 L9 18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
