import { describe, expect, it } from "vitest";
import { getAllProjects, getFeaturedProjects, getLiveProjects } from "./projects";

describe("getLiveProjects", () => {
  it("leaves archived products out and keeps every other one", () => {
    const live = getLiveProjects();

    expect(live.every((project) => project.status !== "archived")).toBe(true);
    expect(live.length).toBe(getAllProjects().filter((p) => p.status !== "archived").length);
    expect(live.length).toBeLessThan(getAllProjects().length);
  });

  it("never features an archived product", () => {
    expect(getFeaturedProjects().every((project) => project.status !== "archived")).toBe(true);
  });
});
