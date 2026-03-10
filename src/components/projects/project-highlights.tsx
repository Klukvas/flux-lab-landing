'use client';

import { motion } from 'framer-motion';
import type { ProjectHighlight } from '@/types';
import { Container, SectionHeading } from '@/components/ui';

interface ProjectHighlightsProps {
  readonly highlights: readonly ProjectHighlight[];
  readonly title: string;
}

export function ProjectHighlights({ highlights, title }: ProjectHighlightsProps) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={title} />
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-5 text-center dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {item.value}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
