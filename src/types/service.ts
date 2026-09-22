export interface Service {
  readonly id: string;
  readonly icon: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly features: readonly string[];
}

/** Message keys under services.engagement plus the numbers behind the "From $…" labels. */
export interface EngagementModel {
  readonly titleKey: string;
  readonly priceKey: string;
  readonly descKey: string;
  readonly serviceType: string;
  readonly minPriceUsd: number;
  /** Billing unit for recurring models; one-off projects have none. */
  readonly billingUnit?: string;
}

export interface ProcessStep {
  readonly id: string;
  readonly titleKey: string;
  readonly icon: string;
  readonly order: number;
}
