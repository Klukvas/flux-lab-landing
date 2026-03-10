import { Container, SectionHeading } from '@/components/ui';

interface ProjectIntegrationsProps {
  readonly integrations: readonly string[];
  readonly title: string;
}

export function ProjectIntegrations({ integrations, title }: ProjectIntegrationsProps) {
  if (integrations.length === 0) return null;

  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={title} />
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3">
          {integrations.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-foreground dark:border-gray-800 dark:bg-gray-950"
            >
              <svg
                className="h-4 w-4 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
              {name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
