import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function formatDate(date: string, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface StatParts {
  readonly value: number;
  readonly suffix: string;
}

/** The figure formatNumber prints and the suffix it attaches, apart so the figure can count up on its own. */
export function splitStat(n: number): StatParts {
  if (n >= 1000) return { value: Math.floor(n / 1000), suffix: "K+" };
  return { value: n, suffix: "+" };
}

export function formatNumber(n: number): string {
  const { value, suffix } = splitStat(n);
  return `${value}${suffix}`;
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
