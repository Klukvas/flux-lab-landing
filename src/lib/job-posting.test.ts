import { describe, it, expect } from "vitest";
import { getAllPositions, getPositionById } from "@/data/careers";
import type { LocalizedCareerPosition } from "@/types";
import { buildJobPostingSchema } from "./job-posting";

const LABELS = { requirements: "Requirements", benefits: "Benefits" };

function position(
  overrides: Partial<LocalizedCareerPosition> = {},
): LocalizedCareerPosition {
  return {
    id: "go-backend-developer",
    type: "full-time",
    datePosted: "2026-03-20",
    applicantCountries: ["Ukraine", "Poland"],
    title: "Go Backend Developer",
    department: "Engineering",
    location: "Remote (Europe)",
    description: "Build APIs in Go.",
    requirements: ["3+ years of Go"],
    benefits: ["Fully remote"],
    ...overrides,
  };
}

describe("buildJobPostingSchema", () => {
  it("describes a fully remote role with the countries candidates may work from", () => {
    const schema = buildJobPostingSchema(position(), "en", LABELS);

    expect(schema.jobLocationType).toBe("TELECOMMUTE");
    expect(schema.applicantLocationRequirements).toEqual([
      { "@type": "Country", name: "Ukraine" },
      { "@type": "Country", name: "Poland" },
    ]);
  });

  it("maps each employment type to Google's value", () => {
    const types = (["full-time", "part-time", "contract"] as const).map(
      (type) => buildJobPostingSchema(position({ type }), "en", LABELS).employmentType,
    );

    expect(types).toEqual(["FULL_TIME", "PART_TIME", "CONTRACTOR"]);
  });

  it("builds an HTML description and escapes markup in the text", () => {
    const schema = buildJobPostingSchema(
      position({ requirements: ["Ship <b>fast</b> & safely"] }),
      "en",
      LABELS,
    );

    expect(schema.description).toBe(
      "<p>Build APIs in Go.</p><p>Requirements:</p><ul><li>Ship &lt;b&gt;fast&lt;/b&gt; &amp; safely</li></ul><p>Benefits:</p><ul><li>Fully remote</li></ul>",
    );
  });

  it("adds a closing date only for roles that have one", () => {
    const openEnded = buildJobPostingSchema(position(), "en", LABELS);
    const closing = buildJobPostingSchema(
      position({ validThrough: "2026-12-31" }),
      "en",
      LABELS,
    );

    expect(openEnded).not.toHaveProperty("validThrough");
    expect(closing).toHaveProperty("validThrough", "2026-12-31");
  });

  it("points at the posting in the page's language", () => {
    const schema = buildJobPostingSchema(position(), "uk", LABELS);

    expect(schema.url).toBe(
      "https://flux-lab.dev/uk/careers/go-backend-developer",
    );
    expect(schema.directApply).toBe(true);
  });
});

describe("careers data", () => {
  it("serves each position translated for Ukrainian readers", () => {
    const english = getPositionById("senior-frontend", "en");
    const ukrainian = getPositionById("senior-frontend", "uk");

    expect(ukrainian?.description).not.toBe(english?.description);
    expect(ukrainian?.location).toBe("Віддалено (Європа)");
  });

  it("lists at least one eligible country for every remote role", () => {
    for (const role of getAllPositions("en")) {
      expect(role.applicantCountries.length).toBeGreaterThan(0);
    }
  });

  it("falls back to English for an unknown locale", () => {
    expect(getPositionById("senior-frontend", "de")?.location).toBe(
      "Remote (Europe)",
    );
  });
});
