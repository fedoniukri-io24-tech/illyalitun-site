import type { Metadata } from 'next'
import { pageMetadata } from '../seo'
import { STRAT } from './data'
import { PageJsonLd } from '../components/JsonLd'
import Navbar from '../components/Navbar'
import StratHero from '../components/StratHero'
import StratSections from '../components/StratSections'
import StratFaq from '../components/StratFaq'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import page from '../konsultatsiya/consultation.module.css'

export const metadata: Metadata = pageMetadata('stratSesiya')

export default function StratSesiyaPage() {
  return (
    <>
      <PageJsonLd
        pageKey="stratSesiya"
        serviceName="Страт сесія"
        serviceDescription={STRAT.hero.lead}
        faq={STRAT.faq}
      />
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
