// Serena Theme: renders the images of the store page (README.md) and of the GitHub social preview.
//
//   images/hero.png                 Serena Dark in a VS Code window, on a backdrop                 2000 x 1250
//   images/palette.png              the six themes side by side, one column per color meaning      1600 x 660
//   images/screenshots/<theme>.png  one window per theme, all six aligned pixel by pixel          2000 x 1300
//   images/screenshots/serena-icons.png           Serena Icons, on a dark and a light theme        1600 x 1232
//   images/screenshots/serena-icons-minimal.png   Serena Icons Minimal, also in high contrast      1600 x 1340
//   images/social-preview.png       for GitHub: Settings > General > Social preview                1280 x 640
//
// Everything is drawn from the files "node build.mjs" generates: the colors come from themes/*.json and
// src/variants/*.mjs, the icons from icons/ through the icon theme JSON (resolved the way VS Code resolves
// them), and the code is colored by the real TextMate grammars with the generated theme (see lib/code.mjs).
// The windows are drawings of VS Code, not captures of it (see lib/workbench.mjs).
//
// This is not part of "node build.mjs" and nothing here is packaged. Run it by hand after a change of colors
// or icons, look at the images, then record the colors they were made from:
//
//   node build.mjs
//   node scripts/store/render.mjs --tools <folder>
//   node scripts/check.mjs --stamp-screenshots
//
// It needs:
//   - Node 22 or newer.
//   - The npm package "shiki" (made with version 4.4; it brings the grammars VS Code uses). The repository has
//     no dependencies, so install it anywhere outside it (npm install shiki@4, in an empty folder) and pass
//     that folder with --tools <folder> or in the environment variable SERENA_STORE_TOOLS. Without either,
//     the script looks for node_modules/shiki in the repository (node_modules/ is ignored by git). Only the
//     node_modules of that one folder counts: a "shiki" that Node would find in a parent folder is not loaded.
//   - Google Chrome, Chromium or Microsoft Edge, used headless as the rasterizer (no window opens, and it gets
//     a throw-away profile). Looked for in the usual places (on Windows C:\Program Files\Google\Chrome\
//     Application\chrome.exe); otherwise pass --chrome <path> or set CHROME_PATH.
//     The profile is a new folder in the system's temporary folder and is deleted when the run ends, also
//     with --work: Chrome writes the user name and local paths into it.
//   - The fonts Cascadia Code (it comes with Windows Terminal) and Segoe UI. Without them the script warns and
//     the text falls back to Consolas or the system font: the committed images were made on Windows 11.
//
// Usage:
//   node scripts/store/render.mjs [hero] [palette] [screenshots] [icons] [social]   (no name: all of them)
//     --tools <folder>    where "shiki" is installed
//     --chrome <path>     the browser to use
//     --out <folder>      write there instead of images/ (same file names), to look before replacing
//     --work <folder>     keep the HTML pages and the raw captures there (default: a temporary folder, deleted).
//                         The folder must be outside the repository, so that nothing of a render can be
//                         committed or packaged; the browser profile is never kept.
//
// The file names in images/screenshots/ are part of the published store pages (their README points to the
// main branch): regenerate them in place, never rename or delete them.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { capture, findChrome, installedFonts, misfits, save } from "./lib/chrome.mjs";
import { createCode } from "./lib/code.mjs";
import { loadIconTheme, loadThemes } from "./lib/theme.mjs";
import { CODE_FONT, UI_FONT, WORKBENCH_CSS, esc, workbench } from "./lib/workbench.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..", "..");

// ── Arguments ────────────────────────────────────────────────────────────────────────
const PAGES = ["hero", "palette", "screenshots", "icons", "social"];
const args = process.argv.slice(2);
const option = (name) => {
  const at = args.indexOf(name);
  if (at < 0) return undefined;
  const [, value] = args.splice(at, 2);
  if (!value) throw new Error(`${name} needs a value`);
  return value;
};
const tools = option("--tools") ?? process.env.SERENA_STORE_TOOLS;
const chrome = findChrome(option("--chrome"));
const outDir = path.resolve(option("--out") ?? path.join(root, "images"));
const keptWork = option("--work");
const wanted = args.length ? args : PAGES;
for (const name of wanted) if (!PAGES.includes(name)) throw new Error(`unknown image "${name}" (the images are: ${PAGES.join(", ")})`);

