export const BRAND = {
  name: 'Ілля Літун',
  ecosystem: 'TURBO EDUCATION',
  tagline: 'Освітній бізнес з Іллею Літуном',
  role: 'Засновник освітньої екосистеми TURBO EDUCATION, лауреат номінації Forbes 30 до 30',
  phone: '+380 67 000 00 00',
  email: 'hello@turbo.education',
  address: 'онлайн · Київ',
  city: 'Україна',
  heroDesktop: '/images/hero-author.png',
  contactImage: '/images/contact-author.jpg',
} as const

/** Зовнішні анкети (Google Forms) для заявок */
export const APPLY_FORMS = {
  konsaltyng: 'https://forms.gle/2mffo2YmFnMM76M39',
  konsultatsiya: 'https://forms.gle/ghaDLCe1rkZvJDms8',
  stratSesiya: 'https://forms.gle/ghaDLCe1rkZvJDms8',
} as const

export const STATS = [
  { value: '7 тис.', label: 'активних учнів' },
  { value: '30 тис', label: 'випускників' },
] as const

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/illya_litun/' },
  { label: 'Telegram', href: 'https://t.me/illialitun234' },
  { label: 'Threads', href: 'https://www.threads.com/@illya_litun?xmt=AQG0Dr6vsQGbvBeSROu0ogqonBOjSkIb7XpYGAPbYMw-__k' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/illia-litun-7354b92b6/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@illialitun' },
] as const

export const SERVICES = [
  {
    slug: 'konsaltyng' as const,
    label: 'Консалтинг',
    title: 'Консалтинг: бізнес під крилом',
    href: '/konsaltyng',
    color: 'blue' as const,
    lead: 'Систематизуй онлайн-школу та збільши чистий прибуток у 2 рази під особистим супроводом Іллі Літуна.',
    points: [
      'Особисті зустрічі та команда ТОПів',
      'Фінанси, маркетинг, продажі та команда',
      'Практичні фреймворки й трекінг у Notion',
      'Супровід після завершення програми',
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
    title: 'Страт сесія · Офлайн',
    href: '/strat-sesiya',
    color: 'indigo' as const,
    lead: 'Один день — повна перебудова твоєї онлайн-школи. 8 годин інтенсивної роботи в Києві або Львові.',
    points: [
      '4 блоки: фінанси, маркетинг, продукт, HR',
      'Діагностика та стратегія росту',
      'Особиста фасилітація Іллі',
      'Документи та шаблони після сесії',
    ],
  },
  {
    slug: 'klub' as const,
    label: 'Клуб',
    title: 'Turbo Education Club for owners',
    href: '/klub',
    color: 'orange' as const,
    lead: 'Місце, де ти знаходиш сильне оточення і рішення на будь-яке своє питання. Перший потік — 20 місць.',
    points: [
      'Тема місяця та зустрічі з Іллею',
      'Q&A, інструменти та закритий чат',
      'Офлайн-зустрічі й спід-нетворкінг',
      'База знань і підзвітність у колі власників',
    ],
  },
] as const
