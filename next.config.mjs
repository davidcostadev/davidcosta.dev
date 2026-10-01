// eslint-disable-next-line @typescript-eslint/no-var-requires
// const highlight = require('rehype-highlight');
// import rehypeHighlight from 'rehype-highlight';
import mdxfrom from '@next/mdx';
import remarkPrism from 'remark-prism';
import remarkGfm from 'remark-gfm';

import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

import createNextIntlPlugin from 'next-intl/plugin';

// remark-prism HTML-escapes code blocks without a language into a text node,
// so React escapes them again and quotes render as &quot;. Render those blocks
// here, with the same markup remark-prism uses, before it can touch them.
// A block without a language is command output; ```text marks file contents.
const PLAIN_LANGS = { output: 'output', text: 'text', txt: 'text', plain: 'text' };

const remarkPlainCode = () => (tree) => {
  const visit = (node) => {
    node.children?.forEach((child, index) => {
      const lang = child.lang ? PLAIN_LANGS[child.lang] : 'output';
      if (child.type !== 'code' || !lang) return visit(child);

      const className = [`language-${lang}`];
      node.children[index] = {
        type: 'plainCode',
        data: {
          hName: 'div',
          hProperties: { className: ['remark-highlight'] },
          hChildren: [
            {
              type: 'element',
              tagName: 'pre',
              properties: { className },
              children: [
                {
                  type: 'element',
                  tagName: 'code',
                  properties: { className },
                  children: [{ type: 'text', value: `${child.value}\n` }],
                },
              ],
            },
          ],
        },
      };
    });
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
    remarkPlugins: [
      remarkGfm,
      remarkPlainCode,
      [
        remarkPrism,
        {
          plugins: ['line-numbers'],
        },
      ],
      remarkFrontmatter,
      remarkMdxFrontmatter,
    ],
    // rehypePlugins: [rehypeHighlight],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    // appDir: true,
    mdxRs: false,
  },
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
