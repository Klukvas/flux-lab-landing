import { z } from "zod/v4";

/**
 * Names of the hidden fields the application form adds to its request so a
 * submission carries where the visitor came from. Shared by client and server.
 */
export const TRAFFIC_SOURCE_FIELDS = {
  referrer: "referrer",
  landingPage: "landing_page",
  submittedFrom: "submitted_from",
  secondsOnForm: "seconds_on_form",
} as const;

/** Longest value accepted from the browser; anything bigger is treated as malformed. */
const MAX_FIELD_LENGTH = 2048;

const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Readonly<Partial<Record<UtmKey, string>>>;

/** Everything known about where an application came from. Unknown values are undefined. */
export interface SubmissionSource {
  /** Page that linked to the site; an empty string means a direct visit or a stripped referrer. */
  readonly referrer?: string;
  /** Path and query of the first page of the visit, campaign tags included. */
  readonly landingPage?: string;
  /** Path of the page the form was sent from. */
  readonly submittedFrom?: string;
  /** Seconds between the form appearing and being sent. */
  readonly secondsOnForm?: number;
  readonly userAgent?: string;
  /** Two-letter country code that Cloudflare derives from the client IP. */
  readonly country?: string;
  /** Visitor's preferred language, e.g. "uk-UA". */
  readonly language?: string;
}

/** The part of the Headers interface the collector needs; keeps tests free of Next.js. */
export interface RequestHeaderReader {
  get(name: string): string | null;
}

const hiddenFieldsSchema = z.object({
  referrer: z.string().max(MAX_FIELD_LENGTH).optional(),
  landingPage: z.string().max(MAX_FIELD_LENGTH).optional(),
  submittedFrom: z.string().max(MAX_FIELD_LENGTH).optional(),
  secondsOnForm: z.coerce.number().int().nonnegative().optional(),
});

/** Pulls utm_* parameters out of a landing page path or URL; keys lose their "utm_" prefix. */
export function extractUtmParams(landingPage: string | undefined): UtmParams {
  const queryStart = landingPage?.indexOf("?") ?? -1;
  if (landingPage === undefined || queryStart === -1) {
    return {};
  }
  const params = new URLSearchParams(landingPage.slice(queryStart + 1));
  return Object.fromEntries(
    UTM_KEYS.flatMap((key) => {
      const value = params.get(`utm_${key}`)?.trim();
      return value ? [[key, value]] : [];
    }),
  );
}

/** Combines the form's hidden fields with what the request headers reveal about the sender. */
export function collectSubmissionSource(
  formData: FormData,
  headers: RequestHeaderReader,
): SubmissionSource {
  return {
    ...readHiddenFields(formData),
    userAgent: nonEmpty(headers.get("user-agent")),
    country: nonEmpty(headers.get("cf-ipcountry")),
    language: primaryLanguage(headers.get("accept-language")),
  };
}

function readHiddenFields(formData: FormData): Partial<SubmissionSource> {
  const result = hiddenFieldsSchema.safeParse({
    referrer: stringField(formData, TRAFFIC_SOURCE_FIELDS.referrer),
    landingPage: stringField(formData, TRAFFIC_SOURCE_FIELDS.landingPage),
    submittedFrom: stringField(formData, TRAFFIC_SOURCE_FIELDS.submittedFrom),
    secondsOnForm: stringField(formData, TRAFFIC_SOURCE_FIELDS.secondsOnForm),
  });
  // Attribution must never cost us an application: malformed fields just mean "unknown".
  if (!result.success) {
    return {};
  }
  return {
    referrer: result.data.referrer?.trim(),
    landingPage: nonEmpty(result.data.landingPage),
    submittedFrom: nonEmpty(result.data.submittedFrom),
    secondsOnForm: result.data.secondsOnForm,
  };
}

/** Only string entries count; a file uploaded under one of these names is not attribution data. */
function stringField(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === "string" ? value : undefined;
}

function nonEmpty(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** "uk-UA,uk;q=0.9,en;q=0.8" becomes "uk-UA": the first tag is the one the visitor prefers. */
function primaryLanguage(acceptLanguage: string | null): string | undefined {
  return nonEmpty(acceptLanguage?.split(",")[0]?.split(";")[0]);
}
