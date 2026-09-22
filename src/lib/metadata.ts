import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";

/** Google trims snippets at roughly 155–160 characters; longer text ends mid-sentence. */
export const META_DESCRIPTION_MAX_LENGTH = 160;

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
  article,
}: GenerateMetadataParams): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const ogImage = image ?? "/og-default.png";
  // Titles that already name the brand ("… at fluxLab.dev") skip the " | fluxLab.dev" suffix.
  const hasBrand = title.includes(SITE_NAME);
  const fullTitle = hasBrand ? title : `${title} | ${SITE_NAME}`;
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
    title: hasBrand ? { absolute: title } : title,
    description: metaDescription,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${path}`,
        uk: `${SITE_URL}/uk${path}`,
        "x-default": `${SITE_URL}/en${path}`,
      },
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
