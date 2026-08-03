# Ілля Літун — Освітній бізнес

Сайт особистого консалтингу Іллі Літуна / TURBO EDUCATION.

Репозиторій: [romchhh/illyalitun-site](https://github.com/romchhh/illyalitun-site)

## Запуск

```bash
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Змінні середовища

Скопіюйте `.env.example` → `.env.local` і вкажіть бойовий домен:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Використовується для canonical URL, Open Graph, `sitemap.xml` і `robots.txt`.

## Сторінки

- `/` — головна
- `/konsaltyng` — консалтинг
- `/konsultatsiya` — консультація
- `/strat-sesiya` — страт сесія
- `/klub` — клуб

## SEO

- метатеги + Open Graph / Twitter Card на всіх сторінках
- `robots.txt`, `sitemap.xml`
- JSON-LD (`Person`, `WebSite`, `Service`)
- `site.webmanifest` + favicon
