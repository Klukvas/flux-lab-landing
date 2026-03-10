'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleChange(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
  }

  const otherLocale = locales.find((l) => l !== locale) as Locale;

  return (
    <button
      onClick={() => handleLocaleChange(otherLocale)}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-foreground dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-foreground transition-colors"
      aria-label={`Switch to ${localeNames[otherLocale]}`}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}
