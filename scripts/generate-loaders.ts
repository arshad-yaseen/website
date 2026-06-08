// Generates the SVG loader components in src/ui/dot-matrix/loaders.
// Run: bun scripts/generate-loaders.ts && bunx oxfmt src/ui/dot-matrix/loaders

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Coord = {
  i: number;
  col: number;
  row: number;
  dist: number;
  diag: number;
  angle: number;
  rand: number;
  cornerDist: number;
  pairOrder: number;
};

type Dot = {
  delay: number | number[];
  variant?: string;
  vars?: Record<string, number>;
};

type Spec = {
  id: string;
  name: string;
  desc: string;
  dur: number;
  easing: string;
  keyframes: Record<string, string>;
  composite?: boolean;
  offOpacity?: number;
  dot: (c: Coord) => Dot | null;
};

const OUT = join(dirname(fileURLToPath(import.meta.url)), "../src/ui/dot-matrix/loaders");
const POS = [6, 17, 28, 39, 50];
const SEED = 0x9e3779b1;

const pseudoRandom = (i: number): number => {
  let t = (i + SEED) >>> 0;
  t = Math.imul(t ^ (t >>> 16), 2246822507);
  t = Math.imul(t ^ (t >>> 13), 3266489909);
  t ^= t >>> 16;
  return (t >>> 0) / 0xffffffff;
};

const COORDS: Coord[] = Array.from({ length: 25 }, (_, i) => {
  const col = i % 5;
  const row = Math.floor(i / 5);
  const dx = col - 2;
  const dy = row - 2;
  return {
    i,
    col,
    row,
    dist: Math.max(Math.abs(dx), Math.abs(dy)),
    diag: col + row,
    angle: ((Math.atan2(dy, dx) + Math.PI * 2.5) % (Math.PI * 2)) / (Math.PI * 2),
    rand: pseudoRandom(i),
    cornerDist: Math.max(Math.min(col, 4 - col), Math.min(row, 4 - row)),
    pairOrder: Math.min(i, 24 - i),
  };
});

const CB1 = "cubic-bezier(0.45, 0.05, 0.55, 0.95)";
const CB_CLUSTER = "cubic-bezier(0.215, 0.61, 0.355, 1)";
const CB_DRIFT = "cubic-bezier(0.4, 0, 0.6, 1)";
const CB_GRAD = "cubic-bezier(0.55, 0.085, 0.68, 0.53)";
const CB_PLUS = "cubic-bezier(0.45, 0, 0.55, 1)";

const FLOWER = new Set([
  1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23,
]);
const HEART = new Set([1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 22]);
const PLUS = new Set([2, 7, 10, 11, 12, 13, 14, 17, 22]);
const SNOW = new Set([0, 2, 4, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18, 20, 22, 24]);
const STAR = new Set([2, 6, 7, 8, 10, 11, 13, 14, 16, 17, 18, 22]);

