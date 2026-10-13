import { getTranslations } from "next-intl/server";
import { Container, RevealGroup, RevealItem } from "@/components/ui";
import { getAllProjects, getTechStackUsage } from "@/data/projects";

/** Many small chips: a quicker stagger keeps the whole cloud under half a second. */
const CHIP_STAGGER_SECONDS = 0.03;

/** The technologies behind the portfolio, read from the case studies so the list stays true. */
export async function TechStackStrip() {
  const t = await getTranslations("home.techStack");
  const technologies = getTechStackUsage();
  const productCount = getAllProjects().length;

  return (
    <section aria-labelledby="tech-stack-heading" className="py-10">
      <Container>
        <div className="clearing-tinted mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
          <h2
            id="tech-stack-heading"
            className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400"
          >
            {t("label", { count: productCount })}
          </h2>
          <RevealGroup
            staggerSeconds={CHIP_STAGGER_SECONDS}
            className="flex flex-wrap justify-center gap-2"
          >
            {technologies.map((tech) => (
              <RevealItem key={tech.name}>
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
                  {tech.name}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
