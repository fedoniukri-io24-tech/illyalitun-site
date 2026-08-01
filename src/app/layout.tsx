import type { Metadata, Viewport } from 'next'
import { SITE, absoluteUrl } from './seo'
import JsonLd from './components/JsonLd'
import './globals.css'
import './litun.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.title,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [...SITE.keywords],
  category: 'education',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl('/'),
    languages: {
      'uk-UA': absoluteUrl('/'),
    },
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: absoluteUrl('/'),
    siteName: SITE.title,
    locale: SITE.locale,
    type: 'website',
    images: [
      {
        url: absoluteUrl(SITE.image),
        width: 1200,
        height: 630,
        alt: SITE.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [absoluteUrl(SITE.image)],
    creator: SITE.twitter,
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
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e8efff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a3169' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <JsonLd />
        <div className="litun">{children}</div>
      </body>
    </html>
  )
}
