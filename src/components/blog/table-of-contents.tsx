"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { TableOfContentsItem } from "@/types";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  readonly items: readonly TableOfContentsItem[];
  /** A sticky rail beside the article, or a closed disclosure above it. */
  readonly variant: "rail" | "disclosure";
}

/** The reader is "in" the last heading that has scrolled past this line of the viewport. */
const ACTIVE_LINE = "-96px 0px -70% 0px";

function useActiveHeading(items: readonly TableOfContentsItem[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: ACTIVE_LINE, threshold: 0 },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return activeId;
}

interface TocListProps {
  readonly items: readonly TableOfContentsItem[];
  readonly activeId: string | null;
}

function TocList({ items, activeId }: TocListProps) {
  return (
    <ol className="space-y-1 text-sm">
      {items.map((item) => (
        <li key={item.id} className={cn(item.level === 3 && "pl-4")}>
          <a
            href={`#${item.id}`}
            aria-current={item.id === activeId ? "location" : undefined}
            className={cn(
              "block border-l-2 py-1 pl-3 transition-colors",
              item.id === activeId
                ? "border-brand text-foreground"
                : "border-transparent text-gray-500 hover:text-foreground dark:text-gray-400",
            )}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * The post's sections with the current one marked. The page places the rail beside the
 * article on wide screens and the disclosure above it on narrow ones; each is rendered
 * once, so there is one observer and one set of links in the document.
 */
export function TableOfContents({ items, variant }: TableOfContentsProps) {
  const t = useTranslations("blog");
  const activeId = useActiveHeading(items);

  if (variant === "rail") {
    return (
      <nav aria-label={t("tableOfContents")} className="clearing sticky top-24">
        <div className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {t("tableOfContents")}
        </div>
        <TocList items={items} activeId={activeId} />
      </nav>
    );
  }

  return (
    <details className="mb-10 rounded-xl border border-gray-200 bg-white px-5 py-3 dark:border-gray-800 dark:bg-gray-950">
      <summary className="list-none cursor-pointer font-mono text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {t("tableOfContents")}
      </summary>
      <div className="pt-3">
        <TocList items={items} activeId={activeId} />
      </div>
    </details>
  );
}
