import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { getArticleMetadata } from '../article-metadata';

const MDXComponents = {
  en: dynamic(() => import('./en.mdx')),
  'pt-br': dynamic(() => import('./pt-br.mdx')),
};

interface PageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return getArticleMetadata('I-am-back-again', locale);
}

export default function Page({ params: { locale } }: PageProps): JSX.Element {
  const MDXComponent = MDXComponents[locale] || MDXComponents['en']; // Fallback to English if locale not found

  return (
    <div>
      <MDXComponent />
    </div>
  );
}
