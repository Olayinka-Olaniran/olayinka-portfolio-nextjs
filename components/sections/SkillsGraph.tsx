'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Project, Skill } from '@/types/portfolio';

interface SkillsGraphProps {
  skills: Skill[];
  projects: Project[];
  onNavigateToProject: (projectId: string) => void;
}

interface Edge {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
  active: boolean;
}

interface ProjectNode {
  id: string;
  title: string;
  href: string;
}

const SKILL_ICONS: Record<string, string> = {
  'form-validation': '/assets/icons/form-validation.svg',
  localstorage: '/assets/icons/localstorage.svg',
  'custom-parser': '/assets/icons/custom-parser.svg',
  'fetch-api': '/assets/icons/fetch-api.svg',
  'modal-dialogs': '/assets/icons/modal-dialogs.svg',
  'array-methods': '/assets/icons/array-methods.svg',
  'dom-manipulation': '/assets/icons/dom-manipulation.svg',
  'async-await': '/assets/icons/async-await.svg',
  'event-delegation': '/assets/icons/event-delegation.svg'
};

const TECH_ICONS = [
  { src: '/assets/icons/html5.svg', alt: 'HTML5' },
  { src: '/assets/icons/css3.svg', alt: 'CSS3' },
  { src: '/assets/icons/javascript.svg', alt: 'JavaScript' },
  { src: '/assets/icons/tailwind.svg', alt: 'Tailwind CSS' },
  { src: '/assets/icons/react.svg', alt: 'React' },
  { src: '/assets/icons/typescript.svg', alt: 'TypeScript' },
];

/**
 * How many nodes we show at once in each side column. The two
 * steppers are independent: stepping the skill column never
 * moves the project column and vice-versa. The values are
 * chosen to match the current data (9 skills, 5 projects) so
 * every node fits on a single page out of the box. As more
 * skills or projects are added to `data/`, the stepper simply
 * grows more pages.
 */
const SKILL_PAGE_SIZE = 9;
const PROJECT_PAGE_SIZE = 5;

/**
 * Stepper — a compact `N of M` pager with two icon buttons. Used
 * at the top of the skill and project columns to let the user
 * page through nodes as the data grows.
 *
 * The visual is deliberately quiet (no arrows on both sides of
 * the counter, no border): it should feel like a tiny utility,
 * not a feature. The orange accent only shows on the chevrons
 * when there's somewhere to go.
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
  const canPrev = page > 0;
  const canNext = page < pageCount - 1;
  // When the count is 1 we still render the row so the column
  // header doesn't reflow, but the buttons are disabled and the
  // counter is dim.
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

/**
 * SkillsGraph
 *
 * Interactive visualization that maps techniques → projects. Two
 * interactions:
 *   - Hover a skill (desktop) or tap it (touch) to see edges light
 *     up to the projects that use it.
 *   - Hover / tap a project to see its contributing skills.
 *
 * The previous version mutated the DOM directly with
 * `document.createElementNS` from inside React effects. That's
 * why node positions broke on every rerender and edges were
 * drawn relative to wherever the element was on the previous
 * tick. This rewrite:
 *   1. Stores edges in React state, recomputed only on layout
 *      changes (resize observer + click-driven interactions).
 *   2. Uses `useLayoutEffect` for measurement to avoid a one-frame
 *      flash of "no edges".
 *   3. Uses refs for DOM nodes instead of querySelectorAll hacks
 *      in a global effect.
 */
