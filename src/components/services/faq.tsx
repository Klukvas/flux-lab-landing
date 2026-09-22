import { getTranslations } from "next-intl/server";
import { Container, SectionHeading, AnimatedSection } from "@/components/ui";

const FAQ_ITEMS = [
  { q: "q1", a: "a1" },
  { q: "q2", a: "a2" },
  { q: "q3", a: "a3" },
  { q: "q4", a: "a4" },
  { q: "q5", a: "a5" },
] as const;

export async function FAQ() {
  const t = await getTranslations("services.faq");

  return (
    <AnimatedSection className="py-24">
      <Container>
        <SectionHeading title={t("title")} />
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between rounded-xl px-6 py-4 font-medium text-foreground transition-colors active:bg-gray-50 dark:active:bg-gray-900">
                {t(item.q)}
                <span
                  aria-hidden="true"
                  className="ml-4 text-gray-400 transition-[rotate] duration-[450ms] ease-spring group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-4 text-gray-500 dark:text-gray-400">
                {t(item.a)}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
