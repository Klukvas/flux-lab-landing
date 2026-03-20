import { getTranslations } from "next-intl/server";
import {
  Container,
  SectionHeading,
  Card,
  AnimatedSection,
} from "@/components/ui";

const DIFFERENTIATORS = [
  { titleKey: "productBuilders", descKey: "productBuildersDesc" },
  { titleKey: "fullOwnership", descKey: "fullOwnershipDesc" },
  { titleKey: "battleTested", descKey: "battleTestedDesc" },
  { titleKey: "transparent", descKey: "transparentDesc" },
] as const;

export async function WhyUs() {
  const t = await getTranslations("home.whyUs");

  return (
    <AnimatedSection className="py-24">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-6 sm:grid-cols-2">
          {DIFFERENTIATORS.map((item) => (
            <Card key={item.titleKey}>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-brand">
                {t(item.titleKey)}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {t(item.descKey)}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
