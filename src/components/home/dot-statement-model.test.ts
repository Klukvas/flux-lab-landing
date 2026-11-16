import { describe, expect, it } from "vitest";
import { createStatementModel, statementFrame } from "./dot-statement-model";

const away = { x: -1000, y: -1000, strength: 0 };

describe("responsive original dot phrase", () => {
  it("fits a half-width hero without the original 840px grid minimum", () => {
    const model = createStatementModel();
    expect(model.width).toBeLessThan(400);
    expect(model.mask.dotCount).toBeGreaterThan(200);
    expect(model.strokes.length).toBeGreaterThan(100);
  });
  it("types the actual bitmap in reading order before joining its strokes", () => {
    const model = createStatementModel();
    expect(statementFrame(model, 0, away).every((dot) => dot.lit === 0)).toBe(
      true,
    );
    const partial = statementFrame(model, 1.1, away);
    const litCells = partial.filter((_, index) =>
      Boolean(model.mask.cells[index]),
    );
    expect(litCells.some((dot) => dot.lit === 1)).toBe(true);
    expect(litCells.some((dot) => dot.lit === 0)).toBe(true);
    expect(
      statementFrame(model, 3, away)
        .filter((_, index) => Boolean(model.mask.cells[index]))
        .every((dot) => dot.lit === 1),
    ).toBe(true);
  });
  it("uses the original mouse lean and breathing for both text and field dots", () => {
    const model = createStatementModel();
    const first = statementFrame(model, 3, away);
    const moved = statementFrame(model, 3, { x: 100, y: 70, strength: 1 });
    expect(
      moved.some((dot, index) => Math.abs(dot.x - first[index].x) > 1),
    ).toBe(true);
    expect(moved.some((dot, index) => dot.radius > first[index].radius)).toBe(
      true,
    );
    const later = statementFrame(model, 4, away);
    expect(later.some((dot, index) => dot.radius !== first[index].radius)).toBe(
      true,
    );
  });
});
