# VS Code file icon theme: how it actually works (verified against VS Code 1.139.1)

**Sources**
- The installed workbench bundle, `<VS Code install folder>/resources/app/out/vs/workbench/workbench.desktop.main.js` (package.json `version: 1.139.1`). Three minified functions were read:
  - The JSON schema `vscode://schemas/icon-theme`.
  - `processIconThemeDocument`, which turns the theme into CSS.
  - `getIconClasses`, the minified `qa(...)`, which gives every explorer, tab or quick-open row its CSS classes.
- `workbench.desktop.main.css`, for how the icon is painted.
- The `package.json` files of the built-in extensions under `resources/app/extensions`, for the language IDs that ship with this version.
- The official guide, code.visualstudio.com/api/extension-guides/file-icon-theme. It agrees with the code except where noted.

**Editing and checking the mapping**
`mapping.json` is edited by hand. It has two lists: `files[]` (`id`, `description`, `fileExtensions`, `fileNames`, `languageIds`) and `folders[]` (`id`, `description`, `names`). New keys go at the end of their list.

`node build.mjs` (repository root; it calls `build-icons.mjs` in this folder) refuses the following, with a message that names the concept and the key, and writes nothing to `./icons` until it is fixed:
- a key or folder name that appears twice, in one concept or in two
- keys that are not lowercase (language ids are the exception: they are compared as written)
- more than one parent segment in a key, spaces, wildcards
- an extension written with its leading dot, and the generic extensions of section 8
- ids that are not lowercase letters, digits, `-` and `_` starting with a letter (an id becomes a file name and an icon id)
- a concept without a drawing, a drawing without a concept, unknown colour tokens, and any markup other than `<path>` (section 9)

There is no simulator in the repository. After the build, `node scripts/check.mjs` checks the generated icon themes (every path resolves, the light and high contrast blocks mirror the base block, no unused SVG). To see how a path resolves, press F5 (`CONTRIBUTING.md`) and look at it; the rules that decide the winner are in section 3.

---

## 1. Contribution

```jsonc
// package.json
"contributes": {
  "iconThemes": [
    { "id": "serena-icons", "label": "Serena Icons", "path": "./icons/serena-icons.json" },
    { "id": "serena-icons-minimal", "label": "Serena Icons Minimal", "path": "./icons/serena-icons-minimal.json" }
  ]
}
// user setting: "workbench.iconTheme": "serena-icons"
```

- `id` and `path` are required. `label` is shown in the picker. `build.mjs` writes this list into `package.json`.
- The two entries are the two **editions** (with logos / original artwork only). They share every association; only the `iconPath` of the concepts that have a logo differs.
- Each edition is **one** icon theme for all color themes. Dark, light and high contrast artwork are switched **inside** the JSON by the `light` and `highContrast` sections (see section 5). A separate "Serena Icons Light" entry is **not** needed.
- `iconPath` is resolved relative to the **folder of the icon-theme JSON**. Use forward slashes, e.g. `"./dark/typescript.svg"`.
- An extension under development (F5, Extension Development Host) is watched: editing the JSON or the SVGs reloads the icons. An installed theme is cached (`iconThemeData` in storage) until it is reloaded.

## 2. Top-level keys (from the schema plus the code)

| key | type | behaviour (code-verified) |
|---|---|---|
| `iconDefinitions` | `{ id: { iconPath } \| { fontCharacter, fontColor, fontSize, fontId } }` | Required: nothing renders without it. Every association value is one of these ids. Unknown ids are silently ignored. |
| `file` | id | Default file icon. |
| `folder` | id | Collapsed folder. |
| `folderExpanded` | id | Open folder. If unset, open folders keep the `folder` icon. |
| `rootFolder` | id | Workspace root, collapsed. Code: `rootFolder \|\| folder`. |
| `rootFolderExpanded` | id | Workspace root, open. Code: `rootFolderExpanded \|\| folderExpanded`. The docs say it falls back to `rootFolder`; the code falls back to `folderExpanded`. |
| `folderNames` / `folderNamesExpanded` | `{ name: id }` | Name match, case-insensitive. Allows **one** parent segment: `"parent/name"`. |
| `rootFolderNames` / `rootFolderNamesExpanded` | `{ name: id }` | Root folders only. Case-insensitive. No parent-segment support. `folderNames` never apply to root folders. |
| `fileExtensions` | `{ ext: id }` | Case-insensitive, no leading dot. Multi-dot keys allowed (`"d.ts"`). One parent segment allowed (`"workflows/yml"`). |
| `fileNames` | `{ name: id }` | Full file name, case-insensitive. One parent segment allowed (`".vscode/settings.json"`). |
| `languageIds` | `{ languageId: id }` | Exact language id, **case-sensitive** (all real ids are lowercase). If `json` is set and `jsonc` is not, `jsonc` automatically reuses `json`. |
| `light` | object with the association keys above | Applied under the `.vs` class, i.e. light color themes (`uiTheme: "vs"`). See section 5. |
| `highContrast` | same | Applied under **both** `.hc-black` and `.hc-light`. |
| `hidesExplorerArrows` | bool | Hides the tree twisties. |
| `showLanguageModeIcons` | bool | See section 7. |
| `fonts` | array | Only for glyph-font themes. Not used by an SVG theme. |
| `usesCurrentColor` | bool | **New; not in the docs.** Every icon is painted as a CSS *mask* filled with `currentColor` (text colour), which makes the theme monochrome. **Do not set it:** Serena icons are multi-colour. |

