import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TRAFFIC_SOURCE_FIELDS } from "./traffic-source";

/** The module keeps the landing record in memory, so every test loads a fresh copy of it. */
async function loadClient() {
  vi.resetModules();
  return import("./traffic-source-client");
}

function setReferrer(referrer: string) {
  Object.defineProperty(document, "referrer", {
    value: referrer,
    configurable: true,
  });
}

describe("recordLanding / withTrafficSource", () => {
  beforeEach(() => {
    setReferrer("https://www.google.com/");
    window.history.replaceState(null, "", "/en/careers?utm_source=google");
  });

  afterEach(() => {
    Reflect.deleteProperty(document, "referrer");
    window.history.replaceState(null, "", "/");
  });

  it("reports the first page of the visit even after navigating to the form", async () => {
    const { recordLanding, withTrafficSource } = await loadClient();
    recordLanding();
    window.history.pushState(null, "", "/en/careers/go-backend-developer");

    const enriched = withTrafficSource(new FormData(), { secondsOnForm: 42 });

    expect(enriched.get(TRAFFIC_SOURCE_FIELDS.referrer)).toBe(
      "https://www.google.com/",
    );
    expect(enriched.get(TRAFFIC_SOURCE_FIELDS.landingPage)).toBe(
      "/en/careers?utm_source=google",
    );
    expect(enriched.get(TRAFFIC_SOURCE_FIELDS.submittedFrom)).toBe(
      "/en/careers/go-backend-developer",
    );
    expect(enriched.get(TRAFFIC_SOURCE_FIELDS.secondsOnForm)).toBe("42");
  });

  it("falls back to the current page when nothing was recorded earlier", async () => {
    const { withTrafficSource } = await loadClient();
    window.history.pushState(null, "", "/en/careers/senior-frontend");

    const enriched = withTrafficSource(new FormData(), { secondsOnForm: 3 });

    expect(enriched.get(TRAFFIC_SOURCE_FIELDS.landingPage)).toBe(
      "/en/careers/senior-frontend",
    );
  });

  it("copies the existing fields and leaves the original form data untouched", async () => {
    const { withTrafficSource } = await loadClient();
    const original = new FormData();
    original.append("name", "Ada");

    const enriched = withTrafficSource(original, { secondsOnForm: 10 });

    expect(enriched.get("name")).toBe("Ada");
    expect(original.has(TRAFFIC_SOURCE_FIELDS.referrer)).toBe(false);
  });
});
