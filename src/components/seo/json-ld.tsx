import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { locales } from "@/i18n/config";
import {
  LOGO_URL,
  ORGANIZATION_ID,
  WEBSITE_ID,
  targetMarketsSchema,
} from "@/lib/structured-data";
import { JsonLdScript } from "./json-ld-script";

/**
 * Site-wide entities, rendered on every page. Reviews and ratings are deliberately
 * absent: Google ignores self-serving reviews of an organization on its own site and
 * treats markup for content that isn't visible on the page as spam.
 */
export function JsonLd() {
  const sameAs = Object.values(SOCIAL_LINKS);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: LOGO_URL },
        description: SITE_DESCRIPTION,
        email: CONTACT_EMAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kyiv",
          addressCountry: "UA",
        },
        foundingDate: "2023",
        areaServed: targetMarketsSchema,
        knowsAbout: [
          "Software Development Outsourcing",
          "Custom Software Development",
          "SaaS Development",
          "Dedicated Development Teams",
          "Staff Augmentation",
          "Web Development",
          "React",
          "Next.js",
          "TypeScript",
          "Go",
          "Node.js",
          "PostgreSQL",
        ],
        ...(sameAs.length > 0 && { sameAs }),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: [...locales],
      },
    ],
  };

  return <JsonLdScript data={graph} />;
}
