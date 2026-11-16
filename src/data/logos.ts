import {
  siClaude,
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
  /** The name exactly as the case studies spell it, so the test can hold the strip to the data. */
  readonly name: string;
  readonly mark: LogoMark;
  /** The brand's color, shown under the mouse. */
  readonly hex: string;
}

function fromSimpleIcon(name: string, icon: SimpleIcon): Logo {
  return { name, mark: { kind: "icon", path: icon.path, viewBox: "0 0 24 24" }, hex: icon.hex };
}

/** The technologies behind the products, for the logo strip under the hero. */
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
] as const;

/** Services the products talk to, picked from the case studies' integration lists. */
export const integratedWithLogos: readonly Logo[] = [
  fromSimpleIcon("Claude AI", siClaude),
  fromSimpleIcon("Google Gemini", siGooglegemini),
  fromSimpleIcon("Perplexity", siPerplexity),
  // Creem publishes no mark, so it gets a monogram in the site's own color.
  { name: "Creem", mark: { kind: "monogram", letter: "C" }, hex: "5B4FD2" },
  fromSimpleIcon("Google Calendar", siGooglecalendar),
  fromSimpleIcon("Telegram Bot API", siTelegram),
  fromSimpleIcon("GitHub Actions", siGithubactions),
  fromSimpleIcon("Sentry", siSentry),
  fromSimpleIcon("Google Analytics", siGoogleanalytics),
  fromSimpleIcon("Google Search Console", siGooglesearchconsole),
] as const;
