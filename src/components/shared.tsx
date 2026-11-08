import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import manifest from '../data/imageManifest.json';
import { useCanvasLoop, isSmallScreen } from '../hooks/useCanvasLoop';

export interface ImageEntry {
  path: string;
  widths: number[];
  width: number;
  height: number;
  tone: string;
  alt: string;
  title: string;
  author: string;
  licence: string;
  source: string;
}

export const images = manifest as Record<string, ImageEntry>;

interface PhotoProps {
  name: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
  style?: CSSProperties;
}

/** A responsive picture. If a file cannot load, its tone colour remains instead of a broken icon. */
// A landscape photo covering a portrait phone is shown far wider than the screen.
const COVER_SIZES = '(orientation: portrait) 300vw, 100vw';

export function Photo({ name, className = '', sizes = COVER_SIZES, eager = false, style }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const image = images[name];
  const tone = image?.tone ?? '#101B38';
  if (!image || failed) {
    return <div className={`photo photo--fallback ${className}`} style={{ ...style, backgroundColor: tone }} aria-hidden="true" />;
  }
  const url = (width: number) => `./images/${image.path}-${width}.webp`;
  return (
    <img
      className={`photo ${className}`}
      style={{ ...style, backgroundColor: tone }}
      src={url(image.widths[image.widths.length - 1])}
      srcSet={image.widths.map((width) => `${url(width)} ${width}w`).join(', ')}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ChapterMark({ n, title, tone = 'light' }: { n: string; title: string; tone?: 'light' | 'ink' }) {
  return (
    <Reveal className={`chapter-mark chapter-mark--${tone}`}>
      <span className="chapter-mark__n">Chapter {n}</span>
      <h2 className="chapter-mark__title">{title}</h2>
    </Reveal>
  );
}

/** A soft colour blend, so one chapter's world dissolves into the next. */
export function Seam({ from, to, tall = false }: { from: string; to: string; tall?: boolean }) {
  return <div className={`seam ${tall ? 'seam--tall' : ''}`} style={{ background: `linear-gradient(${from}, ${to})` }} aria-hidden="true" />;
}

function SceneLayer({ name, index, count, progress }: { name: string; index: number; count: number; progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const start = index / count;
  const feather = 0.32 / count;
  const opacity = useTransform(progress, index === 0 ? [0, 1] : [start - feather, start + feather], index === 0 ? [1, 1] : [0, 1]);
  const scale = useTransform(progress, [Math.max(0, start - feather), Math.min(1, start + 1.3 / count)], reduced ? [1, 1] : [1.1, 1]);
  return (
    <motion.div className="scene-layer" style={{ opacity, scale }}>
      <Photo name={name} className="cover" />
    </motion.div>
  );
}

/** Full-screen photographs which dissolve into each other as the reader scrolls. */
export function SceneStack({ names, progress }: { names: string[]; progress: MotionValue<number> }) {
  return (
    <div className="scene-stack" aria-hidden="true">
      {names.map((name, index) => (
        <SceneLayer key={`${name}-${index}`} name={name} index={index} count={names.length} progress={progress} />
      ))}
    </div>
  );
}

/** Text that is visible only during its own slice of a scroll scene. */
export function Beat({ index, count, progress, children, className = '' }: { index: number; count: number; progress: MotionValue<number>; children: ReactNode; className?: string }) {
  const start = index / count;
  const end = (index + 1) / count;
  const edge = 0.22 / count;
  const last = index === count - 1;
  const first = index === 0;
  const input = last ? [start, start + edge, 1] : first ? [0, end - edge, end] : [start, start + edge, end - edge, end];
  const output = last ? [0, 1, 1] : first ? [1, 1, 0] : [0, 1, 1, 0];
  const opacity = useTransform(progress, input, output);
  const y = useTransform(opacity, [0, 1], [18, 0]);
  return (
    <motion.div className={`beat ${className}`} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

interface FloatConfig {
  count: number;
  colour: string;
  /** Vertical drift in pixels per second. Negative rises. */
  drift: number;
  size: [number, number];
  opacity: number;
  className?: string;
}

/** Drifting specks of light: dust in the classrooms and memories on the road. */
export function FloatingParticles({ count, colour, drift, size, opacity, className = '' }: FloatConfig) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = Boolean(useReducedMotion());
  const motes = useRef<Array<{ x: number; y: number; r: number; sway: number; phase: number; speed: number }>>([]);

  useCanvasLoop(
    canvasRef,
    ({ ctx, width, height, time, delta }) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = colour;
      for (const mote of motes.current) {
        mote.y += drift * mote.speed * delta;
        if (mote.y < -6) mote.y = height + 6;
        if (mote.y > height + 6) mote.y = -6;
        const x = mote.x + Math.sin(time * 0.4 + mote.phase) * mote.sway;
        ctx.globalAlpha = opacity * (0.45 + 0.55 * Math.abs(Math.sin(time * 0.5 + mote.phase)));
        ctx.beginPath();
        ctx.arc(x, mote.y, mote.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    },
    {
      still: reduced,
      onResize: (width, height) => {
        const total = isSmallScreen() ? Math.round(count * 0.5) : count;
        motes.current = Array.from({ length: total }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: size[0] + Math.random() * (size[1] - size[0]),
          sway: 8 + Math.random() * 26,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random(),
        }));
      },
    },
  );

  return <canvas ref={canvasRef} className={`fill-canvas ${className}`} aria-hidden="true" />;
}

/** A traditional faceted kandil, drawn so its flame can be lit. */
export function Kandil({ lit, flicker = true }: { lit: boolean; flicker?: boolean }) {
  return (
    <svg className={`kandil ${lit ? 'kandil--lit' : ''} ${flicker ? 'kandil--flicker' : ''}`} viewBox="0 0 200 330" aria-hidden="true">
      <defs>
        <radialGradient id="kandil-glow">
          <stop offset="0" stopColor="#FFE8B3" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#F4C879" stopOpacity="0.4" />
          <stop offset="1" stopColor="#F4C879" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="kandil-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4C879" />
          <stop offset="1" stopColor="#B9742C" />
        </linearGradient>
      </defs>
      <circle className="kandil__halo" cx="100" cy="128" r="98" fill="url(#kandil-glow)" />
      <path d="M100 0v36" stroke="#F4C879" strokeWidth="1.6" />
      <path d="M78 36h44l6 12H72z" fill="#D39A49" />
      <path className="kandil__panel" d="M72 48h56l44 80H28z" fill="url(#kandil-panel)" />
      <path className="kandil__panel" d="M28 128h144l-44 80H72z" fill="#A9402F" />
      <path className="kandil__panel kandil__panel--rose" d="M72 48l28 80H28z" fill="#ED91B1" />
      <path className="kandil__panel kandil__panel--emerald" d="M128 48l-28 80h72z" fill="#8DDAC0" />
      <path className="kandil__panel kandil__panel--rose" d="M100 128l28 80h44z" fill="#C94F7E" opacity="0.8" />
      <path className="kandil__panel kandil__panel--emerald" d="M100 128l-28 80H28z" fill="#3D9C80" opacity="0.8" />
      <g fill="none" stroke="#FFE8B3" strokeWidth="1.3" opacity="0.8">
        <path d="M72 48h56l44 80-44 80H72l-44-80z" />
        <path d="M28 128h144M72 48l28 80 28-80M72 208l28-80 28 80" />
      </g>
      <g className="kandil__flame">
        <path d="M100 96c13 16 19 27 19 39a19 19 0 0 1-38 0c0-12 6-23 19-39z" fill="#F7A83A" />
        <path d="M100 116c7 9 10 15 10 22a10 10 0 0 1-20 0c0-7 3-13 10-22z" fill="#FFF3CF" />
      </g>
      <path d="M72 208h56l-8 12H80z" fill="#D39A49" />
      <g stroke="#F4C879" strokeWidth="2.4" strokeLinecap="round">
        <path d="M84 220v70M100 220v92M116 220v70" />
      </g>
      <g fill="#ED91B1">
        <circle cx="84" cy="294" r="4.5" />
        <circle cx="100" cy="316" r="5.5" />
        <circle cx="116" cy="294" r="4.5" />
      </g>
    </svg>
  );
}
