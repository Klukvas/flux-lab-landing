import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Container,
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
    { title: t("values.quality"), description: t("values.qualityDesc"), num: "01" },
    { title: t("values.innovation"), description: t("values.innovationDesc"), num: "02" },
    { title: t("values.transparency"), description: t("values.transparencyDesc"), num: "03" },
    { title: t("values.growth"), description: t("values.growthDesc"), num: "04" },
  ];

  const stats = [
    { value: "46K+", label: t("stats.users") },
    { value: "800+", label: t("stats.companies") },
    { value: `${STATS.experience}+`, label: t("stats.years") },
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
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("mission.title")}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                {t("mission.description")}
              </p>
            </div>

            {/* Right — stats */}
            <div className="lg:col-span-2">
              <div className="grid gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-950"
                  >
                    <span className="text-3xl font-bold tracking-tight text-brand">
                      {stat.value}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How We Work — 2×2 bento */}
      <AnimatedSection className="py-16">
        <Container>
          <p className="text-sm font-medium uppercase tracking-widest text-brand">
            {t("values.title")}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-brand/30 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-brand/30"
              >
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
            ))}
          </div>
        </Container>
      </AnimatedSection>

      {/* Track Record — horizontal cards */}
      <AnimatedSection className="py-16">
        <Container>
          <p className="text-sm font-medium uppercase tracking-widest text-brand">
            {t("timeline.title")}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {timelineEvents.map((event, idx) => (
              <div
                key={event.year}
                className={`rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 ${
                  idx === timelineEvents.length - 1
                    ? "border-brand/40 ring-1 ring-brand/20 dark:border-brand/40"
                    : ""
                }`}
              >
                <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                  {event.year}
                </span>
                <h3 className="mt-3 font-bold text-foreground">
                  {t(event.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {t(event.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-brand/20 bg-gray-950 px-8 py-14 text-center dark:bg-white sm:px-16">
            {/* Glow decoration */}
            <div
              className="absolute -left-20 -top-20 h-60 w-60 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: '#7B6EF6' }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full opacity-10 blur-3xl"
              style={{ backgroundColor: '#7B6EF6' }}
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl dark:text-gray-950">
                {t("cta.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-gray-400 dark:text-gray-500">
                {t("cta.description")}
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-white text-gray-950 hover:bg-gray-100 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900">
                    {t("cta.button")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
