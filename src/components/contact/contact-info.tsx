import { useTranslations } from "next-intl";
import { Card } from "@/components/ui";
import { CONTACT_EMAIL, CONTACT_LOCATION } from "@/lib/constants";
import { SocialLinks, hasSocialLinks } from "@/components/layout/social-links";

export function ContactInfo() {
  const t = useTranslations("contact.info");

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-semibold text-foreground">{t("email")}</h3>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-1 text-foreground font-medium transition-colors hover:opacity-70"
        >
          {CONTACT_EMAIL}
        </a>
      </Card>

      <Card>
        <h3 className="font-semibold text-foreground">{t("location")}</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {CONTACT_LOCATION}
        </p>
      </Card>

      {hasSocialLinks && (
        <Card>
          <h3 className="font-semibold text-foreground">{t("social")}</h3>
          <div className="mt-2 flex gap-4">
            <SocialLinks
              linkClassName="text-gray-400 transition-colors hover:text-foreground"
              iconClassName="h-5 w-5"
            />
          </div>
        </Card>
      )}
    </div>
  );
}
