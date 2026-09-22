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

/** One Service node per engagement model, priced with the same "from" figures the page shows. */
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
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": model.billingUnit
            ? "UnitPriceSpecification"
            : "PriceSpecification",
          minPrice: model.minPriceUsd,
          priceCurrency: "USD",
          ...(model.billingUnit && { unitText: model.billingUnit }),
        },
      },
    })),
  };

  return <JsonLdScript data={graph} />;
}
