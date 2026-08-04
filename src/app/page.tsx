import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { pageMetadata, SITE, absoluteUrl } from './seo'
import { SERVICES } from './brand'

export const metadata: Metadata = pageMetadata('home')

const homeWebPage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE.url}/#webpage`,
  url: SITE.url,
  name: SITE.title,
  description: SITE.description,
  inLanguage: 'uk-UA',
  isPartOf: { '@id': `${SITE.url}/#website` },
  about: { '@id': `${SITE.url}/#person` },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: absoluteUrl(SITE.image),
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Формати роботи з Іллею Літуном',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: absoluteUrl(s.href),
    })),
  },
}

export default function LitunPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPage) }}
      />
      <Navbar transparent />
      <main>
        <div className="litunSky">
          <Hero />
        </div>
      </main>
      <Footer />
    </>
  )
}
