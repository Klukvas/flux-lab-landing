"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Button, AnimatedSection } from "@/components/ui";

export function CTA() {
  const t = useTranslations("home.cta");

  return (
    <AnimatedSection className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-xl border border-brand-dark/20 bg-brand p-6 text-center sm:p-12 dark:border-brand/30 dark:bg-brand-dark">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/90">{t("subtitle")}</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-brand-dark hover:opacity-90"
              >
                {t("button")}
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t("secondaryButton")}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
