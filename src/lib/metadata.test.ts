import { describe, it, expect } from "vitest";
import { generatePageMetadata, toMetaDescription } from "./metadata";

describe("generatePageMetadata", () => {
  it("declares every locale plus an x-default that points at the English page", () => {
    const metadata = generatePageMetadata({
      title: "Careers",
      description: "Open roles",
      path: "/careers",
      locale: "uk",
    });

    expect(metadata.alternates?.languages).toEqual({
      en: "https://flux-lab.dev/en/careers",
      uk: "https://flux-lab.dev/uk/careers",
      "x-default": "https://flux-lab.dev/en/careers",
    });
  });

  it("makes each locale's canonical point at itself", () => {
    const metadata = generatePageMetadata({
      title: "Careers",
      description: "Open roles",
      path: "/careers",
      locale: "uk",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://flux-lab.dev/uk/careers",
    );
  });
});

describe("generatePageMetadata titles", () => {
  it("appends the brand to ordinary titles in social tags", () => {
    const metadata = generatePageMetadata({
      title: "Engineering Blog",
      description: "Posts",
      path: "/blog",
    });

    expect(metadata.title).toBe("Engineering Blog");
    expect(metadata.openGraph?.title).toBe("Engineering Blog | fluxLab.dev");
  });

  it("keeps a title that already carries the brand as-is", () => {
    const metadata = generatePageMetadata({
      title: "Software Development Company in Ukraine | fluxLab.dev",
      description: "Home",
    });

    expect(metadata.title).toEqual({
      absolute: "Software Development Company in Ukraine | fluxLab.dev",
    });
    expect(metadata.openGraph?.title).toBe(
      "Software Development Company in Ukraine | fluxLab.dev",
    );
  });

  it("drops the brand suffix when it would push the title past 60 characters", () => {
    const title = "Adding AI Features to SaaS Products Without Breaking the Bank";

    const metadata = generatePageMetadata({ title, description: "Post" });

    expect(metadata.title).toEqual({ absolute: title });
    expect(metadata.openGraph?.title).toBe(title);
  });

  it("marks articles with their publish and revision dates", () => {
    const metadata = generatePageMetadata({
      title: "Post",
      description: "About Go",
      path: "/blog/go",
      article: { publishedTime: "2025-02-20", modifiedTime: "2026-09-22" },
    });

    expect(metadata.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2025-02-20",
      modifiedTime: "2026-09-22",
    });
  });
});

describe("toMetaDescription", () => {
  it("leaves short text untouched apart from whitespace", () => {
    expect(toMetaDescription("  Senior  React\nengineers ")).toBe(
      "Senior React engineers",
    );
  });

  it("cuts long text at a word boundary within the limit", () => {
    const long =
      "We're looking for a senior frontend developer to own the UI layer across our product portfolio and ship to production daily with a small team.";

    const result = toMetaDescription(long, 60);

    expect(result.length).toBeLessThanOrEqual(60);
    expect(result).toBe(
      "We're looking for a senior frontend developer to own the UI…",
    );
  });
});
