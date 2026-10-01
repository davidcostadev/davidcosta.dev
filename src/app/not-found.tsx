'use client';

import Error from 'next/error';

// Rendered for requests that never reach a locale, so it brings its own <html>
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <title>404: This page could not be found.</title>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