// True when `child` is `parent` or a path inside it.
const isInside = (parent, child) => {
  const rel = path.relative(path.resolve(parent), path.resolve(child));
  return rel === "" || (rel !== ".." && !rel.startsWith(".." + path.sep) && !path.isAbsolute(rel));
};
// What --work keeps (pages and raw captures) is not part of the project: outside the repository, "git add -A"
// cannot stage it and it cannot be packaged.
if (keptWork && isInside(root, keptWork)) throw new Error("--work must be a folder outside the repository");

const workDir = keptWork ? path.resolve(keptWork) : fs.mkdtempSync(path.join(os.tmpdir(), "serena-store-"));
// The browser profile is never inside --work: Chrome writes the user name and local paths into it.
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "serena-store-profile-"));

async function loadShiki() {
  for (const base of [tools, root].filter(Boolean)) {
    let entry;
    let modules;
    try {
      entry = fs.realpathSync(createRequire(path.join(path.resolve(base), "package.json")).resolve("shiki"));
      modules = path.join(fs.realpathSync(path.resolve(base)), "node_modules");
    } catch { continue; /* not installed there: try the next place */ }
    // Node also looks in the node_modules of every parent folder, up to the root of the drive, and this script
    // would run whatever "shiki" it finds there: only the folder that was asked for counts.
    if (!isInside(modules, entry)) continue;
    return await import(pathToFileURL(entry).href);
  }
  throw new Error('the npm package "shiki" was not found: install it in a folder outside the repository and pass --tools <folder> (a copy in the node_modules of a parent folder is not used)');
}

// ── What the windows show ────────────────────────────────────────────────────────────
// A small web shop. Rows of the Explorer, top to bottom, in VS Code's order (folders first, then by name).
const FOLDER = "shop";
const TREE = [
  [1, ".github", "closed"],
  [1, "src", "open"],
  [2, "components", "open"],
  [3, "Cart.test.tsx", "file"],
  [3, "Cart.tsx", "file"],
  [3, "CartLine.tsx", "file"],
  [2, "api.ts", "file"],
  [2, "index.css", "file"],
  [2, "main.tsx", "file"],
  [1, "tests", "closed"],
  [1, ".env", "file"],
  [1, ".gitignore", "file"],
  [1, "docker-compose.yml", "file"],
  [1, "Dockerfile", "file"],
  [1, "package.json", "file"],
  [1, "README.md", "file"],
  [1, "tailwind.config.ts", "file"],
  [1, "tsconfig.json", "file"],
  [1, "vite.config.ts", "file"],
];
const TABS = [{ name: "Cart.tsx", parent: "components" }, { name: "api.ts", parent: "src" }, { name: "index.css", parent: "src" }];
const SIDE_WIDTH = 204;

const semantic = JSON.parse(fs.readFileSync(path.join(here, "samples", "semantic.json"), "utf8"));
const sample = (name, language, parent) => ({
  name,
  language,
  parent,
  code: fs.readFileSync(path.join(here, "samples", name), "utf8").replace(/\r\n/g, "\n").replace(/\n$/, ""),
  semantic: semantic[name],
});
const CART = sample("Cart.tsx", "tsx", "components");
const API = sample("api.ts", "typescript", "src");

// The window of one theme showing one sample, with the cursor at the end of a line.
function windowOf(ctx, theme, file, cursorLine, { width, height, style, sideWidth = SIDE_WIDTH }) {
  const lines = ctx.code.lines(file, theme);
  // The samples are there to show every color meaning: stop when a change to them or to the rules loses one.
  const shown = new Set(lines.flat().map((run) => run.color.toLowerCase()));
  for (const [role, color] of Object.entries(theme.roles)) {
    if (!shown.has(color.toLowerCase())) throw new Error(`${file.name} in ${theme.label}: nothing is colored with the role "${role}" any more`);
  }
  return workbench({
    theme,
    icons: ctx.icons,
    width,
    height,
    sideWidth,
    folder: FOLDER,
    tree: TREE,
    tabs: TABS,
    active: file.name,
    activeParent: file.parent,
    language: file.language,
    lines,
    cursor: { line: cursorLine, column: file.code.split("\n")[cursorLine - 1].length },
    style,
  });
}

