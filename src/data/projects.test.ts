import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import uk from "@/i18n/messages/uk.json";
import {
  getAllProjects,
  getFeaturedProjects,
  getLiveProjects,
} from "./projects";

const ukProjects: Record<string, unknown> = uk.projects;

describe("public project roster", () => {
  it("keeps the approved seven products in one shared order", () => {
    expect(getAllProjects().map((p) => p.slug)).toEqual([
      "fluxradar",
      "washflow",
      "jobber",
      "autoflow",
      "receiptmaster",
      "lifespan",
      "fluxkit",
    ]);
    expect(getAllProjects().map((p) => p.status)).toEqual([
      "active",
      "active",
      "active",
      "active",
      "active",
      "in-development",
      "active",
    ]);
  });
  it("counts only production products as live", () => {
    expect(getLiveProjects()).toHaveLength(6);
    expect(getLiveProjects().every((p) => p.status === "active")).toBe(true);
    expect(getFeaturedProjects().every((p) => p.status === "active")).toBe(
      true,
    );
  });
  it("never advertises an unfinished product as a live site", () => {
    const unfinished = getAllProjects().filter(
      (p) => p.status === "in-development" || p.status === "coming-soon",
    );
    expect(unfinished.length).toBeGreaterThan(0);
    for (const project of unfinished) {
      expect(project.url, project.slug).toBeUndefined();
      expect(project.screenshots, project.slug).toEqual([]);
    }
    for (const gone of ["accounting", "market", "efluxcom"]) {
      expect(getAllProjects().find((p) => p.slug === gone)).toBeUndefined();
    }
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
      const copy = ukProjects[project.slug] as
        { designsIntro?: string } | undefined;
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

describe("catalog", () => {
  it("keeps at most four stickers per card so they fit around it", () => {
    for (const project of getAllProjects()) {
      expect(
        project.catalog?.stats.length ?? 0,
        project.slug,
      ).toBeLessThanOrEqual(4);
    }
  });

  // The catalog reads Ukrainian sticker labels by index, so a missing one would fall back to English.
  it("has Ukrainian copy for every catalog audience and sticker", () => {
    for (const project of getAllProjects()) {
      const catalog = project.catalog;
      if (!catalog) continue;
      const copy = (
        ukProjects[project.slug] as
          | { catalog?: { audience?: string; stats?: Record<string, string> } }
          | undefined
      )?.catalog;

      if (catalog.audience) {
        expect(copy?.audience, `${project.slug}.catalog.audience`).toBeTruthy();
      }
      catalog.stats.forEach((stat, idx) => {
        expect(
          copy?.stats?.[idx],
          `${project.slug}: ${stat.label}`,
        ).toBeTruthy();
      });
    }
  });
});
