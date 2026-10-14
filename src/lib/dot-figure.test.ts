import { describe, expect, it } from "vitest";
import { DOT_SPACING_PX } from "./dot-field";
import {
  FIGURE_RISE_SECONDS,
  createFigureMask,
  createMatrixMask,
  bitmapStrokes,
  figureCellIndex,
  figureLinks,
  figureProgress,
  type FigureMask,
  type ShapePainter,
} from "./dot-figure";

/** A canvas stand-in: paints are recorded as a list of filled rectangles, in CSS pixels. */
function fakeCanvas(rects: readonly (readonly [number, number, number, number])[]) {
  let width = 0;
  let height = 0;
  const canvas = {
    set width(value: number) { width = value; },
    get width() { return width; },
    set height(value: number) { height = value; },
    get height() { return height; },
    getContext: () => ({
      clearRect: () => {},
      getImageData: () => {
        const data = new Uint8ClampedArray(width * height * 4);
        for (const [x, y, w, h] of rects) {
          for (let py = y; py < y + h; py += 1) {
            for (let px = x; px < x + w; px += 1) {
              if (px < width && py < height) data[(py * width + px) * 4 + 3] = 255;
            }
          }
        }
        return { data };
      },
    }),
  };
  return canvas as unknown as HTMLCanvasElement;
}

const noPaint: ShapePainter = () => {};

describe("createFigureMask", () => {
  it("keeps the cells whose center lands on paint", () => {
    // A 96px square at page (120, 48): cells with centers at x 132,156,180,204 and y 60,84,108,132.
    const rect = { left: 120, top: 48, width: 96, height: 96 };
    const mask = createFigureMask(rect, noPaint, fakeCanvas([[0, 0, 48, 96]]));

    expect(mask).not.toBeNull();
    const { firstColumn, firstRow, columns, rows, dotCount } = mask as FigureMask;
    expect([firstColumn, firstRow, columns, rows]).toEqual([5, 2, 4, 4]);
    expect(dotCount).toBe(2 * 4);
    expect(figureCellIndex(mask as FigureMask, 5, 2)).toBeGreaterThanOrEqual(0);
    expect(figureCellIndex(mask as FigureMask, 7, 2)).toBe(-1);
  });

  it("returns null for an empty or tiny rect", () => {
    expect(createFigureMask({ left: 0, top: 0, width: 10, height: 10 }, noPaint, fakeCanvas([]))).toBeNull();
    expect(createFigureMask({ left: 0, top: 0, width: 96, height: 96 }, noPaint, fakeCanvas([]))).toBeNull();
  });

  it("lights the center first and the edges last", () => {
    const rect = { left: 0, top: 0, width: 5 * DOT_SPACING_PX, height: DOT_SPACING_PX };
    const mask = createFigureMask(rect, noPaint, fakeCanvas([[0, 0, 120, 24]])) as FigureMask;

    const center = figureCellIndex(mask, 2, 0);
    const edge = figureCellIndex(mask, 0, 0);
    expect(mask.delays[center]).toBe(0);
    expect(mask.delays[edge]).toBeGreaterThan(mask.delays[center]);
    expect(figureProgress(mask, center, FIGURE_RISE_SECONDS)).toBe(1);
    expect(figureProgress(mask, edge, 0)).toBe(0);
    expect(figureProgress(mask, edge, mask.delays[edge] + FIGURE_RISE_SECONDS / 2)).toBeCloseTo(0.5);
  });
});

