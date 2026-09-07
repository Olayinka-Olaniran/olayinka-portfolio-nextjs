'use client';

import React from 'react';

/**
 * BackgroundFx
 * Site-wide ambient background: soft conic gradient + dotted grid +
 * a couple of slow-floating blobs. Purely decorative, behind every
 * section via the z-index it gets in the layout.
 *
 * Performance notes:
 *  - The whole thing is `position: fixed; pointer-events: none;`
 *    so it never blocks input.
 *  - The blobs use `filter: blur(80px)` on a low-resolution scale,
 *    which is GPU-cheap on modern browsers.
 *  - Animations are `prefers-reduced-motion` aware (CSS).
 */
export default function BackgroundFx() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-grid"
    >
      {/* Soft warm glow, top-left */}
      <div
        className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(251, 146, 60, 0.55), transparent 60%)',
        }}
      />
      {/* Cool indigo, bottom-right */}
      <div
        className="absolute -bottom-40 -right-40 h-[44rem] w-[44rem] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{
          animationDelay: '1.5s',
          background:
            'radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.5), transparent 60%)',
        }}
      />
      {/* Subtle top vignette */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5, 8, 22, 0.85), transparent)',
        }}
      />
    </div>
  );
}
