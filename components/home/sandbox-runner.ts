export type RunResult =
  | { kind: 'ok'; value: string; ms: number }
  | { kind: 'error'; message: string; ms: number }
  | { kind: 'timeout' };

const RUN_TIMEOUT_MS = 1000;
const MAX_CODE_BYTES = 4096;
const SANDBOX_URL = '/sandbox.html';

let iframe: HTMLIFrameElement | null = null;
let ready: Promise<void> | null = null;
const pending = new Map<string, (result: RunResult) => void>();
let listenerBound = false;

function bindListenerOnce() {
  if (listenerBound) return;
  listenerBound = true;
  window.addEventListener('message', (e: MessageEvent) => {
    const data = e.data as { id?: string; ok?: boolean; value?: string; error?: string; ms?: number; ready?: boolean } | null;
    if (!data) return;
    if (data.id && pending.has(data.id)) {
      const resolve = pending.get(data.id)!;
      pending.delete(data.id);
      if (data.ok) resolve({ kind: 'ok', value: data.value ?? '', ms: data.ms ?? 0 });
      else resolve({ kind: 'error', message: data.error ?? 'Unknown error', ms: data.ms ?? 0 });
    }
  });
}

function ensureFrame(): Promise<void> {
  if (ready) return ready;
  bindListenerOnce();
  const frame = document.createElement('iframe');
  frame.setAttribute('sandbox', 'allow-scripts');
  frame.setAttribute('aria-hidden', 'true');
  frame.setAttribute('tabindex', '-1');
  frame.src = SANDBOX_URL;
  frame.style.position = 'absolute';
  frame.style.width = '0';
  frame.style.height = '0';
  frame.style.border = '0';
  frame.style.left = '-9999px';
  iframe = frame;
  ready = new Promise<void>((resolve) => {
    const onReady = (e: MessageEvent) => {
      if (e.data && e.data.ready === true) {
        window.removeEventListener('message', onReady);
        resolve();
      }
    };
    window.addEventListener('message', onReady);
    document.body.appendChild(frame);
  });
  return ready;
}

function teardown() {
  if (iframe) iframe.remove();
  iframe = null;
  ready = null;
  pending.clear();
}

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return 'run_' + idCounter + '_' + Date.now();
}

async function run(code: string, req: unknown): Promise<RunResult> {
  if (code.length > MAX_CODE_BYTES) {
    return { kind: 'error', message: 'Code exceeds 4KB limit', ms: 0 };
  }
  await ensureFrame();
  const id = nextId();
  return new Promise<RunResult>((resolve) => {
    pending.set(id, resolve);
    iframe!.contentWindow!.postMessage({ id, code, req }, '*');
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        teardown();
        resolve({ kind: 'timeout' });
      }
    }, RUN_TIMEOUT_MS);
  });
}

export const sandboxRunner = { run };

// Test-only: reset module state between tests.
export function __resetForTests() {
  teardown();
  listenerBound = false;
  idCounter = 0;
}
