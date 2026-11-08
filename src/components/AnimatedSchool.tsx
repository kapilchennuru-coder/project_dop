import { classroom } from '../data/storyContent';
import { Reveal } from './shared';

function SchoolYard() {
  return (
    <svg className="art" viewBox="0 0 600 400" role="img" aria-label="An animated drawing of a school in the morning, with its flag waving and bell swinging">
      <defs>
        <linearGradient id="art-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9FC9DC" />
          <stop offset="1" stopColor="#FBE3B4" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#art-sky)" />
      <circle className="art-sun" cx="500" cy="120" r="40" fill="#F9C25E" />
      <g className="art-cloud art-cloud--a" fill="#FFF8EA">
        <ellipse cx="90" cy="70" rx="46" ry="16" /><ellipse cx="116" cy="58" rx="28" ry="16" />
      </g>
      <g className="art-cloud art-cloud--b" fill="#FFF8EA" opacity="0.8">
        <ellipse cx="320" cy="46" rx="38" ry="12" /><ellipse cx="340" cy="38" rx="20" ry="12" />
      </g>
      <g className="art-birds" fill="none" stroke="#4A4A5A" strokeWidth="2" strokeLinecap="round">
        <path d="M0 100q8-9 15 0q8-9 15 0" /><path d="M46 82q6-7 12 0q6-7 12 0" />
      </g>
      <path d="M0 250q150-46 300-14t300-16v180H0z" fill="#9DB57C" />
      <rect y="316" width="600" height="84" fill="#C9A673" />

      <g className="art-tree">
        <rect x="42" y="232" width="12" height="86" fill="#6B4A2A" />
        <circle cx="48" cy="212" r="40" fill="#5E8A50" /><circle cx="24" cy="234" r="26" fill="#6E9C5C" /><circle cx="74" cy="234" r="26" fill="#6E9C5C" />
      </g>

      <rect x="110" y="208" width="400" height="108" fill="#EFCF7E" />
      <rect x="110" y="298" width="400" height="18" fill="#A9402F" />
      <path d="M92 210 130 160h360l38 50z" fill="#B5553A" />
      <g stroke="#8E3D28" strokeWidth="2">
        <path d="M120 174h380M108 192h404" />
      </g>
      <g fill="#FFF3CF" stroke="#7B5A2E" strokeWidth="3">
        {[132, 188, 372, 428, 484].map((x) => (
          <path key={x} d={`M${x} 282v-40a14 14 0 0 1 28 0v40z`} className={`art-window art-window--${x % 3}`} />
        ))}
      </g>

      <path d="M252 214 310 132l58 82z" fill="#D67A52" stroke="#8E3D28" strokeWidth="3" />
      <rect x="258" y="212" width="104" height="104" fill="#F5DD9C" />
      <rect x="288" y="256" width="44" height="60" fill="#7B4A28" />
      <rect x="272" y="222" width="76" height="22" rx="3" fill="#FFF8EA" stroke="#7B5A2E" />
      <text x="310" y="238" textAnchor="middle" className="art-chalk-label" fill="#7B4A28">SCHOOL</text>
      <g className="art-bell">
        <path d="M310 158v8" stroke="#6B4A2A" strokeWidth="3" />
        <path d="M299 188c0-16 4-23 11-23s11 7 11 23z" fill="#E0A83A" stroke="#8A6420" strokeWidth="2" />
        <circle cx="310" cy="191" r="3.4" fill="#8A6420" />
      </g>

      <rect x="540" y="176" width="5" height="142" fill="#7B7B86" />
      <g className="art-flag">
        <rect x="545" y="178" width="46" height="10" fill="#F39C3D" />
        <rect x="545" y="188" width="46" height="10" fill="#FFFFFF" />
        <rect x="545" y="198" width="46" height="10" fill="#3F8F4F" />
        <circle cx="568" cy="193" r="3.8" fill="none" stroke="#27408B" strokeWidth="1.2" />
      </g>
      <g className="art-plane">
        <path d="M0 0 34 12 8 16 4 30z" fill="#FFFDF5" stroke="#6B6B7A" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

function ClassBoard() {
  return (
    <svg className="art" viewBox="0 0 600 400" role="img" aria-label="An animated drawing of a classroom, with 2017 being written on the blackboard while the fan turns">
      <rect width="600" height="400" fill="#E8D5A8" />
      <rect y="316" width="600" height="84" fill="#A98660" />

      <g transform="translate(300 24) scale(1 0.24)">
        <g className="art-fan" fill="#6F6A62">
          <ellipse cx="-58" cy="0" rx="56" ry="13" /><ellipse cx="58" cy="0" rx="56" ry="13" /><ellipse cx="0" cy="-58" rx="13" ry="56" /><ellipse cx="0" cy="58" rx="13" ry="56" />
        </g>
      </g>
      <rect x="297" y="0" width="6" height="24" fill="#6F6A62" />

      <rect x="118" y="66" width="364" height="184" rx="4" fill="#2F5A47" stroke="#7B4A28" strokeWidth="9" />
      <g fill="none" stroke="#F8F3E2" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" transform="translate(196 118)">
        <path className="art-draw art-draw--1" pathLength="1" d="M0 16C5-8 46-8 46 16 46 38 8 54 0 78H52" />
        <path className="art-draw art-draw--2" pathLength="1" d="M92 2C66 2 62 76 92 76S120 2 92 2Z" />
        <path className="art-draw art-draw--3" pathLength="1" d="M144 16 162 0V78" />
        <path className="art-draw art-draw--4" pathLength="1" d="M198 2H252L218 78" />
      </g>
      <rect x="400" y="246" width="44" height="7" rx="2" fill="#8E5A30" />
      <rect className="art-chalk" x="408" y="240" width="20" height="6" rx="2" fill="#FFFDF5" />

      <g>
        <rect x="24" y="74" width="66" height="112" fill="#BFE0EA" stroke="#7B5A2E" strokeWidth="5" />
        <path d="M57 74v112M24 130h66" stroke="#7B5A2E" strokeWidth="3" />
        <path className="art-beam" d="M24 186h66l112 130H90z" fill="#FFE8B3" />
      </g>

      <g transform="translate(535 110)">
        <circle r="30" fill="#FFF8EA" stroke="#7B4A28" strokeWidth="5" />
        <path className="art-hand art-hand--slow" d="M0 0V-16" stroke="#333" strokeWidth="3.4" strokeLinecap="round" />
        <path className="art-hand art-hand--fast" d="M0 0V-24" stroke="#A9402F" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g fill="#7B4A28">
        {[60, 240, 420].map((x) => (
          <g key={x}>
            <rect x={x} y="286" width="130" height="14" rx="2" fill="#94603A" />
            <rect x={x + 8} y="300" width="9" height="46" /><rect x={x + 113} y="300" width="9" height="46" />
            <rect x={x - 10} y="338" width="150" height="10" rx="2" fill="#94603A" />
            <rect x={x + 2} y="348" width="9" height="34" /><rect x={x + 119} y="348" width="9" height="34" />
          </g>
        ))}
      </g>
      <g className="art-notebook">
        <rect x="282" y="274" width="44" height="12" rx="1" fill="#C94F4F" /><rect x="286" y="270" width="36" height="5" fill="#FFFDF5" />
      </g>
    </svg>
  );
}

function Dust({ points }: { points: Array<[number, number]> }) {
  return (
    <g fill="#FFF8DC">
      {points.map(([x, y], index) => (
        <circle key={`${x}-${y}`} className={`art-dust art-dust--${index % 3}`} cx={x} cy={y} r={index % 2 ? 2 : 1.4} />
      ))}
    </g>
  );
}

function DeskRoom() {
  return (
    <svg className="art" viewBox="0 0 600 400" role="img" aria-label="An animated drawing of an empty classroom with desks and chairs, a tube light flickering and a wall fan turning">
      <rect width="600" height="400" fill="#BDBBAF" />
      <path d="M0 0H600V92L360 112 0 66Z" fill="#E9E6DA" />
      <path d="M0 66 300 104V258L0 262Z" fill="#EFEBC6" />
      <rect x="300" y="100" width="64" height="162" fill="#A8A5D6" />
      <rect x="364" y="108" width="92" height="150" fill="#E9E3B8" />
      <rect x="456" y="104" width="144" height="156" fill="#9B98CC" />

      <g className="art-tube">
        <path d="M34 0 196 44" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
        <path d="M0 0H250L176 76Z" fill="#FFFFFF" opacity="0.28" />
      </g>

      <rect x="26" y="136" width="62" height="78" fill="#F7F7F2" stroke="#C9C7BB" />
      <g fill="#55617F">
        <rect x="52" y="146" width="4" height="26" /><rect x="40" y="178" width="36" height="3" /><rect x="36" y="186" width="44" height="3" /><rect x="42" y="196" width="32" height="3" />
      </g>

      <g transform="translate(332 150)">
        <rect x="-5" y="-4" width="10" height="42" rx="3" fill="#E7E7E2" stroke="#A7A7A0" />
        <g className="art-wallfan">
          <circle r="29" fill="#F2F2EC" fillOpacity="0.55" stroke="#B5B5AD" strokeWidth="2" />
          <g className="art-blades" fill="#D8D8D0">
            <ellipse cx="0" cy="-15" rx="7" ry="13" /><ellipse cx="13" cy="8" rx="13" ry="7" transform="rotate(30 13 8)" /><ellipse cx="-13" cy="8" rx="13" ry="7" transform="rotate(-30 -13 8)" />
          </g>
          <circle r="5" fill="#A7A7A0" />
        </g>
      </g>

      <g>
        <rect x="412" y="206" width="188" height="10" fill="#2A49A8" />
        <rect x="420" y="216" width="170" height="42" fill="#EBE5D3" />
        <rect x="372" y="188" width="150" height="9" fill="#5A4A3C" />
        <path d="M430 188c2-18 40-18 44 0z" fill="#252A3D" />
      </g>

      <rect y="258" width="600" height="142" fill="#A9A79C" />
      <rect x="62" y="220" width="538" height="9" fill="#9A6A3D" />
      <rect x="66" y="229" width="534" height="84" fill="#EFE8D5" />
      <rect x="360" y="256" width="86" height="56" fill="#AFC3E2" />
      <g fill="#EFE8D5"><rect x="376" y="266" width="13" height="10" /><rect x="376" y="286" width="13" height="10" /></g>
      <path d="M196 220c3-26 72-26 76 0z" fill="#252A3D" />
      <path d="M390 220c3-26 72-26 76 0z" fill="#252A3D" />

      <path d="M48 300c2-46 112-46 116 0z" fill="#26304F" />
      <path d="M186 304c2-50 122-50 126 0z" fill="#26304F" />
      <path d="M322 304c2-50 122-50 126 0z" fill="#232B47" />
      <rect x="0" y="298" width="442" height="20" fill="#A66E3C" />
      <rect x="0" y="318" width="430" height="82" fill="#F0E9D6" />
      <rect x="0" y="384" width="430" height="16" fill="#6B4528" />
      <rect x="430" y="318" width="16" height="82" fill="#D5CDB8" />
      <Dust points={[[120, 120], [210, 150], [270, 90], [400, 130], [510, 90], [560, 170]]} />
    </svg>
  );
}

function WideRoom() {
  return (
    <svg className="art" viewBox="0 0 600 400" role="img" aria-label="An animated drawing of a wide empty classroom with blue-topped benches, a lavender wall and a plastic chair in front">
      <rect width="600" height="166" fill="#C4C1B7" />
      <g fill="#8D8B81"><circle cx="330" cy="62" r="3" /><path d="M404 134l30-7" stroke="#8D8B81" strokeWidth="2" /><path d="M130 142l32 4" stroke="#8D8B81" strokeWidth="2" /></g>
      <rect className="art-sweep" x="-160" y="0" width="150" height="250" fill="#FFF7DF" opacity="0.2" />
      <rect y="166" width="600" height="102" fill="#9A97C4" />
      <rect x="314" y="166" width="42" height="102" fill="#ABA8D0" />
      <rect x="0" y="162" width="60" height="106" fill="#E9E3B8" />

      <rect y="262" width="600" height="138" fill="#8F8E86" />
      <path d="M330 262H600V400H300Z" fill="#B3B1A6" />
      <path d="M430 262 400 400M520 262l10 138M340 318h260" stroke="#9C9A90" strokeWidth="2" />

      <g>
        <rect x="150" y="216" width="150" height="14" fill="#5B4A3B" />
        <rect x="24" y="226" width="110" height="10" fill="#2342B6" />
        <rect x="170" y="240" width="130" height="9" fill="#2342B6" />
        <rect x="312" y="218" width="134" height="11" fill="#2342B6" />
        <rect x="322" y="229" width="116" height="30" fill="#D9D5C2" />
        <rect x="326" y="259" width="6" height="42" fill="#CFCBB9" /><rect x="430" y="259" width="6" height="42" fill="#CFCBB9" />
        <rect x="330" y="282" width="112" height="6" fill="#26304F" />
        <rect x="142" y="266" width="150" height="9" fill="#E5E0CD" />
        <rect x="150" y="275" width="134" height="30" fill="#D9D5C2" />
        <rect x="154" y="305" width="6" height="40" fill="#CFCBB9" /><rect x="274" y="305" width="6" height="40" fill="#CFCBB9" />
        <rect x="510" y="212" width="90" height="10" fill="#54535C" />
        <rect x="518" y="222" width="82" height="34" fill="#D9D5C2" />
        <path d="M522 264h52v46h-52z" fill="none" stroke="#1E2233" strokeWidth="5" />
        <path d="M522 310v42M574 310v42" stroke="#1E2233" strokeWidth="4" />
      </g>

      <rect x="0" y="282" width="196" height="12" fill="#E8E2CE" />
      <rect x="0" y="294" width="190" height="82" fill="#EFE8D5" />
      <rect x="50" y="318" width="86" height="58" fill="#AFC3E2" />
      <g fill="#EFE8D5"><rect x="66" y="326" width="12" height="9" /><rect x="66" y="344" width="12" height="9" /></g>
      <path d="M0 296c30-22 66-14 70 12H0z" fill="#26304F" />
      <rect x="0" y="330" width="42" height="10" fill="#A66E3C" />
      <rect x="0" y="340" width="34" height="60" fill="#F0E9D6" />

      <g className="art-rock">
        <path d="M258 400V344c0-46 18-66 74-66s74 20 74 66v56h-22v-40h-104v40z" fill="#EBDDB6" stroke="#B9A77C" strokeWidth="3" />
        <path d="M286 300h92v46h-92z" fill="#DCCB9E" />
        <path d="M296 300v46M312 300v46M328 300v46M344 300v46M360 300v46M286 316h92M286 332h92" stroke="#C5B283" strokeWidth="1.5" />
      </g>
      <g className="art-plane art-plane--room">
        <path d="M0 0 34 12 8 16 4 30z" fill="#FFFDF5" stroke="#6B6B7A" strokeWidth="1.4" />
      </g>
      <Dust points={[[90, 110], [180, 70], [260, 140], [380, 90], [470, 130], [560, 60]]} />
    </svg>
  );
}

export function AnimatedSchool() {
  return (
    <div className="school-art">
      <Reveal>
        <figure>
          <SchoolYard />
          <figcaption>{classroom.drawings[0]}</figcaption>
        </figure>
      </Reveal>
      <Reveal delay={0.12}>
        <figure>
          <ClassBoard />
          <figcaption>{classroom.drawings[1]}</figcaption>
        </figure>
      </Reveal>
      <Reveal>
        <figure>
          <DeskRoom />
          <figcaption>{classroom.drawings[2]}</figcaption>
        </figure>
      </Reveal>
      <Reveal delay={0.12}>
        <figure>
          <WideRoom />
          <figcaption>{classroom.drawings[3]}</figcaption>
        </figure>
      </Reveal>
    </div>
  );
}
