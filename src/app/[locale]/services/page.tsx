import { getTranslations } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import { ServiceCard } from "@/components/services/service-card";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { EngagementModels } from "@/components/services/engagement-models";
import { FAQ } from "@/components/services/faq";
import { services } from "@/data/services";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return generatePageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/services",
    locale,
  });
}

export default async function ServicesPage() {
  const t = await getTranslations("services");

  return (
    <>
      <section className="py-24">
        <Container>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>
      <EngagementModels />
      <ProcessTimeline />
      <FAQ />
    </>
  );
}
