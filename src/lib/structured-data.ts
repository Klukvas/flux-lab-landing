import { SITE_NAME, SITE_URL } from "./constants";

/** Stable node ids let every page's JSON-LD point at one Organization and one WebSite. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

/** Markets the English and Ukrainian pages are written for. */
export const TARGET_MARKETS = ["United States", "Ukraine"] as const;

export const targetMarketsSchema = TARGET_MARKETS.map((name) => ({
  "@type": "Country",
  name,
}));

/** Inline stub of the site-wide Organization node, for publisher, author and provider fields. */
export const organizationReference = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
} as const;

/**
 * Serializes JSON-LD for an inline <script>. Escaping "<" keeps content such as a
 * literal "</script>" from closing the tag early.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
