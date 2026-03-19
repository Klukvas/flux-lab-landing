'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ProjectScreenshot } from '@/types';
import { Container, SectionHeading } from '@/components/ui';

interface ProjectShowcaseProps {
  readonly screenshots: readonly ProjectScreenshot[];
  readonly title: string;
  readonly color: string;
  readonly url?: string;
}

export function ProjectShowcase({ screenshots, title, color, url }: ProjectShowcaseProps) {
  if (screenshots.length === 0) return null;

  const displayUrl = url
    ? url.replace(/^https?:\/\//, '')
    : 'preview';

  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={title} />

        <div className="space-y-20">
          {screenshots.map((item, idx) => {
            const isReversed = idx % 2 !== 0;

            return (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col gap-8 lg:items-center lg:gap-12 ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                {/* Screenshot in browser mockup */}
                <div className="relative lg:w-3/5">
                  <div
                    className="absolute -inset-3 rounded-2xl opacity-10 blur-2xl"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-900">
                      <div className="flex gap-1.5" aria-hidden="true">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                      </div>
                      <div className="flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-gray-400 dark:bg-gray-800 dark:text-gray-500">
                        <svg aria-hidden="true" className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        <span className="truncate">{displayUrl}</span>
                      </div>
                    </div>
                    {/* Screenshot */}
                    <div className="relative aspect-[2/1] w-full">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature description */}
                <div className="lg:w-2/5">
                  <div
                    className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <svg
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 flex-shrink-0"
                          style={{ color }}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
