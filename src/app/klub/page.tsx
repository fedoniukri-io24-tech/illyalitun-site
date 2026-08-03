import type { Metadata } from 'next'
import { pageMetadata } from '../seo'
import Navbar from '../components/Navbar'
import ClubHero from '../components/ClubHero'
import ClubSections from '../components/ClubSections'
import ClubFaq from '../components/ClubFaq'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import page from '../konsultatsiya/consultation.module.css'

export const metadata: Metadata = pageMetadata({
  title: 'Клуб',
  description:
    'Turbo Education Club for owners — місце, де ти знаходиш сильне оточення і рішення на будь-яке своє питання. Перший потік — 20 місць.',
  path: '/klub',
  image: '/images/club-hero.png',
})

export default function KlubPage() {
  return (
    <>
      <Navbar transparent />
      <main className={page.page}>
        <ClubHero />
        <ClubSections />
        <ClubFaq />
        <ContactSection tightTop />
      </main>
      <Footer />
    </>
  )
}
