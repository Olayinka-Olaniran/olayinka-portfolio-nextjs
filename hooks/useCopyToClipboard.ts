'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseCopyToClipboardResult {
  /** True briefly after a successful copy, then resets to false. */
  copied: boolean;
  /** Copy text. Resolves true on success, false on failure. */
  copy: (text: string) => Promise<boolean>;
}

/**
 * useCopyToClipboard
 * Copies text to the clipboard and exposes a transient "copied" flag
 * for UI feedback (e.g. "Copied!" toast).
 *
 * The previous version had two real bugs:
 * 1. `setTimeout` was never cleared on unmount, so navigating away
 *    mid-copy could call `setCopied` on an unmounted component.
 * 2. The execCommand fallback also called `setTimeout` and could leave
 *    the textarea in the DOM if `select()` threw.
 *
 * Both are fixed here: a single timeout ref is cleared on every
 * successful copy and on unmount; the fallback uses try/finally to
 * always remove the temporary textarea.
 */
export function useCopyToClipboard(
  resetDelay: number = 2000
): UseCopyToClipboardResult {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const flashCopied = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCopied(true);
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) setCopied(false);
      timeoutRef.current = null;
    }, resetDelay);
  }, [resetDelay]);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      // Modern Clipboard API path (requires secure context).
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function'
      ) {
        try {
          await navigator.clipboard.writeText(text);
          flashCopied();
          return true;
        } catch {
          // Permission denied or insecure context — fall through.
        }
      }

      // Legacy fallback for older / non-secure contexts.
      if (typeof document === 'undefined') return false;
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      document.body.appendChild(textarea);
      try {
        textarea.select();
        const ok = document.execCommand('copy');
        if (ok) {
          flashCopied();
          return true;
        }
        return false;
      } catch {
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    },
    [flashCopied]
  );

  return { copied, copy };
}
