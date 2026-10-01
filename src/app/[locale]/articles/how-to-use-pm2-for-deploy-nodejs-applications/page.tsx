import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { getArticleMetadata } from '../article-metadata';

const MDXComponents = {
  en: dynamic(() => import('./en.mdx')),
  'pt-br': dynamic(() => import('./pt-br.mdx')),
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return getArticleMetadata('how-to-use-pm2-for-deploy-nodejs-applications', locale);
}

export default function Page({ params: { locale } }) {
  const MDXComponent = MDXComponents[locale] || MDXComponents['en']; // Fallback to English if locale not found

  return (
    <div>
      <MDXComponent />
    </div>
  );
}
