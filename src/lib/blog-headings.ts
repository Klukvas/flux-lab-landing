import GithubSlugger from "github-slugger";
import type { TableOfContentsItem } from "@/types";

/** The heading levels a table of contents lists; h1 is the post title, h4+ is too fine. */
const LISTED_LEVELS = new Set([2, 3]);

/** The plain text a heading renders to, which is what rehype-slug builds the id from. */
function headingText(markdown: string): string {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/\s+#+\s*$/, "")
    .trim();
}

/**
 * The h2 and h3 headings of a Markdown post with the ids rehype-slug will give them, so a
 * table of contents built here lands on the rendered headings. Fenced code is skipped, as
 * a `## comment` inside it is not a heading.
 */
export function extractHeadings(markdown: string): readonly TableOfContentsItem[] {
  const slugger = new GithubSlugger();
  const items: TableOfContentsItem[] = [];
  let isInFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      isInFence = !isInFence;
      continue;
    }
    if (isInFence) continue;
    const match = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!match) continue;
    const level = match[1].length;
    const title = headingText(match[2]);
    // Every heading takes a slug, listed or not, so the numbering of duplicates matches rehype-slug.
    const id = slugger.slug(title);
    if (LISTED_LEVELS.has(level) && title) items.push({ id, title, level });
  }

  return items;
}
