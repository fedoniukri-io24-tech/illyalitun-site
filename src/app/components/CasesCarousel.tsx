'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Reveal from './Reveal'
import styles from './ConsultationSections.module.css'

type CaseItem = {
  name: string
  photo: string
  before: readonly string[]
  after: readonly string[]
  role?: string
  handle?: string
}

export default function CasesCarousel({
  items,
  beforeLabel = 'До',
  afterLabel = 'Після',
}: {
  items: readonly CaseItem[]
  beforeLabel?: string
  afterLabel?: string
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

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
  }, [])

  const goTo = (index: number) => {
    const el = scrollerRef.current
    if (!el) return
    const next = Math.max(0, Math.min(items.length - 1, index))
    const card = el.children[next] as HTMLElement | undefined
    if (!card) return
    card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <div className={styles.casesWrap}>
      <div ref={scrollerRef} className={styles.cases}>
        {items.map((c, i) => (
          <Reveal key={`${c.name}-${i}`} from={i % 2 === 0 ? 'fan' : 'tilt'} delay={i * 90}>
            <article className={styles.case}>
              <div className={styles.caseHead}>
                <div className={styles.casePhoto}>
                  <Image
                    src={c.photo}
                    alt={c.name}
                    fill
                    sizes="96px"
                    className={styles.casePhotoImg}
                  />
                </div>
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
                <div>
                  <p className={styles.caseLabelAfter}>{afterLabel}</p>
                  <ul>
                    {c.after.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className={styles.casesControls} aria-label="Навігація відгуків">
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