## 3. How matching works (the mechanism)

VS Code does **not** run a matcher in JavaScript. It gives each row classes, and the theme becomes a CSS stylesheet. The **most specific CSS selector wins**. When two selectors are equally specific, the one **later in the stylesheet** wins.

### 3.1 Classes on a file row, e.g. `repo/src/lib.d.ts` with language `typescript`

```
file-icon  src-name-dir-icon  lib.d.ts-name-file-icon  name-file-icon
d.ts-ext-file-icon  ts-ext-file-icon  ext-file-icon  typescript-lang-file-icon
```

- **Everything is lowercased**, both the element classes and the theme keys: `J.toLowerCase()` in the loader, `path.toLowerCase()` in `getIconClasses`. So `README.md`, `Readme.MD` and `readme.md` are the same key. **Write every key in lowercase.** Mixed-case duplicates just produce duplicate selectors.
- Whitespace in names becomes `/`.
- The **extension classes** are every dot-suffix **after the first segment**. The stem is never an extension:
  - `x.config.js` gets `config.js` and `js`.
  - `config.js` gets only `js`, so `fileExtensions: {"config.js"}` does **not** match a file literally named `config.js`.
  - `serena-dark-color-theme.json` gets only `json`, because hyphens are not dots.
- **Dotfiles:** `.gitignore` gets the extension class `gitignore`, and `.env.local` gets `env.local` and `local`. So `fileExtensions: {"env"}` matches `.env` and `prod.env`.
- Extension classes are skipped for names longer than 255 characters.
- **Parent directory:** only the **immediate** parent is captured, by the regex `/(?:\/|^)(?:([^\/]+)\/)?([^\/]+)$/`. So `".github/workflows"` works as a folder key, but `"a/b/c"` never matches: its class would be `a/b-name-dir-icon`.
- **Language class:** this is the open model's language, or otherwise `guessLanguageIdByFilepathOrFirstLine`. That means languageIds also work for files that are not open (explorer, search, SCM, quick open).
  - The guess is: exact file name, then the **longest glob `filenamePattern`**, then the longest suffix `extension`. It also honours the user's `files.associations`.

### 3.2 Specificity (number of classes; the constant `.show-file-icons` counted)

| association | example selector (base, dark) | specificity |
|---|---|---|
| `file` | `.show-file-icons .file-icon` | 2 |
| `languageIds` | `… .typescript-lang-file-icon.file-icon` | 3 |
| `fileExtensions "ts"` | `… .ts-ext-file-icon.ext-file-icon.file-icon` | 4 |
| `fileExtensions "d.ts"` / `"workflows/yml"` | one more class per extra dot or parent | 5 |
| `fileNames "makefile"` (no dot) | `… .makefile-name-file-icon.name-file-icon.ext-file-icon.file-icon` | 5 |
| `fileNames "package.json"` | the above plus `.json-ext-file-icon` | 6 |
| `fileNames "tsconfig.app.json"` / `".vscode/settings.json"` | +1 per dot or parent | 7 |
| `folder` | `… .folder-icon` | 2 |
| `folderNames "src"` | `… .src-name-folder-icon.folder-icon` | 3 |
| `folderExpanded` | `… .monaco-tl-twistie.collapsible:not(.collapsed) + .monaco-tl-contents .folder-icon` | **6** |
| `folderNamesExpanded "src"` | the above plus `.src-name-folder-icon` | 7 |
| anything in `light` / `highContrast` | adds `.vs` / `.hc-black` / `.hc-light` | +1 |

