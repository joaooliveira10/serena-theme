// Serena Icons — stroke font + drawing helpers for 16×16 icons.
//
// FONT MODEL ("pixel-centre plotting")
//   Every glyph is a set of polylines on an integer unit grid. With weight 1 each
//   unit is one pixel and every point lands on a pixel CENTRE (n + .5), so a 1px
//   round-capped stroke lights exactly the pixels it passes through — the result
//   is a crisp pixel font at 1x and a softly rounded one at 2x.
//   Diagonals are 45° wherever possible (clean staircase at 1x).
//
//   regular : 5×7 px cell (units x 0..4, y 0..6)  — main monograms (1–2 chars)
//   small   : 3×5 px cell (units x 0..2, y 0..4)  — 3-char monograms, badges, corner marks
//   weight 2: same drawings with a 2px stroke on INTEGER coordinates; the cell grows
//             by 1px on each side (regular → 6×8 box). Use sparingly (see style.md).
//
//   Caps/joins are round: at 1x an end pixel gets ~90% coverage (reads as solid),
//   at 2x corners soften to a 1-device-px radius, matching Serena's soft UI.
//
// Glyph data format:  "x,y x,y x,y | x,y x,y"  — polylines separated by "|".
//   A polyline whose first point equals its last is closed (emitted with Z).
//   A single point is a DOT (emitted as a filled square, so it is 100% crisp).

const REGULAR = {
  h: 7,
  glyphs: {
    A: "0,6 0,1 1,0 3,0 4,1 4,6|0,3 4,3",
    B: "0,0 3,0 4,1 4,2 3,3 0,3|3,3 4,4 4,5 3,6 0,6 0,0",
    C: "4,1 3,0 1,0 0,1 0,5 1,6 3,6 4,5",
    D: "0,0 3,0 4,1 4,5 3,6 0,6 0,0",
    E: "4,0 0,0 0,6 4,6|0,3 3,3",
    F: "4,0 0,0 0,6|0,3 3,3",
    G: "4,1 3,0 1,0 0,1 0,5 1,6 3,6 4,5 4,3 2,3",
    H: "0,0 0,6|4,0 4,6|0,3 4,3",
    I: [3, "0,0 2,0|1,0 1,6|0,6 2,6"],
    J: "2,0 4,0 4,5 3,6 1,6 0,5",
    K: "0,0 0,6|4,0 1,3 0,3|1,3 4,6",
    L: "0,0 0,6 4,6",
    M: "0,6 0,0 2,2 4,0 4,6",
    N: "0,6 0,0|0,1 4,5|4,0 4,6",
    O: "1,0 3,0 4,1 4,5 3,6 1,6 0,5 0,1 1,0",
    P: "0,6 0,0 3,0 4,1 4,2 3,3 0,3",
    Q: "1,0 3,0 4,1 4,4 2,6 1,6 0,5 0,1 1,0|2,4 4,6",
    R: "0,6 0,0 3,0 4,1 4,2 3,3 0,3|2,3 4,5 4,6",
    S: "4,1 3,0 1,0 0,1 0,2 1,3 3,3 4,4 4,5 3,6 1,6 0,5",
    T: "0,0 4,0|2,0 2,6",
    U: "0,0 0,5 1,6 3,6 4,5 4,0",
    V: "0,0 0,4 2,6 4,4 4,0",
    W: "0,0 0,6 2,4 4,6 4,0",
    X: "0,0 0,1 4,5 4,6|4,0 4,1 0,5 0,6",
    Y: "0,0 0,1 2,3 4,1 4,0|2,3 2,6",
    Z: "0,0 4,0 4,1 0,5 0,6 4,6",
    0: "1,0 3,0 4,1 4,5 3,6 1,6 0,5 0,1 1,0|1,4 3,2",
    1: [3, "0,1 1,0 1,6|0,6 2,6"],
    2: "0,1 1,0 3,0 4,1 4,2 0,6 4,6",
    3: "0,1 1,0 3,0 4,1 4,2 3,3 1,3|3,3 4,4 4,5 3,6 1,6 0,5",
    4: "3,6 3,0 0,3 0,4 4,4",
    5: "4,0 0,0 0,2 3,2 4,3 4,5 3,6 1,6 0,5",
    6: "3,0 1,0 0,1 0,5 1,6 3,6 4,5 4,4 3,3 0,3",
    7: "0,0 4,0 4,1 2,3 2,6",
    8: "1,3 0,2 0,1 1,0 3,0 4,1 4,2 3,3 1,3 0,4 0,5 1,6 3,6 4,5 4,4 3,3",
    9: "1,6 3,6 4,5 4,1 3,0 1,0 0,1 0,2 1,3 4,3",
    "#": "1,1 1,5|3,1 3,5|0,2 4,2|0,4 4,4",
    "+": "2,1 2,5|0,3 4,3",
    "-": [3, "0,3 2,3"],
    ".": [1, "0,6"],
    "/": [4, "0,6 3,0"],
    "\\": [4, "0,0 3,6"],
    "{": [4, "3,0 2,0 1,1 1,2 0,3 1,4 1,5 2,6 3,6"],
    "}": [4, "0,0 1,0 2,1 2,2 3,3 2,4 2,5 1,6 0,6"],
    "[": [3, "2,0 0,0 0,6 2,6"],
    "]": [3, "0,0 2,0 2,6 0,6"],
    "<": [4, "3,0 0,3 3,6"],
    ">": [4, "0,0 3,3 0,6"],
    $: "4,1 1,1 0,2 1,3 3,3 4,4 3,5 0,5|2,0 2,6",
    "@": "4,5 4,1 3,0 1,0 0,1 0,5 1,6 3,6|4,4 2,4 2,2 4,2",
    "*": "2,1 2,5|0,1 4,5|4,1 0,5",
    "!": [1, "0,0 0,4|0,6"],
    "?": "0,1 1,0 3,0 4,1 4,2 2,4|2,6",
    _: "0,6 4,6",
    "=": "0,2 4,2|0,4 4,4",
    ":": [1, "0,2|0,5"],
    ";": [2, "1,2|1,5 0,6"],
    "~": "0,4 1,3 3,5 4,4",
    "%": "0,0 1,0 1,1 0,1 0,0|3,5 4,5 4,6 3,6 3,5|0,6 4,0",
    " ": [3, ""],
  },
};

