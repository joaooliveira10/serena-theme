# Serena Icons — LOGO edition: drawing rules

The LOGO edition ("Serena Icons") uses a brand logo drawing for a concept when one exists and
falls back to the Minimal drawing otherwise. A logo icon must look like **the brand** at a glance
and like **Serena** on a second look: the same pixel grid, tokens, opacities and visual weight as the
Minimal set (`src/icons/system/style.md`). Everything in `style.md` still applies unless this file
overrides it.

Look at `exemplars.png`, `exemplars-context.png` (with the Minimal exemplars above) and
`exemplars-mosaic.png` (every Minimal icon + the logos at 1x) before you draw.

Which concepts get a logo is decided in `v4/brands.json`: only entries with
`approach: "simple-icons"` (62 files, 9 folder badges). `original-evocative` and `generic` concepts
stay Minimal. Do not add logos for anything else.

---

## 0. Checklist

1. Same markup rules as Minimal: inner markup for a 16×16 viewBox, `{{token}}` colours only, max 2
   tokens, opacity only `.2` / `.5`, no `<text>`, transforms, filters, gradients, masks, clipPaths,
   ids or styles. `fill-rule="evenodd"` is allowed (and is how knock-outs are made).
2. Start from the simple-icons 24×24 path of the `slug` in brands.json. Never trace another source.
3. Put the logo in the **live area**: 14×14, pixels x 1..14, y 1..14 (coordinates 1 → 15). Wide tile
   logos may use the chip's width (pixels x 1..15), like chips do. Ink box ≥ 10×9.
4. Bake the scale and offset into the coordinates. The scale is **uniform** and the transform is never
   written as an attribute (§3.2).
5. Snap: auto-scale with a searched scale and offset (§3.2), or redraw on the grid by hand when
   auto-scaling blurs (§3.3). Brands that forbid shape changes (TypeScript): **uniform scale +
   recolour only** (§3.4).
6. Weight (§4): 1x ink 16–24%, hard limits 9–30% (the linter checks). Solid tiles become a
   **brand chip** (tile at `.2` + mark at full). Heavy solid silhouettes are shrunk, knocked out, or
   drawn as a tinted body with a 1px outline.
7. Colour (§5): `tokens[0]` from brands.json is the main token, and `tokens[1]` (if listed) the only
   accent. No brand hex values and no multicolour brand palettes.
8. Folder badges (§6): hand-drawn in the 7×7 slot, solid shapes with whole-pixel knock-outs, in the
   folder's token.
9. Licence (§7): record attribution / ShareAlike / trademark notes from brands.json for every icon you
   ship.
10. `node icons/system/render.mjs mine.mjs mine.png --context --compare` must be lint clean (except a
    documented shape-locked logo). Check 1x on dark and light first, then 2x, and compare against
    **all** Minimal icons with `mosaic.mjs`.

---

## 1. Canvas, live area and centring

| element | area (pixels, inclusive) | notes |
|---|---|---|
| file logo, square-ish | x 1..14, y 1..14 (14×14) | long side 12–14 px |
| file logo, wide tile | x 1..15, y 3..11 or so | chip width, as in Markdown 15×9 |
| visual centre | (8, 8) ± 0.5 | pixel-centred logos (odd widths) centre on 8.5 |
| folder badge | x 9..15, y 9..15 (7×7) | `BADGE_SLOT`; folder is notched automatically |
| role corner mark | x 11..15, y 12..15 | logo ink stays out of x ≥ 11, y ≥ 11 (1px ring) |

* Choose the centre by the logo's symmetry. A logo symmetric about a pixel **edge** (even width,
  such as Angular, the Tailwind waves or the JS square) centres on x = 8. A logo whose axis is a
  1px line or a 3×3 dot (the React nucleus, the git trunk) centres on x = 8.5.
* Keep the brand's **aspect ratio**. A wide logo is wide (PHP ellipse 14×10, Markdown 15×9, Tailwind
  14×9). If that leaves the ink box under 9 rows, let the height round up by one row (the PHP ellipse
  went from ry 4.5 to 5); do not stretch it further.

## 2. Classify the logo first

