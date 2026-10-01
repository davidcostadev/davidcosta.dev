import { OG_IMAGE_SIZE, renderArticleOgImage, type ArticleOgContent } from '../article-og-image';

const CONTENT: Record<string, ArticleOgContent> = {
  en: {
    title: 'Deploying Node.js apps with PM2 and pnpm',
    description:
      'One command from your machine: PM2 deploy, pnpm and the .env support built into Node.',
    alt: 'Deploying Node.js apps with PM2 and pnpm, by David Costa',
  },
  'pt-br': {
    title: 'Deploy de aplicações Node.js com PM2 e pnpm',
    description:
      'Um comando da sua máquina: PM2 deploy, pnpm e o suporte a .env que já vem no Node.',
    alt: 'Deploy de aplicações Node.js com PM2 e pnpm, por David Costa',
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
  return renderArticleOgImage({ title, description, tags: ['node', 'pm2', 'pnpm', 'deploy'] });
}
