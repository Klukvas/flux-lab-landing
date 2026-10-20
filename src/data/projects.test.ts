import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import uk from "@/i18n/messages/uk.json";
import {
  getAllProjects,
  getFeaturedProjects,
  getLiveProjects,
  getProjectsByTag,
} from "./projects";

const ukProjects: Record<string, unknown> = uk.projects;

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

describe("project order", () => {
  const statusRank = ["active", "beta", "coming-soon", "archived"];

  it("lists live products before beta, upcoming and archived ones", () => {
    const ranks = getAllProjects().map((p) => statusRank.indexOf(p.status));

    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
  });

  it("puts the most-used product first within a status", () => {
    const active = getAllProjects().filter((p) => p.status === "active");
    const users = active.map((p) => p.stats?.users ?? 0);

    expect(users).toEqual([...users].sort((a, b) => b - a));
  });

  it("keeps the same order when filtered by tag", () => {
    const [tag] = getAllProjects()[0].tags;
    const tagged = getProjectsByTag(tag).map((p) => p.slug);
    const expected = getAllProjects()
      .filter((p) => p.tags.includes(tag))
      .map((p) => p.slug);

    expect(tagged).toEqual(expected);
  });
});

describe("design concepts", () => {
  const withDesigns = getAllProjects().filter((p) => p.designs);

  it("gives every design a name, a description and an image that ships in public/", () => {
    expect(withDesigns.length).toBeGreaterThan(0);
    for (const project of withDesigns) {
      for (const design of project.designs?.items ?? []) {
        const file = path.join(process.cwd(), "public", design.src);
        expect(existsSync(file), design.src).toBe(true);
        expect(design.name, design.src).toBeTruthy();
        expect(design.description, design.src).toBeTruthy();
      }
    }
  });

  it("has Ukrainian copy for the intro and for each design, in step with the data", () => {
    for (const project of withDesigns) {
      const items = project.designs?.items ?? [];
      const copy = ukProjects[project.slug] as { designsIntro?: string } | undefined;
      const designs = (ukProjects[`${project.slug}Designs`] ?? {}) as Record<
        string,
        { description?: string }
      >;

      expect(copy?.designsIntro, `${project.slug}.designsIntro`).toBeTruthy();
      expect(Object.keys(designs)).toHaveLength(items.length);
      items.forEach((design, idx) => {
        expect(designs[idx]?.description, design.name).toBeTruthy();
      });
    }
  });
});

describe("screenshots", () => {

  it("points every screenshot at an image that ships in public/", () => {
    for (const project of getAllProjects()) {
      for (const screenshot of project.screenshots) {
        const file = path.join(process.cwd(), "public", screenshot.src);
        expect(existsSync(file), screenshot.src).toBe(true);
      }
    }
  });

  // The page reads Ukrainian slides by index and features by the English count,
  // so a slide or bullet missing here would silently fall back to English.
  it("keeps the AutoFlow Ukrainian slides in step with the data", () => {
    const project = getAllProjects().find((p) => p.slug === "autoflow");
    const slides = (ukProjects.autoflowScreenshots ?? {}) as Record<
      string,
      { title?: string; description?: string; features?: string[] }
    >;

    expect(project?.screenshots.length).toBeGreaterThan(0);
    expect(Object.keys(slides)).toHaveLength(project?.screenshots.length ?? 0);
    project?.screenshots.forEach((screenshot, idx) => {
      expect(slides[idx]?.title, screenshot.title).toBeTruthy();
      expect(slides[idx]?.description, screenshot.title).toBeTruthy();
      expect(slides[idx]?.features, screenshot.title).toHaveLength(
        screenshot.features.length,
      );
    });
  });
});
