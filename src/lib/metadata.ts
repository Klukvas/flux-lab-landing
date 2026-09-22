import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { SITE_NAME, SITE_URL } from "./constants";

/** Google trims snippets at roughly 155–160 characters; longer text ends mid-sentence. */
export const META_DESCRIPTION_MAX_LENGTH = 160;

/** Titles past about 60 characters get cut off in search results. */
export const TITLE_MAX_LENGTH = 60;

const BRAND_SUFFIX = ` | ${SITE_NAME}`;

/**
 * hreflang map for a path: one entry per locale that has the page, plus x-default,
 * which is English when it exists and otherwise the only version there is. Listing a
 * missing translation would point Google at a 404 and break the whole set.
 */
export function buildLanguageAlternates(
  path: string,
  availableLocales: readonly Locale[] = locales,
): Record<string, string> {
  const xDefaultLocale = availableLocales.includes(defaultLocale)
    ? defaultLocale
    : availableLocales[0];
  if (!xDefaultLocale) {
    return {};
  }
  return Object.fromEntries([
    ...availableLocales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
    ["x-default", `${SITE_URL}/${xDefaultLocale}${path}`],
  ]);
}

interface ArticleMetadata {
  readonly publishedTime: string;
  readonly modifiedTime?: string;
  readonly tags?: readonly string[];
}

interface GenerateMetadataParams {
  readonly title: string;
  readonly description: string;
  readonly path?: string;
  readonly image?: string;
  readonly locale?: string;
  /** Locales this page exists in; defaults to all. Blog posts can lack a translation. */
  readonly availableLocales?: readonly Locale[];
  readonly article?: ArticleMetadata;
}

/** Collapses whitespace and cuts at a word boundary so the snippet never ends mid-word. */
export function toMetaDescription(
  text: string,
  maxLength: number = META_DESCRIPTION_MAX_LENGTH,
): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }
  // One character is reserved for the ellipsis.
  const cut = normalized.slice(0, maxLength - 1);
  const endsOnWordBoundary = normalized[maxLength - 1] === " ";
  const lastSpace = cut.lastIndexOf(" ");
  const wholeWords =
    endsOnWordBoundary || lastSpace <= 0 ? cut : cut.slice(0, lastSpace);
  return `${wholeWords.replace(/[\s,.;:—–-]+$/, "")}…`;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  locale = "en",
  availableLocales,
  article,
}: GenerateMetadataParams): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const ogImage = image ?? "/og-default.png";
  // The brand suffix is dropped when the title already names the brand or when the
  // suffix would push it past what search results show; Google displays the site name
  // above the title anyway.
  const skipsBrand =
    title.includes(SITE_NAME) ||
    title.length + BRAND_SUFFIX.length > TITLE_MAX_LENGTH;
  const fullTitle = skipsBrand ? title : `${title}${BRAND_SUFFIX}`;
  const metaDescription = toMetaDescription(description);
  const openGraphLocale = locale === "uk" ? "uk_UA" : "en_US";

  const openGraphBase = {
    title: fullTitle,
    description: metaDescription,
    url,
    siteName: SITE_NAME,
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    locale: openGraphLocale,
  };

  return {
    title: skipsBrand ? { absolute: title } : title,
    description: metaDescription,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path, availableLocales),
    },
    openGraph: article
      ? {
          ...openGraphBase,
          type: "article",
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime ?? article.publishedTime,
          tags: article.tags ? [...article.tags] : undefined,
        }
      : { ...openGraphBase, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}
