import type { BlogPostMeta } from "@/types";

/** The day a post last changed: its revision when it has one, otherwise its publication. */
export function lastTouched(post: BlogPostMeta): string {
  return post.updated ?? post.date;
}

/** The most recently written or revised posts first. */
export function sortByLastTouched(
  posts: readonly BlogPostMeta[],
): readonly BlogPostMeta[] {
  return [...posts].sort(
    (a, b) =>
      new Date(lastTouched(b)).getTime() - new Date(lastTouched(a)).getTime(),
  );
}
