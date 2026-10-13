import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, SectionHeading, Reveal, buttonStyles } from "@/components/ui";
import { ProjectCard } from "@/components/projects/project-card";
import { CarouselSlide, ProjectCarousel } from "@/components/projects/project-carousel";
import { getAllProjects, getFeaturedProjects } from "@/data/projects";

/** Every product the studio runs, featured ones first, as a row the visitor flips through. */
export async function FeaturedProjects() {
  const t = await getTranslations("home.featuredProjects");
  const featured = getFeaturedProjects();
  const rest = getAllProjects().filter((project) => !project.featured);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            className="clearing"
            eyebrow={`01 · ${t("eyebrow")}`}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <Reveal>
          <ProjectCarousel>
            {[...featured, ...rest].map((project) => (
              <CarouselSlide key={project.slug}>
                <ProjectCard project={project} />
              </CarouselSlide>
            ))}
          </ProjectCarousel>
        </Reveal>
        <div className="mt-10 text-center">
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
