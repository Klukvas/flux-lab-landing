import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getGaMeasurementId,
  isAnalyticsEnabled,
  trackEvent,
  trackFormSubmitted,
  updateAnalyticsConsent,
} from "./analytics";

describe("getGaMeasurementId", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns undefined when the ID is not set, so analytics stays off", () => {
    expect(getGaMeasurementId()).toBeUndefined();
  });

  it("returns a well-formed GA4 ID", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-ABC123XYZ9");
    expect(getGaMeasurementId()).toBe("G-ABC123XYZ9");
  });

  it("throws on a malformed ID so a typo fails the build instead of silently dropping data", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "UA-12345-1");
    expect(() => getGaMeasurementId()).toThrow(/must look like "G-XXXXXXXXXX"/);
  });
});

describe("trackEvent", () => {
  afterEach(() => {
    delete window.gtag;
  });

  it("does nothing when gtag has not loaded", () => {
    expect(() => trackEvent("generate_lead", { form_name: "contact" })).not.toThrow();
  });

  it("forwards the event to gtag when it is available", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackEvent("generate_lead", { form_name: "contact" });

    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", { form_name: "contact" });
  });
});

describe("trackFormSubmitted", () => {
  afterEach(() => {
    delete window.gtag;
  });

  it("reports contact and support forms as leads, and applications separately", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackFormSubmitted("contact");
    trackFormSubmitted("support");
    trackFormSubmitted("application");

    expect(gtag.mock.calls).toEqual([
      ["event", "generate_lead", { form_name: "contact" }],
      ["event", "generate_lead", { form_name: "support" }],
      ["event", "submit_application", { form_name: "application" }],
    ]);
  });
});

describe("isAnalyticsEnabled", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("mirrors whether a measurement ID is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    expect(isAnalyticsEnabled()).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-ABC123XYZ9");
    expect(isAnalyticsEnabled()).toBe(true);
  });
});

describe("updateAnalyticsConsent", () => {
  afterEach(() => {
    delete window.gtag;
  });

  it("does nothing when gtag has not loaded", () => {
    expect(() => updateAnalyticsConsent("granted")).not.toThrow();
  });

  it("sends a consent update that only touches analytics storage", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    updateAnalyticsConsent("granted");

    expect(gtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });
});
