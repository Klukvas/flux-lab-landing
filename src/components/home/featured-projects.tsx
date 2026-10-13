import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Container,
  SectionHeading,
  Reveal,
  RevealGroup,
  RevealItem,
  buttonStyles,
} from "@/components/ui";
import { ProjectCard } from "@/components/projects/project-card";
import { getFeaturedProjects } from "@/data/projects";

export async function FeaturedProjects() {
  const t = await getTranslations("home.featuredProjects");
  const featured = getFeaturedProjects();

  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <SectionHeading
            className="clearing"
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <RevealItem key={project.slug} className="grid">
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className={buttonStyles({ variant: "outline", className: "bg-background" })}
          >
            {t("viewAll")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
