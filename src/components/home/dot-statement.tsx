"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  createStatementModel,
  PHRASE_CELL,
  statementFrame,
} from "./dot-statement-model";
import { studioStyles as styles } from "./studio-styles";

const model = createStatementModel();
const approach = (delta: number, seconds: number) =>
  1 - Math.exp(-delta / seconds);

function StaticStatement() {
  return (
    <svg
      viewBox={`0 0 ${model.width} ${model.height}`}
      aria-hidden="true"
      className={styles.phraseFallback}
    >
      <g opacity=".3" stroke="currentColor" strokeWidth=".7">
        {model.strokes.map(({ from, to }) => (
          <path
            key={`${from}-${to}`}
            d={`M${model.dots[from].x} ${model.dots[from].y}L${model.dots[to].x} ${model.dots[to].y}`}
          />
        ))}
      </g>
      {model.dots.map((dot, index) =>
        model.mask.cells[index] ? (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r="2.6"
            fill="currentColor"
          />
        ) : null,
      )}
    </svg>
  );
}

/** Original typing, linked strokes, breathing and mouse lean on a responsive fine grid. */
export function DotStatement() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || reducedMotion) return;
    let scale = 1;
    let color = "#7b6ef6";
    let frameId = 0;
    const born = performance.now();
    let previous = born;
    let target = { x: 0, y: 0, strength: 0 };
    let pointer = { x: 0, y: 0, strength: 0 };

    function resize() {
      if (!canvas || !context) return;
      const bounds = canvas.getBoundingClientRect();
      scale = bounds.width / model.width;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      context.setTransform(ratio * scale, 0, 0, ratio * scale, 0, 0);
    }
    function theme() {
      color =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--brand")
          .trim() || "#7b6ef6";
    }
    function move(event: PointerEvent) {
      if (!canvas || event.pointerType !== "mouse") return;
      const bounds = canvas.getBoundingClientRect();
      target = {
        x: (event.clientX - bounds.left) / scale,
        y: (event.clientY - bounds.top) / scale,
        strength: 1,
      };
      if (pointer.strength < 0.01) pointer = { ...target, strength: 0 };
    }
    function leave() {
      target = { ...target, strength: 0 };
    }
    function draw(now: number) {
      if (!context) return;
      const delta = Math.min((now - previous) / 1000, 0.1);
      previous = now;
      const follow = approach(delta, 0.12);
      pointer = {
        x: pointer.x + (target.x - pointer.x) * follow,
        y: pointer.y + (target.y - pointer.y) * follow,
        strength:
          pointer.strength +
          (target.strength - pointer.strength) *
            approach(delta, target.strength ? 0.12 : 0.35),
      };
      const frames = statementFrame(model, (now - born) / 1000, pointer);
      context.clearRect(0, 0, model.width, model.height);
      context.fillStyle = color;
      for (const dot of frames) {
        context.globalAlpha = dot.alpha;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
        context.fill();
      }
      context.save();
      context.shadowColor = color;
      context.shadowBlur = 6;
      context.strokeStyle = color;
      context.lineWidth = 0.7;
      context.lineCap = "round";
      context.globalAlpha = 0.3;
      context.beginPath();
      for (const { from, to } of model.strokes) {
        const start = frames[from],
          end = frames[to];
        if (start.lit < 1 || end.lit < 1) continue;
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
      }
      context.stroke();
      context.restore();
      frameId = requestAnimationFrame(draw);
    }
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const themeObserver = new MutationObserver(theme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    resize();
    theme();
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    frameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [reducedMotion]);

  return (
    <div
      className={styles.statement}
      role="img"
      aria-label="We can make it happen"
      data-dot-statement="interactive"
    >
      <canvas
        ref={canvasRef}
        className={styles.phraseCanvas}
        aria-hidden="true"
        style={{ aspectRatio: `${model.width} / ${model.height}` }}
      />
      <StaticStatement />
      <noscript>
        <svg viewBox={`0 0 ${model.width} ${model.height}`} aria-hidden="true">
          {model.dots.map((dot, index) =>
            model.mask.cells[index] ? (
              <circle
                key={index}
                cx={dot.x}
                cy={dot.y}
                r={PHRASE_CELL * 0.26}
                fill="currentColor"
              />
            ) : null,
          )}
        </svg>
      </noscript>
      <span className={styles.cross} aria-hidden="true">
        +
      </span>
    </div>
  );
}
