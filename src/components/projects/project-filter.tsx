'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getAllTags } from '@/data/projects';
import { cn } from '@/lib/utils';

/**
 * Rewrites the query string in place. The grid answers on the same frame as the tap, with
 * no server round trip, and Back leaves the page instead of replaying every filter tried.
 */
function showTag(tag: string | null) {
  const params = new URLSearchParams(window.location.search);
  if (tag) {
    params.set('tag', tag);
  } else {
    params.delete('tag');
  }
  const query = params.toString();
  window.history.replaceState(
    null,
    '',
    query ? `?${query}` : window.location.pathname,
  );
}

export function ProjectFilter() {
  const t = useTranslations('projects');
  const activeTag = useSearchParams().get('tag');
  const options = [
    { tag: null, label: t('filterAll') },
    ...getAllTags().map((tag) => ({ tag, label: tag })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(({ tag, label }) => {
        const isActive = tag === activeTag;
        return (
          <button
            key={tag ?? 'all'}
            type="button"
            aria-pressed={isActive}
            onClick={() => showTag(tag)}
            className={cn(
              'pressable rounded-md px-4 py-2 text-sm font-medium',
              isActive
                ? 'border border-transparent bg-foreground text-background'
                : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-gray-700',
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
