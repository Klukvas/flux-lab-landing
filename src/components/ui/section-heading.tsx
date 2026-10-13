import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  /** A small mono line above the title, e.g. a section number and name. */
  readonly eyebrow?: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly className?: string;
  readonly align?: 'left' | 'center';
  readonly gradient?: boolean;
  /** h1 when the heading opens a page, h2 for sections within one. */
  readonly as?: 'h1' | 'h2';
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = 'center',
  gradient = false,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-widest text-brand">
          {eyebrow}
        </span>
      )}
      <Heading
        className={cn(
          'text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl',
          gradient && 'gradient-text'
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
