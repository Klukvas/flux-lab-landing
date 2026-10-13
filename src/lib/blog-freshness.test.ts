import { describe, expect, it } from "vitest";
import type { BlogPostMeta } from "@/types";
import { lastTouched, sortByLastTouched } from "./blog-freshness";

function post(slug: string, date: string, updated?: string): BlogPostMeta {
  return {
    slug,
    title: slug,
    description: "",
    date,
    updated,
    author: "",
    tags: [],
    readingTime: 1,
    locale: "en",
  };
}

describe("lastTouched", () => {
  it("prefers the revision date and falls back to publication", () => {
    expect(lastTouched(post("a", "2025-03-01", "2026-09-22"))).toBe("2026-09-22");
    expect(lastTouched(post("b", "2025-03-01"))).toBe("2025-03-01");
  });
});

describe("sortByLastTouched", () => {
  it("puts a revised old post ahead of a newer untouched one", () => {
    const sorted = sortByLastTouched([
      post("newer", "2025-03-28"),
      post("revised", "2025-02-12", "2026-09-22"),
      post("older", "2025-02-20"),
    ]);

    expect(sorted.map((p) => p.slug)).toEqual(["revised", "newer", "older"]);
  });

  it("leaves the given list alone", () => {
    const posts = [post("a", "2025-01-01"), post("b", "2025-02-01")];
    sortByLastTouched(posts);

    expect(posts.map((p) => p.slug)).toEqual(["a", "b"]);
  });
});
