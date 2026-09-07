'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import type { CommandGroup, CommandItem } from '@/hooks/useCommandPalette';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  groups: Array<{ group: CommandGroup; items: CommandItem[] }>;
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
  onExecute: (idx: number) => void;
}

const GROUP_LABELS: Record<CommandGroup, string> = {
  Navigation: 'Navigation',
  Projects: 'Projects',
  Actions: 'Actions',
};

/**
 * CommandPalette
 *
 * Cmd/Ctrl-K palette. Renders grouped commands and exposes a
 * flat activeIndex (in display order) so the parent hook doesn't
 * have to know about grouping.
 */
export default function CommandPalette({
  isOpen,
  onClose,
  query,
  onQueryChange,
  groups,
  activeIndex,
  setActiveIndex,
  onExecute,
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Flat ordered index of "currently visible commands" — the
  // activeIndex is a position into this.
  const flat = useMemo<CommandItem[]>(
    () => groups.flatMap((g) => g.items),
    [groups]
  );

  // Autofocus the input when opened.
  useEffect(() => {
    if (isOpen) {
      // Next tick so the input is mounted.
      const t = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [isOpen]);

  // Scroll the active row into view.
  useEffect(() => {
    if (!isOpen) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-palette-index="${activeIndex}"]`
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(Math.min(activeIndex + 1, Math.max(0, flat.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(Math.max(activeIndex - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flat[activeIndex]) onExecute(activeIndex);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(Math.max(0, flat.length - 1));
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Build a flat index in display order.
  const itemsWithIndex: Array<{ item: CommandItem; flatIndex: number }> = [];
  let cursor = 0;
  for (const g of groups) {
    for (const item of g.items) {
      itemsWithIndex.push({ item, flatIndex: cursor });
      cursor += 1;
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-fade-up"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/60">
        {/* Search input */}
        <div className="flex items-center gap-2 px-4 border-b border-white/10">
          <svg
            className="w-4 h-4 text-slate-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              onQueryChange(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search…"
            autoComplete="off"
            spellCheck={false}
            aria-label="Search commands"
            className="w-full bg-transparent text-white placeholder-slate-500 py-3 focus:outline-none text-sm"
          />
          <kbd className="text-[10px] text-slate-500 border border-slate-700 rounded px-1.5 py-0.5 font-mono">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <ul
          ref={listRef}
          role="listbox"
          aria-label="Command results"
          className="max-h-80 overflow-y-auto py-2"
        >
          {flat.length === 0 ? (
            <li className="text-center text-sm text-slate-500 py-8">
              No matching commands
            </li>
          ) : (
            groups.map((g) => (
              <React.Fragment key={g.group}>
                <li
                  className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-wider text-slate-500 font-semibold"
                  aria-hidden="true"
                >
                  {GROUP_LABELS[g.group]}
                </li>
                {g.items.map((cmd) => {
                  const flatIndex =
                    itemsWithIndex.find((i) => i.item === cmd)?.flatIndex ?? 0;
                  const isActive = flatIndex === activeIndex;
                  return (
                    <li
                      key={`${g.group}-${cmd.label}`}
                      data-palette-index={flatIndex}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => onExecute(flatIndex)}
                      onMouseEnter={() => setActiveIndex(flatIndex)}
                      className={`mx-1 px-3 py-2 flex items-center justify-between cursor-pointer text-sm rounded-md ${
                        isActive
                          ? 'bg-orange-500/15 text-orange-200'
                          : 'text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="truncate">{cmd.label}</span>
                        {cmd.hint && (
                          <span className="text-[10px] text-slate-500 shrink-0">
                            {cmd.hint}
                          </span>
                        )}
                      </span>
                      {cmd.key && (
                        <kbd className="text-[10px] text-slate-400 border border-slate-700 rounded px-1.5 py-0.5 font-mono shrink-0">
                          {cmd.key}
                        </kbd>
                      )}
                    </li>
                  );
                })}
              </React.Fragment>
            ))
          )}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-white/10 text-[10px] text-slate-500">
          <span>
            <kbd className="font-mono border border-slate-700 rounded px-1">↑</kbd>{' '}
            <kbd className="font-mono border border-slate-700 rounded px-1">↓</kbd>{' '}
            to navigate
          </span>
          <span>
            <kbd className="font-mono border border-slate-700 rounded px-1">↵</kbd>{' '}
            to select
          </span>
        </div>
      </div>
    </div>
  );
}
