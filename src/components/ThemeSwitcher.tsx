'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();

  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      className="hover:bg-black/10 dark:hover:bg-white/20 rounded-full w-12 h-12 inline-flex justify-center items-center group"
      onClick={toggleTheme}
      title={theme === 'light' ? t('topbar.nav.themeTitleDark') : t('topbar.nav.themeTitleLight')}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-[32px] h-[32px] text-gray-900 group-hover:text-purple-500" />
      ) : (
        <SunIcon className="w-[32px] h-[32px] dark:text-primary-dark group-hover:text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
