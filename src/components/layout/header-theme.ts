"use client";

import { type CSSProperties, useSyncExternalStore } from "react";

/**
 * A page can dress the site header in its own colours while it is on screen; the projects
 * catalog does, so the header takes the centred product's background and ink. The theme
 * class sets --p-ink, --p-muted and --p-accent, which header-theme.module.css reads.
 */
export interface HeaderTheme {
  readonly className: string;
  /** The theme's name, for details only one theme has. */
  readonly key: string;
  readonly style: CSSProperties;
}

let currentTheme: HeaderTheme | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Pass null to give the header back its own look, as a page must when it unmounts. */
export function setHeaderTheme(theme: HeaderTheme | null): void {
  currentTheme = theme;
  listeners.forEach((listener) => listener());
}

export function useHeaderTheme(): HeaderTheme | null {
  return useSyncExternalStore(
    subscribe,
    () => currentTheme,
    () => null,
  );
}
