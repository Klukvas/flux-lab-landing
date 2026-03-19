"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, AnimatedSection } from "@/components/ui";
import { STATS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export function Stats() {
  const t = useTranslations("home.stats");

  const statItems = [
    { value: formatNumber(STATS.users), label: t("users") },
    { value: formatNumber(STATS.companies), label: t("companies") },
    { value: `${STATS.experience}+`, label: t("experience") },
    { value: "25+", label: t("technologies") },
  ];

  return (
    <AnimatedSection className="py-24">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {statItems.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-xl border border-gray-200 p-6 text-center dark:border-gray-800"
            >
              <div className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
