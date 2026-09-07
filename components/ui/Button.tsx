import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    'bg-orange-500 hover:bg-orange-400 text-white shadow-md shadow-orange-500/25',
  secondary:
    'border border-white/10 bg-slate-900/60 text-slate-200 hover:text-white hover:border-orange-500/40',
  ghost:
    'text-slate-300 hover:text-white hover:bg-white/5',
};

/**
 * Button — the shared CTA shape used across the site.
 * Composes well with icons and a "loading" state.
 */
export default function Button({
  variant = 'primary',
  fullWidth,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed ${
        VARIANT_CLASS[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
