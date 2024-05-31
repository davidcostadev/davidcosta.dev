export interface FrontMatter {
  title: string;
  date: string;
  lang: string;
  tags?: string[];
  description: string;
}

export const ArticleHeader = ({ title, date, tags }: FrontMatter) => {
  const locatedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="py-6">
      <h1 className="font-title text-5xl text-primary-light dark:text-primary-dark font-bold leading-tight my-4">
        {title}
      </h1>
      <p className="text-lg font-body text-primary-light dark:text-primary-dark font-bold my-4">
        {locatedDate}
      </p>
      {tags && tags?.length > 0 && (
        <ul className="no-prose inline-flex list-none p-0 capitalize space-x-2 my-4">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-lg px-3 py-1 text-base m-0 dark:bg-white/10 bg-gray-200"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      <hr className="border-border-200 dark:border-white/10" />
    </header>
  );
};