export default function SkillsGraph({ skills, projects, onNavigateToProject }: SkillsGraphProps) {
  const skillRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const projectRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const graphRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [openDescId, setOpenDescId] = useState<string | null>(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  });

  // Project metadata from the data prop, not hard-coded.
  const projectNodes = useMemo<ProjectNode[]>(
    () =>
      projects.map((p) => ({
        id: `project-${p.id}`,
        title: p.title,
        href: `#portfolio-${p.id}`,
      })),
    [projects]
  );

  // Independent pagination for each side column. Each stepper
  // holds its own index — moving one never moves the other.
  const [skillPage, setSkillPage] = useState(0);
  const [projectPage, setProjectPage] = useState(0);

  const skillPageCount = Math.max(
    1,
    Math.ceil(skills.length / SKILL_PAGE_SIZE)
  );
  const projectPageCount = Math.max(
    1,
    Math.ceil(projectNodes.length / PROJECT_PAGE_SIZE)
  );

  // Both columns use windowed pagination so the visible count
  // is constant (9 skills, 5 projects) on every page, no matter
  // how full the data is. Without this, a 10-skill data set
  // would show only 1 skill on page 1 and the skill column
  // would visually sag below the project side; same for any
  // project count that's not a clean multiple of 5.
  const visibleSkills = useMemo(() => {
    if (skills.length === 0) return [];
    const start = skillPage * SKILL_PAGE_SIZE;
    const adjustedStart = Math.max(
      0,
      Math.min(start, skills.length - SKILL_PAGE_SIZE)
    );
    return skills.slice(adjustedStart, adjustedStart + SKILL_PAGE_SIZE);
  }, [skills, skillPage]);
  const visibleProjects = useMemo(() => {
    if (projectNodes.length === 0) return [];
    const start = projectPage * PROJECT_PAGE_SIZE;
    const adjustedStart = Math.max(
      0,
      Math.min(start, projectNodes.length - PROJECT_PAGE_SIZE)
    );
    return projectNodes.slice(
      adjustedStart,
      adjustedStart + PROJECT_PAGE_SIZE
    );
  }, [projectNodes, projectPage]);

  // Map of project-id -> list of skill-ids that reference it.
  const projectToSkills = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const skill of skills) {
      for (const projectRef of skill.projects) {
        const list = map.get(projectRef) ?? [];
        list.push(skill.id);
        map.set(projectRef, list);
      }
    }
    return map;
  }, [skills]);

  // React to changes in the pointer media query (only after mount;
  // initial value is set lazily in useState above).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(hover: none) and (pointer: coarse)');
    const onChange = (e: MediaQueryListEvent) => setIsCoarsePointer(e.matches);
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, []);

  // Recompute edges in the active direction (skill->projects or
  // project->skills). Returns empty array for none.
  const computeEdges = useCallback((): Edge[] => {
    const graphEl = graphRef.current;
    if (!graphEl) return [];

    const graphRect = graphEl.getBoundingClientRect();

    // The SVG overlay spans the whole graph wrapper, so the
    // graph-relative coords below map 1:1 to SVG coords. No
    // offset math needed.
    const centerOf = (el: HTMLElement) => ({
      x: el.getBoundingClientRect().left - graphRect.left + el.offsetWidth / 2,
      y: el.getBoundingClientRect().top - graphRect.top + el.offsetHeight / 2,
    });

    const makeEdge = (
      from: { x: number; y: number },
      to: { x: number; y: number },
      id: string
    ): Edge => ({
      id,
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
      length: Math.hypot(to.x - from.x, to.y - from.y),
      active: true,
    });

    if (activeSkill) {
      const skillEl = skillRefs.current[activeSkill];
      if (!skillEl) return [];
      const skillPoint = centerOf(skillEl);
      const skill = skills.find((s) => s.id === activeSkill);
      if (!skill) return [];
      return skill.projects
        .map((pid) => {
          const projEl = projectRefs.current[pid];
          if (!projEl) return null;
          return makeEdge(skillPoint, centerOf(projEl), `edge-${pid}`);
        })
        .filter((e): e is Edge => e !== null);
    }

    if (activeProject) {
      const projEl = projectRefs.current[activeProject];
      if (!projEl) return [];
      const projPoint = centerOf(projEl);
      const skillIds = projectToSkills.get(activeProject) ?? [];
      return skillIds
        .map((sid, i) => {
          const skillEl = skillRefs.current[sid];
          if (!skillEl) return null;
          return makeEdge(centerOf(skillEl), projPoint, `edge-skill-${i}`);
        })
        .filter((e): e is Edge => e !== null);
    }

    return [];
  }, [activeSkill, activeProject, skills, projectToSkills]);

  // Re-measure whenever the active selection changes, when the
  // graph size changes, or when fonts/images finish loading.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    let raf = 0;
    const recompute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setEdges(computeEdges());
      });
    };

    recompute();

    // Recompute on resize.
    const ro = new ResizeObserver(recompute);
    if (graphRef.current) ro.observe(graphRef.current);

    // Recompute when images load (they shift node sizes).
    const imgs = Array.from(document.querySelectorAll('img'));
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', recompute, { once: true });
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [computeEdges]);

  // On desktop, hovering sets the active state; on touch, taps do.
  const onSkillEnter = (id: string) => {
    if (isCoarsePointer) return;
    setActiveProject(null);
    setActiveSkill(id);
  };
  const onSkillLeave = () => {
    if (isCoarsePointer) return;
    setActiveSkill(null);
  };
  const onSkillClick = (id: string) => {
    setOpenDescId((prev) => (prev === id ? null : id));
    setActiveProject(null);
    setActiveSkill((prev) => (prev === id ? null : id));
  };

  const onProjectEnter = (id: string) => {
    if (isCoarsePointer) return;
    setActiveSkill(null);
    setActiveProject(id);
  };
  const onProjectLeave = () => {
    if (isCoarsePointer) return;
    setActiveProject(null);
  };
  const onProjectClick = (id: string) => {
    setActiveSkill(null);
    setActiveProject((prev) => (prev === id ? null : id));
    // Extract the actual project ID from the node ID (format: "project-{id}")
    const projectId = id.replace('project-', '');
    onNavigateToProject(projectId);
  };

  // Outside click clears the active graph (mobile).
  useEffect(() => {
    if (!isCoarsePointer) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('.skill-node') &&
        !target.closest('.project-node')
      ) {
        setActiveSkill(null);
        setActiveProject(null);
        setOpenDescId(null);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [isCoarsePointer]);

  const isDim = (kind: 'skill' | 'project', id: string): boolean => {
    if (!activeSkill && !activeProject) return false;
    if (activeSkill) {
      if (kind === 'skill') return id !== activeSkill;
      // Project is dim if not connected to active skill.
      const skill = skills.find((s) => s.id === activeSkill);
      return !skill?.projects.includes(id);
    }
    if (activeProject) {
      if (kind === 'project') return id !== activeProject;
      return !projectToSkills.get(activeProject)?.includes(id);
    }
    return false;
  };

  return (
    <section
      id="skills"
      data-reveal="up"
      className="relative card-surface p-4 md:p-8 overflow-hidden"
    >
      {/* Decorative top accent */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full bg-orange-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <header className="relative z-10 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2 inline-block">
          <span className="border-b-2 border-orange-500 pb-1.5">My Skills</span>
        </h2>
        <p className="text-slate-400 max-w-2xl">
          The languages and tools I&apos;ve practiced, and the core techniques
          behind each project below.
        </p>
      </header>

      {/* Tech stack */}
      <div className="relative z-10 flex flex-col items-center gap-3 mb-8">
        <p className="font-semibold text-slate-300 text-xs uppercase tracking-wider">
          Languages &amp; Tools I Work With
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {TECH_ICONS.map((icon) => (
            <div
              key={icon.alt}
              className="w-11 h-11 md:w-12 md:h-12 grid place-items-center rounded-xl border border-white/5 bg-white/5 shadow-inner hover:border-orange-500/30 hover:-translate-y-0.5 transition"
              title={icon.alt}
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={28}
                height={28}
                className="w-6 h-6 md:w-7 md:h-7 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="relative z-10 text-center text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-6 mb-6 leading-relaxed">
        Here&apos;s how those tools come together in practice —{' '}
        <span className="text-orange-400 font-medium">
          <span className="hidden md:inline">hover or </span>
          click on a skill
        </span>{' '}
        to see which projects use it.
      </p>

      {/* Graph */}
      <div
        ref={graphRef}
        className="relative z-10 w-full"
      >
        {/* SVG overlay — spans the whole graph wrapper. The same
            3-column graph renders on every viewport; the SVG
            draws the connecting edges between the two side
            columns through the empty middle. z-0 keeps it
            behind the columns (z-10) and the cards (z-20). */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
          aria-hidden="true"
        >
          <defs>
            <filter id="edge-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {edges.map((edge) => (
            <g key={edge.id} className="edge">
              <line
                className="edge-line"
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke="#fb923c"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#edge-glow)"
                strokeDasharray={edge.length}
                strokeDashoffset={0}
              />
              {[edge.x1, edge.x2].map((cx, i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={i === 0 ? edge.y1 : edge.y2}
                  r="3.5"
                  fill="#fdba74"
                />
              ))}
            </g>
          ))}
        </svg>

        {/* Columns. The graph is the same 3-column layout on every
            viewport — a left column of skills, an empty middle
            the SVG draws through, and a right column of projects.
            We do NOT stack on mobile: stacking the columns makes
            the side-by-side graph impossible. The proportions
            shift instead: mobile gives the side columns more room
            (2fr | 1fr | 2fr) since the icons + text are tiny, and
            desktop balances the visual weight (1fr | 2fr | 1fr).
            The grid's `items-stretch` makes the project column
            match the skill column's height (the skill side is the
            tall one), and `justify-around` on each list spreads
            items evenly. We deliberately do NOT use `h-full` on
            the column wrappers — that requires a defined parent
            height and collapses the layout to 0 when the grid is
            content-sized. */}
        <div className="relative z-10 grid grid-cols-[2fr_1fr_2fr] md:grid-cols-[1fr_2fr_1fr] items-stretch gap-2 md:gap-4 w-full">
        {/* Skill nodes */}
        <div className="flex flex-col gap-2 relative">
          <Stepper
            label="Skills"
            page={skillPage}
            pageCount={skillPageCount}
            onPageChange={setSkillPage}
          />
          {/* The skill column is the "tall" side (more nodes), so
              it determines the grid row's height. `flex-1` lets
              the list grow to match the row, and `justify-around`
              spreads items so 5 projects land evenly across the
              9 skill rows. If the current page has fewer than the
              page-size items, they still distribute the same way.
              `min-h-0` is required so the list can actually
              shrink to the row height — without it, the default
              `min-height: auto` would push the column taller than
              the row wants. */}
          <ul
            className="relative flex flex-1 min-h-0 flex-col justify-around gap-2"
            role="list"
          >
            {visibleSkills.map((skill) => {
              const open = openDescId === skill.id;
              const dim = isDim('skill', skill.id);
              return (
                <li
                  key={skill.id}
                  ref={(el) => {
                    skillRefs.current[skill.id] = el;
                  }}
                  data-skill-id={skill.id}
                  className={`skill-node relative rounded-xl border bg-slate-900/60 backdrop-blur-sm shadow-md transition-all duration-200 ${
                    dim
                      ? 'opacity-30'
                      : activeSkill === skill.id
                      ? 'border-orange-500/60 ring-1 ring-orange-500/40'
                      : 'border-white/10 hover:border-orange-500/40'
                  }`}
                  onMouseEnter={() => onSkillEnter(skill.id)}
                  onMouseLeave={onSkillLeave}
                >
                  <button
                    type="button"
                    onClick={() => onSkillClick(skill.id)}
                    className="w-full text-left flex items-center gap-2.5 p-2.5 md:p-3"
                    aria-expanded={open}
                    aria-controls={`skill-desc-${skill.id}`}
                  >
                    <Image
                      src={SKILL_ICONS[skill.id]}
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5 shrink-0 opacity-80"
                    />
                    <span className="font-semibold text-xs md:text-sm text-slate-100">
                      {skill.name}
                    </span>
                  </button>
                  <div
                    id={`skill-desc-${skill.id}`}
                    className={`px-3 pb-3 text-xs text-slate-400 leading-relaxed ${
                      open ? 'block' : 'hidden'
                    }`}
                  >
                    {skill.description}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Empty centre slot. The SVG overlay behind it draws the
            connecting edges between the two side columns. Visible
            on every viewport — the graph needs a middle to look
            like a graph. */}
        <div aria-hidden="true" />

        {/* Project nodes */}
        <div className="flex flex-col gap-2 relative">
          <Stepper
            label="Projects"
            page={projectPage}
            pageCount={projectPageCount}
            onPageChange={setProjectPage}
          />
          {/* `flex-1` + `min-h-0` match the skill column's height
              (the grid stretches all items to the tallest).
              `justify-around` then spreads 5 projects across the
              available 9-row span so edges land at sensible
              positions on every viewport. */}
          <ul
            className="relative flex flex-1 min-h-0 flex-col justify-around gap-2"
            role="list"
          >
            {visibleProjects.map((p) => {
              const dim = isDim('project', p.id);
              return (
                <li
                  key={p.id}
                  ref={(el) => {
                    projectRefs.current[p.id] = el;
                  }}
                  data-project-id={p.id}
                  className={`project-node relative flex items-center justify-between gap-2 rounded-xl border bg-slate-900/60 backdrop-blur-sm shadow-md p-2.5 md:p-3 transition-all duration-200 ${
                    dim
                      ? 'opacity-30'
                      : activeProject === p.id
                      ? 'border-orange-500/60 ring-1 ring-orange-500/40'
                      : 'border-white/10 hover:border-orange-500/40'
                  }`}
                  onMouseEnter={() => onProjectEnter(p.id)}
                  onMouseLeave={onProjectLeave}
                  onClick={() => onProjectClick(p.id)}
                >
                  <h3 className="text-xs md:text-sm font-semibold text-slate-100">
                    {p.title}
                  </h3>
                  <a
                    href={p.href}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate Portfolio to the correct page before following the link
                      const projectId = p.id.replace('project-', '');
                      onNavigateToProject(projectId);
                    }}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-slate-700 text-slate-300 hover:text-orange-400 hover:border-orange-500/40 transition"
                    aria-label={`Open ${p.title}`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        </div>
      </div>

      {/* Legend */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Skill
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Project
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-6 h-[2px] bg-orange-400" /> Used in
        </span>
      </div>
    </section>
  );
}
