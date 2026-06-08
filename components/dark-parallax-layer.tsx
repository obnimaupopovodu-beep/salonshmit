"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WaveOrnament } from "@/components/wave-ornament";

/**
 * Параллакс-слой для тёмных секций.
 * Фигуры движутся в противоположном направлении скролла — создают эффект глубины.
 * WaveOrnament получает тот же scrollYProgress — анимация волны
 * полностью синхронизирована с parallax-смещением.
 */
export function DarkParallaxLayer({ speed = 0.28 }: { speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        {/* Большой блоб слева-снизу */}
        <div
          className="ornament-blob"
          style={{
            position: "absolute",
            left: "-6rem",
            bottom: "-4rem",
            width: "28rem",
            height: "28rem",
            opacity: 0.18,
          }}
        />
        {/* Волна справа-сверху — scroll-driven поток */}
        <WaveOrnament
          dark
          scrollProgress={scrollYProgress}
          style={{
            position: "absolute",
            right: "-4rem",
            top: "-2rem",
            width: "34rem",
            height: "16rem",
            opacity: 0.16,
          }}
        />
        {/* Кольца справа-снизу */}
        <div
          className="ornament-rings"
          style={{
            position: "absolute",
            right: "8%",
            bottom: "-3rem",
            width: "14rem",
            height: "14rem",
            opacity: 0.12,
          }}
        />
        {/* Сетка в центре */}
        <div
          className="ornament-mesh"
          style={{
            position: "absolute",
            left: "40%",
            top: "30%",
            width: "12rem",
            height: "12rem",
            opacity: 0.1,
          }}
        />
      </motion.div>
    </div>
  );
}
