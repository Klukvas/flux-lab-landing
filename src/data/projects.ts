import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    slug: "efluxcom",
    name: "EFluxCom",
    tagline: "Smart Energy Management Platform",
    description:
      "A comprehensive energy management system for monitoring, analyzing, and optimizing power consumption across commercial and residential properties.",
    overview:
      "EFluxCom was born from a simple observation: most building managers have no real-time visibility into their energy usage. Our platform connects directly to smart meters, IoT sensors, and building management systems to provide a unified dashboard. Operators can track consumption down to individual circuits, set automated alerts for anomalies, and generate compliance reports with a single click. The AI engine analyzes historical patterns and weather data to forecast demand and recommend load-shifting strategies that cut costs by up to 30%.",
    challenge:
      "Commercial buildings waste up to 40% of their energy due to inefficient HVAC schedules, phantom loads, and lack of granular monitoring. Existing solutions were either too expensive for mid-size properties or too simplistic to provide actionable insights.",
    solution:
      "We built a modular platform that scales from a single office to a multi-site portfolio. Edge gateways aggregate data from heterogeneous sensors and push it to our cloud pipeline in real time. Machine learning models detect waste patterns automatically, and the recommendation engine suggests concrete actions with projected savings.",
    targetAudience:
      "Property managers, facility operators, and sustainability teams at commercial buildings, retail chains, and residential complexes.",
    status: "active",
    tags: ["Web App", "IoT", "SaaS"],
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
    ],
    features: [
      {
        title: "Real-time Monitoring",
        description:
          "Live energy consumption dashboards with customizable widgets and per-circuit granularity",
        icon: "",
      },
      {
        title: "Smart Analytics",
        description:
          "AI-powered consumption patterns, anomaly detection, and cost optimization suggestions",
        icon: "",
      },
      {
        title: "Device Integration",
        description:
          "Connect and manage IoT devices across multiple locations via MQTT and Modbus protocols",
        icon: "",
      },
      {
        title: "Automated Reports",
        description:
          "Scheduled energy reports with PDF export, email delivery, and regulatory compliance templates",
        icon: "",
      },
    ],
    highlights: [
      { label: "Avg. Energy Savings", value: "27%" },
      { label: "Devices Connected", value: "18K+" },
      { label: "Data Points / Day", value: "50M+" },
      { label: "Uptime", value: "99.97%" },
    ],
    integrations: [
      "Siemens BMS",
      "Schneider Electric",
      "Honeywell",
      "Google Nest",
      "AWS IoT Core",
      "Zapier",
    ],
    screenshots: [],
    color: "#22c55e",
    icon: "EF",
    url: "https://efluxcom.com",
    featured: true,
    stats: { users: 12400, companies: 85 },
    launchDate: "2024-03",
  },
  {
    slug: "washflow",
    name: "WashFlow",
    tagline: "Laundry Business Management Suite",
    description:
      "An all-in-one management platform for laundry businesses. Handles orders, inventory, customer management, and delivery scheduling.",
    overview:
      "WashFlow digitizes every aspect of running a laundry or dry-cleaning business. From the moment a customer drops off an order to the final delivery, every step is tracked, timestamped, and visible to both staff and customers. The web dashboard gives owners full control over pricing, promotions, and employee schedules, while the mobile app lets drivers manage pickups and deliveries with optimized routes. Customers get real-time SMS and push notifications, plus a self-service portal to place orders and track progress.",
    challenge:
      "Most laundry businesses still run on paper tickets and spreadsheets. Orders get lost, delivery routes are inefficient, and owners have no visibility into real performance metrics. Off-the-shelf POS systems don't understand the unique workflow of garment care.",
    solution:
      "We built a purpose-built system with a barcode-driven workflow engine. Every garment gets a unique tag at intake. The routing algorithm considers traffic, time windows, and vehicle capacity to minimize delivery costs. An integrated CRM tracks customer preferences, auto-applies loyalty discounts, and sends targeted re-engagement campaigns.",
    targetAudience:
      "Laundry and dry-cleaning businesses of all sizes, from single-location shops to multi-branch chains with delivery fleets.",
    status: "active",
    tags: ["Web App", "SaaS", "Mobile"],
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "React Native",
      "Docker",
    ],
    features: [
      {
        title: "Order Management",
        description:
          "Track orders from pickup to delivery with barcode scanning and real-time status updates",
        icon: "",
      },
      {
        title: "Route Optimization",
        description:
          "Smart delivery routing that considers traffic, time windows, and vehicle capacity",
        icon: "",
      },
      {
        title: "Customer Portal",
        description:
          "Self-service portal and mobile app for customers to place orders, track progress, and manage payments",
        icon: "",
      },
      {
        title: "Inventory Tracking",
        description:
          "Real-time stock management for supplies and chemicals with automatic reorder alerts",
        icon: "",
      },
    ],
    highlights: [
      { label: "Orders Processed", value: "2.3M+" },
      { label: "Delivery Efficiency", value: "+35%" },
      { label: "Customer Retention", value: "89%" },
      { label: "Avg. Response Time", value: "<200ms" },
    ],
    integrations: [
      "Stripe",
      "Twilio SMS",
      "Google Maps",
      "QuickBooks",
      "Mailchimp",
      "Slack",
    ],
    screenshots: [],
    color: "#3b82f6",
    icon: "WF",
    url: "https://washflow.app",
    featured: true,
    stats: { users: 8700, companies: 120 },
    launchDate: "2024-05",
  },
  {
    slug: "accounting",
    name: "Accounting",
    tagline: "Modern Financial Management",
    description:
      "A streamlined accounting platform for small and medium businesses. Automates invoicing, expense tracking, and financial reporting.",
    overview:
      "Accounting was built for business owners who hate accounting software. The interface is clean and jargon-free: connect your bank, categorize transactions with a swipe, and generate professional invoices in seconds. Under the hood, a double-entry ledger maintains audit-ready books. The platform handles multi-currency operations, automatic tax calculations for Ukrainian and EU jurisdictions, and generates financial statements that accountants can export directly to 1C or BAS.",
    challenge:
      "Small businesses in Ukraine and Eastern Europe are stuck between oversimplified spreadsheet tools and heavyweight ERP systems designed for enterprises. They need something that handles local tax regulations while being intuitive enough for a non-accountant to use daily.",
    solution:
      "We created a layered architecture: the surface is dead simple — scan a receipt, confirm the category, done. Beneath it, proper accounting logic handles VAT calculations, currency conversions, and regulatory reporting. Bank synchronization pulls transactions automatically, and smart rules learn from past categorizations to auto-classify future entries.",
    targetAudience:
      "Small and medium businesses, freelancers, and startups in Ukraine and Eastern Europe needing compliant financial management without the complexity of enterprise ERP.",
    status: "active",
    tags: ["Web App", "FinTech", "SaaS"],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
    ],
    features: [
      {
        title: "Automated Invoicing",
        description:
          "Create, send, and track invoices with payment reminders, recurring schedules, and multi-currency support",
        icon: "",
      },
      {
        title: "Expense Management",
        description:
          "Categorize and track expenses with receipt scanning, smart rules, and bank synchronization",
        icon: "",
      },
      {
        title: "Financial Reports",
        description:
          "Generate profit & loss, balance sheet, cash flow, and tax summary reports with one click",
        icon: "",
      },
      {
        title: "Tax Compliance",
        description:
          "Automated VAT calculations, tax filing preparation, and export to 1C/BAS accounting systems",
        icon: "",
      },
    ],
    highlights: [
      { label: "Invoices Sent", value: "890K+" },
      { label: "Transactions / Month", value: "1.2M+" },
      { label: "Time Saved on Bookkeeping", value: "70%" },
      { label: "Tax Accuracy", value: "99.8%" },
    ],
    integrations: [
      "Monobank",
      "PrivatBank",
      "Stripe",
      "LiqPay",
      "1C",
      "Nova Poshta",
    ],
    screenshots: [],
    color: "#8b5cf6",
    icon: "AC",
    featured: true,
    stats: { users: 6200, companies: 340 },
    launchDate: "2024-06",
  },
  {
    slug: "jobber",
    name: "Jobber",
    tagline: "AI-Powered Job Application Tracker",
    description:
      "A personal job search management platform with AI-powered resume building, cover letter generation, application tracking, and recruitment analytics.",
    overview:
      "Jobber helps job seekers take control of their job search. Instead of juggling spreadsheets and browser tabs, users manage their entire pipeline in one place: save jobs from any website with a Chrome extension, track applications through customizable stages, build and tailor resumes with AI assistance, generate cover letters, and analyze their search performance with detailed analytics. The platform supports both list and Kanban board views, giving users flexibility in how they organize their pipeline.",
    challenge:
      "Job seekers lose track of applications across dozens of job boards and email threads. They have no visibility into their pipeline health — which stages have the highest drop-off, which resume versions perform best, or how long they've been waiting for responses. Manually tailoring resumes and cover letters for each application is time-consuming and inconsistent.",
    solution:
      "Jobber centralizes the entire job search workflow. A Chrome extension captures job postings with one click, AI parses job details automatically using a layered approach (JSON-LD, DOM extraction, Claude LLM). The built-in resume builder creates ATS-friendly resumes with AI-generated summaries and bullet points. Cover letters are generated and tailored per job. Analytics dashboards show funnel conversion rates, time-in-stage metrics, resume effectiveness comparisons, and application source performance.",
    targetAudience:
      "Software engineers, tech professionals, and active job seekers who want to organize, optimize, and accelerate their job search with AI-powered tools.",
    status: "active",
    tags: ["Web App", "SaaS", "AI"],
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Hetzner Cloud",
    ],
    features: [
      {
        title: "Application Tracking",
        description:
          "Track applications through customizable stages with list and Kanban board views, status filters, and sorting by activity",
        icon: "",
      },
      {
        title: "AI Resume Builder",
        description:
          "Build ATS-friendly resumes with AI-generated summaries, bullet point suggestions, and job-to-resume match scoring",
        icon: "",
      },
      {
        title: "Cover Letter Generation",
        description:
          "Generate and tailor cover letters for specific jobs with AI assistance, templates, and one-click improvements",
        icon: "",
      },
      {
        title: "Job Import & Chrome Extension",
        description:
          "Save jobs from any website with one click — AI automatically extracts title, company, location, and salary details",
        icon: "",
      },
      {
        title: "Company Management",
        description:
          "Organize companies with enriched statistics: application counts, activity status, and quick navigation to related applications",
        icon: "",
      },
      {
        title: "Analytics Dashboard",
        description:
          "Application funnel analysis, time-in-stage metrics, resume effectiveness comparison, and source performance tracking",
        icon: "",
      },
    ],
    highlights: [
      { label: "Applications Tracked", value: "48K+" },
      { label: "Resumes Built", value: "12K+" },
      { label: "AI Match Accuracy", value: "92%" },
      { label: "Avg. Response Time", value: "5 days" },
    ],
    integrations: [
      "Google Calendar",
      "Paddle",
      "Hetzner S3",
      "Claude AI",
      "Chrome Extension",
    ],
    screenshots: [
      {
        src: "/images/projects/01_applications_list.png",
        title: "Application Tracking — List View",
        description:
          "The central hub for managing your job search pipeline. Every application is displayed as a card showing the job title, company, role, current status, linked resume, and timestamps.",
        features: [
          "Color-coded status badges: Active, Offer, Rejected, On Hold, Archived",
          "Sort by Last Activity, Status, or Applied Date",
          "Toggle between List and Board views",
          "Each card shows linked resume and application/update dates",
        ],
      },
      {
        src: "/images/projects/02_applications_board.png",
        title: "Application Tracking — Kanban Board",
        description:
          "Visualize your pipeline as a Kanban board organized by status or interview stage. Drag-and-drop cards between columns to update application progress instantly.",
        features: [
          "Two board modes: By Status and By Stage",
          "Drag-and-drop with optimistic UI updates",
          "Column counts show pipeline distribution at a glance",
          "Same card details as list view — no context lost",
        ],
      },
      {
        src: "/images/projects/04_resumes.png",
        title: "Resume Management & AI Builder",
        description:
          "Manage multiple resume versions — both uploaded PDFs and resumes built directly in Jobber. The AI builder generates professional summaries and bullet points tailored to your experience.",
        features: [
          "Filter by All, Uploaded, or Built resumes",
          "Visual resume previews with live formatting",
          "Sort by Last Modified, Created Date, or Title",
          "Track which resumes are used in how many applications",
          "Active/Inactive status to manage resume versions",
        ],
      },
      {
        src: "/images/projects/05_companies.png",
        title: "Company Management",
        description:
          "Organize and track all companies you're applying to. Each card shows enriched statistics calculated from your applications — total count, active applications, last activity, and derived status.",
        features: [
          "Auto-derived company status: Idle, Active, Interviewing",
          "Total and active application counts per company",
          "Sort by Name, Last Activity, or Applications count",
          'Quick "View Applications" link to filtered application list',
          "Company location and notes for context",
        ],
      },
      {
        src: "/images/projects/06_jobs.png",
        title: "Job Board & Chrome Extension Import",
        description:
          "Browse and manage all saved job postings. Jobs can be added manually or imported from any website with one click using the Chrome extension — AI automatically parses job details.",
        features: [
          "Chrome extension banner: save jobs from any website",
          "Sort by Created Date, Job Title, or Company Name",
          "Each card shows company, source (LinkedIn, Referral, etc.), posting link, and application count",
          "View Posting links open the original job listing",
          "AI-powered parsing extracts title, company, location, and salary",
        ],
      },
      {
        src: "/images/projects/07_cover_letters.png",
        title: "AI Cover Letter Generation",
        description:
          "Create and manage cover letters tailored to specific jobs and companies. AI generates drafts based on the job description and your resume, which you can edit and refine.",
        features: [
          "Card-based gallery of all cover letters",
          "Each letter linked to a specific company",
          "AI generation with one-click improvements",
          "Edit timestamps to track latest versions",
          'Create new cover letters with the "+" button',
        ],
      },
      {
        src: "/images/projects/08_stages.png",
        title: "Customizable Interview Stage Templates",
        description:
          "Define your interview pipeline stages once, then reuse them across all applications. Recommended stages can be added with one click, or create custom stages that match your process.",
        features: [
          "Recommended stages: Applied, Phone Screen, Technical Interview, On-site, HR, Offer, Rejected",
          'One-click "Add All" to apply recommended stages',
          "Custom stage creation with ordering",
          "Edit and delete stages with confirmation",
          "Numbered sequence for clear pipeline visualization",
        ],
      },
      {
        src: "/images/projects/09_analytics_top.png",
        title: "Analytics Dashboard",
        description:
          "Get data-driven insights into your job search. The dashboard shows KPI cards, a visual application funnel with conversion rates, and additional reports for time-in-stage, resume effectiveness, and source performance.",
        features: [
          "KPI cards: Total Applications, Active, Closed, Response Rate, Avg. Response Time",
          "Application Funnel: visual stage-by-stage conversion with drop-off rates",
          "Time in Stages: average days spent at each interview step",
          "Resume Effectiveness: compare which resume versions perform best",
          "Application Sources: track which job boards produce the most results",
        ],
      },
    ],
    color: "#f59e0b",
    icon: "JB",
    url: "https://jobber.fluxlab.dev",
    featured: false,
    stats: { users: 15300, companies: 210 },
    launchDate: "2025-01",
  },
  {
    slug: "market",
    name: "Market",
    tagline: "E-Commerce Marketplace Platform",
    description:
      "A multi-vendor marketplace platform with advanced search, secure payments, and seller management tools.",
    overview:
      "Market provides everything needed to launch and run a multi-vendor online marketplace. Sellers onboard through a guided setup flow, create storefronts with custom branding, and manage products with variant support, bulk imports, and inventory sync. Buyers enjoy fast full-text search with filters, wishlists, and a unified cart that handles items from multiple sellers. The payment engine splits transactions automatically, holds funds in escrow until delivery confirmation, and handles refunds and disputes through a structured resolution flow.",
    challenge:
      "Building a marketplace from scratch is a multi-year engineering effort. Existing platforms are either too rigid (locked templates) or too complex (enterprise-grade with steep learning curves). Mid-size entrepreneurs need something in between: flexible enough to customize, simple enough to launch in weeks.",
    solution:
      "Market is a white-label platform with a plugin architecture. The core handles catalog, cart, payments, and shipping. Sellers extend their storefronts with themes and widgets. An admin panel gives marketplace operators control over commissions, featured listings, and content moderation. The search engine combines Elasticsearch with collaborative filtering to surface relevant products even with sparse query terms.",
    targetAudience:
      "Entrepreneurs and businesses launching niche marketplaces, regional e-commerce platforms, and B2B procurement portals.",
    status: "beta",
    tags: ["Web App", "E-Commerce", "SaaS"],
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
    ],
    features: [
      {
        title: "Multi-Vendor Support",
        description:
          "Onboard and manage multiple sellers with individual storefronts, custom branding, and independent analytics",
        icon: "",
      },
      {
        title: "Secure Payments",
        description:
          "Split payments, escrow holding, automated payouts, and a structured dispute resolution flow",
        icon: "",
      },
      {
        title: "Advanced Search",
        description:
          "Elasticsearch-powered full-text search with faceted filters, autocomplete, and personalized recommendations",
        icon: "",
      },
      {
        title: "Order Fulfillment",
        description:
          "End-to-end order management with multi-carrier shipping integration, tracking, and returns processing",
        icon: "",
      },
    ],
    highlights: [
      { label: "Products Listed", value: "125K+" },
      { label: "Monthly GMV", value: "$2.1M" },
      { label: "Search Latency", value: "<50ms" },
      { label: "Seller Onboarding", value: "<15 min" },
    ],
    integrations: [
      "Stripe Connect",
      "Nova Poshta",
      "UPS",
      "Elasticsearch",
      "Cloudinary",
      "Segment",
    ],
    screenshots: [],
    color: "#ec4899",
    icon: "MK",
    featured: false,
    stats: { users: 3400, companies: 45 },
    launchDate: "2025-02",
  },
  {
    slug: "lifespan",
    name: "LifeSpan",
    tagline: "Health & Wellness Tracking",
    description:
      "A comprehensive health tracking application for monitoring fitness goals, nutrition, sleep patterns, and overall wellness.",
    overview:
      'LifeSpan is a mobile-first health companion that unifies fitness, nutrition, and sleep data into a single coherent picture. Instead of juggling five different apps, users log everything in one place and see how their habits connect. The correlation engine surfaces insights like "your sleep quality drops 23% on days you skip your evening walk" — turning raw data into actionable behavior change. Privacy-first architecture means health data never leaves the device unless explicitly shared with a healthcare provider.',
    challenge:
      "Health tracking is fragmented across dozens of apps and devices, each showing a narrow slice. Users accumulate data but gain no insight. Existing platforms either lock users into a hardware ecosystem or monetize their health data through ads and partnerships.",
    solution:
      "LifeSpan aggregates data from Apple Health, Google Fit, Garmin, Fitbit, and manual entries into a normalized data model. A local-first sync engine keeps sensitive data on-device by default, using end-to-end encryption for cloud backup. The insight engine runs lightweight ML models on-device to detect patterns and generate personalized recommendations without sending data to external servers.",
    targetAudience:
      "Health-conscious individuals, fitness enthusiasts, and people managing chronic conditions who want a unified, privacy-respecting view of their wellness data.",
    status: "coming-soon",
    tags: ["Mobile", "HealthTech"],
    techStack: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    features: [
      {
        title: "Health Dashboard",
        description:
          "Unified view of all health metrics with daily, weekly, and monthly trend visualization",
        icon: "",
      },
      {
        title: "Activity Tracking",
        description:
          "Track workouts, steps, and physical activity with automatic device sync and manual logging",
        icon: "",
      },
      {
        title: "Nutrition Logging",
        description:
          "Log meals with barcode scanning, nutritional breakdown, macro tracking, and meal planning",
        icon: "",
      },
      {
        title: "Sleep Analysis",
        description:
          "Monitor sleep quality with detailed stage patterns, environmental factors, and improvement recommendations",
        icon: "",
      },
    ],
    highlights: [
      { label: "Beta Waitlist", value: "4.2K+" },
      { label: "Supported Devices", value: "30+" },
      { label: "Data Sources", value: "12" },
      { label: "On-device ML Models", value: "5" },
    ],
    integrations: [
      "Apple Health",
      "Google Fit",
      "Garmin Connect",
      "Fitbit",
      "Withings",
      "MyFitnessPal",
    ],
    screenshots: [],
    color: "#14b8a6",
    icon: "LS",
    featured: false,
    launchDate: "2025-Q3",
  },
] as const;

export function getAllProjects(): readonly Project[] {
  return projects;
}

export function getFeaturedProjects(): readonly Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): readonly string[] {
  return projects.map((p) => p.slug);
}

export function getProjectsByTag(tag: string): readonly Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}

export function getAllTags(): readonly string[] {
  const tagSet = new Set(projects.flatMap((p) => p.tags));
  return [...tagSet].sort();
}
