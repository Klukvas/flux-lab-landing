import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    // One group covers every crawler, AI search bots included. A crawler that finds a
    // group with its own name ignores the "*" group, so named groups would quietly
    // drop any rule added here later.
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