const SPECS: Spec[] = [
  {
    id: "attention",
    name: "Attention",
    desc: "Rows light top to bottom in a steady sweep.",
    dur: 1800,
    easing: "linear",
    keyframes: { "": "0%,100%{opacity:0.16}12%{opacity:1}30%{opacity:0.16}" },
    dot: (c) => ({ delay: c.row * 280 }),
  },
  {
    id: "auth-handshake",
    name: "Auth Handshake",
    desc: "Left and right halves flash and meet in the middle.",
    dur: 2000,
    easing: "linear",
    keyframes: {
      a: "0%,100%{opacity:0.16}14%{opacity:1}32%{opacity:0.16}",
      mid: "0%,100%{opacity:0.16}14%{opacity:1}32%{opacity:0.16}64%{opacity:1}82%{opacity:0.16}",
    },
    dot: (c) =>
      c.col === 2
        ? { variant: "mid", delay: 0 }
        : { variant: "a", delay: (c.col < 2 ? 0 : 1) * 1000 },
  },
  {
    id: "backprop",
    name: "Backprop",
    desc: "Pulses propagate forward then back across columns.",
    dur: 2800,
    easing: "linear",
    composite: true,
    keyframes: { "": "0%,100%{opacity:0}10%{opacity:0.84}22%{opacity:0}" },
    dot: (c) => ({ delay: [c.col * 240, 1400 + (4 - c.col) * 240] }),
  },
  {
    id: "beacon",
    name: "Beacon",
    desc: "A bright pulse rotates around the grid.",
    dur: 2400,
    easing: "linear",
    keyframes: { "": "0%,100%{opacity:0.04}6%{opacity:1}18%{opacity:0.04}" },
    dot: (c) => ({ delay: -c.angle * 2400 }),
  },
  {
    id: "bloom",
    name: "Bloom",
    desc: "Brightness blooms outward along the diagonal.",
    dur: 2600,
    easing: "ease-in-out",
    keyframes: { "": "0%,100%{opacity:0.08}35%{opacity:1}60%{opacity:0.08}" },
    dot: (c) => ({ delay: c.diag * 260 }),
  },
  {
    id: "cache-warm",
    name: "Cache Warm",
    desc: "Warmth spreads from the corners inward.",
    dur: 2600,
    easing: CB1,
    keyframes: {
      "": "0%,4%{opacity:0.16}16%{opacity:1}78%{opacity:1}88%{opacity:0.16}100%{opacity:0.16}",
    },
    dot: (c) => ({ delay: c.cornerDist * 280 }),
  },
  {
    id: "cluster-sync",
    name: "Cluster Sync",
    desc: "Quadrants sync in turn around an empty cross.",
    dur: 2400,
    easing: CB_CLUSTER,
    offOpacity: 0.05,
    keyframes: { "": "0%,100%{opacity:0.16}16%{opacity:1}36%{opacity:0.16}" },
    dot: (c) => {
      if (c.col === 2 || c.row === 2) return null;
      const quad = c.row < 2 ? (c.col < 2 ? 0 : 1) : c.col > 2 ? 2 : 3;
      return { delay: quad * 480 };
    },
  },
  {
    id: "compile",
    name: "Compile",
    desc: "Rows resolve from the bottom up.",
    dur: 2000,
    easing: "linear",
    keyframes: { "": "0%,100%{opacity:0.16}6%{opacity:1}16%{opacity:0.16}" },
    dot: (c) => ({ delay: (4 - c.row) * 200 }),
  },
  {
    id: "constellation",
    name: "Constellation",
    desc: "Stars twinkle on a deterministic loop.",
    dur: 3500,
    easing: "ease-in-out",
    keyframes: { "": "0%,100%{opacity:0.06}10%{opacity:1}20%{opacity:0.06}" },
    dot: (c) => ({ delay: -c.rand * 3500 }),
  },
  {
    id: "cron",
    name: "Cron",
    desc: "The outer ring ticks around like a clock.",
    dur: 2000,
    easing: "linear",
    offOpacity: 0.06,
    keyframes: { "": "0%,100%{opacity:0.16}8%{opacity:1}18%{opacity:0.16}" },
    dot: (c) =>
      c.col > 0 && c.col < 4 && c.row > 0 && c.row < 4 ? null : { delay: c.angle * 2000 },
  },
  {
    id: "deploy",
    name: "Deploy",
    desc: "Columns roll out left to right.",
    dur: 1600,
    easing: "linear",
    keyframes: { "": "0%,100%{opacity:0.16}10%{opacity:1}18%{opacity:1}22%{opacity:0.16}" },
    dot: (c) => ({ delay: c.col * 320 }),
  },
  {
    id: "diffusion",
    name: "Diffusion",
    desc: "Noise resolves into a steady signal.",
    dur: 3000,
    easing: CB1,
    keyframes: {
      1: "0%,100%{opacity:0.16}10%{opacity:0.45}22%{opacity:0.16}38%{opacity:0.7}50%{opacity:0.16}64%{opacity:0.5}78%{opacity:1}88%{opacity:1}93%{opacity:0.16}",
      2: "0%,100%{opacity:0.16}8%{opacity:0.6}20%{opacity:0.16}30%{opacity:0.35}44%{opacity:0.7}58%{opacity:0.16}70%{opacity:0.45}78%{opacity:1}88%{opacity:1}93%{opacity:0.16}",
      3: "0%,100%{opacity:0.16}14%{opacity:0.5}26%{opacity:0.16}40%{opacity:0.6}52%{opacity:0.3}66%{opacity:0.16}74%{opacity:0.85}78%{opacity:1}88%{opacity:1}93%{opacity:0.16}",
      4: "0%,100%{opacity:0.16}6%{opacity:0.3}18%{opacity:0.7}32%{opacity:0.16}48%{opacity:0.55}60%{opacity:0.25}72%{opacity:0.6}78%{opacity:1}88%{opacity:1}93%{opacity:0.16}",
    },
    dot: (c) => ({ variant: String((Math.floor(c.rand * 4) % 4) + 1), delay: 0 }),
  },
  {
    id: "drift",
    name: "Drift",
    desc: "A soft wave drifts along the diagonal.",
    dur: 3200,
    easing: CB_DRIFT,
    keyframes: {
      "": "0%,100%{opacity:0.06}20%{opacity:0.3}40%{opacity:0.95}60%{opacity:0.3}80%{opacity:0.06}",
    },
    dot: (c) => ({ delay: c.diag * 240 }),
  },
  {
    id: "embedding",
    name: "Embedding",
    desc: "Brightness collapses inward to the center.",
    dur: 2400,
    easing: CB1,
    keyframes: { "": "0%,100%{opacity:0.16}20%{opacity:1}45%{opacity:0.16}" },
    dot: (c) => ({ delay: (2 - c.dist) * 380 }),
  },
  {
    id: "flower-bloom",
    name: "Flower Bloom",
    desc: "Petals brighten and fade around the core.",
    dur: 3000,
    easing: "ease-in-out",
    offOpacity: 0,
    keyframes: { "": "0%{opacity:0.1}35%{opacity:1}65%{opacity:1}100%{opacity:0.1}" },
    dot: (c) => (FLOWER.has(c.i) ? { delay: c.dist * 280 } : null),
  },
  {
    id: "gradient-descent",
    name: "Gradient Descent",
    desc: "Rows descend, fading as they settle.",
    dur: 2400,
    easing: CB_GRAD,
    keyframes: { "": "0%,100%{opacity:0.16}16%{opacity:1}32%{opacity:0.45}48%{opacity:0.16}" },
    dot: (c) => ({ delay: c.row * 320 }),
  },
  {
    id: "hash",
    name: "Hash",
    desc: "Cells flicker in a scattered, fixed pattern.",
    dur: 1400,
    easing: "linear",
    keyframes: { "": "0%,100%{opacity:0.16}6%{opacity:1}14%{opacity:0.16}" },
    dot: (c) => ({ delay: -c.rand * 1400 }),
  },
  {
    id: "heart-pulse",
    name: "Heart Pulse",
    desc: "A heart beats with a double thump.",
    dur: 1600,
    easing: "ease-out",
    offOpacity: 0,
    keyframes: {
      "": "0%{opacity:0.16}10%{opacity:1}20%{opacity:0.45}30%{opacity:1}45%{opacity:0.16}100%{opacity:0.16}",
    },
    dot: (c) => (HEART.has(c.i) ? { delay: 0 } : null),
  },
  {
    id: "helix",
    name: "Helix",
    desc: "Brightness winds around like a strand.",
    dur: 2600,
    easing: CB1,
    keyframes: { "": "0%,100%{opacity:0.1}30%{opacity:0.95}50%{opacity:0.3}80%{opacity:0.95}" },
    dot: (c) => ({ delay: -c.angle * 2600 }),
  },
  {
    id: "index-build",
    name: "Index Build",
    desc: "Pairs build inward from the edges.",
    dur: 2800,
    easing: CB1,
    keyframes: { "": "0%,100%{opacity:0.16}16%{opacity:1}38%{opacity:0.16}" },
    dot: (c) => ({ delay: c.pairOrder * 130 }),
  },
  {
    id: "lattice",
    name: "Lattice",
    desc: "The grid breathes in two phases.",
    dur: 2400,
    easing: CB1,
    keyframes: { "": "0%,100%{opacity:0.18}50%{opacity:0.95}" },
    dot: (c) => ({ delay: c.cornerDist * 480 }),
  },
  {
    id: "orbit",
    name: "Orbit",
    desc: "A dot circles the perimeter.",
    dur: 2000,
    easing: CB1,
    offOpacity: 0.05,
    keyframes: { "": "0%,100%{opacity:0.1}40%{opacity:1}60%{opacity:0.1}" },
    dot: (c) => ((c.row === 2 || c.col === 2) && c.dist === 2 ? { delay: -c.angle * 2000 } : null),
  },
  {
    id: "plus-pulse",
    name: "Plus Pulse",
    desc: "A plus shape pulses in and out.",
    dur: 1600,
    easing: CB_PLUS,
    offOpacity: 0,
    keyframes: { "": "0%,100%{opacity:0.2}20%{opacity:1}40%{opacity:0.2}" },
    dot: (c) => (PLUS.has(c.i) ? { delay: c.dist * 140 } : null),
  },
  {
    id: "quantize",
    name: "Quantize",
    desc: "Cells snap between levels in steps.",
    dur: 3000,
    easing: "steps(1, end)",
    keyframes: {
      "": "0%,30%{opacity:0.16}35%{opacity:1}82%{opacity:1}88%{opacity:0.16}100%{opacity:0.16}",
    },
    dot: (c) => ({ delay: c.rand * 600 }),
  },
  {
    id: "rate-limit",
    name: "Rate Limit",
    desc: "The middle row gates through in bursts.",
    dur: 2400,
    easing: "steps(1, end)",
    offOpacity: 0.06,
    keyframes: {
      "": "0%,18%{opacity:0.16}22%{opacity:1}60%{opacity:1}64%{opacity:0.16}100%{opacity:0.16}",
    },
    dot: (c) => (c.row === 2 ? { delay: c.col * 200 } : null),
  },
  {
    id: "ripple",
    name: "Ripple",
    desc: "Rings ripple outward from the center.",
    dur: 2400,
    easing: "ease-out",
    keyframes: { "": "0%,80%,100%{opacity:0.1}10%,25%{opacity:1}45%{opacity:0.1}" },
    dot: (c) => ({ delay: c.dist * 400 }),
  },
  {
    id: "snowflake",
    name: "Snowflake",
    desc: "A six-fold flake shimmers softly.",
    dur: 2600,
    easing: "ease-in-out",
    offOpacity: 0,
    keyframes: { "": "0%,100%{opacity:0.18}50%{opacity:1}" },
    dot: (c) => (SNOW.has(c.i) ? { delay: c.dist * 180 } : null),
  },
  {
    id: "sound-bars",
    name: "Sound Bars",
    desc: "Columns rise and fall like a meter.",
    dur: 1400,
    easing: "ease-in-out",
    keyframes: { "": "0%,100%{opacity:var(--min-op)}50%{opacity:1}" },
    dot: (c) => ({
      delay: c.col * 140,
      vars: { "--min-op": Number((0.05 + c.row * 0.18).toFixed(3)) },
    }),
  },
  {
    id: "star-burst",
    name: "Star Burst",
    desc: "A star flares from the center.",
    dur: 2200,
    easing: "ease-in-out",
    offOpacity: 0,
    keyframes: { "": "0%,100%{opacity:0.1}40%{opacity:1}70%{opacity:0.1}" },
    dot: (c) => (STAR.has(c.i) ? { delay: c.dist * 220 } : null),
  },
  {
    id: "sync",
    name: "Sync",
    desc: "The four corners flash in rotation.",
    dur: 1600,
    easing: CB_CLUSTER,
    offOpacity: 0.05,
    keyframes: { "": "0%,100%{opacity:0.16}20%{opacity:1}45%{opacity:0.16}" },
    dot: (c) =>
      (c.col === 0 || c.col === 4) && (c.row === 0 || c.row === 4)
        ? { delay: c.angle * 1600 }
        : null,
  },
  {
    id: "token-stream",
    name: "Token Stream",
    desc: "Tokens emit column by column.",
    dur: 2000,
    easing: "linear",
    keyframes: { "": "0%,100%{opacity:0.16}10%{opacity:1}25%{opacity:0.16}" },
    dot: (c) => ({ delay: c.col * 320 }),
  },
  {
    id: "twin-helix",
    name: "Twin Helix",
    desc: "Two strands pulse out of phase.",
    dur: 2400,
    easing: "ease-in-out",
    offOpacity: 0,
    keyframes: { "": "0%,100%{opacity:0.12}50%{opacity:1}" },
    dot: (c) => {
      const side = c.col === 0 ? "l" : c.col === 4 ? "r" : null;
      if (!side) return null;
      return { delay: side === "r" ? c.row * 200 + 1200 : c.row * 200 };
    },
  },
  {
    id: "vector-index",
    name: "Vector Index",
    desc: "Diagonals index across the grid.",
    dur: 2400,
    easing: "linear",
    keyframes: { "": "0%,100%{opacity:0.16}8%{opacity:1}20%{opacity:0.16}" },
    dot: (c) => ({ delay: c.diag * 220 }),
  },
  {
    id: "webhook",
    name: "Webhook",
    desc: "A pulse radiates outward on each call.",
    dur: 2400,
    easing: CB_CLUSTER,
    keyframes: { "": "0%,100%{opacity:0.16}18%{opacity:1}40%{opacity:0.16}" },
    dot: (c) => ({ delay: c.dist * 320 }),
  },
];

