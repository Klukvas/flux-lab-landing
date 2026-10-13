/** Resolves the theme's CSS colors into the form a canvas can take. */

export type Rgb = readonly [number, number, number];

/** Parses #rgb and #rrggbb; anything else falls back to the given color. */
export function parseHexColor(hex: string, fallback: Rgb): Rgb {
  const digits = hex.trim().replace(/^#/, "");
  const expanded =
    digits.length === 3
      ? digits
          .split("")
          .map((digit) => digit + digit)
          .join("")
      : digits;
  if (!/^[0-9a-f]{6}$/i.test(expanded)) return fallback;
  return [0, 2, 4].map((offset) =>
    parseInt(expanded.slice(offset, offset + 2), 16),
  ) as unknown as Rgb;
}

function mixChannel(from: number, to: number, amount: number): number {
  return Math.round(from + (to - from) * amount);
}

/**
 * Evenly spaced colors from `from` to `to`, as canvas fill styles. Picking from the
 * ramp per dot avoids building a color string for every dot on every frame.
 */
export function createColorRamp(from: Rgb, to: Rgb, steps: number): readonly string[] {
  return Array.from({ length: steps }, (_, index) => {
    const amount = index / (steps - 1);
    const [r, g, b] = [0, 1, 2].map((channel) =>
      mixChannel(from[channel], to[channel], amount),
    );
    return `rgb(${r} ${g} ${b})`;
  });
}
