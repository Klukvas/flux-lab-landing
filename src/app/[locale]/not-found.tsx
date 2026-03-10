import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Button } from "@/components/ui";

export default function NotFoundPage() {
  const t = useTranslations("common");

  return (
    <section className="flex flex-1 items-center justify-center py-24">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-tighter text-foreground">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            {t("notFound")}
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {t("notFoundDescription")}
          </p>
          <div className="mt-8">
            <Link href="/">
              <Button>{t("backToHome")}</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
