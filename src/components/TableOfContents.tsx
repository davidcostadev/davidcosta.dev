'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export interface TocItem {
  id: string;
  level: 2 | 3;
  text: string;
}

// A heading counts as "reached" once it scrolls past the sticky navbar
const ACTIVE_OFFSET = 96;

/** Sticky summary of the article's sections, highlighting the one being read. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const t = useTranslations('article');
  const [active, setActive] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > ACTIVE_OFFSET) break;
        current = heading.id;
      }
      // Short last sections never reach the top, so the page bottom selects the last one
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && headings.length) current = headings[headings.length - 1].id;
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [items]);

  // Long summaries scroll on their own: keep the active entry in view, moving only
  // the summary's scroll position, never the page's
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current]');
    if (!nav || !link) return;
    const margin = 32;
    if (link.offsetTop - margin < nav.scrollTop) {
      nav.scrollTop = link.offsetTop - margin;
    } else if (link.offsetTop + link.offsetHeight + margin > nav.scrollTop + nav.clientHeight) {
      nav.scrollTop = link.offsetTop + link.offsetHeight + margin - nav.clientHeight;
    }
  }, [active]);

  return (
    <nav ref={navRef} aria-label={t('toc')} className="toc">
      <p className="toc__title">{t('toc')}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={clsx('toc__link', item.level === 3 && 'toc__link--nested')}
              aria-current={item.id === active ? 'location' : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
