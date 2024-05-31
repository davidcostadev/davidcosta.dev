import type { MDXComponents } from 'mdx/types';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    ...components,
    p: (props) => <p className="font-body text-xl my-4 font-normal leading-relaxed" {...props} />,
    h1: (props) => (
      <h1
        className="font-title text-5xl text-primary-light dark:text-primary-dark font-bold leading-tight my-4"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="font-title text-4xl text-primary-light dark:text-primary-dark font-bold leading-tight my-4"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="font-title text-3xl text-primary-light dark:text-primary-dark font-bold leading-tight my-4"
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        className="font-title text-2xl text-primary-light dark:text-primary-dark font-bold leading-tight my-4"
        {...props}
      />
    ),
    h5: (props) => (
      <h5
        className="font-title text-xl text-primary-light dark:text-primary-dark font-bold leading-tight my-4"
        {...props}
      />
    ),
    ul: (props) => <ul className="list-disc list-inside my-3" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside my-3" {...props} />,
    li: (props) => <li className="mb-1 leading-relaxed" {...props} />,
    code: (props) => <code className="text-code px-1 py-px rounded-md " {...props} />,
    hr: (props) => <hr className="border-border-200 dark:border-white/10 my-4" {...props} />,
    a: (props) => (
      <a
        className="text-link-light-normal dark:text-link-dark-normal hover:text-link-light--hover dark:hover:text-link-dark--hover active:text-link-light -active dark:active:text-link-dark-active hover:underline"
        {...props}
      />
    ),
  };
}
