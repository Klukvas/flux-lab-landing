import { describe, it, expect } from "vitest";
import { parseFrontmatter } from "./mdx";

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
