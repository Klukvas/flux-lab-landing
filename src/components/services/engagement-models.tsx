import { getTranslations } from "next-intl/server";
import { Container, SectionHeading, Reveal, RevealGroup, RevealItem } from "@/components/ui";
import { engagementModels } from "@/data/services";
import { EngagementModelCard } from "./engagement-model-card";

export async function EngagementModels() {
  const t = await getTranslations("services.engagement");

  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={`01 · ${t("eyebrow")}`}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {engagementModels.map((model) => (
            <RevealItem key={model.titleKey} className="grid">
              <EngagementModelCard
                title={t(model.titleKey)}
                fit={t(model.fitKey)}
                description={t(model.descKey)}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
