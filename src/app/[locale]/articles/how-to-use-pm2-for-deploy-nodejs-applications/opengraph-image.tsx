import { ImageResponse } from 'next/og';

export async function generateImageMetadata() {
  const images = [1];
  return images.map((image, idx) => ({
    id: idx,
    size: { width: 1200, height: 600 },
    alt: 'asdasdasd',
    contentType: 'image/png',
  }));
}

export const runtime = 'edge';

// Image metadata
export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 20,
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 40,
          }}
        >
          Using Popper for Tooltips with TypeScript and Styled-components
        </div>
        <div
          style={{
            fontSize: 18,
          }}
        >
          In this article I talk about my journey of creating a tooltip with Popper.js.
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  );
}
