interface FrontMatter {
  __resourcePath: string;
  title: string;
  date: string;
  lang: string;
  tags: string[];
  description: string;
}

declare module '*.mdx' {
  let MDXComponent: (props: unknown) => JSX.Element;
  export default MDXComponent;
  export const frontmatter: FrontMatter;
}

// webpack's import.meta.webpackContext, used to list the articles at build time
interface ImportMeta {
  webpackContext(
    request: string,
    options: { recursive?: boolean; regExp?: RegExp; mode?: 'sync' | 'lazy' },
  ): {
    (id: string): Promise<unknown>;
    keys(): string[];
  };
}