| class | what it is | examples | as-is ink at 14px |
|---|---|---|---|
| **T — tile** | letters or a mark knocked out of a square, rounded rect, ellipse or shield | JS, TS, CSS, PHP, Markdown, Storybook, Qt, pnpm, Yarn disc | 42–67% |
| **S — solid silhouette** | one filled shape, sometimes with internal cuts | Git diamond, Ruby gem, Android, C hexagon, Godot, Nest, Rollup, Bun | 28–48% |
| **L — line / organic** | strokes, curves, thin blades | React atom, Tailwind waves, Maven feathers, Jupyter arcs, Laravel, PostCSS, drizzle | 10–26% |

The class decides the weight treatment (§4). `metrics16.ink16` in brands.json is the as-is ink.

## 3. From the 24px path to the 16px icon

### 3.1 Pipeline

1. Read the brands.json entry: `slug`, `tokens`, `legibility16` (`good` / `needs-simplification`),
   `notes`, licence fields and `guidelinesCheck` (`alterForbidden`, `recolourForbidden`,
   `useRestriction`).
2. Render the silhouette on a 16-grid overlay: `node work/v4-logo-style/study.mjs out.png <slug>[:x,y,size]`.
3. Classify it (§2) and pick the weight treatment (§4).
4. `legibility16: good` → try **auto-scale** (§3.2) first. `needs-simplification` → **redraw** (§3.3).
   Either way, judge the 1x render and not the metric.
5. Write the markup with `compact()` path data (2 decimals, relative commands) and check that it is
   lint clean with `render.mjs --context --compare`. Then check it with `inspect.mjs` (1x and 2x at
   6×/3× nearest-neighbour zoom) and `mosaic.mjs` (next to every Minimal icon).

### 3.2 Auto-scale (keep the brand's geometry)

* **Uniform scale only**: `s = n / 24` with n = 12–14 px for the long side (§4 decides n).
  Different x and y scales, skews and rotations are shape changes and are never used.
* **Offset search.** `fitSearch(d, { markD, sizes, tol: .25, step: 1/16, cx: 8, cy: 8 })` in
  `work/v4-logo-style/lib.mjs` renders every (n, tx, ty) candidate whose bbox centre is within
  ±0.25 px of the target centre. It rates crispness with **blur = 2·Σmin(a, 1−a) / Σa** over the 1x
  alpha of `markD` (the part that must be sharp: the letters of a tile logo, or the whole logo
  otherwise). Take the lowest blur that stays inside the live area.
  * blur ≤ 0.5 is good (TS letters 0.46, Tailwind 0.50). Above ~0.6 at every candidate means the
    logo needs a redraw (§3.3).
  * Straight brand edges (tile sides, stems) land on integer edges when they can. Where the letters
    and the tile cannot both be on-grid, favour the letters: a `.2` tile edge 1/8 px off is invisible.
* **Bake it in**: `xform(d, s, tx, ty)` rewrites every coordinate (including arc radii). Then
  `compact(d, 2)` rounds to 0.01 px, writes relative commands, and writes each subpath's closing
  segment in absolute coordinates, so the linter sees no float-noise edge. 0.01 px rounding is not
  a shape change: the render differs by at most 1 AA step.
* **Split subpaths** when parts need different fills. `subpaths(d)`: for a tile logo, subpath 0 is
  usually the tile and the rest are the knocked-out letters.

### 3.3 Redraw on the grid (when auto-scaling blurs)

Allowed when the brand does not forbid shape changes. Keep the logo's **silhouette, arrangement and
proportions**. Simplify only what cannot survive 16 px.

* Fills on integer edges. 1px strokes on pixel centres (`n.5`). Straight diagonals at **45° or 1:2**
  only (the Angular wings, the Ruby pavilion, the Android antennae).
* Organic logos keep their curves (Tailwind waves, Maven leaves as quadratic curves). Put extreme
  points (tops, tips, stems) on the grid.
* **Minimum sizes**: parts thinner than 1px are thickened to 1px (strokes) or 2px (fills). Counters
  and gaps narrower than 1px are widened to 1px or filled. Dots smaller than 3×3 use `dot()` (a
  soft 3×3) or a crisp 1×1 / 2×2 square, because a circle under 5px renders as "+".