const SMALL = {
  h: 5,
  glyphs: {
    A: "0,4 0,1 1,0 2,1 2,4|0,2 2,2",
    B: "0,4 0,0 1,0 2,1 1,2 0,2|1,2 2,3 1,4 0,4",
    C: "2,0 1,0 0,1 0,3 1,4 2,4",
    D: "0,0 1,0 2,1 2,3 1,4 0,4 0,0",
    E: "2,0 0,0 0,4 2,4|0,2 1,2",
    F: "2,0 0,0 0,4|0,2 1,2",
    G: "2,0 1,0 0,1 0,3 1,4 2,4 2,2",
    H: "0,0 0,4|2,0 2,4|0,2 2,2",
    I: "0,0 2,0|1,0 1,4|0,4 2,4",
    J: "2,0 2,3 1,4 0,3",
    K: "0,0 0,4|2,0 0,2 2,4",
    L: "0,0 0,4 2,4",
    M: [5, "0,4 0,0 2,2 4,0 4,4"],
    N: [4, "0,4 0,0|0,0 3,3|3,0 3,4"],
    O: "1,0 2,1 2,3 1,4 0,3 0,1 1,0",
    P: "0,4 0,0 1,0 2,1 1,2 0,2",
    Q: "1,0 2,1 2,3 1,4 0,3 0,1 1,0|1,3 2,4",
    R: "0,4 0,0 1,0 2,1 1,2 0,2|1,2 2,3 2,4",
    S: "2,0 1,0 0,1 2,3 1,4 0,4",
    T: "0,0 2,0|1,0 1,4",
    U: "0,0 0,4 2,4 2,0",
    V: "0,0 0,3 1,4 2,3 2,0",
    W: [5, "0,0 0,4 2,2 4,4 4,0"],
    X: "0,0 0,1 2,3 2,4|2,0 2,1 0,3 0,4",
    Y: "0,0 0,1 1,2 2,1 2,0|1,2 1,4",
    Z: "0,0 2,0 2,1 0,3 0,4 2,4",
    0: "0,0 2,0 2,4 0,4 0,0",
    1: "0,1 1,0 1,4|0,4 2,4",
    2: "0,0 2,0 2,2 0,2 0,4 2,4",
    3: "0,0 2,0 2,4 0,4|0,2 2,2",
    4: "0,0 0,2 2,2|2,0 2,4",
    5: "2,0 0,0 0,2 2,2 2,4 0,4",
    6: "2,0 0,0 0,4 2,4 2,2 0,2",
    7: "0,0 2,0 2,4",
    8: "0,0 2,0 2,4 0,4 0,0|0,2 2,2",
    9: "2,2 0,2 0,0 2,0 2,4 0,4",
    "#": [5, "1,0 1,4|3,0 3,4|0,1 4,1|0,3 4,3"],
    "+": "1,1 1,3|0,2 2,2",
    "-": "0,2 2,2",
    ".": [1, "0,4"],
    "/": "0,4 2,0",
    "\\": "0,0 2,4",
    "{": "2,0 1,0 1,1 0,2 1,3 1,4 2,4",
    "}": "0,0 1,0 1,1 2,2 1,3 1,4 0,4",
    "[": [2, "1,0 0,0 0,4 1,4"],
    "]": [2, "0,0 1,0 1,4 0,4"],
    "<": "2,0 0,2 2,4",
    ">": "0,0 2,2 0,4",
    $: "2,0 0,0 0,2 2,2 2,4 0,4|1,0 1,4",
    "@": [4, "3,4 1,4 0,3 0,1 1,0 2,0 3,1 3,3 2,3 2,2"],
    "*": "0,1 2,3|2,1 0,3",
    "!": [1, "0,0 0,2|0,4"],
    "?": "0,1 1,0 2,1 1,2|1,4",
    _: "0,4 2,4",
    "=": "0,1 2,1|0,3 2,3",
    ":": [1, "0,1|0,3"],
    ";": [2, "1,1|1,3 0,4"],
    "~": [4, "0,2 1,1 2,2 3,1"],
    "%": "0,0|2,4|0,4 2,0",
    " ": [2, ""],
  },
};

