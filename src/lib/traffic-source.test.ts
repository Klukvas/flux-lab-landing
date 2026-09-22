import { describe, expect, it } from "vitest";
import {
  collectSubmissionSource,
  extractUtmParams,
  TRAFFIC_SOURCE_FIELDS,
} from "./traffic-source";

function formDataOf(fields: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [name, value] of Object.entries(fields)) {
    formData.append(name, value);
  }
  return formData;
}

function headersOf(entries: Record<string, string>) {
  return { get: (name: string) => entries[name.toLowerCase()] ?? null };
}

describe("extractUtmParams", () => {
  it("returns the utm_* parameters without their prefix", () => {
    expect(
      extractUtmParams(
        "/en/careers?utm_source=linkedin&utm_medium=post&ref=abc",
      ),
    ).toEqual({ source: "linkedin", medium: "post" });
  });

  it("works on a full URL as well as a path", () => {
    expect(
      extractUtmParams("https://flux-lab.dev/en/careers?utm_campaign=go-hiring"),
    ).toEqual({ campaign: "go-hiring" });
  });

  it("returns nothing for a landing page without campaign tags", () => {
    expect(extractUtmParams("/en/careers")).toEqual({});
    expect(extractUtmParams(undefined)).toEqual({});
  });
});

describe("collectSubmissionSource", () => {
  const headers = headersOf({
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/128.0",
    "cf-ipcountry": "UA",
    "accept-language": "uk-UA,uk;q=0.9,en;q=0.8",
  });

  it("combines the hidden form fields with the request headers", () => {
    const formData = formDataOf({
      [TRAFFIC_SOURCE_FIELDS.referrer]: "https://www.google.com/",
      [TRAFFIC_SOURCE_FIELDS.landingPage]: "/en/careers?utm_source=google",
      [TRAFFIC_SOURCE_FIELDS.submittedFrom]: "/en/careers/go-backend-developer",
      [TRAFFIC_SOURCE_FIELDS.secondsOnForm]: "47",
    });

    expect(collectSubmissionSource(formData, headers)).toEqual({
      referrer: "https://www.google.com/",
      landingPage: "/en/careers?utm_source=google",
      submittedFrom: "/en/careers/go-backend-developer",
      secondsOnForm: 47,
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/128.0",
      country: "UA",
      language: "uk-UA",
    });
  });

  it("keeps an empty referrer (a direct visit) apart from a missing one", () => {
    const direct = collectSubmissionSource(
      formDataOf({ [TRAFFIC_SOURCE_FIELDS.referrer]: "" }),
      headersOf({}),
    );
    expect(direct.referrer).toBe("");

    const missing = collectSubmissionSource(new FormData(), headersOf({}));
    expect(missing.referrer).toBeUndefined();
    expect(missing.userAgent).toBeUndefined();
    expect(missing.language).toBeUndefined();
  });

  it("treats malformed hidden fields as unknown instead of failing the request", () => {
    const formData = formDataOf({
      [TRAFFIC_SOURCE_FIELDS.referrer]: "https://www.google.com/",
      [TRAFFIC_SOURCE_FIELDS.secondsOnForm]: "not-a-number",
    });

    expect(() => collectSubmissionSource(formData, headers)).not.toThrow();
    const source = collectSubmissionSource(formData, headers);
    expect(source.referrer).toBeUndefined();
    expect(source.country).toBe("UA");
  });
});
