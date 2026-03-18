export const SITE_NAME = "fluxLab.dev";
export const SITE_URL = "https://fluxlab.dev";
export const SITE_DESCRIPTION =
  "Kyiv-based software development studio building production SaaS products. 6 live products, 46K+ users. React, Next.js, TypeScript, Go, PostgreSQL.";

export const CONTACT_EMAIL = "hello@fluxlab.dev";
export const CONTACT_LOCATION = "Kyiv, Ukraine";

export const SOCIAL_LINKS = {
  github: "https://github.com/fluxlab", // TODO: Replace with real profile URL
  linkedin: "https://linkedin.com/company/fluxlab", // TODO: Replace with real profile URL
  twitter: "https://twitter.com/fluxlab", // TODO: Replace with real profile URL
} as const;

export const STATS = {
  projects: 6,
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
