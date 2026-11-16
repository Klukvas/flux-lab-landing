import { describe, expect, it } from "vitest";
import { builtWithLogos, integratedWithLogos } from "./logos";
import { getAllProjects } from "./projects";
import packageJson from "../../package.json";

describe("logo strip", () => {
  const projects = getAllProjects();

  it("grounds product and repository entries without inventing project data", () => {
    const used = new Set(
      projects.flatMap((project) => [
        ...project.techStack,
        ...project.integrations,
      ]),
    );
    const dependencies: Record<string, string> = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };
    for (const logo of [...builtWithLogos, ...integratedWithLogos]) {
      if (logo.source === "case-study")
        expect(used.has(logo.name), logo.name).toBe(true);
      if (logo.source === "repository")
        expect(
          logo.dependency && dependencies[logo.dependency],
          logo.name,
        ).toBeTruthy();
    }
  });
  it("clearly categorizes the user-authorized enterprise ecosystem choices", () => {
    expect(
      builtWithLogos
        .filter((logo) => logo.source === "ecosystem")
        .map((logo) => logo.name),
    ).toEqual(["Kubernetes", "Terraform", "Grafana", "Nginx", "Google Cloud"]);
    expect(
      integratedWithLogos.every((logo) => logo.source === "case-study"),
    ).toBe(true);
    expect(new Set(builtWithLogos.map((logo) => logo.name)).size).toBe(
      builtWithLogos.length,
    );
    expect(new Set(integratedWithLogos.map((logo) => logo.name)).size).toBe(
      integratedWithLogos.length,
    );
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
