import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { getBlogPost } from "@/lib/mdx";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("sitemap", () => {
  const entries = sitemap();
  const byUrl = new Map(entries.map((entry) => [entry.url, entry]));

  it("lists every page in both languages, job postings included", () => {
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://flux-lab.dev/en/careers/go-backend-developer");
    expect(urls).toContain("https://flux-lab.dev/uk/careers/go-backend-developer");
    expect(urls.filter((url) => url.startsWith("https://flux-lab.dev/en"))).toHaveLength(
      urls.filter((url) => url.startsWith("https://flux-lab.dev/uk")).length,
    );
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("gives every URL its language alternates plus x-default", () => {
    for (const entry of entries) {
      expect(Object.keys(entry.alternates?.languages ?? {}).sort()).toEqual([
        "en",
        "uk",
        "x-default",
      ]);
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
