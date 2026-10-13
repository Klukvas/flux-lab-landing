import { Card } from "@/components/ui";

interface EngagementModelCardProps {
  readonly title: string;
  readonly price: string;
  readonly description: string;
}

export function EngagementModelCard({
  title,
  price,
  description,
}: EngagementModelCardProps) {
  return (
    <Card className="flex flex-col">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-2 text-2xl font-bold text-foreground">{price}</div>
      <p className="mt-4 flex-1 text-gray-500 dark:text-gray-400">{description}</p>
    </Card>
  );
}
