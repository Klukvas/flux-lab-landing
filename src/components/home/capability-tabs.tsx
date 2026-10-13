"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import type { CapabilityColumnId } from "@/data/capabilities";
import { SMOOTH_SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CAPABILITY_ICONS } from "./capability-icons";
import { CapabilityIllustration } from "./capability-illustrations";

export interface CapabilityRow {
  readonly id: string;
  readonly label: string;
}

export interface CapabilityArea {
  readonly id: CapabilityColumnId;
  readonly title: string;
  readonly summary: string;
  readonly caption: string;
  readonly items: readonly CapabilityRow[];
}

interface CapabilityTabsProps {
  readonly areas: readonly CapabilityArea[];
}

/** Seconds an area stays before the next one takes over, until the visitor touches the tabs. */
const AUTOPLAY_SECONDS = 7;
const ROW_STAGGER_SECONDS = 0.06;

function RowIcon({ id }: { readonly id: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {CAPABILITY_ICONS[id]}
    </svg>
  );
}

function AreaRows({ area }: { readonly area: CapabilityArea }) {
  return (
    <ul>
      {area.items.map((row, index) => (
        <motion.li
          key={row.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SMOOTH_SPRING, delay: index * ROW_STAGGER_SECONDS }}
          className="flex items-center gap-3 border-b border-gray-200/70 py-3 text-sm text-gray-700 last:border-b-0 dark:border-gray-800/70 dark:text-gray-300"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-subtle text-brand-dark dark:bg-brand-dim/20 dark:text-brand">
            <RowIcon id={row.id} />
          </span>
          {row.label}
        </motion.li>
      ))}
    </ul>
  );
}

/**
 * Three areas as tabs: the list on the left, and on the right the area's line drawing and
 * rows. The drawing redraws and the rows cascade in on every switch. Until the visitor
 * clicks or hovers, the areas take turns on their own; on phones each tab opens in place.
 */
export function CapabilityTabs({ areas }: CapabilityTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isInView = useInView(rootRef, { amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId();
  const active = areas[activeIndex];

  const isAutoplaying = isInView && !hasInteracted && !isHovered && !prefersReducedMotion;
  useEffect(() => {
    if (!isAutoplaying) return;
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % areas.length),
      AUTOPLAY_SECONDS * 1000,
    );
    return () => window.clearInterval(timer);
  }, [isAutoplaying, areas.length]);

  function select(index: number) {
    setHasInteracted(true);
    setActiveIndex(index);
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: areas.length - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const wrapped = (next + areas.length) % areas.length;
    select(wrapped);
    tabRefs.current[wrapped]?.focus();
  }

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = `${baseId}-panel`;

  return (
    <div
      ref={rootRef}
      className="grid gap-4 md:grid-cols-[280px_1fr]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
    >
      <div role="tablist" aria-orientation="vertical" className="clearing flex flex-col gap-2">
        {areas.map((area, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={area.id} className="contents">
              <button
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={tabId(index)}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cn(
                  "pressable relative rounded-xl border px-4 py-4 text-left transition-colors",
                  isActive
                    ? "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
                    : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/60",
                )}
              >
                {/* The active marker slides between tabs instead of blinking on and off. */}
                {isActive && (
                  <motion.span
                    layoutId={`${baseId}-marker`}
                    transition={SMOOTH_SPRING}
                    className="absolute bottom-4 left-0 top-4 w-0.5 rounded-full bg-brand"
                  />
                )}
                <span
                  className={cn(
                    "block font-semibold",
                    isActive ? "text-foreground" : "text-gray-500 dark:text-gray-400",
                  )}
                >
                  {area.title}
                </span>
                <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                  {area.summary}
                </span>
                {/* While the areas take turns, a thin line shows the time left on this one. */}
                {isActive && isAutoplaying && (
                  <motion.span
                    key={`${area.id}-progress`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_SECONDS, ease: "linear" }}
                    className="absolute bottom-0 left-4 right-4 h-px origin-left bg-brand/40"
                  />
                )}
              </button>
              {/* On phones the active area opens right under its tab. */}
              {isActive && (
                <div className="rounded-xl border border-gray-200 bg-white px-5 py-2 md:hidden dark:border-gray-800 dark:bg-gray-950">
                  <AreaRows key={area.id} area={area} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(activeIndex)}
        className="hidden min-h-[440px] rounded-xl border border-gray-200 bg-white p-7 md:grid md:grid-cols-1 md:items-center md:gap-8 lg:grid-cols-[1fr_1fr] dark:border-gray-800 dark:bg-gray-950"
      >
        <div className="hidden items-center justify-center lg:flex">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="w-full"
            >
              <CapabilityIllustration id={active.id} caption={active.caption} />
            </motion.div>
          </AnimatePresence>
        </div>
        <AreaRows key={active.id} area={active} />
      </div>
    </div>
  );
}
