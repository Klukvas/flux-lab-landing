"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SMOOTH_SPRING } from "@/lib/motion";

export interface TimelinePhase {
  readonly id: string;
  readonly fromWeek: number;
  readonly toWeek: number;
  readonly title: string;
  readonly weeks: string;
  readonly description: string;
}

interface PlaybookTimelineProps {
  readonly phases: readonly TimelinePhase[];
  readonly weekCount: number;
  readonly weeksLabel: string;
}

/** A phase is dim until the progress line reaches its first week, then it comes forward. */
const DIM_OPACITY = 0.35;

const subscribeToNothing = () => () => {};
/** False while the server markup hydrates, true afterwards, without a state update in an effect. */
function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribeToNothing, () => true, () => false);
}
const CARD_CLASSES =
  "rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950";

interface PhaseCardProps {
  readonly phase: TimelinePhase;
  readonly progress: MotionValue<number>;
  readonly weekCount: number;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

function PhaseCard({ phase, progress, weekCount, className, style }: PhaseCardProps) {
  const start = (phase.fromWeek - 1) / weekCount;
  const opacity = useTransform(progress, [start - 0.04, start + 0.08], [DIM_OPACITY, 1]);

  return (
    <motion.li style={{ ...style, opacity }} className={`${CARD_CLASSES} ${className ?? ""}`}>
      <div className="font-mono text-xs font-medium uppercase tracking-widest text-brand">
        {phase.weeks}
      </div>
      <h3 className="mt-2 font-semibold text-foreground">{phase.title}</h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{phase.description}</p>
    </motion.li>
  );
}

/**
 * The playbook as a timeline the page draws while you scroll: the progress line runs
 * across the weeks and each phase lights up as the line reaches it. Wide screens read
 * it left to right; phones top to bottom.
 */
export function PlaybookTimeline({ phases, weekCount, weeksLabel }: PlaybookTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const eased = useSpring(scrollYProgress, SMOOTH_SPRING);
  const complete = useMotionValue(1);
  // The server cannot know the motion preference, so the swap waits for hydration to
  // keep the first client render identical to the server markup.
  const isHydrated = useIsHydrated();
  const progress = isHydrated && prefersReducedMotion ? complete : eased;
  const weeks = Array.from({ length: weekCount }, (_, index) => index + 1);

  return (
    <div ref={ref}>
      <div className="hidden lg:block">
        <div className="mb-2 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {weeksLabel}
        </div>
        <ol
          className="grid font-mono text-xs text-gray-500 dark:text-gray-400"
          style={{ gridTemplateColumns: `repeat(${weekCount}, minmax(0, 1fr))` }}
        >
          {weeks.map((week) => (
            <li key={week} className="pl-1">
              {week}
            </li>
          ))}
        </ol>
        <div className="relative mt-3 h-0.5 bg-gray-200 dark:bg-gray-800">
          <motion.div
            className="absolute inset-0 origin-left bg-brand"
            style={{ scaleX: progress }}
          />
        </div>
        {/* Cards share the weeks' proportions but never shrink below a readable width,
            so a one-week phase still holds its sentence. */}
        <ol
          className="mt-6 grid gap-4"
          style={{
            gridTemplateColumns: phases
              .map((phase) => `minmax(11rem, ${phase.toWeek - phase.fromWeek + 1}fr)`)
              .join(" "),
          }}
        >
          {phases.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              progress={progress}
              weekCount={weekCount}
            />
          ))}
        </ol>
      </div>

      <div className="relative lg:hidden">
        <div className="absolute bottom-4 left-[11px] top-4 w-0.5 bg-gray-200 dark:bg-gray-800">
          <motion.div
            className="absolute inset-0 origin-top bg-brand"
            style={{ scaleY: progress }}
          />
        </div>
        <ol className="space-y-4 pl-10">
          {phases.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              progress={progress}
              weekCount={weekCount}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
