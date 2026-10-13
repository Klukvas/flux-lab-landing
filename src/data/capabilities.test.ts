import { describe, expect, it } from "vitest";
import { capabilityColumns } from "./capabilities";
import { getProjectSlugs } from "./projects";

describe("capabilityColumns", () => {
  it("only cites case studies that exist", () => {
    const slugs = new Set(getProjectSlugs());
    for (const column of capabilityColumns) {
      for (const item of column.items) {
        for (const slug of item.proof) {
          expect(slugs.has(slug), `${column.id}.${item.id} cites ${slug}`).toBe(true);
        }
      }
    }
  });

  it("keeps row ids unique within a column", () => {
    for (const column of capabilityColumns) {
      const ids = column.items.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});