const pascal = (id: string): string =>
  id
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");

const delay = (ms: number): string => `calc(${Math.round(ms)}ms / var(--speed, 1))`;

const animationDelay = (d: number | number[]): string =>
  Array.isArray(d) ? d.map(delay).join(",") : delay(d);

const dotRule = (d: Dot): string => {
  const parts = Object.entries(d.vars ?? {}).map(([k, v]) => `${k}:${v}`);
  if (d.delay !== 0) parts.push(`animation-delay:${animationDelay(d.delay)}`);
  return parts.join(";");
};

const buildStyle = (spec: Spec): string => {
  const { id, dur, easing, keyframes, composite } = spec;
  const keys = Object.keys(keyframes);
  const multi = keys.length > 1;
  const duration = `calc(${dur}ms / var(--speed, 1))`;
  const lines: string[] = [];

  if (composite) {
    const anim = `${id}-k ${duration} ${easing} infinite both`;
    lines.push(`.${id}-l{opacity:0.16;animation:${anim},${anim};animation-composition:add;}`);
  } else if (multi) {
    lines.push(
      `.${id}-l{opacity:0;animation-duration:${duration};animation-timing-function:${easing};animation-iteration-count:infinite;animation-fill-mode:both;}`,
    );
    for (const k of keys) lines.push(`.${id}-v${k}{animation-name:${id}-k-${k};}`);
  } else {
    lines.push(`.${id}-l{opacity:0;animation:${id}-k ${duration} ${easing} infinite both;}`);
  }

  for (const k of keys)
    lines.push(`@keyframes ${multi ? `${id}-k-${k}` : `${id}-k`}{${keyframes[k]}}`);
  lines.push(`@media (prefers-reduced-motion:reduce){.${id}-l{animation:none;opacity:0.5}}`);

  for (const c of COORDS) {
    const d = spec.dot(c);
    if (!d) continue;
    const rule = dotRule(d);
    if (rule) lines.push(`.${id}-d${c.row}${c.col}{${rule}}`);
  }

  return lines.join("\n");
};

