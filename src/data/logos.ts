import {
  siClaude,
  siDocker,
  siGithubactions,
  siGo,
  siGoogleanalytics,
  siGooglegemini,
  siGooglesearchconsole,
  siHetzner,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPaddle,
  siPerplexity,
  siPostgresql,
  siReact,
  siRedis,
  siSentry,
  siStripe,
  siTelegram,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

export interface Logo {
  /** The name exactly as the case studies spell it, so the test can hold the strip to the data. */
  readonly name: string;
  readonly icon: SimpleIcon;
}

/** The technologies behind the products, for the logo strip under the hero. */
export const builtWithLogos: readonly Logo[] = [
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "TypeScript", icon: siTypescript },
  { name: "Go", icon: siGo },
  { name: "Node.js", icon: siNodedotjs },
  { name: "NestJS", icon: siNestjs },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Redis", icon: siRedis },
  { name: "Docker", icon: siDocker },
  { name: "Hetzner Cloud", icon: siHetzner },
] as const;

/** Services the products talk to, picked from the case studies' integration lists. */
export const integratedWithLogos: readonly Logo[] = [
  { name: "Claude AI", icon: siClaude },
  { name: "Google Gemini", icon: siGooglegemini },
  { name: "Perplexity", icon: siPerplexity },
  { name: "Stripe", icon: siStripe },
  { name: "Paddle", icon: siPaddle },
  { name: "Telegram Bot API", icon: siTelegram },
  { name: "GitHub Actions", icon: siGithubactions },
  { name: "Sentry", icon: siSentry },
  { name: "Google Analytics", icon: siGoogleanalytics },
  { name: "Google Search Console", icon: siGooglesearchconsole },
] as const;
