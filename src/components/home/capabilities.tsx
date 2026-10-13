import { getTranslations } from "next-intl/server";
import { Container, SectionHeading, Reveal } from "@/components/ui";
import { capabilityColumns } from "@/data/capabilities";
import { CapabilityTabs, type CapabilityArea } from "./capability-tabs";

/** What the studio does, one area at a time: tabs on the left, a drawing and the rows on the right. */
export async function Capabilities() {
  const t = await getTranslations("home.capabilities");
  const areas: readonly CapabilityArea[] = capabilityColumns.map((column) => ({
    id: column.id,
    title: t(`columns.${column.id}.title`),
    summary: t(`columns.${column.id}.summary`),
    caption: t(`columns.${column.id}.caption`),
    items: column.items.map((item) => ({
      id: item,
      label: t(`columns.${column.id}.items.${item}`),
    })),
  }));

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            className="clearing"
            eyebrow={`03 · ${t("eyebrow")}`}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <Reveal>
          <CapabilityTabs areas={areas} />
        </Reveal>
      </Container>
    </section>
  );
}
