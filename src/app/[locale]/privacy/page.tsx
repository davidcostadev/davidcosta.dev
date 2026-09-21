import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const MDXComponents = {
  en: dynamic(() => import('./en.mdx')),
  'pt-br': dynamic(() => import('./pt-br.mdx')),
};

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How the personal Google OAuth client registered by David Costa handles data.',
};

export default function Page({ params: { locale } }) {
  const MDXComponent = MDXComponents[locale] || MDXComponents['en']; // Fallback to English if locale not found

  return (
    <div>
      <MDXComponent />
    </div>
  );
}
