import type { Metadata } from 'next'

export const SITE = {
  name: 'Ілля Літун',
  title: 'Освітній бізнес з Іллею Літуном',
  description:
    'Ілля Літун — засновник Turbo Education (Forbes Next 250). Консалтинг, особисті консультації, стратегічні сесії та клуб для власників освітнього бізнесу.',
  locale: 'uk_UA',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://illyalitun.com',
  email: 'hello@turbo.education',
  phone: '+380670000000',
  image: '/images/hero-author.png',
  twitter: '@illya_litun',
  keywords: [
    'Ілля Літун',
    'освітній бізнес',
    'консалтинг освіти',
    'Turbo Education',
    'онлайн школа',
    'масштабування EdTech',
    'консультація освітнього бізнесу',
    'стратегічна сесія',
    'клуб освітніх підприємців',
  ],
} as const

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageMetadata({
  title,
  description,
  path = '/',
  image = SITE.image,
}: {
  title: string
  description: string
  path?: string
  image?: string
}): Metadata {
  const url = absoluteUrl(path)
  const ogImage = absoluteUrl(image)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.title,
      locale: SITE.locale,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: SITE.twitter,
    },
    robots: { index: true, follow: true },
  }
}
