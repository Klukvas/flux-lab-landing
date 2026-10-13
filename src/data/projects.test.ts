import { describe, expect, it } from "vitest";
import { getAllProjects, getTechStackUsage } from "./projects";

describe("getTechStackUsage", () => {
  const usage = getTechStackUsage();

  it("lists every technology once", () => {
    const names = usage.map((tech) => tech.name);
    expect(new Set(names).size).toBe(names.length);
    expect(usage.map((tech) => tech.projectCount).reduce((a, b) => a + b, 0)).toBe(
      getAllProjects().flatMap((project) => project.techStack).length,
    );
  });

  it("counts the projects that list each technology", () => {
    const react = usage.find((tech) => tech.name === "React");
    expect(react?.projectCount).toBe(
      getAllProjects().filter((project) => project.techStack.includes("React")).length,
    );
  });

  it("orders by usage, then by name", () => {
    for (let i = 1; i < usage.length; i += 1) {
      const previous = usage[i - 1];
      const current = usage[i];
      const keepsOrder =
        previous.projectCount > current.projectCount ||
        (previous.projectCount === current.projectCount &&
          previous.name.localeCompare(current.name) <= 0);
      expect(keepsOrder).toBe(true);
    }
  });
});
