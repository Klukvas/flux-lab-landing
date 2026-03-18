'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { Container, SectionHeading } from '@/components/ui';

interface Screenshot {
  readonly src: string;
  readonly alt: string;
}

interface ProjectScreenshotsProps {
  readonly screenshots: readonly Screenshot[];
  readonly title: string;
  readonly color: string;
  readonly url?: string;
}

const SWIPE_THRESHOLD = 50;

export function ProjectScreenshots({ screenshots, title, color, url }: ProjectScreenshotsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (screenshots.length === 0) return null;

  const selected = screenshots[selectedIndex];

  const goNext = () => {
    setSelectedIndex((prev) => (prev + 1) % screenshots.length);
  };

  const goPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      goNext();
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      goPrev();
    }
  };

  const displayUrl = url
    ? url.replace(/^https?:\/\//, '')
    : 'preview';

  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={title} />

        <div className="space-y-6">
          {/* Browser mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
            role="region"
            aria-label={title}
            aria-roledescription="carousel"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Glow effect behind the browser */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-15 blur-3xl"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 dark:border-gray-800 dark:bg-gray-900">
                {/* Traffic lights — hidden on small mobile */}
                <div className="hidden gap-1.5 xs:flex sm:flex" aria-hidden="true">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400 sm:h-3 sm:w-3" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 sm:h-3 sm:w-3" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 sm:h-3 sm:w-3" />
                </div>

                {/* Address bar */}
                <div className="flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs text-gray-400 dark:bg-gray-800 dark:text-gray-500">
                  <svg aria-hidden="true" className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span className="truncate">{displayUrl}</span>
                </div>

                {/* Screenshot counter */}
                <span className="text-xs text-gray-400 tabular-nums dark:text-gray-500">
                  {selectedIndex + 1}/{screenshots.length}
                </span>
              </div>

              {/* Main screenshot area with swipe support */}
              <div className="relative touch-pan-y" aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={handleDragEnd}
                    className="relative aspect-[4/3] w-full cursor-grab active:cursor-grabbing sm:aspect-[2/1]"
                  >
                    <Image
                      src={selected.src}
                      alt={selected.alt}
                      fill
                      className="pointer-events-none object-cover object-top"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows — larger tap targets on mobile */}
                {screenshots.length > 1 && (
                  <>
                    <button
                      onClick={goPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-sm transition-opacity hover:bg-black/60 sm:left-3 sm:p-2"
                      aria-label="Previous screenshot"
                    >
                      <svg aria-hidden="true" className="h-5 w-5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={goNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-sm transition-opacity hover:bg-black/60 sm:right-3 sm:p-2"
                      aria-label="Next screenshot"
                    >
                      <svg aria-hidden="true" className="h-5 w-5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Screenshot label bar */}
              <div className="flex items-center justify-between border-t border-gray-200 px-3 py-2.5 sm:px-4 dark:border-gray-800">
                <p className="min-w-0 flex-1 truncate text-xs font-medium text-foreground sm:text-sm">{selected.alt}</p>
                {/* Dot indicators on mobile — with proper touch targets */}
                <div className="flex items-center gap-0.5 sm:hidden" role="tablist" aria-label="Screenshot navigation">
                  {screenshots.map((screenshot, idx) => (
                    <button
                      key={screenshot.src}
                      role="tab"
                      onClick={() => setSelectedIndex(idx)}
                      className="flex h-8 items-center justify-center px-1"
                      aria-label={screenshot.alt}
                      aria-selected={idx === selectedIndex}
                    >
                      <span
                        className="block h-1.5 rounded-full transition-[width,background-color]"
                        style={{
                          width: idx === selectedIndex ? '16px' : '6px',
                          backgroundColor: idx === selectedIndex ? color : '#d1d5db',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Thumbnail strip (hidden on mobile, dots shown instead) */}
          <div className="hidden gap-3 sm:flex" role="tablist" aria-label="Screenshot thumbnails">
            {screenshots.map((screenshot, idx) => (
              <motion.button
                key={screenshot.src}
                role="tab"
                onClick={() => setSelectedIndex(idx)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group flex-1 overflow-hidden rounded-lg"
                aria-label={screenshot.alt}
                aria-selected={idx === selectedIndex}
              >
                <div
                  className="overflow-hidden rounded-lg border-2 transition-[border-color,box-shadow]"
                  style={{
                    borderColor: idx === selectedIndex ? color : 'transparent',
                    boxShadow: idx === selectedIndex ? `0 0 12px ${color}33` : 'none',
                  }}
                >
                  <div className="relative aspect-[2/1] w-full">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1200px) 15vw, 140px"
                    />
                    {idx !== selectedIndex && (
                      <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/10" />
                    )}
                  </div>
                </div>
                <p className="mt-2 truncate text-center text-xs">
                  <span
                    className={idx === selectedIndex
                      ? 'font-medium'
                      : 'text-gray-400 dark:text-gray-500'
                    }
                    style={idx === selectedIndex ? { color } : undefined}
                  >
                    {screenshot.alt}
                  </span>
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
