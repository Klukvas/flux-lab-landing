import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Page metadata already declares hreflang. The middleware's Link header would
  // duplicate it, and its x-default pointed at unprefixed URLs that returned 404.
  alternateLinks: false,
});
