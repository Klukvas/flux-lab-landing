/**
 * Springs described the way Apple's design talks describe them: a damping ratio and a
 * response. Motion wants physical parameters (stiffness, damping, mass), so this converts.
 */
export interface SpringParameters {
  /** 1 settles without overshoot; below 1 overshoots and oscillates before settling. */
  readonly damping: number;
  /** Seconds it takes to reach the target. Not a fixed duration: settle time emerges from the physics. */
  readonly response: number;
}

export interface SpringTransition {
  readonly type: "spring";
  readonly mass: number;
  readonly stiffness: number;
  readonly damping: number;
}

export function spring({ damping, response }: SpringParameters): SpringTransition {
  if (!(response > 0)) {
    throw new RangeError(`Spring response must be above 0 seconds, got ${response}`);
  }
  if (!(damping >= 0)) {
    throw new RangeError(`Spring damping ratio must be 0 or more, got ${damping}`);
  }

  // With unit mass: stiffness = ω² and damping coefficient = 2ζω, where ω = 2π / response.
  const angularFrequency = (2 * Math.PI) / response;
  return {
    type: "spring",
    mass: 1,
    stiffness: angularFrequency ** 2,
    damping: 2 * damping * angularFrequency,
  };
}

/** Things that move on their own, like a card sliding to a new slot. Apple's "move" spring. */
export const SMOOTH_SPRING = spring({ damping: 1, response: 0.4 });

/** Small surfaces a tap opens, like menus and popovers: quicker, still without overshoot. */
export const QUICK_SPRING = spring({ damping: 1, response: 0.3 });
