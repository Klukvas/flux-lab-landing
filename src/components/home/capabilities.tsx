import { getTranslations } from "next-intl/server";
import {
  Container,
  SectionHeading,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/ui";

const COLUMNS = ["product", "engineering", "platform"] as const;

function itemsOf(t: Awaited<ReturnType<typeof getTranslations>>, column: string): readonly string[] {
  const raw: unknown = t.raw(`columns.${column}.items`);
  return Array.isArray(raw) ? raw.filter((item): item is string => typeof item === "string") : [];
}

/** What the studio does, laid out like a spec sheet: three columns of dense, specific rows. */
export async function Capabilities() {
  const t = await getTranslations("home.capabilities");

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
          {COLUMNS.map((column) => (
            <RevealItem key={column} className="grid">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
                <h3 className="bg-brand-subtle px-5 py-3 font-mono text-xs font-medium uppercase tracking-widest text-brand-dark dark:bg-brand-dim/20 dark:text-brand">
                  {t(`columns.${column}.title`)}
                </h3>
                <ul className="divide-y divide-gray-200/70 dark:divide-gray-800/70">
                  {itemsOf(t, column).map((item) => (
                    <li
                      key={item}
                      className="px-5 py-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
