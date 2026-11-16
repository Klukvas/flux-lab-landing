import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { isWordValue } from "./catalog-model";
import { catalogTheme } from "./catalog-theme";
import { useProjectText } from "./use-project-text";
import styles from "./catalog-stickers.module.css";

interface CatalogStickersProps {
  readonly project: Project;
  readonly isActive: boolean;
}

/** The centred project's key numbers, stuck to either side of its card. */
export function CatalogStickers({ project, isActive }: CatalogStickersProps) {
  const text = useProjectText(project.slug);
  const stats = project.catalog?.stats ?? [];
  if (stats.length === 0) return null;
  const theme = catalogTheme(project);

  return (
    <ul
      className={cn(styles.stickers, theme.className, isActive && styles.stickersActive)}
      style={theme.style}
      data-theme={theme.key}
      aria-hidden={!isActive}
    >
      {stats.map((stat, index) => {
        const value = text(`catalog.statValues.${index}`, stat.value);
        return (
          <li key={stat.label} className={styles.sticker}>
            <b className={cn(isWordValue(value) && styles.wordValue)}>{value}</b>
            <span>{text(`catalog.stats.${index}`, stat.label)}</span>
          </li>
        );
      })}
    </ul>
  );
}
