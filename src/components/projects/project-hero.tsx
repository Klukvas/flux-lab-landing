import type { Project } from "@/types";
import { Container, Badge, Button } from "@/components/ui";

function formatStat(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K+`;
  return `${n}+`;
}

interface ProjectHeroProps {
  readonly project: Project;
  readonly visitSiteLabel: string;
  readonly viewCodeLabel: string;
  readonly usersLabel: string;
  readonly companiesLabel: string;
}

export function ProjectHero({
  project,
  visitSiteLabel,
  viewCodeLabel,
  usersLabel,
  companiesLabel,
}: ProjectHeroProps) {
  const statusVariant = {
    active: "success" as const,
    beta: "warning" as const,
    "coming-soon": "default" as const,
    archived: "default" as const,
  };

  return (
    <section className="relative py-12 sm:py-16">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute inset-0 -z-10 glow" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-sm font-bold text-foreground dark:border-gray-800">
              {project.icon}
            </span>
            <h1 className="gradient-text text-3xl font-bold tracking-tighter sm:text-4xl">
              {project.name}
            </h1>
            <Badge variant={statusVariant[project.status]}>
              {project.status}
            </Badge>
          </div>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            {project.tagline}
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {project.stats && (
              <>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-800">
                  <span className="text-lg font-bold text-foreground">
                    {formatStat(project.stats.users)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {usersLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-800">
                  <span className="text-lg font-bold text-foreground">
                    {formatStat(project.stats.companies)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {companiesLabel}
                  </span>
                </div>
              </>
            )}
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <Button>{visitSiteLabel}</Button>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">{viewCodeLabel}</Button>
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
