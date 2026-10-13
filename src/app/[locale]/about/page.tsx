import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Container,
  SectionHeading,
  Reveal,
  RevealGroup,
  RevealItem,
  CountUp,
} from "@/components/ui";
import { TrackRecordTimeline } from "@/components/about/track-record-timeline";
import { CtaPanel } from "@/components/layout/cta-panel";
import { timelineEvents } from "@/data/team";
import { STATS } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about",
    locale,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  const values = [
    {
      title: t("values.quality"),
      description: t("values.qualityDesc"),
      num: "01",
    },
    {
      title: t("values.innovation"),
      description: t("values.innovationDesc"),
      num: "02",
    },
    {
      title: t("values.transparency"),
      description: t("values.transparencyDesc"),
      num: "03",
    },
    {
      title: t("values.growth"),
      description: t("values.growthDesc"),
      num: "04",
    },
  ];

  const stats = [
    { value: STATS.users, label: t("stats.users") },
    { value: STATS.companies, label: t("stats.companies") },
    { value: STATS.experience, label: t("stats.years") },
  ];

  return (
    <>
      {/* Hero — 2 columns */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left — statement */}
            <div className="lg:col-span-3">
              <p className="text-sm font-medium uppercase tracking-widest text-brand">
                {t("title")}
              </p>
              <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {t("mission.title")}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                {t("mission.description")}
              </p>
            </div>

            {/* Right — stats */}
            <div className="lg:col-span-2">
              <RevealGroup className="grid gap-4">
                {stats.map((stat) => (
                  <RevealItem
                    key={stat.label}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-950"
                  >
                    <span className="text-3xl font-bold text-brand">
                      <CountUp value={stat.value} />
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* How We Work — 2×2 bento */}
      <section className="py-16">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              className="mb-8"
              eyebrow={`01 · ${t("values.eyebrow")}`}
              title={t("values.title")}
            />
          </Reveal>
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <RevealItem key={value.title} className="grid">
                <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-brand/30 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-brand/30">
                  <span className="absolute -right-4 -top-4 text-[80px] font-bold leading-none text-gray-100 dark:text-gray-900">
                    {value.num}
                  </span>
                  <div className="relative">
                    <h3 className="text-lg font-bold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Track Record — a timeline that draws itself on scroll */}
      <section className="py-16">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              className="mb-8"
              eyebrow={`02 · ${t("timeline.eyebrow")}`}
              title={t("timeline.title")}
            />
          </Reveal>
          <TrackRecordTimeline
            events={timelineEvents.map((event) => ({
              year: event.year,
              title: t(event.titleKey),
              description: t(event.descriptionKey),
            }))}
          />
        </Container>
      </section>

      <CtaPanel
        title={t("cta.title")}
        subtitle={t("cta.description")}
        buttonLabel={t("cta.button")}
      />
    </>
  );
}
