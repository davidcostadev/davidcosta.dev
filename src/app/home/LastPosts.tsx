import Link from 'next/link';

import * as Icon from 'components/icons';

export const LastPosts = () => {
  return (
    <div className="max-w-3xl m-auto px-2 sm:px-6 mb-7">
      <h3 className="text-4xl font-bold my-4 px-3 sm:px-10 sm:mb-4">
        Here my last <span className="text-primary">posts</span>
      </h3>
      <ul className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:py-8 sm:px-10"
          >
            <h4 className="mb-2">
              <Link
                href={post.href}
                className="text-link-light-normal hover:text-link-light-hover active:text-link-light-active dark:text-link-dark-normal dark:hover:text-link-dark-hover dark:active:text-link-dark-active font-title text-2xl font-bold"
              >
                {post.title}
              </Link>
            </h4>
            <p className="text-lg font-body my-4">{post.shortDescription}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg px-3 py-1 text-base m-0 dark:bg-white/10 bg-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-lg my-2 inline-flex items-center font-body">
              <Icon.IconBxTime />
              <span className="ml-1">{post.createdAt}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const posts = [
  {
    id: 1,
    title: 'How to use pm2 for deploy nodejs applications',
    shortDescription: 'A tutorial of how to easy use pm2 to deploy your applications',
    tags: ['seedling', 'javascript', 'node'],
    createdAt: '2020-08-14',
    href: '/articles/en/how-to-use-pm2-for-deploy-nodejs-applications',
  },
  {
    id: 2,
    title: 'My notes about Leaning in public',
    shortDescription:
      'Some notes about what I understand about learning in public and why it’s important',
    tags: ['career', 'digital garden'],
    createdAt: '2020-08-03',
    href: '/articles/en/my-notes-about-learning-in-public',
  },
  {
    id: 3,
    title: 'Using Popper as Tooltip TypeScript and styled-components',
    shortDescription:
      'In this article I talk a little about my journey of doing a tooltip with popper.',
    tags: ['javascript', 'typescript', 'tooltip', 'styled-components'],
    createdAt: '2020-07-29',
    href: '/articles/en/using-popper-as-tooltip-typeScript-and-styled-component',
  },
];
