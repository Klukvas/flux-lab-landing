import { serializeJsonLd } from "@/lib/structured-data";

interface JsonLdScriptProps {
  readonly data: object;
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
