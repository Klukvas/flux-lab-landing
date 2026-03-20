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
        <div
          className="mx-auto max-w-2xl rounded-xl border border-brand/20 px-8 py-12 text-center"
          style={{ background: "#3D32A8" }}
        >
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-white/90">{description}</p>
          <div className="mt-6">
            <Link href="/contact">
              <Button variant="inverted">{buttonLabel}</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
