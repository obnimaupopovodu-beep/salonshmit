"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WaveOrnament } from "@/components/wave-ornament";

/**
 * Декоративная волна для секции отзывов.
 * scroll-driven анимация dotted-пути — направление потока следует скроллу.
 */
export function ReviewsWave() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Лёгкое параллакс-смещение по Y
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <WaveOrnament
          scrollProgress={scrollYProgress}
          style={{
            position: "absolute",
            left: "-5rem",
            bottom: 0,
            width: "22rem",
            height: "11rem",
            opacity: 0.3,
          }}
        />
      </motion.div>
    </div>
  );
}
