export const SITE_NAME = "fluxLab.dev";
export const SITE_URL = "https://flux-lab.dev";
export const SITE_DESCRIPTION =
  "Kyiv-based software development studio building production SaaS products. 46K+ users. React, Next.js, TypeScript, Go, PostgreSQL.";

export const CONTACT_EMAIL = "hello@flux-lab.dev";
export const CONTACT_LOCATION = "Kyiv, Ukraine";

export type SocialNetwork = "github" | "linkedin" | "twitter";

/**
 * Official company profiles only. They feed the footer, the contact page and the
 * schema.org sameAs list, which tells Google these accounts are this company, so a
 * network stays out until its profile exists.
 */
export const SOCIAL_LINKS: Readonly<Partial<Record<SocialNetwork, string>>> =
  {};

export const STATS = {
  projects: 0,
  experience: 3,
  technologies: 25,
  users: 46000,
  companies: 800,
} as const;

export const PROJECT_TAGS = [
  "Web App",
  "Mobile",
  "SaaS",
  "E-Commerce",
  "FinTech",
  "HealthTech",
  "IoT",
  "AI/ML",
] as const;

export const TECH_CATEGORIES = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"],
  backend: ["Node.js", "NestJS", "Python", "PostgreSQL", "Redis"],
  devops: ["Docker", "AWS", "Vercel", "GitHub Actions", "Terraform"],
  tools: ["Figma", "Git", "VS Code", "Jira", "Notion"],
} as const;
