import { describe, expect, it } from "vitest";
import { PLAYBOOK_WEEKS, playbookPhases } from "./playbook";

describe("playbookPhases", () => {
  it("covers every week once, in order, from the first to the last", () => {
    expect(playbookPhases[0].fromWeek).toBe(1);
    expect(playbookPhases[playbookPhases.length - 1].toWeek).toBe(PLAYBOOK_WEEKS);
    for (let i = 1; i < playbookPhases.length; i += 1) {
      expect(playbookPhases[i].fromWeek).toBe(playbookPhases[i - 1].toWeek + 1);
    }
    for (const phase of playbookPhases) {
      expect(phase.toWeek).toBeGreaterThanOrEqual(phase.fromWeek);
    }
  });
});
