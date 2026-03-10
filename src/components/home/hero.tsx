"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Button, Container } from "@/components/ui";
import { STATS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("home.hero");

  const trustItems = [
    { key: "projects", value: STATS.projects, label: t("trustProducts") },
    { key: "users", value: formatNumber(STATS.users), label: t("trustUsers") },
    {
      key: "companies",
      value: formatNumber(STATS.companies),
      label: t("trustCompanies"),
    },
    { key: "years", value: `${STATS.experience}+`, label: t("trustYears") },
  ];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="gradient-text text-4xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-xl text-gray-500 dark:text-gray-400">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/projects">
              <Button size="lg">{t("cta")}</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                {t("secondaryCta")}
              </Button>
            </Link>
          </div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm text-gray-500 sm:gap-x-8 sm:gap-y-4 dark:text-gray-400"
          >
            {trustItems.map((item, idx) => (
              <div key={item.key} className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {item.value}
                </span>
                <span>{item.label}</span>
                {idx < trustItems.length - 1 && (
                  <span className="ml-6 hidden text-gray-300 dark:text-gray-700 sm:inline">
                    ·
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Grid background decoration */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute inset-0 -z-10 glow" />
    </section>
  );
}
