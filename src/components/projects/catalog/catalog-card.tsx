import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { type CatalogPosition, isWordValue } from "./catalog-model";
import { CatalogMotif } from "./catalog-motif";
import { catalogTheme } from "./catalog-theme";
import { useProjectText } from "./use-project-text";
import styles from "./project-catalog.module.css";

const FEATURES_SHOWN = 4;

interface CatalogCardProps {
  readonly project: Project;
  readonly index: number;
  readonly position: CatalogPosition;
  readonly onSelect: (index: number) => void;
}

function siteHost(url: string): string {
  return new URL(url).host;
}

export function CatalogCard({
  project,
  index,
  position,
  onSelect,
}: CatalogCardProps) {
  const t = useTranslations("projects");
  const text = useProjectText(project.slug);
  const isCurrent = position === "current";
  const isPeek = position === "previous" || position === "next";
  const isTeaser = project.features.length === 0;
  const catalog = project.catalog;
  const stats = catalog?.stats ?? [];
  const status = t.has(`status.${project.status}`)
    ? t(`status.${project.status}`)
    : project.status;
  const linkTabIndex = isCurrent ? undefined : -1;
  const theme = catalogTheme(project);

  return (
    <article
      className={cn(styles.card, theme.className, isTeaser && styles.teaser)}
      style={theme.style}
      data-theme={theme.key}
      data-position={position}
      aria-hidden={!isCurrent}
      // Far cards are off stage: keep them out of focus and clicks entirely.
      inert={!isCurrent && !isPeek}
      onClick={isPeek ? () => onSelect(index) : undefined}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardMain}>
          <div className={styles.cardHead}>
            <span className={styles.mark} aria-hidden="true">
              {project.icon}
            </span>
            <h2 className={styles.name}>{project.name}</h2>
            <span
              className={cn(styles.status, styles[`status-${project.status}`])}
            >
              {status}
            </span>
          </div>
          <p className={styles.tags}>{project.tags.join(" · ")}</p>
          <p className={styles.tagline}>{text("tagline", project.tagline)}</p>
          <p className={styles.description}>
            {text("description", project.description)}
          </p>
          {catalog?.audience && (
            <p className={styles.audience}>
              <b>{t("catalogFor")}</b>{" "}
              {text("catalog.audience", catalog.audience)}
            </p>
          )}
          {stats.length > 0 && (
            <dl className={styles.cardStats}>
              {stats.map((stat, statIndex) => {
                const value = text(
                  `catalog.statValues.${statIndex}`,
                  stat.value,
                );
                return (
                  <div key={stat.label}>
                    <dt>{text(`catalog.stats.${statIndex}`, stat.label)}</dt>
                    <dd className={cn(isWordValue(value) && styles.wordValue)}>
                      {value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          )}
          <div className={styles.actions}>
            <Link
              href={`/projects/${project.slug}`}
              className={cn(styles.button, styles.primary)}
              tabIndex={linkTabIndex}
            >
              {t("viewProject")} <span aria-hidden="true">→</span>
            </Link>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.button, styles.ghost)}
                tabIndex={linkTabIndex}
                aria-label={t("catalogVisit", { site: siteHost(project.url) })}
              >
                {siteHost(project.url)} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
        {!isTeaser && (
          <div className={styles.cardSide}>
            <h3 className={styles.sideTitle}>{t("catalogInside")}</h3>
            <ul className={styles.features}>
              {project.features
                .slice(0, FEATURES_SHOWN)
                .map((feature, featureIndex) => (
                  <li key={feature.title}>
                    {text(`features.${featureIndex}.title`, feature.title)}
                  </li>
                ))}
            </ul>
            {catalog?.motif && (
              <div className={styles.motif} aria-hidden="true">
                <CatalogMotif motif={catalog.motif} text={text} />
              </div>
            )}
          </div>
        )}
      </div>
      {isPeek && (
        <span className={styles.peekTag} aria-hidden="true">
          {position === "previous" ? "↑" : "↓"} {project.name}
        </span>
      )}
    </article>
  );
}
