interface Post {
  slug: string;
  title: string;
  date: string;
  lang: string;
  tags: string[];
  description: string;
  draft?: boolean;
}

type GetPostsProps = {
  lang: string;
  limit?: number;
};

// Every article's MDX file, listed by webpack at build time. Reading the folder
// with fs instead breaks on hosts that render the page in a function that doesn't
// ship the source files, where the list silently came back empty.
const articles = import.meta.webpackContext('.', {
  recursive: true,
  regExp: /^\.\/[^/]+\/[^/]+\.mdx$/,
  mode: 'lazy',
});

export async function getPosts({ limit = 10, lang }: GetPostsProps): Promise<Post[]> {
  const posts: Post[] = [];

  for (const key of articles.keys()) {
    const [, slug, fileLang] = key.match(/^\.\/([^/]+)\/([^/]+)\.mdx$/) ?? [];
    if (fileLang !== lang) continue;

    try {
      const { metadata } = (await articles(key)) as { metadata: Omit<Post, 'slug' | 'lang'> };

      // Like the article pages, drafts are listed in dev for previewing and
      // don't exist in production
      if (!metadata.draft || process.env.NODE_ENV !== 'production') {
        posts.push({ slug, lang, ...metadata });
      }
    } catch (error) {
      console.error(`Error on load ${key}:`, error);
    }
  }

  // Sort before limiting, otherwise the limit keeps the first folders alphabetically
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return posts.slice(0, limit);
}
