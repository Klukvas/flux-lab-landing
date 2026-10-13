import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllProjects } from "@/data/projects";
import type { Project } from "@/types";

interface ProductCardProps {
  readonly project: Project;
  readonly tagline: string;
  /** The second copy of the row only exists to make the loop seamless. */
  readonly isDuplicate: boolean;
}

function ProductCard({ project, tagline, isDuplicate }: ProductCardProps) {
  return (
    <li className="pr-4" aria-hidden={isDuplicate || undefined}>
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={isDuplicate ? -1 : undefined}
        className="pressable flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-brand/30 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-brand/30"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-sm font-bold text-foreground dark:border-gray-800">
          {project.icon}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{project.name}</span>
          <span className="whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
            {tagline}
          </span>
        </span>
      </Link>
    </li>
  );
}

/**
 * Every product in the portfolio drifting past: the breadth under the featured cards'
 * depth. Renders the row only; the section around it supplies the heading.
 */
export async function ProductsMarquee() {
  const tProjects = await getTranslations("projects");
  const products = getAllProjects();
  const taglineOf = (project: Project) =>
    tProjects.has(`${project.slug}.tagline`)
      ? tProjects(`${project.slug}.tagline`)
      : project.tagline;

  return (
    <div className="marquee-mask overflow-hidden">
      <ul className="marquee flex w-max motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center">
        {[false, true].map((isDuplicate) =>
          products.map((project) => (
            <ProductCard
              key={`${project.slug}-${isDuplicate ? "copy" : "first"}`}
              project={project}
              tagline={taglineOf(project)}
              isDuplicate={isDuplicate}
            />
          )),
        )}
      </ul>
    </div>
  );
}
