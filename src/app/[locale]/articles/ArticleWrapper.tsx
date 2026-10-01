import React from 'react';

import { WithContext, BlogPosting } from 'schema-dts';

import { ArticleHeader, FrontMatter } from './ArticleHeader';
import { SITE_URL } from './article-metadata';

export function ArticleWrapper({
  children,
  meta,
}: {
  children: React.ReactNode;
  meta: FrontMatter;
}) {
  const formattedData = new Date(meta.date).toISOString().split('T')[0];
  const url = `${SITE_URL}${meta.alternates.canonical}`;

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    name: meta.title,
    headline: meta.title,
    author: {
      '@type': 'Person',
      name: 'David Costa',
      url: SITE_URL,
    },
    datePublished: formattedData,
    description: meta.description,
    inLanguage: meta.lang,
    keywords: meta.tags,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <>
      <ArticleHeader {...meta} />
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
