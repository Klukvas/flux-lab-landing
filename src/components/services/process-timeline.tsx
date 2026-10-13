"use client";

import { useTranslations } from "next-intl";
import { Container, SectionHeading, Reveal, RevealGroup, RevealItem } from "@/components/ui";
import { processSteps } from "@/data/services";

export function ProcessTimeline() {
  const t = useTranslations();

  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={`02 · ${t("services.process.eyebrow")}`}
            title={t("services.process.title")}
          />
        </Reveal>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <RevealItem
              key={step.id}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm font-bold text-foreground dark:border-gray-800">
                {step.order}
              </div>
              <div>
                <div className="text-xs font-medium uppercase text-gray-400">
                  {t("services.process.step")} {step.order}
                </div>
                <h3 className="mt-1 font-semibold text-foreground">
                  {t(step.titleKey)}
                </h3>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
