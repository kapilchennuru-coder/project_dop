// A small particle engine for the Diwali finale. Particles live in one array that
// is capped, so the phone version stays smooth however many bursts overlap.

export const FIREWORK_COLOURS = ['#F4C879', '#FFE8B3', '#ED5C9B', '#ED91B1', '#5FDDAF', '#8DDAC0'];

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  colour: string;
}

interface Shell {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  colour: string;
}

interface Glyph {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  delay: number;
  phase: number;
  size: number;
}

export class FireworksEngine {
  private sparks: Spark[] = [];
  private shells: Shell[] = [];
  private glyphs: Glyph[] = [];
  private launchTimer = 0;
  private glyphClock = 0;
  private readonly maxSparks: number;
  /** Seconds between launches. Zero means no new shells. */
  interval = 0;

  constructor(small: boolean) {
    this.maxSparks = small ? 900 : 2600;
  }

  launch(width: number, height: number, colour?: string) {
    this.shells.push({
      x: width * (0.15 + Math.random() * 0.7),
      y: height + 10,
      vy: -(height * 0.75 + Math.random() * height * 0.25),
      targetY: height * (0.12 + Math.random() * 0.35),
      colour: colour ?? FIREWORK_COLOURS[Math.floor(Math.random() * FIREWORK_COLOURS.length)],
    });
  }

  private burst(x: number, y: number, colour: string) {
    const count = Math.min(90, Math.max(0, this.maxSparks - this.sparks.length));
    const speed = 90 + Math.random() * 90;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.08;
      const force = speed * (0.55 + Math.random() * 0.5);
      const maxLife = 1.1 + Math.random() * 0.9;
      this.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * force,
        vy: Math.sin(angle) * force,
        life: maxLife,
        maxLife,
        size: 1 + Math.random() * 1.4,
        colour: Math.random() > 0.82 ? '#FFE8B3' : colour,
      });
    }
  }

  /** Samples text drawn off screen, then sends golden particles to those positions. */
  formText(lines: string[], box: { x: number; y: number; width: number; height: number }, small: boolean) {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(box.width));
    canvas.height = Math.max(1, Math.round(box.height));
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const lineHeight = canvas.height / lines.length;
    const longest = lines.reduce((a, b) => (a.length > b.length ? a : b));
    let fontSize = Math.min(lineHeight * 0.92, 92);
    const font = (size: number) => `600 ${size}px "Cormorant Garamond", Georgia, serif`;
    ctx.font = font(fontSize);
    const measured = ctx.measureText(longest).width;
    if (measured > canvas.width * 0.96) fontSize *= (canvas.width * 0.96) / measured;

    ctx.font = font(fontSize);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    lines.forEach((line, index) => ctx.fillText(line, canvas.width / 2, lineHeight * (index + 0.5)));

    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const step = 2;
    const points: Array<[number, number]> = [];
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        if (data[(y * width + x) * 4 + 3] > 130) points.push([x, y]);
      }
    }

    const limit = small ? 2000 : 5000;
    const keepEvery = Math.max(1, points.length / limit);
    this.glyphs = [];
    this.glyphClock = 0;
    const originX = box.x + box.width / 2;
    const originY = box.y + box.height * 2.2;
    for (let i = 0; i < points.length; i += keepEvery) {
      const [px, py] = points[Math.floor(i)];
      this.glyphs.push({
        x: originX + (Math.random() - 0.5) * box.width * 1.3,
        y: originY + (Math.random() - 0.5) * box.height * 2,
        homeX: box.x + px,
        homeY: box.y + py,
        delay: Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        size: small ? 0.9 : 1.05,
      });
    }
  }

  reset() {
    this.sparks = [];
    this.shells = [];
    this.glyphs = [];
    this.interval = 0;
  }

  frame(ctx: CanvasRenderingContext2D, width: number, height: number, delta: number, time: number) {
    // Fade the previous frame rather than clearing it, which draws the trails.
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.24)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    if (this.interval > 0) {
      this.launchTimer -= delta;
      if (this.launchTimer <= 0) {
        this.launch(width, height);
        this.launchTimer = this.interval * (0.6 + Math.random() * 0.8);
      }
    }

    for (let i = this.shells.length - 1; i >= 0; i--) {
      const shell = this.shells[i];
      shell.y += shell.vy * delta;
      ctx.fillStyle = shell.colour;
      ctx.fillRect(shell.x - 1, shell.y, 2, 7);
      if (shell.y <= shell.targetY) {
        this.burst(shell.x, shell.y, shell.colour);
        this.shells.splice(i, 1);
      }
    }

    // Removal swaps with the last item, so the array never has to shift.
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const spark = this.sparks[i];
      spark.life -= delta;
      if (spark.life <= 0) {
        this.sparks[i] = this.sparks[this.sparks.length - 1];
        this.sparks.pop();
        continue;
      }
      spark.vx *= 1 - 1.5 * delta;
      spark.vy = spark.vy * (1 - 1.5 * delta) + 70 * delta;
      spark.x += spark.vx * delta;
      spark.y += spark.vy * delta;
      ctx.globalAlpha = Math.min(1, (spark.life / spark.maxLife) * 1.4);
      ctx.fillStyle = spark.colour;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.glyphs.length) {
      this.glyphClock += delta;
      ctx.fillStyle = '#FFE0A0';
      for (const glyph of this.glyphs) {
        if (this.glyphClock > glyph.delay) {
          const pull = 1 - Math.pow(0.02, delta);
          glyph.x += (glyph.homeX - glyph.x) * pull;
          glyph.y += (glyph.homeY - glyph.y) * pull;
        }
        ctx.globalAlpha = 0.72 + Math.sin(time * 2.4 + glyph.phase) * 0.28;
        ctx.fillRect(glyph.x, glyph.y, glyph.size * 1.5, glyph.size * 1.5);
      }
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }
}
