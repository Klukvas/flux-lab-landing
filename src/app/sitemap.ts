import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getProjectSlugs } from "@/data/projects";
import { getAllBlogSlugs } from "@/lib/mdx";

const BASE_URL = "https://fluxlab.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/projects",
    "/services",
    "/blog",
    "/about",
    "/careers",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }

    for (const slug of getProjectSlugs()) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const slug of getAllBlogSlugs(locale)) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
