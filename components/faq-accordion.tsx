"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FaqItem = {
  q: string;
  a: string;
};

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-10 space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-semibold text-stone-900 sm:text-lg">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-500"
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="max-w-3xl px-6 pb-6 text-sm leading-7 text-stone-600">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
