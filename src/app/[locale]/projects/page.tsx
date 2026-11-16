import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import { CtaPanel } from "@/components/layout/cta-panel";
import { ProjectCatalog } from "@/components/projects/catalog/project-catalog";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/projects",
    locale,
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");

  return (
    <>
      <section className="pt-24 pb-24">
        <Container>
          <div className="mb-12">
            <SectionHeading as="h1" title={t("title")} subtitle={t("subtitle")} />
          </div>
        </Container>
        {/* Full bleed: the stage is a band of the page dressed in the centred product. */}
        <ProjectCatalog />
      </section>
      <CtaPanel />
    </>
  );
}
