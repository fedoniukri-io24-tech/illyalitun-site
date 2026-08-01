export const BRAND = {
  name: 'Ілля Літун',
  tagline: 'Освітній бізнес з Іллею Літуном',
  role: 'Засновник однієї з найкращих освітніх екосистем — Turbo Education',
  phone: '+380 67 000 00 00',
  email: 'hello@turbo.education',
  address: 'онлайн · Київ',
  city: 'Україна',
  heroDesktop: '/images/hero-author.png',
  contactImage: '/images/hero.jpg',
} as const

export const STATS = [
  { value: '25 тис+', label: 'випускників' },
  { value: '5000', label: 'активних учнів щомісяця' },
  { value: 'Forbes', label: 'Next 250' },
] as const

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/illya_litun/', short: 'Insta' },
  { label: 'Telegram', href: 'https://t.me/illialitun234', short: 'TG' },
  { label: 'Threads', href: 'https://www.threads.com/@illya_litun?xmt=AQG0Dr6vsQGbvBeSROu0ogqonBOjSkIb7XpYGAPbYMw-__k', short: 'Threads' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/illia-litun-7354b92b6/', short: 'LinkedIn' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@illialitun', short: 'TT' },
] as const

export const SERVICES = [
  {
    slug: 'konsaltyng' as const,
    label: 'Консалтинг',
    title: 'Консалтинг для освітнього бізнесу',
    href: '/konsaltyng',
    color: 'blue' as const,
    lead: 'Глибокий супровід освітніх проєктів: від діагностики моделі до побудови процесів, які тримають ріст.',
    points: [
      'Аудит бізнес-моделі та юніт-економіки',
      'Побудова воронок і продуктової лінійки',
      'Операційна система команди',
      'План масштабування на 6–12 місяців',
    ],
  },
  {
    slug: 'konsultatsiya' as const,
    label: 'Консультація',
    title: 'Особиста консультація',
    href: '/konsultatsiya',
    color: 'teal' as const,
    lead: 'Коротка, сфокусована сесія: розберемо вузьке місце, пріоритети й конкретні кроки, які варто зробити вже зараз.',
    points: [
      'Розбір поточного етапу бізнесу',
      'Відповіді на ключові питання',
      'Пріоритезація наступних кроків',
      'Рекомендації під ваш контекст',
    ],
  },
  {
    slug: 'strat-sesiya' as const,
    label: 'Страт сесія',
    title: 'Стратегічна сесія',
    href: '/strat-sesiya',
    color: 'indigo' as const,
    lead: 'Інтенсивна робота над стратегією: цілі, позиціонування, офери та план дій для команди чи соло-засновника.',
    points: [
      'Формулювання цілей і метрик',
      'Позиціонування та офер',
      'Дорожня карта на квартал',
      'Рішення по продуктах і каналах',
    ],
  },
  {
    slug: 'klub' as const,
    label: 'Клуб',
    title: 'Клуб освітніх підприємців',
    href: '/klub',
    color: 'sky' as const,
    lead: 'Закрита спільнота для тих, хто будує освітній бізнес: регулярні зустрічі, розбори кейсів і доступ до експертизи.',
    points: [
      'Регулярні live-зустрічі та розбори',
      'Обмін досвідом між учасниками',
      'Доступ до матеріалів і шаблонів',
      'Підтримка на етапі впровадження',
    ],
  },
] as const

export const FORM_OPTIONS = [
  'Консалтинг',
  'Консультація',
  'Страт сесія',
  'Клуб',
  'Інше',
] as const