export const FONTS = { regular: compile(REGULAR, 5), small: compile(SMALL, 3) };

function compile(font, defaultW) {
  const out = { h: font.h, glyphs: {} };
  for (const [ch, def] of Object.entries(font.glyphs)) {
    const [w, src] = Array.isArray(def) ? def : [defaultW, def];
    const lines = src ? src.split("|").map((pl) => pl.trim().split(/\s+/).map((p) => p.split(",").map(Number))) : [];
    out.glyphs[ch] = { w, lines };
  }
  return out;
}

const n = (v) => +v.toFixed(2);

/** size may be "regular" | "small" or a cap height in px (≥ 6 → regular, else small). */
const sizeName = (size) => (typeof size === "number" ? (size >= 6 ? "regular" : "small") : size);

/** Width/height in pixels of a text run. */
export function measure(text, { size = "regular", weight = 1, spacing } = {}) {
  size = sizeName(size);
  const font = FONTS[size];
  if (!font) throw new Error(`unknown size ${size}`);
  const sp = spacing ?? (weight === 2 ? 2 : 1);
  let w = 0;
  for (const ch of [...text.toUpperCase()]) w += glyphOf(font, ch).w + sp;
  w -= sp;
  const pad = weight === 2 ? 1 : 0; // a 2px stroke grows the ink by 1px on each side
  return { w: w + 2 * pad, h: font.h + 2 * pad };
}

function glyphOf(font, ch) {
  const g = font.glyphs[ch];
  if (!g) throw new Error(`glyph "${ch}" not in font`);
  return g;
}

/**
 * Path data for a text run whose ink box starts at pixel (left, top).
 * Returns { lines, dots } — `lines` for a stroked path, `dots` for a filled path.
 */
export function textPath(text, left, top, { size = "regular", weight = 1, spacing } = {}) {
  size = sizeName(size);
  const font = FONTS[size];
  const sp = spacing ?? (weight === 2 ? 2 : 1);
  // weight 1: pixel centres (+.5).  weight 2: integer coords, cell shifted by 1.
  const off = weight === 2 ? 1 : 0.5;
  let x = left;
  let lines = "";
  let dots = "";
  for (const ch of [...text.toUpperCase()]) {
    const g = glyphOf(font, ch);
    for (const pl of g.lines) {
      const P = pl.map(([gx, gy]) => [x + gx + off, top + gy + off]);
      if (P.length === 1) {
        const [px, py] = P[0];
        const s = weight; // dot = weight×weight square
        dots += `M${n(px - s / 2)} ${n(py - s / 2)}h${s}v${s}h-${s}z`;
        continue;
      }
      // closed polylines keep their explicit last segment before Z (see style.md §7:
      // resvg draws an implicit closing segment slanted when caps are round)
      const closed = P.length > 2 && P[0][0] === P.at(-1)[0] && P[0][1] === P.at(-1)[1];
      lines += pathFromPoints(P) + (closed ? "Z" : "");
    }
    x += g.w + sp;
  }
  return { lines, dots };
}

