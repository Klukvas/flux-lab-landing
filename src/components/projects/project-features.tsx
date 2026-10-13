import type { ProjectFeature } from "@/types";
import {
  Card,
  Container,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from "@/components/ui";

interface ProjectFeaturesProps {
  readonly features: readonly ProjectFeature[];
  readonly title: string;
}

export function ProjectFeatures({ features, title }: ProjectFeaturesProps) {
  return (
    <section id="features" className="scroll-mt-16 py-24">
      <Container>
        <SectionHeading title={title} />
        <RevealGroup className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <RevealItem key={feature.title} className="grid">
              <Card>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-gray-200 dark:border-gray-800">
                    <svg
                      className="h-4 w-4 text-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
