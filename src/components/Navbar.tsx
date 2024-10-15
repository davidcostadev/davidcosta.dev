'use client';
import { useEffect, useState } from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { TranslateSwitcher } from '../components/TranslateSwitcher';
import Link from 'next/link';
import clsx from 'clsx';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        'transition-shadow duration-300',
        {
          'shadow-md border-b border-gray-300 dark:border-white/20': isScrolled,
        }
      )}
    >
      <div className="max-w-4xl m-auto flex justify-between items-center h-[64px]">
        <h1 className="text-2xl font-medium">
          <Link href="/" className="text-primary hover:text-purple-400">
            David Costa
          </Link>
        </h1>
        <nav className="flex gap-5 items-center">
          <ThemeSwitcher />
          <TranslateSwitcher />
          <ul className="flex">
            <li className="text-lg font-medium">
              <Link href="/articles" className="text-secondary hover:text-purple-400 px-3 py-2">
                Blog
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
