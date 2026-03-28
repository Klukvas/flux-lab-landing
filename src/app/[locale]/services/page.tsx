import { getTranslations } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import { ServiceCard } from "@/components/services/service-card";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { EngagementModels } from "@/components/services/engagement-models";
import { FAQ } from "@/components/services/faq";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("services");

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  return (
    <>
      <FaqJsonLd items={faqItems} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "Home", path: "" },
          { name: t("title"), path: "/services" },
        ]}
      />
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
