import { describe, expect, it } from "vitest";
import { builtWithLogos, integratedWithLogos } from "./logos";
import { getAllProjects } from "./projects";

describe("logo strip", () => {
  const projects = getAllProjects();

  it("only shows technologies a case study actually lists", () => {
    const used = new Set(projects.flatMap((project) => project.techStack));
    for (const logo of builtWithLogos) {
      expect(used.has(logo.name), logo.name).toBe(true);
    }
  });

  it("only shows integrations a case study actually lists", () => {
    const used = new Set(projects.flatMap((project) => project.integrations));
    for (const logo of integratedWithLogos) {
      expect(used.has(logo.name), logo.name).toBe(true);
    }
  });

  it("has an icon with a path and a color for every logo", () => {
    for (const logo of [...builtWithLogos, ...integratedWithLogos]) {
      expect(logo.icon.path.length).toBeGreaterThan(10);
      expect(logo.icon.hex).toMatch(/^[0-9A-F]{6}$/i);
    }
  });
});