// The page measures the code font so that the cursor and the indent guides sit on the characters.
const MEASURE = `<script>
const probe = document.createElement("span");
probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;font:14px ${CODE_FONT.replace(/"/g, '\\"')};font-variant-ligatures:none';
probe.textContent = "0".repeat(100);
document.body.append(probe);
document.documentElement.style.setProperty("--char", probe.getBoundingClientRect().width / 100 + "px");
probe.remove();
</script>`;
const page = ({ width, height, css = "", body }) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
html, body { margin: 0; width: ${width}px; height: ${height}px; overflow: hidden; background: transparent; }
${WORKBENCH_CSS}
${css}
</style></head><body>${body}${MEASURE}</body></html>`;

// Calm backdrop behind the hero and the social preview: the lavender, blue and teal of the palette, darkened.
// Dark enough to stand out on a white page and light enough to stand out on a dark one.
const BACKDROP = "linear-gradient(135deg, #4a3b73 0%, #2d4a73 50%, #28595c 100%)";

// A visible edge on white pages and on dark ones: the theme's own widget border (the window border in high contrast).
const edgeOf = (theme) => theme.color(theme.has("window.activeBorder") ? "window.activeBorder" : "widget.border");

// ── The images ───────────────────────────────────────────────────────────────────────
// Sizes are in CSS pixels; the captures have twice as many device pixels.
const renderers = { hero, palette, screenshots, icons, social };

function hero(ctx) {
  const theme = ctx.theme("serena-dark");
  const width = 1000, height = 625;
  const window = windowOf(ctx, theme, CART, 9, {
    width: 920,
    height: 550,
    style: `border-radius:9px;box-shadow:0 0 0 1px ${theme.color("widget.border")},0 22px 48px rgba(0,0,0,.42)`,
  });
  const css = `.backdrop { width: 100%; height: 100%; display: grid; place-items: center; padding-bottom: 6px; box-sizing: border-box; border-radius: 10px; background: ${BACKDROP}; }`;
  return [{ file: "hero.png", width, height, html: page({ width, height, css, body: `<div class="backdrop">${window}</div>` }) }];
}

function screenshots(ctx) {
  const width = 1000, height = 650;
  return ctx.themes.map((theme) => ({
    file: `screenshots/${theme.id}.png`,
    width,
    height,
    html: page({ width, height, body: windowOf(ctx, theme, API, 24, { width, height, style: `border-radius:8px;border:1px solid ${edgeOf(theme)}` }) }),
  }));
}

function palette(ctx) {
  const width = 800, height = 330;
  // One column per meaning: its title, the role of src/variants/*.mjs and a short sample.
  const columns = [
    ["Keywords", "keyword", "const"],
    ["Functions", "func", "render()"],
    ["Strings", "string", '"text"'],
    ["Numbers", "constant", "42"],
    ["Types", "type", "Order"],
    ["Properties", "property", ".total"],
    ["Tags / this", "special", "<div>"],
    ["Parameters", "param", "items"],
    ["Comments", "comment", "// note"],
  ];
  // Italic where the theme says so: comments (TextMate rule) and parameters (semantic rule).
  const italic = (theme, role) => {
    if (role === "param") return theme.json.semanticTokenColors?.parameter?.italic === true;
    if (role !== "comment") return false;
    return theme.json.tokenColors.some((rule) => [].concat(rule.scope ?? []).includes("comment") && /italic/.test(rule.settings?.fontStyle ?? ""));
  };
  const rows = ctx.themes.map((theme) => {
    const cells = columns.map(([, role, text]) => {
      const color = theme.roles[role];
      return `<div class="cell" style="color:${color}${italic(theme, role) ? ";font-style:italic" : ""}"><span>${esc(text)}</span><i style="background:${color}"></i></div>`;
    }).join("");
    return `<div class="row" style="background:${theme.color("editor.background")};border-color:${edgeOf(theme)}"><div class="name" style="color:${theme.color("editor.foreground")}">${esc(theme.label)}</div>${cells}</div>`;
  }).join("");
  // The card behind the rows is the side bar of Serena Dark, so its rows sit on it as the editor does in the window.
  const dark = ctx.theme("serena-dark");
  const css = `
