import { describe, expect, it } from "vitest";
import {
  DOT_SPACING_PX,
  POINTER_RADIUS_PX,
  createDotGrid,
  dotAt,
  pointerInfluence,
  type Dot,
} from "./dot-field";

const AWAY = { x: 0, y: 0, strength: 0 } as const;

function dotIn(column: number, row: number): Dot {
  return {
    column,
    row,
    x: DOT_SPACING_PX / 2 + column * DOT_SPACING_PX,
    y: DOT_SPACING_PX / 2 + row * DOT_SPACING_PX,
  };
}

describe("createDotGrid", () => {
  it("places a dot in the middle of every cell, with a spare row below the viewport", () => {
    const dots = createDotGrid(50, 30);

    expect(dots).toHaveLength(3 * (2 + 1));
    expect(dots[0]).toMatchObject({ column: 0, row: 0, x: 12, y: 12 });
    expect(dots[dots.length - 1]).toMatchObject({ column: 2, row: 2, x: 60, y: 60 });
  });

  it("matches the CSS pattern it replaces", () => {
    expect(DOT_SPACING_PX).toBe(24);
  });
});

describe("pointerInfluence", () => {
  it("is full under the pointer and gone at the radius", () => {
    expect(pointerInfluence(0)).toBe(1);
    expect(pointerInfluence(POINTER_RADIUS_PX)).toBe(0);
    expect(pointerInfluence(POINTER_RADIUS_PX * 2)).toBe(0);
  });

  it("falls off monotonically", () => {
    expect(pointerInfluence(40)).toBeGreaterThan(pointerInfluence(80));
    expect(pointerInfluence(80)).toBeGreaterThan(pointerInfluence(160));
  });
});

describe("dotAt", () => {
  const dot = dotIn(4, 4);

  it("rests in place with no pointer and breathes within its bounds", () => {
    const frames = [0, 0.9, 1.8, 2.7].map((time) => dotAt(dot, time, AWAY));

    for (const frame of frames) {
      expect(frame.x).toBe(dot.x);
      expect(frame.y).toBe(dot.y);
      expect(frame.accent).toBe(0);
      expect(frame.alpha).toBeGreaterThanOrEqual(0.3);
      expect(frame.alpha).toBeLessThanOrEqual(0.5);
    }
    expect(new Set(frames.map((frame) => frame.alpha.toFixed(3))).size).toBeGreaterThan(1);
  });

  it("slides up with the scroll", () => {
    expect(dotAt(dot, 0, AWAY, 10).y).toBe(dot.y - 10);
  });

  it("keeps a page row's look as it moves through the viewport", () => {
    // Scrolled one row down, this cell shows the page row the cell below showed before.
    const scrolled = dotAt(dot, 1.3, AWAY, DOT_SPACING_PX);
    const unscrolled = dotAt(dotIn(4, 5), 1.3, AWAY, 0);

    expect(scrolled.alpha).toBeCloseTo(unscrolled.alpha);
    expect(scrolled.radius).toBeCloseTo(unscrolled.radius);
    expect(scrolled.y).toBe(unscrolled.y - DOT_SPACING_PX);
  });

  it("leans toward a nearby pointer and takes on the accent", () => {
    const pointer = { x: dot.x + 60, y: dot.y, strength: 1 };
    const frame = dotAt(dot, 0, pointer);

    expect(frame.x).toBeGreaterThan(dot.x);
    expect(frame.x).toBeLessThan(pointer.x);
    expect(frame.y).toBe(dot.y);
    expect(frame.accent).toBeGreaterThan(0);
    expect(frame.alpha).toBeGreaterThan(dotAt(dot, 0, AWAY).alpha);
  });

  it("never leans further than a quarter of the spacing", () => {
    const leans = Array.from({ length: POINTER_RADIUS_PX }, (_, distance) => {
      const frame = dotAt(dot, 0, { x: dot.x + distance, y: dot.y, strength: 1 });
      return frame.x - dot.x;
    });

    expect(Math.max(...leans)).toBeLessThan(DOT_SPACING_PX / 4 + 0.5);
    expect(Math.max(...leans)).toBeGreaterThan(4);
  });

  it("stays put directly under the pointer", () => {
    const frame = dotAt(dot, 0, { x: dot.x, y: dot.y, strength: 1 });

    expect(frame.x).toBe(dot.x);
    expect(frame.y).toBe(dot.y);
  });

  it("lights a figure dot in the accent color, larger and brighter", () => {
    const field = dotAt(dot, 0, AWAY);
    const lit = dotAt(dot, 0, AWAY, 0, 1);
    const half = dotAt(dot, 0, AWAY, 0, 0.5);

    expect(lit.accent).toBe(1);
    expect(lit.radius).toBeGreaterThan(field.radius);
    expect(lit.alpha).toBeGreaterThan(field.alpha);
    expect(half.accent).toBe(0.5);
    expect(lit.x).toBe(dot.x);
  });

  it("scales the pointer's effect by its strength", () => {
    const half = dotAt(dot, 0, { x: dot.x + 60, y: dot.y, strength: 0.5 });
    const full = dotAt(dot, 0, { x: dot.x + 60, y: dot.y, strength: 1 });

    expect(half.accent).toBeCloseTo(full.accent / 2);
  });
});
