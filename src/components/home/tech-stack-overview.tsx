'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Container, SectionHeading, AnimatedSection } from '@/components/ui';
import { TECH_CATEGORIES } from '@/lib/constants';

export function TechStackOverview() {
  const t = useTranslations('home.techStack');

  return (
    <AnimatedSection className="py-24">
      <Container>
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(TECH_CATEGORIES).map(([category, techs], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIdx * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {t(category)}
              </h3>
              <ul className="space-y-2">
                {techs.map((tech) => (
                  <li
                    key={tech}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
