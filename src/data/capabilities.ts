export type CapabilityColumnId = "product" | "engineering" | "platform";

export interface CapabilityColumn {
  readonly id: CapabilityColumnId;
  /** Keys of the rows' copy under home.capabilities.columns.<column>.items. */
  readonly items: readonly string[];
}

/** What the studio does, grouped the way a client thinks about it. Copy lives in the messages. */
export const capabilityColumns: readonly CapabilityColumn[] = [
  {
    id: "product",
    items: ["discovery", "flows", "design", "mvp", "ai", "analytics"],
  },
  {
    id: "engineering",
    items: ["frontend", "backend", "data", "apis", "multitenant", "realtime", "mobile"],
  },
  {
    id: "platform",
    items: ["cicd", "infra", "monitoring", "security", "audits", "payments"],
  },
] as const;