.card { width: 100%; height: 100%; box-sizing: border-box; padding: 5px 9px 0; border: 1px solid ${edgeOf(dark)}; border-radius: 10px; background: ${dark.color("sideBar.background")}; font: 12px/1.3 ${UI_FONT}; }
.head, .row { display: grid; grid-template-columns: 170px repeat(9, 1fr); align-items: center; }
.head { height: 30px; color: ${dark.color("descriptionForeground")}; font-size: 11px; text-align: center; }
.row { height: 43px; margin-bottom: 5px; border: 1px solid; border-radius: 6px; box-sizing: border-box; }
.name { padding-left: 14px; font-weight: 600; white-space: nowrap; }
.cell { display: grid; justify-items: center; gap: 4px; font: 13px/17px ${CODE_FONT}; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; white-space: pre; }
.cell i { width: 44px; height: 5px; border-radius: 3px; }`;
  const head = `<div class="head"><span></span>${columns.map(([title]) => `<span>${esc(title)}</span>`).join("")}</div>`;
  return [{ file: "palette.png", width, height, html: page({ width, height, css, body: `<div class="card">${head}${rows}</div>` }) }];
}

function icons(ctx) {
  // The store pages show the README about 727 px wide, so the sheet is laid out 800 px wide: the names under
  // the icons (11.5 px here) are then shown at about 10.5 px. Eight icons per row leave each name a cell of
  // about 95 px.
  const width = 800, COLUMNS = 8;
  // A sheet is a stack of panels, one per color theme; a panel has rows of eight icons.
  // A name ending in "/" is a folder. "parent/name" is a file that gets its icon from the folder it is in, so
  // the name under the icon shows the folder too.
  const row = (caption, edition, names) => ({ caption, edition, names });
  const panel = (themeId, title, rows) => ({ theme: ctx.theme(themeId), title, rows });
  const both = ["main.ts", "app.js", "index.html", "styles.css", "index.php", "app.rb", "App.svelte", ".gitignore"];
  const sheets = {
    "screenshots/serena-icons.png": [
      panel("serena-dark", "Serena Icons", [
        row("Languages", ctx.icons, ["main.ts", "app.js", "index.html", "styles.css", "index.php", "app.rb", "main.zig", "notes.md"]),
        row("Frameworks and build tools", ctx.icons, ["angular.json", "app.component.ts", "App.svelte", "nuxt.config.ts", "artisan", "tailwind.config.ts", "nest-cli.json", "Card.stories.tsx"]),
        row("Tools and package managers", ctx.icons, [".gitignore", ".prettierrc", "pnpm-lock.yaml", "yarn.lock", "deno.json", "CMakeLists.txt", "biome.json", "nuget.config"]),
        row("Folders", ctx.icons, [".git/", ".angular/", ".nuxt/", ".svelte-kit/", ".storybook/", ".yarn/", ".cursor/", "android/"]),
      ]),
      // Where the owner of a brand does not allow a redrawn logo, Serena Icons has an icon of its own.
      panel("serena-light", "Serena Icons", [
        row("Languages with an original icon", ctx.icons, ["main.py", "main.go", "main.rs", "Main.kt", "App.java", "Program.cs", "App.tsx", "App.vue"]),
        row("Tools with an original icon", ctx.icons, ["Dockerfile", "compose.yml", "package.json", "next.config.js", "vite.config.ts", "eslint.config.js", "CLAUDE.md", "workflows/ci.yml"]),
      ]),
    ],
    "screenshots/serena-icons-minimal.png": [
      panel("serena-dark", "Serena Icons Minimal", [
        row("Languages and tools", ctx.minimal, both),
        row("For comparison: the same files in Serena Icons, with logos", ctx.icons, both),
        row("Data and configuration", ctx.minimal, ["data.json", "config.yaml", "schema.xml", "query.sql", ".env", "tsconfig.json", "Makefile", "deploy.sh"]),
        row("Documents and media", ctx.minimal, ["README.md", "LICENSE", "CHANGELOG.md", "report.pdf", "photo.png", "logo.svg", "clip.mp4", "backup.zip"]),
      ]),
      panel("serena-high-contrast", "Serena Icons Minimal", [
        row("Folders", ctx.minimal, ["src/", "components/", "api/", "tests/", "docs/", "public/", "config/", "node_modules/"]),
      ]),
      panel("serena-high-contrast-light", "Serena Icons Minimal", [
        row("Files", ctx.minimal, ["main.ts", "app.js", "index.html", "styles.css", "main.py", "main.go", "Dockerfile", "package.json"]),
      ]),
    ],
  };
  const PAD = 14, TITLE = 26, CAPTION = 24, CELLS = 62, BOTTOM = 4, GAP = 8, BORDER = 1;
  const css = `
