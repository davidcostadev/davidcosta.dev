import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  title: {
    template: '%s | David Costa',
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main className="px-5 sm:px-12 max-w-4xl mx-auto min-h-screen">
      <article className="break-words text-primary-light dark:text-primary-dark font-normal">
        {children}
      </article>
    </main>
  );
}
