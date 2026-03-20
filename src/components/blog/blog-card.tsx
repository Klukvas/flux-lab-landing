import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import type { BlogPostMeta } from '@/types';
import { Card, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  readonly post: BlogPostMeta;
}

const localeLabels: Record<string, string> = {
  en: 'EN',
  uk: 'UK',
};

export function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations('blog');
  const currentLocale = useLocale();
  const isOtherLocale = post.locale !== currentLocale;

  // Always link to the post's own locale so the content matches
  const href = `/${post.locale}/blog/${post.slug}`;

  return (
    <Card hover>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span
            className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none"
            style={{
              background: isOtherLocale ? 'rgba(123,110,246,0.12)' : 'rgba(82,168,112,0.12)',
              color: isOtherLocale ? '#7B6EF6' : '#52A870',
            }}
          >
            {localeLabels[post.locale] ?? post.locale.toUpperCase()}
          </span>
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
          href={href}
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
