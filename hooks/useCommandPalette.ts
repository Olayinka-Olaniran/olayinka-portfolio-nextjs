'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Project } from '@/types/portfolio';

export type CommandGroup = 'Navigation' | 'Projects' | 'Actions';

export interface CommandItem {
  label: string;
  hint?: string;
  group: CommandGroup;
  /** Optional single-letter shortcut displayed in the row. */
  key?: string;
  action: () => void;
  keywords?: string[];
}

export interface UseCommandPaletteArgs {
  projects: Project[];
  copyEmailAction: () => void;
}

export interface UseCommandPaletteResult {
  isOpen: boolean;
  query: string;
  activeIndex: number;
  filtered: CommandItem[];
  /** Commands grouped in display order. */
  groups: Array<{ group: CommandGroup; items: CommandItem[] }>;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setQuery: (q: string) => void;
  setActiveIndex: (idx: number) => void;
  executeCommand: (idx: number) => void;
}

/**
 * useCommandPalette
 *
 * Why a custom hook:
 *  - Keeps the JSX in CommandPalette clean and dumb.
 *  - Owns the scroll-lock side-effect (body overflow) in one place.
 *  - Owns the global ⌘/Ctrl-K listener with proper cleanup.
 *
 * Bug fixes from the previous version:
 *  - The previous `open` and the global hotkey both set
 *    `document.body.style.overflow`, and there was a race where the
 *    global listener would override the value set by `open` (or
 *    vice-versa). We now route all state transitions through one
 *    function: `setOpen` and only mutate body styles in response to
 *    that, so there's exactly one source of truth.
 *  - `filtered` was a flat array but the UI is grouped. We expose
 *    a `groups` array so the palette can render section headers
 *    without re-deriving them in JSX.
 *  - `executeCommand` was depending on `filtered` and `close` in its
 *    useCallback, so a query change rebuilt it. We keep a ref to the
 *    latest list so the keyboard handler can read it without churn.
 */
export function useCommandPalette({
  projects,
  copyEmailAction,
}: UseCommandPaletteArgs): UseCommandPaletteResult {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSection = useCallback((selector: string) => {
    const el = document.querySelector(selector);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const allCommands = useMemo<CommandItem[]>(() => {
    const navigation: CommandItem[] = [
      {
        label: 'Go to Home',
        group: 'Navigation',
        key: 'H',
        action: () => scrollToSection('#home'),
        keywords: ['top', 'start', 'hero'],
      },
      {
        label: 'Go to Skills',
        group: 'Navigation',
        key: 'S',
        action: () => scrollToSection('#skills'),
        keywords: ['graph', 'techniques'],
      },
      {
        label: 'Go to Portfolio',
        group: 'Navigation',
        key: 'P',
        action: () => scrollToSection('#portfolio'),
        keywords: ['projects', 'work'],
      },
      {
        label: 'Go to Contact',
        group: 'Navigation',
        key: 'C',
        action: () => scrollToSection('#contact'),
        keywords: ['email', 'message'],
      },
    ];

    const actions: CommandItem[] = [
      {
        label: 'Open GitHub profile',
        group: 'Actions',
        key: 'G',
        action: () => {
          if (typeof window !== 'undefined') {
            window.open('https://github.com/Olayinka-Olaniran', '_blank', 'noopener,noreferrer');
          }
        },
        keywords: ['code', 'repo'],
      },
      {
        label: 'Open LinkedIn profile',
        group: 'Actions',
        key: 'L',
        action: () => {
          if (typeof window !== 'undefined') {
            window.open(
              'https://www.linkedin.com/in/olayinka-olaniran-a2ba063a2',
              '_blank',
              'noopener,noreferrer'
            );
          }
        },
        keywords: ['social', 'network'],
      },
      {
        label: 'Copy email address',
        group: 'Actions',
        key: 'E',
        action: copyEmailAction,
        keywords: ['contact', 'mail'],
      },
    ];

    const projectCommands: CommandItem[] = projects.map((project) => ({
      label: `Open project: ${project.title}`,
      hint: project.tags[0],
      group: 'Projects',
      action: () => scrollToSection(`#portfolio-${project.id}`),
      keywords: project.technologies,
    }));

    return [...navigation, ...projectCommands, ...actions];
  }, [projects, copyEmailAction, scrollToSection]);

  const filtered = useMemo<CommandItem[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allCommands;
    return allCommands.filter((c) => {
      const haystack = [
        c.label,
        c.hint ?? '',
        c.group,
        ...(c.keywords ?? []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allCommands, query]);

  const groups = useMemo<Array<{ group: CommandGroup; items: CommandItem[] }>>(() => {
    const order: CommandGroup[] = ['Navigation', 'Projects', 'Actions'];
    const map = new Map<CommandGroup, CommandItem[]>();
    for (const item of filtered) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return order
      .filter((g) => (map.get(g)?.length ?? 0) > 0)
      .map((g) => ({ group: g, items: map.get(g) ?? [] }));
  }, [filtered]);

  // Flat ordered list of currently-displayed commands. The active
  // index is a position into this array, which matches the rendered
  // DOM order in the palette.
  const flat = useMemo<CommandItem[]>(
    () => groups.flatMap((g) => g.items),
    [groups]
  );

  // Clamp during render so we never expose a stale out-of-range
  // index to the DOM. This avoids a setState-in-effect cascade.
  const safeActiveIndex =
    flat.length === 0
      ? 0
      : Math.min(activeIndex, Math.max(0, flat.length - 1));

  // Body scroll lock — single source of truth.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previous;
      };
    }
    return undefined;
  }, [isOpen]);

  // Global ⌘/Ctrl-K listener.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onKey = (e: KeyboardEvent) => {
      const isToggleCombo =
        (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isToggleCombo) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const open = useCallback(() => {
    setQuery('');
    setActiveIndex(0);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        setQuery('');
        setActiveIndex(0);
      }
      return !prev;
    });
  }, []);

  // Ref so the keyboard handler inside CommandPalette can stay stable.
  const flatRef = useRef(flat);
  useEffect(() => {
    flatRef.current = flat;
  }, [flat]);

  const executeCommand = useCallback(
    (index: number) => {
      const cmd = flatRef.current[index];
      if (!cmd) return;
      setIsOpen(false);
      // Run after close so scrollIntoView isn't fighting the
      // overflow:hidden we just set.
      window.setTimeout(() => cmd.action(), 0);
    },
    []
  );

  return {
    isOpen,
    query,
    activeIndex: safeActiveIndex,
    filtered,
    groups,
    open,
    close,
    toggle,
    setQuery,
    setActiveIndex,
    executeCommand,
  };
}
