import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Badge } from "@/components/ui";
import {
  getBlogPost,
  getAllBlogSlugs,
  getBlogPostLocales,
  getRelatedPosts,
} from "@/lib/mdx";
import { generatePageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { locales } from "@/i18n/config";
import { BlogContent } from "@/components/blog/blog-content";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { PostFooter } from "@/components/blog/post-footer";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

const RELATED_POST_COUNT = 2;

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
    availableLocales: getBlogPostLocales(slug),
    article: {
      publishedTime: post.meta.date,
      modifiedTime: post.meta.updated,
      tags: post.meta.tags,
    },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");

  return (
    <>
      <ArticleJsonLd post={post.meta} />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tNav("home"), path: "" },
          { name: t("title"), path: "/blog" },
          { name: post.meta.title, path: `/blog/${slug}` },
        ]}
      />
      <article className="py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <header className="mb-12">
              <div className="rise-in flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
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
              <h1 className="rise-in mt-4 text-4xl font-bold text-foreground [--rise-delay:60ms] sm:text-5xl">
                {post.meta.title}
              </h1>
              <p className="rise-in mt-4 text-lg text-gray-500 [--rise-delay:140ms] dark:text-gray-400">
                {post.meta.description}
              </p>
              <div className="rise-in mt-4 flex flex-wrap gap-2 [--rise-delay:220ms]">
                {post.meta.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </header>

            <ReadingProgress>
              <BlogContent content={post.content} />
            </ReadingProgress>
            <PostFooter
              relatedPosts={getRelatedPosts(locale, slug, RELATED_POST_COUNT)}
            />
          </div>
        </Container>
      </article>
    </>
  );
}
