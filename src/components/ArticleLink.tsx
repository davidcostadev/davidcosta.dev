import { Children, type ComponentProps, type ReactNode } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

const SITE_ORIGIN = 'https://davidcosta.dev';

/**
 * Puts the link's last word and the icon in one unbreakable span, so a line break
 * never leaves the icon alone at the start of a line. A link that ends in an
 * element (inline code, say) keeps the icon right after it, without the span.
 */
function attachToLastWord(children: ReactNode, icon: ReactNode) {
  const nodes = Children.toArray(children);
  const last = nodes.at(-1);
  const match = typeof last === 'string' ? last.match(/^([\s\S]*?)(\S+)\s*$/) : null;
  if (!match) return [...nodes, icon];

  return [
    ...nodes.slice(0, -1),
    match[1],
    <span key="last-word" className="external-link-tail">
      {match[2]}
      {icon}
    </span>,
  ];
}

/** Article link; external ones open in a new tab and end with an arrow icon. */
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
      {attachToLastWord(
        children,
        <ArrowTopRightOnSquareIcon
          key="icon"
          className="external-link-icon"
          role="img"
          aria-hidden={false}
          aria-label={t('opensInNewTab')}
        />,
      )}
    </a>
  );
}
