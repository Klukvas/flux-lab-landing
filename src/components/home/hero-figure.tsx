import { LayersIcon } from "@/components/layout/logo";

/**
 * The place the dot field draws the logo mark: an empty box the field measures and fills
 * with lit dots. Visitors who prefer reduced motion never see the field draw, so they get
 * the mark itself instead.
 */
export function HeroFigure() {
  return (
    <div
      data-dot-figure="layers"
      aria-hidden="true"
      className="relative hidden aspect-[62/52] w-full max-w-[460px] justify-self-center lg:block"
    >
      <div className="hidden h-full w-full items-center justify-center text-brand/60 motion-reduce:flex">
        <LayersIcon width={310} height={260} />
      </div>
    </div>
  );
}
