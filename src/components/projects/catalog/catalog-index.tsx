import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import type { CatalogTheme } from "./catalog-theme";
import styles from "./catalog-index.module.css";

interface CatalogIndexProps {
  readonly projects: readonly Project[];
  readonly current: number;
  readonly theme: CatalogTheme;
  readonly onSelect: (index: number) => void;
}

/**
 * Every project's name in one strip, so the reader sees what the stack holds and can jump
 * straight to one. It wears the centred project's theme, like the rest of the stage.
 */
export function CatalogIndex({ projects, current, theme, onSelect }: CatalogIndexProps) {
  const t = useTranslations("projects");
  const listRef = useRef<HTMLOListElement>(null);

  // On a narrow screen the strip scrolls sideways; keep the current name in sight without
  // scrolling the page itself.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.children[current];
    if (!list || !(item instanceof HTMLElement)) return;
    const left = item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [current]);

  return (
    <nav
      className={cn(styles.index, theme.className)}
      style={theme.style}
      data-theme={theme.key}
      aria-label={t("catalogIndex")}
    >
      <ol ref={listRef} className={styles.list}>
        {projects.map((project, index) => {
          const isCurrent = index === current;
          return (
            <li key={project.slug}>
              <button
                type="button"
                className={cn(styles.item, isCurrent && styles.itemCurrent)}
                aria-current={isCurrent ? "true" : undefined}
                onClick={() => onSelect(index)}
              >
                <span
                  className={cn(styles.dot, styles[`status-${project.status}`])}
                  aria-hidden="true"
                />
                {project.name}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
