// eslint-disable-next-line @typescript-eslint/no-var-requires
// const highlight = require('rehype-highlight');
// import rehypeHighlight from 'rehype-highlight';
import mdxfrom from '@next/mdx';
import remarkPrism from 'remark-prism';

import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

import createNextIntlPlugin from 'next-intl/plugin';
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
