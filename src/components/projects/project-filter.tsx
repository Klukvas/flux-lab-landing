'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getAllTags } from '@/data/projects';

export function ProjectFilter() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTag = searchParams.get('tag');
  const tags = getAllTags();

  function handleFilter(tag: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    router.push(`/${locale}/projects?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleFilter(null)}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          !activeTag
            ? 'bg-foreground text-background'
            : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-gray-700'
        }`}
      >
        {t('filterAll')}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleFilter(tag)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTag === tag
              ? 'bg-foreground text-background'
              : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-gray-700'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
