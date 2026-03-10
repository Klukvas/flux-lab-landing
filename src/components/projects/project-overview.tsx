'use client';

import { motion } from 'framer-motion';
import { Container, SectionHeading } from '@/components/ui';

interface ProjectOverviewProps {
  readonly overview: string;
  readonly targetAudience: string;
  readonly launchDate: string;
  readonly title: string;
  readonly targetAudienceLabel: string;
  readonly launchedLabel: string;
}

export function ProjectOverview({
  overview,
  targetAudience,
  launchDate,
  title,
  targetAudienceLabel,
  launchedLabel,
}: ProjectOverviewProps) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={title} />
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg leading-relaxed text-gray-500 dark:text-gray-400"
          >
            {overview}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 grid gap-6 sm:grid-cols-2"
          >
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {targetAudienceLabel}
              </h3>
              <p className="mt-2 text-sm text-foreground">
                {targetAudience}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {launchedLabel}
              </h3>
              <p className="mt-2 text-sm text-foreground">
                {launchDate}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
