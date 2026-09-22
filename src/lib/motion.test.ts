import { describe, expect, it } from "vitest";
import { spring } from "./motion";

describe("spring", () => {
  it("converts Apple's damping ratio and response into Motion's physical parameters", () => {
    const transition = spring({ damping: 1, response: 0.4 });

    expect(transition.type).toBe("spring");
    expect(transition.mass).toBe(1);
    expect(transition.stiffness).toBeCloseTo(246.74, 1);
    expect(transition.damping).toBeCloseTo(31.42, 1);
  });

  it("is critically damped at a damping ratio of 1", () => {
    const { mass, stiffness, damping } = spring({ damping: 1, response: 0.5 });

    expect(damping).toBeCloseTo(2 * Math.sqrt(stiffness * mass));
  });

  it("keeps stiffness and lowers damping for a bouncier ratio", () => {
    const critical = spring({ damping: 1, response: 0.3 });
    const bouncy = spring({ damping: 0.8, response: 0.3 });

    expect(bouncy.stiffness).toBeCloseTo(critical.stiffness);
    expect(bouncy.damping).toBeCloseTo(critical.damping * 0.8);
  });

  it("gets stiffer as the response gets quicker", () => {
    expect(spring({ damping: 1, response: 0.2 }).stiffness).toBeGreaterThan(
      spring({ damping: 1, response: 0.4 }).stiffness,
    );
  });

  it("rejects parameters that describe no spring", () => {
    expect(() => spring({ damping: 1, response: 0 })).toThrow(RangeError);
    expect(() => spring({ damping: 1, response: -0.4 })).toThrow(RangeError);
    expect(() => spring({ damping: -0.1, response: 0.4 })).toThrow(RangeError);
    expect(() => spring({ damping: Number.NaN, response: 0.4 })).toThrow(RangeError);
  });
});