const buildUses = (spec: Spec): string => {
  const { id } = spec;
  const multi = Object.keys(spec.keyframes).length > 1;
  const lines: string[] = [];

  for (const c of COORDS) {
    const x = POS[c.col];
    const y = POS[c.row];
    const d = spec.dot(c);
    if (!d) {
      if (spec.offOpacity)
        lines.push(
          `      <use href="#${id}-dot" x="${x}" y="${y}" opacity="${spec.offOpacity}" />`,
        );
      continue;
    }
    const cls = [`${id}-l`];
    if (multi) cls.push(`${id}-v${d.variant}`);
    if (dotRule(d)) cls.push(`${id}-d${c.row}${c.col}`);
    lines.push(`      <use href="#${id}-dot" className="${cls.join(" ")}" x="${x}" y="${y}" />`);
  }

  return lines.join("\n");
};

const buildFile = (spec: Spec): string => `import type { CSSProperties } from "react";
import type { LoaderProps } from "../types";

const STYLE = \`${buildStyle(spec)}\`;

export function ${pascal(spec.id)}({
  size = 24,
  speed,
  color,
  className,
  "aria-label": ariaLabel,
}: LoaderProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      width={size}
      height={size}
      role="img"
      data-slot="icon"
      aria-label={ariaLabel ?? "${spec.name}"}
      className={className}
      style={{ color, "--speed": speed } as CSSProperties}
    >
      <title>${spec.name}</title>
      <desc>${spec.desc}</desc>
      <defs>
        <circle id="${spec.id}-dot" r="3.1" fill="currentColor" />
      </defs>
      <style>{STYLE}</style>
${buildUses(spec)}
    </svg>
  );
}
`;

mkdirSync(OUT, { recursive: true });
for (const spec of SPECS) writeFileSync(join(OUT, `${spec.id}.tsx`), buildFile(spec));
console.log(`generated ${SPECS.length} loaders`);