describe("createMatrixMask", () => {
  const bitmap = { columns: 3, rows: 2, cells: [[true, false, true], [false, true, false]] };

  it("maps each bitmap cell to one grid cell, centered in the rect", () => {
    const mask = createMatrixMask({ left: 0, top: 0, width: 5 * DOT_SPACING_PX, height: 2 * DOT_SPACING_PX }, bitmap) as FigureMask;

    expect([mask.firstColumn, mask.firstRow, mask.columns, mask.rows]).toEqual([1, 0, 3, 2]);
    expect(mask.dotCount).toBe(3);
    expect(figureCellIndex(mask, 1, 0)).toBeGreaterThanOrEqual(0);
    expect(figureCellIndex(mask, 2, 0)).toBe(-1);
  });

  it("lights cells in reading order", () => {
    const mask = createMatrixMask({ left: 0, top: 0, width: 72, height: 48 }, bitmap) as FigureMask;

    expect(mask.delays[figureCellIndex(mask, 2, 0)]).toBeGreaterThan(mask.delays[figureCellIndex(mask, 0, 0)]);
    expect(mask.delays[figureCellIndex(mask, 1, 1)]).toBeGreaterThan(mask.delays[figureCellIndex(mask, 2, 0)]);
  });

  it("gives up when the rect cannot hold the bitmap", () => {
    expect(createMatrixMask({ left: 0, top: 0, width: 48, height: 48 }, bitmap)).toBeNull();
  });
});

describe("figureLinks", () => {
  const maskOf = (pattern: readonly string[]) =>
    createMatrixMask(
      { left: 0, top: 0, width: pattern[0].length * DOT_SPACING_PX, height: pattern.length * DOT_SPACING_PX },
      { columns: pattern[0].length, rows: pattern.length, cells: pattern.map((row) => [...row].map((c) => c === "#")) },
    ) as FigureMask;

  it("joins straight neighbours", () => {
    expect(figureLinks(maskOf(["##", "#."]))).toEqual([
      { from: 0, to: 1 },
      { from: 0, to: 2 },
    ]);
  });

  it("carries a slant into the stems instead of leaving horizontal stubs", () => {
    // An N: the diagonal must start at the left stem's corner and end in the right stem.
    const n = maskOf(["#...#", "#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#"]);
    const links = figureLinks(n).map(({ from, to }) => `${from}-${to}`);

    expect(links).toContain(`${1 * 5 + 0}-${2 * 5 + 1}`);
    expect(links).toContain(`${4 * 5 + 3}-${5 * 5 + 4}`);
    expect(links).not.toContain(`${2 * 5 + 0}-${2 * 5 + 1}`);
    expect(links).not.toContain(`${4 * 5 + 3}-${4 * 5 + 4}`);
  });

  it("leaves a K's junction alone so its arms do not cross", () => {
    const k = maskOf(["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"]);
    const links = figureLinks(k).map(({ from, to }) => `${from}-${to}`);

    expect(links).toContain(`${3 * 5 + 0}-${3 * 5 + 1}`);
    expect(links).not.toContain(`${2 * 5 + 0}-${3 * 5 + 1}`);
    expect(links).not.toContain(`${3 * 5 + 1}-${4 * 5 + 0}`);
  });

  it("joins a diagonal only when no straight path does", () => {
    expect(figureLinks(maskOf(["#.", ".#"]))).toEqual([{ from: 0, to: 3 }]);
    expect(figureLinks(maskOf([".#", "#."]))).toEqual([{ from: 1, to: 2 }]);
    expect(figureLinks(maskOf(["##", ".#"]))).toEqual([
      { from: 0, to: 1 },
      { from: 1, to: 3 },
    ]);
  });
});

describe("bitmapStrokes", () => {
  it("draws a bitmap's strokes with the same rules as the page", () => {
    const bitmap = { columns: 2, rows: 2, cells: [[true, false], [false, true]] };

    expect(bitmapStrokes(bitmap)).toEqual([[[0, 0], [1, 1]]]);
  });
});

describe("figureCellIndex", () => {
  it("rejects cells outside the mask's rows and columns", () => {
    const mask = createFigureMask({ left: 0, top: 0, width: 48, height: 48 }, noPaint, fakeCanvas([[0, 0, 48, 48]])) as FigureMask;

    expect(figureCellIndex(mask, -1, 0)).toBe(-1);
    expect(figureCellIndex(mask, 0, 2)).toBe(-1);
    expect(figureCellIndex(mask, 1, 1)).toBeGreaterThanOrEqual(0);
  });
});
