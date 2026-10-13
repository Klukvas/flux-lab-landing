import { describe, expect, it } from "vitest";
import { createColorRamp, parseHexColor } from "./canvas-colors";

const FALLBACK = [1, 2, 3] as const;

describe("parseHexColor", () => {
  it("reads six-digit hex with or without the hash and surrounding space", () => {
    expect(parseHexColor("#5B4FD2", FALLBACK)).toEqual([91, 79, 210]);
    expect(parseHexColor(" 9896a8 ", FALLBACK)).toEqual([152, 150, 168]);
  });

  it("expands three-digit hex", () => {
    expect(parseHexColor("#fff", FALLBACK)).toEqual([255, 255, 255]);
  });

  it("falls back on anything it cannot read", () => {
    expect(parseHexColor("", FALLBACK)).toBe(FALLBACK);
    expect(parseHexColor("rgb(1 2 3)", FALLBACK)).toBe(FALLBACK);
  });
});

describe("createColorRamp", () => {
  it("starts at one color, ends at the other and mixes in between", () => {
    const ramp = createColorRamp([0, 0, 0], [200, 100, 50], 3);

    expect(ramp).toEqual(["rgb(0 0 0)", "rgb(100 50 25)", "rgb(200 100 50)"]);
  });
});
