import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { getArticle, getArticleMetadata } from '../article-metadata';

const MDXComponents = {
  en: dynamic(() => import('./en.mdx')),
  'pt-br': dynamic(() => import('./pt-br.mdx')),
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getArticleMetadata('age-hardware-keys', locale);
}

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  await getArticle('age-hardware-keys', locale);
  const MDXComponent = MDXComponents[locale] || MDXComponents['en']; // Fallback to English if locale not found

  return (
    <div>
      <MDXComponent />
    </div>
  );
}