.sheet { display: grid; gap: ${GAP}px; font: 12px/1.3 ${UI_FONT}; }
.panel { box-sizing: border-box; padding: ${PAD}px 20px ${BOTTOM}px; border: ${BORDER}px solid; border-radius: 8px; }
.panel .title { height: ${TITLE}px; display: flex; justify-content: space-between; align-items: baseline; font-size: 15px; font-weight: 600; }
.panel .title small { font-size: 12px; font-weight: 400; }
.panel .caption { height: ${CAPTION}px; font-size: 11px; line-height: 16px; letter-spacing: .06em; text-transform: uppercase; }
.panel .cells { height: ${CELLS}px; display: grid; grid-template-columns: repeat(${COLUMNS}, 1fr); }
.panel .cell { display: grid; justify-items: center; align-content: start; gap: 5px; font-size: 11.5px; white-space: nowrap; overflow: hidden; }
.panel .cell img { width: 32px; height: 32px; display: block; }`;
  return Object.entries(sheets).map(([file, panels]) => {
    let height = (panels.length - 1) * GAP;
    const body = panels.map(({ theme, title, rows }) => {
      height += 2 * BORDER + PAD + TITLE + rows.length * (CAPTION + CELLS) + BOTTOM;
      const muted = theme.color("descriptionForeground");
      const blocks = rows.map(({ caption, edition, names }) => {
        if (names.length !== COLUMNS) throw new Error(`${file}: the row "${caption}" has ${names.length} names, a row takes ${COLUMNS}`);
        const cells = names.map((entry) => {
          const folder = entry.endsWith("/");
          const shown = entry.replace(/\/$/, "");
          const [name, parent = ""] = shown.split("/").reverse();
          const icon = folder ? edition.folderIcon(theme.iconMode, name, { parent }) : edition.fileIcon(theme.iconMode, name, { parent });
          // A sheet must not show the default icon by accident (a name without an association).
          if (icon.rule === "file" || icon.rule === "folder") throw new Error(`${file}: "${entry}" has no icon of its own in ${edition.file}`);
          return `<div class="cell"><img src="${icon.uri}" alt=""><span>${esc(shown)}</span></div>`;
        }).join("");
        return `<div class="caption" style="color:${muted}">${esc(caption)}</div><div class="cells">${cells}</div>`;
      }).join("");
      return `<div class="panel" style="background:${theme.color("sideBar.background")};color:${theme.color("sideBar.foreground")};border-color:${edgeOf(theme)}">`
        + `<div class="title" style="color:${theme.color("sideBarTitle.foreground")}"><span>${esc(title)}</span><small style="color:${muted}">on ${esc(theme.label)}</small></div>${blocks}</div>`;
    }).join("");
    // The names must fit their cells, with a little air between neighbours: a cell cuts what does not fit.
    return { file, width, height, html: page({ width, height, css, body: `<div class="sheet">${body}</div>` }), fits: { selector: ".panel .cell span", margin: 1 } };
  });
}

function social(ctx) {
  const theme = ctx.theme("serena-dark");
  const width = 640, height = 320;
  // The window without the Explorer, running off the right and bottom edges.
  const window = windowOf(ctx, theme, CART, 9, {
    width: 920,
    height: 550,
    sideWidth: 0,
    style: `position:absolute;left:296px;top:42px;border-radius:9px;box-shadow:0 0 0 1px ${theme.color("widget.border")},0 18px 40px rgba(0,0,0,.4)`,
  });
  const logo = "data:image/png;base64," + fs.readFileSync(path.join(root, "images", "icon.png")).toString("base64");
  const few = ["main.ts", "index.html", "styles.css", "main.py", "main.go", "Dockerfile", "notes.md"].map((name) => ctx.icons.fileIcon("dark", name).uri);
  few.push(ctx.icons.folderIcon("dark", "src").uri);
  const css = `
