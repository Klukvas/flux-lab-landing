export type ConsentChoice = "granted" | "denied";

/** First-party cookie that remembers whether the visitor allowed analytics cookies. */
export const CONSENT_COOKIE_NAME = "cookie_consent";

/** Six months: the strictest common regulator guidance (CNIL) for how long consent stays valid. */
export const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

/** DOM event that brings the banner back so a visitor can change an earlier choice. */
export const COOKIE_CONSENT_OPEN_EVENT = "cookie-consent:open";

export function parseConsentChoice(value: unknown): ConsentChoice | null {
  return value === "granted" || value === "denied" ? value : null;
}

/** Reads the stored choice from a raw `Cookie` header or `document.cookie` string. */
export function readConsentFromCookieString(
  cookieString: string,
): ConsentChoice | null {
  const prefix = `${CONSENT_COOKIE_NAME}=`;
  const pair = cookieString
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return pair ? parseConsentChoice(pair.slice(prefix.length)) : null;
}

/** Builds the `document.cookie` assignment that persists a choice. */
export function serializeConsentCookie(
  choice: ConsentChoice,
  options: { readonly secure: boolean },
): string {
  const attributes = [
    `${CONSENT_COOKIE_NAME}=${choice}`,
    `Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}`,
    "Path=/",
    "SameSite=Lax",
  ];
  return (options.secure ? [...attributes, "Secure"] : attributes).join("; ");
}

/**
 * Maps a choice to Google Consent Mode v2 flags. Only analytics storage follows the
 * visitor's choice; the advertising flags stay denied because the site runs no ads.
 */
export function toGtagConsentParams(choice: ConsentChoice) {
  return {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  } as const;
}

/** Names of the cookies gtag.js writes for GA4: `_ga` plus one `_ga_<container>` per property. */
const GA_COOKIE_NAME_PATTERN = /^_ga(_|$)/;

/**
 * Builds the `document.cookie` assignments that delete every GA cookie currently set.
 * gtag sets them on the widest domain it can (e.g. `.flux-lab.dev`), and a cookie can
 * only be removed with a matching Domain attribute, so each parent domain is tried;
 * assignments that match nothing are ignored by the browser.
 */
export function expireAnalyticsCookies(
  cookieString: string,
  hostname: string,
): string[] {
  const names = cookieString
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter((name) => GA_COOKIE_NAME_PATTERN.test(name));
  const domains = parentDomains(hostname);

  return names.flatMap((name) => [
    `${name}=; Max-Age=0; Path=/`,
    ...domains.map((domain) => `${name}=; Max-Age=0; Path=/; Domain=${domain}`),
  ]);
}

/** `www.flux-lab.dev` → `["www.flux-lab.dev", "flux-lab.dev"]`; bare hosts like `localhost` yield nothing. */
function parentDomains(hostname: string): string[] {
  const labels = hostname.split(".");
  return labels
    .map((_, index) => labels.slice(index).join("."))
    .filter((domain) => domain.split(".").length >= 2);
}
