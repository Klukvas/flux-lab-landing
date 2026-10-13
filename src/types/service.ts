export interface Service {
  readonly id: string;
  readonly icon: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly features: readonly string[];
}

/** Message keys under services.engagement; prices are discussed on a call, not published. */
export interface EngagementModel {
  readonly titleKey: string;
  readonly descKey: string;
  readonly serviceType: string;
}

export interface ProcessStep {
  readonly id: string;
  readonly titleKey: string;
  readonly icon: string;
  readonly order: number;
}
