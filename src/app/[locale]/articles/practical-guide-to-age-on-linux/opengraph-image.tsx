import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CONTENT: Record<string, { title: string; description: string; alt: string }> = {
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
export function generateImageMetadata({ params: { locale } }: { params: { locale: string } }) {
  return [{ id: 'cover', alt: (CONTENT[locale] ?? CONTENT.en).alt, size, contentType }];
}

export default function Image({ params: { locale } }: { params: { locale: string } }) {
  const { title, description } = CONTENT[locale] ?? CONTENT.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#161b22',
          color: '#eceff4',
          borderTop: '12px solid #b392f0',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#b392f0', letterSpacing: 2 }}>
          davidcosta.dev
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#9198a1', lineHeight: 1.4 }}>
            {description}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 24, color: '#d8dee9' }}>
          {['linux', 'security', 'cryptography'].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                padding: '8px 20px',
                borderRadius: 999,
                background: '#22272e',
                border: '1px solid #343a46',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
