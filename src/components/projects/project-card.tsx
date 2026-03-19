import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Project } from "@/types";
import { Card, Badge } from "@/components/ui";

function formatStat(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K+`;
  return `${n}+`;
}

interface ProjectCardProps {
  readonly project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("projects");

  const statusVariant = {
    active: "success" as const,
    beta: "warning" as const,
    "coming-soon": "default" as const,
    archived: "default" as const,
  };

  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-sm font-bold text-foreground dark:border-gray-800">
            {project.icon}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {project.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.has(`${project.slug}.tagline`)
                ? t(`${project.slug}.tagline`)
                : project.tagline}
            </p>
          </div>
        </div>
        <Badge variant={statusVariant[project.status]}>
          {t.has(`status.${project.status}`)
            ? t(`status.${project.status}`)
            : project.status}
        </Badge>
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
        {t.has(`${project.slug}.description`)
          ? t(`${project.slug}.description`)
          : project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      {project.stats && (
        <div className="mt-4 flex gap-4 text-xs">
          <span className="text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-foreground">
              {formatStat(project.stats.users)}
            </span>{" "}
            {t("users")}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-foreground">
              {formatStat(project.stats.companies)}
            </span>{" "}
            {t("companies")}
          </span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 5).map((tech) => (
          <span key={tech} className="text-xs text-gray-500 dark:text-gray-400">
            {tech}
          </span>
        ))}
        {project.techStack.length > 5 && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            +{project.techStack.length - 5}
          </span>
        )}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="mt-4 inline-flex items-center text-sm font-medium text-foreground transition-colors hover:opacity-70"
      >
        {t("viewProject")}
        <svg
          className="ml-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </Card>
  );
}
