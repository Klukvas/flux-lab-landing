'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container, SectionHeading, AnimatedSection, Button } from '@/components/ui';
import { ProjectCard } from '@/components/projects/project-card';
import { getFeaturedProjects } from '@/data/projects';

export function FeaturedProjects() {
  const t = useTranslations('home.featuredProjects');
  const featured = getFeaturedProjects();

  return (
    <AnimatedSection className="py-24">
      <Container>
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button variant="outline">{t('viewAll')}</Button>
          </Link>
        </div>
      </Container>
    </AnimatedSection>
  );
}
