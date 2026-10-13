"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { SMOOTH_SPRING } from "@/lib/motion";

/** Share of the article already read before the line fades in, so it skips the hero. */
const FADE_IN_AT_PROGRESS = 0.01;

const subscribeToNothing = () => () => {};
/** False while the server markup hydrates, true afterwards, without a state update in an effect. */
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

interface ReadingProgressProps {
  /** The article body; the line tracks how far the reader is through it. */
  readonly children: ReactNode;
}

/**
 * A 2px line under the sticky header that fills as the reader moves through the article.
 * It wraps the body (rather than sitting beside it) so it can measure that element.
 */
export function ReadingProgress({ children }: ReadingProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Starts once the body's top passes 30% of the viewport, so the line stays hidden
    // while the hero is still what the reader is looking at.
    offset: ["start 30%", "end 60%"],
  });
  const eased = useSpring(scrollYProgress, SMOOTH_SPRING);
  const complete = useMotionValue(1);
  const opacity = useTransform(
    scrollYProgress,
    [0, FADE_IN_AT_PROGRESS],
    [0, 1],
  );
  // The server cannot know the motion preference, so the swap waits for hydration to
  // keep the first client render identical to the server markup.
  const isHydrated = useIsHydrated();
  const scaleX = isHydrated && prefersReducedMotion ? complete : eased;

  return (
    <div ref={ref}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-14 z-40 h-0.5 origin-left bg-brand"
        style={{ scaleX, opacity }}
      />
      {children}
    </div>
  );
}
