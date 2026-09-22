"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Applies the visitor's reduced-motion setting to every Motion animation: movement and
 * layout animations are dropped, fades stay. The CSS reduced-motion rule in globals.css
 * only reaches CSS animations, not Motion's JavaScript-driven ones.
 */
export function MotionProvider({ children }: { readonly children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
