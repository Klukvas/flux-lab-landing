import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { getBlogPost } from "@/lib/mdx";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);
  const byUrl = new Map(entries.map((entry) => [entry.url, entry]));

  it("lists each URL once, job postings in both languages included", () => {
    expect(urls).toContain("https://flux-lab.dev/en/careers/go-backend-developer");
    expect(urls).toContain("https://flux-lab.dev/uk/careers/go-backend-developer");
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("points every hreflang alternate at a page the sitemap itself lists", () => {
    // A translation that doesn't exist yet would otherwise be announced as a 404.
    const listed = new Set(urls);
    for (const entry of entries) {
      for (const alternate of Object.values(entry.alternates?.languages ?? {})) {
        expect(alternate !== undefined && listed.has(alternate)).toBe(true);
      }
    }
  });

  it("declares each URL among its own alternates, plus an x-default", () => {
    for (const entry of entries) {
      const languages = entry.alternates?.languages ?? {};
      const locale = new URL(entry.url).pathname.split("/")[1];

      expect(languages[locale as keyof typeof languages]).toBe(entry.url);
      expect(languages["x-default"]).toBeDefined();
    }
    expect(
      byUrl.get("https://flux-lab.dev/uk/services")?.alternates?.languages,
    ).toEqual({
      en: "https://flux-lab.dev/en/services",
      uk: "https://flux-lab.dev/uk/services",
      "x-default": "https://flux-lab.dev/en/services",
    });
  });

  it("only dates pages from their content, never from the build time", () => {
    for (const entry of entries) {
      if (entry.lastModified !== undefined) {
        expect(entry.lastModified).toMatch(ISO_DATE);
      }
    }
  });

  it("dates a blog post by its latest revision", () => {
    const post = getBlogPost("en", "go-backend-for-saas");
    const entry = byUrl.get("https://flux-lab.dev/en/blog/go-backend-for-saas");

    expect(entry?.lastModified).toBe(post?.meta.updated ?? post?.meta.date);
  });
});
