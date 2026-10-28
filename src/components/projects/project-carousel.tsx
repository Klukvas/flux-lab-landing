"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCarouselProps {
  readonly children: ReactNode;
  /** "inside" leaves the controls to the slides, which place them with `CarouselControls`. */
  readonly controls?: "below" | "inside";
}

interface Pages {
  readonly count: number;
  readonly current: number;
}

interface CarouselState {
  readonly pages: Pages;
  readonly goToPage: (page: number) => void;
}

const CarouselContext = createContext<CarouselState | null>(null);

const ARROW_CLASSES =
  "pressable flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-foreground hover:border-brand/40 disabled:cursor-default disabled:opacity-30 disabled:hover:border-gray-200 dark:border-gray-800 dark:bg-gray-950 dark:disabled:hover:border-gray-800";

/**
 * A row of cards the visitor flips through: native horizontal scrolling with snap points,
 * so swipes and trackpads work as they always do, plus arrows and page dots for the mouse.
 * The scroller measures itself, so the number of pages follows the breakpoint.
 */
export function ProjectCarousel({
  children,
  controls = "below",
}: ProjectCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [pages, setPages] = useState<Pages>({ count: 1, current: 0 });

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    function measure() {
      const { scrollLeft, scrollWidth, clientWidth } = scroller!;
      if (clientWidth === 0) return;
      const count = Math.max(1, Math.ceil((scrollWidth - 1) / clientWidth));
      const current = Math.min(count - 1, Math.round(scrollLeft / clientWidth));
      setPages((previous) =>
        previous.count === count && previous.current === current
          ? previous
          : { count, current },
      );
    }

    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(scroller);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      scroller.removeEventListener("scroll", onScroll);
    };
  }, []);

  function goToPage(page: number) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({
      left: page * scroller.clientWidth,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <CarouselContext.Provider value={{ pages, goToPage }}>
      <div>
        <ul
          ref={scrollerRef}
          // The row bleeds into the container's gutters so cards can slide under them, and the
          // snap points respect the same gutters so the first card never loses its margin.
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 scroll-px-4 [scrollbar-width:none] motion-reduce:scroll-auto sm:-mx-6 sm:px-6 sm:scroll-px-6 lg:-mx-8 lg:px-8 lg:scroll-px-8 [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </ul>
        {controls === "below" && <CarouselControls className="mt-6" />}
      </div>
    </CarouselContext.Provider>
  );
}

/** Page dots and arrows for the surrounding `ProjectCarousel`; place them wherever fits the slide. */
export function CarouselControls({
  className,
}: {
  readonly className?: string;
}) {
  const t = useTranslations("home.featuredProjects");
  const carousel = useContext(CarouselContext);
  if (!carousel) return null;

  const { pages, goToPage } = carousel;
  const isFirst = pages.current === 0;
  const isLast = pages.current >= pages.count - 1;

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <ol
        className="flex items-center gap-2"
        aria-label={t("page", { page: pages.current + 1, count: pages.count })}
      >
        {Array.from({ length: pages.count }, (_, page) => (
          <li key={page}>
            <button
              type="button"
              aria-label={t("page", { page: page + 1, count: pages.count })}
              aria-current={page === pages.current ? "true" : undefined}
              onClick={() => goToPage(page)}
              className={cn(
                "block h-2 rounded-full transition-[width,background-color] duration-[450ms] ease-spring",
                page === pages.current
                  ? "w-6 bg-brand"
                  : "w-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500",
              )}
            />
          </li>
        ))}
      </ol>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={t("previous")}
          disabled={isFirst}
          onClick={() => goToPage(pages.current - 1)}
          className={ARROW_CLASSES}
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          aria-label={t("next")}
          disabled={isLast}
          onClick={() => goToPage(pages.current + 1)}
          className={ARROW_CLASSES}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}

function ArrowIcon({ direction }: { readonly direction: "left" | "right" }) {
  return (
    <svg
      className={cn("h-4 w-4", direction === "left" && "rotate-180")}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

interface CarouselSlideProps {
  readonly children: ReactNode;
  /** "card" fits 1 per view on phones, 2 on tablets and 3 on desktops; "full" is always one wide. */
  readonly size?: "card" | "full";
}

/** One slide: a card that fills its cell. */
export function CarouselSlide({ children, size = "card" }: CarouselSlideProps) {
  return (
    <li
      className={cn(
        "grid min-w-0 shrink-0 snap-start",
        size === "full"
          ? "basis-full"
          : "basis-[85%] sm:basis-[calc(50%-0.5rem)] lg:basis-[calc((100%-2rem)/3)]",
      )}
    >
      {children}
    </li>
  );
}
