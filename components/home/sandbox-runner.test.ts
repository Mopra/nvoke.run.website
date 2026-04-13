import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

type PostedMsg = { id: string; code: string; req: unknown };

// Test harness: replaces the runner's iframe with a fake one that routes
// postMessage calls to a handler we control.
function installFakeIframe(handler: (msg: PostedMsg) => void | Promise<void>) {
  const listeners: Array<(e: MessageEvent) => void> = [];
  const originalAdd = window.addEventListener.bind(window);
  const originalRemove = window.removeEventListener.bind(window);

  vi.spyOn(window, 'addEventListener').mockImplementation(((type: string, cb: any, opts?: any) => {
    if (type === 'message') listeners.push(cb);
    else originalAdd(type as any, cb, opts);
  }) as any);
  vi.spyOn(window, 'removeEventListener').mockImplementation(((type: string, cb: any, opts?: any) => {
    if (type === 'message') {
      const i = listeners.indexOf(cb);
      if (i >= 0) listeners.splice(i, 1);
    } else originalRemove(type as any, cb, opts);
  }) as any);

  const fakeIframe = {
    contentWindow: {
      postMessage: async (msg: PostedMsg) => {
        await handler(msg);
      },
    },
    remove: vi.fn(),
    setAttribute: vi.fn(),
    style: {} as CSSStyleDeclaration,
  } as unknown as HTMLIFrameElement;

  const realCreate = document.createElement.bind(document);
  vi.spyOn(document, 'createElement').mockImplementation(((tag: string) => {
    if (tag === 'iframe') return fakeIframe;
    return realCreate(tag);
  }) as any);
  vi.spyOn(document.body, 'appendChild').mockImplementation(((node: Node) => {
    // Immediately fire the ready handshake after "mounting".
    queueMicrotask(() => {
      listeners.forEach((l) => l(new MessageEvent('message', { data: { ready: true } })));
    });
    return node;
  }) as any);

  const reply = (data: unknown) => {
    listeners.forEach((l) => l(new MessageEvent('message', { data })));
  };
  return { reply, fakeIframe };
}

describe('sandboxRunner.run — success', () => {
  beforeEach(async () => {
    const mod = await import('./sandbox-runner');
    mod.__resetForTests();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('resolves with the serialized return value', async () => {
    const { reply } = installFakeIframe((msg) => {
      reply({ id: msg.id, ok: true, value: '{"message":"Hello, world!"}', ms: 12 });
    });

    const { sandboxRunner } = await import('./sandbox-runner');
    const result = await sandboxRunner.run('() => ({ message: "Hello, world!" })', { body: {} });
    expect(result).toEqual({ kind: 'ok', value: '{"message":"Hello, world!"}', ms: 12 });
  });
});

describe('sandboxRunner.run — errors', () => {
  beforeEach(async () => {
    const mod = await import('./sandbox-runner');
    mod.__resetForTests();
  });
  afterEach(() => vi.restoreAllMocks());

  it('resolves with an error when the sandbox reports ok: false', async () => {
    const { reply } = installFakeIframe((msg) => {
      reply({ id: msg.id, ok: false, error: 'nope', ms: 3 });
    });
    const { sandboxRunner } = await import('./sandbox-runner');
    const result = await sandboxRunner.run('() => { throw new Error("nope") }', {});
    expect(result).toEqual({ kind: 'error', message: 'nope', ms: 3 });
  });

  it('rejects code larger than 4KB synchronously without creating an iframe', async () => {
    const createSpy = vi.spyOn(document, 'createElement');
    const { sandboxRunner } = await import('./sandbox-runner');
    const big = 'x'.repeat(5000);
    const result = await sandboxRunner.run(big, {});
    expect(result).toEqual({ kind: 'error', message: 'Code exceeds 4KB limit', ms: 0 });
    expect(createSpy).not.toHaveBeenCalledWith('iframe');
  });
});

describe('sandboxRunner.run — timeout', () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    const mod = await import('./sandbox-runner');
    mod.__resetForTests();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('returns { kind: "timeout" } after 1000ms and tears down the iframe', async () => {
    const fake = installFakeIframe(() => {
      // Never reply.
    });
    const { sandboxRunner } = await import('./sandbox-runner');
    const promise = sandboxRunner.run('() => 1', {});
    await vi.advanceTimersByTimeAsync(1000);
    const result = await promise;
    expect(result).toEqual({ kind: 'timeout' });
    expect(fake.fakeIframe.remove).toHaveBeenCalled();
  });
});

describe('sandboxRunner.run — overlapping runs', () => {
  beforeEach(async () => {
    const mod = await import('./sandbox-runner');
    mod.__resetForTests();
  });
  afterEach(() => vi.restoreAllMocks());

  it('resolves concurrent runs with their own ids', async () => {
    const seen: string[] = [];
    let replyFn: (data: unknown) => void = () => {};
    const fake = installFakeIframe((msg) => {
      seen.push(msg.id);
    });
    replyFn = fake.reply;

    const { sandboxRunner } = await import('./sandbox-runner');
    const p1 = sandboxRunner.run('() => 1', {});
    const p2 = sandboxRunner.run('() => 2', {});
    // Let microtasks run so both ids are recorded.
    await Promise.resolve();
    await Promise.resolve();
    // Reply in reverse order.
    replyFn({ id: seen[1], ok: true, value: '2', ms: 1 });
    replyFn({ id: seen[0], ok: true, value: '1', ms: 2 });
    const [r1, r2] = await Promise.all([p1, p2]);
    expect(r1).toEqual({ kind: 'ok', value: '1', ms: 2 });
    expect(r2).toEqual({ kind: 'ok', value: '2', ms: 1 });
  });
});
