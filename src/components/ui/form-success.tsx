"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SMOOTH_SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CIRCLE_DRAW_SECONDS = 0.5;
const CHECK_DRAW_SECONDS = 0.35;
/** The check starts drawing as the circle closes, and the message follows the check. */
const CHECK_DELAY_SECONDS = 0.35;
const MESSAGE_DELAY_SECONDS = 0.6;

type FormSuccessSize = "md" | "sm";

interface FormSuccessProps {
  /** The form's own success copy. */
  readonly message: string;
  /** `sm` fits the support popover; `md` is for page forms. */
  readonly size?: FormSuccessSize;
  /** Drops the card box, for forms that already sit inside a card or popover. */
  readonly isBare?: boolean;
}

const SIZE_STYLES: Record<FormSuccessSize, { mark: string; text: string }> = {
  md: { mark: "h-14 w-14", text: "text-base" },
  sm: { mark: "h-10 w-10", text: "text-sm" },
};

/**
 * What a form turns into once it has been sent: a circle draws its stroke, a check draws
 * after it, then the message rises in. Under reduced motion everything is simply there.
 */
export function FormSuccess({ message, size = "md", isBare = false }: FormSuccessProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const styles = SIZE_STYLES[size];

  // The form the keyboard was in has just been replaced; park focus on the result.
  useEffect(() => {
    containerRef.current?.focus({ preventScroll: true });
  }, []);

  const drawn = prefersReducedMotion
    ? { initial: false as const }
    : { initial: { pathLength: 0 }, animate: { pathLength: 1 } };

  return (
    <div
      ref={containerRef}
      role="status"
      tabIndex={-1}
      className={cn(
        "flex flex-col items-center gap-3 text-center outline-none",
        isBare
          ? "py-2"
          : "rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950",
      )}
    >
      <svg
        viewBox="0 0 52 52"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("text-brand", styles.mark)}
      >
        <motion.circle
          cx={26}
          cy={26}
          r={24}
          transform="rotate(-90 26 26)"
          {...drawn}
          transition={{ duration: CIRCLE_DRAW_SECONDS, ease: "easeOut" }}
        />
        <motion.path
          d="M15 27l8 8 14-16"
          {...drawn}
          transition={{
            duration: CHECK_DRAW_SECONDS,
            ease: "easeOut",
            delay: CHECK_DELAY_SECONDS,
          }}
        />
      </svg>
      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SMOOTH_SPRING, delay: MESSAGE_DELAY_SECONDS }}
        className={cn("text-foreground", styles.text)}
      >
        {message}
      </motion.p>
    </div>
  );
}
