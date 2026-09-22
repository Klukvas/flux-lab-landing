"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SMOOTH_SPRING } from "@/lib/motion";
import { useScrolledPast } from "./use-scrolled-past";

const SHOW_AFTER_PX = 400;

export function ScrollToTop() {
  const isVisible = useScrolledPast(SHOW_AFTER_PX);
  const prefersReducedMotion = useReducedMotion();

  function scrollToTop() {
    // An explicit "smooth" overrides the reduced-motion rule in globals.css, so honor it here.
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={SMOOTH_SPRING}
          onClick={scrollToTop}
          className="pressable fixed bottom-22 right-6 z-50 rounded-full bg-foreground p-3 text-background hover:bg-gray-700 dark:hover:bg-gray-100"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
