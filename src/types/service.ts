export interface Service {
  readonly id: string;
  readonly icon: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly features: readonly string[];
}

export interface ProcessStep {
  readonly id: string;
  readonly titleKey: string;
  readonly icon: string;
  readonly order: number;
}
