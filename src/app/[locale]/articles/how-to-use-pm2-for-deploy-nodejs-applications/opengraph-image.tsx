import { OG_IMAGE_SIZE, renderArticleOgImage, type ArticleOgContent } from '../article-og-image';

const CONTENT: Record<string, ArticleOgContent> = {
  en: {
    title: 'How to Use PM2 for Deploying Node.js Applications',
    description: 'A tutorial on how to easily use PM2 to deploy your Node.js applications.',
    alt: 'How to Use PM2 for Deploying Node.js Applications, by David Costa',
  },
  'pt-br': {
    title: 'Como Usar PM2 para Desdobrar Aplicações Node.js',
    description:
      'Um tutorial sobre como usar facilmente o PM2 para implantar seus aplicativos Node.js.',
    alt: 'Como Usar PM2 para Desdobrar Aplicações Node.js, por David Costa',
  },
};

// Per-locale metadata so the alt text matches the page language
export async function generateImageMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { alt } = CONTENT[locale] ?? CONTENT.en;
  return [{ id: 'cover', alt, size: OG_IMAGE_SIZE, contentType: 'image/png' }];
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { title, description } = CONTENT[locale] ?? CONTENT.en;
  return renderArticleOgImage({ title, description, tags: ['pm2', 'node', 'javascript'] });
}
