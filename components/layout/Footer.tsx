'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const SOCIAL = [
  {
    label: 'GitHub',
    href: 'https://github.com/Olayinka-Olaniran',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.73.5.78 5.45.78 11.72c0 4.95 3.21 9.14 7.66 10.62.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.12.68-3.78-1.31-3.78-1.31-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.72-1.5-2.49-.28-5.11-1.25-5.11-5.55 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.11 1.15.9-.25 1.87-.37 2.83-.38.96.01 1.93.13 2.83.38 2.16-1.45 3.11-1.15 3.11-1.15.61 1.54.23 2.68.11 2.96.72.79 1.16 1.79 1.16 3.02 0 4.31-2.62 5.27-5.12 5.54.4.34.76 1.01.76 2.05 0 1.48-.01 2.68-.01 3.04 0 .3.2.65.78.54 4.45-1.48 7.65-5.67 7.65-10.62C23.22 5.45 18.27.5 12 .5z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/olayinka-olaniran-a2ba063a2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2H21.5l-7.49 8.56L22.79 22h-6.84l-5.36-6.99L4.34 22H1.08l8.02-9.16L1.21 2h6.99l4.84 6.4L18.244 2zm-2.4 18h1.86L7.27 4H5.31l10.53 16z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:oolaniran853@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer
        data-reveal="fade"
        className="relative mt-12 border-t border-white/5"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="mx-auto max-w-5xl px-4 py-10 grid gap-8 sm:grid-cols-3 text-sm text-slate-300">
          {/* Brand + tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-slate-100">
                Olayinka<span className="text-orange-500">.</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Frontend engineer focused on accessible, fast interfaces —
              built with JavaScript fundamentals first.
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Sitemap" className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Sitemap
            </p>
            <ul className="grid gap-2">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-slate-300 hover:text-orange-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Find me on
            </p>
            <ul className="flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-orange-400 hover:border-orange-500/40 hover:bg-orange-500/10 transition"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-slate-500 text-xs leading-relaxed pt-2">
              Or drop a line at{' '}
              <Link
                href="mailto:oolaniran853@gmail.com"
                className="text-slate-300 hover:text-orange-400 underline-offset-4 hover:underline"
              >
                oolaniran853@gmail.com
              </Link>
            </p>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto max-w-5xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Olayinka Olaniran. All rights reserved.</p>
            <p>
              Built with Next.js, TypeScript &amp; Tailwind. Deployed on Netlify.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <a
        href="#home"
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/30 transition-all duration-300 ${
          showTop
            ? 'opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 translate-y-2'
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </a>
    </>
  );
}
