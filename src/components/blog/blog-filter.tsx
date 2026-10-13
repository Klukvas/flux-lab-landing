"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { BlogPostMeta } from "@/types";
import { SMOOTH_SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { BlogCard } from "./blog-card";

interface BlogFilterProps {
  readonly posts: readonly BlogPostMeta[];
  readonly tags: readonly string[];
}

interface FilterPillProps {
  readonly label: string;
  readonly isActive: boolean;
  readonly markerId: string;
  readonly onSelect: () => void;
}

/** One pill. The marker is shared by all pills through `layoutId`, so it slides to the pressed one. */
function FilterPill({ label, isActive, markerId, onSelect }: FilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onSelect}
      className={cn(
        "pressable relative rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "border-transparent text-background"
          : "border-gray-200 text-gray-500 hover:text-foreground dark:border-gray-800 dark:text-gray-400",
      )}
    >
      {isActive && (
        <motion.span
          layoutId={markerId}
          transition={SMOOTH_SPRING}
          className="absolute inset-0 rounded-full bg-foreground"
        />
      )}
      <span className="relative">{label}</span>
    </button>
  );
}

/**
 * The blog grid with a tag filter. Cards slide to their new slots when the filter changes.
 * `initial={false}` makes the first client render match the server markup, and
 * MotionConfig turns the sliding into plain jumps under reduced motion.
 */
export function BlogFilter({ posts, tags }: BlogFilterProps) {
  const t = useTranslations("blog");
  const markerId = useId();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const visiblePosts =
    activeTag === null ? posts : posts.filter((post) => post.tags.includes(activeTag));

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="group"
        aria-label={t("filterLabel")}
        className="clearing-tinted mx-auto mb-6 flex max-w-4xl flex-wrap justify-center gap-2"
      >
        <FilterPill
          label={t("filterAll")}
          isActive={activeTag === null}
          markerId={markerId}
          onSelect={() => setActiveTag(null)}
        />
        {tags.map((tag) => (
          <FilterPill
            key={tag}
            label={tag}
            isActive={activeTag === tag}
            markerId={markerId}
            onSelect={() => setActiveTag(tag)}
          />
        ))}
      </div>

      <p
        role="status"
        className="mb-8 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        {activeTag === null
          ? t("resultCount", { count: visiblePosts.length })
          : t("resultCountTagged", { count: visiblePosts.length, tag: activeTag })}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visiblePosts.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              transition={SMOOTH_SPRING}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
