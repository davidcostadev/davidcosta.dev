import { readdir, stat } from 'fs/promises';
import path from 'path';
import { PostWidget } from 'components/PostWidget';
import { fileURLToPath } from 'url';
import { getTranslations } from 'next-intl/server';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Post {
  slug: string;
  title: string;
  date: string;
  lang: string;
  tags: string[];
  description: string;
}

const locales = ['en', 'pt-br'];

async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [];

  for (const locale of locales) {
    let dirPath = path.join(__dirname);

    try {
      const slugs = (await readdir(dirPath, { withFileTypes: true })).filter((dirent) =>
        dirent.isDirectory(),
      );

      for (const { name } of slugs) {
        const mdxFilePath = path.join(dirPath, name, `${locale}.mdx`);
        try {
          const { metadata } = await import(`.${mdxFilePath.replace(__dirname, '')}`);
          posts.push({ slug: name, lang: locale, ...metadata });
        } catch (error) {
          console.error(`Erro ao carregar ${mdxFilePath}:`, error);
          continue;
        }
      }
    } catch (error) {
      console.error(`Erro ao ler diretório de ${locale}:`, error);
      continue;
    }
  }

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return posts;
}

export default async function Home({ params: { locale } }) {
  const t = await getTranslations();
  const posts = await getPosts();
  const postsLocale = posts.filter((post) => post.lang === locale);
  return (
    <main className="flex flex-col">
      <header className="py-6 flex flex-col gap-4">
        <h1 className="font-title text-5xl text-primary-light dark:text-primary-dark font-bold leading-tight">
          {t('blog.title')}
        </h1>
        <p className="text-lg text-secondary-light dark:text-secondary-dark">
          {t('blog.subtitle')}
        </p>
      </header>

      <section className="mb-6">
        <ul className="grid grid-cols-1 gap-4">
          {postsLocale.map((post) => (
            <PostWidget post={post} key={post.slug} />
          ))}
        </ul>
      </section>
    </main>
  );
}
