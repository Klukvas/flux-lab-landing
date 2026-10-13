'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { getAllProjects, getProjectsByTag } from '@/data/projects';
import { SMOOTH_SPRING } from '@/lib/motion';
import { ProjectCard } from './project-card';

export function ProjectGrid() {
  return <ProjectGridView activeTag={useSearchParams().get('tag')} />;
}

/**
 * The grid for a given tag. Prerendered with no tag as the Suspense fallback, so the
 * static HTML lists every project for crawlers and first paint.
 */
export function ProjectGridView({
  activeTag,
}: {
  readonly activeTag: string | null;
}) {
  const t = useTranslations('projects');
  const projects = activeTag ? getProjectsByTag(activeTag) : getAllProjects();

  // Cards that stay glide to their new slots while the rest fade out where they stood,
  // so a filter change never teleports anything. Only position animates: a card's height
  // can change with its new row, and scaling it there would stretch the text.
  return (
    <>
      <p
        aria-live="polite"
        className="mb-6 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400"
      >
        {activeTag
          ? t('resultsTagged', { count: projects.length, tag: activeTag })
          : t('results', { count: projects.length })}
      </p>
      <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              layout="position"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={SMOOTH_SPRING}
              className="grid"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
