import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";
import { SITE_NAME } from "@/lib/constants";
import { isAnalyticsEnabled } from "@/lib/analytics";
import { CookieSettingsButton } from "@/components/analytics";
import { Logo } from "./logo";
import { SocialLinks, hasSocialLinks } from "./social-links";

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <Container>
        <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="flux-lab.dev — home">
              <Logo size="sm" />
            </Link>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              &copy; {currentYear} {SITE_NAME}
            </span>
          </div>

          {/* Legal */}
          <nav
            aria-label={t("footer.legal")}
            className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              {t("footer.privacy")}
            </Link>
            {isAnalyticsEnabled() && (
              <CookieSettingsButton className="transition-colors hover:text-foreground" />
            )}
          </nav>

          {hasSocialLinks && (
            <div className="flex items-center gap-3">
              <SocialLinks
                linkClassName="text-gray-500 transition-colors hover:text-foreground dark:text-gray-400"
                iconClassName="h-4 w-4"
              />
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}
