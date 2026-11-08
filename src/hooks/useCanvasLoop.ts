import { useEffect, useRef, type RefObject } from 'react';

export interface CanvasFrame {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  /** Seconds since the loop began. */
  time: number;
  /** Seconds since the previous frame, clamped so a paused tab cannot cause a jump. */
  delta: number;
}

interface Options {
  /** Called on mount and on every resize, before drawing. */
  onResize?: (width: number, height: number) => void;
  /** When true, draws one still frame and never starts a loop. */
  still?: boolean;
}

export const isSmallScreen = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches;

/**
 * Runs a canvas animation only while it is on screen and the tab is visible,
 * and removes every observer, listener and animation frame on unmount.
 */
export function useCanvasLoop(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  draw: (frame: CanvasFrame) => void,
  options: Options = {},
) {
  const drawRef = useRef(draw);
  const optionsRef = useRef(options);
  drawRef.current = draw;
  optionsRef.current = options;

  const still = Boolean(options.still);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let frameId = 0;
    let onScreen = false;
    let last = performance.now();
    let elapsed = 0;
    let width = 0;
    let height = 0;

    const paint = (delta: number) => {
      if (width && height) drawRef.current({ ctx, width, height, time: elapsed, delta });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, isSmallScreen() ? 1.5 : 2);
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      optionsRef.current.onResize?.(width, height);
      if (still) paint(0);
    };

    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += delta;
      paint(delta);
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const update = () => {
      if (still) return;
      const shouldRun = onScreen && document.visibilityState === 'visible';
      if (shouldRun && !frameId) {
        last = performance.now();
        frameId = requestAnimationFrame(tick);
      } else if (!shouldRun) {
        stop();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const intersection = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        update();
      },
      { rootMargin: '80px' },
    );
    intersection.observe(canvas);
    document.addEventListener('visibilitychange', update);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [canvasRef, still]);
}
