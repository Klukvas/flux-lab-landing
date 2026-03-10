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
        <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-foreground px-8 py-12 text-center dark:border-gray-800">
          <h2 className="text-2xl font-bold tracking-tighter text-background sm:text-3xl">{title}</h2>
          <p className="mt-3 text-background/70">{description}</p>
          <div className="mt-6">
            <Link href="/contact">
              <Button className="bg-background text-foreground hover:opacity-90">
                {buttonLabel}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
