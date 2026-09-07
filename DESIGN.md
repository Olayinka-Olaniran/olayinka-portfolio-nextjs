# Design Template

> A living document of the design system, token values, and the
> intentional choices behind each section. Treat this as the spec —
> if you change something visual and it's not in here, it probably
> shouldn't ship.

---

## 1 · Brand at a glance

| Aspect    | Value                                                            |
| --------- | ---------------------------------------------------------------- |
| Voice     | Confident, technical, friendly. "I built this and here's why."   |
| Audience  | Hiring managers, technical interviewers, fellow engineers.       |
| Mood      | Dark, calm, focused. One accent colour carrying all the energy.  |
| Anti-mood | No neon, no busy animations, no busy backgrounds.                |

The single accent is **orange** (`#fb923c` / `#f97316`). It's used for:

- The active-state pill in the nav.
- The border under section headings.
- Hover state on every primary CTA.
- The "Used in" edges in the skill graph.
- Focus rings.

Everything else is a neutral slate ramp on a near-black background. Restraint makes the accent work harder.

## 2 · Tokens

Tokens live in `app/globals.css` inside an `@theme {}` block so Tailwind picks them up. Override once, propagate everywhere.

```
--color-bg            #050816   page background
--color-bg-elev       #0b1124   card / nav background
--color-bg-elev-2     #111a35   hovered card background
--color-border-subtle rgba(148,163,184,0.12)
--color-text          #e2e8f0
--color-text-muted    #94a3b8
--color-accent        #fb923c
--color-accent-strong #f97316
--color-success       #34d399
--color-info          #60a5fa
--color-danger        #f87171

--radius-pill         9999px
--radius-card         14px
--ease-snap           cubic-bezier(0.22, 1, 0.36, 1)
```

## 3 · Typography

- **Sans** (Geist) — body and headings.
- **Mono** (Geist Mono) — used in kbd hints, code-like fragments.
- Both are loaded via `next/font/google` with `display: 'swap'`.
- Heading hierarchy: 36/40/48/60/72px on the way up; only one `text-7xl`-ish per page.

## 4 · Layout grid

- `app/page.tsx` constrains content to `max-w-5xl` for the footer, `max-w-4xl` for the inner sections, and `max-w-3xl` for the hero. This single line in each section gives the page a consistent reading width without micro-managing every block.
- `main-container` provides `px-3 md:px-7` so the page never crowds the viewport edge.

## 5 · Section recipes

### 5.1 Hero

Pattern: a single column with a centred "availability" pill, a large gradient headline, a role-cycling line (cycles through 5 roles every 2.5s with a 700ms fade), a 1–2 line pitch, two CTAs, then a 2-up row: **stats card** + **"Now" widget**.

Why the Now widget: hiring managers want to know *what you're doing right now*. A small, well-bounded card says "current focus, learning, open to" without burying the headline.

### 5.2 Skills Graph

- Three columns on desktop: skill list · empty middle (SVG canvas) · project list.
- Edges are computed React state, not DOM mutation. `useLayoutEffect` reads `getBoundingClientRect()` of every node and the SVG, then writes the edge endpoints into state. A `ResizeObserver` triggers a recompute on layout changes.
- Hovering a skill dims the unconnected project nodes; tapping does the same on touch. The previous JS implementation used `document.createElementNS` from inside an effect, which is why it broke on every render — see `CHANGELOG.md` for the full story.
- Legend at the bottom (orange dot = skill, grey dot = project, line = "used in") so first-time visitors aren't guessing.

### 5.3 Portfolio

- 3-column grid (1 col mobile, 2 col tablet, 3 col desktop).
- Each card has its own `view` state — `overview` (default) shows the preview image, short description, tech badges, and demo/source buttons. `engineering` shows problem / decision / challenge / hindsight.
- The toggle is a 2-button segmented control with `role="tablist"` and `aria-selected`, so keyboard users get the right semantics for free.
- Images use `next/image` with `fill` + explicit `aspectRatio` to avoid layout shift.

### 5.4 Contact

- Two-column layout: form on the left, info card on the right.
- Floating-label inputs: a peer-input pattern with CSS-only label animation, no JS, no extra dependencies.
- Email row has a one-click copy button that swaps its icon for a check when the clipboard write succeeds (the `useCopyToClipboard` hook handles the transient state and the `execCommand` fallback).
- Form posts to `/?form-name=contact` for Netlify Forms. The honeypot field is hidden via CSS and tabindex=-1.

### 5.5 Footer

Three columns (brand + tagline, sitemap, socials) on desktop; stacked on mobile. A divider line above the copyright row uses a horizontal orange gradient to keep brand presence without being loud. The "scroll to top" button uses a tiny `useEffect` + scroll listener to fade in only after 600px of scroll, so it doesn't sit there on the hero.

## 6 · Motion

Three custom utilities, all in `app/globals.css`:

| Utility          | Use                                             | Respects reduced-motion? |
| ---------------- | ----------------------------------------------- | ------------------------ |
| `animate-fade-up` | Reveal-on-scroll (`[data-reveal]`)             | yes (CSS)                |
| `animate-float-slow` | The ambient blobs in `BackgroundFx`         | yes (CSS)                |
| `animate-shimmer` | Reserved for future loading states             | yes (CSS)                |

The reveal observer lives in `hooks/useReveal.ts` — it observes every `[data-reveal]` element with a 12% threshold and a `-10%` bottom rootMargin so things animate as they enter the viewport, not when they're already in the middle of it.

## 7 · Command palette UX

The palette has three groups in fixed order — Navigation, Projects, Actions — so the user can predict where to look. Arrow keys move through the **flat** display order; the `data-palette-index` attribute on each row is what the observer uses to keep the active row in view. The global ⌘/Ctrl-K listener and the body-scroll-lock both live in the hook, not the component, so the component stays presentation-only.

## 8 · What's intentionally *not* here

- No carousel / slider on the hero — it would be visual noise.
- No testimonials section — the engineering notes do the talking.
- No CMS / dynamic data — every project is hand-curated in `data/projectsMetadata.ts`. That gives us typed, reviewable content.
- No dark/light mode toggle — the site is dark by design. Adding a light theme would dilute the accent.

## 9 · When you change a colour

1. Update the value in `app/globals.css` (the `--color-*` token).
2. Run the dev server and check: nav pill, headline gradient, hero badge, skill graph edges, focus rings, and at least one card.
3. Update this doc.

When in doubt: **less is more.** Add a shadow before adding a border. Add a border before adding a colour. Add a colour before adding motion.
