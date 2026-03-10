import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { BlogPostMeta } from '@/types';
import { Card, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  readonly post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations('blog');

  return (
    <Card hover>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={post.date}>{formatDate(post.date, post.locale)}</time>
          <span>·</span>
          <span>{post.readingTime} {t('minRead')}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium text-foreground transition-colors hover:opacity-70"
        >
          {t('readMore')}
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </Card>
  );
}
