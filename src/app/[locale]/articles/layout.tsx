import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  title: {
    template: '%s | David Costa',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    // Article pages widen on large screens to fit the summary; the navbar matches
    <main className="px-5 sm:px-12 max-w-4xl mx-auto min-h-screen xl:has-[.article-layout]:max-w-[76rem] xl:has-[.article-layout]:px-0 2xl:has-[.article-layout]:max-w-[79rem]">
      <article className="break-words text-primary-light dark:text-primary-dark font-normal">
        {children}
      </article>
    </main>
  );
}
