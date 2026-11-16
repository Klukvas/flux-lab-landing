import type { Project } from "@/types";

/** Source-grounded products without a published screenshot case study. */
export const portfolioAdditions: readonly Project[] = [
  {
    slug: "market",
    name: "Market",
    tagline: "Orders, Receipts & Analytics",
    description:
      "ReceiptMaster brings products, orders, PDF receipts and sales analytics into one workspace.",
    overview:
      "Market is the ReceiptMaster application for managing products and orders, creating PDF receipts and reviewing sales analytics. Receipt design includes Standard, Compact and Thermal templates.",
    challenge: "",
    solution: "",
    targetAudience: "",
    status: "active",
    tags: ["Web App", "SaaS"],
    techStack: [],
    features: [
      {
        title: "Products and orders",
        description: "Manage the catalog and customer orders in one workspace.",
        icon: "",
      },
      {
        title: "PDF receipts",
        description:
          "Create receipts with Standard, Compact and Thermal templates.",
        icon: "",
      },
      {
        title: "Sales analytics",
        description: "Review order and sales information.",
        icon: "",
      },
    ],
    highlights: [],
    integrations: [],
    screenshots: [],
    catalog: {
      stats: [],
      motif: {
        kind: "receipt",
        title: "Receipt #1042",
        lines: [
          { label: "Espresso beans, 1 kg", amount: "$24.00" },
          { label: "Paper filters ×100", amount: "$6.50" },
        ],
        totalLabel: "Total",
        total: "$30.50",
      },
    },
    color: "#8755F6",
    icon: "MA",
    featured: false,
    launchDate: "",
  },
  {
    slug: "lifespan",
    name: "LifeSpan",
    tagline: "Your Life, Visualized",
    description:
      "A personal life timeline for days, moods, chapters and memories. Currently in beta.",
    overview:
      "LifeSpan helps people see their life as a timeline: record days and moods, organize chapters, and keep memories in context. The product is in beta.",
    challenge: "",
    solution: "",
    targetAudience: "",
    status: "beta",
    tags: ["Web App", "Personal"],
    techStack: [],
    features: [
      {
        title: "Your timeline",
        description: "See days and memories in the context of your life.",
        icon: "",
      },
      {
        title: "Moods",
        description: "Record how a day felt.",
        icon: "",
      },
      {
        title: "Chapters",
        description: "Organize meaningful periods and events.",
        icon: "",
      },
    ],
    highlights: [],
    integrations: [],
    screenshots: [],
    catalog: {
      audience: "Anyone who wants to see their life as a timeline",
      stats: [],
      motif: { kind: "days", caption: "Chapter · Moving to Lviv" },
    },
    color: "#12d9ba",
    icon: "LI",
    featured: false,
    launchDate: "",
  },
  {
    slug: "efluxcom",
    name: "EFluxCom",
    tagline: "Product in development",
    description: "A product currently in development.",
    overview:
      "EFluxCom is currently in development. Further product details will be shared when they are ready.",
    challenge: "",
    solution: "",
    targetAudience: "",
    status: "in-development",
    tags: ["E-Commerce"],
    techStack: [],
    features: [],
    highlights: [],
    integrations: [],
    screenshots: [],
    color: "#7B6EF6",
    icon: "EF",
    featured: false,
    launchDate: "",
  },
];
