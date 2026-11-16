import { dotAt, type Dot, type DotFrame, type Pointer } from "@/lib/dot-field";
import {
  bitmapStrokes,
  figureProgress,
  type FigureMask,
} from "@/lib/dot-figure";
import { layoutDotText } from "@/lib/dot-font";

export const PHRASE_CELL = 10;
export const PHRASE_BIRTH_DELAY = 0.4;
const TYPING_SECONDS = 1.6;

/** A fine physical grid reuses the original field's motion at any hero width. */
export function createStatementModel() {
  const bitmap = layoutDotText(["WE CAN", "MAKE IT", "HAPPEN"], 2);
  const size = bitmap.columns * bitmap.rows;
  const dots: readonly Dot[] = Array.from({ length: size }, (_, index) => ({
    column: index % bitmap.columns,
    row: Math.floor(index / bitmap.columns),
    x: ((index % bitmap.columns) + 0.5) * PHRASE_CELL,
    y: (Math.floor(index / bitmap.columns) + 0.5) * PHRASE_CELL,
  }));
  const mask: FigureMask = {
    columns: bitmap.columns,
    rows: bitmap.rows,
    firstColumn: 0,
    firstRow: 0,
    cells: Uint8Array.from(bitmap.cells.flatMap((row) => row.map(Number))),
    delays: Float32Array.from(
      dots.map((_, index) => (index / size) * TYPING_SECONDS),
    ),
    dotCount: bitmap.cells.flatMap((row) => row.filter(Boolean)).length,
  };
  return {
    bitmap,
    dots,
    mask,
    width: bitmap.columns * PHRASE_CELL,
    height: bitmap.rows * PHRASE_CELL,
    strokes: bitmapStrokes(bitmap).map(([[x, y], [endX, endY]]) => ({
      from: y * bitmap.columns + x,
      to: endY * bitmap.columns + endX,
    })),
  };
}

export type StatementModel = ReturnType<typeof createStatementModel>;
export type StatementFrame = DotFrame & { readonly lit: number };

export function statementFrame(
  model: StatementModel,
  seconds: number,
  pointer: Pointer,
): readonly StatementFrame[] {
  return model.dots.map((dot, index) => {
    const lit = model.mask.cells[index]
      ? figureProgress(model.mask, index, seconds - PHRASE_BIRTH_DELAY)
      : 0;
    const frame = dotAt(dot, seconds, pointer, 0, lit);
    return { ...frame, alpha: lit > 0 ? frame.alpha : frame.alpha * 0.22, lit };
  });
}
