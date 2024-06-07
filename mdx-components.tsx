import type { MDXComponents } from 'mdx/types';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    ...components,
    p: (props) => (
      <p
        className="font-body text-xl mb-4 lg:mb-8 font-normal leading-relaxed whitespace-pre-wrap text-primary-light dark:text-primary-dark"
        {...props}
      />
    ),
    h1: (props) => (
      <h1
        className="font-title text-5xl text-primary-light dark:text-primary-dark font-bold leading-tight mb-8 mt-14"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="font-title text-4xl text-primary-light dark:text-primary-dark font-bold leading-tight mb-8 mt-14"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="font-title text-3xl text-primary-light dark:text-primary-dark font-bold leading-tight mb-8 mt-14"
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        className="font-title text-2xl text-primary-light dark:text-primary-dark font-bold leading-tight mb-8 mt-14"
        {...props}
      />
    ),
    h5: (props) => (
      <h5
        className="font-title text-xl text-primary-light dark:text-primary-dark font-bold leading-tight mb-8 mt-14"
        {...props}
      />
    ),
    h6: (props) => (
      <h6
        className="font-title text-base text-primary-light dark:text-primary-dark font-bold leading-tight mb-8 mt-14"
        {...props}
      />
    ),
    ul: (props) => <ul className="list-disc mb-8 ml-6 list-outside" {...props} />,
    ol: (props) => <ol className="list-decimal list-outside ml-6 mb-8" {...props} />,
    li: (props) => (
      <li
        className="mb-3 leading-relaxed marker:text-theme-light dark:marker:text-theme-dark marker:mr-0"
        {...props}
      />
    ),
    code: (props) => <code className="font-code px-1 py-px rounded-md " {...props} />,
    hr: (props) => <hr className="border-border-200 dark:border-white/10 mb-8" {...props} />,
    a: (props) => (
      <a
        className="text-link-light-normal dark:text-link-dark-normal hover:text-link-light--hover dark:hover:text-link-dark--hover active:text-link-light -active dark:active:text-link-dark-active underline hover:no-underline"
        {...props}
      />
    ),
  };
}
