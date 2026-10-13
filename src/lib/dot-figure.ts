/**
 * A figure drawn with the dot field: the grid cells under a shape light up in the brand
 * color and assemble outward from the shape's center. The shape is rasterized once per
 * layout and looked up per dot per frame, so drawing it costs no more than the field.
 */
import { DOT_SPACING_PX } from "./dot-field";
import type { DotBitmap } from "./dot-font";

/** Where the figure sits on the page, in CSS pixels from the page's top-left corner. */
export interface PageRect {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

export interface FigureMask {
  readonly firstColumn: number;
  readonly firstRow: number;
  readonly columns: number;
  readonly rows: number;
  /** 1 where the cell is part of the shape, by row-major index. */
  readonly cells: Uint8Array;
  /** Seconds after birth before each cell lights up: the center first, the edges last. */
  readonly delays: Float32Array;
  readonly dotCount: number;
}

/** Paints the shape, in CSS pixels, onto a context the size of the figure's rect. */
export type ShapePainter = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => void;

/** How long the assembly takes from the first cell to the last. */
const ASSEMBLY_SECONDS = 1.1;
/** Seconds one cell takes to go from field dot to figure dot. */
export const FIGURE_RISE_SECONDS = 0.5;

function cellCenter(index: number): number {
  return DOT_SPACING_PX / 2 + index * DOT_SPACING_PX;
}

/**
 * Rasterizes the shape at the rect's size and keeps the grid cells whose center lands on
 * painted pixels. Returns null when the rect is too small to hold a cell.
 */
export function createFigureMask(
  rect: PageRect,
  paint: ShapePainter,
  canvas: HTMLCanvasElement,
): FigureMask | null {
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);
  if (width < DOT_SPACING_PX || height < DOT_SPACING_PX) return null;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;
  canvas.width = width;
  canvas.height = height;
  context.clearRect(0, 0, width, height);
  paint(context, width, height);
  const pixels = context.getImageData(0, 0, width, height).data;

  const firstColumn = Math.ceil((rect.left - DOT_SPACING_PX / 2) / DOT_SPACING_PX);
  const lastColumn = Math.floor((rect.left + width - DOT_SPACING_PX / 2) / DOT_SPACING_PX);
  const firstRow = Math.ceil((rect.top - DOT_SPACING_PX / 2) / DOT_SPACING_PX);
  const lastRow = Math.floor((rect.top + height - DOT_SPACING_PX / 2) / DOT_SPACING_PX);
  const columns = lastColumn - firstColumn + 1;
  const rows = lastRow - firstRow + 1;
  if (columns <= 0 || rows <= 0) return null;

  const cells = new Uint8Array(columns * rows);
  const distances = new Float32Array(columns * rows);
  const centerX = rect.left + width / 2;
  const centerY = rect.top + height / 2;
  let dotCount = 0;
  let farthest = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const pageX = cellCenter(firstColumn + column);
      const pageY = cellCenter(firstRow + row);
      const px = Math.round(pageX - rect.left);
      const py = Math.round(pageY - rect.top);
      const alpha = pixels[(py * width + px) * 4 + 3];
      if (alpha < 128) continue;
      const index = row * columns + column;
      cells[index] = 1;
      distances[index] = Math.hypot(pageX - centerX, pageY - centerY);
      farthest = Math.max(farthest, distances[index]);
      dotCount += 1;
    }
  }
  if (dotCount === 0) return null;

  const delays = new Float32Array(columns * rows);
  for (let index = 0; index < delays.length; index += 1) {
    if (cells[index]) delays[index] = (distances[index] / (farthest || 1)) * ASSEMBLY_SECONDS;
  }
  return { firstColumn, firstRow, columns, rows, cells, delays, dotCount };
}

/** How long a bitmap takes to light up, cell by cell in reading order. */
const TYPING_SECONDS = 1.6;

