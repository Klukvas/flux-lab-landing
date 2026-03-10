import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Badge, Card } from "@/components/ui";
import { ApplicationForm } from "@/components/careers/application-form";
import { getPositionById, getAllPositions } from "@/data/careers";
import { generatePageMetadata } from "@/lib/metadata";
import { locales } from "@/i18n/config";

export async function generateStaticParams() {
  const positions = getAllPositions();
  return locales.flatMap((locale) =>
    positions.map((pos) => ({ locale, id: pos.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const position = getPositionById(id);
  if (!position) return {};

  return generatePageMetadata({
    title: position.title,
    description: position.description,
    path: `/careers/${id}`,
    locale,
  });
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const position = getPositionById(id);

  if (!position) {
    notFound();
  }

  const t = await getTranslations("careers");

  return (
    <section className="py-24">
      <Container>
        <div className="mb-8">
          <Link
            href="/careers"
            className="inline-flex items-center text-sm text-gray-500 hover:text-foreground dark:text-gray-400 dark:hover:text-foreground transition-colors"
          >
            <svg
              className="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            {t("title")}
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                {position.title}
              </h1>
              <Badge>{position.type}</Badge>
            </div>

            <div className="mb-8 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
                {position.department}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {position.location}
              </span>
            </div>

            <div className="prose prose-gray max-w-none dark:prose-invert">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {position.description}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-foreground">
                {t("requirements")}
              </h2>
              <ul className="mt-4 space-y-3">
                {position.requirements.map((req) => (
                  <li
                    key={req}
                    className="flex items-start gap-3 text-gray-500 dark:text-gray-400"
                  >
                    <svg
                      className="mt-1 h-5 w-5 flex-shrink-0 text-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-foreground">
                {t("benefits")}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {position.benefits.map((benefit) => (
                  <Card key={benefit} className="p-4">
                    <div className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 text-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t("apply")}
                </h3>
                <ApplicationForm />
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
