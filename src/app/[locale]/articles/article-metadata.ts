import type { Metadata } from 'next';

import { locales } from 'config';

export const SITE_URL = 'https://davidcosta.dev';

const OPEN_GRAPH_LOCALES: Record<string, string> = {
  en: 'en_US',
  'pt-br': 'pt_BR',
};

interface ArticleFrontMatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  keywords?: string[];
}

const articlePath = (slug: string, locale: string) => `/${locale}/articles/${slug}`;

/**
 * Builds the page metadata from the `metadata` export of the article's MDX file,
 * which Next doesn't read on its own because the route is the page.tsx.
 */
export async function getArticleMetadata(slug: string, locale: string): Promise<Metadata> {
  const lang = (locales as readonly string[]).includes(locale) ? locale : 'en';
  const { metadata } = (await import(`./${slug}/${lang}.mdx`)) as { metadata: ArticleFrontMatter };
  const url = articlePath(slug, lang);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: 'David Costa', url: SITE_URL }],
    alternates: {
      canonical: url,
      languages: {
        en: articlePath(slug, 'en'),
        'pt-BR': articlePath(slug, 'pt-br'),
        'x-default': articlePath(slug, 'en'),
      },
    },
    openGraph: {
      type: 'article',
      url,
      siteName: 'David Costa',
      title: metadata.title,
      description: metadata.description,
      locale: OPEN_GRAPH_LOCALES[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => OPEN_GRAPH_LOCALES[l]),
      publishedTime: new Date(metadata.date).toISOString(),
      authors: ['David Costa'],
      tags: metadata.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
  };
}
