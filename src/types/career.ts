export interface CareerPosition {
  readonly id: string;
  readonly title: string;
  readonly department: string;
  readonly location: string;
  readonly type: 'full-time' | 'part-time' | 'contract';
  readonly description: string;
  readonly requirements: readonly string[];
  readonly benefits: readonly string[];
}
