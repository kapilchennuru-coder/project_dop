import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { journey, years } from '../data/storyContent';
import { Beat, FloatingParticles, Kandil, SceneStack } from './shared';

const FIRST_YEAR = 2017;
const LAST_YEAR = 2026;
const YEAR_RANGE = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, index) => FIRST_YEAR + index);

const ROUTE = 'M88 62C130 70 170 76 202 86S290 125 305 149 265 210 245 250 236 310 239 356 262 450 267 492';
const COAST = 'M570 30 470 105 410 170 360 185 340 225 290 215 262 255 256 310 258 356 280 430 276 492 262 560';

// Chapter 06
export function CityJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const lightRef = useRef<SVGGElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const travel = useTransform(scrollYProgress, [0.06, 0.9], [0, 1], { clamp: true });
  const [arrived, setArrived] = useState(false);

  useMotionValueEvent(travel, 'change', (value) => {
    const route = routeRef.current;
    if (route && lightRef.current) {
      const point = route.getPointAtLength(route.getTotalLength() * value);
      lightRef.current.setAttribute('transform', `translate(${point.x} ${point.y})`);
    }
    setArrived(value > 0.98);
  });

  return (
    <section id="journey" className="chapter chapter--journey">
      <div className="scrolly" ref={ref} style={{ height: '460svh' }}>
        <div className="scrolly__stage">
          <SceneStack names={['hyderabad', 'road', 'rail', 'chennai']} progress={scrollYProgress} />
          <div className="scene-shade scene-shade--night" aria-hidden="true" />
          <FloatingParticles count={46} colour="#F4C879" drift={-10} size={[0.7, 2.2]} opacity={0.7} />

          <div className="journey__head">
            <span className="chapter-mark__n">Chapter 06</span>
            <h2 className="journey__title">
              {journey.from} <span aria-hidden="true">→</span>
              <span className="sr-only"> to </span> {journey.to}
            </h2>
          </div>

          <svg className="route-map" viewBox="30 10 460 520" role="img" aria-label="An illustrated route from Hyderabad to Chennai">
            <defs>
              <filter id="route-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <radialGradient id="route-light">
                <stop offset="0" stopColor="#FFF3CF" />
                <stop offset="0.35" stopColor="#F4C879" stopOpacity="0.8" />
                <stop offset="1" stopColor="#F4C879" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d={COAST} fill="none" stroke="#8DDAC0" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="1 5" strokeLinecap="round" />
            <path d={ROUTE} fill="none" stroke="#F9F0DF" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="3 7" />
            <motion.path d={ROUTE} fill="none" stroke="#F4C879" strokeWidth="9" strokeOpacity="0.45" filter="url(#route-glow)" style={{ pathLength: travel }} />
            <motion.path ref={routeRef} d={ROUTE} fill="none" stroke="#FFE8B3" strokeWidth="2.6" strokeLinecap="round" style={{ pathLength: travel }} />
            <g>
              <circle cx="88" cy="62" r="6" fill="#F4C879" />
              <text x="104" y="52" className="route-map__city">Hyderabad</text>
            </g>
            <g className={arrived ? 'route-map__arrived' : ''}>
              <circle cx="267" cy="492" r="6" fill={arrived ? '#FFE8B3' : '#F9F0DF'} />
              <text x="248" y="497" textAnchor="end" className="route-map__city">Chennai</text>
            </g>
            <g ref={lightRef} transform="translate(88 62)">
              <circle r="24" fill="url(#route-light)" />
              <circle r="3.6" fill="#FFF3CF" />
            </g>
          </svg>

          <div className="beats beats--low">
            {journey.beats.map((beat, index) => (
              <Beat key={beat} index={index} count={journey.beats.length} progress={scrollYProgress}>
                <p className="beat__text beat__text--soft">{beat}</p>
              </Beat>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Chapter 07
export function TimelineChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const names = [...years.items.map((item) => item.image), 'stars', 'stars'];
  const count = years.items.length + 2;

  return (
    <section id="years" className="chapter chapter--years">
      <div className="scrolly" ref={ref} style={{ height: `${count * 62}svh` }}>
        <div className="scrolly__stage">
          <SceneStack names={names} progress={scrollYProgress} />
          <div className="scene-shade scene-shade--night" aria-hidden="true" />
          <div className="scene-head">
            <span className="chapter-mark__n">Chapter 07</span>
            <h2>{years.title}</h2>
          </div>
          <div className="years__lantern" aria-hidden="true">
            <Kandil lit />
          </div>
          <div className="years__years" aria-hidden="true">
            {YEAR_RANGE.map((year) => (
              <span key={year}>{year}</span>
            ))}
          </div>
          <div className="beats beats--years">
            {years.items.map((item, index) => (
              <Beat key={item.year} index={index} count={count} progress={scrollYProgress}>
                <p className="years__number">{item.year}</p>
                <p className="years__line">{item.line}</p>
              </Beat>
            ))}
            <Beat index={count - 2} count={count} progress={scrollYProgress}>
              <div className="years__passage">
                {years.passage.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </Beat>
            <Beat index={count - 1} count={count} progress={scrollYProgress}>
              <p className="years__eighty">{years.eighty}</p>
            </Beat>
          </div>
        </div>
      </div>
    </section>
  );
}
