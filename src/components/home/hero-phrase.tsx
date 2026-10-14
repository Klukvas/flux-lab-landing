import { DOT_SPACING_PX } from "@/lib/dot-field";
import { bitmapStrokes } from "@/lib/dot-figure";
import { layoutDotText, type DotBitmap } from "@/lib/dot-font";
import { MobileDotPhrase } from "./mobile-dot-phrase";
import { ScrollCue } from "./scroll-cue";

/** The studio's line, split the way it reads best on a dot-matrix board. */
const PHRASE = "We can make it happen";
const PHRASE_LINES = ["WE CAN", "MAKE IT", "HAPPEN"] as const;
/** Empty dot rows between the lines: two normally, one on short screens to fit the fold. */
const LINE_GAP = 2;
const COMPACT_LINE_GAP = 1;
const FALLBACK_DOT_RADIUS = 2.4;

const center = (index: number) => index * DOT_SPACING_PX + DOT_SPACING_PX / 2;

/** The page's strokes for this bitmap, as one SVG path. */
function strokePath(bitmap: DotBitmap): string {
  return bitmapStrokes(bitmap)
    .map(([[x, y], [ex, ey]]) => `M${center(x)} ${center(y)}L${center(ex)} ${center(ey)}`)
    .join("");
}

interface HeroPhraseProps {
  /** Where the arrow under the phrase scrolls to. */
  readonly nextId: string;
  readonly scrollLabel: string;
}

interface DotPhraseProps {
  readonly lineGap: number;
  readonly className: string;
}

/**
 * One layout of the phrase: an empty box the dot field measures and spells into, holding
 * a static drawing of the same dots and strokes for reduced motion.
 */
function DotPhrase({ lineGap, className }: DotPhraseProps) {
  const bitmap = layoutDotText(PHRASE_LINES, lineGap);
  const width = bitmap.columns * DOT_SPACING_PX;
  const height = bitmap.rows * DOT_SPACING_PX;

  return (
    <div
      data-dot-figure="text"
      data-dot-lines={PHRASE_LINES.join("|")}
      data-dot-line-gap={lineGap}
      aria-hidden="true"
      className={`mx-auto ${className}`}
      style={{ width, height }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="hidden h-full w-full overflow-visible text-brand motion-reduce:block"
      >
        <path
          d={strokePath(bitmap)}
          stroke="currentColor"
          strokeWidth={1.25}
          strokeLinecap="round"
          opacity={0.3}
          style={{ filter: "drop-shadow(0 0 6px currentColor)" }}
        />
        {bitmap.cells.flatMap((row, y) =>
          row.map((isLit, x) =>
            isLit ? (
              <circle key={`${x}-${y}`} cx={center(x)} cy={center(y)} r={FALLBACK_DOT_RADIUS} fill="currentColor" />
            ) : null,
          ),
        )}
      </svg>
    </div>
  );
}

interface HeroPhraseProps {
  /** Where the arrow under the phrase scrolls to. */
  readonly nextId: string;
  readonly scrollLabel: string;
}

/**
 * The top of the home page. On wide screens the page's dot field spells the phrase, in
 * three lines, packed closer on short screens so it still fits above the fold; the field
 * draws into whichever box is displayed. Below the desktop
 * breakpoint the 24px grid is too coarse for letters, so the phrase draws itself on its
 * own finer dot grid instead.
 */
export function HeroPhrase({ nextId, scrollLabel }: HeroPhraseProps) {
  return (
    // On wide screens the phrase owns the first screen: the box fills the viewport under
    // the header (3.5rem) and the hero's top padding (5rem), so the next block starts
    // below the fold and an arrow points to it.
    // Short screens (≤820 tall) also trim the gap above the arrow and the bottom padding.
    <div className="mb-14 lg:mb-0 lg:flex lg:min-h-[calc(100svh-8.5rem)] lg:flex-col lg:items-center lg:justify-center lg:gap-12 lg:pb-8 [@media(min-width:1024px)_and_(max-height:820px)]:min-h-[calc(100svh-5rem)] [@media(min-width:1024px)_and_(max-height:820px)]:gap-6 [@media(min-width:1024px)_and_(max-height:820px)]:pb-4">
      <p className="sr-only">{PHRASE}</p>
      {/* Phones and tablets: the phrase on its own finer dot grid. */}
      <div className="mx-auto w-full max-w-md lg:hidden">
        <MobileDotPhrase lines={PHRASE_LINES} />
      </div>
      <DotPhrase
        lineGap={LINE_GAP}
        // Short desktop screens (≤820 tall) swap to the packed layout. Tailwind only sees
        // whole class names, so the media variant is spelled out in both.
        className="hidden lg:block [@media(min-width:1024px)_and_(max-height:820px)]:hidden" />
      <DotPhrase
        lineGap={COMPACT_LINE_GAP}
        className="hidden [@media(min-width:1024px)_and_(max-height:820px)]:block"
      />
      <div className="hidden lg:block">
        <ScrollCue targetId={nextId} label={scrollLabel} />
      </div>
    </div>
  );
}
