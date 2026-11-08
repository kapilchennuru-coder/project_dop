import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { finale, ui } from '../data/storyContent';
import { FireworksEngine } from '../lib/fireworks';
import { chime } from '../lib/ambient';
import { useCanvasLoop, isSmallScreen } from '../hooks/useCanvasLoop';
import { images, Kandil, Photo } from './shared';

/** The real kandil photograph, as the night deepens into the final sky. */
export function KandilThreshold() {
  return (
    <div className="threshold" aria-hidden="true">
      <Photo name="kandil" className="cover" />
    </div>
  );
}

interface Star { x: number; y: number; r: number; phase: number; speed: number }
interface Lantern { x: number; y: number; scale: number; speed: number; phase: number }
interface Petal { x: number; y: number; size: number; spin: number; phase: number; colour: string; speed: number }

const PETAL_COLOURS = ['#ED91B1', '#F4A63C', '#F4C879'];

function drawLanternSprite() {
  const sprite = document.createElement('canvas');
  sprite.width = 120;
  sprite.height = 170;
  const ctx = sprite.getContext('2d');
  if (!ctx) return sprite;
  const glow = ctx.createRadialGradient(60, 68, 2, 60, 68, 60);
  glow.addColorStop(0, 'rgba(255,214,140,.8)');
  glow.addColorStop(1, 'rgba(255,190,90,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 120, 140);
  const facet = (points: number[], colour: string) => {
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2) ctx.lineTo(points[i], points[i + 1]);
    ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();
  };
  facet([46, 34, 74, 34, 96, 72, 24, 72], '#F2B457');
  facet([24, 72, 96, 72, 74, 110, 46, 110], '#C9622F');
  facet([46, 34, 60, 72, 24, 72], '#ED91B1');
  facet([74, 34, 60, 72, 96, 72], '#8DDAC0');
  ctx.strokeStyle = '#F4C879';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(60, 8);
  ctx.lineTo(60, 34);
  ctx.moveTo(52, 110);
  ctx.lineTo(52, 148);
  ctx.moveTo(60, 110);
  ctx.lineTo(60, 160);
  ctx.moveTo(68, 110);
  ctx.lineTo(68, 148);
  ctx.stroke();
  return sprite;
}

