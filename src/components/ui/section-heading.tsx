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
  const isPageTitle = Heading === 'h1';

  return (
    <div
      className={cn(
        // The dot field runs behind every page, so headings keep calm ground under them.
        'clearing mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'mb-3 block font-mono text-xs font-medium uppercase tracking-widest text-brand',
            isPageTitle && 'rise-in'
          )}
        >
          {eyebrow}
        </span>
      )}
      <Heading
        className={cn(
          'text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl',
          gradient && 'gradient-text',
          // Rises with CSS from first paint; a Motion fade would hold the page's largest text until hydration.
          isPageTitle && 'rise-in [--rise-delay:60ms]'
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg text-gray-500 dark:text-gray-400',
            isPageTitle && 'rise-in [--rise-delay:140ms]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
