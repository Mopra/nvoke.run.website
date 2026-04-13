'use client';

import { useCallback, useRef } from 'react';

type HighlighterFn = (code: string) => Promise<string>;

let cached: Promise<HighlighterFn> | null = null;

function loadHighlighter(): Promise<HighlighterFn> {
  if (cached) return cached;
  cached = (async () => {
    const { createHighlighter } = await import('shiki');
    const hl = await createHighlighter({
      themes: ['vesper'],
      langs: ['javascript'],
    });
    return (code: string) =>
      Promise.resolve(hl.codeToHtml(code, { lang: 'javascript', theme: 'vesper' }));
  })();
  return cached;
}

export function useLazyHighlighter() {
  const loaded = useRef<HighlighterFn | null>(null);

  const trigger = useCallback(() => {
    if (loaded.current) return;
    loadHighlighter().then(
      (fn) => {
        loaded.current = fn;
      },
      () => {
        // Swallow — caller falls back to stale/plain rendering.
      }
    );
  }, []);

  const highlight = useCallback(async (code: string): Promise<string | null> => {
    if (!loaded.current) {
      try {
        loaded.current = await loadHighlighter();
      } catch {
        return null;
      }
    }
    try {
      return await loaded.current(code);
    } catch {
      return null;
    }
  }, []);

  return { trigger, highlight };
}
