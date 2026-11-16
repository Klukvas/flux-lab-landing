import { getTranslations, setRequestLocale } from "next-intl/server";
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

  // The catalog is the page: it fills the screen under the header, so the title is
  // kept for search engines and screen readers only.
  return (
    <>
      <h1 className="sr-only">{t("title")}</h1>
      <ProjectCatalog />
    </>
  );
}
