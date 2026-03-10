'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
