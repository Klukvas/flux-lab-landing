import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { CareerPosition } from '@/types';
import { Card, Badge } from '@/components/ui';

interface PositionCardProps {
  readonly position: CareerPosition;
}

export function PositionCard({ position }: PositionCardProps) {
  const t = useTranslations('careers');

  return (
    <Card hover>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {position.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {position.department} · {position.location}
            </p>
          </div>
          <Badge>{position.type}</Badge>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {position.description}
        </p>
        <Link
          href={`/careers/${position.id}`}
          className="inline-flex items-center text-sm font-medium text-foreground transition-colors hover:opacity-70"
        >
          {t('apply')}
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </Card>
  );
}
