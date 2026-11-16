"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { getAllProjects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { CatalogCard } from "./catalog-card";
import { catalogFontVariables } from "./catalog-fonts";
import { CatalogIndex } from "./catalog-index";
import { positionFor, stepTarget } from "./catalog-model";
import { CatalogStickers } from "./catalog-stickers";
import { catalogTheme } from "./catalog-theme";
import { useCatalogNavigation } from "./use-catalog-navigation";
import styles from "./project-catalog.module.css";

/**
 * Every project in one looping stack. The static HTML carries each card and its link, so
 * crawlers and first paint see the whole portfolio before the stack comes alive.
 */
export function ProjectCatalog() {
  return <CatalogStage projects={getAllProjects()} />;
}

const pad = (n: number) => String(n).padStart(2, "0");

function CatalogStage({ projects }: { readonly projects: readonly Project[] }) {
  const t = useTranslations("projects");
  const stageRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const count = projects.length;

  const go = useCallback(
    (step: number) =>
      setCurrent((index) => stepTarget(index, step, count) ?? index),
    [count],
  );
  const onKeyDown = useCatalogNavigation({ stageRef, count, go });
  const isLoop = count > 1;

  const centred = projects[current];
  if (!centred) return null;
  const centredTheme = catalogTheme(centred);

  return (
    <section
      ref={stageRef}
      className={cn(styles.stage, catalogFontVariables)}
      // Neighbours peek past the centred card's edges, and a teaser card is shorter.
      data-centred-teaser={centred.features.length === 0}
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-roledescription="carousel"
      aria-label={t("catalogLabel")}
    >
      {projects.map((project, index) => {
        const theme = catalogTheme(project);
        return (
          <div
            key={project.slug}
            className={cn(
              styles.background,
              theme.className,
              index === current && styles.backgroundActive,
            )}
            style={theme.style}
            data-theme={theme.key}
            aria-hidden="true"
          />
        );
      })}

      <CatalogIndex
        projects={projects}
        current={current}
        theme={centredTheme}
        onSelect={setCurrent}
      />

      <div
        className={cn(styles.bar, centredTheme.className)}
        style={centredTheme.style}
        data-theme={centredTheme.key}
      >
        <span className={styles.counter} aria-hidden="true">
          {pad(current + 1)} / {pad(count)}
        </span>
        <span className="sr-only" aria-live="polite">
          {t("catalogPosition", { current: current + 1, total: count })}:{" "}
          {centred.name}
        </span>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => go(-1)}
          disabled={!isLoop}
          aria-label={t("catalogPrevious")}
        >
          ↑
        </button>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => go(1)}
          disabled={!isLoop}
          aria-label={t("catalogNext")}
        >
          ↓
        </button>
      </div>

      {projects.map((project, index) => (
        <CatalogCard
          key={project.slug}
          project={project}
          index={index}
          position={positionFor(index, current, count)}
          onSelect={setCurrent}
        />
      ))}

      {projects.map((project, index) => (
        <CatalogStickers
          key={project.slug}
          project={project}
          isActive={index === current}
        />
      ))}
    </section>
  );
}
