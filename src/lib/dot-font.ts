/**
 * A 5x7 dot-matrix alphabet for text drawn with the page's dot field: every lit cell of a
 * glyph is one dot of the 24px grid, so the letters are made of the same dots as the page.
 */

export interface DotBitmap {
  readonly columns: number;
  readonly rows: number;
  /** Row-major: cells[row][column] is true where a dot lights up. */
  readonly cells: readonly (readonly boolean[])[];
}

const GLYPH_ROWS = 7;
/** Empty cells between letters, the width of a space, and empty rows between lines. */
const LETTER_GAP = 1;
const SPACE_WIDTH = 2;
const LINE_GAP = 2;

const GLYPHS: Record<string, readonly string[]> = {
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  B: ["####.", "#...#", "#...#", "####.", "#...#", "#...#", "####."],
  C: [".###.", "#...#", "#....", "#....", "#....", "#...#", ".###."],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  F: ["#####", "#....", "#....", "####.", "#....", "#....", "#...."],
  G: [".###.", "#...#", "#....", "#.###", "#...#", "#...#", ".###."],
  H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  I: ["###", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
  J: ["..###", "...#.", "...#.", "...#.", "#..#.", "#..#.", ".##.."],
  K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"],
  L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
  M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
  N: ["#...#", "#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#"],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  Q: [".###.", "#...#", "#...#", "#...#", "#.#.#", "#..#.", ".##.#"],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
  U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  V: ["#...#", "#...#", "#...#", "#...#", "#...#", ".#.#.", "..#.."],
  W: ["#...#", "#...#", "#...#", "#.#.#", "#.#.#", "#.#.#", ".#.#."],
  X: ["#...#", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "#...#"],
  Y: ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
  Z: ["#####", "....#", "...#.", "..#..", ".#...", "#....", "#####"],
};

/** One line as columns of 7 cells; unknown characters are left out rather than guessed. */
function layoutLine(line: string): boolean[][] {
  const columns: boolean[][] = [];
  const pushGap = (width: number) => {
    for (let i = 0; i < width; i += 1) columns.push(Array(GLYPH_ROWS).fill(false));
  };
  const chars = [...line.toUpperCase()];
  chars.forEach((char, index) => {
    if (char === " ") {
      pushGap(SPACE_WIDTH);
    } else {
      const glyph = GLYPHS[char];
      if (!glyph) return;
      for (let column = 0; column < glyph[0].length; column += 1) {
        columns.push(glyph.map((row) => row[column] === "#"));
      }
    }
    if (index < chars.length - 1) pushGap(LETTER_GAP);
  });
  return columns;
}

/** Lays the lines out centered under one another, LINE_GAP empty rows apart. */
export function layoutDotText(lines: readonly string[]): DotBitmap {
  const laidOut = lines.map(layoutLine);
  const columns = Math.max(0, ...laidOut.map((line) => line.length));
  const rows = lines.length * GLYPH_ROWS + Math.max(0, lines.length - 1) * LINE_GAP;
  const cells = Array.from({ length: rows }, () => Array<boolean>(columns).fill(false));
  laidOut.forEach((line, lineIndex) => {
    const top = lineIndex * (GLYPH_ROWS + LINE_GAP);
    const left = Math.floor((columns - line.length) / 2);
    line.forEach((column, x) => {
      column.forEach((isLit, y) => {
        if (isLit) cells[top + y][left + x] = true;
      });
    });
  });
  return { columns, rows, cells };
}
