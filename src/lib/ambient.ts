// Original instrumental music, synthesised live with the Web Audio API, so there
// is no audio file to license or download. A soft drone with slow, sparse notes
// from a pentatonic scale. It only ever starts from a user's tap.

const SCALE = [220, 246.94, 277.18, 329.63, 369.99, 440, 493.88, 554.37];

let context: AudioContext | null = null;
let master: GainNode | null = null;
let noteTimer = 0;
let drones: OscillatorNode[] = [];
let playing = false;

function ensureContext() {
  if (!context) {
    context = new AudioContext();
    master = context.createGain();
    master.gain.value = 0;
    master.connect(context.destination);
  }
  return { ctx: context, out: master as GainNode };
}

function pluck(frequency: number, level: number, length: number) {
  if (!context || !master) return;
  const now = context.currentTime;
  const osc = context.createOscillator();
  const overtone = context.createOscillator();
  const gain = context.createGain();
  osc.type = 'sine';
  overtone.type = 'triangle';
  osc.frequency.value = frequency;
  overtone.frequency.value = frequency * 2;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(level, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + length);
  const quiet = context.createGain();
  quiet.gain.value = 0.18;
  osc.connect(gain);
  overtone.connect(quiet).connect(gain);
  gain.connect(master);
  osc.start(now);
  overtone.start(now);
  osc.stop(now + length + 0.1);
  overtone.stop(now + length + 0.1);
}

function scheduleNotes() {
  if (!playing) return;
  const note = SCALE[Math.floor(Math.random() * SCALE.length)];
  pluck(note, 0.09, 4.5);
  if (Math.random() > 0.65) window.setTimeout(() => playing && pluck(note * 1.5, 0.05, 3.5), 700);
  noteTimer = window.setTimeout(scheduleNotes, 2200 + Math.random() * 2800);
}

export function startMusic() {
  const { ctx, out } = ensureContext();
  void ctx.resume();
  if (playing) return;
  playing = true;

  drones = [110, 164.81, 220].map((frequency, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    osc.detune.value = index * 3;
    gain.gain.value = 0.05;
    osc.connect(gain).connect(out);
    osc.start();
    return osc;
  });

  out.gain.cancelScheduledValues(ctx.currentTime);
  out.gain.linearRampToValueAtTime(0.75, ctx.currentTime + 2.5);
  scheduleNotes();
}

export function stopMusic() {
  if (!context || !master || !playing) return;
  playing = false;
  window.clearTimeout(noteTimer);
  const now = context.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(master.gain.value, now);
  master.gain.linearRampToValueAtTime(0, now + 0.8);
  const fading = drones;
  drones = [];
  fading.forEach((osc) => osc.stop(now + 0.9));
}

/** A very quiet chime for key moments. Silent unless the music is already on. */
export function chime() {
  if (!playing) return;
  pluck(659.25, 0.07, 2.4);
  window.setTimeout(() => playing && pluck(880, 0.05, 2.8), 180);
}
