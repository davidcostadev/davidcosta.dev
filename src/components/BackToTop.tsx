'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

// Shows once the reader is this close to the end of a page they actually scrolled
const NEAR_BOTTOM = 600;

/** Floating "back to top" button, shown near the end of long pages. */
export function BackToTop() {
  const t = useTranslations('common');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrolled = window.scrollY > window.innerHeight;
      const distanceToBottom =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      setVisible(scrolled && distanceToBottom < NEAR_BOTTOM);
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
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className="back-to-top"
      data-visible={visible || undefined}
      onClick={scrollToTop}
      aria-label={t('backToTop')}
      title={t('backToTop')}
    >
      <ArrowUpIcon aria-hidden="true" />
    </button>
  );
}
