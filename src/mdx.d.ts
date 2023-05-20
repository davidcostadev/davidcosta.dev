interface FrontMatter {
  __resourcePath: string;
  title: string;
  date: string;
  lang: string;
  tags: string[];
  description: string;
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  export const frontmatter: FrontMatter;
}
