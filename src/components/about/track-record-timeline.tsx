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
import { RevealGroup, RevealItem } from "@/components/ui";
import { SMOOTH_SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface TrackRecordEvent {
  readonly year: number;
  readonly title: string;
  readonly description: string;
}

interface TrackRecordTimelineProps {
  readonly events: readonly TrackRecordEvent[];
}

const subscribeToNothing = () => () => {};
/** False while the server markup hydrates, true afterwards, without a state update in an effect. */
function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribeToNothing, () => true, () => false);
}

/** How far ahead of the line a node lights, so it is on by the time the line is level with it. */
const LIGHT_LEAD = 0.03;

interface EventRowProps {
  readonly event: TrackRecordEvent;
  readonly index: number;
  readonly count: number;
  readonly isLatest: boolean;
  readonly progress: MotionValue<number>;
}

function EventRow({ event, index, count, isLatest, progress }: EventRowProps) {
  // Rows are close to equal height, so row N sits about N/count of the way down the line.
  const reachedAt = index / count;
  const lit = useTransform(progress, [reachedAt - LIGHT_LEAD, reachedAt], [0, 1]);
  const nodeScale = useTransform(lit, [0, 1], [0.6, 1]);

  return (
    <RevealItem className="relative">
      <span
        aria-hidden="true"
        className="absolute -left-10 top-6 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 bg-background dark:border-gray-700"
      >
        <motion.span
          className="h-full w-full rounded-full border-2 border-brand bg-brand"
          style={{ opacity: lit, scale: nodeScale }}
        />
      </span>
      <div
        className={cn(
          "rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950",
          isLatest && "border-brand/40 ring-1 ring-brand/20 dark:border-brand/40",
        )}
      >
        <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
          {event.year}
        </span>
        <h3 className="mt-3 font-bold text-foreground">{event.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {event.description}
        </p>
      </div>
    </RevealItem>
  );
}

/**
 * The studio's years down a line the page draws while you scroll; each year's node fills
 * in as the line reaches it. One column at every width, so it reads the same on a phone.
 */
export function TrackRecordTimeline({ events }: TrackRecordTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const eased = useSpring(scrollYProgress, SMOOTH_SPRING);
  const complete = useMotionValue(1);
  // The server cannot know the motion preference, so the swap waits for hydration to
  // keep the first client render identical to the server markup.
  const isHydrated = useIsHydrated();
  const progress = isHydrated && prefersReducedMotion ? complete : eased;

  return (
    <div ref={ref} className="relative max-w-3xl pl-10">
      {/* Centered under the 24px nodes, which sit 40px left of the cards. */}
      <div className="absolute bottom-0 left-[11px] top-9 w-0.5 bg-gray-200 dark:bg-gray-800">
        <motion.div
          className="absolute inset-0 origin-top bg-brand"
          style={{ scaleY: progress }}
        />
      </div>
      <RevealGroup className="space-y-4">
        {events.map((event, index) => (
          <EventRow
            key={event.year}
            event={event}
            index={index}
            count={events.length}
            isLatest={index === events.length - 1}
            progress={progress}
          />
        ))}
      </RevealGroup>
    </div>
  );
}
