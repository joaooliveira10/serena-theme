# Serena Icons — LOGO edition: drawing rules

The LOGO edition ("Serena Icons") shows a redrawn brand logo for a concept when one is drawn in this
folder, and the Minimal drawing otherwise. A logo icon must look like **the brand** at a glance and
like **Serena** on a second look: the same pixel grid, tokens, opacities and visual weight as the
Minimal set. Everything in `src/icons/system/style.md` still applies unless this file overrides it.

## What has a logo

A concept has a logo when a module in `src/icons/logos/` exports its id:

| module | what it holds |
|---|---|
| `exemplars.mjs` | the reference drawings (8 file icons, 2 folder badges); read them first |
| `logos-a.mjs` | languages, data and docs formats, platforms, server templates (24 file icons) |
| `logos-b.mjs` | web frameworks, JS tooling, editors (17 file icons, 6 folder badges) |
| `v5-configs.mjs` | 19 aliases: config and lock files that reuse the logo of the concept they came from (`"nuget-config": A["nuget"]`) |

That is 68 file ids and 8 folder badges; `node build.mjs` prints the current count. Every other
concept falls back to its Minimal drawing. The fallback is the normal case and is silent; what the
build refuses is a logo that is declared but empty (a misspelled alias), a logo for an id that is not
in `mapping.json`, and an id drawn in two modules.

## 0. Before you draw: may this logo be used at all?

1. **Licence.** The logo's own licence must allow redistribution **with modification** (CC BY,
   CC BY-SA, MIT, BSD, CC0 …), or the logo must have no separate licence. Path data comes from
   [Simple Icons](https://simpleicons.org); its CC0 dedication covers the path data only.
2. **Owner rules.** Find and read the owner's brand or trademark page. If it forbids altering or
   recolouring the logo, or requires permission to use it, **do not draw it**: the concept keeps its
   Minimal drawing. Every Serena logo is recoloured, so "use it unmodified" always means no.
   Not used for this reason: React, Jupyter, CircleCI, Qt, Django, Bun, Nx, Cypress, Apache HTTP
   Server, Apache Maven. A rule that only limits the shape (TypeScript) is handled in §3.3.
3. **Notice.** Add the brand to `THIRD_PARTY_NOTICES.md` in the same change: licence group, credit
   line as the licensor asks, source, the file and folder ids that use it, what was changed, and the
   link to the owner's rules. When no rule page exists, do not write that one was checked.
4. **ShareAlike** (`CC-BY-SA-*`: PHP, Ruby, R, Zig, pytest, Biome): the derived SVG keeps that licence.
   Say so in the comment above the entry and in the notices.
5. The logos refer to the tools. Never combine a brand logo with Serena branding.

## 1. Checklist

1. Same markup rules as Minimal: inner markup for a 16×16 viewBox, `<path>` only, `{{token}}` colours
   only, max 2 tokens, opacity only `.2` / `.5`. `fill-rule="evenodd"` is how knock-outs are made.
2. Start from the Simple Icons 24×24 path of the brand. Never trace another source.
3. Put the logo in the **live area**: 14×14, pixels x 1..14, y 1..14. Wide tile logos may use the
   chip's width (pixels x 1..15). Ink box at least 10×9.
4. Bake scale and offset into the coordinates. The scale is **uniform**; no `transform` attribute.
5. Snap to the pixel grid: auto-scale with a chosen offset (§3.1), or redraw by hand when that blurs
   (§3.2). Brands that forbid shape changes: uniform scale and recolour only (§3.3).
6. Weight (§4): 16–24% ink at 1x, hard limits 9–30%.
7. Colour (§5): one main token, at most one accent. No brand hex values.
8. Folder badges (§6): hand-drawn in the 7×7 slot, solid shapes with whole-pixel knock-outs.
9. `node build.mjs`, `node scripts/check.mjs`, then F5: check 100% zoom on a dark, a light and a
   high contrast theme, next to the Minimal icons of the same folder.

## 2. Canvas, live area and centring

| element | area (pixels, inclusive) | notes |
|---|---|---|
| file logo, square-ish | x 1..14, y 1..14 (14×14) | long side 12–14 px |
| file logo, wide tile | x 1..15, y 3..11 or so | chip width, as in Markdown 15×9 |
| visual centre | (8, 8) ± 0.5 | pixel-centred logos (odd widths) centre on 8.5 |
| folder badge | x 9..15, y 9..15 (7×7) | `BADGE_SLOT`; the folder is notched automatically |
| role corner mark | x 11..15, y 12..15 | logo ink stays out of x ≥ 11, y ≥ 11 (1px ring) |

* A logo symmetric about a pixel **edge** (even width: Angular, the Tailwind waves, the JS square)
  centres on x = 8. A logo whose axis is a 1px line or a 3×3 dot (the git trunk) centres on x = 8.5.
* Keep the brand's **aspect ratio**. A wide logo is wide (PHP ellipse 14×10, Markdown 15×9, Tailwind
  14×9). If that leaves the ink box under 9 rows, let the height round up by one row, no more.

