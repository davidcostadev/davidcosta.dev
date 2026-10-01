import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { getArticle, getArticleMetadata } from '../article-metadata';

const MDXComponents = {
  en: dynamic(() => import('./en.mdx')),
  'pt-br': dynamic(() => import('./pt-br.mdx')),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getArticleMetadata('my-notes-about-learning-in-public', locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  await getArticle('my-notes-about-learning-in-public', locale);
  const MDXComponent = MDXComponents[locale] || MDXComponents['en']; // Fallback to English if locale not found

  return (
    <div>
      <MDXComponent />
    </div>
  );
}
