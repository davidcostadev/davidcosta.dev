import type { ComponentProps } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

const SITE_ORIGIN = 'https://davidcosta.dev';

/** Article link; external ones open in a new tab and show an icon on hover. */
export function ArticleLink({ href = '', children, ...props }: ComponentProps<'a'>) {
  const t = useTranslations('article');
  const external = /^https?:\/\//.test(href) && !href.startsWith(SITE_ORIGIN);

  if (!external) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props} data-external="">
      {children}
      <ArrowTopRightOnSquareIcon
        className="external-link-icon"
        role="img"
        aria-hidden={false}
        aria-label={t('opensInNewTab')}
      />
    </a>
  );
}
