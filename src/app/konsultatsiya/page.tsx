import type { Metadata } from 'next'
import { pageMetadata } from '../seo'
import { CONSULTATION } from './data'
import { PageJsonLd } from '../components/JsonLd'
import Navbar from '../components/Navbar'
import ConsultationHero from '../components/ConsultationHero'
import ConsultationProblem from '../components/ConsultationProblem'
import ConsultationSections from '../components/ConsultationSections'
import ConsultationFaq from '../components/ConsultationFaq'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import page from './consultation.module.css'

export const metadata: Metadata = pageMetadata('konsultatsiya')

export default function KonsultatsiyaPage() {
  return (
    <>
      <PageJsonLd
        pageKey="konsultatsiya"
        serviceName="Особиста консультація"
        serviceDescription={CONSULTATION.hero.lead}
        faq={CONSULTATION.faq}
      />
      <Navbar transparent />
      <main className={page.page}>
        <ConsultationHero />
        <ConsultationProblem />
        <ConsultationSections />
        <ConsultationFaq />
        <ContactSection tightTop />
      </main>
      <Footer />
    </>
  )
}
