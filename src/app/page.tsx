import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialsSection from './components/SocialsSection'
import Footer from './components/Footer'
import { pageMetadata } from './seo'
import { SITE } from './seo'

export const metadata: Metadata = pageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: '/',
})

export default function LitunPage() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="litunSky">
          <Hero />
        </div>
        <SocialsSection />
      </main>
      <Footer />
    </>
  )
}
