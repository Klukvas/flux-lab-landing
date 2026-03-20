import type { CareerPosition } from "@/types";

export const positions: readonly CareerPosition[] = [
  {
    id: "senior-frontend",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote (Europe)",
    type: "full-time",
    description:
      "We're looking for a senior frontend developer to own the UI layer across our product portfolio. You'll work on Next.js applications serving 46K+ users — building new features, improving performance, and maintaining our shared design system. This isn't agency work: you'll ship to production daily and see your code used by real people immediately. We value engineers who care about UX as much as DX.",
    requirements: [
      "5+ years of production experience with React and TypeScript",
      "Strong Next.js knowledge (App Router, Server Components, SSR/SSG)",
      "Experience building and maintaining component libraries / design systems",
      "Tailwind CSS proficiency — you think in utility classes",
      "Performance optimization: Core Web Vitals, bundle analysis, lazy loading",
      "Accessibility (WCAG 2.1 AA) awareness and implementation",
      "Experience with Framer Motion or similar animation libraries",
      "Comfortable with Git, code reviews, and CI/CD pipelines",
    ],
    benefits: [
      "Fully remote — work from anywhere in Europe",
      "Flexible schedule — async-first culture, no mandatory meetings before noon",
      "$1,500/year professional development budget (conferences, courses, books)",
      "$1,000 equipment allowance for your home office setup",
      "Work on your own products — not client projects with unclear ownership",
      "Small team (4 people) — your impact is visible from day one",
      "Paid vacation: 20 days + Ukrainian public holidays",
    ],
  },
  {
    id: "go-backend-developer",
    title: "Go Backend Developer",
    department: "Engineering",
    location: "Remote (Europe)",
    type: "full-time",
    description:
      "We're building our newest products in Go and need a backend engineer who loves the language. You'll design and implement APIs, database schemas, and background workers for Jobber (our AI job tracker with 15K+ users) and future products. Our Go services handle 12K req/s with 8ms P99 latency on modest Hetzner Cloud instances — we care about efficiency. You'll work with PostgreSQL, Redis, and Claude AI integration.",
    requirements: [
      "3+ years of production Go experience (chi/gin/echo, pgx/sqlx)",
      "Strong PostgreSQL skills — schema design, query optimization, migrations",
      "REST API design with OpenAPI/Swagger documentation",
      "Experience with Docker and container-based deployments",
      "Understanding of JWT auth, rate limiting, and API security",
      "Familiarity with Redis for caching and session management",
      "Experience writing table-driven tests and achieving 80%+ coverage",
      "Bonus: experience integrating LLM APIs (Claude, GPT)",
    ],
    benefits: [
      "Fully remote — work from anywhere in Europe",
      "Flexible schedule — async-first, results over hours",
      "$1,500/year professional development budget",
      "$1,000 equipment allowance",
      "Own the backend architecture — not just implement tickets",
      "Small team — direct impact on products used by 46K+ people",
      "Paid vacation: 20 days + Ukrainian public holidays",
    ],
  },
  {
    id: "fullstack-developer",
    title: "Full-Stack Developer",
    department: "Engineering",
    location: "Remote (Europe)",
    type: "full-time",
    description:
      "We need a versatile engineer who's comfortable across the entire stack. You'll build features end-to-end — from React components to Go API endpoints to PostgreSQL queries. This role is ideal if you don't want to be boxed into 'frontend' or 'backend' and enjoy shipping complete features. You'll rotate across our products, tackling whatever has the highest impact that week.",
    requirements: [
      "3+ years full-stack experience with React/Next.js + a backend language",
      "TypeScript proficiency on the frontend",
      "Go or Node.js experience on the backend (Go preferred)",
      "PostgreSQL — comfortable writing raw SQL, not just ORM queries",
      "Docker basics: writing Dockerfiles, docker-compose for local dev",
      "Understanding of authentication flows (JWT, OAuth)",
      "Ability to work independently and make technical decisions",
      "Bonus: experience with Tailwind CSS and Next.js App Router",
    ],
    benefits: [
      "Fully remote — work from anywhere in Europe",
      "Flexible schedule — async-first culture",
      "$1,500/year professional development budget",
      "$1,000 equipment allowance",
      "Work across the full stack — never get bored",
      "Ship features end-to-end, from DB migration to UI",
      "Paid vacation: 20 days + Ukrainian public holidays",
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps / Infrastructure Engineer",
    department: "Engineering",
    location: "Remote (Europe)",
    type: "part-time",
    description:
      "We run all our products on Hetzner Cloud with Docker Compose, Caddy, and GitHub Actions. As we grow to more products and more traffic, we need someone to own our infrastructure: improve CI/CD pipelines, set up monitoring and alerting, manage database backups, and plan for scaling. This is a part-time role (20h/week) with potential to grow to full-time.",
    requirements: [
      "3+ years experience with Linux server administration",
      "Docker and Docker Compose in production environments",
      "CI/CD pipeline design (GitHub Actions preferred)",
      "Reverse proxy configuration (Caddy or Nginx)",
      "PostgreSQL administration: backups, replication, monitoring",
      "Experience with Hetzner Cloud, DigitalOcean, or similar VPS providers",
      "Terraform or Ansible for infrastructure as code",
      "Monitoring and alerting setup (Prometheus, Grafana, or similar)",
    ],
    benefits: [
      "Part-time (20h/week) — combine with other projects or studies",
      "Fully remote — work on your own schedule",
      "Potential to grow into full-time role",
      "$1,000/year professional development budget",
      "Real infrastructure challenges — not toy setups",
      "Direct impact on reliability for 46K+ users",
    ],
  },
  {
    id: "technical-writer",
    title: "Technical Writer / Content Creator",
    department: "Marketing",
    location: "Remote (Worldwide)",
    type: "contract",
    description:
      "We publish technical blog posts about our engineering practices — Go, React, PostgreSQL, Docker, AI integration, and SaaS building. We need a technical writer who can turn our engineering knowledge into engaging, SEO-optimized articles. You'll interview our developers, research topics, and produce 4-6 articles per month in English and/or Ukrainian. Ideal for a developer who enjoys writing or a technical writer with engineering background.",
    requirements: [
      "Strong technical writing portfolio (dev blogs, documentation, tutorials)",
      "Understanding of web development concepts (you don't need to code, but you need to understand it)",
      "SEO basics: keyword research, meta descriptions, internal linking",
      "Ability to write in English (Ukrainian is a strong bonus)",
      "Self-directed — can research topics and produce drafts independently",
      "Experience with Markdown/MDX",
      "Bonus: experience writing about Go, React, PostgreSQL, or DevOps",
    ],
    benefits: [
      "Fully remote — worldwide, any timezone",
      "Flexible contract — per-article or monthly retainer",
      "Byline credit on flux-lab.dev blog",
      "Access to engineering team for interviews and fact-checking",
      "Topics in high-demand tech niches — great for your portfolio",
    ],
  },
] as const;

export function getAllPositions(): readonly CareerPosition[] {
  return positions;
}

export function getPositionById(id: string): CareerPosition | undefined {
  return positions.find((p) => p.id === id);
}
