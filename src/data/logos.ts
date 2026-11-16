import {
  siClaude,
  siVite,
  siPrisma,
  siTailwindcss,
  siExpress,
  siHetzner,
  siCaddy,
  siKubernetes,
  siTerraform,
  siGrafana,
  siNginx,
  siGooglecloud,
  siPaddle,
  siDocker,
  siGithubactions,
  siGo,
  siGoogleanalytics,
  siGooglecalendar,
  siGooglegemini,
  siGooglesearchconsole,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPerplexity,
  siPostgresql,
  siReact,
  siRedis,
  siSentry,
  siTelegram,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

export type LogoMark =
  | { readonly kind: "icon"; readonly path: string; readonly viewBox: string }
  | { readonly kind: "monogram"; readonly letter: string };

export interface Logo {
  /** Public technology name, independent of any client or endorsement claim. */
  readonly name: string;
  readonly mark: LogoMark;
  /** The brand's color, shown under the mouse. */
  readonly hex: string;
  readonly source: "case-study" | "repository" | "ecosystem";
  readonly dependency?: string;
}

function fromSimpleIcon(
  name: string,
  icon: SimpleIcon,
  source: Logo["source"] = "case-study",
  dependency?: string,
): Logo {
  return {
    name,
    source,
    dependency,
    mark: { kind: "icon", path: icon.path, viewBox: "0 0 24 24" },
    hex: icon.hex,
  };
}

/** Our product/repository tools plus explicitly curated enterprise ecosystem choices. */
export const builtWithLogos: readonly Logo[] = [
  fromSimpleIcon("React", siReact),
  fromSimpleIcon("Next.js", siNextdotjs),
  fromSimpleIcon("TypeScript", siTypescript),
  fromSimpleIcon("Go", siGo),
  fromSimpleIcon("Node.js", siNodedotjs),
  fromSimpleIcon("NestJS", siNestjs),
  fromSimpleIcon("PostgreSQL", siPostgresql),
  fromSimpleIcon("Redis", siRedis),
  fromSimpleIcon("Docker", siDocker),
  fromSimpleIcon("Vite", siVite),
  fromSimpleIcon("Express", siExpress),
  fromSimpleIcon("Prisma", siPrisma),
  fromSimpleIcon("Tailwind CSS", siTailwindcss, "repository", "tailwindcss"),
  fromSimpleIcon("Hetzner Cloud", siHetzner),
  fromSimpleIcon("Caddy", siCaddy),
  {
    name: "BullMQ",
    mark: { kind: "monogram", letter: "B" },
    hex: "D95735",
    source: "case-study",
  },
  fromSimpleIcon("Kubernetes", siKubernetes, "ecosystem"),
  fromSimpleIcon("Terraform", siTerraform, "ecosystem"),
  fromSimpleIcon("Grafana", siGrafana, "ecosystem"),
  fromSimpleIcon("Nginx", siNginx, "ecosystem"),
  fromSimpleIcon("Google Cloud", siGooglecloud, "ecosystem"),
] as const;

/** Complete catalog of service integrations already documented in the case studies. */
export const integratedWithLogos: readonly Logo[] = [
  fromSimpleIcon("Claude AI", siClaude),
  fromSimpleIcon("Google Gemini", siGooglegemini),
  fromSimpleIcon("Perplexity", siPerplexity),
  // Creem publishes no mark, so it gets a monogram in the site's own color.
  {
    name: "Creem",
    mark: { kind: "monogram", letter: "C" },
    hex: "5B4FD2",
    source: "case-study",
  },
  fromSimpleIcon("Google Calendar", siGooglecalendar),
  fromSimpleIcon("Telegram Bot API", siTelegram),
  fromSimpleIcon("GitHub Actions", siGithubactions),
  fromSimpleIcon("Sentry", siSentry),
  fromSimpleIcon("Google Analytics", siGoogleanalytics),
  fromSimpleIcon("Google Search Console", siGooglesearchconsole),
  fromSimpleIcon("Paddle", siPaddle),
  {
    name: "OpenAI",
    mark: { kind: "monogram", letter: "O" },
    hex: "412991",
    source: "case-study",
  },
  {
    name: "PageSpeed Insights",
    mark: { kind: "monogram", letter: "P" },
    hex: "4285F4",
    source: "case-study",
  },
  {
    name: "S3-compatible storage",
    mark: { kind: "monogram", letter: "S" },
    hex: "569A31",
    source: "case-study",
  },
] as const;
