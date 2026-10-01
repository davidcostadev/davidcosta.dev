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
    // Summary and article are centered together on wide screens, lined up with the
    // navbar: the summary under the site name, the text ending under "Blog"
    <div className="article-layout xl:grid xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-x-16 2xl:grid-cols-[18rem_minmax(0,1fr)] 2xl:gap-x-20">
      <aside className="hidden xl:block">
        {toc.length > 1 && (
          <div className="sticky top-24">
            <TableOfContents items={toc} />
          </div>
        )}
      </aside>
      <div className="min-w-0">
        <ArticleHeader {...meta} />
        {children}
        <script
          type="application/ld+json"
          // Escape < so a </script> in the frontmatter can't close the tag early
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </div>
    </div>
  );
}
