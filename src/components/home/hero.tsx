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
    { key: "users", value: formatNumber(STATS.users), label: t("trustUsers") },
    {
      key: "companies",
      value: formatNumber(STATS.companies),
      label: t("trustCompanies"),
    },
    { key: "years", value: `${STATS.experience}+`, label: t("trustYears") },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="gradient-text text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-lg text-gray-500 dark:text-gray-400">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/projects">
                <Button size="lg">{t("cta")}</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  {t("secondaryCta")}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right — trust metrics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {trustItems.map((item) => (
              <div
                key={item.key}
                className="rounded-xl border border-gray-200 bg-white p-5 text-center dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {item.value}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Grid background decoration */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute inset-0 -z-10 glow" />
    </section>
  );
}
