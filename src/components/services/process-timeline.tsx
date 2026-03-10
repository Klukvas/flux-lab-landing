"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/ui";
import { processSteps } from "@/data/services";

export function ProcessTimeline() {
  const t = useTranslations();

  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={t("services.process.title")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
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
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
