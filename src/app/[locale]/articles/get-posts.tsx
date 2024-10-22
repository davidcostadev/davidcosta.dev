import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Post {
  slug: string;
  title: string;
  date: string;
  lang: string;
  tags: string[];
  description: string;
}

type GetPostsProps = {
  lang: string;
  limit?: number;
};

export async function getPosts({ limit = 10, lang }: GetPostsProps): Promise<Post[]> {
  const posts: Post[] = [];

  let count = 0;

  try {
    const dirPath = path.join(__dirname);
    const slugs = (await readdir(dirPath, { withFileTypes: true })).filter((dirent) =>
      dirent.isDirectory(),
    );

    for (const { name } of slugs) {
      if (count >= limit) {
        break;
      }
      const mdxFilePath = path.join(dirPath, name, `${lang}.mdx`);
      try {
        const { metadata } = await import(`.${mdxFilePath.replace(__dirname, '')}`);
        const postMetadata: Omit<Post, 'slug' | 'lang'> = metadata;

        posts.push({ slug: name, lang, ...postMetadata });
        count++;
      } catch (error) {
        console.error(`Error on load ${mdxFilePath}:`, error);
        continue;
      }
    }
  } catch (error) {
    console.error(`Error on read directory ${lang}:`, error);
  }

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return posts;
}
