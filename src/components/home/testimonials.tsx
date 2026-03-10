import { getTranslations } from "next-intl/server";
import {
  Container,
  SectionHeading,
  Card,
  AnimatedSection,
} from "@/components/ui";
import { testimonials } from "@/data/testimonials";

export async function Testimonials() {
  const tHome = await getTranslations("home.testimonials");
  const tData = await getTranslations("testimonials");

  return (
    <AnimatedSection className="py-24">
      <Container>
        <SectionHeading title={tHome("title")} subtitle={tHome("subtitle")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="flex flex-col justify-between"
            >
              <figure>
                <blockquote className="text-gray-600 dark:text-gray-300">
                  <p>&ldquo;{tData(`${testimonial.id}.quote`)}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
                  <div className="font-medium text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {tData(`${testimonial.id}.role`)}, {testimonial.company}
                  </div>
                  <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {tHome("project", { project: testimonial.project })}
                  </div>
                </figcaption>
              </figure>
            </Card>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
