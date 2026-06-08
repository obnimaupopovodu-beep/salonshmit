import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import { BookingForm } from "@/components/booking-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { AdvantagesSection } from "@/components/advantages-section";
import { DarkParallaxLayer } from "@/components/dark-parallax-layer";
import { ReviewsWave } from "@/components/reviews-wave";
import salonLogo from "@/imgs/icon.png";
import imgInterier from "@/imgs/interier.webp";
import imgHaircut from "@/imgs/haircut.webp";
import imgHaircut1 from "@/imgs/haircut1.webp";
import imgHaircut2 from "@/imgs/haircut2.webp";
import imgManicure from "@/imgs/manicure.webp";
import imgManicure1 from "@/imgs/manicure1.webp";
import cosy from "@/imgs/cosy-professionally-flawless.svg";
import {
  advantages,
  business,
  faqs,
  jsonLd,
  popularServices,
  prices,
  promos,
  reviews,
  serviceGroups,
  trustPoints,
} from "@/lib/site";

const O: React.CSSProperties = {
  position: "absolute",
  zIndex: 10,
  pointerEvents: "none",
  userSelect: "none",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(231,221,210,0.45),_transparent_32%),linear-gradient(180deg,_#faf8f5_0%,_#f4efe9_100%)]">
        <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-stone-50/85 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm shadow-stone-200/60">
                <Image src={salonLogo} alt="Логотип салона Шарм" className="h-14 w-14 object-contain" priority />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-2xl leading-none text-stone-900">{business.name}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-stone-500">{business.shortLocation}</span>
              </span>
            </a>
            <nav aria-label="Основная навигация" className="hidden items-center gap-6 text-sm text-stone-600 lg:flex">
              <a href="#services" className="transition hover:text-stone-900">Услуги</a>
              <a href="#prices" className="transition hover:text-stone-900">Цены</a>
              <a href="#reviews" className="transition hover:text-stone-900">Отзывы</a>
              <a href="#contacts" className="transition hover:text-stone-900">Контакты</a>
            </nav>
            <div className="hidden items-center gap-3 sm:flex">
              <a href={business.phoneHref} className="text-sm font-semibold text-stone-900 transition hover:text-stone-700">{business.phoneDisplay}</a>
              <a href="#booking" className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">Записаться</a>
            </div>
          </div>
        </header>

        <main id="top">
          {/* Первый экран */}
          <section className="relative overflow-hidden">
            <div aria-hidden className="ornament-blob" style={{ ...O, left: "-4rem", top: "3rem", width: "18rem", height: "18rem", opacity: 0.65 }} />
            <div aria-hidden className="ornament-wave" style={{ ...O, right: "-3rem", top: "1rem", width: "28rem", height: "12rem", opacity: 0.55 }} />
            <div aria-hidden className="ornament-rings" style={{ ...O, bottom: "2rem", right: "6%", width: "10rem", height: "10rem", opacity: 0.4 }} />
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
              <div className="relative z-20 max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-xs font-medium text-stone-600 shadow-sm shadow-stone-200/40">
                  Метро «{business.metro}» • {business.schedule.today}
                </div>
                <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-stone-900 sm:text-6xl lg:text-7xl">
                  Салон красоты «Шарм» на ВДНХ
                </h1>
                <p className="mt-4 max-w-2xl text-lg font-normal leading-snug text-stone-400 sm:text-xl">
                  Стрижки, барбер-услуги и маникюр с заботой о каждом клиенте
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
                  Женские и детские стрижки, барбер-зал, ногтевой сервис, массаж и эпиляция — всё рядом с метро.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#booking" className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-stone-800">Записаться</a>
                  <a href={business.phoneHref} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-4 text-sm font-semibold text-stone-900 transition hover:border-stone-400">Позвонить</a>
                  <a href={business.routeHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-4 text-sm font-semibold text-stone-700 transition hover:text-stone-900">Построить маршрут</a>
                </div>
                <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-stone-200/80 bg-white/80 p-5 shadow-sm shadow-stone-200/50">
                    <dt className="text-xs uppercase tracking-[0.22em] text-stone-500">Рейтинг</dt>
                    <dd className="mt-2 text-2xl font-semibold text-stone-900">{business.ratingDisplay} / 5</dd>
                  </div>
                  <div className="rounded-3xl border border-stone-200/80 bg-white/80 p-5 shadow-sm shadow-stone-200/50">
                    <dt className="text-xs uppercase tracking-[0.22em] text-stone-500">Оценок</dt>
                    <dd className="mt-2 text-2xl font-semibold text-stone-900">{business.ratingCount}</dd>
                  </div>
                  <div className="rounded-3xl border border-stone-200/80 bg-white/80 p-5 shadow-sm shadow-stone-200/50">
                    <dt className="text-xs uppercase tracking-[0.22em] text-stone-500">Яндекс Карты</dt>
                    <dd className="mt-2 text-2xl font-semibold text-stone-900">4,9 / 5</dd>
                  </div>
                </dl>

                {/* Картинка cosy — адаптивная, скрыта на мобиле <sm */}
                <div className="mt-10 hidden sm:block">
                  <Image
                    src={cosy}
                    alt="Cosy professionally flawless"
                    width={420}
                    height={420}
                    className="w-full max-w-[300px] opacity-85 sm:max-w-[360px] lg:max-w-[420px]"
                    loading="lazy"
                  />
                </div>
              </div>
              <aside className="relative z-20 flex flex-col gap-5 lg:pl-4">
                <div className="relative overflow-hidden rounded-[2rem] border border-stone-200/80 shadow-sm" style={{ aspectRatio: "4/3" }}>
                  <Image src={imgInterier} alt="Интерьер салона красоты Шарм" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
                  <div className="absolute bottom-4 left-5 rounded-2xl border border-white/20 bg-stone-900/60 px-4 py-3 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-300">Интерьер</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">Просп. Мира, 180</p>
                  </div>
                </div>
                <div className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6">
                  <div className="rounded-[1.5rem] bg-stone-900 px-5 py-4 text-white">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-300">Сейчас выгодно</p>
                    <p className="mt-2 text-lg font-semibold">Позвонить или оставить заявку ниже</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {trustPoints.map((point) => (
                      <div key={point} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-700">{point}</div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-[1.5rem] border border-dashed border-stone-300 px-4 py-4">
                    <p className="text-sm font-semibold text-stone-900">Режим работы</p>
                    <p className="mt-1 text-sm text-stone-600">{business.schedule.weekdays}</p>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* Блок доверия */}
          <section aria-label="Доверие" className="relative overflow-hidden border-y border-stone-200/80 bg-white/70">
            <div aria-hidden className="ornament-mesh" style={{ ...O, right: "-2rem", top: "50%", transform: "translateY(-50%)", width: "9rem", height: "9rem", opacity: 0.4 }} />
            <div className="relative z-20 mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
              {trustPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-stone-200/80 bg-stone-50 px-4 py-4 text-sm text-stone-700">{point}</div>
              ))}
            </div>
          </section>

          {/* Акции — тёмная секция с параллаксом */}
          <section aria-label="Акции" className="relative overflow-hidden bg-stone-900 text-stone-100">
            <DarkParallaxLayer speed={0.25} />
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Акции сейчас</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {promos.map((promo) => (
                  <div key={promo.label} className="rounded-2xl border border-stone-700 bg-stone-800 px-5 py-5">
                    <p className="text-xl font-semibold text-white">{promo.label}</p>
                    <p className="mt-2 text-sm text-stone-400">{promo.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Популярные услуги */}
          <section id="services" className="relative overflow-hidden">
            <div aria-hidden className="ornament-rings" style={{ ...O, right: "1rem", top: "2rem", width: "9rem", height: "9rem", opacity: 0.35 }} />
            <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
              <SectionTitle eyebrow="Популярные услуги" title="То, за чем к нам чаще всего приходят" text="Стартовые цены помогают быстро сориентироваться. Если нужен точный расчёт, администратор подскажет по телефону." />
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {popularServices.map((service, i) => {
                  const photos = [imgHaircut, imgHaircut1, imgManicure, imgManicure1];
                  const alts = ["Женская стрижка", "Стрижка в салоне", "Маникюр", "Ногтевой сервис"];
                  const photo = photos[i] ?? null;
                  return (
                    <article key={service.title} className="group overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(140,120,97,0.12)]">
                      {photo && (
                        <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
                          <Image src={photo} alt={alts[i]} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" loading="lazy" />
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-sm text-stone-500">{service.price}</p>
                        <h3 className="mt-2 text-xl font-semibold text-stone-900">{service.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-stone-600">{service.text}</p>
                        <a href="#booking" className="mt-4 inline-block text-sm font-medium text-stone-900 underline-offset-2 hover:underline">Записаться →</a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Все направления */}
          <section className="relative overflow-hidden bg-white/75">
            <div aria-hidden className="ornament-blob" style={{ ...O, right: "-5rem", top: "2rem", width: "16rem", height: "16rem", opacity: 0.4 }} />
            <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
              <SectionTitle eyebrow="Все направления" title="Парикмахерские, барбер, ногти и дополнительные услуги в одном месте" text="Каждое направление — своя команда мастеров." />
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                {serviceGroups.map((group) => (
                  <section key={group.title} className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-stone-50 p-6">
                    <h3 className="text-2xl font-semibold text-stone-900">{group.title}</h3>
                    <ul className="mt-5 grid gap-3 text-sm leading-7 text-stone-600 sm:grid-cols-2">
                      {group.items.map((item) => (
                        <li key={item} className="rounded-2xl bg-white px-4 py-3">{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </section>

          {/* Преимущества */}
          <AdvantagesSection advantages={advantages} />

          {/* О салоне — тёмная секция с параллаксом */}
          <section className="relative overflow-hidden bg-stone-900 text-stone-100">
            <DarkParallaxLayer speed={0.3} />
            <div className="relative z-10 mx-auto grid max-w-7xl gap-0 px-0 lg:grid-cols-2">
              <div className="relative min-h-[320px] overflow-hidden lg:min-h-[480px]">
                <Image src={imgHaircut2} alt="Мастер за работой в салоне Шарм" fill className="object-cover object-center" sizes="50vw" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-900/60 lg:bg-gradient-to-l" />
              </div>
              <div className="flex flex-col justify-center px-8 py-16 lg:px-12 lg:py-24">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">О салоне</p>
                <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Красота рядом, с заботой о каждом клиенте</h2>
                <div className="mt-6 space-y-4 text-sm leading-8 text-stone-300 sm:text-base">
                  <p>Салон «Шарм» на проспекте Мира, 180 объединяет парикмахерский зал, барбер-зал, ногтевой сервис, массаж и эпиляцию в одной локации.</p>
                  <p>Гости высоко оценивают мастеров, качество стрижки и атмосферу — 4,9 из 5 на Яндекс Картах.</p>
                </div>
                <a href="#booking" className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-stone-600 px-6 py-4 text-sm font-semibold text-white transition hover:border-stone-400">Записаться →</a>
              </div>
            </div>
          </section>

          {/* Цены */}
          <section id="prices" className="relative overflow-hidden">
            <div aria-hidden className="ornament-mesh" style={{ ...O, left: 0, top: "3rem", width: "7rem", height: "7rem", opacity: 0.3 }} />
            <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
              <SectionTitle eyebrow="Цены" title="Базовые цены, с которых удобно начать" text="Точная стоимость зависит от объёма работы и выбранного мастера. Администратор рассчитает перед записью." />
              <div className="mt-10 overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white">
                <div className="grid grid-cols-[1fr_auto] border-b border-stone-200/80 px-5 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500 sm:px-8">
                  <span>Услуга</span><span>Цена</span>
                </div>
                {prices.map(([name, value]) => (
                  <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-stone-100 px-5 py-5 last:border-b-0 sm:px-8">
                    <span className="text-sm font-medium text-stone-800 sm:text-base">{name}</span>
                    <span className="text-sm font-semibold text-stone-900 sm:text-base">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Отзывы — анимированная волна через ReviewsWave */}
          <section id="reviews" className="relative overflow-hidden bg-white/75">
            <ReviewsWave />
            <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
              <SectionTitle eyebrow="Отзывы" title="Что чаще всего отмечают гости" text="Короткий пересказ того, что повторяется в отзывах на Яндекс Картах чаще всего." />
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {reviews.map((review, index) => (
                  <article key={review} className="rounded-[2rem] border border-stone-200/80 bg-stone-50 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Отзыв {index + 1}</p>
                    <p className="mt-4 text-sm leading-7 text-stone-700">{review}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="relative overflow-hidden">
            <div aria-hidden className="ornament-rings" style={{ ...O, right: 0, top: "2rem", width: "10rem", height: "10rem", opacity: 0.3 }} />
            <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
              <SectionTitle eyebrow="FAQ" title="Коротко о важном перед записью" text="Ответы на вопросы, которые обычно помогают принять решение быстрее." />
              <FaqAccordion items={faqs} />
            </div>
          </section>

          {/* Форма записи — тёмная секция с параллаксом */}
          <section id="booking" className="relative overflow-hidden bg-stone-900 text-stone-100">
            <DarkParallaxLayer speed={0.22} />
            <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Форма записи</p>
                <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Запишитесь — администратор подтвердит удобное время</h2>
                <p className="mt-5 max-w-xl text-sm leading-8 text-stone-300 sm:text-base">Если удобнее решить всё быстрее, можно сразу позвонить по номеру {business.phoneDisplay}.</p>
                <ul className="mt-6 space-y-3">
                  {["Выберите услугу и удобное время", "Администратор перезвонит для подтверждения", "Ваша запись подтверждена"].map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-stone-300">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-600 text-xs font-semibold text-stone-400">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <BookingForm phoneDisplay={business.phoneDisplay} phoneHref={business.phoneHref} />
            </div>
          </section>

          {/* Контакты — pb-20 на мобиле компенсирует высоту фиксированной CTA-панели */}
          <section id="contacts" className="relative overflow-hidden">
            <div aria-hidden className="ornament-mesh" style={{ ...O, right: "1rem", top: "3rem", width: "7rem", height: "7rem", opacity: 0.35 }} />
            <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 pb-20 sm:pb-16 sm:px-6 lg:px-8 lg:py-24">
              <SectionTitle eyebrow="Контакты" title="Как нас найти" text="Проспект Мира, 180 — рядом с метро ВДНХ." />
              <div className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                <address className="not-italic rounded-[2rem] border border-stone-200/80 bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Адрес</p>
                  <p className="mt-3 text-xl font-semibold text-stone-900">{business.address}</p>
                  <p className="mt-1 text-sm text-stone-500">{business.addressHint}</p>
                  <div className="mt-6 space-y-3 text-sm leading-7 text-stone-600">
                    <p>Метро «{business.metro}» — {business.metroDistance}.</p>
                    <p>{business.schedule.weekdays}.</p>
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a href={business.phoneHref} className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-stone-800">Позвонить</a>
                    <a href={business.routeHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-4 text-sm font-semibold text-stone-900 transition hover:border-stone-400">Построить маршрут</a>
                  </div>
                </address>
                <div className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-stone-100 shadow-sm">
                  <iframe src="https://yandex.ru/map-widget/v1/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%9C%D0%B8%D1%80%D0%B0%2C%20180&z=16" width="100%" height="400" frameBorder="0" allowFullScreen title="Салон Красоты «Шарм» на Яндекс.Картах" className="block w-full" style={{ minHeight: "360px", border: "none" }} />
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* pb-20 sm:pb-0 — отступ снизу только на мобиле под фиксированную CTA-панель */}
        <footer className="border-t border-stone-200/80 bg-white/80 pb-20 sm:pb-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-stone-600 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] border border-stone-200 bg-white shadow-sm shadow-stone-200/60">
                <Image src={salonLogo} alt="Логотип салона Шарм" className="h-14 w-14 object-contain" />
              </span>
              <div>
                <p className="font-display text-2xl text-stone-900">{business.name}</p>
                <p className="mt-2 max-w-xl leading-7">{business.tagline}</p>
              </div>
            </div>
            <div className="space-y-1 text-sm lg:text-right">
              <p>{business.address}</p>
              <p className="text-stone-400">{business.addressHint}</p>
              <p>{business.phoneDisplay}</p>
              <p>{business.schedule.weekdays}</p>
            </div>
          </div>
        </footer>

        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(28,25,23,0.08)] backdrop-blur sm:hidden">
          <div className="grid grid-cols-3 gap-2">
            <a href={business.phoneHref} className="inline-flex items-center justify-center rounded-full bg-stone-900 px-3 py-3 text-xs font-semibold text-white">Позвонить</a>
            <a href="#booking" className="inline-flex items-center justify-center rounded-full border border-stone-300 px-3 py-3 text-xs font-semibold text-stone-900">Записаться</a>
            <a href={business.routeHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-stone-300 px-3 py-3 text-xs font-semibold text-stone-900">Маршрут</a>
          </div>
        </div>
      </div>
    </>
  );
}
