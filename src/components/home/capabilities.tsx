import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Container,
  SectionHeading,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/ui";
import { capabilityColumns, type CapabilityColumnId } from "@/data/capabilities";
import { getProjectBySlug } from "@/data/projects";

const COLUMN_ICONS: Record<CapabilityColumnId, ReactNode> = {
  product: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
    </>
  ),
  engineering: <path d="M8.5 7.5 4 12l4.5 4.5M15.5 7.5 20 12l-4.5 4.5M13.5 5l-3 14" />,
  platform: (
    <>
      <rect x="3.5" y="4" width="17" height="6" rx="1.5" />
      <rect x="3.5" y="14" width="17" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" strokeWidth="2.5" />
    </>
  ),
};

function ColumnIcon({ column }: { readonly column: CapabilityColumnId }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {COLUMN_ICONS[column]}
    </svg>
  );
}

interface ProofMarksProps {
  readonly slugs: readonly string[];
  readonly label: (product: string) => string;
}

/** Monograms of the case studies that show the capability in production, each a link. */
function ProofMarks({ slugs, label }: ProofMarksProps) {
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project) => project !== undefined);
  if (projects.length === 0) return null;

  return (
    <span className="ml-auto flex shrink-0 -space-x-1.5">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          aria-label={label(project.name)}
          title={label(project.name)}
          className="pressable relative flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-white font-mono text-[9px] font-bold text-gray-500 hover:z-10 hover:border-brand hover:text-brand dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400 dark:hover:border-brand dark:hover:text-brand"
        >
          {project.icon}
        </Link>
      ))}
    </span>
  );
}

/**
 * What the studio does, laid out like a spec sheet: three columns of numbered rows, and
 * on each row the products that prove it, so no capability is just a claim.
 */
export async function Capabilities() {
  const t = await getTranslations("home.capabilities");
  const provenIn = (product: string) => t("provenIn", { product });

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            className="clearing"
            eyebrow={`02 · ${t("eyebrow")}`}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {capabilityColumns.map((column) => (
            <RevealItem key={column.id} className="grid">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
                <h3 className="flex items-center gap-2 bg-brand-subtle px-5 py-3 font-mono text-xs font-medium uppercase tracking-widest text-brand-dark dark:bg-brand-dim/20 dark:text-brand">
                  <ColumnIcon column={column.id} />
                  {t(`columns.${column.id}.title`)}
                </h3>
                <ol className="divide-y divide-gray-200/70 dark:divide-gray-800/70">
                  {column.items.map((item, index) => (
                    <li
                      key={item.id}
                      className="group flex items-center gap-3 px-5 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900"
                    >
                      <span className="w-5 shrink-0 font-mono text-xs text-gray-400 transition-colors group-hover:text-brand dark:text-gray-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{t(`columns.${column.id}.items.${item.id}`)}</span>
                      <ProofMarks slugs={item.proof} label={provenIn} />
                    </li>
                  ))}
                </ol>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
