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

  it("has a drawable mark and a color for every logo", () => {
    for (const logo of [...builtWithLogos, ...integratedWithLogos]) {
      if (logo.mark.kind === "icon") {
        expect(logo.mark.path.length).toBeGreaterThan(10);
        expect(logo.mark.viewBox).toMatch(/^0 0 \d+ \d+$/);
      } else {
        expect(logo.mark.letter).toHaveLength(1);
      }
      expect(logo.hex).toMatch(/^[0-9A-F]{6}$/i);
    }
  });
});
