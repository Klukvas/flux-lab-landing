"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonStyles, Container } from "@/components/ui";
import { STATS } from "@/lib/constants";
import { TrustMetrics, type TrustMetric } from "./trust-metrics";

interface HeroProps {
  /** Products in the portfolio, counted by the page so the client bundle skips the case-study data. */
  readonly productCount: number;
}

export function Hero({ productCount }: HeroProps) {
  const t = useTranslations("home.hero");

  const trustMetrics: readonly TrustMetric[] = [
    { key: "users", value: STATS.users, label: t("trustUsers") },
    { key: "companies", value: STATS.companies, label: t("trustCompanies") },
    { key: "products", value: productCount, suffix: "", label: t("trustProducts") },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — text. Not animated in: the heading is the largest paint, and a
              server-rendered opacity:0 would hold it back until hydration. */}
          <div>
            <h1>
              <span className="block text-sm font-medium uppercase tracking-widest text-brand">
                {t("eyebrow")}
              </span>{" "}
              <span className="gradient-text mt-4 block text-4xl font-bold sm:text-5xl lg:text-6xl">
                {t("title")}
              </span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 dark:text-gray-400">
              {t("subtitle", { count: productCount })}
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link href="/projects" className={buttonStyles({ size: "lg" })}>
                {t("cta")}
              </Link>
              <Link
                href="/contact"
                className={buttonStyles({
                  variant: "outline",
                  size: "lg",
                  className: "bg-background",
                })}
              >
                {t("secondaryCta")}
              </Link>
            </div>
          </div>

          {/* Right — trust metrics */}
          <TrustMetrics metrics={trustMetrics} />
        </div>
      </Container>

      {/* The page-wide dot field sits behind; this adds the soft glow around the text. */}
      <div className="absolute inset-0 -z-10 glow" />
    </section>
  );
}
