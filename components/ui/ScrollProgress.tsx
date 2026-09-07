'use client';

import { useEffect, useState } from 'react';

/**
 * ScrollProgress
 * A thin progress bar at the very top of the page that tracks
 * vertical scroll. Uses CSS `transform: scaleX()` for buttery
 * 60fps updates (no layout/paint cost), and is hidden until the
 * user has actually scrolled past 4% so it doesn't flash on load.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const next = max > 0 ? doc.scrollTop / max : 0;
      setProgress(next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const visible = progress > 0.04;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 transition-opacity duration-300"
        style={{
          transform: `scaleX(${progress})`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
