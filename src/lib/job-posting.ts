import type { EmploymentType, LocalizedCareerPosition } from "@/types";
import { SITE_NAME, SITE_URL } from "./constants";
import { LOGO_URL, ORGANIZATION_ID } from "./structured-data";

const EMPLOYMENT_TYPES: Record<EmploymentType, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
};

/** Section labels for the HTML description, in the page's language. */
export interface JobPostingLabels {
  readonly requirements: string;
  readonly benefits: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toHtmlList(items: readonly string[]): string {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

/**
 * schema.org JobPosting for Google Jobs. Every role is fully remote, so the posting
 * uses TELECOMMUTE with the eligible countries instead of an office address. Google
 * reads only <p>, <ul>, <li> and <br> in the description.
 */
export function buildJobPostingSchema(
  position: LocalizedCareerPosition,
  locale: string,
  labels: JobPostingLabels,
) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: position.title,
    description: [
      `<p>${escapeHtml(position.description)}</p>`,
      `<p>${escapeHtml(labels.requirements)}:</p>`,
      toHtmlList(position.requirements),
      `<p>${escapeHtml(labels.benefits)}:</p>`,
      toHtmlList(position.benefits),
    ].join(""),
    identifier: {
      "@type": "PropertyValue",
      name: SITE_NAME,
      value: position.id,
    },
    datePosted: position.datePosted,
    employmentType: EMPLOYMENT_TYPES[position.type],
    hiringOrganization: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: LOGO_URL,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: position.applicantCountries.map((name) => ({
      "@type": "Country",
      name,
    })),
    // The application form sits on the posting's own page.
    directApply: true,
    url: `${SITE_URL}/${locale}/careers/${position.id}`,
  };
}
