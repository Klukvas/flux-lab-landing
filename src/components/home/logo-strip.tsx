import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { Container, RevealGroup, RevealItem } from "@/components/ui";
import { builtWithLogos, integratedWithLogos, type Logo } from "@/data/logos";

/** Many small marks: a quick stagger keeps each row under half a second. */
const LOGO_STAGGER_SECONDS = 0.03;

interface LogoRowProps {
  readonly caption: string;
  readonly logos: readonly Logo[];
}

function LogoRow({ caption, logos }: LogoRowProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
      <h2 className="shrink-0 font-mono text-xs font-medium uppercase tracking-widest text-gray-500 lg:w-36 dark:text-gray-400">
        {caption}
      </h2>
      <RevealGroup staggerSeconds={LOGO_STAGGER_SECONDS} className="flex flex-wrap gap-x-7 gap-y-3">
        {logos.map((logo) => (
          <RevealItem key={logo.name}>
            {/* Marks rest in gray and take their own brand color under the mouse. */}
            <span
              className="flex items-center gap-2 text-gray-500 transition-colors duration-200 hover:text-(--logo-color) dark:text-gray-400 dark:hover:text-(--logo-color)"
              style={{ "--logo-color": `#${logo.icon.hex}` } as CSSProperties}
            >
              <svg
                role="img"
                aria-label={logo.name}
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0"
                fill="currentColor"
              >
                <path d={logo.icon.path} />
              </svg>
              <span className="text-sm font-medium">{logo.name}</span>
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

/** Where other studios put client logos: the real technologies and services behind the products. */
export async function LogoStrip() {
  const t = await getTranslations("home.logos");

  return (
    <section className="py-8">
      <Container>
        <div className="clearing-tinted flex flex-col gap-5">
          <LogoRow caption={t("builtWith")} logos={builtWithLogos} />
          <LogoRow caption={t("integratedWith")} logos={integratedWithLogos} />
        </div>
      </Container>
    </section>
  );
}
