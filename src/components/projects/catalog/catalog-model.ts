/** Where a card sits relative to the project in the centre of the stack. */
export type CatalogPosition =
  "current" | "previous" | "next" | "above" | "below";

/** A step that lands one wheel gesture on one project, however long a trackpad keeps scrolling. */
export const STEP_LOCK_MS = 700;
/** Wheel events closer together than this belong to the gesture that already moved the stack. */
export const GESTURE_GAP_MS = 220;
/** Ignores the faint wheel noise some mice and trackpads send at rest. */
export const WHEEL_THRESHOLD = 8;
/** A horizontal swipe shorter than this is a wobble, not a request to move. */
export const SWIPE_MIN_PX = 48;

/** How much of the stage must be on screen before the wheel moves the stack instead of the page. */
export const CAPTURE_SHARE = 0.85;

/**
 * The stack is a loop: the last project's neighbour below is the first one. The offset is
 * taken the short way round, so with seven projects the one three steps back sits above.
 */
export function loopOffset(
  index: number,
  current: number,
  count: number,
): number {
  const forward = (((index - current) % count) + count) % count;
  return forward > count / 2 ? forward - count : forward;
}

export function positionFor(
  index: number,
  current: number,
  count: number,
): CatalogPosition {
  const offset = loopOffset(index, current, count);
  if (offset === 0) return "current";
  if (offset === -1) return "previous";
  if (offset === 1) return "next";
  return offset < 0 ? "above" : "below";
}

/** The project a step leads to, round the loop; null when there is nothing else to show. */
export function stepTarget(
  current: number,
  step: number,
  count: number,
): number | null {
  if (count < 2) return null;
  return (((current + step) % count) + count) % count;
}

/**
 * A loop has no end to let the page scroll on from, so the wheel moves the stack only while
 * the stage fills the screen, and only for one full lap in a row. After that lap, or before
 * the stage has scrolled fully into view, the wheel scrolls the page as usual.
 */
export function isStageInView(
  top: number,
  bottom: number,
  viewportHeight: number,
): boolean {
  const visible = Math.min(bottom, viewportHeight) - Math.max(top, 0);
  const canShow = Math.min(bottom - top, viewportHeight);
  return canShow > 0 && visible >= canShow * CAPTURE_SHARE;
}

export function hasFinishedLap(stepsInARow: number, count: number): boolean {
  return stepsInARow >= count;
}

export function wheelDirection(deltaY: number): -1 | 0 | 1 {
  if (Math.abs(deltaY) < WHEEL_THRESHOLD) return 0;
  return deltaY > 0 ? 1 : -1;
}

/**
 * Phones keep vertical swipes for scrolling the page, so the stack answers horizontal
 * swipes only: swiping left brings the next project, swiping right the previous one.
 */
export function swipeDirection(deltaX: number, deltaY: number): -1 | 0 | 1 {
  if (Math.abs(deltaX) < SWIPE_MIN_PX || Math.abs(deltaX) <= Math.abs(deltaY)) {
    return 0;
  }
  return deltaX < 0 ? 1 : -1;
}

export function keyDirection(key: string): -1 | 0 | 1 {
  if (key === "ArrowDown" || key === "PageDown") return 1;
  if (key === "ArrowUp" || key === "PageUp") return -1;
  return 0;
}

/** Long words such as "White label" get a smaller face than numbers so they fit a sticker. */
export function isWordValue(value: string): boolean {
  return value.length > 7;
}