## 3. From the 24px path to the 16px icon

Classify the logo first; the class decides the weight treatment (§4).

| class | what it is | examples |
|---|---|---|
| **T — tile** | letters or a mark knocked out of a square, rounded rect, ellipse or shield | JS, TS, CSS, PHP, Markdown, Storybook, pnpm, Yarn disc |
| **S — solid silhouette** | one filled shape, sometimes with internal cuts | Git diamond, Ruby gem, Android, Godot, Nest, Rollup |
| **L — line / organic** | strokes, curves, thin blades | Tailwind waves, Laravel, PostCSS, Drizzle |

### 3.1 Auto-scale (keep the brand's geometry)

* **Uniform scale only**: `s = n / 24` with n = 12–14 px for the long side. Different x and y
  scales, skews and rotations are shape changes and are never used.
* Try a few offsets within ±0.25 px of the centre and keep the one where the parts that must be sharp
  (the letters of a tile logo, or the whole logo) land on whole pixels. Where letters and tile
  cannot both be on the grid, favour the letters: a `.2` tile edge 1/8 px off is invisible.
* Rewrite every coordinate (including arc radii) with the scale and offset applied, rounded to
  0.01 px. Split subpaths when parts need different fills (tile at `.2`, letters at full).

### 3.2 Redraw on the grid (when auto-scaling blurs)

Allowed when the brand does not forbid shape changes. Keep the logo's **silhouette, arrangement and
proportions**. Simplify only what cannot survive 16 px.

* Fills on integer edges. 1px strokes on pixel centres (`n.5`). Straight diagonals at **45° or 1:2**
  only (the Angular wings, the Ruby pavilion, the Android antennae).
* Organic logos keep their curves (Tailwind waves). Put extreme points on the grid.
* **Minimum sizes**: parts thinner than 1px become 1px strokes or 2px fills. Gaps narrower than 1px
  are widened to 1px or filled. Dots smaller than 3×3 use a soft 3×3 or a crisp 1×1 / 2×2 square.
* **Knock-outs** (white details inside a solid shape) use `fill-rule="evenodd"`: the shape plus hole
  subpaths **on whole pixels**. Holes must not overlap (evenodd would fill the overlap again); they
  may touch at edges or corners.
* **Letters** inside logos are redrawn in the Serena stroke hand (5×7 regular, 3×5 small, or a 3px
  lowercase as in the PHP exemplar). Never auto-scale 24px lettering below ~7 px tall.
* Drop decoration that is noise at 16 px (the Ruby logo's facet sheen, the multicolour Prettier
  bars). Keep what identifies the brand.

### 3.3 Shape-locked logos (TypeScript)

The TypeScript branding page asks not to modify the shape of the logo. Such a logo gets:

* **Only uniform scale, translation and recolour.** Recolour may give the logo's own subpaths
  different opacities: the TypeScript exemplar is the outer rounded square at `.2` plus the letter
  subpaths at full (scale 14/24 at (1.125, 1.25)).
* **No** redraw, simplification, snapping of individual points, notch, corner mark or badge.
* Variants that would need a shape change stay **Minimal** (`typescript-test`, `typescript-def`).

## 4. Visual weight: logos must sit evenly next to Minimal icons

The Minimal set measures 9–26% ink at 1x (chips 19–22%). An unmodified solid tile would be three
times as heavy as its neighbours. **Target: 16–24% ink at 1x**, hard limits 9–30%.

| class | treatment | exemplar result |
|---|---|---|
| **T — tile** | **Brand chip**: the tile in the brand's own shape and aspect at `.2`, the letters or mark at full, in the brand's position. If the brand has an official outline variant, that also works (Markdown Mark). | JS 22%, TS 27%, PHP 19%, Markdown 23% |
| **S — solid silhouette** | Pick one: **(a)** keep it solid and knock out its internal details, at 12–13 px; **(b)** body at `.2` + 1px outline and facet lines at full; **(c)** shrink the solid to 11–12 px. Prefer (a) when the logo *is* a solid shape with cuts (Git), (b) when its identity is facets or outline (Ruby gem). | Git 22% (a), Ruby 20% (b), Angular 21% |
| **L — line / organic** | Full live area. 1px strokes on the grid, or the brand's blades auto-scaled. Too light (< 14%): thicken to 2px fills. | Tailwind 16% |

