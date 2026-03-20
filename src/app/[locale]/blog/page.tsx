import { getTranslations, getLocale } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import { BlogCard } from "@/components/blog/blog-card";
import { getAllBlogPosts } from "@/lib/mdx";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return generatePageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/blog",
    locale,
  });
}

export default async function BlogPage() {
  const locale = await getLocale();
  const t = await getTranslations("blog");
  const allPosts = getAllBlogPosts();

  // Group: current locale first, then the rest
  const currentLocalePosts = allPosts.filter((p) => p.locale === locale);
  const otherPosts = allPosts.filter((p) => p.locale !== locale);
  const sortedPosts = [...currentLocalePosts, ...otherPosts];

  // Deduplicate by slug — keep current locale version, skip duplicate from other locale
  const seen = new Set<string>();
  const posts = sortedPosts.filter((post) => {
    if (seen.has(post.slug)) return false;
    seen.add(post.slug);
    return true;
  });

  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("noPosts")}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={`${post.slug}-${post.locale}`} post={post} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
