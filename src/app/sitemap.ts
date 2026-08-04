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
  }

  return Object.values(PAGES).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.path === '/' ? 'weekly' : 'monthly',
    priority: priorities[page.path] ?? 0.7,
    // Next MetadataRoute supports images for image sitemap enrichment
    images: page.image ? [absoluteUrl(page.image)] : undefined,
  }))
}
