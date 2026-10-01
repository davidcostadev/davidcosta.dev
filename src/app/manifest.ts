import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'David Costa',
    short_name: 'David Costa',
    description: 'Articles about software engineering, by David Costa.',
    start_url: '/',
    display: 'browser',
    background_color: '#161b22',
    theme_color: '#161b22',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  };
}
