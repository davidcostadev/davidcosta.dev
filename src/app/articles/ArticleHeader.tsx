interface FrontMatter {
  title: string;
  date: string;
  lang: string;
  tags: string[];
  description: string;
}

export const ArticleHeader = ({ title, date, tags }: FrontMatter) => {
  const locatedDate = date ? new Date(date).toLocaleDateString() : null;
  return (
    <>
      <h1>{title}</h1>
      <p className="text-sm">{locatedDate}</p>
      {tags.length > 0 && (
        <ul className="no-prose inline-flex list-none my-0 p-0 capitalize space-x-2">
          {tags.map((tag) => (
            <li key={tag} className="rounded bg-black bg-opacity-50 px-2 py-1 text-sm m-0">
              {tag}
            </li>
          ))}
        </ul>
      )}
      <hr />
    </>
  );
};
