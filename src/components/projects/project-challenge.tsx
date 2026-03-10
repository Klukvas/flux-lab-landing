'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui';

interface ProjectChallengeProps {
  readonly challenge: string;
  readonly solution: string;
  readonly challengeLabel: string;
  readonly solutionLabel: string;
}

export function ProjectChallenge({
  challenge,
  solution,
  challengeLabel,
  solutionLabel,
}: ProjectChallengeProps) {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 dark:border-gray-800">
                  <svg
                    className="h-4 w-4 text-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {challengeLabel}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 dark:border-gray-800">
                  <svg
                    className="h-4 w-4 text-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {solutionLabel}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {solution}
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
