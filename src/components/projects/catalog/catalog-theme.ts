import type { CSSProperties } from "react";
import type { Project } from "@/types";
import themes from "./catalog-theme-tokens.module.css";

export interface CatalogTheme {
  /** The class carrying the product's --p-* tokens. */
  readonly className: string;
  /** The product's slug, for details only that product has; "fallback" when it has no theme. */
  readonly key: string;
  readonly style: CSSProperties;
}

/** Every product brings its own palette and type; one we have not styled yet uses its brand colour. */
export function catalogTheme(project: Project): CatalogTheme {
  const ownClass = themes[project.slug];
  return {
    className: ownClass ?? themes.fallback,
    key: ownClass ? project.slug : "fallback",
    style: { "--project-color": project.color } as CSSProperties,
  };
}
