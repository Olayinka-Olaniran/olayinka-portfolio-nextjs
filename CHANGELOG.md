# Changelog

All notable changes to this project are documented here. Versions follow
[Semantic Versioning](https://semver.org/) where applicable.

## [2.0.0] — 2026-09-07 — "Refocused"

A full redesign + bug-fix pass on top of the previous JS-to-React
conversion. The structure (App Router, sections, hooks) stays;
everything else was rebuilt from the ground up.

### Fixed

- **`hooks/useScrollSpy`** — was creating a new `IntersectionObserver`
  on every render because `sectionIds` was passed as a fresh array
  literal from `app/page.tsx`. Now it reads the latest list through a
  ref, only re-subscribes when the array *identity* changes, and tracks
  visible entries in a `Map` so the topmost section wins (the previous
  version would clobber state on any entry whose `isIntersecting`
  flipped, including ones that just left the viewport).
- **`hooks/useCommandPalette`** — body-scroll-lock was being toggled
  in two places (`open()` and the global hotkey handler) with no
  coordination, so the modal would sometimes appear *over* a
  scrollable body. All open/close state now flows through a single
  `isOpen` boolean and the body styles are managed in one
  `useEffect`. `filtered` is now also exposed as `groups`
  (Navigation / Projects / Actions) so the palette can render section
  headers without re-deriving them.
- **`hooks/useCopyToClipboard`** — `setTimeout` was never cleared on
  unmount (could call `setCopied` after teardown), and the
  `execCommand` fallback could leak a `<textarea>` if `select()`
  threw. Both are fixed: a single timeout ref is cleared on every
  successful copy and on unmount, and the legacy fallback uses
  `try/finally` to always remove the temporary textarea.

### Added

- **New `hooks/useReveal.ts`** — single page-wide
  `IntersectionObserver` that toggles `is-revealed` on every
  `[data-reveal]` element. Per-element delay via
  `data-reveal-delay` (ms).
- **New `components/ui/BackgroundFx.tsx`** — fixed, blurred blobs
  + a `bg-grid` overlay. Pointer-events disabled, z-index behind
  everything, hidden under `prefers-reduced-motion`.
- **New `components/ui/ScrollProgress.tsx`** — 3px top bar with
  `transform: scaleX()` updates on `requestAnimationFrame` (no
  layout/paint cost). Hidden until 4% scroll.
- **Animated active-pill in the header** — slides between nav items
  with a 300ms transition; position is read from
  `getBoundingClientRect()` in `useLayoutEffect` to avoid a one-frame
  flash.
- **Mobile menu** in the header with proper `aria-expanded` /
  `aria-controls` semantics.
- **Footer scroll-to-top** — appears only after 600px of scroll.
- **Grouped command palette** — Navigation / Projects / Actions
  sections, group headers, `Home`/`End` keyboard shortcuts, and a
  footer hint bar.
- **`DESIGN.md` and `CHANGELOG.md`** — see the new docs.

### Changed

- **`app/globals.css`** — replaced the 10-line placeholder with a
  proper design-system CSS file: `@theme` tokens, base layer
  (focus ring, scrollbar, `::selection`), reusable utilities
  (`text-gradient-accent`, `card-surface`, `bg-grid`, `bg-dots`,
  `glass`), and motion utilities (`animate-fade-up`,
  `animate-float-slow`, `animate-shimmer`, `animate-spin-slow`).
  Everything is `prefers-reduced-motion` aware.
- **`app/layout.tsx`** — uses `next/font`'s `display: 'swap'`,
  defines a `Viewport` export for the `themeColor`, and renders
  `<BackgroundFx />` once for the whole app. OG metadata now
  includes dimensions and a Twitter card.
- **`components/sections/SkillsGraph.tsx`** — full rewrite. The
  previous version used `document.createElementNS` to draw edges
  imperatively from inside an effect, which is why edges didn't
  track node positions on rerender. The new version stores edges
  in React state, recomputed via `useLayoutEffect` + `ResizeObserver`
  + image-load listeners. Touch / hover are detected once via
  `matchMedia` rather than per-render. Project metadata is no
  longer hard-coded; it comes from the `projects` prop.
- **`components/sections/Portfolio.tsx`** — uses `next/image` with
  `fill` + an explicit `aspectRatio` for the project previews. The
  view toggle is now a 2-button segmented control with
  `role="tablist"` + `aria-selected`. Engineering notes are
  rendered as a `<dl>`.
- **`components/sections/Contact.tsx`** — floating-label inputs
  (CSS-only), inline email row with a copy button that uses
  `useCopyToClipboard`, and a side info card with stat tiles.
- **`components/sections/Hero.tsx`** — role-cycling headline, a
  "Now" widget summarising current focus, refined stats strip.
- **`components/layout/Header.tsx`** — see "Animated active-pill"
  and "Mobile menu" above.
- **`components/layout/Footer.tsx`** — multi-column layout with
  brand, sitemap, and socials; smart scroll-to-top.
- **`components/ui/CommandPalette.tsx`** — see "Grouped command
  palette" above.
- **`components/ui/{Badge,Button,Card}.tsx`** — were empty
  placeholder files. Now contain a small, typed component
  library used across the site.
- **`hooks/useCommandPalette`** — return type changed from a flat
  `commands` array to a `groups` array. `app/page.tsx` is updated
  to match.

### Removed

- Hard-coded project list inside `SkillsGraph` (replaced by the
  prop).
- Inline `invert` + `<img>` social icons (replaced with proper
  inline SVGs sized to a token).
- Manual `id="scroll-to-top"` anchor (replaced with a button-like
  `<a>` that only renders when the user has scrolled).

## [1.0.0] — Initial port

- Bootstrapped with `create-next-app`.
- Section structure: Hero, SkillsGraph, Portfolio, Contact, Footer.
- Initial React versions of the JS hooks: `useScrollSpy`,
  `useCommandPalette`, `useCopyToClipboard`.
- Tailwind v4 wired up via `@tailwindcss/postcss`.
- Geist + Geist Mono via `next/font/google`.

## JS → React conversion notes (kept for the curious)

The first pass at this port was done with a generic AI helper. It
got the structure right but the behaviour was fragile:

- `SkillsGraph` mutated the SVG via `document.createElementNS` from
  inside a `useEffect` — every state change in a sibling caused
  edges to re-render at the wrong coordinates, because React had no
  idea those nodes existed.
- `useCommandPalette` toggled `body.style.overflow` in two different
  effects, leading to a race where the modal would appear *over* a
  still-scrollable body.
- `useCopyToClipboard` never cleared its `setTimeout` and the
  `execCommand` fallback could leak a `<textarea>` element on
  failure.
- `app/page.tsx` declared `const Home = () => { … }` and relied on
  the file having `'use client'` to make hooks work — works, but
  it tripped the linter and broke minification on some bundlers.

This pass replaces each of those with a hand-written, React-native
version. The diff for `SkillsGraph` alone is ~150 lines smaller and
behaves correctly on resize, on font load, and on touch devices.