**Consequences:**
- **Precedence:** file name (with parent, then without) > the longest multi-dot extension (with parent) > the plain extension > language id > `file`. This matches the docs.
- A `fileNames` entry **always** beats any extension for the same file, because it repeats all of that file's extension classes.
- **An extension beats a language.** Mapping `yml` as an extension therefore hides the built-in `dockercompose` language, and mapping `md` hides the built-in `chatagent`/`prompt`/`instructions`/`skill` languages. This drives the "languageIds for YAML and Markdown" decision in section 8.
- **`folderNames` without a matching `folderNamesExpanded`:** the generic open-folder icon wins as soon as the folder is expanded (6 > 3): `folder-src` closed, then plain `folder-open` when expanded. **Always pair every `folderNames` key with a `folderNamesExpanded` key** (the build does).
- Equal-specificity ties resolve by stylesheet order. Rules are emitted **one per icon id, in the order each id is first referenced**: base pass, then light, then highContrast.
  - **Never use purely numeric icon ids** such as `"1"`. JS objects enumerate integer-like keys first, which reorders rules.
  - Two keys of equal specificity that can hit the same file (e.g. `"prompt.yml"` and `"workflows/yml"` for `workflows/x.prompt.yml`) are decided by id order.

## 4. Case sensitivity: summary

- **Case-insensitive** (lowercased on both sides): `fileNames`, `fileExtensions`, `folderNames`, `folderNamesExpanded`, `rootFolderNames`, `rootFolderNamesExpanded`, and the parent segment.
- **Case-sensitive** (exact id): `languageIds`.

## 5. `light` and `highContrast`: the most important trap

The `light` section is processed with the same code, but every selector is prefixed with `.vs` (+1 specificity). It does **not** "fall back per key" in any clean way. The CSS just competes. What the selectors of section 3 give for a theme whose `light` section only has `file`/`folder`/`folderExpanded`:

| file | dark | light | why |
|---|---|---|---|
| `a.ts` | `typescript` | **`typescript` (dark art on the light theme)** | base extension (4) beats light `file` (3) |
| `a.yaml` (languageIds only) | `yaml` | **`file_light`** | tie at 3; the light rule comes later and wins |
| folder `src` | `folder-src` | **`folder_light`** | tie at 3; the later rule wins |

**Rule:** the `light` section must mirror **every** association in the base section, with the same keys and `*_light` icon ids:
- `file`, `folder`, `folderExpanded`, `rootFolder`, `rootFolderExpanded`
- `fileExtensions`, `fileNames`, `languageIds`, `folderNames`, `folderNamesExpanded`, and root names if used

`build-icons.mjs` generates the base, `light` and `highContrast` sections from the same lists, so they cannot drift apart.

**High contrast:**
- `highContrast` is applied to **both** `hc-black` and `hc-light`, so one set of artwork has to suit both.
- The theme-type class is exactly one of `vs`, `vs-dark`, `hc-black` or `hc-light` (confirmed in the bundle), so `light` never applies to `hc-light`.
- **Serena ships a `highContrast` section** built from `tokens.json` → `hc`: one set of equal luminance, 4.0–4.1:1 on `#ffffff` (Serena High Contrast Light) and 4.8–4.9:1 on `#0b0c12` (Serena High Contrast), and still at least 3.15:1 on the selected row of either theme (WCAG non-text minimum 3:1). In hc mode the build also raises `.5` opacities to `.85`; chip tiles stay at `.2`. Numbers: `system/style.md`, section 16.

## 6. Folders

- The root folder uses `rootFolder*` and falls back to `folder`/`folderExpanded`. `folderNames` does not apply to the root.
- Recommended: set `rootFolder` = `folder` and `rootFolderExpanded` = `folderExpanded`, or point them at a subtly marked "root" variant.
- **Every `folderNames` key needs a `folderNamesExpanded` key** (section 3.2). An "open" artwork per folder concept is expected: open folder silhouette plus the same badge.
- `hidesExplorerArrows`: keep it `false`, the default. The twistie is the clearest open/closed cue at 16px.

## 7. `showLanguageModeIcons`

The code computes `p = showLanguageModeIcons === true || (themeHasFileIcons && showLanguageModeIcons !== false)`. When `p` is true, every registered language **not** listed in the theme's `languageIds` that ships its own icon (`contributes.languages[].icon`, from third-party extensions; no built-in language in 1.139 has one) gets that foreign icon at specificity 3.

**Recommendation: `"showLanguageModeIcons": false`** for a visually coherent set. The mapping's `code` concept catches the common other languages by id.

