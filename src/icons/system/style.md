# Serena Icons — style guide for drawers

Serena Icons is the file-icon theme for the Serena VS Code themes (Serena Dark, Serena Dark Vivid,
Serena Light). It is **calm, pastel and pixel-crisp**: 1px lines on the pixel grid, soft round
caps, one colour family per icon, and the same markup rendered in a dark and a light palette.

Look at `exemplars.png` before you draw anything. Every icon you make must look like it belongs
in that sheet.

## Files in `icons/system/`

| file | what it is |
|---|---|
| `tokens.json` | the 19 colour tokens, `dark` and `light` values |
| `glyphs.mjs` | stroke font (monograms) + building blocks: `chip`, `page`, `lines`, `dot`, `mark`, `stroke`, `fill`, `rrect` … |
| `folder.mjs` | folder shapes, badge slot, ready-made `BADGES` |
| `render.mjs` | contact sheet + linter: `node render.mjs <module.mjs> <out.png> [--ids a,b] [--context] [--compare]` |
| `exemplars.mjs` / `exemplars.png` | the reference set (same format you deliver) |
| `style.md` | this file |

---

## 0. Checklist (read this even if you skip the rest)

1. 16×16, `viewBox="0 0 16 16"`. You deliver only the **inner** markup.
2. 1px strokes with coordinates on pixel centres (`n.5`). Fills on integer edges.
3. `stroke-linecap="round" stroke-linejoin="round"` and `fill="none"` on every stroke (the
   `stroke()` helper does this for you).
4. Colours only as `{{token}}` placeholders from the vocabulary. **Max 2 tokens per icon.**
5. Opacity values: only `.2` (chip tiles) and `.5` (secondary parts).
6. No `<text>`, no transforms, no masks/clipPaths/filters/gradients/`<use>`/ids/`url()`.
7. Close stroked shapes with an explicit final segment before `Z` (§7).
8. Pick the family (§4): **source → chip**, data → syntax symbol or letter + lines,
   docs → prose lines, config → sliders, media → framed content.
9. Variants: role → corner mark, syntax flavour → 3-letter chip, declarations → `sand` letters,
   generated → `muted` (§5).
10. Original artwork only. Never draw a brand logo (§12).
11. `node ../../system/render.mjs mine.mjs mine.png --context --compare` must print **lint clean**.
    Look at the PNGs: 1x columns first, then 2x, then the 4x zoom.

---

## 1. Canvas and grid

* Canvas 16×16 px. Coordinates are in pixels. Pixel column *x* spans `x … x+1`.
* **Pixel-centre plotting.** A 1px stroke through `(x.5, y.5)` lights exactly pixel (x, y). All
  1px strokes use `.5` coordinates for horizontal and vertical runs. With round caps, an end
  point on a pixel centre lights that pixel at about 90% (reads solid at 1x, soft at 2x).
* **Fills** have integer edges. Rounded corners on fills are fine (`r` 0.75 to 2).
* **Diagonals** are 45° (one pixel across per pixel down). The only other slope allowed is 1:2
  (used by the open-folder flap). Other angles smear at 1x.
* **Live area**: keep ink inside x 1..15 and y 1..15 (a 1px margin). Two exceptions touch the
  right or bottom edge: the chip (x up to 16) and corner marks/badges (to x 16, y 16).
* **Vertical centre** sits at 7.5 to 8. Typical ink boxes:

| element | ink box (pixels, inclusive) | size |
|---|---|---|
| chip tile | x 1..15, y 2..12 | 15×11 |
| chip letters (regular, 2 chars) | x 3..13, y 4..10 | 11×7 |
| page (default file) | x 3..12, y 1..14 | 10×14 |
| symbols (json, yaml, markdown, settings, image) | about x 2..13, y 2..13 | 12×11 to 14×12 |
| folder | x 1..14, y 2..13 | 14×12 |
| corner mark slot | x 11..15, y 12..15 | 5×4 |
| folder badge slot | x 9..15, y 9..15 | 7×7 |

* **Circles smaller than 5px diameter** render as a "+" at 1x. For small round things use
  `dot(px, py, token)` (a 3×3 soft square, radius .75), which reads as round.
* **No transforms.** Place every coordinate yourself, or use the helpers (they snap to the grid).

## 2. Line weight, caps, joins

* **1px is the only line weight.** For mass, use fills (`dot()`, 2px-thick filled bars, the chip
  tint), not heavier strokes. `stroke-width="2"` is legal for the linter but is not used in the set.
  The stroke font's `weight: 2` looked blotchy in testing; do not use it.
* Caps and joins are **round**: soft at 2x, still crisp at 1x. The `stroke()` helper sets
  `fill="none" stroke-linecap="round" stroke-linejoin="round"`.
* Leave at least 1px of empty space between parallel strokes. Two touching 1px lines read as a
  single 2px blob.

## 3. Colour

* The palette is `tokens.json`. Write colours only as placeholders: `stroke="{{blue}}"`,
  `fill="{{sand}}"`. The build writes one SVG per variant: `dark` for dark sidebars, `light` for
  light sidebars.
