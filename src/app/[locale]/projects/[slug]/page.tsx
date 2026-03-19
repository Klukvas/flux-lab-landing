import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, getProjectSlugs } from "@/data/projects";
import { generatePageMetadata } from "@/lib/metadata";
import { locales } from "@/i18n/config";
import type { ProjectScreenshot, ProjectFeature, ProjectHighlight } from "@/types";
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

  const t = await getTranslations("projects");
  const k = `${slug}.tagline` as Parameters<typeof t>[0];
  const tagline = t.has(k) ? t(k) : project.tagline;

  return generatePageMetadata({
    title: project.name,
    description: tagline,
    path: `/projects/${slug}`,
    locale,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tGet(t: any, key: string, fallback: string): string {
  return t.has(key) ? t(key) : fallback;
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
  const p = slug;

  // Localize project text fields
  const tagline = tGet(t, `${p}.tagline`, project.tagline);
  const description = tGet(t, `${p}.description`, project.description);
  const overview = tGet(t, `${p}.overview`, project.overview);
  const challenge = tGet(t, `${p}.challenge`, project.challenge);
  const solution = tGet(t, `${p}.solution`, project.solution);
  const targetAudience = tGet(t, `${p}.targetAudience`, project.targetAudience);

  // Localize features
  const features: ProjectFeature[] = project.features.map((f, idx) => ({
    title: tGet(t, `${p}.features.${idx}.title`, f.title),
    description: tGet(t, `${p}.features.${idx}.description`, f.description),
    icon: f.icon,
  }));

  // Localize highlights
  const highlights: ProjectHighlight[] = project.highlights.map((h, idx) => ({
    label: tGet(t, `${p}.highlights.${idx}.label`, h.label),
    value: tGet(t, `${p}.highlights.${idx}.value`, h.value),
  }));

  // Localize screenshots
  const scrKey = `${p}Screenshots`;
  const localizedScreenshots: ProjectScreenshot[] = project.screenshots.map(
    (screenshot, idx) => {
      const hasIt = t.has(`${scrKey}.${idx}` as Parameters<typeof t>[0]);
      if (!hasIt) return screenshot;

      const feats: string[] = [];
      for (let i = 0; i < screenshot.features.length; i++) {
        feats.push(tGet(t, `${scrKey}.${idx}.features.${i}`, screenshot.features[i]));
      }

      return {
        src: screenshot.src,
        title: tGet(t, `${scrKey}.${idx}.title`, screenshot.title),
        description: tGet(t, `${scrKey}.${idx}.description`, screenshot.description),
        features: feats,
      };
    },
  );

  // Build localized hero project
  const localizedProject = {
    ...project,
    tagline,
    description,
  };

  return (
    <>
      <ProjectHero
        project={localizedProject}
        visitSiteLabel={t("visitSite")}
        viewCodeLabel={t("viewCode")}
        usersLabel={t("users")}
        companiesLabel={t("companies")}
      />
      <ProjectOverview
        overview={overview}
        targetAudience={targetAudience}
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
        challenge={challenge}
        solution={solution}
        challengeLabel={t("challenge")}
        solutionLabel={t("solution")}
      />
      <ProjectFeatures features={features} title={t("features")} />
      <ProjectHighlights highlights={highlights} title={t("highlights")} />
      <ProjectCta
        title={t("getStarted")}
        description={t("getStartedDesc")}
        buttonLabel={t("contactUs")}
      />
    </>
  );
}
