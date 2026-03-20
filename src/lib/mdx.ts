import fs from "fs";
import path from "path";
import type { BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parseFrontmatter(content: string): {
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
    let value = line.slice(colonIdx + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      meta[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/['"]/g, ""));
    } else {
      meta[key] = value.replace(/['"]/g, "");
    }
  }
  return { meta, body: match[2] };
}

export function getBlogPosts(locale: string): BlogPostMeta[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "");
    const content = fs.readFileSync(path.join(dir, file), "utf-8");
    const { meta, body } = parseFrontmatter(content);
    const wordCount = body.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      slug,
      title: (meta.title as string) || slug,
      description: (meta.description as string) || "",
      date: (meta.date as string) || "",
      author: (meta.author as string) || "fluxLab.dev",
      tags: (meta.tags as string[]) || [],
      readingTime,
      image: meta.image as string | undefined,
      locale,
    };
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
  const wordCount = body.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    meta: {
      slug,
      title: (meta.title as string) || slug,
      description: (meta.description as string) || "",
      date: (meta.date as string) || "",
      author: (meta.author as string) || "fluxLab.dev",
      tags: (meta.tags as string[]) || [],
      readingTime,
      image: meta.image as string | undefined,
      locale,
    },
    content: body,
  };
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const allPosts: BlogPostMeta[] = [];
  const seen = new Set<string>();

  const dirs = fs.existsSync(BLOG_DIR)
    ? fs
        .readdirSync(BLOG_DIR)
        .filter((d) => fs.statSync(path.join(BLOG_DIR, d)).isDirectory())
    : [];

  for (const locale of dirs) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      const key = `${post.slug}:${post.locale}`;
      if (!seen.has(key)) {
        seen.add(key);
        allPosts.push(post);
      }
    }
  }

  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getAllBlogTags(locale: string): string[] {
  const posts = getBlogPosts(locale);
  const tagSet = new Set(posts.flatMap((p) => p.tags));
  return [...tagSet].sort();
}

export function getAllBlogSlugs(locale: string): string[] {
  return getBlogPosts(locale).map((p) => p.slug);
}
