import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

// Locale-aware versions of Next's navigation APIs. Their `Link` adds the current
// locale to the href and, when switching locales, updates the NEXT_LOCALE cookie,
// which the middleware only does on full page loads.
export const { Link, usePathname, useRouter, redirect, getPathname } = createNavigation(routing);
