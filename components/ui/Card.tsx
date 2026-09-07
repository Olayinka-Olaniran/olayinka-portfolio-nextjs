import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
}

/**
 * Card — the dark-elevated surface used by every section.
 * Internally it composes the `.card-surface` utility from
 * `globals.css`. Use this when you want a consistently-styled
 * container; otherwise inline `className="card-surface"` at the
 * site.
 */
export default function Card({ as: Tag = 'div', className = '', children, ...rest }: CardProps) {
  const Element = Tag as React.ElementType;
  return (
    <Element className={`card-surface p-5 ${className}`} {...rest}>
      {children}
    </Element>
  );
}
