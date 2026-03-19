import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, getProjectSlugs } from "@/data/projects";
import { generatePageMetadata } from "@/lib/metadata";
import { locales } from "@/i18n/config";
import type { ProjectScreenshot } from "@/types";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectOverview } from "@/components/projects/project-overview";
import { ProjectChallenge } from "@/components/projects/project-challenge";
import { ProjectFeatures } from "@/components/projects/project-features";
import { ProjectHighlights } from "@/components/projects/project-highlights";
import { ProjectCta } from "@/components/projects/project-cta";
import { ProjectShowcase } from "@/components/projects/project-showcase";

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return generatePageMetadata({
    title: project.name,
    description: project.tagline,
    path: `/projects/${slug}`,
    locale,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations("projects");

  const i18nKey = `${slug}Screenshots` as const;
  const localizedScreenshots: ProjectScreenshot[] = project.screenshots.map(
    (screenshot, idx) => {
      const key = `${i18nKey}.${idx}` as Parameters<typeof t>[0];
      const hasTranslation = t.has(key);
      if (!hasTranslation) return screenshot;

      const titleKey = `${i18nKey}.${idx}.title` as Parameters<typeof t>[0];
      const descKey = `${i18nKey}.${idx}.description` as Parameters<
        typeof t
      >[0];

      const features: string[] = [];
      for (let i = 0; i < screenshot.features.length; i++) {
        const fKey = `${i18nKey}.${idx}.features.${i}` as Parameters<
          typeof t
        >[0];
        features.push(t.has(fKey) ? t(fKey) : screenshot.features[i]);
      }

      return {
        src: screenshot.src,
        title: t.has(titleKey) ? t(titleKey) : screenshot.title,
        description: t.has(descKey) ? t(descKey) : screenshot.description,
        features,
      };
    },
  );

  return (
    <>
      <ProjectHero
        project={project}
        visitSiteLabel={t("visitSite")}
        viewCodeLabel={t("viewCode")}
        usersLabel={t("users")}
        companiesLabel={t("companies")}
      />
      <ProjectOverview
        overview={project.overview}
        targetAudience={project.targetAudience}
        launchDate={project.launchDate}
        title={t("overview")}
        targetAudienceLabel={t("targetAudience")}
        launchedLabel={t("launched")}
      />
      {localizedScreenshots.length > 0 && (
        <ProjectShowcase
          screenshots={localizedScreenshots}
          title={t("screenshots")}
          color={project.color}
          url={project.url}
        />
      )}
      <ProjectChallenge
        challenge={project.challenge}
        solution={project.solution}
        challengeLabel={t("challenge")}
        solutionLabel={t("solution")}
      />
      <ProjectFeatures features={project.features} title={t("features")} />
      <ProjectHighlights
        highlights={project.highlights}
        title={t("highlights")}
      />
      <ProjectCta
        title={t("getStarted")}
        description={t("getStartedDesc")}
        buttonLabel={t("contactUs")}
      />
    </>
  );
}
