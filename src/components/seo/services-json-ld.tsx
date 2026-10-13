import { getTranslations } from "next-intl/server";
import { engagementModels } from "@/data/services";
import {
  organizationReference,
  targetMarketsSchema,
} from "@/lib/structured-data";
import { JsonLdScript } from "./json-ld-script";

interface ServicesJsonLdProps {
  readonly locale: string;
}

/** One Service node per engagement model. No offers: prices are quoted per project, not published. */
export async function ServicesJsonLd({ locale }: ServicesJsonLdProps) {
  const t = await getTranslations({ locale, namespace: "services.engagement" });

  const graph = {
    "@context": "https://schema.org",
    "@graph": engagementModels.map((model) => ({
      "@type": "Service",
      name: t(model.titleKey),
      description: t(model.descKey),
      serviceType: model.serviceType,
      provider: organizationReference,
      areaServed: targetMarketsSchema,
    })),
  };

  return <JsonLdScript data={graph} />;
}
