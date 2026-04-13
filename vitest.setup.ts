import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// jsdom does not implement IntersectionObserver — stub it so components
// that use it in effects (e.g. CodePanelClient) can mount in tests.
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = '';
  thresholds: number[] = [];
  constructor(_cb: IntersectionObserverCallback, _opts?: IntersectionObserverInit) {}
}

globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

afterEach(() => {
  cleanup();
});
