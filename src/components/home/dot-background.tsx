"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { createColorRamp, parseHexColor, type Rgb } from "@/lib/canvas-colors";
import { DOT_SPACING_PX, createDotGrid, dotAt, type Dot } from "@/lib/dot-field";
import { layoutDotText } from "@/lib/dot-font";
import {
  createFigureMask,
  createMatrixMask,
  figureCellIndex,
  figureLinks,
  figureProgress,
  paintLayersMark,
  type FigureLink,
  type FigureMask,
} from "@/lib/dot-figure";

const MAX_PIXEL_RATIO = 2;
const RAMP_STEPS = 32;
/** How long the lean takes to catch up with the mouse, and how long it takes to let go. */
const FOLLOW_SECONDS = 0.12;
const RELEASE_SECONDS = 0.35;
/** Guards against a huge first step after the tab was hidden. */
const MAX_FRAME_SECONDS = 0.1;
/** The figure starts assembling a beat after the field appears, so it reads as drawn, not loaded. */
const FIGURE_BIRTH_DELAY_MS = 400;
/** The letters' strokes and the glow around them, in canvas pixels at 1x. */
const STROKE_WIDTH_PX = 1.25;
const STROKE_ALPHA = 0.3;
const GLOW_BLUR_PX = 10;
/** The element whose box the figure fills; the hero places it. */
const FIGURE_ANCHOR_SELECTOR = "[data-dot-figure]";

const FALLBACK_REST: Rgb = [152, 150, 168];
const FALLBACK_ACCENT: Rgb = [91, 79, 210];

function readThemeRamp(): readonly string[] {
  const styles = getComputedStyle(document.documentElement);
  const rest = parseHexColor(styles.getPropertyValue("--gray-300"), FALLBACK_REST);
  const accent = parseHexColor(styles.getPropertyValue("--brand"), FALLBACK_ACCENT);
  return createColorRamp(rest, accent, RAMP_STEPS);
}

/** Exponential approach: the fraction of the remaining distance covered in `dt` seconds. */
function approach(dt: number, seconds: number): number {
  return 1 - Math.exp(-dt / seconds);
}

interface Scene {
  dots: readonly Dot[];
  ramp: readonly string[];
  /** The mouse in viewport pixels; isOver turns false once it leaves the window. */
  mouse: { x: number; y: number; isOver: boolean };
  /** The pointer the dots respond to: trails the mouse and fades out after it leaves. */
  pointer: { x: number; y: number; strength: number };
  /** The cells that light up as the logo mark, when the page has a place for it. */
  figure: FigureMask | null;
  /** The strokes joining a text figure's dots; empty for the logo mark. */
  links: readonly FigureLink[];
  /** Text figures quiet the field around their letters; the logo mark does not need it. */
  figureIsText: boolean;
  /** When the figure began assembling, in performance.now() time. */
  figureBornAt: number | null;
}

function drawScene(
  context: CanvasRenderingContext2D,
  scene: Scene,
  timeSeconds: number,
  scrollY: number,
  width: number,
  height: number,
) {
  context.clearRect(0, 0, width, height);
  const firstPageRow = Math.floor(scrollY / DOT_SPACING_PX);
  const { figure } = scene;
  const figureAge =
    figure && scene.figureBornAt !== null
      ? (performance.now() - scene.figureBornAt) / 1000
      : 0;
  // Where each lit figure cell is drawn this frame, so the strokes follow the dots' lean.
  const placed = new Map<number, { x: number; y: number; lit: number }>();
  let currentFill = "";
  for (const dot of scene.dots) {
    const cell = figure ? figureCellIndex(figure, dot.column, dot.row + firstPageRow) : -1;
    const lit = cell >= 0 && figure ? figureProgress(figure, cell, figureAge) : 0;
    const frame = dotAt(dot, timeSeconds, scene.pointer, scrollY, lit);
    if (cell >= 0 && lit > 0) placed.set(cell, { x: frame.x, y: frame.y, lit });
    const fill = scene.ramp[Math.round(frame.accent * (RAMP_STEPS - 1))];
    if (fill !== currentFill) {
      context.fillStyle = fill;
      currentFill = fill;
    }
    context.globalAlpha = frame.alpha;
    context.beginPath();
    context.arc(frame.x, frame.y, frame.radius, 0, 2 * Math.PI);
    context.fill();
  }
  drawStrokes(context, scene, placed);
}

/**
 * Joins the lit dots into letter strokes with a soft glow. A stroke appears once both its
 * dots have lit, so the lines draw in behind the typing. One path and one shadow per frame
 * keeps the glow cheap however many strokes there are.
 */
function drawStrokes(
  context: CanvasRenderingContext2D,
  scene: Scene,
  placed: ReadonlyMap<number, { x: number; y: number; lit: number }>,
) {
  if (scene.links.length === 0 || placed.size === 0) return;
  const accent = scene.ramp[RAMP_STEPS - 1];
  context.save();
  context.strokeStyle = accent;
  context.lineWidth = STROKE_WIDTH_PX;
  context.lineCap = "round";
  context.shadowColor = accent;
  context.shadowBlur = GLOW_BLUR_PX;
  context.globalAlpha = STROKE_ALPHA;
  context.beginPath();
  for (const { from, to } of scene.links) {
    const start = placed.get(from);
    const end = placed.get(to);
    if (!start || !end || start.lit < 1 || end.lit < 1) continue;
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
  }
  context.stroke();
  context.restore();
}

