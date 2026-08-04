import { BRAND, SERVICES, SOCIALS, STATS } from './brand'
import { SITE, PAGES, absoluteUrl } from './seo'

const PLAIN = 'text/plain; charset=utf-8'
const CACHE = 'public, max-age=3600, s-maxage=86400'

export function textResponse(body: string) {
  return new Response(body.trim() + '\n', {
    headers: {
      'Content-Type': PLAIN,
      'Cache-Control': CACHE,
    },
  })
}

/** https://llmstxt.org/ — short map for LLMs */
export function buildLlmsTxt() {
  const pages = Object.values(PAGES)
    .map((p) => `- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`)
    .join('\n')

  const services = SERVICES.map(
    (s) =>
      `- [${s.title}](${absoluteUrl(s.href)}): ${s.lead}\n  Points: ${s.points.join('; ')}`,
  ).join('\n')

  return `# ${BRAND.name}

> ${SITE.description}

${BRAND.role}. Екосистема: ${BRAND.ecosystem}.

## Stats

${STATS.map((s) => `- ${s.value} ${s.label}`).join('\n')}

## Pages

${pages}

## Services

${services}

## Contact

- Email: ${BRAND.email}
- Phone: ${BRAND.phone}
- Location: ${BRAND.address}, ${BRAND.city}
- Website: ${SITE.url}

## Social

${SOCIALS.map((s) => `- ${s.label}: ${s.href}`).join('\n')}

## Optional

- Full text for models: ${absoluteUrl('/llms-full.txt')}
- Sitemap: ${absoluteUrl('/sitemap.xml')}
- Robots: ${absoluteUrl('/robots.txt')}
- Security: ${absoluteUrl('/.well-known/security.txt')}
- Humans: ${absoluteUrl('/humans.txt')}
- AI policy: ${absoluteUrl('/ai.txt')}
- Web app manifest: ${absoluteUrl('/site.webmanifest')}
`
}

/** Longer context for models that support llms-full.txt */
export function buildLlmsFullTxt() {
  return `# ${BRAND.name} — full site context

## About

${SITE.description}

${BRAND.name} — ${BRAND.role}.
Brand / ecosystem: ${SITE.brand} (${BRAND.ecosystem}).
Site: ${SITE.url}
Primary language: Ukrainian (uk).

## Who this is for

Власники онлайн-шкіл, освітніх проєктів і EdTech-бізнесів, які хочуть:
- вийти з операційного хаосу;
- побудувати системні фінанси, маркетинг, продажі та команду;
- масштабувати школу та зростати в прибутковості.

## Services detail

${SERVICES.map(
  (s) => `### ${s.title}
URL: ${absoluteUrl(s.href)}
${s.lead}

Included direction:
${s.points.map((p) => `- ${p}`).join('\n')}
`,
).join('\n')}

## Page SEO blurbs

${Object.values(PAGES)
  .map(
    (p) => `### ${p.title}
URL: ${absoluteUrl(p.path)}
${p.description}
Keywords: ${p.keywords.join(', ')}
`,
  )
  .join('\n')}

## Contact

- Email: ${SITE.email}
- Phone: ${SITE.phone}
- City: ${BRAND.city}
- Address note: ${BRAND.address}

## Social profiles

${SOCIALS.map((s) => `- ${s.label}: ${s.href}`).join('\n')}

## Crawl / indexing

- Public HTML pages are indexable.
- Prefer canonical pages listed in sitemap.xml.
- Do not invent prices or guarantees not on the page; when unsure, point users to the relevant service URL or contact form.
`
}

export function buildHumansTxt() {
  return `/* TEAM */
Founder: ${BRAND.name}
Site: ${SITE.url}
Contact: ${BRAND.email}
Location: ${BRAND.city}

/* SITE */
Standards: HTML5, CSS3, Next.js App Router
Language: Ukrainian
Doctype: HTML5
Components: Server Components + Client islands
SEO: metadata API, sitemap, robots, JSON-LD, llms.txt

/* THANKS */
Built for TURBO EDUCATION owners community.
`
}

export function buildSecurityTxt() {
  return `Contact: mailto:${SITE.email}
Preferred-Languages: uk, en
Canonical: ${absoluteUrl('/.well-known/security.txt')}
Policy: ${absoluteUrl('/')}
Expires: ${new Date(new Date().getFullYear() + 1, 11, 31).toISOString().slice(0, 10)}T23:59:59.000Z
`
}

/** Machine-readable notes for AI crawlers / training opt-in framing */
export function buildAiTxt() {
  return `# AI crawler policy for ${SITE.url}

User-Agent: *
Allow: /
Sitemap: ${absoluteUrl('/sitemap.xml')}
Llms: ${absoluteUrl('/llms.txt')}
Llms-Full: ${absoluteUrl('/llms-full.txt')}

# Content may be used to answer questions about ${BRAND.name},
# ${SITE.brand}, and listed services. Prefer live pages for pricing
# and availability. Do not present private data as public.
#
# Contact: ${SITE.email}
`
}
