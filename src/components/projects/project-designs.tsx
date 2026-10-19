import { useTranslations } from "next-intl";
import type { ProjectDesign } from "@/types";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { ScreenshotZoom } from "./screenshot-zoom";

interface ProjectDesignsProps {
  readonly designs: readonly ProjectDesign[];
  readonly title: string;
  readonly intro: string;
  readonly projectName: string;
  readonly color: string;
}

/** Matches the grid: one column on phones, two from sm (640px), three from lg (1024px). */
const THUMBNAIL_SIZES =
  "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw";

/** The looks a template can take for a client, as a grid of mockups that open full size. */
export function ProjectDesigns({
  designs,
  title,
  intro,
  projectName,
  color,
}: ProjectDesignsProps) {
  const t = useTranslations("projects");

  if (designs.length === 0) return null;

  return (
    <section id="designs" className="scroll-mt-16 py-24">
      <Container>
        <Reveal>
          <SectionHeading
            title={title}
            subtitle={intro}
            // Two even lines read as one block, where greedy wrapping leaves a short tail.
            className="mx-auto max-w-3xl [&>p]:text-balance"
          />
        </Reveal>

        {/* Nineteen cards would take seconds to stagger in, so the grid reveals as one,
            the way the blog list does. */}
        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((design, idx) => (
            <article
              key={design.src}
              className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="border-b border-gray-200 dark:border-gray-800">
                <ScreenshotZoom
                  src={design.src}
                  alt={t("designAlt", {
                    title: design.name,
                    project: projectName,
                  })}
                  openLabel={t("openDesign", { title: design.name })}
                  closeLabel={t("closeDesign")}
                  aspectClassName="aspect-[4/3]"
                  sizes={THUMBNAIL_SIZES}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold tabular-nums text-white"
                    style={{ backgroundColor: color }}
                  >
                    {idx + 1}
                  </span>
                  <h3 className="font-semibold text-foreground">
                    {design.name}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {design.description}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
