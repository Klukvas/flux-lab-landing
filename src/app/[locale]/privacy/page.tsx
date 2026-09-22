import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui";
import { BlogContent } from "@/components/blog/blog-content";
import { CookieSettingsButton } from "@/components/analytics";
import { getLegalDocument } from "@/lib/legal";
import { generatePageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

const PRIVACY_POLICY_SLUG = "privacy-policy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const policy = getLegalDocument(locale, PRIVACY_POLICY_SLUG);
  if (!policy) return {};

  return generatePageMetadata({
    title: policy.title,
    description: policy.description,
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const policy = getLegalDocument(locale, PRIVACY_POLICY_SLUG);

  if (!policy) {
    notFound();
  }

  const t = await getTranslations("privacy");

  return (
    <article className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <header className="mb-12">
            <p className="text-sm font-medium uppercase tracking-widest text-brand">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
              {policy.title}
            </h1>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {t("updated")}{" "}
              <time dateTime={policy.updatedAt}>
                {formatDate(policy.updatedAt, locale)}
              </time>
            </p>
          </header>

          <BlogContent content={policy.content} />

          <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <h2 className="text-lg font-bold text-foreground">
              {t("cookieSettings.title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {t("cookieSettings.description")}
            </p>
            <CookieSettingsButton className="mt-4 text-sm font-medium text-brand underline" />
          </section>
        </div>
      </Container>
    </article>
  );
}
