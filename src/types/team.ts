export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly avatar: string;
  readonly social: {
    readonly github?: string;
    readonly linkedin?: string;
    readonly twitter?: string;
  };
}

export interface TimelineEvent {
  readonly year: number;
  readonly titleKey: string;
  readonly descriptionKey: string;
}
