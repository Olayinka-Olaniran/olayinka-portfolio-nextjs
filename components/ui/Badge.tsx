import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'default' | 'accent' | 'success';
  className?: string;
}

/**
 * Small inline pill used for technologies, tags, status chips.
 * Prefer using Tailwind classes inline at the call site when
 * the styling is highly custom; this is the shared shape.
 */
export default function Badge({ children, tone = 'default', className = '' }: BadgeProps) {
  const toneClass =
    tone === 'accent'
      ? 'border-orange-500/30 bg-orange-500/10 text-orange-300'
      : tone === 'success'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
      : 'border-white/10 bg-white/5 text-slate-300';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
