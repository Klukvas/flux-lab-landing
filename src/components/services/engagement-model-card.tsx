import { Card } from "@/components/ui";

interface EngagementModelCardProps {
  readonly title: string;
  readonly description: string;
}

export function EngagementModelCard({ title, description }: EngagementModelCardProps) {
  return (
    <Card className="flex flex-col">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 flex-1 text-gray-500 dark:text-gray-400">{description}</p>
    </Card>
  );
}
