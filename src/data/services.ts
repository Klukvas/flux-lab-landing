import type { Service, EngagementModel } from "@/types";

export const services: readonly Service[] = [
  {
    id: "outsourcing",
    icon: "multitenant",
    titleKey: "services.outsourcing.title",
    descriptionKey: "services.outsourcing.description",
    features: [
      "Dedicated development teams",
      "Flexible scaling",
      "Seamless integration",
      "Regular reporting",
    ],
  },
  {
    id: "consulting",
    icon: "discovery",
    titleKey: "services.consulting.title",
    descriptionKey: "services.consulting.description",
    features: [
      "Architecture review",
      "Technology assessment",
      "Performance audit",
      "Security analysis",
    ],
  },
  {
    id: "custom",
    icon: "mvp",
    titleKey: "services.custom.title",
    descriptionKey: "services.custom.description",
    features: [
      "Full-stack development",
      "Mobile applications",
      "API development",
      "Cloud infrastructure",
    ],
  },
] as const;

export const engagementModels: readonly EngagementModel[] = [
  {
    titleKey: "dedicatedTeam",
    descKey: "dedicatedTeamDesc",
    fitKey: "dedicatedTeamFit",
    serviceType: "Dedicated development team",
  },
  {
    titleKey: "projectBased",
    descKey: "projectBasedDesc",
    fitKey: "projectBasedFit",
    serviceType: "Custom software development",
  },
  {
    titleKey: "staffAug",
    descKey: "staffAugDesc",
    fitKey: "staffAugFit",
    serviceType: "Staff augmentation",
  },
] as const;
