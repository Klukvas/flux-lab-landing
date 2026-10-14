"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ScrollCueProps {
  /** The id of the element the cue scrolls to. */
  readonly targetId: string;
  readonly label: string;
}

/** A small arrow at the bottom of the first screen that bobs gently and scrolls to the pitch. */
export function ScrollCue({ targetId, label }: ScrollCueProps) {
  const prefersReducedMotion = useReducedMotion();

  function scrollToTarget() {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <button
      type="button"
      onClick={scrollToTarget}
      aria-label={label}
      className="pressable rise-in flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-background text-gray-500 [--rise-delay:1800ms] hover:border-brand/40 hover:text-brand dark:border-gray-800 dark:text-gray-400"
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        // A fixed first frame keeps the server and client renders identical.
        initial={{ y: 0 }}
        animate={prefersReducedMotion ? { y: 0 } : { y: [0, 4, 0] }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <path d="M12 5v14M6 13l6 6 6-6" />
      </motion.svg>
    </button>
  );
}
