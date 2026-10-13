import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    slug: "fluxradar",
    name: "FluxRadar",
    tagline: "Website Audit for SEO & AI Search",
    description:
      "A pay-per-scan website audit that shows how Google, AI assistants and visitors see a site: SEO, AI search, security, speed and accessibility in one report.",
    overview:
      "FluxRadar answers one question for a site owner: why aren't customers finding me, and what should I fix first? You enter a public URL; the crawler reads the site the way Google, AI assistants and visitors do, and the audit runs up to ten modules over it — SEO, AI search visibility (GEO), security, performance, accessibility, reliability, content quality, privacy, UX/conversion and analytics. The report is written in plain words: problems ranked by urgency, each with what to do and a ready-made message to send your developer. Pricing is one-time with no subscription: a free homepage check, then Basic ($55), Website Audit ($79) or Complete ($120). The interface is available in English and Ukrainian.",
    challenge:
      "Small businesses lose customers without knowing why. SEO tools are monthly subscriptions built for marketers — they bury owners in jargon and hundreds of warnings, and none of them say whether ChatGPT or Claude mention the business when someone asks for a recommendation. Security headers, accessibility and page speed each live in yet another tool.",
    solution:
      "We split the audit into focused packages: an SSRF-guarded fetch layer, a crawler that respects robots.txt by default and reads sitemaps within each package's limits, and a deterministic rule engine for SEO, security, accessibility, reliability, content and privacy. Performance comes from PageSpeed Insights lab runs and CrUX field data. For AI search, provider adapters ask Claude and ChatGPT (with Gemini and Perplexity available) whether they name the business, only with the owner's recorded consent. Every finding carries its evidence and states what could not be checked, so the report never claims more certainty than it has.",
    targetAudience:
      "Small-business owners, freelancers and agencies who want to know why a site isn't found in Google or in AI answers — without a subscription or a glossary.",
    status: "active",
    tags: ["Web App", "SaaS", "AI"],
    techStack: [
      "React",
      "Vite",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Hetzner Cloud",
    ],
    features: [
      {
        title: "SEO Audit",
        description:
          "21 deterministic checks: page titles and descriptions, headings, canonicals, indexing, JSON-LD structured data and social previews",
        icon: "",
      },
      {
        title: "AI Search Visibility (GEO)",
        description:
          "Which AI crawlers robots.txt lets in, and whether Claude and ChatGPT mention the business in their answers",
        icon: "",
      },
      {
        title: "Site Health Modules",
        description:
          "Passive security checks (OWASP ASVS public profile), WCAG 2.2 AA accessibility, reliability, content quality and privacy signals",
        icon: "",
      },
      {
        title: "Real Performance Data",
        description:
          "PageSpeed Insights lab runs and CrUX field data for mobile and desktop, with the median of repeated runs reported",
        icon: "",
      },
      {
        title: "Plain-Language Report",
        description:
          "Problems ranked by what to fix first, each with a copy-ready message for your developer, plus JSON/CSV export on Website Audit and Complete",
        icon: "",
      },
      {
        title: "Search Console & Analytics",
        description:
          "Optional OAuth connection to Google Search Console, Google Analytics and Bing Webmaster Tools",
        icon: "",
      },
    ],
    highlights: [
      { label: "Audit Modules", value: "10" },
      { label: "Automated Checks", value: "50+" },
      { label: "AI Providers Supported", value: "4" },
      { label: "One-Time Report From", value: "$55" },
    ],
    integrations: [
      "Claude AI",
      "OpenAI",
      "Google Gemini",
      "Perplexity",
      "PageSpeed Insights",
      "Google Search Console",
      "Google Analytics",
      "Bing Webmaster Tools",
      "Creem",
    ],
    screenshots: [
      {
        src: "/images/projects/fluxradar_01_home.png",
        title: "One URL, Every Signal",
        description:
          "The landing page explains the product in a sentence: FluxRadar reads a website the way Google, AI assistants and visitors see it, and returns one report. A free homepage check starts from the hero form.",
        features: [
          "One-sentence promise: what keeps customers from finding you",
          "Live audit preview of what a scan reads",
          "Signal score, coverage and findings counters",
          "English and Ukrainian interface",
        ],
      },
      {
        src: "/images/projects/fluxradar_02_findings.png",
        title: "Findings in Plain Words",
        description:
          "Every problem is written for the site owner, not for an SEO specialist: what is wrong, where it was found, and what to change. Severity decides the order.",
        features: [
          "Fix first / worth fixing ordering by urgency",
          "Where each problem was found: links, pages or pictures",
          'Concrete "what to do" for every finding',
          "Example data clearly marked as made up",
        ],
      },
      {
        src: "/images/projects/fluxradar_03_modules.png",
        title: "A Score for Every Part of the Site",
        description:
          "Each module gets its own score and coverage bar, so a site that is easy to use but hard to find doesn't look the same as the reverse. Partial measurements are labelled instead of hidden.",
        features: [
          "Separate scores for search, content, speed, accessibility and reliability",
          "Coverage bar shows how many checks actually ran",
          '"Checked with limits" status when a measurement is incomplete',
          "UX/Conversion scored on the side, outside the overall score",
        ],
      },
      {
        src: "/images/projects/fluxradar_04_fix_first.png",
        title: "Fix These First",
        description:
          "The most urgent problems come first, each as a single fix that clears every page it lists. The count beside each one shows how many places it was found.",
        features: [
          "High, Medium and Low severity badges",
          "Finding counts per problem",
          "Jump links to the full write-up of each problem",
          "One fix per problem, not one per page",
        ],
      },
      {
        src: "/images/projects/fluxradar_05_developer.png",
        title: "A Message for Your Developer",
        description:
          "Every problem has a Copy button that produces a ready-made task: the check, the affected pages, what was found and what to do — the owner forwards it without writing anything.",
        features: [
          "Stable check IDs such as SEO-TECH-006",
          "Example pages listed with full URLs",
          "What was found and what to do, in one block",
          "Copy button on every problem in a real report",
        ],
      },
      {
        src: "/images/projects/fluxradar_06_pricing.png",
        title: "Three One-Time Reports",
        description:
          "No subscription and no monthly quota: pay once for one scan of one public website and keep the report. A side-by-side table explains which package answers which question.",
        features: [
          "Basic ($55): SEO and AI search visibility",
          "Website Audit ($79): the eight site-health modules",
          "Complete ($120): all ten modules in one report",
          "Free homepage check for any account",
        ],
      },
    ],
    color: "#66799b",
    icon: "FR",
    url: "https://fluxradar.net",
    featured: true,
    stats: { users: 1400, companies: 90 },
    launchDate: "2026-09",
  },
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
    featured: true,
    stats: { users: 12400, companies: 85 },
    launchDate: "2024-03",
  },
  {
    slug: "washflow",
    name: "WashFlow",
    tagline: "Multi-Tenant Car Wash CRM",
    description:
      "A full-stack SaaS platform for managing car wash businesses. Scheduling engine, CRM, role-based access control, multi-tenancy, and online booking.",
    overview:
      "WashFlow is a multi-tenant CRM built specifically for car wash businesses. The scheduling engine uses row-level locking to prevent double-bookings and tracks workforce capacity in real time. Staff manage orders through a visual schedule grid or a step-by-step wizard, while a client and vehicle registry keeps full service history. Granular RBAC with 47 permissions lets owners define exactly what each role can access. Customers can book online through a public booking page or an embeddable widget. The platform handles the full subscription lifecycle with Paddle billing — from a 30-day free trial through tiered plans with add-on resource packs.",
    challenge:
      "Most car wash businesses rely on paper logs or generic POS systems that don't handle time-slot scheduling, multi-post capacity, or workforce management. Owners running multiple branches have no unified view of operations, and there's no way for customers to book online. Building a multi-tenant SaaS from scratch with proper data isolation, subscription billing, and real-time updates is a significant engineering effort.",
    solution:
      "We built a purpose-built scheduling engine with Serializable transactions and SELECT FOR UPDATE locking — one slot, one car, zero conflicts. The multi-tenancy layer uses Prisma Client Extensions to auto-inject tenant context into every query, ensuring complete data isolation. A domain event system (EventEmitter2) drives audit logging, WebSocket broadcasts, and background jobs via BullMQ. The public booking API supports both slug-based and widget-based flows with rate limiting and idempotent mutations.",
    targetAudience:
      "Car wash businesses of all sizes — from single-location operators to multi-branch chains looking for a centralized management platform with online booking and subscription billing.",
    status: "active",
    tags: ["Web App", "SaaS", "Real-time"],
    techStack: [
      "React",
      "Vite",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "Docker",
    ],
    features: [
      {
        title: "Scheduling Engine",
        description:
          "Visual schedule grid with 30-minute slots, row-level locking to prevent double-bookings, and workforce capacity tracking across wash posts",
        icon: "",
      },
      {
        title: "Client & Vehicle Registry",
        description:
          "Full CRM with searchable client database, linked vehicles with service history, and soft-delete with restore",
        icon: "",
      },
      {
        title: "Role-Based Access Control",
        description:
          "47 granular permissions across 14 modules — define custom roles with per-module CRUD access for every team member",
        icon: "",
      },
      {
        title: "Public Online Booking",
        description:
          "Customer-facing booking page and embeddable widget with real-time availability, rate limiting, and idempotent slot reservation",
        icon: "",
      },
    ],
    highlights: [
      { label: "Active Tenants", value: "120+" },
      { label: "Orders Processed", value: "2.3M+" },
      { label: "API Endpoints", value: "104" },
      { label: "Test Coverage", value: "85%" },
    ],
    integrations: [
      "Paddle",
      "Resend",
      "Socket.IO",
      "Prometheus",
      "Grafana Loki",
      "Sentry",
    ],
    screenshots: [
      {
        src: "/images/projects/washflow_01_orders.png",
        title: "Orders — Schedule View",
        description:
          "A real-time scheduling board that shows all wash posts and their bookings throughout the day. Staff can see at a glance which posts are free, occupied, or upcoming — making it easy to plan walk-ins and avoid double-bookings.",
        features: [
          "Time grid with 30-minute slots across all wash posts",
          "Color-coded cells: free, booked, in-progress, completed",
          "Filter by branch and specific wash post",
          "Date picker for viewing past and future schedules",
          "Switch between Orders list and Schedule views",
        ],
      },
      {
        src: "/images/projects/washflow_02_create_order.png",
        title: "Create Order — Step-by-Step Wizard",
        description:
          "A guided multi-step flow for creating new orders. The wizard walks staff through selecting a branch, services, time slot, client, vehicle, and worker — then displays a clear summary before confirming the booking.",
        features: [
          "7-step wizard: Branch → Services → Time Slot → Client → Vehicle → Worker → Review",
          "Review & Confirm screen shows all selected details at a glance",
          "Total amount calculated automatically from selected services",
          "Notes field for special instructions or damage notes",
          "Back navigation to edit any previous step",
        ],
      },
      {
        src: "/images/projects/washflow_03_clients.png",
        title: "Client Management",
        description:
          "A searchable database of all clients with contact details and linked vehicles. Staff can quickly find a returning customer, see their history, and create new client profiles on the spot.",
        features: [
          "Search clients by name, phone, or email",
          "Vehicle count per client for quick reference",
          "Creation date tracking for customer retention analytics",
          "Paginated table with 20 entries per page",
          "One-click client creation from the top bar",
        ],
      },
      {
        src: "/images/projects/washflow_04_vehicles.png",
        title: "Vehicle Registry",
        description:
          "Every vehicle that visits the car wash is registered with its make, model, license plate, and linked owner. This lets the system auto-fill vehicle details during order creation and track service history per car.",
        features: [
          "Vehicle details: make/model, license plate, year, linked client",
          "Active/inactive status toggle for filtering",
          "Quick add from the vehicle list or during order creation",
          "Full vehicle history tied to the owner's account",
          "Pagination and sorting for large fleets",
        ],
      },
      {
        src: "/images/projects/washflow_05_users.png",
        title: "Team Management",
        description:
          "Manage all staff members — operators, receptionists, managers, and admins — with their contact info, assigned role, and branch. Each user's access is determined by their role's permission set.",
        features: [
          "Role-based assignment: Admin, Manager, Operator, Receptionist",
          "Branch assignment for multi-location businesses",
          "Contact details: email and phone per user",
          "Quick edit and delete actions per row",
          "Invite new team members with one click",
        ],
      },
      {
        src: "/images/projects/washflow_06_roles_permissions.png",
        title: "Roles & Permissions",
        description:
          "Granular access control with per-module CRUD permissions. Business owners define exactly what each role can see and do — from viewing analytics to editing orders or managing payments.",
        features: [
          "Modules: Analytics, Audit, Branches, Clients, Orders, Payments, Roles, Scheduling",
          "CRUD toggles per module: Create, View, Edit, Delete",
          "Permission counter showing selected out of total",
          "Custom role creation with any permission combination",
          "Changes apply instantly across all users with that role",
        ],
      },
    ],
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
    featured: false,
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
    url: "https://jobber-app.com",
    featured: false,
    stats: { users: 15300, companies: 210 },
    launchDate: "2025-01",
  },
  {
    slug: "autoflow",
    name: "AutoFlow",
    tagline: "Car Dealership Storefront Template",
    description:
      "A ready-made storefront and admin panel for a car dealership: a filterable catalog, detailed car pages and lead capture, rebranded and adapted for each client.",
    overview:
      "AutoFlow is a template we hand to car dealerships and lots that want their own site instead of a page on a classifieds board. The public storefront shows only what is in stock: a catalog with filters by make, model, body, fuel, gearbox, price, year and mileage, a detail page per car with a gallery, specs, options and a credit calculator, plus favorites and side-by-side comparison. Staff run everything from the admin panel — listings, photos, leads, team and branding — and every new car can be posted to the dealer's Telegram channels automatically. The live demo runs at autos-sale.com; each client gets their own brand, colors and the features they need on top of it.",
    challenge:
      "Most dealerships sell through classifieds boards, where their cars sit next to competitors' and the buyer leaves after one click. A site of their own is either a static page nobody updates or a custom project that takes months. Lots that also sell clients' cars on consignment need commissions and seller contacts handled correctly, and every listing still has to reach the Telegram channels where buyers actually look.",
    solution:
      "We built one solid base and reuse it per client. A NestJS modular monolith with a separate BullMQ worker handles the heavy work: photos upload straight to S3 through presigned URLs and come back as nine renditions (three sizes in WebP, AVIF and JPEG). Prices are entered in USD, UAH or EUR and normalized to the site's base currency, so filters and sorting stay correct. A publish check blocks listings without a processed photo or with inconsistent consignment fields, and the commission is fixed once at the moment of sale. Branding — logo, colors, contacts and SEO defaults — lives in site settings, so rebranding a copy is configuration, not a rewrite.",
    targetAudience:
      "Car dealerships, used-car lots and consignment sellers that want their own storefront with a working admin panel, launched in weeks rather than built from scratch.",
    status: "active",
    tags: ["Web App", "Template"],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Docker",
      "Hetzner Cloud",
    ],
    features: [
      {
        title: "Filterable Catalog",
        description:
          "Search and filters by make, model, body, fuel, gearbox, drive, price, year and mileage, with a strip of make logos above the grid",
        icon: "",
      },
      {
        title: "Car Detail Page",
        description:
          "Photo gallery, specs, grouped options, credit calculator, view counter, favorites, comparison and call, lead or test-drive buttons",
        icon: "",
      },
      {
        title: "Admin Panel with Roles",
        description:
          "Admins manage everything; editors handle only listings and leads. Every change lands in the audit log",
        icon: "",
      },
      {
        title: "Telegram Autoposting",
        description:
          "A new listing goes to up to 10 Telegram channels as a photo album; when the car sells, the post is edited to SOLD",
        icon: "",
      },
      {
        title: "Consignment & Multi-Currency",
        description:
          "Sell clients' cars with a percent or fixed commission; prices in USD, UAH or EUR normalized to one base currency",
        icon: "",
      },
      {
        title: "Lead Capture",
        description:
          "Call, message and test-drive requests with rate limiting and spam protection, collected in the admin panel with optional email alerts",
        icon: "",
      },
    ],
    highlights: [
      { label: "Image Renditions per Photo", value: "9" },
      { label: "Price Currencies", value: "3" },
      { label: "Telegram Channels per Site", value: "10" },
      { label: "Admin Roles", value: "2" },
    ],
    integrations: [
      "Telegram Bot API",
      "S3-compatible storage",
      "SMTP",
      "Simple Icons",
      "GitHub Actions",
      "Caddy",
    ],
    screenshots: [
      {
        src: "/images/projects/autoflow_01_home.png",
        title: "The Dealer's Own Storefront",
        description:
          "The home page leads with a featured car and two actions: browse the catalog or leave a request. Logo, name, colors and contacts all come from the site settings, so each client's copy looks like their own brand.",
        features: [
          "Featured car with price on the first screen",
          "Catalog and lead buttons above the fold",
          "Light and dark themes",
          "Branding set from the admin panel, not the code",
        ],
      },
      {
        src: "/images/projects/autoflow_02_new_arrivals.png",
        title: "New Arrivals",
        description:
          "The latest published cars appear on the home page as cards with the essentials a buyer scans for: year, mileage, city and price.",
        features: [
          "Condition and lot number on every card",
          "Year, mileage and city in one line",
          "Favorites and comparison right on the card",
          "Photo count badge",
        ],
      },
      {
        src: "/images/projects/autoflow_03_catalog.png",
        title: "Catalog with Filters",
        description:
          "The catalog shows how many cars match the request and narrows them down with a sidebar of filters. Make logos above the grid act as one-tap shortcuts.",
        features: [
          "Search by make, model or keyword",
          "Filters for make, model, body, fuel, gearbox and drive",
          "Make logos as quick filters",
          "Sorting by date, price, year and mileage",
        ],
      },
      {
        src: "/images/projects/autoflow_04_listing.png",
        title: "Car Detail Page",
        description:
          "Each car gets a page with a full-screen gallery, availability status, view count and a price card with the actions that turn a visitor into a lead.",
        features: [
          "Gallery with full-screen mode",
          "Call, lead and test-drive buttons",
          "Seller shown: the dealership or a consignment client",
          "Key facts: customs cleared, one owner, accident-free",
        ],
      },
      {
        src: "/images/projects/autoflow_05_credit.png",
        title: "Credit Calculator",
        description:
          "Below the specs and options, buyers estimate a monthly payment by picking a down payment and a term. The estimate uses an indicative rate, and the page says the partner bank sets the final terms.",
        features: [
          "Down payment from 20% to 50%",
          "Terms from 12 to 84 months",
          "Estimated monthly payment updated instantly",
          "Clear note that the bank sets the final terms",
        ],
      },
      {
        src: "/images/projects/autoflow_06_lead_form.png",
        title: "Lead Form",
        description:
          "The contacts page combines showroom details and opening hours with a request form. Every request lands in the admin panel, and managers can also get it by email.",
        features: [
          "Call, message or test-drive request types",
          "Ukrainian phone format hint and validation",
          "Showroom address, map link and opening hours",
          "Rate limiting and a honeypot against spam",
        ],
      },
    ],
    color: "#b5443b",
    icon: "AF",
    url: "https://autos-sale.com",
    featured: false,
    launchDate: "2026-07",
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

export interface TechUsage {
  readonly name: string;
  readonly projectCount: number;
}

/** Every technology across the portfolio, most widely used first; ties fall back to name order. */
export function getTechStackUsage(): readonly TechUsage[] {
  const allUses = projects.flatMap((project) => project.techStack);
  const names = [...new Set(allUses)];
  return names
    .map((name) => ({
      name,
      projectCount: allUses.filter((use) => use === name).length,
    }))
    .sort(
      (a, b) =>
        b.projectCount - a.projectCount || a.name.localeCompare(b.name),
    );
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