/**
 * The dotted field behind the home page: a canvas the size of the window, drawn so the
 * dots stay anchored to the page as it scrolls, breathe on their own and lean toward the
 * mouse. A CSS copy of the resting grid shows until the first frame, for the first paint
 * and for visitors without JavaScript; under reduced motion it simply stays.
 */
export function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || prefersReducedMotion) return;

    const scene: Scene = {
      dots: [],
      ramp: readThemeRamp(),
      mouse: { x: 0, y: 0, isOver: false },
      pointer: { x: 0, y: 0, strength: 0 },
      figure: null,
      links: [],
      figureIsText: false,
      figureBornAt: null,
    };
    const scratch = document.createElement("canvas");
    let hasDrawnOnce = false;
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastFrameTime = performance.now();
    const startTime = lastFrameTime;

    function step(dt: number) {
      const { mouse, pointer } = scene;
      if (mouse.isOver && pointer.strength < 0.01) {
        // Coming in from outside: start under the mouse instead of sweeping in from wherever it last was.
        pointer.x = mouse.x;
        pointer.y = mouse.y;
      }
      const follow = approach(dt, FOLLOW_SECONDS);
      pointer.x += (mouse.x - pointer.x) * follow;
      pointer.y += (mouse.y - pointer.y) * follow;
      const targetStrength = mouse.isOver ? 1 : 0;
      pointer.strength +=
        (targetStrength - pointer.strength) *
        approach(dt, mouse.isOver ? FOLLOW_SECONDS : RELEASE_SECONDS);
    }

    function frame(now: number) {
      const dt = Math.min((now - lastFrameTime) / 1000, MAX_FRAME_SECONDS);
      lastFrameTime = now;
      step(dt);
      drawScene(context!, scene, (now - startTime) / 1000, window.scrollY, width, height);
      if (!hasDrawnOnce) {
        hasDrawnOnce = true;
        setHasDrawn(true);
      }
      frameId = requestAnimationFrame(frame);
    }

    function measureFigure() {
      // The hero may hold one box per layout; only the displayed one has a size.
      const anchor = [...document.querySelectorAll<HTMLElement>(FIGURE_ANCHOR_SELECTOR)].find(
        (element) => element.getBoundingClientRect().width > 0,
      );
      const bounds = anchor?.getBoundingClientRect();
      if (!bounds || bounds.width === 0) {
        scene.figure = null;
        return;
      }
      const rect = {
        left: bounds.left,
        top: bounds.top + window.scrollY,
        width: bounds.width,
        height: bounds.height,
      };
      // A "text" anchor spells its lines in dot-matrix letters; anything else draws the logo mark.
      const lines = anchor!.dataset.dotLines;
      scene.figureIsText = anchor!.dataset.dotFigure === "text" && Boolean(lines);
      scene.figure =
        anchor!.dataset.dotFigure === "text" && lines
          ? createMatrixMask(rect, layoutDotText(lines.split("|"), Number(anchor!.dataset.dotLineGap ?? 2)))
          : createFigureMask(rect, paintLayersMark, scratch);
      scene.links = scene.figureIsText && scene.figure ? figureLinks(scene.figure) : [];
      if (scene.figure && scene.figureBornAt === null) {
        scene.figureBornAt = performance.now() + FIGURE_BIRTH_DELAY_MS;
      }
    }

    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      width = bounds.width;
      height = bounds.height;
      canvas!.width = Math.round(width * pixelRatio);
      canvas!.height = Math.round(height * pixelRatio);
      context!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      scene.dots = createDotGrid(width, height);
      measureFigure();
    }

    function onPointerMove(event: PointerEvent) {
      // Touch and pen put the pointer on the content itself; the lean would only flash under it.
      if (event.pointerType !== "mouse") return;
      scene.mouse = { x: event.clientX, y: event.clientY, isOver: true };
    }

    function onMouseLeaveWindow() {
      scene.mouse = { ...scene.mouse, isOver: false };
    }

    function onThemeChange() {
      scene.ramp = readThemeRamp();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    // The figure's place moves whenever the page reflows above it, e.g. when fonts land.
    resizeObserver.observe(document.body);
    document.querySelectorAll(FIGURE_ANCHOR_SELECTOR).forEach((anchor) => resizeObserver.observe(anchor));
    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeaveWindow);
    // The browser already pauses animation frames while the tab is hidden.
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveWindow);
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "grid-bg dot-layer pointer-events-none fixed inset-0 -z-10 transition-opacity duration-300",
          hasDrawn ? "opacity-0" : "opacity-40",
        )}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "dot-layer pointer-events-none fixed inset-0 -z-10 h-full w-full transition-opacity duration-300",
          hasDrawn ? "opacity-100" : "opacity-0",
        )}
      />
    </>
  );
}
