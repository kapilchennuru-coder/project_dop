import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { classroom, hero } from '../data/storyContent';
import { AnimatedSchool } from './AnimatedSchool';
import { Beat, FloatingParticles, Photo, Reveal, SceneStack } from './shared';

// Chapter 01
export function HeroSection() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(reduced ? 4 : 0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '14%']);

  useEffect(() => {
    if (reduced) {
      setStep(4);
      return;
    }
    const timers = [
      window.setTimeout(() => setStep(1), 2200),
      window.setTimeout(() => setStep(2), 5200),
      window.setTimeout(() => setStep(3), 9400),
      window.setTimeout(() => setStep(4), 11200),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);

  const begin = (event: MouseEvent) => {
    event.stopPropagation();
    document.getElementById('classroom')?.scrollIntoView();
  };

  return (
    <section id="begin" ref={ref} className="hero" onClick={() => setStep(4)}>
      <motion.div className="hero__image" style={{ y }}>
        <Photo name="classroom" className="cover" eager />
      </motion.div>
      <div className="hero__light" aria-hidden="true" />
      <FloatingParticles count={70} colour="#FFE8B3" drift={-5} size={[0.5, 2]} opacity={0.6} />

      <div className="hero__content">
        <div className="hero__prelude" data-gone={step >= 2}>
          <p className="hero__line" data-show={step >= 0}>{hero.lineOne}</p>
          <p className="hero__line hero__line--year" data-show={step >= 1}>{hero.lineTwo}</p>
        </div>
        <div className="hero__main" data-show={step >= 2}>
          <p className="hero__meeting">{hero.lineThree}</p>
          <div className="hero__title" data-show={step >= 3}>
            <h1>{hero.name}</h1>
            <p className="hero__years">{hero.years}</p>
            <p className="hero__byline">{hero.byline}</p>
          </div>
          <button type="button" className="begin-button" data-show={step >= 4} tabIndex={step >= 4 ? 0 : -1} onClick={begin}>
            {hero.cta}
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
      {step < 4 && <p className="hero__skip">{hero.skipHint}</p>}
    </section>
  );
}

// Interactive notebook used in Chapter 02
function Notebook() {
  const [page, setPage] = useState(0);
  const dragStart = useRef<number | null>(null);
  const last = classroom.pages.length - 1;

  const turn = (direction: number) => setPage((value) => Math.min(last, Math.max(0, value + direction)));

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') turn(1);
    if (event.key === 'ArrowLeft') turn(-1);
  };

  const onPointerUp = (event: PointerEvent) => {
    if (dragStart.current === null) return;
    const distance = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(distance) > 36) turn(distance < 0 ? 1 : -1);
  };

  return (
    <div className="notebook-wrap" onKeyDown={onKey}>
      <div
        className="notebook"
        onPointerDown={(event) => (dragStart.current = event.clientX)}
        onPointerUp={onPointerUp}
        role="group"
        aria-roledescription="notebook"
        aria-label={classroom.notebookLabel}
      >
        <div className="notebook__spine" aria-hidden="true" />
        <div className="notebook__leaf notebook__leaf--back" aria-hidden="true" />
        {classroom.pages.map((item, index) => (
          <article
            key={item.heading}
            className="notebook__leaf"
            data-turned={index < page}
            style={{ zIndex: classroom.pages.length - index }}
            aria-hidden={index !== page}
          >
            <header>
              <span>{classroom.notebookLabel}</span>
              <span>{item.heading}</span>
            </header>
            <div className="notebook__writing">
              {item.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <footer>{classroom.notebookName}</footer>
          </article>
        ))}
      </div>
      <div className="notebook__controls">
        <button type="button" className="icon-button icon-button--ink" onClick={() => turn(-1)} disabled={page === 0} aria-label="Previous page">
          <ChevronLeft size={20} />
        </button>
        <span aria-live="polite">
          {page + 1} / {classroom.pages.length}
        </span>
        <button type="button" className="icon-button icon-button--ink" onClick={() => turn(1)} disabled={page === last} aria-label="Next page">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// Chapter 02
export function SchoolChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const count = classroom.scenes.length;

  return (
    <section id="classroom" className="chapter chapter--school">
      <div className="scrolly" ref={ref} style={{ height: `${count * 75}svh` }}>
        <div className="scrolly__stage">
          <SceneStack names={classroom.scenes.map((scene) => scene.image)} progress={scrollYProgress} />
          <div className="scene-shade" aria-hidden="true" />
          <FloatingParticles count={40} colour="#FFE8B3" drift={-4} size={[0.5, 1.8]} opacity={0.5} />
          <div className="scene-head">
            <span className="chapter-mark__n">Chapter 02</span>
            <h2>{classroom.title}</h2>
          </div>
          <div className="beats beats--low">
            {classroom.scenes.map((scene, index) => (
              <Beat key={scene.image} index={index} count={count} progress={scrollYProgress} className="scene-caption">
                <p>{scene.caption}</p>
              </Beat>
            ))}
          </div>
        </div>
      </div>

      <div className="paper-section">
        <AnimatedSchool />
        <div className="paper-section__inner">
          <div className="ruled">
            {classroom.narrative.map((line, index) => (
              <Reveal key={line} delay={index * 0.1}>
                <p>{line}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Notebook />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
