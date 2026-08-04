import type { Metadata } from 'next'
import { pageMetadata } from '../seo'
import { CONSULTING } from './data'
import { PageJsonLd } from '../components/JsonLd'
import Navbar from '../components/Navbar'
import ConsultingHero from '../components/ConsultingHero'
import ConsultingSections from '../components/ConsultingSections'
import ConsultingFaq from '../components/ConsultingFaq'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import page from '../konsultatsiya/consultation.module.css'

export const metadata: Metadata = pageMetadata('konsaltyng')

export default function KonsaltyngPage() {
  return (
    <>
      <PageJsonLd
        pageKey="konsaltyng"
        serviceName="Консалтинг «Бізнес під крилом»"
        serviceDescription={CONSULTING.hero.lead}
        faq={CONSULTING.faq}
      />
      <Navbar transparent />
      <main className={page.page}>
        <ConsultingHero />
        <ConsultingSections />
        <ConsultingFaq />
        <ContactSection tightTop />
      </main>
      <Footer />
    </>
  )
}
