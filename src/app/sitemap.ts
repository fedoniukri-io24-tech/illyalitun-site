import type { MetadataRoute } from 'next'
import { absoluteUrl, PAGES } from './seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const priorities: Record<string, number> = {
    '/': 1,
    '/konsaltyng': 0.95,
    '/konsultatsiya': 0.9,
    '/strat-sesiya': 0.85,
    '/klub': 0.85,
    '/oferta': 0.3,
    '/polityka': 0.3,
  }

  const main = Object.values(PAGES).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.path === '/' ? ('weekly' as const) : ('monthly' as const),
    priority: priorities[page.path] ?? 0.7,
    images: page.image ? [absoluteUrl(page.image)] : undefined,
  }))

  const legal = (['/oferta', '/polityka'] as const).map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: priorities[path],
  }))

  return [...main, ...legal]
}
