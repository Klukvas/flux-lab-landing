import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container, Badge } from "@/components/ui";
import { getBlogPost, getAllBlogSlugs } from "@/lib/mdx";
import { generatePageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { locales } from "@/i18n/config";
import { BlogContent } from "@/components/blog/blog-content";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllBlogSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
    locale,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations("blog");

  return (
    <article className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.meta.date}>
                {t("publishedOn")} {formatDate(post.meta.date, locale)}
              </time>
              <span>·</span>
              <span>
                {post.meta.readingTime} {t("minRead")}
              </span>
              <span>·</span>
              <span>{post.meta.author}</span>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
              {post.meta.title}
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {post.meta.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.meta.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </header>

          <BlogContent content={post.content} />
        </div>
      </Container>
    </article>
  );
}
