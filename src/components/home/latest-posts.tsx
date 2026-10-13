import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Container,
  SectionHeading,
  Reveal,
  RevealGroup,
  RevealItem,
  buttonStyles,
} from "@/components/ui";
import { BlogCard } from "@/components/blog/blog-card";
import { getBlogPosts } from "@/lib/mdx";
import { sortByLastTouched } from "@/lib/blog-freshness";

const POST_COUNT = 3;

interface LatestPostsProps {
  readonly locale: string;
}

export async function LatestPosts({ locale }: LatestPostsProps) {
  const t = await getTranslations("home.latestPosts");
  // Freshness counts revisions too, so a reworked post surfaces instead of a stale date.
  const posts = sortByLastTouched(getBlogPosts(locale)).slice(0, POST_COUNT);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            className="clearing"
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <RevealItem key={post.slug} className="grid">
              <BlogCard post={post} headingLevel="h3" />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className={buttonStyles({ variant: "outline", className: "bg-background" })}
          >
            {t("viewAll")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
