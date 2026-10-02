'use client';

import { useEffect, useState } from 'react';

/**
 * Hairline at the very top of the screen that fills as you read, from the start
 * of the article to its end (not the whole page, so comments or the footer
 * don't count).
 */
export function ReadingProgress({ targetSelector }: { targetSelector: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const start = target.getBoundingClientRect().top + window.scrollY;
      const end = start + target.offsetHeight - window.innerHeight;
      const value = end > start ? (window.scrollY - start) / (end - start) : 1;
      setProgress(Math.min(1, Math.max(0, value)));
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
  }, [targetSelector]);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div className="reading-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