/** Compact absolute/relative path from points using H/V where possible. */
export function pathFromPoints(pts) {
  let d = `M${n(pts[0][0])} ${n(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    if (y1 === y0) d += `H${n(x1)}`;
    else if (x1 === x0) d += `V${n(y1)}`;
    else d += `L${n(x1)} ${n(y1)}`;
  }
  return d;
}

const tok = (t) => `{{${t}}}`;
const STROKE_ATTRS = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';

/** A stroked path in a token colour. `w` = 1 (default) or 2. */
export function stroke(d, token, { w = 1, opacity } = {}) {
  return `<path d="${d}" ${STROKE_ATTRS} stroke="${tok(token)}"${w !== 1 ? ` stroke-width="${w}"` : ""}${opacity != null ? ` stroke-opacity="${opacity}"` : ""}/>`;
}

/** A filled path in a token colour. */
export function fill(d, token, { opacity, evenodd = false } = {}) {
  return `<path d="${d}" fill="${tok(token)}"${opacity != null ? ` fill-opacity="${opacity}"` : ""}${evenodd ? ' fill-rule="evenodd"' : ""}/>`;
}

/**
 * Monogram of 1–3 characters, centred on (x, y) and snapped to the pixel grid.
 *   size   : "regular" (5×7, default) | "small" (3×5; use for 3 chars)
 *   token  : token name, or an array with one token per character (e.g. ["blue","yellow"])
 *   weight : 1 (default) | 2
 * Returns SVG markup (one stroked path per colour, plus a filled path for dots).
 */
export function monogram(text, { x = 8, y = 8, size, token = "fg", weight = 1, spacing } = {}) {
  const chars = [...text];
  size = sizeName(size) ?? (chars.length >= 3 ? "small" : "regular");
  const { w, h } = measure(text, { size, weight, spacing });
  const pad = weight === 2 ? 1 : 0;
  const left = Math.round(x - w / 2) + pad;
  const top = Math.round(y - h / 2) + pad;
  const tokens = Array.isArray(token) ? token : chars.map(() => token);
  // group consecutive characters by colour so one path per colour is emitted
  const font = FONTS[size];
  const sp = spacing ?? (weight === 2 ? 2 : 1);
  const groups = new Map();
  let cx = left;
  chars.forEach((ch, i) => {
    const t = tokens[i] ?? tokens.at(-1);
    const { lines, dots } = textPath(ch, cx, top, { size, weight, spacing: sp });
    const g = groups.get(t) ?? { lines: "", dots: "" };
    g.lines += lines;
    g.dots += dots;
    groups.set(t, g);
    cx += glyphOf(font, ch.toUpperCase()).w + sp;
  });
  let out = "";
  for (const [t, g] of groups) {
    if (g.lines) out += stroke(g.lines, t, { w: weight });
    if (g.dots) out += fill(g.dots, t);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Primitive helpers (all coordinates in the 16×16 icon space)
// ---------------------------------------------------------------------------

/** Rounded-rect path data. Filled shapes: integer edges. 1px strokes: .5 edges. */
export function rrect(x, y, w, h, r = 0) {
  if (!r) return `M${n(x)} ${n(y)}h${n(w)}v${n(h)}h${n(-w)}v${n(-h)}z`;
  return (
    `M${n(x + r)} ${n(y)}h${n(w - 2 * r)}a${r} ${r} 0 0 1 ${r} ${r}v${n(h - 2 * r)}` +
    `a${r} ${r} 0 0 1 ${-r} ${r}h${n(-(w - 2 * r))}a${r} ${r} 0 0 1 ${-r} ${-r}v${n(-(h - 2 * r))}a${r} ${r} 0 0 1 ${r} ${-r}z`
  );
}

/** <rect>-like helper: mode "fill" (default) or "stroke". */
export function rect(x, y, w, h, { token = "fg", r = 0, mode = "fill", opacity } = {}) {
  const d = rrect(x, y, w, h, r);
  return mode === "stroke" ? stroke(d, token, { opacity }) : fill(d, token, { opacity });
}

/** Circle as a path (keeps output to <path> only). */
export function circlePath(cx, cy, r) {
  return `M${n(cx - r)} ${n(cy)}a${r} ${r} 0 1 0 ${n(2 * r)} 0a${r} ${r} 0 1 0 ${n(-2 * r)} 0`;
}

export function circle(cx, cy, r, { token = "fg", mode = "fill", opacity } = {}) {
  const d = circlePath(cx, cy, r);
  return mode === "stroke" ? stroke(d, token, { opacity }) : fill(d, token, { opacity });
}

export function polyline(points, token, { w = 1, closed = false } = {}) {
  const P = closed && (points[0][0] !== points.at(-1)[0] || points[0][1] !== points.at(-1)[1]) ? [...points, points[0]] : points;
  return stroke(pathFromPoints(P) + (closed ? "Z" : ""), token, { w });
}

// ---------------------------------------------------------------------------
// Serena building blocks (use these — they encode the grid decisions in style.md)
// ---------------------------------------------------------------------------

/** CHIP — the container for SOURCE CODE files: a tile tinted with the language
 *  token at 20% plus a monogram in the full token. 15×11 so 1-, 2- and 3-letter
 *  monograms centre exactly (odd widths): tile x 1..16, y 2..13, radius 2;
 *  regular letters land on x 3..13 / y 4..10 (2px padding all round). */
export const CHIP = { x: 1, y: 2, w: 15, h: 11, r: 2, cx: 8.5, cy: 7.5 };

/** MARK_SLOT — corner-mark area, pixels x 11..15, y 12..15 (5×4). Row 11 stays empty
 *  so a mark never touches the monogram (letters end on row 10). A container that
 *  carries a mark is notched (chip: x ≥ 11, y ≥ 11; page: right edge stops at row 9,
 *  bottom edge at column 9) so the mark sits on the sidebar background. */
export const MARK_SLOT = { x: 11, y: 12, w: 5, h: 4 };

const CHIP_D = "M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z";
const CHIP_NOTCH_D = "M3 2h11a2 2 0 0 1 2 2v7h-5v2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z";

/** Tile only (20% tint). */
export function chipTile(token, { notch = false } = {}) {
  return fill(notch ? CHIP_NOTCH_D : CHIP_D, token, { opacity: ".2" });
}

/**
 * Source-code chip.
 *   chip("TS", "blue")                               TypeScript
 *   chip("PY", "blue", { letters: ["blue","yellow"] })  per-letter colours
 *   chip("TS", "blue", { letters: "sand" })          variant: declaration (.d.ts)
 *   chip("TSX", "blue")                              3 letters → small font automatically
 *   chip("TS", "blue", { mark: "check", markToken: "green" })   test file
 */
export function chip(text, token, { letters, mark: markName, markToken, size } = {}) {
  const notch = !!markName;
  return (
    chipTile(token, { notch }) +
    monogram(text, { x: CHIP.cx, y: CHIP.cy, token: letters ?? token, size }) +
    (markName ? mark(markName, markToken ?? token) : "")
  );
}

/** Corner marks (inside MARK_SLOT, bottom-right). Role signals shared by every family.
 *  Use with a notched base: chip(..., { mark }) or page(token, { notch: true }) + mark(). */
export const MARKS = {
  /** test / spec / e2e / bench */
  check: (t) => stroke("M11.5 14.5l1 1 3-3", t),
  /** lock files (package-lock, yarn.lock, go.sum, poetry.lock …) */
  lock: (t) => stroke("M12.5 14v-1.5h2V14", t) + fill("M11 14h5v2h-5z", t),
  /** generic modifier: local / override / example / generated */
  dot: (t) => fill(rrect(12, 13, 3, 3, 0.75), t),
  /** additions: plugins, extensions, patches */
  plus: (t) => stroke("M13.5 12.5v2M12.5 13.5h2", t),
  /** snapshots / stories / fixtures (bookmark ribbon) */
  bookmark: (t) => fill("M12 12h3v4h-1v-1h-1v1h-1v-4z", t),
};
export function mark(name, token) {
  const f = MARKS[name];
  if (!f) throw new Error(`unknown mark ${name} (have ${Object.keys(MARKS).join(", ")})`);
  return f(token);
}

/** PAGE — the neutral document outline (default file, generic documents).
 *  x 3.5..12.5, y 1.5..14.5, 3px folded corner. With { notch } the bottom-right
 *  corner is opened (right edge stops at row 9, bottom edge at column 9) so a
 *  corner mark can sit there. */
export function page(token, { notch = false } = {}) {
  const d = notch ? "M12.5 9.5v-5l-3-3h-6v13h6" : "M3.5 1.5h6l3 3v10h-9v-13z";
  return stroke(d + "M9.5 1.5v3h3", token);
}

/** Horizontal text lines (1px) — the "prose" motif for document formats.
 *  lines([[x1, x2, y], ...]) with integer pixel columns/rows (inclusive). */
export function lines(rows, token, opts) {
  return stroke(rows.map(([x1, x2, y]) => `M${x1 + 0.5} ${y + 0.5}H${x2 + 0.5}`).join(""), token, opts);
}

/** Solid dot whose top-left pixel is (px, py). size 3 → soft 3×3 (r .75, reads as
 *  round at 1x without the "+" artefact a circle gets); size 2/1 → crisp square. */
export function dot(px, py, token, { size = 3 } = {}) {
  return fill(rrect(px, py, size, size, size === 3 ? 0.75 : 0), token);
}
