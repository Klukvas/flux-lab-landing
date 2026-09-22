import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { LOGO_URL, organizationReference } from "@/lib/structured-data";
import type { BlogPostMeta } from "@/types";
import { JsonLdScript } from "./json-ld-script";

interface ArticleJsonLdProps {
  readonly post: BlogPostMeta;
}

function toAbsoluteUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const url = `${SITE_URL}/${post.locale}/blog/${post.slug}`;
  const author =
    post.author === SITE_NAME
      ? organizationReference
      : { "@type": "Person", name: post.author };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author,
    publisher: {
      ...organizationReference,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: toAbsoluteUrl(post.image ?? "/og-default.png"),
    keywords: post.tags.join(", "),
    wordCount: post.readingTime * 200,
    inLanguage: post.locale === "uk" ? "uk-UA" : "en-US",
  };

  return <JsonLdScript data={schema} />;
}
