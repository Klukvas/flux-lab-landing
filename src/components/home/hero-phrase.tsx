import { DOT_SPACING_PX } from "@/lib/dot-field";
import { layoutDotText } from "@/lib/dot-font";

/** The studio's line, split the way it reads best on a dot-matrix board. */
const PHRASE = "We can make it happen";
const PHRASE_LINES = ["WE CAN", "MAKE IT", "HAPPEN"] as const;
const FALLBACK_DOT_RADIUS = 2.4;

/**
 * The top of the home page. On wide screens the page's dot field spells the phrase into
 * this box, cell by cell; the box itself stays empty. The 24px grid is too coarse for
 * letters on phones, so they get the phrase set in type, and reduced motion, which never
 * sees the field draw, gets the same dots drawn statically.
 */
export function HeroPhrase() {
  const bitmap = layoutDotText(PHRASE_LINES);
  const width = bitmap.columns * DOT_SPACING_PX;
  const height = bitmap.rows * DOT_SPACING_PX;

  return (
    <div className="mb-14 lg:mb-16">
      <p className="rise-in font-sans text-5xl font-extrabold leading-none text-brand sm:text-6xl lg:sr-only">
        {PHRASE}
      </p>
      <div
        data-dot-figure="text"
        data-dot-lines={PHRASE_LINES.join("|")}
        aria-hidden="true"
        className="mx-auto hidden lg:block"
        style={{ width, height }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="hidden h-full w-full text-brand motion-reduce:block"
        >
          {bitmap.cells.flatMap((row, y) =>
            row.map((isLit, x) =>
              isLit ? (
                <circle
                  key={`${x}-${y}`}
                  cx={x * DOT_SPACING_PX + DOT_SPACING_PX / 2}
                  cy={y * DOT_SPACING_PX + DOT_SPACING_PX / 2}
                  r={FALLBACK_DOT_RADIUS}
                  fill="currentColor"
                />
              ) : null,
            ),
          )}
        </svg>
      </div>
    </div>
  );
}
