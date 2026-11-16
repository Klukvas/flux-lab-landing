import { Suspense, type ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import { CtaPanel } from "@/components/layout/cta-panel";
import {
  ProjectFilter,
  ProjectFilterView,
} from "@/components/projects/project-filter";
import {
  ProjectCatalog,
  ProjectCatalogView,
} from "@/components/projects/catalog/project-catalog";
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

function CatalogSection({
  filter,
  catalog,
}: {
  readonly filter: ReactNode;
  readonly catalog: ReactNode;
}) {
  return (
    <>
      <Container>
        <div className="mb-10">{filter}</div>
      </Container>
      {/* Full bleed: the stage is a band of the page dressed in the centred product. */}
      {catalog}
    </>
  );
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
          <SectionHeading as="h1" title={t("title")} subtitle={t("subtitle")} />
        </Container>
        {/* The filter reads ?tag= from the URL, which static HTML can't know, so the
            fallback prerenders the unfiltered view and the URL's tag applies on hydration. */}
        <Suspense
          fallback={
            <CatalogSection
              filter={<ProjectFilterView activeTag={null} />}
              catalog={<ProjectCatalogView activeTag={null} />}
            />
          }
        >
          <CatalogSection
            filter={<ProjectFilter />}
            catalog={<ProjectCatalog />}
          />
        </Suspense>
      </section>
      <CtaPanel />
    </>
  );
}
