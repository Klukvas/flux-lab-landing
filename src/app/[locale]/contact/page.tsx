import { getTranslations } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return generatePageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/contact",
    locale,
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
      </Container>
    </section>
  );
}
