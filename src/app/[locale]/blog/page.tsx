import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, SectionHeading, Reveal } from "@/components/ui";
import { BlogFilter } from "@/components/blog/blog-filter";
import { getAllBlogTags, getBlogPosts } from "@/lib/mdx";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/blog",
    locale,
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = getBlogPosts(locale);

  return (
    <section className="py-24">
      <Container>
        <SectionHeading as="h1" title={t("title")} subtitle={t("subtitle")} />
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("noPosts")}
          </p>
        ) : (
          <Reveal>
            <BlogFilter posts={posts} tags={getAllBlogTags(locale)} />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
