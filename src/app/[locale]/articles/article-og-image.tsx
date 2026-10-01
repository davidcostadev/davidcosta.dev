import { ImageResponse } from 'next/og';

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export interface ArticleOgContent {
  title: string;
  description: string;
  alt: string;
}

/** Social card shared by the articles' opengraph-image.tsx files. */
export function renderArticleOgImage({
  title,
  description,
  tags,
}: {
  title: string;
  description: string;
  tags: string[];
}) {
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
          {tags.map((tag) => (
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
    OG_IMAGE_SIZE,
  );
}
