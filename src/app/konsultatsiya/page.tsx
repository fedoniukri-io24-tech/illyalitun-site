import type { Metadata } from 'next'
import { pageMetadata } from '../seo'
import { CONSULTATION } from './data'
import { APPLY_FORMS } from '../brand'
import { PageJsonLd } from '../components/JsonLd'
import Navbar from '../components/Navbar'
import ConsultationHero from '../components/ConsultationHero'
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
        <ConsultationSections />
        <ConsultationFaq />
        <ContactSection
          tightTop
          mode="apply"
          applyHref={APPLY_FORMS.konsultatsiya}
          title={null}
          ctaLabel="Залишити заявку"
        />
      </main>
      <Footer />
    </>
  )
}
