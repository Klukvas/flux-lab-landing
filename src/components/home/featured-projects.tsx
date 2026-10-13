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
import { ProductsMarquee } from "./products-marquee";

export async function FeaturedProjects() {
  const t = await getTranslations("home.featuredProjects");
  const tProducts = await getTranslations("home.products");
  const featured = getFeaturedProjects();

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
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <RevealItem key={project.slug} className="grid">
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
        {/* Three cards in depth, then every product in breadth. */}
        <div className="mt-12">
          <h3 className="clearing mb-5 text-center font-mono text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {tProducts("label")}
          </h3>
          <ProductsMarquee />
        </div>
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