* Tile tints are always `.2`, never `.5`: a `.5` tile swallows the letters on light sidebars.
* The logo should not be the first thing the eye lands on in a list.

## 5. Colour

* One **main token** carries the identity; choose the token nearest to the brand hue that does not
  collide with a neighbour (Nest rose vs Angular red, TOML brown vs Rust's rust).
* A **second token** only for a role mark (`green` check, `muted` lock), a declaration (`sand`) or a
  component accent. Never rebuild a multicolour brand palette (Prettier's bars, CMake's three
  colours).
* Achromatic brands map to `fg` / `grey` / `muted` (Deno, Cursor: `fg`).
* The same markup renders with the dark, light and high contrast values of `tokens.json`. Never
  hard-code hex values or brand colours.
* Variants follow `style.md` §5 on top of the logo: **role** = notch the logo (ink out of x ≥ 11,
  y ≥ 11) + corner mark (JS-test: the letters move up); **declaration** = the inner mark in `sand`
  (c-header); **generated** = the whole logo in `muted` (javascript-generated). If the notch would
  cut a shape-locked logo, the variant stays Minimal.

## 6. Folder badges (7×7 slot)

* The folder silhouette comes from `system/folder.mjs`. You deliver `{ token, badge }` only; the
  folder is notched and the 1px knock-out ring appears automatically. Keep the Minimal folder's token
  so the folder still matches its neighbours (`.git` stays `rust`).
* **Always redraw by hand.** Auto-scaling a 24px logo to 7 px is mush.
* Reduce the logo to its **outer silhouette + one identifying detail**. Solid fills read best at
  7 px. Details are whole-pixel knock-outs (evenodd): git = solid diamond with trunk and branch
  pixels removed; Android = solid head with two eye pixels removed and 1:2 antennae.
* All badge ink inside the slot: coordinates 9 → 16. Check closed and open folders at 1x on every
  sidebar, also when the row is selected.

## 7. Module format

```js
// src/icons/logos/<module>.mjs: plain strings, no imports
export const icons = {
  // <brand, licence and credit, treatment>
  "<file concept id>": "<inner 16×16 markup with {{token}}>",
};
export const folders = {
  "<folder concept id>": { token: "<token>", badge: "<7×7 badge markup in x9..15, y9..15>" },
};
```

Ids are the `mapping.json` concept ids. Folder ids have **no** `folder-` prefix (the build names the
SVGs). An id may be exported by only one module. To give a config or lock concept its owner's logo,
add an alias line to `v5-configs.mjs`; to return any concept to its Minimal drawing, delete its
entry (and its line in `THIRD_PARTY_NOTICES.md`).

## 8. The exemplars and what each one teaches

| id | class → treatment | lesson |
|---|---|---|
| `javascript` | T → brand chip: 14×14 square `.2` + "JS" 5×7 at rows 7..13, bottom-right | redraw letters in the Serena hand in the brand's position |
| `typescript` | T, shape-locked → scale 14/24, square `.2` + letter subpaths full | recolour-only brand chip |
| `git` | S → solid diamond 13×13, branch knocked out | whole-pixel evenodd knock-outs |
| `php` | T → ellipse 14×10 `.2` + lowercase "php" 3px wide | wide aspect kept; tiny custom letters |
| `ruby` | S → front-view gem: body `.2` + 1px outline, girdle, 1:2 pavilion facets | tinted body + outline for faceted logos |
| `angular` | S → 4 solid pieces, integer vertices, 1:2 slopes, slimmed to 12 wide | redraw a geometric logo exactly on the grid |
| `tailwind` | L → Simple Icons waves auto-scaled to 14 px wide at (1, .875) | auto-scale + offset choice for organic curves |
| `markdown` | T → the official outline variant: 1px frame 15×9 + "M" + ↓ | use a brand's outline variant when it exists |
| folder `git` | rust folder + solid 7×7 diamond with trunk/branch pixels knocked out | badge = silhouette + knock-outs |
| folder `android` | green folder + head, eye knock-outs, 1:2 antennae | the robot reads at 7 px |
