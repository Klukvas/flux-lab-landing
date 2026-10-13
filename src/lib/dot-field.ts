/**
 * The dotted field behind the home page: a grid anchored to the page that breathes on its
 * own and leans toward the mouse. Pure geometry, so the canvas component only has to draw
 * what this returns.
 */

/** One cell of the grid that covers the viewport. x and y are its position at the top of the page. */
export interface Dot {
  readonly column: number;
  readonly row: number;
  readonly x: number;
  readonly y: number;
}

/** The mouse in viewport coordinates. */
export interface Pointer {
  readonly x: number;
  readonly y: number;
  /** 0 while the mouse is away from the page, 1 once it is over it. */
  readonly strength: number;
}

export interface DotFrame {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly alpha: number;
  /** 0 at the resting color, 1 fully in the accent color. */
  readonly accent: number;
}

export const DOT_SPACING_PX = 24;
export const POINTER_RADIUS_PX = 180;

const REST_RADIUS_PX = 1;
const REST_ALPHA = 0.4;

const BREATH_PERIOD_S = 3.6;
const BREATH_ALPHA = 0.2;
const BREATH_RADIUS_PX = 0.3;
/** One breath spans this many pixels diagonally, long enough to read as light passing. */
const BREATH_WAVELENGTH_PX = 640;
/** A little per-dot offset keeps the wave from looking like a printed pattern. */
const BREATH_JITTER = 0.8;

/** Peaks at about 6px of lean a third of the way out from the pointer. */
const POINTER_PULL = 24;
const POINTER_ALPHA = 0.6;
const POINTER_RADIUS_GROWTH_PX = 1.2;

/** Deterministic noise in [0, 1) from a grid position: the same page cell always gets the same jitter. */
function gridNoise(column: number, row: number): number {
  const raw = Math.sin(column * 12.9898 + row * 78.233) * 43758.5453;
  return raw - Math.floor(raw);
}

function breathPhase(x: number, pageY: number, column: number, pageRow: number): number {
  const wave = ((x + pageY) / BREATH_WAVELENGTH_PX) * 2 * Math.PI;
  return wave + gridNoise(column, pageRow) * BREATH_JITTER;
}

/**
 * A dot in the middle of every cell that covers the viewport, plus one row to spare: as the
 * page scrolls, rows slide up through the viewport and the spare one fills in below.
 */
export function createDotGrid(width: number, height: number): readonly Dot[] {
  const columns = Math.ceil(width / DOT_SPACING_PX);
  const rows = Math.ceil(height / DOT_SPACING_PX) + 1;
  return Array.from({ length: rows * columns }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    return {
      column,
      row,
      x: DOT_SPACING_PX / 2 + column * DOT_SPACING_PX,
      y: DOT_SPACING_PX / 2 + row * DOT_SPACING_PX,
    };
  });
}

/** 1 under the pointer, easing to 0 at the pointer radius. */
export function pointerInfluence(distance: number): number {
  if (distance >= POINTER_RADIUS_PX) return 0;
  const t = 1 - distance / POINTER_RADIUS_PX;
  return t * t * (3 - 2 * t);
}

/**
 * Where and how a dot is drawn this frame. Scrolling slides the rows up, and each cell
 * takes on the breathing phase of the page row it currently stands for, so the field
 * looks anchored to the page rather than to the window.
 */
export function dotAt(
  dot: Dot,
  timeSeconds: number,
  pointer: Pointer,
  scrollY = 0,
): DotFrame {
  const firstPageRow = Math.floor(scrollY / DOT_SPACING_PX);
  const y = dot.y - (scrollY - firstPageRow * DOT_SPACING_PX);
  const phase = breathPhase(dot.x, y + scrollY, dot.column, dot.row + firstPageRow);
  const breath =
    (1 + Math.sin((timeSeconds / BREATH_PERIOD_S) * 2 * Math.PI + phase)) / 2;

  const dx = pointer.x - dot.x;
  const dy = pointer.y - y;
  const pull = pointerInfluence(Math.hypot(dx, dy)) * pointer.strength;
  // Lean is proportional to the offset, so dots right under the pointer stay put
  // instead of piling onto it.
  const lean = (POINTER_PULL / POINTER_RADIUS_PX) * pull;

  return {
    x: dot.x + dx * lean,
    y: y + dy * lean,
    radius: REST_RADIUS_PX + BREATH_RADIUS_PX * breath + POINTER_RADIUS_GROWTH_PX * pull,
    alpha: Math.min(
      1,
      REST_ALPHA - BREATH_ALPHA / 2 + BREATH_ALPHA * breath + POINTER_ALPHA * pull,
    ),
    accent: pull,
  };
}
