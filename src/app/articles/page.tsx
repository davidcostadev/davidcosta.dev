import { readdir } from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

import { PostWidget } from 'components/PostWidget';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Post {
  slug: string;
  title: string;
  date: string;
  lang: string;
  tags: string[];
  description: string;
}

async function getPosts(): Promise<Post[]> {
  // Retrieve slugs from post routes
  const slugs = (await readdir('./src/app/articles/en', { withFileTypes: true })).filter((dirent) =>
    dirent.isDirectory()
  );

  // Retrieve metadata from MDX files
  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`./en/${name}/page.mdx`);
      return { slug: name, ...metadata };
    })
  );

  // Sort posts from newest to oldest
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex flex-col">
      <header className="py-6 flex flex-col gap-4">
        <h1 className="font-title text-5xl text-primary-light dark:text-primary-dark font-bold leading-tight">
          Blog
        </h1>
        <p className="text-lg text-secondary-light dark:text-secondary-dark">
          Welcome to my blog, where I write about my journey as a developer, and share some tips and
          tricks I{"'"}ve learned along the way.
        </p>
      </header>

      <section className="mb-6">
        <ul className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <PostWidget post={post} key={post.slug} />
          ))}
        </ul>
      </section>
    </main>
  );
}
