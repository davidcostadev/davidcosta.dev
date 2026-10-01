import { OG_IMAGE_SIZE, renderArticleOgImage, type ArticleOgContent } from '../article-og-image';

const CONTENT: Record<string, ArticleOgContent> = {
  en: {
    title: 'A practical guide to age on Linux',
    description: 'Encrypt files, folders and backups, with every command and its real output.',
    alt: 'A practical guide to age on Linux, by David Costa',
  },
  'pt-br': {
    title: 'Guia prático do age no Linux',
    description: 'Criptografe arquivos, pastas e backups, com cada comando e o output real.',
    alt: 'Guia prático do age no Linux, por David Costa',
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
  return renderArticleOgImage({ title, description, tags: ['linux', 'security', 'cryptography'] });
}
