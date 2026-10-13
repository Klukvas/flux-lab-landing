"use client";

import type { ProjectHighlight } from "@/types";
import {
  Container,
  CountUp,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from "@/components/ui";

interface ProjectHighlightsProps {
  readonly highlights: readonly ProjectHighlight[];
  readonly title: string;
}

/** Plain whole numbers, optionally with a trailing "+": "10", "50+". */
const COUNTABLE_VALUE = /^(\d+)(\+?)$/;

/**
 * Counts the figure up when it can be done honestly. Anything with a unit or a unit-like
 * prefix ("$55", "3x", "99.9%", "2.1K") stays as written, since animating it would
 * mean inventing a format for it.
 */
function HighlightValue({ value }: { readonly value: string }) {
  const match = COUNTABLE_VALUE.exec(value);
  if (!match) return <>{value}</>;
  return <CountUp value={Number(match[1])} suffix={match[2]} />;
}

export function ProjectHighlights({ highlights, title }: ProjectHighlightsProps) {
  return (
    <section id="highlights" className="scroll-mt-16 py-24">
      <Container>
        <SectionHeading title={title} />
        <RevealGroup className="mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {highlights.map((item) => (
            <RevealItem
              key={item.label}
              className="rounded-xl border border-gray-200 bg-white p-5 text-center dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="text-2xl font-bold tabular-nums text-foreground">
                <HighlightValue value={item.value} />
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {item.label}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