.card { position: relative; width: 100%; height: 100%; overflow: hidden; background: ${BACKDROP}; font-family: ${UI_FONT}; }
.text { position: absolute; left: 34px; top: 0; bottom: 0; width: 250px; display: flex; flex-direction: column; justify-content: center; }
.text .logo { width: 56px; height: 56px; margin-bottom: 14px; }
.text h1 { margin: 0; font-size: 34px; font-weight: 600; line-height: 1.15; color: ${theme.color("terminal.ansiBrightWhite")}; }
.text p { margin: 8px 0 0; font-size: 15px; line-height: 1.35; color: ${theme.color("foreground")}; }
.text p.small { font-size: 11.5px; }
.text .icons { display: flex; gap: 9px; margin-top: 18px; }
.text .icons img { width: 20px; height: 20px; }`;
  const body = `<div class="card"><div class="text"><img class="logo" src="${logo}" alt=""><h1>Serena Theme</h1>`
    + `<p>Calm pastel themes and icons<br>for VS Code</p><p class="small">Dark · Light · Vivid · AAA high contrast</p>`
    + `<div class="icons">${few.map((uri) => `<img src="${uri}" alt="">`).join("")}</div></div>${window}</div>`;
  return [{ file: "social-preview.png", width, height, html: page({ width, height, css, body }) }];
}

// ── Run ──────────────────────────────────────────────────────────────────────────────
try {
  const fonts = installedFonts({ chrome, workDir, profileDir, families: ["Cascadia Code", "Segoe UI"] });
  for (const [family, installed] of Object.entries(fonts)) if (!installed) console.warn(`warning: the font "${family}" is not installed: the images will not look like the committed ones`);

  const themes = await loadThemes(root);
  const ctx = {
    themes,
    theme: (id) => themes.find((theme) => theme.id === id) ?? (() => { throw new Error(`no theme "${id}"`); })(),
    icons: loadIconTheme(root, "serena-icons.json"),
    minimal: loadIconTheme(root, "serena-icons-minimal.json"),
    code: await createCode(await loadShiki(), themes),
  };
  for (const name of wanted) {
    for (const { file, width, height, html, fits } of renderers[name](ctx)) {
      const pageName = file.replace(/[\\/]/g, "-").replace(/\.png$/, "");
      if (fits) {
        const cut = misfits({ chrome, workDir, profileDir, name: pageName, html, width, height, ...fits });
        if (cut.length) throw new Error(`${file}: no room for ${cut.map((text) => `"${text}"`).join(", ")}: use a shorter name`);
      }
      const image = capture({ chrome, workDir, profileDir, name: pageName, html, width, height });
      const bytes = save(image, path.join(outDir, file));
      console.log(`ok  ${path.relative(root, path.join(outDir, file)).split(path.sep).join("/")}  ${image.width}x${image.height}  ${bytes} bytes`);
    }
  }
} finally {
  // The profile always goes; the work folder stays only with --work. Chrome may still hold its profile for a
  // moment after it exits: retry, and never fail the run over it.
  for (const dir of keptWork ? [profileDir] : [profileDir, workDir]) {
    try { fs.rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 }); } catch { /* a leftover temporary folder */ }
  }
}
