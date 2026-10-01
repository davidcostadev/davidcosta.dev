import mdxfrom from '@next/mdx';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

import createNextIntlPlugin from 'next-intl/plugin';

// A block without a language is command output; ```text marks file contents.
// Both render unhighlighted, and CodeBlock labels them from the language class.
const PLAIN_LANGS = { output: 'output', text: 'text', txt: 'text', plain: 'text' };

const remarkPlainCode = () => (tree) => {
  const visit = (node) => {
    if (node.type === 'code') {
      node.lang = node.lang ? (PLAIN_LANGS[node.lang] ?? node.lang) : 'output';
    }
    node.children?.forEach(visit);
  };
  visit(tree);
};

// rehype-prism-plus only tags <pre> for languages it highlights; CodeBlock reads
// the language from <pre>, so copy it over from <code> for the plain ones too.
const rehypePreLanguage = () => (tree) => {
  const visit = (node) => {
    const code = node.tagName === 'pre' && node.children?.find((child) => child.tagName === 'code');
    const lang = code?.properties?.className?.find((name) => name.startsWith('language-'));
    if (lang && !node.properties.className?.includes(lang)) {
      node.properties.className = [...(node.properties.className ?? []), lang];
    }
    node.children?.forEach(visit);
  };
  visit(tree);
};

// Stores the digit count of the last line number on <pre>, so the optional line
// number gutter (drawn by CSS from rehype-prism-plus's .code-line spans) fits it.
const rehypeLineDigits = () => (tree) => {
  const visit = (node) => {
    const code = node.tagName === 'pre' && node.children?.find((child) => child.tagName === 'code');
    if (code) {
      const lines = code.children.filter((child) =>
        child.properties?.className?.includes('code-line'),
      ).length;
      node.properties.style = `--line-digits: ${String(Math.max(lines, 1)).length}`;
      return;
    }
    node.children?.forEach(visit);
  };
  visit(tree);
};

// Wraps spaces and tabs inside code blocks so CodeBlock's "show whitespace"
// toggle can draw them with CSS. The characters stay in the text, so copying
// and layout are unchanged. Spaces are wrapped per run, tabs one by one,
// since each tab gets its own arrow.
const rehypeWhitespace = () => (tree) => {
  const wrap = (value) =>
    value
      .split(/( +|\t)/)
      .filter(Boolean)
      .map((part) =>
        part === '\t' || part[0] === ' '
          ? {
              type: 'element',
              tagName: 'span',
              properties: { className: [part === '\t' ? 'ws-tab' : 'ws-space'] },
              children: [{ type: 'text', value: part }],
            }
          : { type: 'text', value: part },
      );

  const visitCode = (node) => {
    node.children = node.children?.flatMap((child) => {
      if (child.type === 'text') return wrap(child.value);
      visitCode(child);
      return [child];
    });
  };

  const visit = (node) => {
    if (node.tagName === 'pre') {
      node.children?.filter((child) => child.tagName === 'code').forEach(visitCode);
      return;
    }
    node.children?.forEach(visit);
  };
  visit(tree);
};

const withNextIntl = createNextIntlPlugin();
const withMDX = mdxfrom({
  // Optionally provide remark and rehype plugins
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    commonmark: true,
    gfm: true,
    remarkPlugins: [remarkGfm, remarkPlainCode, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [rehypePrism, { ignoreMissing: true }],
      rehypePreLanguage,
      rehypeLineDigits,
      rehypeWhitespace,
    ],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/articles/pt-br/:slug',
        destination: '/pt-br/articles/:slug',
        permanent: true,
      },
      {
        source: '/articles/en/:slug',
        destination: '/en/articles/:slug',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));
