import type { MDXComponents } from 'mdx/types';

import { CodeBlock } from 'components/CodeBlock';
import { HeadingLink } from 'components/HeadingLink';

const listClassName = 'font-body text-xl mb-[1.6rem] text-body-light dark:text-body-dark';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    ...components,
    p: (props) => (
      <p
        className="font-body text-xl mb-[0.8rem] lg:mb-[1.6rem] font-normal leading-relaxed whitespace-pre-wrap text-body-light dark:text-body-dark"
        {...props}
      />
    ),
    h1: (props) => (
      <h1
        className="font-title text-5xl text-primary-light dark:text-primary-dark font-bold leading-tight mb-[1.6rem] mt-[2.8rem]"
        {...props}
      />
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="font-title text-4xl text-primary-light dark:text-primary-dark font-bold leading-tight mb-[1.6rem] mt-[2.8rem]"
        {...props}
      >
        <HeadingLink id={props.id}>{children}</HeadingLink>
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="font-title text-3xl text-primary-light dark:text-primary-dark font-bold leading-tight mb-[1.6rem] mt-[2.8rem]"
        {...props}
      >
        <HeadingLink id={props.id}>{children}</HeadingLink>
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="font-title text-2xl text-primary-light dark:text-primary-dark font-bold leading-tight mb-[1.6rem] mt-[2.8rem]"
        {...props}
      >
        <HeadingLink id={props.id}>{children}</HeadingLink>
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5
        className="font-title text-xl text-primary-light dark:text-primary-dark font-bold leading-tight mb-[1.6rem] mt-[2.8rem]"
        {...props}
      >
        <HeadingLink id={props.id}>{children}</HeadingLink>
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6
        className="font-title text-base text-primary-light dark:text-primary-dark font-bold leading-tight mb-[1.6rem] mt-[2.8rem]"
        {...props}
      >
        <HeadingLink id={props.id}>{children}</HeadingLink>
      </h6>
    ),
    // GFM task lists (`- [ ]`) come with their own classes, so they get their own styles
    ul: ({ className, ...props }) =>
      className?.includes('contains-task-list') ? (
        <ul className={`${listClassName} list-none`} {...props} />
      ) : (
        <ul className={`${listClassName} list-disc ml-6 list-outside`} {...props} />
      ),
    ol: (props) => <ol className={`${listClassName} list-decimal list-outside ml-6`} {...props} />,
    li: ({ className, ...props }) =>
      className?.includes('task-list-item') ? (
        <li className="leading-normal [&>input]:mr-3" {...props} />
      ) : (
        <li
          className="leading-normal marker:text-theme-light dark:marker:text-theme-dark marker:mr-0"
          {...props}
        />
      ),
    strong: (props) => <strong className="font-bold text-gray-950 dark:text-white" {...props} />,
    table: (props) => (
      <div className="overflow-x-auto mb-[1.6rem] rounded-xl border border-gray-300 dark:border-gray-700">
        <table className="w-full border-collapse font-body text-lg" {...props} />
      </div>
    ),
    thead: (props) => <thead className="bg-gray-50 dark:bg-gray-800" {...props} />,
    th: (props) => (
      <th
        className="text-left font-bold px-4 py-2.5 border-b border-gray-300 dark:border-gray-700 text-primary-light dark:text-primary-dark"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="px-4 py-2.5 align-top border-b border-gray-200 dark:border-gray-800 text-body-light dark:text-body-dark"
        {...props}
      />
    ),
    tr: (props) => <tr className="[&:last-child>td]:border-b-0" {...props} />,
    pre: (props) => <CodeBlock {...props} />,
    code: (props) => <code className="font-code px-1 py-px rounded-md " {...props} />,
    hr: (props) => <hr className="border-border-200 dark:border-white/10 mb-[1.6rem]" {...props} />,
    a: (props) => (
      <a
        className="text-link-light-normal dark:text-link-dark-normal hover:text-link-light--hover dark:hover:text-link-dark--hover active:text-link-light -active dark:active:text-link-dark-active underline hover:no-underline"
        {...props}
      />
    ),
  };
}
