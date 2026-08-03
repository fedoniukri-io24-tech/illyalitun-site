import type { Metadata } from 'next'
import { pageMetadata } from '../seo'
import Navbar from '../components/Navbar'
import ConsultingHero from '../components/ConsultingHero'
import ConsultingSections from '../components/ConsultingSections'
import ConsultingFaq from '../components/ConsultingFaq'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import page from '../konsultatsiya/consultation.module.css'

export const metadata: Metadata = pageMetadata({
  title: 'Консалтинг',
  description:
    'Систематизуй онлайн-школу та збільши чистий прибуток у 2 рази під особистим супроводом Іллі Літуна. Програма «Бізнес під крилом».',
  path: '/konsaltyng',
  image: '/images/consulting-hero.png',
})

export default function KonsaltyngPage() {
  return (
    <>
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
