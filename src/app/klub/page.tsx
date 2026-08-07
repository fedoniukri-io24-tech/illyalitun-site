import type { Metadata } from 'next'
import { pageMetadata } from '../seo'
import { CLUB } from './data'
import { PageJsonLd } from '../components/JsonLd'
import Navbar from '../components/Navbar'
import ClubHero from '../components/ClubHero'
import ClubSections from '../components/ClubSections'
import ClubFaq from '../components/ClubFaq'
import Footer from '../components/Footer'
import page from '../konsultatsiya/consultation.module.css'

export const metadata: Metadata = pageMetadata('klub')

export default function KlubPage() {
  return (
    <>
      <PageJsonLd
        pageKey="klub"
        serviceName="Turbo Education Club for owners"
        serviceDescription={CLUB.hero.lead}
        faq={CLUB.faq}
      />
      <Navbar transparent />
      <main className={page.page}>
        <ClubHero />
        <ClubSections />
        <ClubFaq />
      </main>
      <Footer />
    </>
  )
}
