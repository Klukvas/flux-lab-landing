export const PLAYBOOK_WEEKS = 8;

export type PlaybookPhaseId = "discovery" | "build" | "hardening" | "launch";

export interface PlaybookPhase {
  readonly id: PlaybookPhaseId;
  readonly fromWeek: number;
  readonly toWeek: number;
}

/** The default MVP engagement, week by week; the copy lives under home.playbook.phases. */
export const playbookPhases: readonly PlaybookPhase[] = [
  { id: "discovery", fromWeek: 1, toWeek: 2 },
  { id: "build", fromWeek: 3, toWeek: 6 },
  { id: "hardening", fromWeek: 7, toWeek: 7 },
  { id: "launch", fromWeek: 8, toWeek: 8 },
] as const;
