# Olayinka Olaniran — Portfolio

A modern, fast, accessible portfolio built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**. The site showcases 5 production-style JavaScript projects, an interactive skill graph that visualises which techniques power which projects, and engineering notes that walk through the trade-offs of each build.

> Built as a single-page portfolio with deliberate focus on fundamentals: clear typography, fast paint, and zero framework bloat on the critical path.

---

## ✨ Features

- **Hero** with a role-cycling headline, a live "Now" widget, and a stats strip.
- **Interactive Skills Graph** — hover or tap a technique (DOM, `localStorage`, `fetch`, …) to see edges light up to the projects that use it. Built with state-driven SVG (no DOM mutation), so it stays in sync with the React tree.
- **Cross-section navigation** — clicking a project node in the Skills Graph automatically navigates the Portfolio section to the correct page (if paginated) before scrolling to the project card. No more broken anchor links when projects span multiple pages!
- **Project cards** with a per-card view toggle between *Overview* and *Engineering Notes* (problem, decision, challenge, hindsight).
- **Command palette** (`⌘K` / `Ctrl-K`) with grouped actions — Navigation, Projects, and quick actions like "Copy email".
- **Contact section** with a Netlify-ready form, floating-label inputs, copy-email button, and social links.
- **Scroll progress bar**, **scroll-reveal animations** (respects `prefers-reduced-motion`), and a contextual **footer** with a smart "scroll to top" button.
- **Background Fx** — subtle animated grid + blobs. No libraries, just CSS.

## 🛠️ Tech Stack

| Layer        | Choice                                                   |
| ------------ | -------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Server + Client Components)      |
| Language     | TypeScript (strict)                                      |
| Styling      | Tailwind CSS v4 (CSS-first, `@theme` tokens)             |
| Fonts        | `next/font` → Geist + Geist Mono (self-hosted)           |
| Images       | `next/image` with explicit `width`/`height` / `fill`     |
| Forms        | Netlify Forms (honeypot + native fetch)                  |
| Clipboard    | `navigator.clipboard.writeText` (with `execCommand` fallback for non-secure contexts) |

## 🏗️ Project Structure

```
app/
  layout.tsx          // Root layout: font loading, metadata, BackgroundFx
  page.tsx            // Home — composes all sections
  globals.css         // Design system tokens + utilities + animations
components/
  layout/
    Header.tsx        // Sticky nav with animated active pill
    Footer.tsx        // Multi-column footer + smart scroll-to-top
  sections/
    Hero.tsx          // Headline, role switcher, Now widget
    SkillsGraph.tsx   // Interactive SVG graph
    Portfolio.tsx     // Project cards (overview / engineering toggle)
    Contact.tsx       // Form + info card
  ui/
    CommandPalette.tsx
    BackgroundFx.tsx
    ScrollProgress.tsx
    Badge.tsx, Button.tsx, Card.tsx
hooks/
  useScrollSpy.ts
  useCommandPalette.ts
  useCopyToClipboard.ts
  useReveal.ts        // IntersectionObserver for [data-reveal]
data/
  projectsMetadata.ts
  skillsGraphData.ts
types/
  portfolio.ts
public/
  assets/icons/, assets/images/
```

## 🚀 Getting Started

```bash
# Install
npm install

# Dev server
npm run dev          # http://localhost:3000

# Lint
npm run lint

# Production build
npm run build
npm run start
```

## 🧭 Hooks

| Hook                    | What it does                                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `useScrollSpy`          | Returns the id of the section currently in view. Topmost intersecting section wins; tolerates empty list.  |
| `useCommandPalette`     | State + global ⌘/Ctrl-K listener + body-scroll-lock. Exposes `groups` (Navigation / Projects / Actions).    |
| `useCopyToClipboard`    | Wraps `navigator.clipboard.writeText` with a clean fallback, transient `copied` flag, and proper cleanup.   |
| `useReveal`             | One-shot IntersectionObserver that toggles `is-revealed` on every `[data-reveal]` element.                  |

## ♿ Accessibility

- Visible focus ring on every interactive element (`:focus-visible`).
- `aria-current="page"` on the active nav link; `aria-expanded` on the mobile menu trigger; `aria-modal` and a labelled search field on the palette.
- All icons that are purely decorative carry `aria-hidden="true"`; meaningful ones have an `aria-label`.
- `prefers-reduced-motion` disables all custom animations, scroll-reveal, and the floating background blobs.
- Color contrast on the dark theme is `WCAG AA` or better at body sizes.

## 🚢 Deploying

The site is framework-agnostic — pick your home:

- **Vercel** — push to a Git provider and import.
- **Netlify** — works out of the box; the contact form posts to `/?form-name=contact` and Netlify picks it up via the `data-netlify="true"` attribute.
- **Static export** — add `output: 'export'` to `next.config.ts` and run `next build` (note: dynamic features would need adapting).

## 📚 See also

- [`DESIGN.md`](./DESIGN.md) — design system, tokens, and the "why" behind each section.
- [`CHANGELOG.md`](./CHANGELOG.md) — what changed and why, including the JS → React port notes.

## 📄 License

MIT — feel free to fork and adapt the structure for your own portfolio.

