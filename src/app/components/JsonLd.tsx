import { BRAND, SOCIALS, SERVICES } from '../brand'
import {
  SITE,
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  PAGES,
} from '../seo'

type FaqItem = { q: string; a: string }

function Script({ data }: { data: Record<string, unknown> | object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** Site-wide structured data for root layout */
export default function JsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: BRAND.name,
    alternateName: ['Illia Litun', 'Ilya Litun'],
    jobTitle: 'Засновник TURBO EDUCATION',
    description: SITE.description,
    url: SITE.url,
    image: absoluteUrl(SITE.image),
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: SOCIALS.map((s) => s.href),
    knowsAbout: [
      'EdTech',
      'освітній бізнес',
      'масштабування онлайн-шкіл',
      'маркетинг освіти',
      'управління командою',
      'фінанси освітнього бізнесу',
    ],
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.brand,
    },
    nationality: {
      '@type': 'Country',
      name: 'Ukraine',
    },
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.brand,
    legalName: SITE.brand,
    url: SITE.url,
    logo: absoluteUrl('/icon.svg'),
    image: absoluteUrl(SITE.image),
    description:
      'Освітня екосистема TURBO EDUCATION. Засновник — лауреат номінації Forbes 30 до 30. 7000+ активних учнів щомісяця, 30 000+ випускників.',
    email: SITE.email,
    telephone: SITE.phone,
    founder: {
      '@type': 'Person',
      '@id': `${SITE.url}/#person`,
      name: BRAND.name,
    },
    sameAs: SOCIALS.map((s) => s.href),
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: SITE.email,
      telephone: SITE.phone,
      availableLanguage: ['Ukrainian', 'uk'],
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.title,
    alternateName: ['Ілля Літун', 'TURBO EDUCATION'],
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'uk-UA',
    publisher: {
      '@id': `${SITE.url}/#organization`,
    },
    copyrightHolder: {
      '@id': `${SITE.url}/#person`,
    },
  }

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#business`,
    name: `${BRAND.name} — консалтинг освітнього бізнесу`,
    description: SITE.description,
    url: SITE.url,
    image: absoluteUrl(SITE.image),
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '$$',
    currenciesAccepted: 'USD, UAH',
    paymentAccepted: 'Bank Transfer, Card',
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kyiv',
      addressCountry: 'UA',
    },
    founder: {
      '@id': `${SITE.url}/#person`,
    },
    parentOrganization: {
      '@id': `${SITE.url}/#organization`,
    },
    sameAs: SOCIALS.map((s) => s.href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Послуги для освітнього бізнесу',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.lead,
          url: absoluteUrl(service.href),
        },
      })),
    },
  }

  const services = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Послуги Іллі Літуна для освітнього бізнесу',
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      description: service.lead,
      url: absoluteUrl(service.href),
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.lead,
        url: absoluteUrl(service.href),
        provider: {
          '@id': `${SITE.url}/#person`,
        },
      },
    })),
  }

  return (
    <>
      <Script data={person} />
      <Script data={organization} />
      <Script data={website} />
      <Script data={professionalService} />
      <Script data={services} />
    </>
  )
}

/** Per-page breadcrumb + service + FAQ structured data */
export function PageJsonLd({
  pageKey,
  serviceName,
  serviceDescription,
  faq,
}: {
  pageKey: keyof typeof PAGES
  serviceName: string
  serviceDescription: string
  faq: readonly FaqItem[]
}) {
  const page = PAGES[pageKey]

  const crumbs = breadcrumbSchema([
    { name: 'Головна', path: '/' },
    { name: serviceName, path: page.path },
  ])

  const service = serviceSchema({
    name: serviceName,
    description: serviceDescription,
    path: page.path,
    image: page.image,
  })

  const faqPage = faqSchema(faq)

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.absoluteTitle ?? `${page.title} | ${SITE.name}`,
    description: page.description,
    inLanguage: 'uk-UA',
    isPartOf: {
      '@id': `${SITE.url}/#website`,
    },
    about: {
      '@id': `${SITE.url}/#person`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(page.image),
    },
  }

  return (
    <>
      <Script data={webPage} />
      <Script data={crumbs} />
      <Script data={service} />
      <Script data={faqPage} />
    </>
  )
}
