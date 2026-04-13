import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the runner before importing the component.
vi.mock('./sandbox-runner', () => {
  const run = vi.fn();
  return { sandboxRunner: { run } };
});
// Mock the lazy highlighter — we don't want Shiki in tests.
vi.mock('./use-lazy-highlighter', () => ({
  useLazyHighlighter: () => ({
    trigger: vi.fn(),
    highlight: vi.fn(async () => '<pre>stub</pre>'),
  }),
}));

// Force reduced motion so the component lands in `interactive` state immediately.
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
});

import { CodePanelClient } from './code-panel-client';
import { sandboxRunner } from './sandbox-runner';

const baseProps = {
  highlightedHtml: '<pre>stub</pre>',
  plainCode: 'export default (req) => ({ ok: true })',
  exampleReq: { body: { name: 'world' } },
  outputMethod: 'POST /api/invoke/hello',
  outputStatus: '200 OK · 47ms',
  outputBody: '{ "message": "Hello, world!" }',
};

describe('CodePanelClient — interactive run', () => {
  it('renders 200 OK and the serialized body on success', async () => {
    (sandboxRunner.run as ReturnType<typeof vi.fn>).mockResolvedValue({
      kind: 'ok',
      value: '{"hello":"there"}',
      ms: 12,
    });
    const user = userEvent.setup();
    render(<CodePanelClient {...baseProps} />);
    await user.click(screen.getByRole('button', { name: /run/i }));
    expect(await screen.findByText('200 OK · 12ms')).toBeInTheDocument();
    expect(screen.getByText('{"hello":"there"}')).toBeInTheDocument();
  });

  it('renders 500 Error and the error message on error', async () => {
    (sandboxRunner.run as ReturnType<typeof vi.fn>).mockResolvedValue({
      kind: 'error',
      message: 'nope',
      ms: 3,
    });
    const user = userEvent.setup();
    render(<CodePanelClient {...baseProps} />);
    await user.click(screen.getByRole('button', { name: /run/i }));
    expect(await screen.findByText('500 Error')).toBeInTheDocument();
    expect(screen.getByText('nope')).toBeInTheDocument();
  });

  it('renders 408 Timeout on timeout', async () => {
    (sandboxRunner.run as ReturnType<typeof vi.fn>).mockResolvedValue({ kind: 'timeout' });
    const user = userEvent.setup();
    render(<CodePanelClient {...baseProps} />);
    await user.click(screen.getByRole('button', { name: /run/i }));
    expect(await screen.findByText('408 Timeout')).toBeInTheDocument();
    expect(screen.getByText('Execution exceeded 1000ms')).toBeInTheDocument();
  });

  it('runs on Ctrl+Enter from the editor', async () => {
    (sandboxRunner.run as ReturnType<typeof vi.fn>).mockResolvedValue({
      kind: 'ok',
      value: '"kb"',
      ms: 1,
    });
    const user = userEvent.setup();
    render(<CodePanelClient {...baseProps} />);
    const ta = screen.getByLabelText('Example function source');
    await user.click(ta);
    await user.keyboard('{Control>}{Enter}{/Control}');
    expect(await screen.findByText('200 OK · 1ms')).toBeInTheDocument();
  });
});
