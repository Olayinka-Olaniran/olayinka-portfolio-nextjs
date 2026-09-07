'use client';

import Image from 'next/image';
import React, { useMemo, useRef, useState } from 'react';
import type { Project } from '@/types/portfolio';

interface PortfolioProps {
  projects: Project[];
}

/**
 * How many projects we show per page. The grid is 3 columns on
 * desktop (2 on tablet, 1 on mobile), so 6 fills two full rows
 * on desktop and stays tidy on smaller breakpoints. The pager
 * only appears once more than `PROJECTS_PER_PAGE` projects are
 * added to the data; a short final page is fine in this grid
 * (unlike the skills graph columns, which need a fixed count
 * to keep their layout).
 */
const PROJECTS_PER_PAGE = 6;

type ViewMode = 'overview' | 'engineering';

interface ProjectCardProps {
  project: Project;
  view: ViewMode;
  onSetView: (v: ViewMode) => void;
}

/**
 * Stepper — a compact `N of M` pager with two icon buttons.
 * Mirrors the visual used in the skills graph columns so the
 * two pagers feel like one affordance. Returns null when
 * there's only one page ("1 of 1" is not a pager) so the row
 * collapses to nothing with the current 6 projects and grows
 * as more are added.
 */
function Stepper({
  page,
  pageCount,
  onPageChange,
  label,
}: {
  page: number;
  pageCount: number;
  onPageChange: (next: number) => void;
  label: string;
}) {
  if (pageCount <= 1) return null;
  const canPrev = page > 0;
  const canNext = page < pageCount - 1;
  return (
    <div
      className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-slate-950/40"
      role="group"
      aria-label={`${label} pager`}
    >
      <button
        type="button"
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
        aria-label={`Previous ${label.toLowerCase()}`}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:text-orange-300 hover:bg-orange-500/10 disabled:opacity-30 disabled:hover:text-slate-400 disabled:hover:bg-transparent transition"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
      <span
        className="text-[10px] uppercase tracking-wider text-slate-500 font-medium tabular-nums"
        aria-live="polite"
      >
        {label}{' '}
        <span className="text-slate-300">
          {page + 1}/{pageCount}
        </span>
      </span>
      <button
        type="button"
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
        aria-label={`Next ${label.toLowerCase()}`}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:text-orange-300 hover:bg-orange-500/10 disabled:opacity-30 disabled:hover:text-slate-400 disabled:hover:bg-transparent transition"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}

function TechBadge({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${
        tone === 'accent'
          ? 'border-orange-500/30 bg-orange-500/10 text-orange-300'
          : 'border-white/10 bg-white/5 text-slate-300'
      }`}
    >
      {children}
    </span>
  );
}

function ProjectCard({ project, view, onSetView }: ProjectCardProps) {
  const overview = view === 'overview';
  const imageSrc = project.image?.startsWith('./')
    ? project.image.slice(1)
    : project.image ?? '';

  return (
    <article
      id={`portfolio-${project.id}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-sm shadow-lg shadow-black/30 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div
        className={`relative w-full bg-gradient-to-br from-slate-800 to-slate-900 border-b border-white/5 ${
          overview ? 'block' : 'hidden'
        }`}
        style={{ aspectRatio: '806 / 850' }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-slate-500 text-sm">
            Project preview
          </div>
        )}
        {/* Top-left "featured" tag if it has multiple tags */}
        {project.tags && project.tags[0] && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/50 backdrop-blur-sm text-orange-300 border border-orange-500/30 uppercase tracking-wider">
              {project.tags[0]}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex-1 flex flex-col p-5">
        {/* Header row with view toggle */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <div
            role="tablist"
            aria-label={`${project.title} view`}
            className="inline-flex items-center gap-0.5 p-0.5 rounded-full border border-white/10 bg-slate-950/60"
          >
            <button
              type="button"
              role="tab"
              aria-selected={overview}
              onClick={() => onSetView('overview')}
              className={`p-1.5 rounded-full transition ${
                overview
                  ? 'bg-orange-500/20 text-orange-300'
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-label="Project overview"
              title="Project overview"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!overview}
              onClick={() => onSetView('engineering')}
              className={`p-1.5 rounded-full transition ${
                !overview
                  ? 'bg-orange-500/20 text-orange-300'
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-label="Engineering notes"
              title="Engineering notes"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l-6-6 6-6" />
                <path d="M15 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {overview ? (
          <>
            <p className="text-slate-400 text-sm leading-relaxed">
              {project.shortDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <TechBadge key={t} tone="accent">
                  {t}
                </TechBadge>
              ))}
              {project.tags
                .filter((t) => !project.technologies.includes(t))
                .map((t) => (
                  <TechBadge key={t}>{t}</TechBadge>
                ))}
            </div>
            <div className="mt-5 flex gap-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white shadow-md shadow-orange-500/20 transition"
                >
                  Live demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg border border-white/10 text-slate-200 hover:text-white hover:border-orange-500/40 transition"
                >
                  Source
                </a>
              )}
            </div>
          </>
        ) : (
          <dl className="space-y-3 text-sm">
            {(
              [
                ['Problem', project.engineeringNotes.problem],
                ['Key Decision', project.engineeringNotes.keyDecision],
                ['Challenge', project.engineeringNotes.challenge],
                ['Hindsight', project.engineeringNotes.hindsight],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="text-[11px] uppercase tracking-wider text-orange-300/80 font-semibold">
                  {label}
                </dt>
                <dd className="text-slate-300 leading-relaxed">{value}</dd>
              </div>
            ))}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {project.skillsUsed.map((s) => (
                <TechBadge key={s} tone="accent">
                  {s}
                </TechBadge>
              ))}
            </div>
          </dl>
        )}
      </div>
    </article>
  );
}

