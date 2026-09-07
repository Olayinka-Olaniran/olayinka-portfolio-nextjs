'use client';

import React, { useEffect, useState } from 'react';

const ROLES = [
  'Frontend Engineer',
  'JavaScript Nerd',
  'React + Next.js Builder',
  'Accessibility Advocate',
  'Pixel-Hunter',
];

/**
 * Choose the indefinite article for a role. "A" before a
 * consonant letter, "An" before a vowel letter. Good enough
 * for the role list — none of the entries are tricky cases
 * like "honest" (vowel sound despite starting with 'h').
 */
function articleFor(word: string): 'A' | 'An' {
  return /^[aeiou]/i.test(word.trim()) ? 'An' : 'A';
}

const STATS = [
  { value: '5', label: 'Engineered Projects' },
  { value: '9', label: 'Techniques Mapped' },
  { value: '100%', label: 'JavaScript Fundamentals' },
];

const FOCUS_ITEMS = [
  { label: 'Currently shipping', value: 'This portfolio' },
  { label: 'Learning', value: 'Advanced Next.js patterns' },
  { label: 'Open to', value: 'Frontend roles & contracts' },
];

/**
 * Hero
 * Above-the-fold section.
 *
 * Design choices:
 *  - The headline uses a single gradient (`text-gradient-accent`) on
 *    the name, so the eye lands there first.
 *  - A small "role switcher" cycles through job titles every 2.5s
 *    with a fade. Purely decorative; the screen-reader announces
 *    the whole list once via aria-live="off".
 *  - "Now" widget summarises current focus (1 line) in a card.
 *  - Stats row uses a thin orange divider for rhythm.
 */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2500
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      data-reveal="up"
      className="relative pt-14 pb-16 md:pt-20 md:pb-24 text-center flex flex-col items-center"
    >
      {/* Availability badge */}
      <div
        data-reveal="up"
        data-reveal-delay="60"
        className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-sm"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-emerald-300">
          Available for Frontend Roles &amp; Collaborations
        </span>
      </div>

      {/* Headline */}
      <h1
        data-reveal="up"
        data-reveal-delay="120"
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.1]"
      >
        Hi, I&rsquo;m{' '}
        <span className="text-gradient-accent">
          Olayinka Olaniran
        </span>
      </h1>

      {/* Role switcher */}
      <div
        data-reveal="up"
        data-reveal-delay="200"
        className="mt-5 h-8 sm:h-9 flex items-center justify-center text-base sm:text-lg text-slate-300"
        aria-live="polite"
      >
        <span className="text-slate-500 mr-2">
          {articleFor(ROLES[roleIndex])}
        </span>
        <span
          key={roleIndex}
          className="font-semibold text-orange-300 animate-fade-up"
        >
          {ROLES[roleIndex]}
        </span>
        <span className="ml-1 inline-block w-[2px] h-5 bg-orange-400 animate-pulse" aria-hidden="true" />
      </div>

      {/* Pitch */}
      <p
        data-reveal="up"
        data-reveal-delay="280"
        className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed"
      >
        Frontend engineer building accessible, high-performance interfaces with{' '}
        <span className="text-white font-medium">vanilla JavaScript fundamentals</span>{' '}
        done exceptionally well.
      </p>

      <p
        data-reveal="up"
        data-reveal-delay="340"
        className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl"
      >
        5 featured projects showcasing form parsing, live APIs, state
        persistence, and interactive UI logic — grounded in core JavaScript
        before scaling into React &amp; TypeScript.
      </p>

      {/* CTAs */}
      <div
        data-reveal="up"
        data-reveal-delay="420"
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        <a
          href="#portfolio"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          Explore Projects
          <svg
            className="w-4 h-4 group-hover:translate-y-0.5 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white text-sm font-semibold backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-200"
        >
          Get in Touch
        </a>
      </div>

      {/* Stats + Now widget */}
      <div
        data-reveal="up"
        data-reveal-delay="520"
        className="mt-14 grid w-full max-w-3xl grid-cols-1 md:grid-cols-3 gap-3"
      >
        {/* Stats card (2/3) */}
        <div className="md:col-span-2 grid grid-cols-3 gap-3 sm:gap-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm p-4">
          {STATS.map((item) => (
            <div
              key={item.label}
              className="text-center md:text-left px-2"
            >
              <p className="text-2xl sm:text-3xl font-bold text-gradient-accent">
                {item.value}
              </p>
              <p className="mt-1 text-[11px] sm:text-xs text-slate-400 font-medium leading-tight">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Now widget (1/3) */}
        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm p-4">
          <p className="text-[11px] uppercase tracking-wider text-orange-300/80 font-semibold">
            Now
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
            {FOCUS_ITEMS.map((f) => (
              <li key={f.label} className="flex items-baseline gap-2">
                <span className="text-slate-500 shrink-0">{f.label}:</span>
                <span className="text-slate-200 font-medium">{f.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
