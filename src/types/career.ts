import type { Locale } from "@/i18n/config";

export type EmploymentType = "full-time" | "part-time" | "contract";

/** The text of a position in one language. */
export interface CareerPositionContent {
  readonly title: string;
  readonly department: string;
  readonly location: string;
  readonly description: string;
  readonly requirements: readonly string[];
  readonly benefits: readonly string[];
}

interface CareerPositionFacts {
  readonly id: string;
  readonly type: EmploymentType;
  /** ISO date the role was first published (JobPosting datePosted). */
  readonly datePosted: string;
  /** Countries candidates may work from (JobPosting applicantLocationRequirements). */
  readonly applicantCountries: readonly string[];
}

/** Every locale is required, so a position can't ship untranslated. */
export interface CareerPosition extends CareerPositionFacts {
  readonly content: Readonly<Record<Locale, CareerPositionContent>>;
}

/** A position resolved to one language: what pages and cards render. */
export interface LocalizedCareerPosition
  extends CareerPositionFacts,
    CareerPositionContent {}
