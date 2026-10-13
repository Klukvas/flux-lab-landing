import { useTranslations } from "next-intl";
import type { Service } from "@/types";
import { Card } from "@/components/ui";
import { CAPABILITY_ICONS } from "@/components/home/capability-icons";

const featuresKeyMap: Record<string, string> = {
  outsourcing: "services.outsourcingFeatures",
  consulting: "services.consultingFeatures",
  custom: "services.customFeatures",
};

function getTranslatedFeatures(
  t: ReturnType<typeof useTranslations>,
  service: Service,
): readonly string[] {
  const key = featuresKeyMap[service.id];
  if (!key) {
    return service.features;
  }
  try {
    const translated: unknown = t.raw(key);
    if (Array.isArray(translated) && translated.length > 0) {
      return translated as string[];
    }
    return service.features;
  } catch {
    return service.features;
  }
}

interface ServiceCardProps {
  readonly service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations();
  const features = getTranslatedFeatures(t, service);

  return (
    <Card hover className="h-full">
      <div className="flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 text-brand dark:border-gray-800">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {CAPABILITY_ICONS[service.icon]}
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          {t(service.titleKey)}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          {t(service.descriptionKey)}
        </p>
        <ul className="mt-auto space-y-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <svg
                className="h-4 w-4 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