## 8. Mapping strategy used in `mapping.json`

- **Deterministic first.** Use `fileNames` for special files, and `fileExtensions` for most formats. Glob patterns are not supported, so variant families are enumerated:
  - `tsconfig.*.json`, `appsettings.*.json`, `requirements*.txt`, `application-*.yml`, `docker-compose.*.yml`
  - `*.config.{js,mjs,cjs,ts,mts,cts}` needs no enumeration: the two-segment extension keys `config.js` … `config.cts` (specificity 5) give every tool config the config icon, and a named file such as `vite.config.ts` (7) still wins. `vite.config.d.ts` and `x.config.test.ts` are not caught, because `config.ts` is not a suffix of those names.
- **A key appears once in the whole file** (the build refuses repeats). Before adding one, work out with section 3 what a file with that name or extension shows today and which rule would win afterwards.
- **languageIds where the built-in language system knows more than an extension can.** These languages ship with 1.139:

  | language id | files it catches |
  |---|---|
  | `dockercompose` | `compose.yml`, `compose.*.yml`, `*docker*compose*.yml` (and `.yaml`) |
  | `dockerfile` | `Dockerfile`, `Containerfile`, `Dockerfile.*`, `*.dockerfile` |
  | `dotenv` | `.env`, `.env.*`, `*.env`, `.flaskenv` |
  | `makefile` | `Makefile`, `GNUmakefile`, `*.mk`, `*.mak` |
  | `ignore` | `.gitignore`, `.npmignore`, `.vscodeignore`, `.copilotignore` |
  | `chatagent` | `*.agent.md`, `**/.claude/agents/*.md`, `**/.github/agents/*.md` |
  | `instructions` | `*.instructions.md`, `**/.claude/rules/**/*.md` |
  | `prompt` | `*.prompt.md` |
  | `skill` | `SKILL.md` |
  | `properties` | `.conf`, `.properties`, `.cfg`, `.editorconfig`, `.gitattributes`, `.npmrc` |
  | `jsonc` | `tsconfig.*.json`, `.eslintrc`, `.babelrc`, `*color-theme.json` |
  | `groovy` | `Jenkinsfile*`, `*.gradle` |

- **YAML is mapped by `languageIds` only** (`yaml`, `ansible`, `home-assistant` …), **not** by `fileExtensions yml/yaml`. That way any compose file (built-in `dockercompose`), GitHub workflow, Azure pipeline or Helm template can win when their languages exist. `workflows/yml` (parent-folder extension, specificity 5) makes GitHub workflows deterministic anyway.
  - The price: a YAML file whose language id is **not listed** matches nothing and shows the blank page. Every YAML-dialect id that an extension assigns must therefore be listed (`esphome`, `manifest-yaml`, `spring-boot-properties-yaml`, `concourse-pipeline-yaml` … are). The same holds for the 50-odd languages of the `code` concept, which is why it also lists their extensions (`sol`, `erl`, `f90` …).
- **Markdown is mapped by `languageIds` only** (the `markdown` concept also has the extensions `mdx`, `rst`, `adoc`, `asciidoc`, `org` and `qmd`; plain `md` is an extension key only with a parent folder, `agents/md`, `prompts/md` … for the `ai` concept), so the AI prompt and agent languages win. README, CHANGELOG, LICENSE and CLAUDE.md are `fileNames` and win regardless.
- **Do not map generic "environment" extensions**: `dev`, `prod`, `local`, `example`, `template`, `sample`, `dist`, `bak`, `old`, `orig`. They would hijack `Dockerfile.dev` and `.env.local`. The build refuses them.
- **Not expressible** (no glob, and the stem is never an extension). These keep their base-language icon:
  - `x_test.go`, `test_x.py`, `x_test.py`, `FooTests.cs`, `FooTest.java`
  - `*.Tests` project folders
  - `*-color-theme.json` outside a `themes/` folder: the extension keys `color-theme.json`, `icon-theme.json` and `product-icon-theme.json` only match the dotted form (`my.color-theme.json`); `serena-dark-color-theme.json` has the single extension `json` and gets the theme icon through `themes/json`.
