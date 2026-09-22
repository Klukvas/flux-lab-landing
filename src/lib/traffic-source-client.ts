import { TRAFFIC_SOURCE_FIELDS } from "./traffic-source";

interface LandingRecord {
  readonly referrer: string;
  readonly landingPage: string;
}

/**
 * Lives in memory only: a module variable survives client-side navigation for as
 * long as the tab keeps the site open, and unlike a cookie or storage it needs no
 * consent. A full reload starts a fresh record, which is good enough here.
 */
let landing: LandingRecord | null = null;

/** Remembers the first page of this visit and the site that linked to it; later calls are no-ops. */
export function recordLanding(): void {
  if (landing !== null || typeof window === "undefined") {
    return;
  }
  landing = {
    referrer: document.referrer,
    landingPage: window.location.pathname + window.location.search,
  };
}

export interface TrafficSourceExtras {
  readonly secondsOnForm: number;
}

/** Returns a copy of the form data with the hidden attribution fields added; the original is left as is. */
export function withTrafficSource(
  formData: FormData,
  extras: TrafficSourceExtras,
): FormData {
  // Normally the layout recorded the landing page long ago; this covers a form
  // that is somehow shown without it, using the current page as the best guess.
  recordLanding();

  const enriched = new FormData();
  formData.forEach((value, key) => enriched.append(key, value));
  enriched.append(TRAFFIC_SOURCE_FIELDS.referrer, landing?.referrer ?? "");
  enriched.append(TRAFFIC_SOURCE_FIELDS.landingPage, landing?.landingPage ?? "");
  enriched.append(TRAFFIC_SOURCE_FIELDS.submittedFrom, window.location.pathname);
  enriched.append(
    TRAFFIC_SOURCE_FIELDS.secondsOnForm,
    String(extras.secondsOnForm),
  );
  return enriched;
}