/** Stars, drifting kandils and falling petals on one canvas. */
function NightSky({ still }: { still: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backdrop = useRef<HTMLCanvasElement | null>(null);
  const twinkles = useRef<Star[]>([]);
  const lanterns = useRef<Lantern[]>([]);
  const petals = useRef<Petal[]>([]);
  const sprite = useRef<HTMLCanvasElement | null>(null);

  useCanvasLoop(
    canvasRef,
    ({ ctx, width, height, time, delta }) => {
      ctx.clearRect(0, 0, width, height);
      if (backdrop.current) ctx.drawImage(backdrop.current, 0, 0, width, height);

      ctx.fillStyle = '#FFF6DF';
      for (const star of twinkles.current) {
        ctx.globalAlpha = 0.25 + 0.75 * Math.abs(Math.sin(time * star.speed + star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      if (!sprite.current) sprite.current = drawLanternSprite();
      for (const lantern of lanterns.current) {
        lantern.y -= lantern.speed * delta;
        if (lantern.y < -130) {
          lantern.y = height + 60;
          lantern.x = Math.random() * width;
        }
        const w = 120 * lantern.scale;
        const h = 170 * lantern.scale;
        ctx.globalAlpha = 0.72 + Math.sin(time * 2 + lantern.phase) * 0.14;
        ctx.drawImage(sprite.current, lantern.x + Math.sin(time * 0.3 + lantern.phase) * 14 - w / 2, lantern.y, w, h);
      }

      for (const petal of petals.current) {
        petal.y += petal.speed * delta;
        if (petal.y > height + 12) {
          petal.y = -12;
          petal.x = Math.random() * width;
        }
        ctx.save();
        ctx.translate(petal.x + Math.sin(time * 0.7 + petal.phase) * 22, petal.y);
        ctx.rotate(time * petal.spin + petal.phase);
        ctx.scale(1, 0.45 + 0.55 * Math.abs(Math.sin(time + petal.phase)));
        ctx.globalAlpha = 0.74;
        ctx.fillStyle = petal.colour;
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size, petal.size * 0.56, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    },
    {
      still,
      onResize: (width, height) => {
        const small = isSmallScreen();
        const off = document.createElement('canvas');
        off.width = Math.round(width);
        off.height = Math.round(height);
        const offCtx = off.getContext('2d');
        if (offCtx) {
          const total = small ? 1600 : 3600;
          offCtx.fillStyle = '#FFF6DF';
          for (let i = 0; i < total; i++) {
            offCtx.globalAlpha = 0.14 + Math.random() * 0.55;
            const size = Math.random() < 0.94 ? 0.8 : 1.5;
            offCtx.fillRect(Math.random() * width, Math.random() * height, size, size);
          }
        }
        backdrop.current = off;
        twinkles.current = Array.from({ length: small ? 110 : 240 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.6 + Math.random() * 1.1,
          phase: Math.random() * 6.3,
          speed: 0.5 + Math.random() * 1.6,
        }));
        lanterns.current = Array.from({ length: small ? 7 : 14 }, () => ({
          x: Math.random() * width,
          y: Math.random() * (height + 130),
          scale: 0.16 + Math.random() * 0.26,
          speed: 7 + Math.random() * 13,
          phase: Math.random() * 6.3,
        }));
        petals.current = Array.from({ length: small ? 12 : 26 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 3 + Math.random() * 4,
          spin: 0.3 + Math.random() * 0.8,
          phase: Math.random() * 6.3,
          colour: PETAL_COLOURS[Math.floor(Math.random() * PETAL_COLOURS.length)],
          speed: 12 + Math.random() * 22,
        }));
      },
    },
  );

  return <canvas ref={canvasRef} className="fill-canvas" aria-hidden="true" />;
}

type Phase = 'idle' | 'flame' | 'glow' | 'rise' | 'fireworks' | 'name' | 'message';

const SCHEDULE: Array<[Phase, number]> = [
  ['glow', 1500],
  ['rise', 3800],
  ['fireworks', 6000],
  ['name', 11800],
  ['message', 14000],
];

// Chapter 08
export function FinalLantern() {
  const reduced = Boolean(useReducedMotion());
  const [phase, setPhase] = useState<Phase>('idle');
  const section = useRef<HTMLElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<FireworksEngine | null>(null);
  const timers = useRef<number[]>([]);

  useCanvasLoop(
    canvas,
    ({ ctx, width, height, delta, time }) => engine.current?.frame(ctx, width, height, delta, time),
    { still: reduced },
  );

  useEffect(() => {
    engine.current = new FireworksEngine(isSmallScreen());
    return () => timers.current.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    const fireworks = engine.current;
    const area = canvas.current;
    if (!fireworks || !area || reduced) return;
    if (phase === 'fireworks') {
      fireworks.interval = 0.42;
      for (let i = 0; i < 3; i++) fireworks.launch(area.clientWidth, area.clientHeight, ['#F4C879', '#ED5C9B', '#5FDDAF'][i]);
    }
    if (phase === 'message') fireworks.interval = 2.4;
    if (phase === 'name') {
      fireworks.interval = 1.2;
      let cancelled = false;
      void document.fonts.load('600 60px "Cormorant Garamond"').finally(() => {
        const target = slot.current;
        if (cancelled || !target) return;
        const box = target.getBoundingClientRect();
        const origin = area.getBoundingClientRect();
        fireworks.formText(
          finale.particleName,
          { x: box.left - origin.left, y: box.top - origin.top, width: box.width, height: box.height },
          isSmallScreen(),
        );
      });
      return () => {
        cancelled = true;
      };
    }
  }, [phase, reduced]);

  const light = () => {
    if (phase !== 'idle') return;
    chime();
    section.current?.scrollIntoView();
    if (reduced) {
      setPhase('message');
      return;
    }
    setPhase('flame');
    timers.current = SCHEDULE.map(([next, time]) => window.setTimeout(() => setPhase(next), time));
  };

  const replay = () => {
    timers.current.forEach(window.clearTimeout);
    engine.current?.reset();
    canvas.current?.getContext('2d')?.clearRect(0, 0, canvas.current.width, canvas.current.height);
    setPhase('idle');
  };

  const lit = phase !== 'idle';

  return (
    <section id="sky" ref={section} className="finale" data-phase={phase} data-reduced={reduced}>
      <div className="finale__photo" aria-hidden="true">
        <Photo name="stars" className="cover" />
      </div>
      <div className="finale__burst" aria-hidden="true">
        <Photo name="fireworks" className="cover" />
      </div>
      <NightSky still={reduced} />
      <div className="finale__moon" aria-hidden="true">
        <Photo name="moon" className="contain" sizes="30vw" />
      </div>
      <canvas ref={canvas} className="fill-canvas finale__fireworks" aria-hidden="true" />

      <div className="finale__stage">
        <div className="finale__invite">
          <span className="chapter-mark__n">Chapter 08</span>
          <h2>
            <span className="name-swap name-swap--old" aria-hidden={lit}>{finale.oldName}</span>
            <span className="name-swap name-swap--new" aria-hidden={!lit}>{finale.newName}</span>{' '}
            {finale.title}
          </h2>
          <button type="button" className="finale__lantern" onClick={light} disabled={lit} aria-label={finale.lanternLabel}>
            <span className="finale__spread" aria-hidden="true" />
            <Kandil lit={lit} />
          </button>
          <p className="finale__hint">{finale.hint}</p>
        </div>

        <div className="finale__message" aria-live="polite">
          <div className="finale__name" ref={slot}>
            <span>{finale.particleName.join(' ')}</span>
          </div>
          <div className="finale__words">
            <h3>{finale.greeting}</h3>
            {finale.message.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="finale__closing">{finale.closing}</p>
            <p className="finale__signature">{finale.signature}</p>
            <p className="finale__love">{finale.lastWords}</p>
            <button type="button" className="finale__replay" onClick={replay} tabIndex={phase === 'message' ? 0 : -1}>
              {finale.replay}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Credits() {
  const seen = new Set<string>();
  const list = Object.values(images).filter((image) => !seen.has(image.source) && seen.add(image.source));
  return (
    <footer className="credits">
      <details>
        <summary>{ui.credits}</summary>
        <p>{ui.creditsNote}</p>
        <ul>
          {list.map((image) => (
            <li key={image.source}>
              <a href={image.source} target="_blank" rel="noreferrer noopener">
                {image.title}
              </a>{' '}
              by {image.author}, {image.licence}. Resized and colour graded.
            </li>
          ))}
        </ul>
      </details>
    </footer>
  );
}
