import { CountUp } from "@/components/ui";

export interface TrustMetric {
  readonly key: string;
  readonly value: number;
  /** Set to "" for an exact count; otherwise the figure is rounded to K+. */
  readonly suffix?: string;
  /** A year or a fixed number is shown as is rather than counted up. */
  readonly isStatic?: boolean;
  readonly label: string;
}

interface TrustMetricsProps {
  readonly metrics: readonly TrustMetric[];
}

/** The hero's proof: figures first, what they count underneath; a 2x2 block on wide screens. */
export function TrustMetrics({ metrics }: TrustMetricsProps) {
  return (
    <ul className="rise-in flex flex-wrap gap-x-8 gap-y-4 [--rise-delay:300ms] lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-6">
      {metrics.map((metric) => (
        <li key={metric.key} className="flex flex-col">
          <span className="text-2xl font-bold text-brand">
            {metric.isStatic ? (
              `${metric.value}${metric.suffix ?? ""}`
            ) : (
              <CountUp value={metric.value} suffix={metric.suffix} />
            )}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {metric.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
