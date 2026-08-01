import type { Metadata } from 'next'
import { SERVICES } from '../brand'
import { pageMetadata } from '../seo'
import Navbar from '../components/Navbar'
import ServiceHero from '../components/ServiceHero'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const service = SERVICES[0]

export const metadata: Metadata = pageMetadata({
  title: service.title,
  description: service.lead,
  path: service.href,
})

export default function KonsaltyngPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServiceHero service={service} />
        <div className="litunBand">
          <ContactSection defaultService={service.label} />
        </div>
      </main>
      <Footer />
    </>
  )
}
