import { PostWidget } from 'components/PostWidget';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';

import { getPosts } from './get-posts';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();
  const posts = await getPosts({
    lang: locale,
  });
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
          {posts.map((post) => (
            <PostWidget post={post} key={post.slug} />
          ))}
        </ul>
      </section>
    </main>
  );
}
