import { OG_IMAGE_SIZE, renderArticleOgImage, type ArticleOgContent } from '../article-og-image';

const CONTENT: Record<string, ArticleOgContent> = {
  en: {
    title: 'SSH keys from the inside',
    description: 'How they work, the key types and the security risks, with real outputs.',
    alt: 'SSH keys from the inside, by David Costa',
  },
  'pt-br': {
    title: 'Chaves SSH por dentro',
    description: 'Como funcionam, os tipos de chave e os riscos de segurança, com outputs reais.',
    alt: 'Chaves SSH por dentro, por David Costa',
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
  return renderArticleOgImage({ title, description, tags: ['linux', 'security', 'ssh'] });
}
