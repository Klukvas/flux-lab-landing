import { getTranslations } from "next-intl/server";
import { Container, SectionHeading, Reveal } from "@/components/ui";
import { PLAYBOOK_WEEKS, playbookPhases } from "@/data/playbook";
import { PlaybookTimeline } from "./playbook-timeline";

/** The 8-week promise from the hero, shown week by week. */
export async function Playbook() {
  const t = await getTranslations("home.playbook");
  const phases = playbookPhases.map((phase) => ({
    ...phase,
    title: t(`phases.${phase.id}.title`),
    description: t(`phases.${phase.id}.description`),
    weeks:
      phase.fromWeek === phase.toWeek
        ? t("weekOne", { week: phase.fromWeek })
        : t("weekSpan", { from: phase.fromWeek, to: phase.toWeek }),
  }));

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            className="clearing"
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <PlaybookTimeline
          phases={phases}
          weekCount={PLAYBOOK_WEEKS}
          weeksLabel={t("weeks")}
        />
        <p className="clearing mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-foreground">{t("after.title")}</span>
          {" · "}
          {t("after.description")}
        </p>
      </Container>
    </section>
  );
}
