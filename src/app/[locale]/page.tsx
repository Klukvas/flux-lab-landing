import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { WhyUs } from "@/components/home/why-us";
import { CTA } from "@/components/home/cta";

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

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <WhyUs />
      <CTA />
    </>
  );
}
