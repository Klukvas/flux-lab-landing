import { describe, expect, it } from "vitest";
import { layoutDotText } from "./dot-font";

const render = (lines: readonly string[]) =>
  layoutDotText(lines).cells.map((row) => row.map((cell) => (cell ? "#" : ".")).join(""));

describe("layoutDotText", () => {
  it("draws letters 7 rows tall with one empty column between them", () => {
    const bitmap = layoutDotText(["HI"]);

    expect(bitmap.rows).toBe(7);
    expect(bitmap.columns).toBe(5 + 1 + 3);
    expect(render(["HI"])[3]).toBe("#####..#.");
  });

  it("centers shorter lines and leaves two empty rows between lines", () => {
    const bitmap = layoutDotText(["WE CAN", "I"]);
    const rows = render(["WE CAN", "I"]);

    expect(bitmap.rows).toBe(7 + 2 + 7);
    expect(rows[7]).toMatch(/^\.+$/);
    expect(rows[9].indexOf("#")).toBe(Math.floor((bitmap.columns - 3) / 2));
  });

  it("sizes the hero phrase to fit a 1024px container", () => {
    const bitmap = layoutDotText(["WE CAN", "MAKE IT", "HAPPEN"]);

    expect(bitmap.columns * 24).toBeLessThanOrEqual(960);
    expect(bitmap.rows).toBe(25);
  });

  it("skips characters it has no glyph for", () => {
    expect(layoutDotText(["A?"]).columns).toBe(5 + 1);
  });
});
