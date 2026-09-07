'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * useScrollSpy
 * Returns the id of the section currently in view.
 *
 * Why a custom hook instead of a one-off IntersectionObserver:
 * - We need to be tolerant of a section list that grows/shrinks.
 * - The previous version took a fresh section list as a dependency,
 *   which tore down and re-created the observer on every render where
 *   the parent re-created the array literal. We memoize internally.
 * - At the top of the page (before the first section is hit by the
 *   rootMargin window), we still want to show "home" as the default.
 * - We track which entries are currently intersecting and pick the
 *   topmost one — the previous version would clobber state on any
 *   entry whose `isIntersecting` flipped, including ones that just
 *   left the viewport.
 */
export function useScrollSpy(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] ?? ''
  );

  // Keep a ref to the latest list so the effect can read it without
  // re-subscribing on every render.
  const idsRef = useRef(sectionIds);
  useEffect(() => {
    idsRef.current = sectionIds;
  }, [sectionIds]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visible = new Map<string, number>(); // id -> intersectionRatio

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Pick the visible section closest to the top of the viewport.
        if (visible.size > 0) {
          // Sections are observed in document order; the first key
          // is the topmost one in the DOM, which matches what we
          // want for the active highlight.
          const next = idsRef.current.find((id) => visible.has(id));
          if (next) setActiveSection(next);
        }
      },
      {
        // Treat the top 96px of the viewport as "behind the sticky
        // header" and the bottom 55% as "next section territory".
        rootMargin: '-96px 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const observed: Element[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    }

    return () => {
      for (const el of observed) observer.unobserve(el);
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
