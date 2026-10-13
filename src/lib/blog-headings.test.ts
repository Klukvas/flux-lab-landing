import { describe, expect, it } from "vitest";
import { extractHeadings } from "./blog-headings";

describe("extractHeadings", () => {
  it("lists h2 and h3 with GitHub-style ids and keeps the order", () => {
    const items = extractHeadings(["# Title", "", "## Why Go", "text", "### The `net/http` server", "#### Too deep", "## Why Go"].join("\n"));

    expect(items).toEqual([
      { id: "why-go", title: "Why Go", level: 2 },
      { id: "the-nethttp-server", title: "The net/http server", level: 3 },
      { id: "why-go-1", title: "Why Go", level: 2 },
    ]);
  });

  it("ignores headings inside fenced code and strips inline markup", () => {
    const items = extractHeadings(["## **Bold** and [a link](https://x.y)", "```sh", "## not a heading", "```", "## Closing ##"].join("\n"));

    expect(items.map((item) => item.id)).toEqual(["bold-and-a-link", "closing"]);
    expect(items[0].title).toBe("Bold and a link");
  });

  it("returns nothing for a post without sections", () => {
    expect(extractHeadings("Just a paragraph.\n\nAnother one.")).toEqual([]);
  });
});
