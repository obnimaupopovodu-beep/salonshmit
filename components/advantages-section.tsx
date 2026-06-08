"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import imgResult from "@/imgs/result.png";

type AdvantageItem = {
  title: string;
  text: string;
};

export function AdvantagesSection({
  advantages,
}: {
  advantages: readonly AdvantageItem[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      className={[
        "relative isolate overflow-hidden rounded-[2.5rem]",
        /* Вариант «accent»: тёплый градиент + 2 радиальных пятна */
        "bg-[radial-gradient(circle_at_86%_12%,_rgba(218,207,194,0.46),_transparent_22%),radial-gradient(circle_at_4%_100%,_rgba(235,227,216,0.48),_transparent_24%),linear-gradient(180deg,_rgba(250,248,245,0.98)_0%,_rgba(243,237,231,0.98)_100%)]",
        "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24",
      ].join(" ")}
    >
      {/* ─── Grain ─────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(41,37,36,0.8) 0.65px, transparent 0.75px)",
          backgroundSize: "12px 12px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.92), rgba(0,0,0,0.16))",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.92), rgba(0,0,0,0.16))",
        }}
      />

      {/* ─── Размытые пятна (объём и воздух) ───────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "rgba(216, 205, 191, 0.30)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 bottom-8 h-40 w-40 rounded-full blur-3xl"
        style={{ background: "rgba(237, 230, 222, 0.38)" }}
      />

      {/* ─── Тонкие пильные линии (правый верхний угол) ────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[12%] top-[5.5rem] h-28 w-44 rounded-[999px] border border-stone-300/40 opacity-65"
        style={{ transform: "rotate(-18deg)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[7%] top-[4rem] h-36 w-56 rounded-[999px] border border-stone-300/25 opacity-55"
        style={{ transform: "rotate(-18deg)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[19%] top-[10rem] h-px w-20 bg-gradient-to-r from-transparent via-stone-300/55 to-transparent"
        style={{ transform: "rotate(-18deg)" }}
      />

      {/* ─── Контент ───────────────────────────────────────────── */}
      <div className="relative z-10">
        {/* Шапка: заголовок + картинка в правом углу на одном уровне */}
        <div className="flex items-start justify-between gap-6">
          <SectionTitle
            eyebrow="Почему здесь удобно"
            title="Салон, где важны не обещания, а результат"
            text="Рейтинг 4,9 — не случайность."
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden shrink-0 lg:block"
          >
            {/* мягкий гало-ореол за картинкой */}
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-white/45 blur-2xl"
            />
            <Image
              src={imgResult}
              alt="Результат работы мастера"
              width={160}
              height={160}
              className="object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Карточки преимуществ */}
        <div ref={ref} className="mt-10 grid gap-5 md:grid-cols-2">
          {advantages.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-[2rem] border border-stone-200/80 bg-white/[0.88] p-6 shadow-[0_10px_30px_rgba(120,102,80,0.05)] backdrop-blur-[2px]"
            >
              <h3 className="text-xl font-semibold text-stone-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {item.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
