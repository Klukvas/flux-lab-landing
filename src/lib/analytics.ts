import { toGtagConsentParams, type ConsentChoice } from "./cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** GA4 measurement IDs look like "G-XXXXXXXXXX"; anything else is a paste error. */
const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

/**
 * Reads the GA4 measurement ID from the environment.
 * Returns undefined when analytics is not configured; throws on a malformed ID so a
 * typo fails the build instead of silently sending nothing to GA.
 */
export function getGaMeasurementId(): string | undefined {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) {
    return undefined;
  }
  if (!GA_MEASUREMENT_ID_PATTERN.test(measurementId)) {
    throw new Error(
      `NEXT_PUBLIC_GA_MEASUREMENT_ID must look like "G-XXXXXXXXXX", got "${measurementId}"`,
    );
  }
  return measurementId;
}

/** True when a measurement ID is configured, i.e. the site sets analytics cookies at all. */
export function isAnalyticsEnabled(): boolean {
  return getGaMeasurementId() !== undefined;
}

/** Forwards a gtag command, or does nothing when GA is not configured or not loaded yet. */
function callGtag(...args: unknown[]): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag(...args);
}

export type AnalyticsEventParams = Record<string, string | number | boolean>;

/** Sends a GA4 event. Silently does nothing when GA is not configured or not loaded yet. */
export function trackEvent(name: string, params: AnalyticsEventParams = {}): void {
  callGtag("event", name, params);
}

export type TrackedForm = "contact" | "support" | "application";

/**
 * Form submissions are the site's conversions. Contact and support requests map to
 * GA4's recommended "generate_lead" event; job applications get their own event so
 * candidates never inflate the lead count.
 */
export function trackFormSubmitted(form: TrackedForm): void {
  const eventName = form === "application" ? "submit_application" : "generate_lead";
  trackEvent(eventName, { form_name: form });
}

/** Tells gtag the visitor's new choice; GA starts or stops setting cookies from here on. */
export function updateAnalyticsConsent(choice: ConsentChoice): void {
  callGtag("consent", "update", toGtagConsentParams(choice));
}
