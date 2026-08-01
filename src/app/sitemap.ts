import type { MetadataRoute } from 'next'
import { SITE } from './seo'

const routes = [
  '/',
  '/konsaltyng',
  '/konsultatsiya',
  '/strat-sesiya',
  '/klub',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return routes.map((path) => ({
    url: `${SITE.url}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' || path === '/konsultatsiya' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/konsultatsiya' ? 0.9 : 0.7,
  }))
}
