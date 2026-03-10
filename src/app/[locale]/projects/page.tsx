import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import { ProjectFilter } from "@/components/projects/project-filter";
import { ProjectGrid } from "@/components/projects/project-grid";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return generatePageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/projects",
    locale,
  });
}

export default async function ProjectsPage() {
  const t = await getTranslations("projects");

  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <Suspense>
          <div className="mb-8">
            <ProjectFilter />
          </div>
          <ProjectGrid />
        </Suspense>
      </Container>
    </section>
  );
}