/**
 * A figure whose cells are given directly, one bitmap cell per grid cell, centered in the
 * rect. Cells light up in reading order, so text looks typed onto a dot-matrix board.
 */
export function createMatrixMask(rect: PageRect, bitmap: DotBitmap): FigureMask | null {
  const spanStart = (edge: number) => Math.ceil((edge - DOT_SPACING_PX / 2) / DOT_SPACING_PX);
  const spanEnd = (edge: number) => Math.floor((edge - DOT_SPACING_PX / 2) / DOT_SPACING_PX);
  const availableColumns = spanEnd(rect.left + rect.width) - spanStart(rect.left) + 1;
  const availableRows = spanEnd(rect.top + rect.height) - spanStart(rect.top) + 1;
  if (availableColumns < bitmap.columns || availableRows < bitmap.rows) return null;

  const firstColumn = spanStart(rect.left) + Math.floor((availableColumns - bitmap.columns) / 2);
  const firstRow = spanStart(rect.top) + Math.floor((availableRows - bitmap.rows) / 2);
  const size = bitmap.columns * bitmap.rows;
  const cells = new Uint8Array(size);
  const delays = new Float32Array(size);
  let dotCount = 0;
  bitmap.cells.forEach((row, y) => {
    row.forEach((isLit, x) => {
      if (!isLit) return;
      const index = y * bitmap.columns + x;
      cells[index] = 1;
      delays[index] = (index / size) * TYPING_SECONDS;
      dotCount += 1;
    });
  });
  if (dotCount === 0) return null;
  return { firstColumn, firstRow, columns: bitmap.columns, rows: bitmap.rows, cells, delays, dotCount };
}

/** True for any page cell inside the figure's box, lit or not. */
export function isInsideFigure(mask: FigureMask, column: number, pageRow: number): boolean {
  const localColumn = column - mask.firstColumn;
  const localRow = pageRow - mask.firstRow;
  return localColumn >= 0 && localColumn < mask.columns && localRow >= 0 && localRow < mask.rows;
}

/** The cell's index in the mask, or -1 when the page cell is not part of the figure. */
export function figureCellIndex(mask: FigureMask, column: number, pageRow: number): number {
  const localColumn = column - mask.firstColumn;
  const localRow = pageRow - mask.firstRow;
  if (localColumn < 0 || localColumn >= mask.columns) return -1;
  if (localRow < 0 || localRow >= mask.rows) return -1;
  const index = localRow * mask.columns + localColumn;
  return mask.cells[index] ? index : -1;
}

/** How far a cell has risen into the figure: 0 still a field dot, 1 fully lit. */
export function figureProgress(mask: FigureMask, index: number, secondsSinceBirth: number): number {
  const t = (secondsSinceBirth - mask.delays[index]) / FIGURE_RISE_SECONDS;
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t * t * (3 - 2 * t);
}

/**
 * The layered-diamond mark from the logo: a filled top layer and two chevrons under it,
 * drawn thick enough that each reads as a band of dots.
 */
export function paintLayersMark(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  // The logo's own 62 x 52 drawing space, scaled to fit.
  const scale = Math.min(width / 62, height / 52);
  const offsetX = (width - 62 * scale) / 2;
  const offsetY = (height - 52 * scale) / 2;
  const point = (x: number, y: number): readonly [number, number] => [
    offsetX + x * scale,
    offsetY + y * scale,
  ];

  context.fillStyle = "#000";
  context.strokeStyle = "#000";
  context.lineCap = "round";
  context.lineJoin = "round";

  context.beginPath();
  context.moveTo(...point(31, 3));
  context.lineTo(...point(57, 15));
  context.lineTo(...point(31, 27));
  context.lineTo(...point(5, 15));
  context.closePath();
  context.fill();

  context.lineWidth = 7 * scale;
  for (const top of [25, 35]) {
    context.beginPath();
    context.moveTo(...point(5, top));
    context.lineTo(...point(31, top + 11));
    context.lineTo(...point(57, top));
    context.stroke();
  }
}
