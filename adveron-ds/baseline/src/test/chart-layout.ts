// Recharts' ResponsiveContainer measures its own box before it draws anything:
// it reads `getBoundingClientRect()` on mount and then follows a ResizeObserver.
// jsdom performs no layout, so both report 0×0 and the container renders NULL —
// which matters more than it sounds, because a test asserting on plotted data
// would then pass against an empty SVG for as long as the chart was broken.
//
// This supplies the one thing jsdom is missing: an observer that answers with a
// real box, the way a browser's does on `observe()`. Scoped to the files that
// assert on charts rather than added to the shared vitest setup, where a
// ResizeObserver that actually FIRES would reach every Radix test that only
// needs one to exist.
export function stubChartLayout(
  size: { width: number; height: number } = { width: 640, height: 240 },
): () => void {
  const previous = globalThis.ResizeObserver;

  globalThis.ResizeObserver = class {
    private readonly callback: ResizeObserverCallback;

    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }

    observe(target: Element): void {
      // Synchronously, like a real observer's initial delivery. Recharts calls
      // `observe` inside its mount effect, so this lands in the same React batch
      // as the 0×0 the unlaid-out DOM just reported and wins.
      this.callback(
        [
          {
            target,
            contentRect: { ...size, x: 0, y: 0, top: 0, left: 0, bottom: size.height, right: size.width },
          } as unknown as ResizeObserverEntry,
        ],
        this as unknown as ResizeObserver,
      );
    }

    unobserve(): void {}
    disconnect(): void {}
  };

  return () => {
    globalThis.ResizeObserver = previous;
  };
}
