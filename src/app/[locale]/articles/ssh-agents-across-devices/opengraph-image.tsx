import { OG_IMAGE_SIZE, renderArticleOgImage, type ArticleOgContent } from '../article-og-image';

const CONTENT: Record<string, ArticleOgContent> = {
  en: {
    title: 'Which SSH agent signs for you',
    description:
      'SSH_AUTH_SOCK, agent forwarding, tmux and ssh-askpass, with a laptop, a desktop and a VPS.',
    alt: 'Which SSH agent signs for you: laptop, desktop and VPS, by David Costa',
  },
  'pt-br': {
    title: 'Qual agente SSH assina por você',
    description:
      'SSH_AUTH_SOCK, agent forwarding, tmux e ssh-askpass, com notebook, desktop e VPS.',
    alt: 'Qual agente SSH assina por você: notebook, desktop e VPS, por David Costa',
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
