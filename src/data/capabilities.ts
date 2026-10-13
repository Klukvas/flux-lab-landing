export type CapabilityColumnId = "product" | "engineering" | "platform";

export interface Capability {
  /** Key of the row's copy under home.capabilities.columns.<column>.items. */
  readonly id: string;
  /** Case studies that show this capability in production; shown as monograms on the row. */
  readonly proof: readonly string[];
}

export interface CapabilityColumn {
  readonly id: CapabilityColumnId;
  readonly items: readonly Capability[];
}

/** What the studio does, with the products that prove it. Copy lives in the messages. */
export const capabilityColumns: readonly CapabilityColumn[] = [
  {
    id: "product",
    items: [
      { id: "discovery", proof: [] },
      { id: "flows", proof: [] },
      { id: "design", proof: ["autoflow", "washflow"] },
      { id: "mvp", proof: ["fluxradar", "jobber"] },
      { id: "ai", proof: ["fluxradar", "jobber"] },
      { id: "analytics", proof: ["fluxradar", "market"] },
    ],
  },
  {
    id: "engineering",
    items: [
      { id: "frontend", proof: ["fluxradar", "jobber", "autoflow"] },
      { id: "backend", proof: ["washflow", "jobber", "accounting"] },
      { id: "data", proof: ["washflow", "accounting", "market"] },
      { id: "apis", proof: ["fluxradar", "autoflow", "accounting"] },
      { id: "multitenant", proof: ["washflow", "market"] },
      { id: "realtime", proof: ["washflow", "efluxcom"] },
      { id: "mobile", proof: ["lifespan"] },
    ],
  },
  {
    id: "platform",
    items: [
      { id: "cicd", proof: ["autoflow", "fluxradar"] },
      { id: "infra", proof: ["fluxradar", "washflow", "jobber"] },
      { id: "monitoring", proof: ["washflow"] },
      { id: "security", proof: ["fluxradar"] },
      { id: "audits", proof: ["fluxradar"] },
      { id: "payments", proof: ["washflow", "accounting", "fluxradar"] },
    ],
  },
] as const;
