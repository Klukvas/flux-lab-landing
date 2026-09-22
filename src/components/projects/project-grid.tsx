'use client';

import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { getAllProjects, getProjectsByTag } from '@/data/projects';
import { SMOOTH_SPRING } from '@/lib/motion';
import { ProjectCard } from './project-card';

export function ProjectGrid() {
  const activeTag = useSearchParams().get('tag');
  const projects = activeTag ? getProjectsByTag(activeTag) : getAllProjects();

  // Cards that stay glide to their new slots while the rest fade out where they stood,
  // so a filter change never teleports anything. Only position animates: a card's height
  // can change with its new row, and scaling it there would stretch the text.
  return (
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
  );
}
