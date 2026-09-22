import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next internals and files, so unprefixed paths
  // such as /careers redirect to a locale instead of returning 404.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
