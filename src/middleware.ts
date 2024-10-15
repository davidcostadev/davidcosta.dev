import createMiddleware from 'next-intl/middleware';

import { localePrefix, locales } from './config';

export default createMiddleware({
  defaultLocale: 'en',
  locales,
  localePrefix,
});

export const config = {
  matcher: ['/', '/(en|pt)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
