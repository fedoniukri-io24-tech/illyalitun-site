import type { Metadata } from 'next'

export const SITE = {
  name: 'Ілля Літун',
  brand: 'TURBO EDUCATION',
  title: 'Ілля Літун | Консалтинг і супровід освітнього бізнесу',
  shortTitle: 'Ілля Літун',
  description:
    'Особистий консалтинг, консультації, стратегічні сесії та клуб для власників онлайн-шкіл від Іллі Літуна — засновника TURBO EDUCATION, лауреата номінації Forbes 30 до 30. Систематизація, зростання прибутку та масштабування EdTech-бізнесу.',
  locale: 'uk_UA',
  language: 'uk',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://illyalitun.com',
  email: 'hello@turbo.education',
  phone: '+380670000000',
  image: '/images/hero-author.png',
  twitter: '@illya_litun',
  keywords: [
    'Ілля Літун',
    'TURBO EDUCATION',
    'освітній бізнес',
    'консалтинг онлайн-школи',
    'масштабування EdTech',
    'консультація для власника школи',
    'стратегічна сесія освіта',
    'клуб освітніх підприємців',
    'системність в онлайн-школі',
    'зростання прибутку EdTech',
    'Forbes 30 до 30',
    'бізнес під крилом',
  ],
} as const

export type PageSeoKey = 'home' | 'konsultatsiya' | 'konsaltyng' | 'stratSesiya' | 'klub'

export const PAGES: Record<
  PageSeoKey,
  {
    path: string
    title: string
    /** Full browser title without template suffix */
    absoluteTitle?: string
    description: string
    keywords: string[]
    image: string
    ogType?: 'website' | 'article' | 'profile'
  }
> = {
  home: {
    path: '/',
    title: SITE.shortTitle,
    absoluteTitle: SITE.title,
    description: SITE.description,
    keywords: [...SITE.keywords],
    image: SITE.image,
    ogType: 'website',
  },
  konsultatsiya: {
    path: '/konsultatsiya',
    title: 'Особиста консультація для власника онлайн-школи',
    description:
      'Персональна консультація з Іллею Літуном: діагностика освітнього бізнесу, чіткий план дій на 3 місяці та місяць підтримки. Для власників онлайн-шкіл, які хочуть вийти з хаосу до системи.',
    keywords: [
      'особиста консультація Ілля Літун',
      'консультація онлайн-школа',
      'діагностика освітнього бізнесу',
      'план розвитку онлайн-школи',
      'консультація EdTech',
      'як масштабувати онлайн-школу',
      'аудит освітнього бізнесу',
    ],
    image: '/images/consultation-hero.png',
    ogType: 'website',
  },
  konsaltyng: {
    path: '/konsaltyng',
    title: 'Консалтинг «Бізнес під крилом» для онлайн-школи',
    description:
      'Особистий консалтинг Іллі Літуна для власників онлайн-шкіл: систематизація бізнесу, фінанси, маркетинг, продажі та команда. Збільш чистий прибуток і вийди з операційки під супроводом ТОПів TURBO EDUCATION.',
    keywords: [
      'консалтинг онлайн-школи',
      'бізнес під крилом',
      'консалтинг Ілля Літун',
      'масштабування освітнього бізнесу',
      'системність в онлайн-школі',
      'P&L освітній бізнес',
      'зростання прибутку онлайн-школи',
      'супровід власника EdTech',
    ],
    image: '/images/consulting-hero.png',
    ogType: 'website',
  },
  stratSesiya: {
    path: '/strat-sesiya',
    title: 'Страт сесія для онлайн-школи — 1 день з Іллею Літуном',
    description:
      'Інтенсивна стратегічна сесія 8 годин офлайн у будь-якому місті України: фінанси, маркетинг, продукт і команда. Повна перебудова онлайн-школи за один день із чітким планом впровадження.',
    keywords: [
      'стратегічна сесія онлайн-школа',
      'страт сесія Ілля Літун',
      'офлайн стратегія EdTech',
      'бізнес-сесія для власника школи',
      'фінанси маркетинг HR онлайн-школа',
      'планування розвитку освітнього бізнесу',
    ],
    image: '/images/strat-hero.png',
    ogType: 'website',
  },
  klub: {
    path: '/klub',
    title: 'Turbo Education Club — клуб для власників онлайн-шкіл',
    description:
      'Закритий клуб Turbo Education Club for owners: теми місяця, зустрічі з Іллею Літуном, Q&A, інструменти, чат і нетворкінг власників освітнього бізнесу. Перший потік — 20 місць.',
    keywords: [
      'клуб власників онлайн-шкіл',
      'Turbo Education Club',
      'нетворкінг EdTech Україна',
      'комʼюніті освітніх підприємців',
      'клуб Ілля Літун',
      'підзвітність власників шкіл',
    ],
    image: '/images/club-hero.jpg',
    ogType: 'website',
  },
}

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageMetadata(key: PageSeoKey): Metadata {
  const page = PAGES[key]
  const url = absoluteUrl(page.path)
  const ogImage = absoluteUrl(page.image)
  const fullTitle = page.absoluteTitle ?? `${page.title} | ${SITE.name}`

  return {
    title: page.absoluteTitle
      ? { absolute: page.absoluteTitle }
      : page.title,
    description: page.description,
    keywords: page.keywords,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.brand,
    category: 'education',
    alternates: {
      canonical: url,
      languages: {
        'uk-UA': url,
        uk: url,
      },
    },
    openGraph: {
      title: fullTitle,
      description: page.description,
      url,
      siteName: SITE.title,
      locale: SITE.locale,
      type: page.ogType ?? 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: page.description,
      images: [ogImage],
      creator: SITE.twitter,
      site: SITE.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    other: {
      'geo.region': 'UA',
      'geo.placename': 'Kyiv',
      'content-language': 'uk',
    },
  }
}

export function serviceSchema({
  name,
  description,
  path,
  image,
}: {
  name: string
  description: string
  path: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image || SITE.image),
    provider: {
      '@type': 'Person',
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Власники онлайн-шкіл та освітнього бізнесу',
    },
    inLanguage: 'uk-UA',
  }
}

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
