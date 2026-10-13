import { getTranslations } from "next-intl/server";
import {
  Container,
  SectionHeading,
  Card,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/ui";
import { getAllProjects } from "@/data/projects";

const DIFFERENTIATORS = [
  { titleKey: "productBuilders", descKey: "productBuildersDesc" },
  { titleKey: "fullOwnership", descKey: "fullOwnershipDesc" },
  { titleKey: "battleTested", descKey: "battleTestedDesc" },
  { titleKey: "transparent", descKey: "transparentDesc" },
] as const;

export async function WhyUs() {
  const t = await getTranslations("home.whyUs");
  const productCount = getAllProjects().length;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            className="clearing"
            eyebrow={`05 · ${t("eyebrow")}`}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <RevealGroup className="grid gap-6 sm:grid-cols-2">
          {DIFFERENTIATORS.map((item) => (
            <RevealItem key={item.titleKey} className="grid">
              <Card>
                <h3 className="text-lg font-semibold text-brand-dark dark:text-brand">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {t(item.descKey, { count: productCount })}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
