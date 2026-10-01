import { useTranslations } from 'next-intl';

export interface FrontMatter {
  title: string;
  date: string;
  /** When the article was last substantially revised */
  updated?: string;
  lang: string;
  tags?: string[];
  description: string;
  alternates: {
    canonical: string;
  };
}

const formatDate = (date: string, lang: string) =>
  new Date(date).toLocaleDateString(lang === 'pt-br' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const ArticleHeader = ({ title, date, updated, lang, tags }: FrontMatter) => {
  const t = useTranslations('article');

  return (
    <header className="py-[1.2rem]">
      <h1 className="font-title text-5xl text-primary-light dark:text-primary-dark font-bold leading-tight my-[0.8rem]">
        {title}
      </h1>
      <p className="text-lg font-body text-secondary-light dark:text-secondary-dark font-bold my-[0.8rem]">
        <time dateTime={date}>{formatDate(date, lang)}</time>
        {updated && (
          <>
            {' · '}
            {t('updated')} <time dateTime={updated}>{formatDate(updated, lang)}</time>
          </>
        )}
      </p>
      {tags && tags?.length > 0 && (
        <ul className="no-prose inline-flex list-none p-0 capitalize flex-wrap">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-lg px-3 py-1 text-base m-0 dark:bg-white/10 bg-gray-200 mr-4 mb-2"
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
