import type { Metadata } from 'next'
import { SERVICES } from '../brand'
import { pageMetadata } from '../seo'
import Navbar from '../components/Navbar'
import ConsultationHero from '../components/ConsultationHero'
import ConsultationProblem from '../components/ConsultationProblem'
import ConsultationSections from '../components/ConsultationSections'
import ConsultationFaq from '../components/ConsultationFaq'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import page from './consultation.module.css'

const service = SERVICES[1]

export const metadata: Metadata = pageMetadata({
  title: 'Особиста консультація',
  description:
    'Від хаосу до системи за 1 розбір з Іллею Літуном: діагностика, покроковий план масштабування освітнього бізнесу та місяць підтримки в чаті.',
  path: '/konsultatsiya',
  image: '/images/consultation-hero.png',
})

export default function KonsultatsiyaPage() {
  return (
    <>
      <Navbar transparent />
      <main className={page.page}>
        <ConsultationHero />
        <ConsultationProblem />
        <ConsultationSections />
        <ConsultationFaq />
        <ContactSection defaultService={service.label} tightTop />
      </main>
      <Footer />
    </>
  )
}
