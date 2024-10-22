import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'pt-br'] as const;

export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = 'always';

export type AppPathnames = keyof typeof pathnames;
