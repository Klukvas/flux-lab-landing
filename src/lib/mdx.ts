import fs from "fs";
import path from "path";
import { locales, type Locale } from "@/i18n/config";
import type { BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function parseFrontmatter(content: string): {
  meta: Record<string, string | string[]>;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const meta: Record<string, string | string[]> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      meta[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => unquote(s.trim()));
    } else {
      meta[key] = unquote(value);
    }
  }
  return { meta, body: match[2] };
}

/**
 * Strips one pair of wrapping quotes. Quotes inside a value stay: Ukrainian spelling
 * needs the apostrophe ("пам'яті"), and English needs it in contractions.
 */
function unquote(value: string): string {
  const first = value[0];
  const isWrapped =
    value.length >= 2 &&
    (first === '"' || first === "'") &&
    value[value.length - 1] === first;
  return isWrapped ? value.slice(1, -1) : value;
}

function toPostMeta(
  slug: string,
  locale: string,
  meta: Record<string, string | string[]>,
  body: string,
): BlogPostMeta {
  const wordCount = body.trim().split(/\s+/).length;

  return {
    slug,
    title: (meta.title as string) || slug,
    description: (meta.description as string) || "",
    date: (meta.date as string) || "",
    updated: (meta.updated as string) || undefined,
    author: (meta.author as string) || "fluxLab.dev",
    tags: (meta.tags as string[]) || [],
    readingTime: Math.max(1, Math.ceil(wordCount / 200)),
    image: meta.image as string | undefined,
    locale,
  };
}

export function getBlogPosts(locale: string): BlogPostMeta[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "");
    const content = fs.readFileSync(path.join(dir, file), "utf-8");
    const { meta, body } = parseFrontmatter(content);
    return toPostMeta(slug, locale, meta, body);
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getBlogPost(
  locale: string,
  slug: string,
): { meta: BlogPostMeta; content: string } | null {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { meta, body } = parseFrontmatter(raw);
  return { meta: toPostMeta(slug, locale, meta, body), content: body };
}

/**
 * Other posts in the same language, most shared tags first. Ties keep
 * getBlogPosts' newest-first order because Array.prototype.sort is stable.
 */
export function getRelatedPosts(
  locale: string,
  slug: string,
  limit = 3,
): BlogPostMeta[] {
  const posts = getBlogPosts(locale);
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];

  const currentTags = new Set(current.tags);
  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      sharedTags: post.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getAllBlogTags(locale: string): string[] {
  const posts = getBlogPosts(locale);
  const tagSet = new Set(posts.flatMap((p) => p.tags));
  return [...tagSet].sort();
}

/** Locales that have this post, so hreflang never points at a missing translation. */
export function getBlogPostLocales(slug: string): Locale[] {
  return locales.filter((locale) =>
    fs.existsSync(path.join(BLOG_DIR, locale, `${slug}.mdx`)),
  );
}

export function getAllBlogSlugs(locale: string): string[] {
  return getBlogPosts(locale).map((p) => p.slug);
}
