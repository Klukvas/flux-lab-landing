import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly className?: string;
  readonly align?: 'left' | 'center';
  readonly gradient?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = 'center',
  gradient = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2
        className={cn(
          'text-3xl font-bold tracking-tighter text-foreground sm:text-4xl lg:text-5xl',
          gradient && 'gradient-text'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
