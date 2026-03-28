import { SITE_URL } from "@/lib/constants";

interface BreadcrumbItem {
  readonly name: string;
  readonly path: string;
}

interface BreadcrumbJsonLdProps {
  readonly items: readonly BreadcrumbItem[];
  readonly locale: string;
}

export function BreadcrumbJsonLd({ items, locale }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
