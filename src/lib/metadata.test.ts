import { describe, it, expect } from "vitest";
import { generatePageMetadata } from "./metadata";

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
