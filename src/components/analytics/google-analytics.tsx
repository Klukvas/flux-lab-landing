import Script from "next/script";
import { getGaMeasurementId } from "@/lib/analytics";
import { CONSENT_COOKIE_NAME, toGtagConsentParams } from "@/lib/cookie-consent";

/**
 * Consent Mode v2 needs the consent default queued before `config`, so the default is
 * computed inline from the consent cookie instead of waiting for React to hydrate the
 * banner. The order of the two script tags does not matter: gtag.js drains whatever is
 * already queued in dataLayer when it loads.
 */
function buildInitScript(measurementId: string): string {
  const deniedDefaults = JSON.stringify(toGtagConsentParams("denied"));
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var storedChoice = /(?:^|; )${CONSENT_COOKIE_NAME}=(granted|denied)/.exec(document.cookie);
gtag('consent', 'default', Object.assign(
  ${deniedDefaults},
  storedChoice ? { analytics_storage: storedChoice[1] } : {}
));
gtag('js', new Date());
gtag('config', '${measurementId}');
`;
}

/** Renders the GA4 tag only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set (see .env.example). */
export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  if (!measurementId) {
    return null;
  }
  return (
    <>
      <Script
        id="ga-init"
        dangerouslySetInnerHTML={{ __html: buildInitScript(measurementId) }}
      />
      <Script
        id="ga-tag"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
    </>
  );
}
