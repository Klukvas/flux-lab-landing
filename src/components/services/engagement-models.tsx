import { getTranslations } from "next-intl/server";
import {
  Container,
  SectionHeading,
  Card,
  AnimatedSection,
} from "@/components/ui";

const MODELS = [
  {
    titleKey: "dedicatedTeam",
    priceKey: "dedicatedTeamPrice",
    descKey: "dedicatedTeamDesc",
  },
  {
    titleKey: "projectBased",
    priceKey: "projectBasedPrice",
    descKey: "projectBasedDesc",
  },
  { titleKey: "staffAug", priceKey: "staffAugPrice", descKey: "staffAugDesc" },
] as const;

export async function EngagementModels() {
  const t = await getTranslations("services.engagement");

  return (
    <AnimatedSection className="py-24">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODELS.map((model) => (
            <Card key={model.titleKey} className="flex flex-col">
              <h3 className="text-lg font-semibold text-foreground">
                {t(model.titleKey)}
              </h3>
              <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                {t(model.priceKey)}
              </div>
              <p className="mt-4 flex-1 text-gray-500 dark:text-gray-400">
                {t(model.descKey)}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
