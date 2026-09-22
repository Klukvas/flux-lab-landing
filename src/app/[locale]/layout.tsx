import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SupportButton } from "@/components/layout/support-button";
import { JsonLd } from "@/components/seo/json-ld";
import { CookieConsentBanner } from "@/components/analytics";
import { isAnalyticsEnabled } from "@/lib/analytics";
import { CONSENT_COOKIE_NAME, parseConsentChoice } from "@/lib/cookie-consent";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const cookieStore = await cookies();
  const consentChoice = parseConsentChoice(
    cookieStore.get(CONSENT_COOKIE_NAME)?.value,
  );

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <JsonLd />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
          <SupportButton />
          {isAnalyticsEnabled() && (
            <CookieConsentBanner initialChoice={consentChoice} />
          )}
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
