'use client';

import { useSearchParams } from 'next/navigation';
import { getAllProjects, getProjectsByTag } from '@/data/projects';
import { ProjectCard } from './project-card';

export function ProjectGrid() {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  const projects = activeTag ? getProjectsByTag(activeTag) : getAllProjects();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
