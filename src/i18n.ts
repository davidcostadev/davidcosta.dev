import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  return {
    messages: (await (locale === 'en' ? import('./lang/en.json') : import(`./lang/${locale}.json`)))
      .default,
  };
});
