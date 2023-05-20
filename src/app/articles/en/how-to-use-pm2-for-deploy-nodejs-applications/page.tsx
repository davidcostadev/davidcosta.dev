import Post, { frontmatter } from './post.mdx';

import { ArticleHeader } from '../../ArticleHeader';

export default function Index() {
  return (
    <article className="prose prose-invert">
      <ArticleHeader {...frontmatter} />
      <Post />
    </article>
  );
}
