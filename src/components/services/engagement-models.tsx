import { getTranslations } from "next-intl/server";
import { Container, SectionHeading, AnimatedSection } from "@/components/ui";
import { engagementModels } from "@/data/services";
import { EngagementModelCard } from "./engagement-model-card";

export async function EngagementModels() {
  const t = await getTranslations("services.engagement");

  return (
    <AnimatedSection className="py-24">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {engagementModels.map((model) => (
            <EngagementModelCard
              key={model.titleKey}
              title={t(model.titleKey)}
              price={t(model.priceKey)}
              description={t(model.descKey)}
            />
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
