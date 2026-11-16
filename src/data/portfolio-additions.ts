import type { Project } from "@/types";

/** Source-grounded products without a published screenshot case study. */
export const portfolioAdditions: readonly Project[] = [
  {
    slug: "receiptmaster",
    name: "ReceiptMaster",
    tagline: "Orders, Documents & Analytics",
    description:
      "Products, customers and orders in one workspace, with PDF documents (waybills, quotes, invoices, acts and packing lists) made in a few clicks.",
    overview:
      "ReceiptMaster is a workspace for a small business that sells: keep products with purchase and sale prices and stock levels, keep customers with their order history, move orders from draft to confirmed and track payment. For a confirmed order it makes PDF documents with the company's details in the background: waybills in 15 templates, plus quotes, invoices, acts of completed work, non-fiscal sales receipts, packing lists and return notes, in English, Ukrainian or Russian. A Telegram bot lets customers browse products, fill a cart and confirm an order in the chat, and analytics show revenue, order status and turnover with CSV export.",
    challenge: "",
    solution: "",
    targetAudience:
      "Small businesses and online sellers that take orders and need proper documents for them without an accounting system.",
    status: "active",
    tags: ["Web App", "SaaS"],
    techStack: [
      "React",
      "Vite",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Playwright",
      "Docker",
    ],
    features: [
      {
        title: "PDF documents",
        description:
          "Waybills in 15 templates, quotes, invoices, acts, sales receipts, packing lists and return notes, made in the background with your company details.",
        icon: "",
      },
      {
        title: "Orders and payments",
        description:
          "Draft, confirmed and cancelled orders with payment tracking, filters and safe retries that never create duplicates.",
        icon: "",
      },
      {
        title: "Products and stock",
        description:
          "Purchase and sale prices, margin at a glance and low-stock alerts.",
        icon: "",
      },
      {
        title: "Telegram sales bot",
        description:
          "Customers browse, fill a cart and confirm an order in Telegram; new customers are added automatically.",
        icon: "",
      },
      {
        title: "Analytics",
        description:
          "Revenue charts, order status breakdown, turnover by product and customer, CSV export for any date range.",
        icon: "",
      },
    ],
    highlights: [],
    integrations: ["Telegram"],
    screenshots: [],
    catalog: {
      audience: "Small businesses and online sellers",
      stats: [
        { value: "755+", label: "Businesses use it" },
        { value: "15", label: "Waybill templates" },
        { value: "7", label: "Document types" },
        { value: "Free", label: "To start" },
      ],
      motif: {
        kind: "receipt",
        title: "Receipt #2024-000847",
        lines: [
          { label: "Laptop Stand Pro", amount: "₴ 1 200" },
          { label: "USB-C Hub × 2", amount: "₴ 860" },
          { label: "Mechanical Keyboard", amount: "₴ 2 400" },
        ],
        totalLabel: "Total",
        total: "₴ 4 460",
      },
    },
    color: "#6d5df5",
    icon: "RM",
    url: "https://receiptmaster.org",
    featured: false,
    launchDate: "",
  },
  {
    slug: "lifespan",
    name: "LifeSpan",
    tagline: "Your Life, Visualized",
    description:
      "A personal life timeline for days, moods, chapters and memories.",
    overview:
      "LifeSpan helps people see their life as a timeline: record days and moods, organize chapters, and keep memories in context. The product is in development.",
    challenge: "",
    solution: "",
    targetAudience: "",
    status: "in-development",
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
    slug: "fluxkit",
    name: "FluxKit",
    tagline: "White-Label Online Store Template",
    description:
      "An online store with a catalog, cart, checkout, delivery and admin panel as a solid core, dressed in each client's design and switched-on features.",
    overview:
      "FluxKit is the online store we adapt for a client instead of building one from scratch. The core is the same for every shop: a catalog with variants and filterable attributes, prices and stock per variant, a cart for guests and signed-in customers, a checkout that reserves stock, customer accounts and order history, delivery methods, and an admin panel with roles. The design lives in tokens, so a redesign changes tokens rather than components, and optional features are separate modules switched on per client. The live demo is a coffee-shop supplies store in Ukrainian and English.",
    challenge: "",
    solution: "",
    targetAudience:
      "Shops that want their own online store in their own brand, launched on a tested base rather than built from scratch.",
    status: "active",
    tags: ["Web App", "E-Commerce", "Template"],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Meilisearch",
      "Docker",
    ],
    features: [
      {
        title: "Catalog with variants",
        description:
          "Products, variants and attributes defined per product type, with brands, a category tree and filters.",
        icon: "",
      },
      {
        title: "Cart and checkout",
        description:
          "Guest and customer carts, server-side totals and a checkout that reserves stock for every line at once.",
        icon: "",
      },
      {
        title: "Delivery methods",
        description:
          "Courier, pickup point and store pickup with flat, free-over or tiered prices, managed in the admin.",
        icon: "",
      },
      {
        title: "Admin with roles",
        description:
          "Catalog, orders, shipping, customers and users for owners, managers and viewers.",
        icon: "",
      },
      {
        title: "Design by tokens",
        description:
          "A client's brand is a new set of design tokens; optional features switch on per shop.",
        icon: "",
      },
    ],
    highlights: [],
    integrations: [],
    screenshots: [],
    catalog: {
      audience: "Shops that want their own store in their own brand",
      stats: [
        { value: "25", label: "Stores launched on it" },
        { value: "2 weeks", label: "To launch a store" },
        { value: "White label", label: "Your brand through design tokens" },
        { value: "2", label: "Languages out of the box: UK / EN" },
      ],
      motif: {
        kind: "product",
        brand: "Siropia",
        name: "Drink syrup — Caramel",
        price: "from ₴139.00",
        stock: "In stock",
        action: "Choose an option",
      },
    },
    color: "#e0644f",
    icon: "FK",
    url: "https://fluxkitcore.com",
    featured: false,
    launchDate: "",
  },
];
