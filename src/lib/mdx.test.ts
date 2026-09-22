import { describe, it, expect } from "vitest";
import { getBlogPosts, getRelatedPosts, parseFrontmatter } from "./mdx";

function frontmatter(lines: string): string {
  return `---\n${lines}\n---\nBody text\n`;
}

describe("parseFrontmatter", () => {
  it("keeps apostrophes inside values", () => {
    const { meta } = parseFrontmatter(
      frontmatter("description: Зниження споживання пам'яті та з'єднань"),
    );

    expect(meta.description).toBe("Зниження споживання пам'яті та з'єднань");
  });

  it("strips one pair of wrapping quotes", () => {
    const { meta } = parseFrontmatter(
      frontmatter(`title: "Don't ship on Fridays"`),
    );

    expect(meta.title).toBe("Don't ship on Fridays");
  });

  it("unquotes each item of an inline list", () => {
    const { meta } = parseFrontmatter(frontmatter(`tags: ["Go", 'SaaS', API]`));

    expect(meta.tags).toEqual(["Go", "SaaS", "API"]);
  });

  it("returns the body after the closing delimiter", () => {
    const { body } = parseFrontmatter(frontmatter("title: Post"));

    expect(body).toBe("Body text\n");
  });
});

describe("getRelatedPosts", () => {
  it("suggests other posts in the same language, never the post itself", () => {
    const related = getRelatedPosts("uk", "go-backend-for-saas");

    expect(related.length).toBeGreaterThan(0);
    expect(related.every((post) => post.locale === "uk")).toBe(true);
    expect(related.map((post) => post.slug)).not.toContain("go-backend-for-saas");
  });

  it("ranks posts by how many tags they share with the current one", () => {
    const current = getBlogPosts("en").find(
      (post) => post.slug === "go-backend-for-saas",
    );
    const sharedCounts = getRelatedPosts("en", "go-backend-for-saas", 10).map(
      (post) => post.tags.filter((tag) => current?.tags.includes(tag)).length,
    );

    expect(sharedCounts).toEqual([...sharedCounts].sort((a, b) => b - a));
  });

  it("returns nothing for an unknown post", () => {
    expect(getRelatedPosts("en", "no-such-post")).toEqual([]);
  });
});
