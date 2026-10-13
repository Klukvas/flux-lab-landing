import { CountUp, RevealGroup, RevealItem } from "@/components/ui";

export interface TrustMetric {
  readonly key: string;
  readonly value: number;
  /** Set to "" for an exact count; otherwise the figure is rounded to K+. */
  readonly suffix?: string;
  readonly label: string;
}

interface TrustMetricsProps {
  readonly metrics: readonly TrustMetric[];
}

export function TrustMetrics({ metrics }: TrustMetricsProps) {
  return (
    <RevealGroup className="grid grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <RevealItem
          key={metric.key}
          className="rounded-xl border border-gray-200 bg-white p-5 text-center dark:border-gray-800 dark:bg-gray-950"
        >
          <div className="text-2xl font-bold text-brand sm:text-3xl">
            <CountUp value={metric.value} suffix={metric.suffix} />
          </div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {metric.label}
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
