'use client';
import { useEffect, useState } from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { TranslateSwitcher } from '../components/TranslateSwitcher';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { useTranslations } from 'next-intl';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations();
  // Article pages are wider on large screens; keep the navbar lined up with them
  const isArticle = /^\/[^/]+\/articles\/[^/]+/.test(usePathname() ?? '');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 px-5',
        'bg-white dark:bg-gray-900 bg-opacity-90',
        'border-b border-gray-200 dark:border-gray-800',
        'transition-shadow duration-300',
        { 'shadow-md': isScrolled },
      )}
    >
      <div
        className={clsx(
          'max-w-4xl m-auto flex justify-between items-center h-[64px]',
          isArticle && 'xl:max-w-[76rem] 2xl:max-w-[79rem]',
        )}
      >
        <div className="font-title text-2xl font-medium">
          <Link
            href="/"
            className="text-primary hover:text-purple-400"
            title={t('topbar.brandTitle')}
          >
            {t('topbar.brand')}
          </Link>
        </div>
        <nav className="flex gap-5 items-center">
          <ThemeSwitcher />
          <TranslateSwitcher />
          <ul className="flex">
            <li className="text-lg font-medium">
              <Link
                href="/articles"
                className="text-secondary hover:text-purple-400 px-3 py-2"
                title={t('topbar.nav.blogTitle')}
              >
                {t('topbar.nav.blog')}
              </Link>
            </li>
            {/* <li className="text-lg font-medium">
              <Link href="/projects" className="text-secondary hover:text-purple-400 px-3 py-2">
                Projects
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};
