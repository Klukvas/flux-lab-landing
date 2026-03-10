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
    <section className="relative py-24">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute inset-0 -z-10 glow" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 text-xl font-bold text-foreground dark:border-gray-800 mx-auto">
            {project.icon}
          </span>
          <div className="mt-4 flex items-center justify-center gap-2">
            <h1 className="gradient-text text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>
            <Badge variant={statusVariant[project.status]}>
              {project.status}
            </Badge>
          </div>
          <p className="mt-2 text-xl text-gray-500 dark:text-gray-400">
            {project.tagline}
          </p>
          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
            {project.description}
          </p>

          {project.stats && (
            <div className="mt-8 flex justify-center gap-8">
              <div className="rounded-xl border border-gray-200 px-6 py-4 text-center dark:border-gray-800">
                <div className="text-2xl font-bold tracking-tight text-foreground">
                  {formatStat(project.stats.users)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {usersLabel}
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 px-6 py-4 text-center dark:border-gray-800">
                <div className="text-2xl font-bold tracking-tight text-foreground">
                  {formatStat(project.stats.companies)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {companiesLabel}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
