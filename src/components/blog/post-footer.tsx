import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui";
import type { BlogPostMeta } from "@/types";
import { BlogCard } from "./blog-card";

interface PostFooterProps {
  readonly relatedPosts: readonly BlogPostMeta[];
}

/** Closes a post with a way forward: the services pitch, then related reading. */
export function PostFooter({ relatedPosts }: PostFooterProps) {
  const t = useTranslations("blog");

  return (
    <>
      <aside className="mt-16 rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-foreground">{t("ctaTitle")}</h2>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          {t("ctaDescription")}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/services" className={buttonStyles()}>
            {t("ctaButton")}
          </Link>
          <Link href="/contact" className={buttonStyles({ variant: "outline" })}>
            {t("ctaSecondary")}
          </Link>
        </div>
      </aside>

      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground">{t("related")}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
