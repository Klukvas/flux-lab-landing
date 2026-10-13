import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { DotBackground } from "@/components/home/dot-background";
import { Hero } from "@/components/home/hero";
import { TechStackStrip } from "@/components/home/tech-stack-strip";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesOverview } from "@/components/home/services-overview";
import { WhyUs } from "@/components/home/why-us";
import { LatestPosts } from "@/components/home/latest-posts";
import { CTA } from "@/components/home/cta";
import { getAllProjects } from "@/data/projects";

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
  const productCount = getAllProjects().length;

  return (
    <>
      <DotBackground />
      <Hero productCount={productCount} />
      <TechStackStrip />
      <FeaturedProjects />
      <ServicesOverview />
      <WhyUs />
      <LatestPosts locale={locale} />
      <CTA />
    </>
  );
}