- **Parent-folder rules used** (one parent segment, written `parent/name`):
  - Files: `.vscode/settings.json` (and `launch`, `tasks`, `extensions`), `.circleci/config.yml`, `.claude-plugin/plugin.json`, `vendor/modules.txt` …
  - Files that are named elsewhere but mean something else inside a workflows folder: a named file (6) beats `workflows/yml` (5), so `workflows/dependabot.yml`, `workflows/codecov.yml`, `workflows/docker-compose.yml` … repeat the name with the parent (7) to stay GitHub Actions. A plain name that is mapped as `.yml` and as `.yaml` needs both spellings there.
  - Extensions: `workflows/yml`, `themes/json`, `k8s/yaml`, `requirements/txt`, `agents/md`, `.azure-pipelines/yml` … A parent-qualified extension (5) loses to any named file (6+), so `k8s/kustomization.yaml` and `agents/README.md` keep their own icons.
  - Folders: `.github/prompts`, `.github/actions`, `.claude/rules`, `.cursor/commands` …
  - These keys are ignored, silently and harmlessly, by old VS Code versions that predate the feature. The project's `engines.vscode ^1.80.0` stays valid, but raise it (e.g. `^1.90.0`) if exact behaviour on old hosts matters.
- **`folderNames` do not apply to the roots of a multi-root workspace** (section 6): those always show the plain folder. `rootFolderNames` is not generated.

## 9. SVG and rendering facts

- Painting uses `content: '\2001'` plus `background-image: url(<iconPath>)`. From `workbench.desktop.main.css`: `.monaco-icon-label:before { background-size: 16px; background-position: left center; background-repeat: no-repeat; width: 16px; height: 22px; padding-right: 6px }`.
  - The image is scaled to **16 CSS px wide**; its height follows the SVG's aspect ratio.
  - It is vertically centred in a 22px row. Breadcrumbs use 18px rows.
  - Some chat and inline surfaces use `background-size: contain` or the compact codicon size (~14px), so icons are occasionally drawn a bit smaller than 16px.
- Therefore **use a square viewBox `0 0 16 16`**. A non-square viewBox is scaled by width and shifts vertically. `width="16" height="16"` on the root is optional but harmless (recommended for tooling).
- SVGs are loaded as CSS background images:
  - No script, and no external or `href` resources (they would not load anyway).
  - No `<text>`: fonts are unavailable, so text renders in a fallback font or not at all.
  - Filters and masks work but are slower and blur at 1x. Avoid them, as the design rules say.
  - `build-icons.mjs` enforces all of this: an icon is a list of `<path .../>` elements with the attributes `d`, `fill`, `stroke`, `fill-rule`, `fill-opacity`, `stroke-opacity`, `stroke-width`, `stroke-linecap`, `stroke-linejoin`. Anything else stops the build with the name of the icon.
- **Pixel grid:**
  - At 100% zoom, 1 unit = 1 device px, so odd-width strokes go on .5 coordinates.
  - At 200%, everything doubles and stays crisp.
  - **Windows defaults to 125% or 150% display scaling.** 1 unit = 1.25 or 1.5 px, so no grid can be perfect there. Prefer shapes that survive it: ≥1.5px strokes for key strokes, ≥2px gaps between parallel strokes, no single-pixel details that carry meaning. Check renders at 20px and 24px as well as 16px and 32px.
- The icon sits next to the label text; `padding-right: 6px` is added by VS Code. Keep a little optical breathing room, but avoid huge margins: the glyph should use roughly x 1–15, y 1–15.

## 10. What `build-icons.mjs` writes

1. One SVG per drawing and mode: `icons/dark|light|hc/<name>.svg` for the original artwork and `icons/logos/dark|light|hc/<name>.svg` for the concepts that have a logo. A file concept is named by its id; a folder concept by `folder-<id>` and `folder-<id>-open` (the default folder is just `folder` / `folder-open`).
2. `iconDefinitions` with the ids `<name>`, `<name>_light` and `<name>_hc` (never numeric), each with an `iconPath` relative to the JSON file. In `serena-icons.json` a concept with a logo points to `./logos/<mode>/…`; a concept without one points to the original drawing, which is the normal case. `serena-icons-minimal.json` always points to the original drawing.
3. Base section:
   - `file: "file"`, `folder: "folder"`, `folderExpanded: "folder-open"`, `rootFolder`/`rootFolderExpanded` set to the same.
   - `fileExtensions`, `fileNames` and `languageIds` from `files[]`.
   - `folderNames` and `folderNamesExpanded` from `folders[].names`: `folder-<id>` and `folder-<id>-open`.
4. `light` and `highContrast` sections: the complete mirror of step 3, with `_light` and `_hc` ids.
5. `"showLanguageModeIcons": false` and `"hidesExplorerArrows": false`.

Everything is computed first and written only when there are no errors. A file is rewritten only when its content changes, and files that are no longer generated are deleted, so `git status` after a build shows exactly what the change did.
