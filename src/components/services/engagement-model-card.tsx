import { Card } from "@/components/ui";

interface EngagementModelCardProps {
  readonly title: string;
  /** A short "best for" line; the home teaser omits it. */
  readonly fit?: string;
  readonly description: string;
}

export function EngagementModelCard({ title, fit, description }: EngagementModelCardProps) {
  return (
    <Card className="flex flex-col">
      {fit && (
        <div className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-brand">
          {fit}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 flex-1 text-gray-500 dark:text-gray-400">{description}</p>
    </Card>
  );
}
