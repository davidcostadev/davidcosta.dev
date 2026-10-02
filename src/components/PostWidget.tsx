import Link from 'next/link';
import * as Icon from 'components/icons';

interface Post {
  slug: string;
  title: string;
  date: string;
  lang: string;
  tags: string[];
  description: string;
  draft?: boolean;
}

type PostWidgetProps = {
  post: Post;
};

export const PostWidget = ({ post }: PostWidgetProps) => {
  const publishedAt = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentLang = post.lang === 'en' ? '' : '/pt-br';

  return (
    <li className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:py-8 sm:px-10">
      <h4 className="mb-2">
        <Link
          href={`${currentLang}/articles/${post.slug}`}
          className="text-link-light-normal hover:text-link-light-hover active:text-link-light-active dark:text-link-dark-normal dark:hover:text-link-dark-hover dark:active:text-link-dark-active font-title text-2xl font-bold"
        >
          {post.title}
        </Link>
        {post.draft && (
          <span className="ml-3 align-middle rounded-lg px-2 py-0.5 text-sm font-body font-bold uppercase tracking-wide bg-yellow-100 text-yellow-800 dark:bg-yellow-400/20 dark:text-yellow-300">
            Draft
          </span>
        )}
      </h4>
      <p className="text-lg font-body my-4">{post.description}</p>
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
      <p className="text-lg my-2 inline-flex items-center font-body text-secondary-light dark:text-secondary-dark">
        <Icon.IconBxTime />
        <span className="ml-1">{publishedAt}</span>
      </p>
    </li>
  );
};
