import { describe, expect, it } from "vitest";
import { formatNumber, splitStat } from "./utils";

describe("splitStat", () => {
  it("keeps figures under a thousand whole", () => {
    expect(splitStat(800)).toEqual({ value: 800, suffix: "+" });
    expect(splitStat(3)).toEqual({ value: 3, suffix: "+" });
  });

  it("rounds thousands down to a K figure", () => {
    expect(splitStat(46000)).toEqual({ value: 46, suffix: "K+" });
    expect(splitStat(1999)).toEqual({ value: 1, suffix: "K+" });
  });

  it("prints the same text as formatNumber", () => {
    for (const n of [0, 3, 800, 999, 1000, 1999, 46000]) {
      const { value, suffix } = splitStat(n);
      expect(`${value}${suffix}`).toBe(formatNumber(n));
    }
  });
});
