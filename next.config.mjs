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
    rehypePlugins: [[rehypePrism, { ignoreMissing: true }], rehypePreLanguage],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: ['source.unsplash.com'],
  },
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
