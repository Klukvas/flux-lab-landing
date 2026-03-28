import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { BlogPostMeta } from "@/types";

interface ArticleJsonLdProps {
  readonly post: BlogPostMeta;
}

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${post.locale}/blog/${post.slug}`,
    },
    image: post.image ?? `${SITE_URL}/og-default.png`,
    keywords: post.tags.join(", "),
    wordCount: post.readingTime * 200,
    inLanguage: post.locale === "uk" ? "uk-UA" : "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
