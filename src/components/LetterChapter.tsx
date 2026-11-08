import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { letters, type LetterContent } from '../data/storyContent';
import { chime } from '../lib/ambient';
import { ChapterMark, FloatingParticles, Photo, Reveal } from './shared';

const OPEN_TIME = 1250;

function LetterDialog({ letter, onClose }: { letter: LetterContent; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (element && !element.open) element.showModal();
  }, []);

  let order = 0;
  const lineDelay = () => `${0.9 + order++ * 0.16}s`;

  return (
    <dialog ref={dialog} className="letter-dialog" onClose={onClose} aria-label={letter.envelope}>
      <div className="letter-sheet">
        <div className="letter-sheet__fold letter-sheet__fold--top" aria-hidden="true" />
        <div className="letter-sheet__body">
          <button type="button" className="letter-close" onClick={onClose}>
            <X size={16} />
            {letters.close}
          </button>
          <p className="ink" style={{ animationDelay: lineDelay() }}>{letter.salutation}</p>
          {letter.paragraphs.map((paragraph) => (
            <p className="ink" key={paragraph} style={{ animationDelay: lineDelay() }}>
              {paragraph}
            </p>
          ))}
          <div className="letter-sheet__signoff">
            {letter.signoff.map((line) => (
              <p className="ink" key={line} style={{ animationDelay: lineDelay() }}>
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className="letter-sheet__fold letter-sheet__fold--bottom" aria-hidden="true" />
      </div>
    </dialog>
  );
}

function Envelope({ letter, index, opening, onOpen }: { letter: LetterContent; index: number; opening: boolean; onOpen: () => void }) {
  return (
    <button type="button" className="envelope" data-open={opening} onClick={onOpen} aria-label={`${letters.open}: ${letter.envelope}`}>
      <span className="envelope__body">
        <span className="envelope__paper" aria-hidden="true" />
        <span className="envelope__front" aria-hidden="true" />
        <span className="envelope__flap" aria-hidden="true" />
        <span className="envelope__seal" aria-hidden="true">{index + 1}</span>
      </span>
      <span className="envelope__label">{letter.envelope}</span>
    </button>
  );
}

// Chapter 06
export function LetterChapter() {
  const reduced = useReducedMotion();
  const [opening, setOpening] = useState<string | null>(null);
  const [reading, setReading] = useState<LetterContent | null>(null);
  const timer = useRef(0);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const open = (letter: LetterContent, target: HTMLElement) => {
    if (opening) return;
    returnFocus.current = target;
    setOpening(letter.id);
    chime();
    timer.current = window.setTimeout(() => setReading(letter), reduced ? 0 : OPEN_TIME);
  };

  const close = () => {
    setReading(null);
    setOpening(null);
    returnFocus.current?.focus({ preventScroll: true });
  };

  return (
    <section id="letters" className="chapter chapter--letters">
      <div className="letters__desk" aria-hidden="true">
        <Photo name="lamp" className="cover" />
      </div>
      <div className="letters__lamp" aria-hidden="true" />
      <FloatingParticles count={26} colour="#EAD3A5" drift={7} size={[1, 2.8]} opacity={0.42} />

      <div className="narrow narrow--center letters__intro">
        <ChapterMark n="05" title={letters.title} />
        <Reveal>
          <p className="lede">{letters.intro}</p>
        </Reveal>
      </div>

      <div className="letters__objects" aria-hidden="true">
        <Reveal className="letters__print letters__print--left">
          <Photo name="letters" className="cover" sizes="40vw" />
        </Reveal>
        <Reveal className="letters__print letters__print--right" delay={0.12}>
          <Photo name="pen" className="cover" sizes="40vw" />
        </Reveal>
      </div>

      <div className="envelopes">
        {letters.items.map((letter, index) => (
          <Reveal key={letter.id} delay={index * 0.12}>
            <Envelope
              letter={letter}
              index={index}
              opening={opening === letter.id}
              onOpen={() => open(letter, document.activeElement as HTMLElement)}
            />
          </Reveal>
        ))}
      </div>
      <p className="letters__hint">{letters.hint}</p>

      {reading && <LetterDialog letter={reading} onClose={close} />}
    </section>
  );
}
