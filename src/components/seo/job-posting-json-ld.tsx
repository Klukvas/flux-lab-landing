import { buildJobPostingSchema, type JobPostingLabels } from "@/lib/job-posting";
import type { LocalizedCareerPosition } from "@/types";
import { JsonLdScript } from "./json-ld-script";

interface JobPostingJsonLdProps {
  readonly position: LocalizedCareerPosition;
  readonly locale: string;
  readonly labels: JobPostingLabels;
}

export function JobPostingJsonLd({
  position,
  locale,
  labels,
}: JobPostingJsonLdProps) {
  return (
    <JsonLdScript data={buildJobPostingSchema(position, locale, labels)} />
  );
}
