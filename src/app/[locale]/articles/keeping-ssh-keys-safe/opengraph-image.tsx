import { OG_IMAGE_SIZE, renderArticleOgImage, type ArticleOgContent } from '../article-og-image';

const CONTENT: Record<string, ArticleOgContent> = {
  en: {
    title: 'Keeping your SSH keys safe',
    description: 'Passphrases, the agent and hardware keys, on Linux, macOS and Windows.',
    alt: 'Keeping your SSH keys safe on Linux, macOS and Windows, by David Costa',
  },
  'pt-br': {
    title: 'Como manter suas chaves SSH seguras',
    description: 'Passphrase, agente e chaves em hardware, no Linux, no macOS e no Windows.',
    alt: 'Como manter suas chaves SSH seguras no Linux, macOS e Windows, por David Costa',
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
