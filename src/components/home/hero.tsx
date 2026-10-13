"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonStyles, Container } from "@/components/ui";
import { RotatingWords } from "@/components/ui/rotating-words";
import { FOUNDED_YEAR, STATS } from "@/lib/constants";
import { HeroFigure } from "./hero-figure";
import { TrustMetrics, type TrustMetric } from "./trust-metrics";

interface HeroProps {
  /** Products in the portfolio, counted by the page so the client bundle skips the case-study data. */
  readonly productCount: number;
}

export function Hero({ productCount }: HeroProps) {
  const t = useTranslations("home.hero");

  const titleWords = [
    t("titleWord1"),
    t("titleWord2", { count: productCount }),
    t("titleWord3"),
  ];

  const trustMetrics: readonly TrustMetric[] = [
    { key: "users", value: STATS.users, label: t("trustUsers") },
    { key: "companies", value: STATS.companies, label: t("trustCompanies") },
    { key: "products", value: productCount, suffix: "", label: t("trustProducts") },
    { key: "since", value: FOUNDED_YEAR, suffix: "", isStatic: true, label: t("trustSince") },
  ];

  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — text. Rises in with CSS from the first paint: the heading is the
              largest paint, and a Motion fade would hold it back until hydration. */}
          <div>
            <h1>
              <span className="rise-in block text-sm font-medium uppercase tracking-widest text-brand">
                {t("eyebrow")}
              </span>{" "}
              <span className="rise-in mt-4 block text-4xl font-bold text-foreground [--rise-delay:60ms] sm:text-5xl lg:text-6xl">
                {t("titleLead")}{" "}
                <RotatingWords words={titleWords} className="gradient-text" />
              </span>
            </h1>
            <p className="rise-in mt-5 text-lg text-gray-500 [--rise-delay:140ms] dark:text-gray-400">
              {t("subtitle", { count: productCount })}
            </p>
            <div className="rise-in mt-8 flex flex-col items-start gap-3 [--rise-delay:220ms] sm:flex-row">
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
            <TrustMetrics metrics={trustMetrics} />
          </div>

          {/* Right — the logo mark, drawn by the dot field behind the page. */}
          <HeroFigure />
        </div>
      </Container>

      {/* The page-wide dot field sits behind; this adds the soft glow around the text. */}
      <div className="absolute inset-0 -z-10 glow" />
    </section>
  );
}
