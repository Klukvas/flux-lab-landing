import { type KeyboardEvent, type RefObject, useCallback, useEffect } from "react";
import {
  GESTURE_GAP_MS,
  STEP_LOCK_MS,
  hasFinishedLap,
  isStageInView,
  keyDirection,
  swipeDirection,
  wheelDirection,
} from "./catalog-model";

interface CatalogNavigation {
  readonly stageRef: RefObject<HTMLElement | null>;
  readonly count: number;
  readonly go: (step: number) => void;
}

/**
 * Turns wheel events into steps round the loop: one gesture moves one project, and after a
 * full lap in one direction the wheel goes back to scrolling the page, so the loop never
 * traps the reader.
 */
function createWheelHandler(stage: HTMLElement, count: number, go: (step: number) => void) {
  let lockedUntil = 0;
  let lapDirection = 0;
  let stepsInARow = 0;
  let isReleased = false;

  const reset = () => {
    lapDirection = 0;
    stepsInARow = 0;
    isReleased = false;
  };

  return (event: WheelEvent) => {
    const direction = wheelDirection(event.deltaY);
    if (direction === 0 || count < 2) return;
    const rect = stage.getBoundingClientRect();
    if (!isStageInView(rect.top, rect.bottom, window.innerHeight)) {
      reset();
      return;
    }
    if (direction !== lapDirection) {
      reset();
      lapDirection = direction;
    }
    const now = performance.now();
    if (now < lockedUntil) {
      // The rest of the gesture that already moved the stack: swallow it.
      event.preventDefault();
      lockedUntil = Math.max(lockedUntil, now + GESTURE_GAP_MS);
      return;
    }
    if (isReleased || hasFinishedLap(stepsInARow, count)) {
      isReleased = true;
      return;
    }
    event.preventDefault();
    lockedUntil = now + STEP_LOCK_MS;
    stepsInARow += 1;
    go(direction);
  };
}

/** Wheel, horizontal swipe and arrow keys move the stack one project at a time, round the loop. */
export function useCatalogNavigation({ stageRef, count, go }: CatalogNavigation) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = createWheelHandler(stage, count, go);
    let touchStart: { x: number; y: number } | null = null;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touchStart || !touch) return;
      const direction = swipeDirection(
        touch.clientX - touchStart.x,
        touch.clientY - touchStart.y,
      );
      touchStart = null;
      if (direction !== 0) go(direction);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchend", onTouchEnd);
    };
  }, [stageRef, count, go]);

  return useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const direction = keyDirection(event.key);
      if (direction === 0) return;
      event.preventDefault();
      go(direction);
    },
    [go],
  );
}
