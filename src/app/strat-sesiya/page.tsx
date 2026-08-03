import type { Metadata } from 'next'
import { pageMetadata } from '../seo'
import Navbar from '../components/Navbar'
import StratHero from '../components/StratHero'
import StratSections from '../components/StratSections'
import StratFaq from '../components/StratFaq'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import page from '../konsultatsiya/consultation.module.css'

export const metadata: Metadata = pageMetadata({
  title: 'Страт сесія',
  description:
    'Один день — повна перебудова твоєї онлайн-школи. 8 годин інтенсивної роботи в Києві або Львові з Іллею Літуном.',
  path: '/strat-sesiya',
  image: '/images/strat-hero.png',
})

export default function StratSesiyaPage() {
  return (
    <>
      <Navbar transparent />
      <main className={page.page}>
        <StratHero />
        <StratSections />
        <StratFaq />
        <ContactSection tightTop />
      </main>
      <Footer />
    </>
  )
}
