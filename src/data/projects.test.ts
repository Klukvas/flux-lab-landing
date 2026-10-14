import { describe, expect, it } from "vitest";
import {
  getAllProjects,
  getFeaturedProjects,
  getLiveProjects,
  getProjectsByTag,
} from "./projects";

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
