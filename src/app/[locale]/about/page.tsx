import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Container,
  SectionHeading,
  Card,
  Button,
  AnimatedSection,
} from "@/components/ui";
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
    title: t("title"),
    description: t("subtitle"),
    path: "/about",
    locale,
  });
}

export default async function AboutPage() {
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
    { value: String(STATS.projects), label: t("stats.products") },
    { value: "46K+", label: t("stats.users") },
    { value: "800+", label: t("stats.companies") },
    { value: `${STATS.experience}+`, label: t("stats.years") },
  ];

  return (
    <>
      {/* Hero + Mission */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-brand">
              {t("title")}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("mission.title")}
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {t("mission.description")}
            </p>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-white p-5 text-center dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="text-2xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How We Work */}
      <AnimatedSection className="py-20">
        <Container>
          <SectionHeading title={t("values.title")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <span className="text-2xl font-bold text-brand">
                  {value.num}
                </span>
                <h3 className="mt-3 font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      {/* Track Record */}
      <AnimatedSection className="py-20">
        <Container>
          <SectionHeading title={t("timeline.title")} />
          <div className="mx-auto max-w-2xl">
            <div className="relative border-l-2 border-gray-200 pl-8 dark:border-gray-800">
              {timelineEvents.map((event) => (
                <div key={event.year} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white" />
                  <div className="text-sm font-bold text-brand">
                    {event.year}
                  </div>
                  <h3 className="mt-1 font-semibold text-foreground">
                    {t(event.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t(event.descriptionKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-gray-950 px-8 py-12 text-center dark:border-gray-800 dark:bg-white">
            <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl dark:text-gray-950">
              {t("cta.title")}
            </h2>
            <p className="mt-3 text-gray-400 dark:text-gray-500">
              {t("cta.description")}
            </p>
            <div className="mt-6">
              <Link href="/contact">
                <Button className="bg-white text-gray-950 hover:bg-gray-100 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900">
                  {t("cta.button")}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
