import { Metadata } from 'next';

export const metadata: Metadata = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  title: {
    template: '%s | David Costa',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-5 sm:px-12 max-w-4xl mx-auto min-h-screen">
      <article className="break-words text-primary-light dark:text-primary-dark font-normal">
        {children}
      </article>
    </main>
  );
}
