import React from 'react';

import { WithContext, BlogPosting } from 'schema-dts';

import { TableOfContents, type TocItem } from 'components/TableOfContents';

import { ArticleHeader, FrontMatter } from './ArticleHeader';
import { SITE_URL } from './article-metadata';

export function ArticleWrapper({
  children,
  meta,
  toc = [],
}: {
  children: React.ReactNode;
  meta: FrontMatter;
  /** The article's h2/h3 headings, exported by the MDX build (see rehypeToc) */
  toc?: TocItem[];
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
    ...(meta.updated && { dateModified: new Date(meta.updated).toISOString().split('T')[0] }),
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
      {/* In the left margin on wide screens, spanning the article so it can stick */}
      {toc.length > 1 && (
        <aside className="absolute inset-y-0 right-full mr-6 hidden w-44 xl:block">
          <div className="sticky top-24">
            <TableOfContents items={toc} />
          </div>
        </aside>
      )}
      <ArticleHeader {...meta} />
      {children}
      <script
        type="application/ld+json"
        // Escape < so a </script> in the frontmatter can't close the tag early
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
