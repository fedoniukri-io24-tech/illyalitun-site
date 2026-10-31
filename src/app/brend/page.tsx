import type { Metadata } from 'next'
import { pageMetadata } from '../seo'
import { BRAND_COURSE } from './data'
import { PageJsonLd } from '../components/JsonLd'
import Navbar from '../components/Navbar'
import BrandHero from '../components/BrandHero'
import BrandSections from '../components/BrandSections'
import BrandFaq from '../components/BrandFaq'
import Footer from '../components/Footer'
import page from '../konsultatsiya/consultation.module.css'
import theme from './theme.module.css'

export const metadata: Metadata = pageMetadata('brend')

export default function BrendPage() {
  return (
    <div className={theme.brandPage}>
      <PageJsonLd
        pageKey="brend"
        serviceName="Освітній бренд для викладача"
        serviceDescription={BRAND_COURSE.hero.lead}
        faq={BRAND_COURSE.faq}
      />
      <Navbar transparent tone="forest" />
      <main className={`${page.page} ${theme.brandTheme}`}>
        <BrandHero />
        <BrandSections />
        <BrandFaq />
      </main>
      <Footer tone="forest" />
    </div>
  )
}
