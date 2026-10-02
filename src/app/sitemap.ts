import type { MetadataRoute } from 'next';

import { locales } from 'config';

import { SITE_URL } from './[locale]/articles/article-metadata';
import { getPosts } from './[locale]/articles/get-posts';

const languages = (path: string) => ({
  en: `${SITE_URL}/en${path}`,
  'pt-BR': `${SITE_URL}/pt-br${path}`,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    ['', '/articles'].map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: { languages: languages(path) },
    })),
  );

  // getPosts already leaves drafts out of production builds
  const posts = await Promise.all(
    locales.map((locale) => getPosts({ lang: locale, limit: Number.POSITIVE_INFINITY })),
  );

  const articles: MetadataRoute.Sitemap = posts.flat().map((post) => ({
    url: `${SITE_URL}/${post.lang}/articles/${post.slug}`,
    lastModified: new Date(post.date),
    alternates: { languages: languages(`/articles/${post.slug}`) },
  }));

  return [...pages, ...articles];
}
