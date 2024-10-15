import { LastPosts } from 'app/[locale]/home/LastPosts';
import { MyNetworks } from 'app/[locale]/home/MyNetworks';
import { BackgroundRetro } from 'app/[locale]/home/BackgroundRetro';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'David Costa - Senior Software Engineer',
  description: 'Creating creating better web experiences.',
  alternates: {
    canonical: 'https://davidcosta.dev',
  },
};

export default function Index() {
  const t = useTranslations();

  return (
    <main>
      <BackgroundRetro className="w-full h-72 sm:h-80 md:h-96" />
      <div>
        <div className="max-w-3xl m-auto px-2 sm:px-6 -mt-16 z-10 relative mb-7">
          <div className="shadow-lg bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-10">
            <h2 className="text-secondary text-xl sm:text-2xl">
              <span className="text-primary text-4xl sm:text-5xl mb-2 inline-flex w-full">
                {t('homepage.title')}
              </span>
              {t('homepage.subtitle')}
            </h2>
          </div>
        </div>
        <div className="max-w-3xl m-auto px-2 sm:px-6 mb-7">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-6 sm:py-8 sm:px-10 leading-relaxed">
            <p className="text-primary mb-4 sm:mb-6">
              {t.rich('homepage.introduction', {
                strong: (children) => <strong className="font-bold">{children}</strong>,
              })}
            </p>

            <p className="text-primary mb-4 sm:mb-4">
              {t.rich('homepage.experiences', {
                strong: (children) => <strong className="font-bold">{children}</strong>,
              })}
            </p>

            <p className="text-primary">{t('homepage.goal')}</p>
          </div>
        </div>
        <LastPosts />
        {/* <LastProjects /> */}
        <MyNetworks />
      </div>
    </main>
  );
}
