'use client'
import { useState, useEffect } from 'react'
import { SERVICES } from '../brand'
import { useLeadModal } from './LeadModalContext'
import styles from './Navbar.module.css'

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openModal } = useLeadModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
    return undefined
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const openLead = () => {
    setMenuOpen(false)
    openModal()
  }

  const navClass = [
    styles.nav,
    transparent && !scrolled ? styles.transparent : styles.solid,
  ].join(' ')

  return (
    <>
      <nav className={navClass}>
        <a href="/" className={styles.brand}>Turbo <span>Education</span></a>

        <div className={styles.center}>
          {SERVICES.map((s) => (
            <a key={s.slug} href={s.href}>{s.label}</a>
          ))}
        </div>

        <div className={styles.right}>
          <button type="button" className={styles.cta} onClick={openLead}>
            <span className={styles.ctaLabel}>Записатися</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 14 L14 2 M6 2 H14 V10"/>
              </svg>
            </span>
          </button>
        </div>

        <button className={styles.hamburger} onClick={() => setMenuOpen(true)} aria-label="Відкрити меню">
          <span/><span/><span/>
        </button>
      </nav>

      <div className={`${styles.drawer} ${menuOpen ? styles.open : ''}`} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        <div className={styles.drawerTop}>
          <a href="/" className={styles.drawerBrand} onClick={() => setMenuOpen(false)}>
            Turbo <span>Education</span>
          </a>
          <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label="Закрити">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4 L20 20 M20 4 L4 20"/>
            </svg>
          </button>
        </div>
        <nav className={styles.drawerNav} aria-label="Мобільна навігація">
          {SERVICES.map((s) => (
            <a key={s.slug} href={s.href} onClick={() => setMenuOpen(false)}>{s.label}</a>
          ))}
        </nav>
        <button type="button" className={styles.drawerCta} onClick={openLead}>
          <span className={styles.ctaLabel}>Записатися</span>
          <span className={styles.ctaArrow} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 14 L14 2 M6 2 H14 V10"/>
            </svg>
          </span>
        </button>
      </div>
    </>
  )
}
