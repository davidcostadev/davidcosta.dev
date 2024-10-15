import dynamic from 'next/dynamic';

const MDXComponents = {
  en: dynamic(() => import('./en.mdx')),
  'pt-br': dynamic(() => import('./pt-br.mdx')),
};

interface PageProps {
  params: {
    locale: string;
  };
}

export default function Page({ params: { locale } }: PageProps): JSX.Element {
  const MDXComponent = MDXComponents[locale] || MDXComponents['en']; // Fallback to English if locale not found

  return (
    <div>
      <MDXComponent />
    </div>
  );
}
