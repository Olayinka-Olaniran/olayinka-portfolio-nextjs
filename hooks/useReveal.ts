'use client';

import { useEffect } from 'react';

/**
 * useReveal
 * One-shot IntersectionObserver that toggles `is-revealed` on every
 * element in the document with a `data-reveal` attribute. Defined as
 * a single hook (rather than per-section) so we never create more
 * than one observer for the whole page.
 *
 * Pair with the CSS in `app/globals.css`:
 *   [data-reveal]            -> hidden, slightly translated
 *   [data-reveal].is-revealed-> visible, in place
 */
export default function useReveal(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) {
      // No support -> just show everything.
      document
        .querySelectorAll<HTMLElement>('[data-reveal]')
        .forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.revealDelay ?? '0');
            if (delay > 0) {
              window.setTimeout(
                () => el.classList.add('is-revealed'),
                delay
              );
            } else {
              el.classList.add('is-revealed');
            }
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
