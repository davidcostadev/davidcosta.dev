import React from 'react';

import { ArticleHeader, FrontMatter } from './ArticleHeader';

export function ArticleWrapper({
  children,
  meta,
}: {
  children: React.ReactNode;
  meta: FrontMatter;
}) {
  return (
    <>
      <ArticleHeader {...meta} />
      {children}
    </>
  );
}
