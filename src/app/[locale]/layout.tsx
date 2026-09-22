import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SupportButton } from "@/components/layout/support-button";
import { MotionProvider } from "@/components/layout/motion-provider";
import { JsonLd } from "@/components/seo/json-ld";
import {
  CookieConsentBanner,
  GoogleAnalytics,
  TrafficSourceRecorder,
} from "@/components/analytics";
import { isAnalyticsEnabled } from "@/lib/analytics";
import "../globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Software Development Studio`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Software Development Studio`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      { url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Software Development Studio`,
    description: SITE_DESCRIPTION,
    images: ["/og-default.png"],
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#07060E",
  },
};

/** Prerenders every page per locale; nothing in the layout depends on the request. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** The <html> element lives here rather than in the root layout so lang matches the page's language. */
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
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${syne.variable} ${dmMono.variable} antialiased`}>
        <MotionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <JsonLd />
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <ScrollToTop />
                <SupportButton />
                <TrafficSourceRecorder />
                {isAnalyticsEnabled() && <CookieConsentBanner />}
              </div>
            </ThemeProvider>
          </NextIntlClientProvider>
        </MotionProvider>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
