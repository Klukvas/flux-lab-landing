"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, buttonStyles, AnimatedSection } from "@/components/ui";

/** The brand violet the panel keeps in both themes, so it reads the same everywhere. */
const PANEL_COLOR = "#3D32A8";

export function CTA() {
  const t = useTranslations("home.cta");

  return (
    <AnimatedSection className="py-16 sm:py-20">
      <Container>
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-10 sm:px-12 sm:py-14"
          style={{ background: PANEL_COLOR }}
        >
          {/* The page's dot grid continues inside the panel, in white, with a soft light at the corner. */}
          <div
            aria-hidden="true"
            className="grid-bg absolute inset-0 opacity-25 [--grid-dot:rgba(255,255,255,0.7)]"
          />
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/85">{t("subtitle")}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Link
                href="/contact"
                className={buttonStyles({ size: "lg", variant: "inverted" })}
              >
                {t("button")}
              </Link>
              <Link
                href="/projects"
                className={buttonStyles({
                  size: "lg",
                  variant: "outline",
                  className: "border-white/30 text-white! hover:bg-white/10",
                })}
              >
                {t("secondaryButton")}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
