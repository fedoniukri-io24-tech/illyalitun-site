import { SITE, absoluteUrl } from '../seo'
import { BRAND, SOCIALS, SERVICES } from '../brand'

export default function JsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: BRAND.name,
    jobTitle: 'Засновник TURBO EDUCATION',
    description: SITE.description,
    url: SITE.url,
    image: absoluteUrl(SITE.image),
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: SOCIALS.map((s) => s.href),
    worksFor: {
      '@type': 'Organization',
      name: 'TURBO EDUCATION',
      url: SITE.url,
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.title,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'uk-UA',
    publisher: {
      '@type': 'Person',
      name: BRAND.name,
    },
  }

  const services = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Послуги Іллі Літуна',
    itemListElement: SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.lead,
        url: absoluteUrl(service.href),
        provider: {
          '@type': 'Person',
          name: BRAND.name,
        },
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(services) }}
      />
    </>
  )
}
