import { describe, expect, it } from "vitest";
import { capabilityColumns } from "./capabilities";
import { CAPABILITY_ICONS } from "@/components/home/capability-icons";
import en from "@/i18n/messages/en.json";
import uk from "@/i18n/messages/uk.json";

describe("capabilityColumns", () => {
  it("keeps row ids unique within a column", () => {
    for (const column of capabilityColumns) {
      expect(new Set(column.items).size).toBe(column.items.length);
    }
  });

  it("has copy in both languages and an icon for every row", () => {
    for (const column of capabilityColumns) {
      for (const messages of [en, uk]) {
        const copy = messages.home.capabilities.columns[column.id];
        expect(copy.title).toBeTruthy();
        expect(copy.summary).toBeTruthy();
        for (const item of column.items) {
          expect(copy.items[item as keyof typeof copy.items], `${column.id}.${item}`).toBeTruthy();
        }
      }
      for (const item of column.items) {
        expect(CAPABILITY_ICONS[item], `icon for ${item}`).toBeDefined();
      }
    }
  });
});
