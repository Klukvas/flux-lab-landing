"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { SMOOTH_SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface SectionLink {
  /** The id of the section element on the page. */
  readonly id: string;
  readonly label: string;
}

interface ProjectSectionNavProps {
  readonly sections: readonly SectionLink[];
  readonly title: string;
}

/**
 * Only the part of the viewport around a third of the way down counts as "reading here",
 * so the highlight changes when a section's heading reaches the eye, not when its padding
 * first peeks in at the bottom edge.
 */
const READING_BAND = "-30% 0px -60% 0px";

/** Which section the visitor is reading, by watching which ones cross the reading band. */
function useActiveSection(idKey: string): string {
  const [activeId, setActiveId] = useState(() => idKey.split(",")[0]);

  useEffect(() => {
    const ids = idKey.split(",");
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Sections touch end to end, so two can share the band; the lower one is newer.
        const current = ids.toReversed().find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: READING_BAND },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [idKey]);

  return activeId;
}

/**
 * A strip that sticks under the site header on desktop and lists the case study's sections.
 * Phones skip it: the page is short enough to scroll, and the strip would eat the screen.
 */
export function ProjectSectionNav({ sections, title }: ProjectSectionNavProps) {
  const markerId = useId();
  const activeId = useActiveSection(
    sections.map((section) => section.id).join(","),
  );

  return (
    <nav
      aria-label={title}
      className="sticky top-14 z-40 hidden border-y border-gray-200 bg-background/80 backdrop-blur-md dark:border-gray-800 lg:block"
    >
      <Container className="flex items-center gap-6">
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {title}
        </span>
        <ul className="flex items-center gap-1">
          {sections.map(({ id, label }) => {
            const isActive = id === activeId;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative block px-3 py-3.5 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-foreground"
                      : "text-gray-500 hover:text-foreground dark:text-gray-400",
                  )}
                >
                  {label}
                  {/* One underline that slides to the section being read. */}
                  {isActive && (
                    <motion.span
                      layoutId={`${markerId}-marker`}
                      transition={SMOOTH_SPRING}
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
