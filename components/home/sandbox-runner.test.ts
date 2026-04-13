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
