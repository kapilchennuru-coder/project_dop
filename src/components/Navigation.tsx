import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp, Menu, Music, VolumeX, X } from 'lucide-react';
import { chapters, ui } from '../data/storyContent';
import { startMusic, stopMusic } from '../lib/ambient';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [music, setMusic] = useState(false);
  const [current, setCurrent] = useState<string>(chapters[0].id);
  const [showTop, setShowTop] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const sections = chapters.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setCurrent(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      stopMusic();
    };
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  const toggleMusic = () => {
    if (music) stopMusic();
    else startMusic();
    setMusic(!music);
  };

  const goTo = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  };

  const active = chapters.find((chapter) => chapter.id === current) ?? chapters[0];

  return (
    <>
      <header className="nav">
        <motion.div className="nav__progress" style={{ scaleX: progress }} />
        <nav className="nav__bar" aria-label="Story">
          <p className="nav__current">
            <span>{active.n}</span> <span className="nav__current-title">{active.title}</span>
          </p>
          <div className="nav__actions">
            <button type="button" className="icon-button" onClick={toggleMusic} aria-pressed={music} aria-label={music ? ui.soundOff : ui.soundOn}>
              {music ? <Music size={18} /> : <VolumeX size={18} />}
            </button>
            <button type="button" className="icon-button" onClick={() => setOpen(true)} aria-label={ui.openMenu}>
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      <dialog ref={dialog} className="menu" onClose={() => setOpen(false)} aria-label={ui.menu}>
        <div className="menu__head">
          <p>{ui.menu}</p>
          <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label={ui.closeMenu}>
            <X size={20} />
          </button>
        </div>
        <ol className="menu__list">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <button type="button" onClick={() => goTo(chapter.id)} aria-current={chapter.id === current ? 'true' : undefined}>
                <span>{chapter.n}</span>
                {chapter.title}
              </button>
            </li>
          ))}
        </ol>
      </dialog>

      <button
        type="button"
        className={`to-top ${showTop ? 'to-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label={ui.top}
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
