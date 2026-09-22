import fs from "fs";
import path from "path";
import { parseFrontmatter } from "./mdx";

const LEGAL_DIR = path.join(process.cwd(), "src/content/legal");

export interface LegalDocument {
  readonly title: string;
  readonly description: string;
  /** ISO date of the last revision, shown to readers. */
  readonly updatedAt: string;
  readonly content: string;
}

/** Loads a localized legal page from src/content/legal/<locale>/<slug>.mdx. */
export function getLegalDocument(
  locale: string,
  slug: string,
): LegalDocument | null {
  const filePath = path.join(LEGAL_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { meta, body } = parseFrontmatter(fs.readFileSync(filePath, "utf-8"));
  return {
    title: (meta.title as string) || slug,
    description: (meta.description as string) || "",
    updatedAt: (meta.updated as string) || "",
    content: body,
  };
}
