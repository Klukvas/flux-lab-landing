"use client";

import { motion, useReducedMotion } from "framer-motion";
import { bitmapStrokes } from "@/lib/dot-figure";
import { layoutDotText } from "@/lib/dot-font";

/** The phrase's own grid on phones: fine enough for "HAPPEN" (35 cells) to fit ~360px. */
const CELL = 10;
const DOT_RADIUS = 1.7;
const STROKE_WIDTH = 0.8;
/** The whole phrase lights up over this long, cell by cell in reading order. */
const TYPING_SECONDS = 1.6;
const START_DELAY_SECONDS = 0.3;

const center = (index: number) => index * CELL + CELL / 2;

interface MobileDotPhraseProps {
  readonly lines: readonly string[];
}

/**
 * The dot-matrix phrase for phones. The page's 24px field is too coarse to spell it at
 * this width, so the phrase draws itself on its own finer grid in the same language:
 * dots typed in reading order, then the faint strokes joining them.
 */
export function MobileDotPhrase({ lines }: MobileDotPhraseProps) {
  const prefersReducedMotion = useReducedMotion();
  const bitmap = layoutDotText(lines);
  const width = bitmap.columns * CELL;
  const height = bitmap.rows * CELL;
  const size = bitmap.columns * bitmap.rows;
  const delayOf = (x: number, y: number) =>
    prefersReducedMotion ? 0 : START_DELAY_SECONDS + ((y * bitmap.columns + x) / size) * TYPING_SECONDS;

  const strokes = bitmapStrokes(bitmap).map(([[x, y], [ex, ey]]) => ({
    key: `${x}-${y}-${ex}-${ey}`,
    d: `M${center(x)} ${center(y)}L${center(ex)} ${center(ey)}`,
    delay: Math.max(delayOf(x, y), delayOf(ex, ey)),
  }));

  // Every element starts hidden on both server and client, so hydration matches; reduced
  // motion then shows everything at once instead of typing it.
  const duration = prefersReducedMotion ? 0 : 0.35;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full overflow-visible text-brand" aria-hidden="true">
      <g opacity={0.3} style={{ filter: "drop-shadow(0 0 3px currentColor)" }}>
        {strokes.map((stroke) => (
          <motion.path
            key={stroke.key}
            d={stroke.d}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration, delay: stroke.delay }}
          />
        ))}
      </g>
      {bitmap.cells.flatMap((row, y) =>
        row.map((lit, x) =>
          lit ? (
            <motion.circle
              key={`${x}-${y}`}
              cx={center(x)}
              cy={center(y)}
              r={DOT_RADIUS}
              fill="currentColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration, delay: delayOf(x, y) }}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
