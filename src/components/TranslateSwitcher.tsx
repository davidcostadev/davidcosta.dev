import { useState, useEffect, useRef } from 'react';
import { IconTranslate } from './icons/IconTranslate';
import { Link, usePathname } from 'i18n/navigation';

export const TranslateSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="hover:bg-black/10 dark:hover:bg-white/20 rounded-full w-12 h-12 inline-flex justify-center items-center group"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <IconTranslate className="w-8 h-8 text-primary-light dark:text-primary-dark" />
      </button>
      <ul
        className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden transition-all duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <li>
          <Link
            href={pathname}
            locale="en"
            className=" w-full px-4 py-2 inline-flex hover:bg-gray-100 dark:hover:bg-gray-700  cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            English
          </Link>
        </li>
        <li>
          <Link
            href={pathname}
            locale="pt-br"
            className=" w-full px-4 py-2 inline-flex hover:bg-gray-100 dark:hover:bg-gray-700  cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Portuguese (Brazil)
          </Link>
        </li>
      </ul>
    </div>
  );
};
