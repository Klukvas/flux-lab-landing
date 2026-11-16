import { describe, expect, it } from "vitest";
import {
  hasFinishedLap,
  isStageInView,
  isWordValue,
  keyDirection,
  positionFor,
  stepTarget,
  swipeDirection,
  wheelDirection,
} from "./catalog-model";

describe("catalog loop positions", () => {
  it("places the neighbours of the centred project above and below it", () => {
    expect([0, 1, 2, 3, 4].map((index) => positionFor(index, 2, 5))).toEqual([
      "above",
      "previous",
      "current",
      "next",
      "below",
    ]);
  });

  it("shows the last project above the first and the first below the last", () => {
    expect(positionFor(6, 0, 7)).toBe("previous");
    expect(positionFor(0, 6, 7)).toBe("next");
  });

  it("steps round the loop in both directions", () => {
    expect(stepTarget(0, -1, 7)).toBe(6);
    expect(stepTarget(6, 1, 7)).toBe(0);
    expect(stepTarget(2, 1, 7)).toBe(3);
  });

  it("has nowhere to step with a single project", () => {
    expect(stepTarget(0, 1, 1)).toBeNull();
    expect(positionFor(0, 0, 1)).toBe("current");
  });
});

describe("catalog wheel release", () => {
  it("moves the stack only while the stage fills the screen", () => {
    expect(isStageInView(64, 868, 900)).toBe(true);
    expect(isStageInView(500, 1300, 900)).toBe(false);
    expect(isStageInView(-700, 100, 900)).toBe(false);
  });

  it("hands the wheel back to the page after one full lap", () => {
    expect(hasFinishedLap(6, 7)).toBe(false);
    expect(hasFinishedLap(7, 7)).toBe(true);
  });
});

describe("catalog input", () => {
  it("ignores wheel noise and reads direction from the sign", () => {
    expect(wheelDirection(3)).toBe(0);
    expect(wheelDirection(40)).toBe(1);
    expect(wheelDirection(-40)).toBe(-1);
  });

  it("answers horizontal swipes only, so vertical swipes still scroll the page", () => {
    expect(swipeDirection(-80, 10)).toBe(1);
    expect(swipeDirection(80, 10)).toBe(-1);
    expect(swipeDirection(-60, 90)).toBe(0);
    expect(swipeDirection(-20, 0)).toBe(0);
  });

  it("maps arrow and page keys to steps", () => {
    expect(keyDirection("ArrowDown")).toBe(1);
    expect(keyDirection("PageUp")).toBe(-1);
    expect(keyDirection("Enter")).toBe(0);
  });

  it("treats words on a sticker differently from numbers", () => {
    expect(isWordValue("White label")).toBe(true);
    expect(isWordValue("1,500+")).toBe(false);
  });
});
