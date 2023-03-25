import * as Icon from 'components/icons';

export const LastPosts = () => {
  return (
    <div className="max-w-3xl m-auto px-2 sm:px-6 mb-7">
      <h3 className="text-secondary text-2xl font-medium my-2 px-3 sm:px-10 sm:mb-4">
        Here my last <span className="text-primary">posts</span>
      </h3>
      <ul className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:py-6 sm:px-10"
          >
            <h4 className="text-primary text-lg font-medium mb-2">{post.title}</h4>
            <p className="text-secondary text-sm mb-2">{post.shortDescription}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-yellow-500 text-gray-800 rounded-full px-1.5 py-0.5 bg-opacity-70 text-[10px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-secondary text-xs mt-2 inline-flex items-center">
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
  },
  {
    id: 2,
    title: 'My notes about Leaning in public',
    shortDescription:
      'Some notes about what I understand about learning in public and why it’s important',
    tags: ['career', 'digital garden'],
    createdAt: '2020-08-03',
  },
  {
    id: 3,
    title: 'Using Popper as Tooltip TypeScript and styled-components',
    shortDescription:
      'In this article I talk a little about my journey of doing a tooltip with popper.',
    tags: ['javascript', 'typescript', 'tooltip', 'styled-components'],
    createdAt: '2020-07-29',
  },
];
