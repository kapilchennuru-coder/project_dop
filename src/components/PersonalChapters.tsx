import { useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { kapil, voice } from '../data/storyContent';
import { useCanvasLoop, isSmallScreen } from '../hooks/useCanvasLoop';
import { ChapterMark, Reveal } from './shared';

// The waves are drawn, never sampled: nothing here is or imitates a recording.
function SoundWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = Boolean(useReducedMotion());
  const pointer = useRef({ x: 0.5, energy: 0, target: 0 });
  const sparks = useRef<Array<{ x: number; y: number; r: number; phase: number; speed: number }>>([]);

  useCanvasLoop(
    canvasRef,
    ({ ctx, width, height, time, delta }) => {
      const state = pointer.current;
      state.energy += (state.target - state.energy) * Math.min(1, delta * 3);
      state.target *= 1 - Math.min(1, delta * 0.9);
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      const middle = height / 2;
      const glow = ctx.createRadialGradient(width * state.x, middle, 0, width * state.x, middle, Math.max(width, height) * 0.42);
      glow.addColorStop(0, `rgba(244,200,121,${0.09 + state.energy * 0.16})`);
      glow.addColorStop(1, 'rgba(244,200,121,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const lines = isSmallScreen() ? 6 : 9;
      const stepX = isSmallScreen() ? 5 : 3;
      for (let line = 0; line < lines; line++) {
        const ratio = line / (lines - 1);
        ctx.beginPath();
        for (let x = 0; x <= width; x += stepX) {
          const u = x / width;
          const envelope = Math.sin(Math.PI * u) ** 1.6;
          const near = Math.exp(-(((u - state.x) * 5) ** 2));
          // Short, irregular bursts, the rhythm of someone speaking.
          const phrase = 0.5 + 0.5 * Math.sin(u * 7 + time * 0.8 + line * 0.3) * Math.sin(u * 2.7 - time * 0.45);
          const amplitude = height * (0.11 + 0.18 * phrase + near * state.energy * 0.24) * envelope * (1 - ratio * 0.75);
          const y = middle + Math.sin(u * (24 + line * 2.2) + time * (1.6 + ratio)) * amplitude * Math.cos(u * 3 + line + time * 0.3);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = line % 3 === 2 ? `rgba(237,145,177,${0.3 - ratio * 0.12})` : `rgba(244,200,121,${0.66 - ratio * 0.4})`;
        ctx.lineWidth = line === 0 ? 1.6 : 1;
        ctx.stroke();
      }

      ctx.fillStyle = '#FFE8B3';
      for (const spark of sparks.current) {
        spark.x += spark.speed * delta;
        if (spark.x > width + 4) spark.x = -4;
        ctx.globalAlpha = 0.25 + 0.5 * Math.abs(Math.sin(time * 1.2 + spark.phase));
        ctx.beginPath();
        ctx.arc(spark.x, spark.y + Math.sin(time + spark.phase) * 12, spark.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    },
    {
      still: reduced,
      onResize: (width, height) => {
        sparks.current = Array.from({ length: isSmallScreen() ? 20 : 46 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.6 + Math.random() * 1.5,
          phase: Math.random() * 6.3,
          speed: 5 + Math.random() * 16,
        }));
      },
    },
  );

  const move = (clientX: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointer.current.x = (clientX - rect.left) / rect.width;
    pointer.current.target = 1;
  };

  return (
    <canvas
      ref={canvasRef}
      className="voice__canvas"
      aria-hidden="true"
      onPointerMove={(event) => move(event.clientX)}
      onPointerDown={(event) => move(event.clientX)}
    />
  );
}

// Chapter 04
export function VoiceChapter() {
  return (
    <section id="voice" className="chapter chapter--voice">
      <div className="narrow narrow--center">
        <ChapterMark n="03" title={voice.title} />
      </div>
      <SoundWaves />
      <div className="narrow narrow--center">
        <p className="voice__hint">{voice.hint}</p>
        <Reveal>
          <p className="display">{voice.display}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="lede">{voice.support}</p>
        </Reveal>
      </div>
    </section>
  );
}

const TILTS: CSSProperties[] = [
  { rotate: '-3deg' },
  { rotate: '2deg' },
  { rotate: '-1.5deg' },
  { rotate: '3deg' },
  { rotate: '-2.5deg' },
  { rotate: '1.5deg' },
];

function Doodles() {
  return (
    <svg className="doodles" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="#3B4C86" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
        <path d="M70 90l18 38 42 6-30 30 8 42-38-20-38 20 8-42-30-30 42-6z" />
        <path d="M860 70c26-24 66-8 66 26 0 42-66 74-66 74s-66-32-66-74c0-34 40-50 66-26z" />
        <path d="M80 560l130-44 14 40-130 44zM210 516l26-6-12 46" />
        <circle cx="870" cy="560" r="52" />
        <path d="M848 546v4M892 546v4M842 578c14 22 42 22 56 0" />
      </g>
    </svg>
  );
}

// Chapter 05
export function KapilChapter() {
  const [opened, setOpened] = useState<Record<number, boolean>>({});

  return (
    <section id="kapil" className="chapter chapter--kapil">
      <Doodles />
      <div className="narrow narrow--center">
        <ChapterMark n="04" title={kapil.title} tone="ink" />
        <Reveal>
          <p className="kapil__lead">{kapil.lead}</p>
          <p className="kapil__hint">{kapil.hint}</p>
        </Reveal>
      </div>
      <div className="bubbles">
        {kapil.bubbles.map((bubble, index) => {
          const open = Boolean(opened[index]);
          return (
            <motion.button
              type="button"
              key={bubble.label}
              className={`bubble ${index % 2 ? 'bubble--right' : ''}`}
              style={TILTS[index % TILTS.length]}
              aria-expanded={open}
              onClick={() => setOpened((state) => ({ ...state, [index]: !state[index] }))}
              whileTap={{ scale: 0.97 }}
            >
              <span className="bubble__label">{bubble.label}</span>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.span
                    className="bubble__reveal"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span>{bubble.reveal}</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      <div className="narrow narrow--center">
        <Reveal>
          <p className="kapil__main">{kapil.main}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="kapil__quiet">{kapil.quiet}</p>
        </Reveal>
      </div>
    </section>
  );
}