export default function Portfolio({ projects }: PortfolioProps) {
  // Per-project view state (overview vs engineering notes) is
  // keyed by project id, so it survives page changes — flipping
  // a card to engineering notes on page 1, then paging to page
  // 2 and back, still shows the notes.
  const [views, setViews] = useState<Record<string, ViewMode>>({});

  // Independent pagination for the portfolio grid. Simple slice:
  // page 0 → items 0..N-1, page 1 → items N..2N-1, etc. The
  // last page may have fewer items than `PROJECTS_PER_PAGE`
  // (e.g. with 7 projects and pageSize 6, page 1 has 1 item);
  // a short final page is fine here because the grid is just a
  // grid — unlike the skills graph columns, where nodes map to
  // a fixed graph layout, the portfolio's grid happily shows
  // fewer cards on a short last page.
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const visibleProjects = useMemo(
    () =>
      projects.slice(
        page * PROJECTS_PER_PAGE,
        (page + 1) * PROJECTS_PER_PAGE
      ),
    [projects, page]
  );

  // Ref to the section so the pager can scroll the user back
  // to the top of the section after a page change — without
  // this, paging on mobile (where the section is taller than
  // the viewport) leaves the user staring at the bottom of the
  // list and they have to scroll up to see the new items.
  const sectionRef = useRef<HTMLElement | null>(null);
  const onPageChange = (next: number) => {
    setPage(next);
    if (typeof window === 'undefined') return;
    // Use a small rAF so the new cards are mounted before we
    // measure — otherwise the section's height hasn't settled
    // and we scroll to a stale offset.
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      data-reveal="up"
      className="relative card-surface p-4 md:p-8 overflow-hidden"
    >
      <div
        className="absolute -top-32 right-1/4 w-[36rem] h-[20rem] rounded-full bg-orange-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <header className="relative z-10 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 inline-block">
            <span className="border-b-2 border-orange-500 pb-1.5">
              My Portfolio
            </span>
          </h2>
          <p className="mt-2 text-slate-400 max-w-2xl">
            {projects.length} production-style projects with engineering
            notes on the trade-offs, not just the screenshots.
          </p>
        </div>
        <p className="relative z-10 text-xs text-slate-500">
          {projects.length} projects &middot; click the <span className="text-orange-300">{'</>'}</span> on a card to read the notes
        </p>
      </header>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleProjects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            view={views[p.id] ?? 'overview'}
            onSetView={(v) => setViews((prev) => ({ ...prev, [p.id]: v }))}
          />
        ))}
      </div>

      {/* Stepper sits below the grid, right-aligned to balance
          the header's right-side metadata. `Stepper` returns
          null when there's only one page, so this row is empty
          visually with the current data and grows when more
          projects land. Paging here scrolls back to the top of
          the section so the user sees the new cards without
          manually scrolling up. */}
      <div className="relative z-10 mt-6 flex justify-end">
        <Stepper
          label="Projects"
          page={page}
          pageCount={pageCount}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}
