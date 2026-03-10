import { Container, SectionHeading } from '@/components/ui';

interface ProjectTechStackProps {
  readonly techStack: readonly string[];
  readonly title: string;
}

export function ProjectTechStack({ techStack, title }: ProjectTechStackProps) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={title} />
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-foreground dark:border-gray-800 dark:bg-gray-950"
            >
              {tech}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
