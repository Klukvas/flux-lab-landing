"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SMOOTH_SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DEFAULT_INTERVAL_SECONDS = 2.8;
const TRAVEL_PX = 14;

interface RotatingWordsProps {
  readonly words: readonly string[];
  readonly intervalSeconds?: number;
  /** Applied to every word, so a text gradient reaches each one. */
  readonly className?: string;
}

/**
 * Cycles through phrases in place, each sliding up through the slot. The slot is as
 * wide as the widest phrase, so the line never reflows. Screen readers and the server
 * see the first phrase only; reduced motion keeps it.
 */
export function RotatingWords({
  words,
  intervalSeconds = DEFAULT_INTERVAL_SECONDS,
  className,
}: RotatingWordsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || words.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      intervalSeconds * 1000,
    );
    return () => window.clearInterval(timer);
  }, [intervalSeconds, prefersReducedMotion, words.length]);

  const previous = (index + words.length - 1) % words.length;

  return (
    <span className="inline-grid align-top">
      <span className="sr-only">{words[0]}</span>
      {words.map((word, wordIndex) => {
        const isCurrent = wordIndex === index;
        const restingY = wordIndex === previous ? -TRAVEL_PX : TRAVEL_PX;
        return (
          <motion.span
            key={word}
            aria-hidden="true"
            className={cn("col-start-1 row-start-1 whitespace-nowrap", className)}
            initial={false}
            animate={{ opacity: isCurrent ? 1 : 0, y: isCurrent ? 0 : restingY }}
            transition={SMOOTH_SPRING}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}
