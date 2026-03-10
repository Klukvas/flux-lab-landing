import { useTranslations } from 'next-intl';
import type { Service } from '@/types';
import { Card } from '@/components/ui';

interface ServiceCardProps {
  readonly service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations();

  return (
    <Card hover className="h-full">
      <div className="flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800">
          <svg className="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          {t(service.titleKey)}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t(service.descriptionKey)}
        </p>
        <ul className="mt-auto space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
