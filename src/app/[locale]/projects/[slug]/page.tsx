import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, getProjectSlugs } from "@/data/projects";
import { generatePageMetadata } from "@/lib/metadata";
import { locales } from "@/i18n/config";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectOverview } from "@/components/projects/project-overview";
import { ProjectChallenge } from "@/components/projects/project-challenge";
import { ProjectFeatures } from "@/components/projects/project-features";
import { ProjectHighlights } from "@/components/projects/project-highlights";
import { ProjectTechStack } from "@/components/projects/project-tech-stack";
import { ProjectIntegrations } from "@/components/projects/project-integrations";
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
      {project.screenshots.length > 0 && (
        <ProjectShowcase
          screenshots={project.screenshots}
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
      <ProjectTechStack techStack={project.techStack} title={t("techStack")} />
      <ProjectIntegrations
        integrations={project.integrations}
        title={t("integrations")}
      />
      <ProjectCta
        title={t("getStarted")}
        description={t("getStartedDesc")}
        buttonLabel={t("contactUs")}
      />
    </>
  );
}
