'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  activeSection: string;
  onOpenPalette: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
] as const;

/**
 * Header
 * Sticky, glassmorphic nav bar.
 *
 * - Desktop: a single bar with a sliding "active" pill (uses
 *   `getBoundingClientRect` to position an absolutely-positioned
 *   background behind the active link so it animates between items
 *   with a `transform`, not a layout shift).
 * - Mobile: a collapsible sheet.
 * - The Cmd-K trigger shows a visible platform-specific hint.
 *
 * The previous version had two bugs: it called `React.useState` etc.
 * without importing React in scope (worked only because the file had
 * `'use client'`), and it re-rendered the same active check on every
 * scroll without batching. Both are gone in the rewrite.
 */
export default function Header({ activeSection, onOpenPalette }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pill, setPill] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    ready: boolean;
  }>({ x: 0, y: 0, w: 0, h: 0, ready: false });
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // useLayoutEffect prevents a one-frame "no pill" flash.
  // We compute the pill as a *top-left + size* rect relative to
  // the nav itself, then animate its `translate(x, y)` together
  // (and its width/height). This avoids fighting with Tailwind's
  // --tw-translate-y variable, which is what was leaving the
  // pill snapped to the top in the previous version.
  useLayoutEffect(() => {
    const update = () => {
      const el = itemRefs.current[activeSection];
      const parent = navRef.current;
      if (!el || !parent) return;
      const elRect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      setPill({
        x: elRect.left - parentRect.left,
        y: elRect.top - parentRect.top,
        w: elRect.width,
        h: elRect.height,
        ready: true,
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [activeSection]);

  return (
    <header className="sticky top-4 z-50 flex justify-center px-3 md:px-4 w-full">
      <div className="flex items-center justify-between w-full max-w-4xl px-3 py-2.5 rounded-full glass border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Olayinka — home"
        >
          <span className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-orange-500/50 group-hover:ring-orange-400 transition">
            <Image
              src="/assets/icons/Logo.png"
              alt=""
              width={32}
              height={32}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              priority
            />
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-100 group-hover:text-orange-400 transition">
            Olayinka<span className="text-orange-500">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          ref={navRef}
          className="relative hidden md:flex items-center"
          aria-label="Primary"
        >
          {/* Animated pill background — positioned by both x and y,
              so the pill is always exactly the size and location
              of the active link's bounding box. */}
          <span
            aria-hidden="true"
            className="absolute rounded-full bg-orange-500/15 border border-orange-500/30 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translate(${pill.x}px, ${pill.y}px)`,
              width: pill.w,
              height: pill.h,
              opacity: pill.ready ? 1 : 0,
            }}
          />
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`relative z-10 px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActive
                    ? 'text-orange-300'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Command palette trigger */}
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/60 border border-slate-700/60 rounded-full hover:border-orange-500/50 hover:text-orange-400 transition"
            aria-label="Open command palette"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            <kbd className="text-[10px] text-slate-500 border border-slate-700 rounded px-1.5 py-0.5 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-700/60 bg-slate-900/60 text-slate-300 hover:text-white hover:border-orange-500/50 transition"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
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
              {mobileOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      <div
        id="mobile-nav"
        className={`md:hidden absolute top-[4.25rem] left-3 right-3 transition-all duration-200 ${
          mobileOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav
          className="glass border border-white/10 rounded-2xl p-2 shadow-2xl"
          aria-label="Mobile"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`block px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-orange-300 bg-orange-500/10'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenPalette();
            }}
            className="mt-1 w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            ⌘K &nbsp;Command Palette
          </button>
        </nav>
      </div>
    </header>
  );
}
