import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/hero";
import { LogoStrip } from "@/components/home/logo-strip";
import { Capabilities } from "@/components/home/capabilities";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesOverview } from "@/components/home/services-overview";
import { Playbook } from "@/components/home/playbook";
import { WhyUs } from "@/components/home/why-us";
import { LatestPosts } from "@/components/home/latest-posts";
import { CtaPanel } from "@/components/layout/cta-panel";
import { getLiveProjects } from "@/data/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const productCount = getLiveProjects().length;

  return (
    <>
      <Hero productCount={productCount} />
      <LogoStrip />
      <FeaturedProjects />
      <Playbook />
      <Capabilities />
      <ServicesOverview />
      <WhyUs />
      <LatestPosts locale={locale} />
      <CtaPanel />
    </>
  );
}
