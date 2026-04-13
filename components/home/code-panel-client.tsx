'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  highlightedHtml: string;
  plainCode: string;
  outputMethod: string;
  outputStatus: string;
  outputBody: string;
};

type Phase = 'idle' | 'typing' | 'pausing' | 'pulsing' | 'output' | 'done';

const TYPE_SPEED_MS = 28;
const POST_TYPE_PAUSE_MS = 400;
const PULSE_DURATION_MS = 600;
const OUTPUT_REVEAL_MS = 300;

export function CodePanelClient({
  highlightedHtml,
  plainCode,
  outputMethod,
  outputStatus,
  outputBody
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);
  // hasStarted is false until IO fires → SSR/hydrate render shows the full highlighted HTML,
  // which is what the spec calls the "SSR initial state". Once the animation starts we
  // swap to the plain-text typing view, then back to the highlighted view when done.
  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedChars, setTypedChars] = useState(0);
  const [outputVisible, setOutputVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect reduced motion on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      setPhase('done');
      setOutputVisible(true);
    }
  }, []);

  // IntersectionObserver — fires once
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

  // Typing phase
  useEffect(() => {
    if (phase !== 'typing') return;
    if (typedChars >= plainCode.length) {
      setPhase('pausing');
      return;
    }
    const t = setTimeout(() => {
      setTypedChars((c) => c + 1);
    }, TYPE_SPEED_MS);
    return () => clearTimeout(t);
  }, [phase, typedChars, plainCode.length]);

  // Pausing → pulsing → output → done
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

  const isTyping = phase === 'typing';
  // Show full highlighted HTML when:
  // - SSR / first hydrate (!hasStarted)
  // - animation finished (phase === 'done')
  // - user prefers reduced motion
  const showFullCode = !hasStarted || phase === 'done' || reducedMotion;
  const visibleCode = plainCode.slice(0, typedChars);

  const runButtonClass = `pointer-events-none rounded-md border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary ${
    phase === 'pulsing' ? 'animate-pulse' : ''
  }`;

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

      {/* Code region — either full Shiki HTML (when done) or partial plain text (while typing) */}
      <div className="bg-card min-h-[7rem] overflow-x-auto px-5 py-5 font-mono text-sm [&_pre]:!bg-transparent">
        {showFullCode ? (
          <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        ) : (
          <pre className="whitespace-pre">
            <code>
              {visibleCode}
              {isTyping && <span className="animate-pulse">▍</span>}
            </code>
          </pre>
        )}
      </div>

      {/* Action bar */}
      <div className="border-border flex items-center justify-end border-t px-4 py-2.5">
        <button type="button" aria-hidden="true" tabIndex={-1} className={runButtonClass}>
          Run ▸
        </button>
      </div>

      {/* Output region — reserves height at all times (prevents CLS) */}
      <div
        className="border-border bg-panel-output text-muted-foreground min-h-[5.5rem] space-y-1 border-t px-5 py-4 font-mono text-xs transition-opacity duration-300"
        style={{ opacity: outputVisible ? 1 : 0 }}
        aria-live="off"
      >
        <div>{outputMethod}</div>
        <div className="text-primary">{outputStatus}</div>
        <div className="text-foreground">{outputBody}</div>
      </div>
    </figure>
  );
}
