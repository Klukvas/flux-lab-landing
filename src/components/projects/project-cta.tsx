import { Link } from "@/i18n/navigation";
import { Container, Button } from "@/components/ui";

interface ProjectCtaProps {
  readonly title: string;
  readonly description: string;
  readonly buttonLabel: string;
}

export function ProjectCta({
  title,
  description,
  buttonLabel,
}: ProjectCtaProps) {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-gray-950 px-8 py-12 text-center dark:border-gray-800 dark:bg-white">
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl dark:text-gray-950">
            {title}
          </h2>
          <p className="mt-3 text-gray-400 dark:text-gray-500">{description}</p>
          <div className="mt-6">
            <Link href="/contact">
              <Button className="bg-white text-gray-950 hover:bg-gray-100 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900">
                {buttonLabel}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
