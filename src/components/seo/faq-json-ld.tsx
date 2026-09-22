import { JsonLdScript } from "./json-ld-script";

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

interface FaqJsonLdProps {
  readonly items: readonly FaqItem[];
}

export function FaqJsonLd({ items }: FaqJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLdScript data={schema} />;
}
