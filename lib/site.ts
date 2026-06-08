export const business = {
  name: "Шарм",
  shortLocation: "ВДНХ",
  seoTitle:
    "Салон красоты «Шарм» у метро ВДНХ: стрижки, барбер и маникюр на проспекте Мира",
  description:
    "Салон красоты «Шарм» у метро ВДНХ: стрижки, барбер-услуги, маникюр, педикюр, массаж и эпиляция. Запись: +7 (903) 633-45-33.",
  tagline:
    "Салон красоты «Шарм» на ВДНХ: стрижки, барбер-услуги и маникюр с заботой о каждом клиенте.",
  phoneDisplay: "+7 (903) 633-45-33",
  phoneHref: "tel:+79036334533",
  address: "Москва, проспект Мира, 180",
  addressHint: "Вход через «Дом быта»",
  metro: "ВДНХ",
  metroDistance: "рядом",
  busStop: "Метро ВДНХ",
  busDistance: "рядом",
  schedule: {
    weekdays: "Ежедневно: 10:00–21:00",
    sunday: "",
    today: "открыто до 21:00",
  },
  routeHref:
    "https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%9C%D0%B8%D1%80%D0%B0%2C%20180",
  rating: "4.9",
  ratingDisplay: "4,9",
  ratingCount: 76,
  reviewCount: 76,
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const metadataConfig = {
  title: business.seoTitle,
  description: business.description,
  keywords: [
    "салон красоты вднх",
    "парикмахерская вднх",
    "барбер вднх",
    "маникюр вднх",
    "шарм салон проспект мира",
  ],
  openGraph: {
    title: "Салон красоты «Шарм» у метро ВДНХ",
    description:
      "Стрижки, барбер-услуги и маникюр рядом с метро ВДНХ.",
    siteName: business.name,
    locale: "ru_RU",
  },
} as const;

export const trustPoints = [
  "4,9 из 5 на Яндекс Картах",
  `${business.ratingCount} оценок от реальных клиентов`,
  `Метро «${business.metro}» — ${business.metroDistance}`,
  "Запись по телефону или приходите без записи",
] as const;

export const promos = [
  { label: "Уход в подарок", description: "При каждой стрижке" },
  { label: "Скидка 10%", description: "На отдельные услуги" },
  { label: "ВЕСНА −15%", description: "Акция действует сейчас" },
] as const;

export const popularServices = [
  {
    title: "Женская стрижка",
    price: "уточняйте цену",
    text: "Стрижка под длину и тип волос, укладка, вечерняя причёска.",
  },
  {
    title: "Камуфляж седины (барбер)",
    price: "от 2 700 ₽",
    text: "Камуфляж седины головы или бороды. Естественный результат без вреда для волос.",
  },
  {
    title: "Химическая завивка",
    price: "5 000 ₽",
    text: "Устойчивый объём и кудряшки на длительный срок.",
  },
  {
    title: "Маникюр / педикюр",
    price: "уточняйте цену",
    text: "Ногтевой сервис для аккуратного повседневного образа.",
  },
] as const;

export const serviceGroups = [
  {
    title: "Парикмахерские услуги",
    items: [
      "Женские стрижки",
      "Детские стрижки",
      "Укладка",
      "Вечерние причёски",
      "Окрашивание",
      "Мелирование",
      "Химическая завивка",
      "Уход за волосами",
    ],
  },
  {
    title: "Барбер-зал",
    items: [
      "Мужские стрижки",
      "Оформление бороды",
      "Камуфляж седины головы",
      "Камуфляж седины бороды",
    ],
  },
  {
    title: "Ногтевой сервис",
    items: ["Маникюр", "Педикюр", "Покрытие гель-лаком"],
  },
  {
    title: "Дополнительные услуги",
    items: ["Массаж", "Эпиляция"],
  },
] as const;

export const advantages = [
  {
    title: "Рядом с метро ВДНХ",
    text: "Проспект Мира, 180 — вход через «Дом быта». Несколько минут пешеходом от выхода из метро.",
  },
  {
    title: "Рейтинг 4,9 из 5",
    text: "76 оценок на Яндекс Картах. Гости особо отмечают мастеров и качество стрижки.",
  },
  {
    title: "Удобная запись",
    text: "По телефону, через форму на сайте или просто зайди в любое удобное время.",
  },
  {
    title: "Акции и скидки",
    text: "Уход в подарок, скидка 10% и весенняя акция − 15% — актуальные предложения для новых и постоянных клиентов.",
  },
] as const;

export const prices = [
  ["Камуфляж седины головы (барбер)", "3 500 ₽"],
  ["Камуфляж седины бороды (барбер)", "2 700 ₽"],
  ["Химическая завивка", "5 000 ₽"],
  ["Маникюр", "уточняйте цену"],
  ["Педикюр", "уточняйте цену"],
  ["Женская стрижка", "уточняйте цену"],
  ["Мужская стрижка", "уточняйте цену"],
] as const;

export const reviews = [
  "Гости отмечают внимательных мастеров и высокое качество стрижки.",
  "Пишут о дружелюбной атмосфере и быстром обслуживании.",
  "Ценят за хорошее расположение у метро и адекватные цены.",
] as const;

export const faqs = [
  {
    q: "Как записаться?",
    a: `Позвоните по номеру ${business.phoneDisplay} или оставьте заявку на сайте. Администратор свяжется для подтверждения.`,
  },
  {
    q: "Как найти салон?",
    a: `Мы на проспекте Мира, 180. Вход через «Дом быта». Метро «${business.metro}» совсем рядом.`,
  },
  {
    q: "Можно прийти без записи?",
    a: "Да. Если хотите выбрать время заранее, лучше позвонить.",
  },
  {
    q: "От чего зависит цена?",
    a: "От объёма работы, длины волос и выбранного мастера. Точную цену назовёт администратор.",
  },
  {
    q: "Какие акции есть сейчас?",
    a: "Уход в подарок при каждой стрижке, скидка 10% и весенняя акция − 15%.",
  },
] as const;

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: business.name,
  description: business.tagline,
  telephone: business.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    streetAddress: business.address,
    addressCountry: "RU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "21:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.rating,
    reviewCount: String(business.reviewCount),
    ratingCount: String(business.ratingCount),
    bestRating: "5",
  },
  areaServed: "Москва",
  hasMap: business.routeHref,
  url: siteUrl,
} as const;
