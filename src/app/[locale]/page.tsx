import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { StudioHome } from "@/components/home/studio-home";

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
  return <StudioHome locale={locale} />;
}
