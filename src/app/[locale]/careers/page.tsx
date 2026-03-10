import { getTranslations } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import { PositionCard } from "@/components/careers/position-card";
import { getAllPositions } from "@/data/careers";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  return generatePageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/careers",
    locale,
  });
}

export default async function CareersPage() {
  const t = await getTranslations("careers");
  const positions = getAllPositions();

  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        {positions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("noPositions")}
          </p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {positions.map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
