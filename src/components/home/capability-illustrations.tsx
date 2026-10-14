"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import type { CapabilityColumnId } from "@/data/capabilities";

/** Strokes draw themselves in, one after another; fills follow a beat later. */
const STROKE_SECONDS = 0.7;
const STEP_SECONDS = 0.12;

const strokeVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (order: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: STROKE_SECONDS, delay: order * STEP_SECONDS, ease: "easeOut" },
  }),
};

const fillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (order: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.3 + order * STEP_SECONDS, ease: "easeOut" },
  }),
};

const labelVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: (order: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.5 + order * STEP_SECONDS },
  }),
};

interface SceneProps {
  readonly id: CapabilityColumnId;
  /** Caption drawn under the scene, in the page's language. */
  readonly caption: string;
}

const STROKE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function ProductScene() {
  return (
    <>
      <motion.rect variants={strokeVariants} custom={0} x="24" y="32" width="200" height="140" rx="10" {...STROKE_PROPS} />
      <motion.rect variants={fillVariants} custom={1} x="40" y="50" width="80" height="12" rx="4" fill="currentColor" opacity={0.55} />
      <motion.rect variants={fillVariants} custom={2} x="40" y="72" width="168" height="7" rx="3" fill="currentColor" opacity={0.3} />
      <motion.rect variants={fillVariants} custom={3} x="40" y="86" width="140" height="7" rx="3" fill="currentColor" opacity={0.3} />
      <motion.rect variants={fillVariants} custom={4} x="40" y="122" width="70" height="28" rx="7" fill="currentColor" />
      <motion.path variants={strokeVariants} custom={5} d="M226 112c40 0 36 48 20 72" strokeDasharray="4 6" {...STROKE_PROPS} opacity={0.7} />
      <motion.rect variants={strokeVariants} custom={6} x="252" y="120" width="120" height="196" rx="14" {...STROKE_PROPS} />
      <motion.rect variants={fillVariants} custom={7} x="268" y="140" width="88" height="10" rx="4" fill="currentColor" opacity={0.45} />
      <motion.rect variants={fillVariants} custom={8} x="268" y="158" width="60" height="10" rx="4" fill="currentColor" opacity={0.45} />
      <motion.rect variants={strokeVariants} custom={9} x="268" y="196" width="88" height="60" rx="8" {...STROKE_PROPS} opacity={0.6} />
      <motion.circle variants={strokeVariants} custom={10} cx="312" cy="290" r="12" {...STROKE_PROPS} />
    </>
  );
}

function EngineeringScene() {
  const box = { rx: 10, ...STROKE_PROPS };
  const text = { fill: "currentColor", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, textAnchor: "middle" } as const;
  return (
    <>
      <motion.rect variants={strokeVariants} custom={0} x="40" y="30" width="130" height="54" {...box} />
      <motion.text variants={labelVariants} custom={0} x="105" y="62" {...text}>Next.js · React</motion.text>
      <motion.rect variants={strokeVariants} custom={1} x="230" y="30" width="130" height="54" {...box} />
      <motion.text variants={labelVariants} custom={1} x="295" y="62" {...text}>React Native</motion.text>
      <motion.path variants={strokeVariants} custom={2} d="M105 84v40M295 84v40" {...STROKE_PROPS} opacity={0.6} />
      <motion.rect variants={strokeVariants} custom={3} x="110" y="124" width="180" height="60" {...box} />
      <motion.text variants={labelVariants} custom={3} x="200" y="150" {...text}>REST API</motion.text>
      <motion.text variants={labelVariants} custom={3} x="200" y="168" {...text} opacity={0.6}>Go · NestJS · Node.js</motion.text>
      <motion.path variants={strokeVariants} custom={4} d="M160 184v40M240 184v40" {...STROKE_PROPS} opacity={0.6} />
      <motion.rect variants={strokeVariants} custom={5} x="60" y="224" width="140" height="54" {...box} />
      <motion.text variants={labelVariants} custom={5} x="130" y="256" {...text}>PostgreSQL</motion.text>
      <motion.rect variants={strokeVariants} custom={6} x="210" y="224" width="130" height="54" {...box} />
      <motion.text variants={labelVariants} custom={6} x="275" y="256" {...text}>Redis · jobs</motion.text>
      <motion.path variants={strokeVariants} custom={7} d="M40 318h320" {...STROKE_PROPS} strokeDasharray="2 8" opacity={0.5} />
      <motion.text variants={labelVariants} custom={8} x="200" y="340" {...text} opacity={0.6}>multi-tenant · roles · real-time</motion.text>
    </>
  );
}

function PlatformScene() {
  const text = { fill: "currentColor", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, textAnchor: "middle" } as const;
  // The cloud is only ~120 units wide, so its label takes two short lines centred on it.
  return (
    <>
      <motion.path variants={strokeVariants} custom={0} d="M110 96a26 26 0 01-4-51.7A40 40 0 01183 42a23 23 0 01-3 54H110z" {...STROKE_PROPS} />
      <motion.text variants={labelVariants} custom={1} x="145" y="66" {...text}>CI/CD</motion.text>
      <motion.text variants={labelVariants} custom={1} x="145" y="82" {...text} opacity={0.6}>deploy ok</motion.text>
      <motion.path variants={strokeVariants} custom={2} d="M145 96v36" {...STROKE_PROPS} opacity={0.6} />
      {[0, 1, 2].map((row) => (
        <motion.g key={row}>
          <motion.rect variants={strokeVariants} custom={3 + row} x="60" y={132 + row * 44} width="170" height="34" rx="8" {...STROKE_PROPS} />
          <motion.circle variants={fillVariants} custom={4 + row} cx="78" cy={149 + row * 44} r="4" fill="currentColor" />
          <motion.rect variants={fillVariants} custom={4 + row} x="92" y={145 + row * 44} width="90" height="8" rx="3" fill="currentColor" opacity={0.3} />
        </motion.g>
      ))}
      <motion.path variants={strokeVariants} custom={6} d="M300 128l40 16v30c0 24-16 42-40 50-24-8-40-26-40-50v-30z" {...STROKE_PROPS} />
      <motion.path variants={strokeVariants} custom={7} d="M286 176l10 10 18-20" {...STROKE_PROPS} />
      <motion.path variants={strokeVariants} custom={8} d="M40 300h40l12-20 14 40 14-50 12 30h20l10-16 12 16h186" {...STROKE_PROPS} />
      <motion.text variants={labelVariants} custom={9} x="200" y="338" {...text} opacity={0.6}>uptime · alerts · on-call</motion.text>
    </>
  );
}

const SCENES: Record<CapabilityColumnId, () => ReactNode> = {
  product: ProductScene,
  engineering: EngineeringScene,
  platform: PlatformScene,
};

/** The line drawing for one capability area, drawn stroke by stroke when it appears. */
export function CapabilityIllustration({ id, caption }: SceneProps) {
  const Scene = SCENES[id];
  return (
    <motion.svg
      key={id}
      viewBox="0 0 400 360"
      className="h-auto w-full max-w-[420px] text-brand"
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      <Scene />
      <motion.text
        variants={labelVariants}
        custom={12}
        x="200"
        y="356"
        textAnchor="middle"
        fill="currentColor"
        opacity={0.5}
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize={11}
      >
        {caption}
      </motion.text>
    </motion.svg>
  );
}
