"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { spring } from "@/lib/motion";
import { splitStat } from "@/lib/utils";

/** Slow and settling: the figure races through the low numbers and eases onto the real one. */
const COUNT_SPRING = spring({ damping: 1, response: 1 });

interface CountUpProps {
  /** The raw figure; it is shown the way formatNumber prints it, e.g. 46000 as 46K+. */
  readonly value: number;
}

/** Counts from zero to the figure once it scrolls into view. The server renders the final figure. */
export function CountUp({ value }: CountUpProps) {
  const { value: target, suffix } = splitStat(value);
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  // Starts at the target, so crawlers and the first paint see the real figure.
  const count = useMotionValue(target);
  const text = useTransform(count, (current) => `${Math.round(current)}${suffix}`);

  useEffect(() => {
    // animate() runs outside MotionConfig, so reduced motion has to be honored here.
    if (!isInView || prefersReducedMotion) return;
    count.jump(0);
    const controls = animate(count, target, COUNT_SPRING);
    return () => controls.stop();
  }, [count, isInView, prefersReducedMotion, target]);

  return <motion.span ref={ref}>{text}</motion.span>;
}
