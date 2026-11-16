import { useCallback } from "react";
import { useTranslations } from "next-intl";

/** Reads a project's own copy for the current locale, falling back to the English data. */
export type ProjectText = (key: string, fallback: string) => string;

export function useProjectText(slug: string): ProjectText {
  const t = useTranslations("projects");
  return useCallback(
    (key: string, fallback: string) => {
      const path = `${slug}.${key}`;
      return t.has(path) ? t(path) : fallback;
    },
    [slug, t],
  );
}
