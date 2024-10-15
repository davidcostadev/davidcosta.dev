import React from 'react';

import { WithContext, BlogPosting } from 'schema-dts';

import { ArticleHeader, FrontMatter } from './ArticleHeader';

export function ArticleWrapper({
  children,
  meta,
}: {
  children: React.ReactNode;
  meta: FrontMatter;
}) {
  const formattedData = new Date(meta.date).toISOString().split('T')[0];

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    name: meta.title,
    headline: meta.title,
    author: {
      '@type': 'Person',
      name: 'David Costa',
    },
    datePublished: formattedData,
    description: meta.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': meta.alternates.canonical,
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
