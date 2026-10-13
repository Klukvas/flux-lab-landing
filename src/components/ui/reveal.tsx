"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { SMOOTH_SPRING } from "@/lib/motion";

/** Seconds between one item of a group starting and the next. */
const DEFAULT_STAGGER_SECONDS = 0.08;

/** Fires a little before the element reaches the viewport edge, so it is already moving when seen. */
const VIEWPORT = { once: true, margin: "-80px" } as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: SMOOTH_SPRING },
};

function groupVariants(staggerSeconds: number): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: staggerSeconds } },
  };
}

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/** Fades and settles into place the first time it scrolls into view. */
export function Reveal({ children, className }: RevealProps) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps extends RevealProps {
  readonly staggerSeconds?: number;
}

/** Reveals its RevealItem children one after another once the group scrolls into view. */
export function RevealGroup({
  children,
  className,
  staggerSeconds = DEFAULT_STAGGER_SECONDS,
}: RevealGroupProps) {
  return (
    <motion.div
      variants={groupVariants(staggerSeconds)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * One item of a RevealGroup; the group decides when it starts. Pass `grid` as the class
 * when the item wraps a card that should fill its grid cell.
 */
export function RevealItem({ children, className }: RevealProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
