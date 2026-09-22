import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import {
  ProjectFilter,
  ProjectFilterView,
} from "@/components/projects/project-filter";
import {
  ProjectGrid,
  ProjectGridView,
} from "@/components/projects/project-grid";
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
    <section className="py-24">
      <Container>
        <SectionHeading as="h1" title={t("title")} subtitle={t("subtitle")} />
        {/* The filter reads ?tag= from the URL, which static HTML can't know, so the
            fallback prerenders the unfiltered view and the URL's tag applies on hydration. */}
        <Suspense
          fallback={
            <>
              <div className="mb-8">
                <ProjectFilterView activeTag={null} />
              </div>
              <ProjectGridView activeTag={null} />
            </>
          }
        >
          <div className="mb-8">
            <ProjectFilter />
          </div>
          <ProjectGrid />
        </Suspense>
      </Container>
    </section>
  );
}
