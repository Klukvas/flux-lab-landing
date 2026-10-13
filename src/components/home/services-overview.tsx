import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Container,
  SectionHeading,
  Reveal,
  RevealGroup,
  RevealItem,
  buttonStyles,
} from "@/components/ui";
import { EngagementModelCard } from "@/components/services/engagement-model-card";
import { engagementModels } from "@/data/services";

/** The three ways to hire the studio, with prices: the concrete offer, not a list of service names. */
export async function ServicesOverview() {
  const t = await getTranslations("home.services");
  const tEngagement = await getTranslations("services.engagement");

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            className="clearing"
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {engagementModels.map((model) => (
            <RevealItem key={model.titleKey} className="grid">
              <EngagementModelCard
                title={tEngagement(model.titleKey)}
                price={tEngagement(model.priceKey)}
                description={tEngagement(model.descKey)}
              />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className={buttonStyles({ variant: "outline", className: "bg-background" })}
          >
            {t("viewAll")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
