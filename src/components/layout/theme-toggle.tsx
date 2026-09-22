"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

const BUTTON_CLASS =
  "rounded-md border border-gray-300 p-2 text-gray-500 dark:border-gray-700";

function subscribeToNothing() {
  return () => {};
}

/** False while server HTML hydrates, true afterwards: the theme is only known on the client. */
function useHasHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

/**
 * Runs the theme change inside a view transition where the browser supports one, so light
 * and dark cross-fade instead of flashing. next-themes applies the class in an effect;
 * flushSync commits it before the callback returns, which is when the new frame is captured.
 */
function crossFade(update: () => void) {
  if (typeof document.startViewTransition !== "function") {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) {
    return (
      <button type="button" className={BUTTON_CLASS} aria-label="Toggle theme">
        <span className="block h-5 w-5" aria-hidden="true" />
      </button>
    );
  }

  // resolvedTheme, not theme: under the default "system" setting theme stays "system"
  // even when the page is dark, which made the first click on a dark page do nothing.
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => crossFade(() => setTheme(isDark ? "light" : "dark"))}
      className={`pressable ${BUTTON_CLASS} hover:bg-gray-100 hover:text-foreground dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-foreground`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}
