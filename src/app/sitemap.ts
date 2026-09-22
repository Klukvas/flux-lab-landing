import type { MetadataRoute } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import { getProjectSlugs } from "@/data/projects";
import { getPositionIds } from "@/data/careers";
import { getBlogPosts } from "@/lib/mdx";
import { getLegalDocument } from "@/lib/legal";

const STATIC_PATHS = [
  "",
  "/projects",
  "/services",
  "/about",
  "/careers",
  "/contact",
] as const;

type SitemapEntry = MetadataRoute.Sitemap[number];

function localizedUrl(locale: Locale, path: string): string {
  return `${SITE_URL}/${locale}${path}`;
}

/**
 * lastModified is set only where content carries a real revision date. Stamping
 * every URL with the build time teaches Google to ignore lastmod altogether.
 */
function entry(locale: Locale, path: string, lastModified?: string): SitemapEntry {
  const languages = Object.fromEntries([
    ...locales.map((alternate) => [alternate, localizedUrl(alternate, path)]),
    ["x-default", localizedUrl(defaultLocale, path)],
  ]);

  return {
    url: localizedUrl(locale, path),
    ...(lastModified && { lastModified }),
    alternates: { languages },
  };
}

function blogEntries(locale: Locale): SitemapEntry[] {
  const posts = getBlogPosts(locale);
  const revisionDates = posts.map((post) => post.updated ?? post.date);
  const newestRevision = [...revisionDates].sort().at(-1);

  return [
    entry(locale, "/blog", newestRevision),
    ...posts.map((post) =>
      entry(locale, `/blog/${post.slug}`, post.updated ?? post.date),
    ),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    ...STATIC_PATHS.map((path) => entry(locale, path)),
    entry(
      locale,
      "/privacy",
      getLegalDocument(locale, "privacy-policy")?.updatedAt,
    ),
    ...getProjectSlugs().map((slug) => entry(locale, `/projects/${slug}`)),
    ...getPositionIds().map((id) => entry(locale, `/careers/${id}`)),
    ...blogEntries(locale),
  ]);
}
