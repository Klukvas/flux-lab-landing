"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";

// Tailwind's lg breakpoint, where the inline navigation takes over from the menu.
const DESKTOP_MEDIA_QUERY = "(min-width: 64rem)";

interface MenuSheetOptions {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  /** The button that toggles the menu; the <header> around it hosts the sheet. */
  readonly toggleRef: RefObject<HTMLElement | null>;
}

/**
 * While the menu is open it behaves as a modal sheet: the page behind stops scrolling
 * and is out of reach for keyboard and screen reader users, Escape closes it and hands
 * focus back to the toggle, and widening past the mobile layout closes it.
 */
export function useMenuSheet({ isOpen, onClose, toggleRef }: MenuSheetOptions): void {
  const close = useEffectEvent(onClose);

  useEffect(() => {
    const header = toggleRef.current?.closest("header");
    if (!isOpen || !header) {
      return;
    }

    const restoreScroll = lockPageScroll();
    const restoreSiblings = makeSiblingsInert(header);
    const desktop = window.matchMedia(DESKTOP_MEDIA_QUERY);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    }

    function handleBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) {
        close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleBreakpointChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleBreakpointChange);
      restoreSiblings();
      restoreScroll();
    };
  }, [isOpen, toggleRef]);
}

/** Stops the page scrolling without the layout jumping into the scrollbar's space. */
function lockPageScroll(): () => void {
  const { body, documentElement } = document;
  const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
  const previous = {
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
  };

  body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => {
    body.style.overflow = previous.overflow;
    body.style.paddingRight = previous.paddingRight;
  };
}

/** Takes everything beside `element` out of reach: no focus, no clicks, not announced. */
function makeSiblingsInert(element: HTMLElement): () => void {
  const siblings = Array.from(element.parentElement?.children ?? []).filter(
    (sibling): sibling is HTMLElement =>
      sibling !== element && sibling instanceof HTMLElement && !sibling.inert,
  );

  siblings.forEach((sibling) => {
    sibling.inert = true;
  });

  return () => {
    siblings.forEach((sibling) => {
      sibling.inert = false;
    });
  };
}
