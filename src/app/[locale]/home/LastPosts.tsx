import { PostWidget } from 'components/PostWidget';
import { useTranslations } from 'next-intl';
import { getPosts } from '../articles/get-posts';
import { getLocale } from 'next-intl/server';

export const LastPosts = async () => {
  const locale = await getLocale();

  const posts = await getPosts({ limit: 3, lang: locale });

  return (
    <div className="max-w-3xl m-auto px-2 sm:px-6 mb-7">
      <Title />
      <ul className="grid grid-cols-1 gap-4">
        {posts.map((post) => {
          return <PostWidget key={post.slug} post={post} />;
        })}
      </ul>
    </div>
  );
};

const Title = () => {
  const t = useTranslations();

  return (
    <h3 className="text-4xl font-bold my-4 px-3 sm:px-10 sm:mb-4 font-title">
      {t('homepage.lastPosts')}
    </h3>
  );
};

// const posts = [
//   {
//     id: 1,
//     title: 'How to use pm2 for deploy nodejs applications',
//     description: 'A tutorial of how to easy use pm2 to deploy your applications',
//     tags: ['seedling', 'javascript', 'node'],
//     date: '2020-08-14',
//     slug: 'how-to-use-pm2-for-deploy-nodejs-applications',
//     lang: 'en',
//   },
//   {
//     id: 2,
//     title: 'My notes about Leaning in public',
//     description:
//       'Some notes about what I understand about learning in public and why it’s important',
//     tags: ['career', 'digital garden'],
//     date: '2020-08-03',
//     slug: 'my-notes-about-learning-in-public',
//     lang: 'en',
//   },
//   {
//     id: 3,
//     title: 'Using Popper as Tooltip TypeScript and styled-components',
//     description: 'In this article I talk a little about my journey of doing a tooltip with popper.',
//     tags: ['javascript', 'typescript', 'tooltip', 'styled-components'],
//     date: '2020-07-29',
//     slug: 'using-popper-as-tooltip-typeScript-and-styled-component',
//     lang: 'en',
//   },
// ];