* **At most 2 tokens per icon**: 1 *main* (identity) and optionally 1 *accent*.
  * The main token carries the identity (a language, tool or category).
  * The accent is only for a role or meaning. Examples: the green check on test files, the `sand`
    letters of a declaration file, Python's second letter, a folder badge in a different colour.
* **Opacity**: `.2` is only for the chip tile, the tint behind a monogram. `.5` is for secondary
  parts: slider tracks, the open folder's back plate, a de-emphasised line. No other values.
* Never hard-code hex values, `currentColor` or `black`/`white`.

### Token roles

| token | role / typical use |
|---|---|
| `fg` | maximum contrast neutral. Rarely needed: a monogram that must shout. |
| `grey` | neutral with presence: generic config (sliders), plain text lines |
| `muted` | quiet neutral: **default file, default folder**, generated or derived files, lock marks |
| `blue` | TypeScript, `src` folders, Markdown, PowerShell, C/C++ |
| `lavender` | Kotlin, PHP, UI/components, audio; Serena's signature keyword colour |
| `purple` | C#, .NET projects/solutions, Haskell |
| `sage` | shell scripts, CSV/spreadsheets, `scripts` folders |
| `green` | tests (check marks, `test` folders), success-ish tools |
| `teal` | images, docs folders, F#, Dart |
| `cyan` | Go, `api`/`i18n` folders |
| `sand` | JSON, **types/declarations** (Serena's type colour), databases, licences |
| `yellow` | JavaScript, secrets/keys (.env) |
| `peach` | SQL, XML, snapshot/story marks |
| `orange` | Java, SVG |
| `rust` | Rust, HTML, Swift, Git |
| `rose` | YAML |
| `red` | Ruby, Scala, PDF, errors |
| `pink` | SCSS/Sass, video |
| `brown` | archives, build output (`dist`, `bin/obj`), TOML |

Tokens were chosen to avoid adjacent collisions (§16). If two very common neighbours in one
folder would share a colour, check the context sheet and prefer a distinct neighbour hue.

## 4. Families: what container does a file get?

The container tells the reader *what kind* of file it is before they read the letters.

| family | container | examples | helper |
|---|---|---|---|
| **Source code** (languages you program in) | **chip**: 15×11 tile at 20% + monogram in the full token | TS, JS, C#, GO, PY, J, RS, KT, RB, PHP, SQL, C++ | `chip("TS", "blue")` |
| **Data / serialization** | bare **syntax symbol** (if iconic) or **letter + lines** | JSON `{·}`, XML/HTML `<>`, YAML `Y≡`, TOML `T≡`, CSV grid | `stroke`, `monogram`, `lines` |
| **Documents** | **prose lines** (1px horizontal lines), optionally with a leading glyph | Markdown `#≡`, text `≡`, changelog, licence | `lines`, `monogram`, `page` |
| **Config / settings** | **sliders** (tracks at .5, solid knobs) in the owner's token | `.editorconfig`, `.ini`, `settings.json`, `tsconfig.json` (blue) | `stroke` + `dot` |
| **Manifests & lockfiles** | a **package box** in the ecosystem token; lockfile = box + `lock` mark | `package.json`, `go.mod`, `*.csproj`, `pom.xml`, `pyproject.toml` | draw the box (§11) |
| **Media** | **framed content** (1px frame r=1.5 + content) | image, video, audio, font | `rrect` + `stroke` |
| **Tools & platforms** | an **original symbol** evoking what the tool does | git (branch graph), docker (stacked containers), CI (pipeline), lint (check-in-shield) | free-form, §12 |
| **Unknown** | **page** (plain folded sheet, `muted`) | anything unmapped | `page("muted")` |

### Monogram or symbol?

1. Use a **symbol** when the format has a syntax or object glyph everyone recognizes *and* it
   is legible at 16px: `{}` JSON, `<>` markup, `>_` shell, image frame, box, lock, key, database,
   branch.
2. Use a **monogram** when the identity *is the name*: programming languages and frameworks with a
   known short form. Use **2 letters** when you can (regular 5×7 font) and 1 letter only when the
   single letter is iconic (Java `J`, C `C`, R `R`). Use **3 letters** only when 2 would be
   ambiguous, or for a syntax variant (small 3×5 font, chosen automatically). **Never use 4.**
3. Use **letter + lines** for text data/config formats with no iconic glyph: a regular capital
   on the left (x 2..6), key lines on the right (x 8..13), a list/value line below (see `yaml`).
4. Don't put a monogram inside a symbol, apart from the letter + lines pattern and chips.

## 5. Variants of a type

A variant keeps its family's **base unchanged** and changes **exactly one thing**:

| kind of variant | treatment | example |
|---|---|---|
| **Role** (test, spec, e2e, stories, snapshots, lock, local/example) | same base + **corner mark** (MARK_SLOT, bottom-right). The base gets a notch so the mark sits on the background. | `chip("TS","blue",{mark:"check",markToken:"green"})` |
| **Syntax flavour** (tsx, jsx, mjs, cjs, mts, cts) | same chip, **literal 3-letter monogram** (small font) | `chip("TSX","blue")` |
| **Declarations / type-only** (`.d.ts`, `.pyi`, `.d.mts`) | same chip, **letters in `sand`** (Serena's type colour) | `chip("TS","blue",{letters:"sand"})` |
| **Generated / derived** (`.min.js`, `.js.map`, `.pyc`, `.class`, compiled output) | same base **entirely in `muted`** (tile and letters) | `chip("JS","muted")` |

Corner marks (`MARKS` in glyphs.mjs; use `mark(name, token)`):

| mark | meaning | token |
|---|---|---|
| `check` | test / spec / e2e / bench | `green` |
| `lock` | lockfile | `muted` (or the owner's token) |
| `dot` | local / override / example / generated sibling | the owner's token |
| `plus` | plugin / extension / patch | the owner's token |
| `bookmark` | stories / snapshots / fixtures | `peach` |

* On a chip, pass `{ mark }` to `chip()`. On a page, use `page(token, { notch: true }) + mark(...)`.
  On a symbol, keep the symbol's ink out of x ≥ 10, y ≥ 11 (redraw it a little smaller if needed).
* Marks are only for roles. Never use a mark just to decorate.

## 6. Config vs source

* **Source files are chips. Config files are never chips.** That is how the reader tells
  `app.ts` (chip) from `tsconfig.json` (blue sliders) at a glance.
* Generic config formats (`.ini`, `.conf`, `.cfg`, `.properties`, `.editorconfig`,
  `settings.json`, `.env.example`): **sliders** in `grey`.
* A config that belongs to a language or tool: **sliders in the owner's token**
  (`tsconfig.json` → blue, `jsconfig.json` → yellow, `appsettings.json` → purple). When the tool
  has its own symbol (eslint, prettier, docker, git, vite …), use that symbol instead.
* Dependency manifests are *not* settings. They get the **box** in the ecosystem token, and their
  lockfiles get the box + `lock` mark.
* Secrets (`.env`, keys, certs) get a **key** symbol (`yellow` for env, `sand` for certs).

## 7. Pixel pitfalls (the linter flags most of these)

* **Implicit close.** `M3.5 1.5h6l3 3v10h-9z` closes with an *implicit* vertical segment. resvg
  (and so our previews) draws that segment slanted when caps are round. Always end at the start
  point before `Z`: `…h-9v-13z`. The helpers already do this.
* **Missing `fill="none"`.** A stroked path without `fill="none"` is also filled black.
* **Butt caps** on `.5` endpoints blur the last pixel. Always use round caps.
* **Off-grid edges.** A horizontal/vertical 1px stroke on an integer coordinate smears across
  two pixel rows at 50%.
* **Tiny circles** turn into "+" shapes. Use `dot()`.
* **Crowding.** Keep at least 1px of background between separate shapes (a letter and a mark,
  a badge and the folder). The knock-outs in `chip()`/`folder.mjs` guarantee this for marks and
  badges.

## 8. Visual weight balance

Icons sit in a list, so they must weigh about the same. `render.mjs` prints **ink** (alpha
coverage of the 1x render) and the **ink box** under each label:

| family | ink | ink box |
|---|---|---|
| chips | 19–22% (single letter ~16%) | 15×11 |
| symbols / letter + lines / prose | 11–18% | ≥ 12×11 |
| framed media | 20–25% | 14×12 |
| page | ~18% | 10×14 |
| folders | 45–60% | 14×12 |

* The linter warns if a file icon is **< 9% or > 30% ink**, or its ink box is **< 10×9**.
* A symbol made only of 1px lines usually needs **one solid focal element** (the JSON value dot,
  the slider knobs, the image sun) to hold its own next to chips.
* Use the full live area. A symbol only 7px tall looks like a smaller icon.
* Folders are deliberately heaviest (solid): structure first, files second.

## 9. Defaults

* **Default file**: `page("muted")`, a plain folded sheet with nothing inside (lines inside mean
  "text", so the plain-text icon is a page with lines in `grey`).
* **Default folder**: `folderIcon({ token: "muted" })`, a solid `muted` folder with no badge.
  Unknown folders stay quiet so special folders stand out.

## 10. Folders

* Shapes live in `folder.mjs`, and you never redraw them. A folder deliverable is only
  `{ token, badge }`:
  * **closed**: tab (x 1..6, 45° shoulder to x 8) + body (x 1..15, y 4..14), r = 1, solid token.
  * **open**: back plate at `.5` + solid front flap with 1:2 slanted sides.
* **Special folders differ by colour + badge.** The badge is a 7×7 glyph in `BADGE_SLOT`
  (pixels x 9..15, y 9..15). When a badge is present the folder is **notched**: everything at
  x ≥ 8, y ≥ 8 is removed, which leaves a 1px knock-out ring so the badge reads on the sidebar
  background at 1x.
* Badge ink: 1px round strokes on pixel centres (9.5 … 15.5) or integer fills, **inside the
  slot** (the linter checks). Draw the badge in the **folder's own token** unless there is a
  strong reason for an accent.
* Ready-made badges (`BADGES` in folder.mjs): `code` `</>`, `check`, `lines`, `sliders`, `output`,
  `image`, `prompt` `>_`, `box`, `globe`, `key`, `branch`, `database`. Reuse them. If you add one,
  it must read at 1x in the 7×7 slot.

Suggested folder colours:

| folders | token | badge |
|---|---|---|
| (default) | `muted` | none |
| `src` `source` `lib` `app` `packages` | `blue` | `code` |
| `test` `tests` `__tests__` `spec` `e2e` | `green` | `check` |
| `docs` `doc` `wiki` | `teal` | `lines` |
| `.vscode` `config` `.config` `settings` | `grey` | `sliders` |
| `scripts` `bin` `tools` | `sage` | `prompt` |
| `dist` `build` `out` `target` `obj` | `brown` | `output` |
| `node_modules` `vendor` `.venv` | `muted` | `box` |
| `assets` `images` `img` `public` `static` `media` | `teal` | `image` |
| `.git` `.github` `.gitlab` `workflows` | `rust` | `branch` |
| `db` `database` `migrations` `data` `sql` | `sand` | `database` |
| `i18n` `locales` `lang` `www` | `cyan` | `globe` |
| `secrets` `certs` `keys` `auth` | `yellow` | `key` |
| `components` `ui` `views` `pages` | `lavender` | `code` |
| `models` `types` `entities` `domain` | `sand` | `lines` |

## 11. Drawing notes: tested snippets

These were rendered and checked at 1x (all lint clean, ink in range). Start from them.

* **Chip**: always `chip()`. Letters centre on (8.5, 7.5), and 1/2/3-letter monograms all centre
  exactly (the tile is 15 wide, glyph runs are odd). Multi-colour letters: `letters: [a, b]`.
* **Plain text**: `page("grey") + lines([[5, 10, 5], [5, 10, 8], [5, 8, 11]], "grey")`.
  Content inside a page stays within x 5..10, y 5..12.
* **Manifest box**: `stroke("M2.5 5.5h11v8h-11v-8zM4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3", tk)`,
  a box with a slanted lid and a handle slot. Don't copy npm/NuGet/Maven marks.
* **Lockfile**: the box notched for the mark:
  `stroke("M2.5 5.5h11v4M9.5 13.5h-7v-8M4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3", tk) + mark("lock", "muted")`.
* **Tool / language config**: the `settings` exemplar with the owner's token:
  `stroke("M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11", tk, { opacity: ".5" }) + dot(9, 3, tk) + dot(4, 7, tk) + dot(8, 11, tk)`.
* **Shell / terminal**: the framed prompt (a bare `>_` is only 4% ink, too light):
  `stroke(rrect(1.5, 2.5, 13, 11, 1.5) + "M4.5 6.5l2 2-2 2M8.5 10.5h3", "sage")`.
* **Markup `</>`**: 45° chevrons, 4 wide × 9 tall, with a 1:2 slash:
  `stroke("M5.5 3.5l-4 4 4 4M10.5 3.5l4 4-4 4M9.5 4.5l-3 6", tk)`. Bare `<>` without the slash is
  too light.
* **Key (.env, secrets, certs)**: a diagonal key fills the box (a horizontal key is only 7px tall):
  `stroke("M3.5 2.5h2l2 2v2l-2 2h-2l-2-2v-2l2-2zM7.5 8.5l5 5M10.5 11.5l2-2M12.5 13.5l1-1", tk) + dot(4, 5, tk, { size: 1 })`.
* **Generated / derived**: `chip("JS", "muted")`.
* **Frames (media)**: `rrect(1.5, 2.5, 13, 11, 1.5)` stroked, content inside x 3..12, y 4..11.
  45° content lines (see `image`).

## 12. Originality (hard rule)

* **Do not reproduce any official or trademarked logo or mascot**: no C#/.NET marks, Java cup,
  Python snakes, Go gopher, Docker whale, Git diamond, npm wordmark, React atom, Node hexagon,
  Kubernetes wheel, GitHub octocat, VS/VS Code logos, and so on. Also no near-copies (same
  silhouette, same arrangement).
* Evoke identity with **palette colour + an original monogram or a generic, functional symbol**
  (what the tool *does*: containers, branches, pipelines, packages, keys).
* Letters come from the Serena stroke font, not from any brand's typeface.

## 13. Deliverable format (exact)

Write one ES module per batch in your own folder `icons/work/<your-name>/`:

```js
// icons/work/<your-name>/<batch>.mjs
import { chip, page, lines, dot, mark, monogram, stroke, fill, rrect } from "../../system/glyphs.mjs";
import { BADGES } from "../../system/folder.mjs";

// FILE ICONS: id → inner SVG markup (string) with {{token}} placeholders.
// The markup is placed inside <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">.
export const icons = {
  "typescript": chip("TS", "blue"),
  "json": `<path d="M5.5 2.5h-1l-1 1v3l-1 1v1l1 1v3l1 1h1" fill="none" stroke="{{sand}}" stroke-linecap="round" stroke-linejoin="round"/>`,
};

// FOLDER BATCH: id → { token, badge }. Closed/open shapes come from folder.mjs.
export const folders = {
  "folder-src": { token: "blue", badge: BADGES.code("blue") },
  "folder-docs": { token: "teal", badge: BADGES.lines("teal") },
};
```

Rules:
* Ids are kebab-case, unique and descriptive: `typescript`, `typescript-test`, `typescript-def`,
  `typescript-react`, `folder-src`. Folder ids start with `folder-`.
* Values are **strings** (helpers return strings, and hand-written markup is fine).
* Allowed elements: `<path>` (preferred), `<rect>`, `<circle>`, `<line>`, `<polyline>`,
  `<polygon>`, `<g>` without attributes other than presentation ones. Allowed attributes: `d`,
  geometry, `fill`, `stroke`, `stroke-width`, `stroke-linecap`, `stroke-linejoin`,
  `fill-opacity`, `stroke-opacity`, `fill-rule`. **No** `id`, `class`, `style`, `transform`,
  `<text>`, `<image>`, `<use>`, `<mask>`, `<clipPath>`, `<filter>`, gradients, `url()`, `href`.
* Keep markup tiny: under ~600 chars typical, and the linter warns above 1200.
* The module must be side-effect free and deterministic (no randomness, no file I/O).

## 14. Workflow

```bash
cd icons/work/<your-name>
node ../../system/render.mjs batch.mjs batch.png --context --compare
```

* `batch.png` has one row per icon (folders show closed + open). The columns are dark sidebar
  `#16171d` 1x + 2x, dark editor `#1b1c23`, light sidebar `#ecedf3`, light editor `#f6f6fb`, then
  a 4x nearest-neighbour zoom of the 1x render on dark and on light. Pages hold 16 rows, and extra
  pages are `batch-2.png` and so on. `--rows N` changes that, `--ids a,b` renders a subset, and
  `--no-zoom` makes it compact.
* `batch-context.png` is a mock explorer at 1x and 2x, and `--compare` puts the exemplars above
  your icons. **Judge legibility at 1x**, and use the zoom only to find the pixel you need to move.
* The console lists lint warnings per icon (red dot in the sheet). **Deliver lint clean.**
  `--strict` exits non-zero on warnings.
* Iterate until: legible at 1x on both dark and light, weight matches the exemplars, no two icons
  in your batch are confusable, and nothing resembles a real logo.

## 15. Helper reference (`glyphs.mjs`, `folder.mjs`)

| helper | returns |
|---|---|
| `monogram(text, { x=8, y=8, size, token, weight=1, spacing })` | 1–3 chars centred on (x, y), snapped to pixels. `size` `"regular"` (5×7) / `"small"` (3×5, auto for 3 chars). `token` may be an array (one per char). |
| `measure(text, opts)` / `textPath(text, left, top, opts)` | metrics / raw path data (`{lines, dots}`) for custom layouts |
| `FONTS.regular` / `FONTS.small` | glyph tables: A–Z 0–9 `# + - . / \ { } [ ] < > $ @ * ! ? _ = : ; ~ %` and space |
| `chip(text, token, { letters, mark, markToken, size })` | source-code chip (tile .2 + monogram [+ mark]) |
| `chipTile(token, { notch })` | tile only |
| `CHIP`, `MARK_SLOT` | geometry constants |
| `mark(name, token)`, `MARKS` | corner marks: `check`, `lock`, `dot`, `plus`, `bookmark` |
| `page(token, { notch })` | folded page outline |
| `lines([[x1, x2, row], …], token, { opacity })` | 1px horizontal lines on pixel rows (inclusive columns) |
| `dot(px, py, token, { size=3 })` | solid 3×3 soft dot (or 2×2 / 1×1 crisp square) |
| `stroke(d, token, { opacity })` / `fill(d, token, { opacity, evenodd })` | raw path helpers with the right attributes |
| `rrect(x, y, w, h, r)` / `rect(...)` / `circlePath` / `circle` / `polyline(points, token, { closed })` / `pathFromPoints` | geometry |
| `folderClosed(token, { notch })`, `folderOpen(token, { notch })`, `folderIcon({ token, badge }, open)` | folder markup (the build uses `folderIcon`) |
| `BADGE_SLOT`, `KNOCKOUT`, `FOLDER_DEFAULT_TOKEN`, `BADGES.*(token)` | badge geometry + ready-made badges |

### Stroke font notes

* Each glyph is a set of polylines on an integer unit grid, and each unit is one pixel. Points
  land on pixel centres, so the font renders as a crisp pixel font at 1x and a softly rounded
  one at 2x. Dots (`.`, `:`, `!`, `?`, `;`) are filled squares, 100% crisp.
* **regular** is a 5×7 cell with cap height 7. Narrow glyphs: `I 1` (3), `/ \ { } < >` (4),
  `[ ] -` (3), `. : !` (1). **small** is a 3×5 cell with cap height 5. `M W` are 5 wide and
  `N @ ~` are 4 wide. Letter spacing is 1px.
* Why 1px, round caps, 5×7: at 16px a 2-letter monogram must fit 11px wide with 2px padding
  inside a tile. 5×7 is the smallest cell where every capital stays unambiguous (M/N/H, O/0/Q,
  S/5, B/8). A 2px weight left 1px counters and blotched at 1x. Round caps keep 1x crisp (end
  pixels ≈ 90% coverage) while softening 2x to match Serena's UI.

---

## 16. Palette (tokens.json)

> `tokens.json` also has an **`hc`** set used by the `highContrast` section of the icon themes (both hc-black and hc-light). It is one mid-to-light set: 6.0–7.0:1 on #000 and at least 3.0:1 on #fff, with the same hue per token. In hc mode the build raises `.5` opacities to `.65` and `.2` to `.3`. The tables below cover the dark and light sets.

| token | dark | light |
|---|---|---|
| fg | `#d4d4dc` | `#323445` |
| grey | `#a4a6b8` | `#626577` |
| muted | `#7f839c` | `#818397` |
| blue | `#8cb4e8` | `#2370bd` |
| lavender | `#c4a7e7` | `#8a5fa9` |
| purple | `#988cfc` | `#6a43c4` |
| sage | `#a6d189` | `#53803c` |
| green | `#6bcf9d` | `#008b56` |
| teal | `#91d1d7` | `#1b7e80` |
| cyan | `#62c5ef` | `#0080a6` |
| sand | `#e8c889` | `#94661b` |
| yellow | `#edde67` | `#8c7600` |
| peach | `#f0a782` | `#b85c37` |
| orange | `#fb9f44` | `#b66001` |
| rust | `#db795b` | `#993c23` |
| rose | `#e88b9a` | `#b44b6e` |
| red | `#ef6567` | `#c22630` |
| pink | `#ee97c9` | `#b84999` |
| brown | `#b08a69` | `#7a5432` |

### Rationale

* **Derived from Serena, not invented.** In dark, `fg` `muted` `blue` `lavender` `sage` `teal`
  `sand` `peach` `rose` are the Serena Dark role colours exactly (fg, comment, func, keyword,
  string, property, type, constant, special). `grey` sits between punctuation and comment. So a
  `.ts` chip is the same blue as function names in the editor, and a `.d.ts` is the same sand as
  types.
* **Same band.** Serena Dark's role hues live at OKLCH L ≈ 0.74–0.85, C ≈ 0.07–0.11. The ten
  added hues (`purple` 286°, `green` 160°, `cyan` 228°, `yellow` 102°, `orange` 62°, `rust` 38°,
  `red` 22°, `pink` 345°, `brown` 62°, plus neutral `grey`) were placed in the gaps of the hue
  wheel at L 0.66–0.89 and C 0.065–0.17. They are a little more saturated than the role
  colours, so they read as "their own" hue next to the pastel role colour (lavender↔purple,
  sage↔green, teal↔cyan, sand↔yellow, peach↔orange, rose↔red). `rust` and `brown` are
  deliberately darker, and `brown` is low-chroma.
* **Light** follows Serena Light's role hues (keyword 310°, func 252°, string 137°, constant 40°,
  type 74°, property 196°, special 2°) in its band L ≈ 0.48–0.62, C ≈ 0.08–0.19. It is slightly
  lighter than the syntax colours, because icons are shapes, not text, and a touch of lightness
  keeps them colourful instead of inky. The warm cluster (sand/yellow/peach/orange/rust/red/brown)
  is separated mostly by lightness, because hue alone can't separate them at 3:1 on a light
  background. Light `yellow` is necessarily a deep gold.
* **Contrast** (WCAG non-text ≥ 3:1): every token passes on **both** sidebar and editor
  backgrounds. The lowest values are dark `muted` 4.55:1 on `#1b1c23` and light `muted` 3.19:1 on
  `#ecedf3`. The dark values also pass on Serena Dark Vivid's `#13141b`. On the list selection
  background (`#2c2f40` dark / `#d7dbf1` light) everything stays ≥ 3:1 except light `muted`
  (2.72). Selection is a transient state and the shapes still read.
* **Chip letters vs their own tile.** A chip monogram sits on its 20% tile, not on the sidebar, so
  that pair is checked too (tile = token at .2 over the background). Dark: every token ≥ 4.2:1
  (`muted` 3.68). Light on `#ecedf3`: every chip token ≥ 3.0:1; the lowest are `cyan` 3.02,
  `yellow` 3.03, `orange` 3.03 and `peach` 3.06. Exceptions by design: `muted` 2.63 (generated
  chips are meant to recede) and `green` 2.91 (only ever a mark on the background, never a tile).
  Light `cyan` `yellow` `peach` `orange` were darkened for this (OKLCH lightness drops of
  0.01–0.045, hue within 1.2° and chroma within 0.009 of the originals `#0683aa` `#967f00`
  `#bf623d` `#c86c00`).

Contrast table (WCAG ratio):

| token | dark on #16171d | dark on #1b1c23 | light on #ecedf3 | light on #f6f6fb |
|---|---|---|---|---|
| fg | 12.13 | 11.52 | 10.49 | 11.38 |
| grey | 7.43 | 7.05 | 4.93 | 5.34 |
| muted | 4.79 | 4.55 | 3.19 | 3.46 |
| blue | 8.35 | 7.93 | 4.36 | 4.73 |
| lavender | 8.54 | 8.11 | 4.19 | 4.54 |
| purple | 6.38 | 6.06 | 5.59 | 6.07 |
| sage | 10.31 | 9.78 | 3.98 | 4.31 |
| green | 9.40 | 8.92 | 3.72 | 4.04 |
| teal | 10.48 | 9.95 | 4.14 | 4.49 |
| cyan | 9.16 | 8.69 | 3.88 | 4.20 |
| sand | 11.12 | 10.55 | 4.30 | 4.67 |
| yellow | 12.98 | 12.32 | 3.82 | 4.14 |
| peach | 8.99 | 8.53 | 3.89 | 4.22 |
| orange | 8.64 | 8.20 | 3.86 | 4.18 |
| rust | 5.87 | 5.58 | 5.94 | 6.44 |
| rose | 7.31 | 6.95 | 4.31 | 4.67 |
| red | 5.73 | 5.44 | 4.97 | 5.39 |
| pink | 8.43 | 8.01 | 4.04 | 4.38 |
| brown | 5.69 | 5.40 | 5.72 | 6.20 |

### Distinguishability (CIEDE2000)

**All 171 pairs are ≥ 10 in both modes.** The closest pairs are the intended hue neighbours:

* dark: rust/red 10.5 · sage/green 11.1 · rose/pink 11.2 · peach/orange 11.3 · sand/yellow 11.4 ·
  blue/cyan 11.5 · teal/cyan 11.6 · rose/red 11.6 · grey/muted 11.7
* light: sand/orange 10.1 · rust/red 10.2 · sage/green 10.3 · peach/orange 10.5 · sand/yellow 10.7 ·
  rose/pink 10.8 · peach/rust 11.2 · sand/brown 11.2 · lavender/pink 11.9

The closest pairs (≈10–11) are distinguishable side by side but not from memory. Don't rely on
colour alone to separate two icons that share a shape (e.g. `rust` vs `red`).

Full matrix, dark:

```
          fg  grey muted  blue laven purpl  sage green  teal  cyan  sand yello peach orang  rust  rose   red  pink brown
fg       -    12.7  24.2  18.7  19.8  27.4  27.0  27.5  20.0  23.8  24.5  31.1  24.6  31.0  31.3  26.0  32.6  23.7  27.1
grey    12.7   -    11.7  14.2  14.5  18.4  32.2  29.8  22.4  22.9  30.8  39.1  26.9  34.0  29.0  23.5  29.7  21.3  24.3
muted   24.2  11.7   -    18.8  18.9  16.9  39.3  35.4  29.0  27.1  38.6  47.2  32.8  39.4  30.8  26.8  30.9  25.6  26.3
blue    18.7  14.2  18.8   -    18.1  13.5  43.1  35.3  18.4  11.5  40.0  53.6  37.3  44.2  40.4  35.2  42.0  32.0  35.3
laven   19.8  14.5  18.9  18.1   -    13.2  42.7  40.1  28.1  30.2  43.9  56.3  33.7  44.3  34.4  21.7  31.0  13.6  35.3
purpl   27.4  18.4  16.9  13.5  13.2   -    51.6  45.3  28.7  24.7  52.6  66.1  41.5  51.8  39.9  29.3  36.2  23.1  40.9
sage    27.0  32.2  39.3  43.1  42.7  51.6   -    11.1  25.0  40.0  20.2  17.5  36.6  36.9  46.5  51.8  56.9  57.6  30.6
green   27.5  29.8  35.4  35.3  40.1  45.3  11.1   -    19.4  31.8  28.8  27.3  43.6  44.6  53.2  58.1  64.1  62.2  35.8
teal    20.0  22.4  29.0  18.4  28.1  28.7  25.0  19.4   -    11.6  31.1  34.7  37.2  40.6  43.4  46.7  54.3  38.4  35.1
cyan    23.8  22.9  27.1  11.5  30.2  24.7  40.0  31.8  11.6   -    41.7  49.1  44.0  48.0  50.3  50.5  56.6  47.6  38.9
sand    24.5  30.8  38.6  40.0  43.9  52.6  20.2  28.8  31.1  41.7   -    11.4  16.6  15.9  27.3  34.3  36.4  42.3  18.9
yello   31.1  39.1  47.2  53.6  56.3  66.1  17.5  27.3  34.7  49.1  11.4   -    28.5  25.2  39.5  47.8  50.2  56.3  28.3
peach   24.6  26.9  32.8  37.3  33.7  41.5  36.6  43.6  37.2  44.0  16.6  28.5   -    11.3  12.4  19.2  19.6  28.4  14.0
orang   31.0  34.0  39.4  44.2  44.3  51.8  36.9  44.6  40.6  48.0  15.9  25.2  11.3   -    17.9  30.6  28.0  40.8  16.9
rust    31.3  29.0  30.8  40.4  34.4  39.9  46.5  53.2  43.4  50.3  27.3  39.5  12.4  17.9   -    16.6  10.5  27.6  13.9
rose    26.0  23.5  26.8  35.2  21.7  29.3  51.8  58.1  46.7  50.5  34.3  47.8  19.2  30.6  16.6   -    11.6  11.2  23.3
red     32.6  29.7  30.9  42.0  31.0  36.2  56.9  64.1  54.3  56.6  36.4  50.2  19.6  28.0  10.5  11.6   -    21.8  22.4
pink    23.7  21.3  25.6  32.0  13.6  23.1  57.6  62.2  38.4  47.6  42.3  56.3  28.4  40.8  27.6  11.2  21.8   -    32.3
brown   27.1  24.3  26.3  35.3  35.3  40.9  30.6  35.8  35.1  38.9  18.9  28.3  14.0  16.9  13.9  23.3  22.4  32.3   -
```

Full matrix, light:

```
          fg  grey muted  blue laven purpl  sage green  teal  cyan  sand yello peach orang  rust  rose   red  pink brown
fg       -    16.8  28.5  27.4  26.1  24.2  39.4  39.3  32.5  31.7  38.3  43.3  37.6  41.3  31.8  31.4  35.3  31.6  28.6
grey    16.8   -    12.1  18.6  16.5  20.0  32.6  31.6  24.2  21.8  32.4  36.5  30.5  34.7  29.7  24.9  31.4  23.9  25.4
muted   28.5  12.1   -    20.6  17.4  25.0  33.1  31.4  25.5  22.3  33.7  36.8  30.4  34.8  33.8  25.7  33.6  23.9  29.9
blue    27.4  18.6  20.6   -    24.1  21.1  49.2  42.4  24.4  12.1  47.2  52.3  43.7  48.5  43.6  38.0  44.9  36.0  40.3
laven   26.1  16.5  17.4  24.1   -    12.3  60.9  44.2  33.4  31.4  47.2  56.0  36.3  45.5  35.3  19.1  32.2  11.9  37.9
purpl   24.2  20.0  25.0  21.1  12.3   -    52.1  49.3  33.9  27.8  54.6  64.8  43.5  52.8  40.4  26.6  37.7  19.8  43.7
sage    39.4  32.6  33.1  49.2  60.9  52.1   -    10.3  24.1  39.9  28.2  20.5  43.9  39.1  47.5  57.9  57.7  66.0  30.3
green   39.3  31.6  31.4  42.4  44.2  49.3  10.3   -    18.9  33.8  36.6  29.3  52.2  47.3  56.0  65.9  67.0  72.5  37.7
teal    32.5  24.2  25.5  24.4  33.4  33.9  24.1  18.9   -    13.6  37.1  35.3  44.3  43.3  46.3  51.3  52.8  42.2  35.4
cyan    31.7  21.8  22.3  12.1  31.4  27.8  39.9  33.8  13.6   -    44.6  47.1  47.7  47.3  49.8  51.3  55.7  47.0  39.1
sand    38.3  32.4  33.7  47.2  47.2  54.6  28.2  36.6  37.1  44.6   -    10.7  16.8  10.1  20.9  37.5  29.5  47.6  11.2
yello   43.3  36.5  36.8  52.3  56.0  64.8  20.5  29.3  35.3  47.1  10.7   -    27.3  20.0  32.2  47.7  41.4  58.1  19.4
peach   37.6  30.5  30.4  43.7  36.3  43.5  43.9  52.2  44.3  47.7  16.8  27.3   -    10.5  11.2  23.2  13.8  33.0  15.5
orang   41.3  34.7  34.8  48.5  45.5  52.8  39.1  47.3  43.3  47.3  10.1  20.0  10.5   -    17.5  34.2  23.7  44.3  15.6
rust    31.8  29.7  33.8  43.6  35.3  40.4  47.5  56.0  46.3  49.8  20.9  32.2  11.2  17.5   -    21.8  10.2  31.7  13.7
rose    31.4  24.9  25.7  38.0  19.1  26.6  57.9  65.9  51.3  51.3  37.5  47.7  23.2  34.2  21.8   -    16.3  10.8  28.5
red     35.3  31.4  33.6  44.9  32.2  37.7  57.7  67.0  52.8  55.7  29.5  41.4  13.8  23.7  10.2  16.3   -    26.0  22.6
pink    31.6  23.9  23.9  36.0  11.9  19.8  66.0  72.5  42.2  47.0  47.6  58.1  33.0  44.3  31.7  10.8  26.0   -    37.6
brown   28.6  25.4  29.9  40.3  37.9  43.7  30.3  37.7  35.4  39.1  11.2  19.4  15.5  15.6  13.7  28.5  22.6  37.6   -
```
