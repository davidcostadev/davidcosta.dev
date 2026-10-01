import type { ReactNode } from 'react';

/**
 * Makes an article heading a link to itself, so clicking it puts the section in
 * the URL to share. The "#" hanging in the margin only marks it as a link.
 */
export function HeadingLink({ id, children }: { id?: string; children: ReactNode }) {
  if (!id) return children;

  return (
    <a href={`#${id}`} className="heading-link">
      <span className="heading-anchor" aria-hidden="true">
        #
      </span>
      {children}
    </a>
  );
}
