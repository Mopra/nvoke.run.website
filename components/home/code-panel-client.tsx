'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { sandboxRunner } from './sandbox-runner';
import { useLazyHighlighter } from './use-lazy-highlighter';

type Props = {
  highlightedHtml: string;
  plainCode: string;
  exampleReq: unknown;
  outputMethod: string;
  outputStatus: string;
  outputBody: string;
};

type Phase = 'idle' | 'typing' | 'pausing' | 'pulsing' | 'output' | 'done';
type RunState =
  | { kind: 'initial' }
  | { kind: 'running' }
  | { kind: 'ok'; status: string; body: string }
  | { kind: 'error'; body: string }
  | { kind: 'timeout' };

const TYPE_SPEED_MS = 28;
const POST_TYPE_PAUSE_MS = 400;
const PULSE_DURATION_MS = 600;
const OUTPUT_REVEAL_MS = 300;
const HIGHLIGHT_DEBOUNCE_MS = 120;

export function CodePanelClient({
  highlightedHtml,
  plainCode,
  exampleReq,
  outputMethod,
  outputStatus,
  outputBody
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedChars, setTypedChars] = useState(0);
  const [outputVisible, setOutputVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const [code, setCode] = useState(plainCode);
  const [liveHtml, setLiveHtml] = useState(highlightedHtml);
  const [runState, setRunState] = useState<RunState>({ kind: 'initial' });

  const { trigger: triggerHighlighterLoad, highlight } = useLazyHighlighter();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      setPhase('done');
      setOutputVisible(true);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion || hasStarted) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setHasStarted(true);
          setPhase('typing');
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion, hasStarted]);

  useEffect(() => {
    if (phase !== 'typing') return;
    if (typedChars >= plainCode.length) {
      setPhase('pausing');
      return;
    }
    const t = setTimeout(() => setTypedChars((c) => c + 1), TYPE_SPEED_MS);
    return () => clearTimeout(t);
  }, [phase, typedChars, plainCode.length]);

  useEffect(() => {
    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('pulsing'), POST_TYPE_PAUSE_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'pulsing') {
      const t = setTimeout(() => setPhase('output'), PULSE_DURATION_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'output') {
      setOutputVisible(true);
      const t = setTimeout(() => setPhase('done'), OUTPUT_REVEAL_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const interactive = phase === 'done' || reducedMotion;

  // Debounced re-highlight on edit.
  useEffect(() => {
    if (!interactive) return;
    if (code === plainCode) {
      setLiveHtml(highlightedHtml);
      return;
    }
    const t = setTimeout(async () => {
      const html = await highlight(code);
      if (html) setLiveHtml(html);
    }, HIGHLIGHT_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [code, interactive, highlight, highlightedHtml, plainCode]);

  const handleRun = useCallback(async () => {
    setRunState({ kind: 'running' });
    const result = await sandboxRunner.run(code, exampleReq);
    if (result.kind === 'ok') {
      setRunState({ kind: 'ok', status: `200 OK · ${result.ms}ms`, body: result.value });
    } else if (result.kind === 'error') {
      setRunState({ kind: 'error', body: result.message });
    } else {
      setRunState({ kind: 'timeout' });
    }
  }, [code, exampleReq]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        void handleRun();
      }
    },
    [handleRun]
  );

  const isTyping = phase === 'typing';
  const showIntroFullCode = !hasStarted || reducedMotion;
  const visibleCode = plainCode.slice(0, typedChars);

  const runButtonClass = [
    'rounded-md border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary transition',
    interactive
      ? 'cursor-pointer hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
      : 'pointer-events-none',
    phase === 'pulsing' ? 'animate-pulse' : ''
  ].join(' ');

  // Output region content.
  let outMethod = outputMethod;
  let outStatus = outputStatus;
  let outBody = outputBody;
  let statusClass = 'text-primary';
  let bodyClass = 'text-foreground';
  if (runState.kind === 'running') {
    outStatus = 'running…';
    outBody = '';
    statusClass = 'text-muted-foreground animate-pulse';
  } else if (runState.kind === 'ok') {
    outStatus = runState.status;
    outBody = runState.body;
  } else if (runState.kind === 'error') {
    outStatus = '500 Error';
    outBody = runState.body;
    statusClass = 'text-destructive';
    bodyClass = 'text-destructive';
  } else if (runState.kind === 'timeout') {
    outStatus = '408 Timeout';
    outBody = 'Execution exceeded 1000ms';
    statusClass = 'text-muted-foreground';
    bodyClass = 'text-muted-foreground';
  }

  return (
    <figure
      ref={containerRef}
      className="border-border bg-card mx-auto my-12 max-w-3xl overflow-hidden rounded-xl border"
      aria-label="Example nvoke function"
    >
      {/* Chrome bar */}
      <div className="border-border flex items-center gap-2 border-b px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
        </div>
        <span className="text-muted-foreground ml-2 font-mono text-xs">hello.js</span>
      </div>

      {/* Code region */}
      <div className="bg-card relative min-h-[7rem] overflow-x-auto px-5 py-5 font-mono text-sm [&_pre]:!bg-transparent">
        {!interactive ? (
          showIntroFullCode ? (
            <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
          ) : (
            <pre className="whitespace-pre">
              <code>
                {visibleCode}
                {isTyping && <span className="animate-pulse">▍</span>}
              </code>
            </pre>
          )
        ) : (
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none whitespace-pre"
              dangerouslySetInnerHTML={{ __html: liveHtml }}
            />
            <label className="sr-only" htmlFor="hero-editor">
              Example function source
            </label>
            <textarea
              id="hero-editor"
              ref={textareaRef}
              value={code}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              onFocus={triggerHighlighterLoad}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={4096}
              className="absolute inset-0 h-full w-full resize-none whitespace-pre bg-transparent font-mono text-sm leading-[inherit] tracking-[inherit] text-transparent caret-foreground outline-none"
            />
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="border-border flex items-center justify-end border-t px-4 py-2.5">
        <button
          type="button"
          onClick={interactive ? handleRun : undefined}
          aria-hidden={interactive ? undefined : 'true'}
          aria-keyshortcuts="Meta+Enter Control+Enter"
          tabIndex={interactive ? 0 : -1}
          className={runButtonClass}
        >
          Run ▸
        </button>
      </div>

      {/* Output region */}
      <div
        className="border-border bg-panel-output text-muted-foreground min-h-[5.5rem] space-y-1 border-t px-5 py-4 font-mono text-xs transition-opacity duration-300"
        style={{ opacity: outputVisible ? 1 : 0 }}
        aria-live={interactive ? 'polite' : 'off'}
      >
        <div>{outMethod}</div>
        <div className={statusClass}>{outStatus}</div>
        <div className={bodyClass}>{outBody}</div>
      </div>
    </figure>
  );
}