* **Knock-outs** (white details inside a solid brand shape) use `fill-rule="evenodd"`: the shape
  path plus hole subpaths **on whole pixels** (squares, 1px-wide runs, `rrect(x, y, 3, 3, .75)` for
  round nodes). Holes must not overlap each other, because evenodd would fill the overlap again.
  They may touch at edges or corners. A 45° connection between two holes is made by letting them
  touch corner to corner (the git exemplar's branch).
* **Letters** inside logos: redraw them in the Serena stroke hand (5×7 regular, 3×5 small, or a 3px
  lowercase such as the PHP exemplar) in the logo's position. Never auto-scale 24px lettering below
  ~7 px tall.
* Drop decoration that is noise at 16 px (the Ruby logo's facet sheen, the Maven feather barbs, the
  multicolour Prettier bars). Keep what identifies the brand.

### 3.4 Shape-locked logos (TypeScript, and any `alterForbidden: true`)

The TypeScript guidelines say "don't modify the shape of the logos". Such a logo gets:

* **Only uniform scale + translation + recolour.** Recolour may give the logo's own subpaths
  different tokens or opacities: the TS exemplar is the outer rounded square at `.2` plus the
  letter subpaths at full. This renders the same as the knocked-out square at `.2` with the letters
  filled in, so no shape changes.
* **No** redraw, simplification, snapping of individual points, notch, corner mark, badge or
  lettering change. Pick the scale and offset with `fitSearch` (TS: 14/24 at (1.125, 1.25), letter
  blur 0.46 against 0.67 at the integer offset).
* Variants that would need a shape change stay **Minimal** (brands.json already sets
  `typescript-test` and `typescript-def` to `original-evocative`).
* The linter reports **off-grid edges** for such a logo, because the brand's edges are not on our
  grid. This is the only accepted lint warning. Name it in the module comment.

## 4. Visual weight: logos must sit evenly next to Minimal icons

The Minimal set measures 9–26% ink at 1x (median 19%, chips 19–22%). As-is simple-icons logos
range from 10% (drizzle) to 67% (a solid JS square), so a solid tile would look three times as
heavy as its neighbours.

**Target: 16–24% ink at 1x** (render.mjs "ink"), soft ceiling 27% for dense line logos (the React
atom), hard limits 9–30%. Ink box ≥ 10×9.

| class | treatment | exemplar result |
|---|---|---|
| **T — tile** | **Brand chip**: the tile in the brand's own shape and aspect at `.2`, the letters or mark at full, in the brand's position. This is the Minimal chip idea applied to the brand's tile. If the brand has an official **outline** variant, that also works (Markdown Mark: 1px frame + solid glyphs). | JS 22%, TS 27%, PHP 19%, Markdown 23% |
| **S — solid silhouette** | Pick one: **(a)** keep it solid and **knock out** its internal details (evenodd, whole pixels), at 12–13 px; **(b)** body at `.2` + 1px outline and facet lines at full; **(c)** shrink the solid to 11–12 px (ink grows with area; a 14 px solid at 40% becomes ~25% at 11 px). Prefer (a) when the logo *is* a solid shape with cuts (Git), (b) when its identity is facets or outline (Ruby gem), and (c) as a last resort. | Git 22% (a), Ruby 20% (b), Angular 21% (solid pieces, slimmed to 12 wide) |
| **L — line / organic** | Full live area (13–14 px). 1px strokes on the grid, or the brand's blades auto-scaled. Too light (< 14%): thicken to 2px fills. Too dense: enlarge the counters. | Tailwind 16%, Maven 19%, React atom 27% |

* Tile tints are always `.2`, never `.5`: a `.5` tile swallows the letters on light sidebars.
* A tile at `.2` covering 14×14 adds about 15% by itself, so the mark on it must be light (1px
  letters, or the brand's own letter shapes).
* Check the balance in context: `render.mjs --context --compare` and `mosaic.mjs`. The logo should
  not be the first thing the eye lands on in a list.

## 5. Colour

* **Main token** = brands.json `tokens[0]`. Its `nearestTop3` and notes explain choices that differ
  from the nearest hue (Nest rose vs Angular red, TOML brown vs Rust's rust, React-TS blue vs
  React-JS cyan).
* **Second token** only if brands.json lists `tokens[1]` (role marks: `green` check,
  `muted` lock; declarations: `sand`; component/directive accents) or for a meaningful language accent.
  The React atom's nucleus is `yellow` for `.jsx`, which keeps it apart from react-native's
  all-cyan atom. Never rebuild a multicolour brand palette (Angular's gradient, Prettier's bars,
  CMake's three colours): one main token carries the identity.
* Achromatic brands map to `fg` / `grey` / `muted` as brands.json says (Deno, Cursor fg; CircleCI grey).
* Dark and light come from the tokens: the same markup renders with `tokens.json` dark on dark
  sidebars and light on light ones. Never hard-code hex values or brand colours.
* Opacity: `.2` for tile/body tints, `.5` for a secondary part (a back facet, an open-folder plate).
  Nothing else.
* Variants follow `style.md` §5 on top of the logo:
  * **Role** (test, lock …): notch the logo (keep ink out of x ≥ 11, y ≥ 11) + `mark()` from glyphs.
    If the notch would cut the brand shape and the brand forbids that, stay Minimal. Otherwise move
    or shorten the logo's inner mark to make room (JS-test: letters move up to rows 4..10).
  * **Declaration**: the inner mark in `sand` (c-header: the C in sand).
  * **Generated**: the whole logo in `muted` (javascript-generated).

## 6. Folder badges (7×7 slot)

* The folder silhouette comes from `folder.mjs` (`folderIcon({ token, badge })`). You deliver
  `{ token, badge }` only. The folder is notched and the 1px knock-out ring appears automatically.
  `token` = the folder's token in brands.json (`folders.<id>.tokens[0]`), and the badge uses the same
  token.
* **Always redraw by hand.** Auto-scaling a 24px logo to 7 px is mush (see
  `work/v4-brands/png/final-folders.png`).
* Reduce the logo to its **outer silhouette + one identifying detail**. Solid fills read best at
  7 px, while 1px outlines on a busy folder edge flicker. Details are **whole-pixel knock-outs**
  (evenodd): git = solid diamond with lead-in, trunk and branch pixels removed; Android = solid head
  with two eye pixels removed and 1:2 antennae as 1px strokes.
* All badge ink inside the slot: coordinates 9 → 16 (the linter checks it). Keep a 1px margin from
  the slot's top-left where the silhouette allows, so the ring stays visible.
* Check the closed and open folders at 1x on both sidebars. The badge must still read when the
  folder is selected (list selection `#2c2f40` dark / `#d7dbf1` light).

## 7. Licences and trademarks

* Every logo icon inherits the brands.json licence of its `slug`. Collect `attribution` /
  `licenseUrl` into THIRD_PARTY_NOTICES for every `attributionRequired: true` icon you ship.
* **ShareAlike** (`CC-BY-SA-*`: PHP, Ruby, R, Zig, pytest, Biome): the derived SVG must be released
  under the same licence. Say so in the module comment so the release can list those files.
* **Apache-2.0** artwork (Maven, Apache httpd feathers): keep the NOTICE and use the marks only to
  refer to the product.
* `useRestriction: caution` (Tailwind, Laravel, Django): no implied affiliation. Ship with the
  trademark disclaimer.
* The logos refer to the tools. Never combine a brand logo with Serena branding or use one as the
  theme's own logo.

## 8. Tools (`work/v4-logo-style/`)

| file | use |
|---|---|
| `lib.mjs` | `siPath(slug)`, `parse`, `xform(d, s, tx, ty)` (uniform scale + offset baked in), `subpaths`, `compact(d, 2)`, `bbox`, `fitSearch(...)`, `batchMetrics` (fast ink / blur of many candidates in one render) |
| `study.mjs` | a simple-icons path on a 16-grid overlay at 24×, plus 1x and 4× zooms: `node study.mjs out.png git php:1,4,14` |
| `inspect.mjs` | per icon: 1x dark/light at real size, 1x at 6× and 2x at 3× nearest-neighbour: `node inspect.mjs mod.mjs out.png --cols 3` |
| `mosaic.mjs` | all 107 Minimal files + 55 folders at 1x (3× zoom) with your module's icons below: `node mosaic.mjs <abs path to mod.mjs> out.png` |
| `crop.mjs` | nearest-neighbour crop/zoom of any sheet: `node crop.mjs in.png out.png x y w h scale` |
| `inkof.mjs` | ink % and ink box per icon (same numbers as render.mjs) |
| `gen-exemplars.mjs` | how the exemplars were generated: copy the pattern (helpers → inlined strings) |
| `build-assignments.mjs` | builds `assignments.json` |

Generate your module with a script that uses these helpers and `glyphs.mjs`, then **write plain
strings**. The delivered module has **no imports** (see `exemplars.mjs`).

## 9. Module format (both editions)

```js
// v4/logos/<batch>.mjs — plain strings, no imports
export const icons = {
  // <what it is, licence, treatment, ink>
  "<file concept id>": "<inner 16×16 markup with {{token}}>",
};
export const folders = {
  "<folder concept id>": { token: "<token>", badge: "<7×7 badge markup in x9..15,y9..15>" },
};
```

Ids are the mapping.json concept ids. Folder ids have **no** `folder-` prefix (the build names the SVGs).
An id may be exported by only one module in `src/icons/logos/`. The build rejects duplicates, so
exemplar ids are not redrawn in the batches.

## 10. The exemplars and what each one teaches

| id | class → treatment | ink / box | lesson |
|---|---|---|---|
| `javascript` | T → brand chip: 14×14 square `.2` + "JS" 5×7 at rows 7..13, bottom-right | 22% · 14×14 | redraw letters in the Serena hand in the brand's position |
| `typescript` | T, shape-locked → scale 14/24 at (1.125, 1.25), square `.2` + letter subpaths full | 27% · 14×14 | recolour-only brand chip; the only lint exception |
| `git` | S → solid diamond 13×13, branch knocked out (3 rounded 3×3 nodes, 1px trunk, corner-joined branch) | 22% · 13×13 | whole-pixel evenodd knock-outs |
| `php` | T → ellipse 14×10 `.2` + lowercase "php" 3px wide (x-height 4) | 19% · 14×10 | wide aspect kept; tiny custom letters |
| `ruby` | S → front-view gem: body `.2` + 1px outline, girdle, 1:2 pavilion facets | 20% · 13×10 | tinted body + outline for faceted logos |
| `angular` | S → 4 solid pieces, integer vertices, 1:2 slopes, slimmed to 12 wide | 21% · 12×13 | redraw a geometric logo exactly on the grid |
| `javascript-react` | L → atom: orbits rx 6 ry 3 at 0/±60° (1px arcs), centre (8.5, 8.5), 3×3 nucleus in `yellow` | 27% · 13×13 | dense line logo at the soft ceiling; language accent |
| `typescript-react` | same atom, all `blue` | 27% · 13×13 | colour-only sibling, with the pair kept apart by the jsx accent |
| `tailwind` | L → simple-icons waves auto-scaled to 14 px wide at (1, .875) | 16% · 14×9 | auto-scale + offset search for organic curves |
| `markdown` | T → the official outline variant: 1px frame 15×9 + "M" + ↓ | 23% · 15×9 | use a brand's outline variant when it exists |
| `maven` | L → two quadratic leaves + crossing 1px quills (the 7 kB path redrawn in 215 chars) | 19% · 12×14 | redraw organic logos with a few curves |
| folder `git` | rust folder + solid 7×7 diamond with lead-in/trunk/branch pixels knocked out | 51% | badge = silhouette + knock-outs |
| folder `android` | green folder + head (dome with 1.5px straight sides), eye knock-outs, 1:2 antennae | 55% | the robot reads at 7 px |

Colour notes: `git` (file) is `red` per brands.json (nearest to the Git brand hex). The `.git` folder
stays `rust`, the Minimal folder token, so it still matches its Minimal neighbours.
