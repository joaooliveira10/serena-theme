// A VS Code window as HTML: title bar, activity bar, Explorer, tabs, editor and status bar.
//
// It is a drawing, not a capture. The measures are VS Code's own on Windows at 100% zoom (13 px interface
// text, 14 px code on 19 px lines, 22 px rows, 35 px tabs, 48 px activity bar, the editor gutter computed as
// the editor computes it), every color is read from the generated theme file, and the icons are the SVG
// files of the icon theme. The small interface glyphs (search, gear, close...) are simple drawings made
// for these images. The window is shown as with the minimap, the breadcrumbs and sticky scroll turned off,
// the keyboard focus in the editor and "Cascadia Code" as the editor font, and the title bar is drawn
// without the application icon, the Command Center and the layout buttons; everything else is the
// default, including bracket pair colors and indent guides.

export const esc = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const UI_FONT = `"Segoe WPC", "Segoe UI", system-ui, sans-serif`;
export const CODE_FONT = `"Cascadia Code", "Cascadia Mono", Consolas, "Courier New", monospace`;

// ── Editor measures ──────────────────────────────────────────────────────────────────
const FONT_SIZE = 14;
const LINE_HEIGHT = 19;
const CHAR = 0.5859375 * FONT_SIZE; // advance of Cascadia Code; overridden by --char when the page measures the font
const GLYPH_MARGIN = LINE_HEIGHT; // editor.glyphMargin
const NUMBERS = Math.round(5 * CHAR); // editor.lineNumbersMinChars = 5
const DECORATIONS = 10 + 16; // editor.lineDecorationsWidth + the folding column
const SCROLLBAR = 14; // the lane of the vertical scrollbar and the overview ruler: the current line stops there
export const CONTENT_LEFT = GLYPH_MARGIN + NUMBERS + DECORATIONS;
export const EDITOR = { FONT_SIZE, LINE_HEIGHT, CHAR };

// ── Glyphs ───────────────────────────────────────────────────────────────────────────
const svg = (size, body, extra = "") => `<svg class="glyph" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ${extra}>${body}</svg>`;
const gearTeeth = Array.from({ length: 8 }, (_, k) => {
  const a = (k * Math.PI) / 4;
  const p = (r) => `${(12 + r * Math.cos(a)).toFixed(2)} ${(12 + r * Math.sin(a)).toFixed(2)}`;
  return `M${p(6.6)}L${p(9)}`;
}).join("");
const GLYPH = {
  files: svg(24, `<path d="M9.5 4.5h6l3.5 3.5v9h-3"/><path d="M5 8h6.5l3.5 3.5v8H5z"/>`, `stroke-width="1.3"`),
  search: svg(24, `<circle cx="10.5" cy="10.5" r="5.5"/><path d="M14.6 14.6 20 20"/>`, `stroke-width="1.3"`),
  sourceControl: svg(24, `<circle cx="7.5" cy="5.5" r="2"/><circle cx="7.5" cy="18.5" r="2"/><circle cx="16.5" cy="8.5" r="2"/><path d="M7.5 7.5v9M16.5 10.5c0 4-9 2.500-9 6"/>`, `stroke-width="1.3"`),
  debug: svg(24, `<path d="M9 5.500 19 12 9 18.500z"/><circle cx="6.500" cy="17.500" r="2.300"/>`, `stroke-width="1.3"`),
  extensions: svg(24, `<rect x="4.500" y="6.500" width="6.500" height="6.500"/><rect x="4.500" y="13" width="6.500" height="6.500"/><rect x="11" y="13" width="6.500" height="6.500"/><rect x="13.500" y="4" width="6.500" height="6.500"/>`, `stroke-width="1.3"`),
  account: svg(24, `<circle cx="12" cy="9" r="3.500"/><path d="M5 19.500c.600-3.600 3.300-5.500 7-5.500s6.400 1.900 7 5.500"/>`, `stroke-width="1.3"`),
  gear: svg(24, `<circle cx="12" cy="12" r="2.600"/><circle cx="12" cy="12" r="6.200"/><path d="${gearTeeth}" stroke-width="2.600" stroke-linecap="butt"/>`, `stroke-width="1.3"`),
  chevronRight: svg(16, `<path d="M6 4l4 4-4 4"/>`, `stroke-width="1.1"`),
  chevronDown: svg(16, `<path d="M4 6l4 4 4-4"/>`, `stroke-width="1.1"`),
  close: svg(16, `<path d="M4.500 4.500l7 7M11.500 4.500l-7 7"/>`, `stroke-width="1.1"`),
  more: svg(16, `<circle cx="3.500" cy="8" r="1"/><circle cx="8" cy="8" r="1"/><circle cx="12.500" cy="8" r="1"/>`, `fill="currentColor" stroke="none"`),
  split: svg(16, `<rect x="2.500" y="3" width="11" height="10"/><path d="M8 3v10"/>`, `stroke-width="1"`),
  // Two chevrons pointing at each other, the right one higher (the other way round it reads as "code").
  remote: svg(16, `<path d="M3.500 6l3.500 3.500-3.500 3.500M12.500 3l-3.500 3.500 3.500 3.500"/>`, `stroke-width="1.2"`),
  branch: svg(16, `<circle cx="5" cy="4" r="1.500"/><circle cx="5" cy="12" r="1.500"/><circle cx="11" cy="6" r="1.500"/><path d="M5 5.500v5M11 7.500c0 2.500-6 1.500-6 3.500"/>`, `stroke-width="1"`),
  error: svg(16, `<circle cx="8" cy="8" r="5.500"/><path d="M6 6l4 4M10 6l-4 4"/>`, `stroke-width="1"`),
  warning: svg(16, `<path d="M8 2.500l6 10.500H2z"/><path d="M8 6.500v3M8 11.200v.1"/>`, `stroke-width="1"`),
  bell: svg(16, `<path d="M4 11.500V7.500a4 4 0 0 1 8 0v4l1 1H3zM6.800 13.500a1.300 1.300 0 0 0 2.400 0"/>`, `stroke-width="1"`),
  minimize: svg(10, `<path d="M0 5.500h10"/>`, `stroke-width="1" stroke-linecap="butt"`),
  maximize: svg(10, `<rect x=".5" y=".5" width="9" height="9"/>`, `stroke-width="1"`),
  windowClose: svg(10, `<path d="M0 0l10 10M10 0L0 10"/>`, `stroke-width="1" stroke-linecap="butt"`),
};

// ── Style sheet (one per page) ───────────────────────────────────────────────────────
export const WORKBENCH_CSS = `
.wb { position: relative; display: grid; grid-template-rows: 30px 1fr 22px; overflow: hidden; box-sizing: border-box;
  font: 13px/1.4 ${UI_FONT}; color: var(--fg); background: var(--editor-bg); cursor: default; }
.wb * { box-sizing: border-box; }
.wb .glyph { display: block; flex: none; }
.wb img { display: block; flex: none; }

.wb .title { position: relative; display: flex; align-items: center; background: var(--title-bg); color: var(--title-fg); border-bottom: 1px solid var(--title-border); }
.wb .menu { display: flex; padding-left: 6px; }
.wb .menu span { padding: 0 8px; }
.wb .title .name { position: absolute; left: 0; right: 0; text-align: center; font-size: 12px; pointer-events: none; }
.wb .controls { margin-left: auto; display: flex; height: 100%; }
.wb .controls span { width: 46px; display: grid; place-items: center; }

.wb .body { display: grid; grid-template-columns: 48px var(--side-width) 1fr; min-height: 0; }

.wb .activity { display: flex; flex-direction: column; background: var(--activity-bg); border-right: 1px solid var(--activity-border); color: var(--activity-inactive); }
.wb .activity .item { position: relative; width: 47px; height: 48px; display: grid; place-items: center; }
.wb .activity .item.on { color: var(--activity-fg); }
.wb .activity .item.on::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; border-left: 2px solid var(--activity-active); }
.wb .activity .item.on .glyph { outline: var(--activity-outline); outline-offset: 5px; }
.wb .activity .spacer { flex: 1; }

.wb .side { display: flex; flex-direction: column; min-width: 0; background: var(--side-bg); border-right: 1px solid var(--side-border); color: var(--side-fg); }
.wb .side .heading { height: 35px; flex: none; display: flex; align-items: center; justify-content: space-between; padding: 0 8px 0 20px; font-size: 11px; text-transform: uppercase; color: var(--side-title); }
.wb .side .section { height: 22px; flex: none; display: flex; align-items: center; padding-left: 2px; gap: 2px; font-size: 11px; font-weight: 700; text-transform: uppercase; background: var(--section-bg); color: var(--section-fg); }
.wb .row { height: 22px; display: flex; align-items: center; white-space: nowrap; overflow: hidden; }
.wb .row .twistie { width: 16px; margin-right: 6px; transform: translateX(3px); flex: none; }
.wb .row img { width: 16px; height: 16px; margin-right: 6px; }
.wb .row.selected { background: var(--selected-bg); outline: var(--selected-outline); outline-offset: -1px; }

.wb .group { grid-column: 3; display: grid; grid-template-rows: 35px 1fr; min-width: 0; min-height: 0; }
.wb .tabs { display: flex; background: var(--tabs-bg); border-bottom: var(--tabs-border); }
.wb .tab { position: relative; height: 100%; display: flex; align-items: center; padding-left: 10px; white-space: nowrap; background: var(--tab-bg); color: var(--tab-fg); border-right: 1px solid var(--tab-border); }
.wb .tab img { width: 16px; height: 16px; margin-right: 6px; }
.wb .tab .x { width: 28px; display: grid; place-items: center; }
.wb .tab .x .glyph { visibility: hidden; }
.wb .tab.on { background: var(--tab-on-bg); color: var(--tab-on-fg); outline: var(--tab-on-outline); outline-offset: -5px; }
.wb .tab.on::before { content: ""; position: absolute; left: 0; right: 0; top: 0; border-top: 1px solid var(--tab-on-top); }
.wb .tab.on .x .glyph { visibility: visible; }
.wb .tabs .actions { margin-left: auto; display: flex; align-items: center; gap: 8px; padding-right: 10px; color: var(--icon); }

.wb .editor { position: relative; overflow: hidden; background: var(--editor-bg); color: var(--editor-fg);
  font: ${FONT_SIZE}px/${LINE_HEIGHT}px ${CODE_FONT}; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
.wb .editor .ln { position: absolute; left: ${GLYPH_MARGIN}px; width: ${NUMBERS}px; height: ${LINE_HEIGHT}px; text-align: right; color: var(--line-number); }
.wb .editor .ln.on { color: var(--line-number-on); }
.wb .editor .line { position: absolute; left: ${CONTENT_LEFT}px; height: ${LINE_HEIGHT}px; white-space: pre; }
.wb .editor .current { position: absolute; left: ${CONTENT_LEFT}px; right: ${SCROLLBAR}px; height: ${LINE_HEIGHT}px; background: var(--current-line); border: var(--current-line-border); }
.wb .editor .guide { position: absolute; width: 1px; background: var(--guide); }
.wb .editor .guide.on { background: var(--guide-on); }
.wb .editor .cursor { position: absolute; width: 2px; height: ${LINE_HEIGHT}px; background: var(--cursor); }
.wb .editor .ruler { position: absolute; top: 0; bottom: 0; right: 0; width: ${SCROLLBAR}px; border-left: 1px solid var(--ruler); }

.wb .status { display: flex; align-items: center; background: var(--status-bg); color: var(--status-fg); border-top: 1px solid var(--status-border); font-size: 12px; white-space: nowrap; }
.wb .status .item { height: 100%; display: flex; align-items: center; gap: 3px; padding: 0 5px; margin: 0 2px; }
.wb .status .remote { margin: 0 4px 0 0; padding: 0 9px; background: var(--remote-bg); color: var(--remote-fg); }
.wb .status .right { margin-left: auto; display: flex; height: 100%; padding-right: 6px; }
`;

const LANGUAGE_NAME = { tsx: "TypeScript JSX", typescript: "TypeScript" };

/**
 * @param o.theme        from loadThemes()
 * @param o.icons        from loadIconTheme()
 * @param o.width,height CSS pixels
 * @param o.sideWidth    width of the Explorer (0: the Explorer is closed)
 * @param o.folder       name of the open folder
 * @param o.tree         rows of the Explorer, top to bottom: [depth, name, "open" | "closed" | "file"]
 * @param o.tabs         [{ name, parent }]; `active` is the name of the open file
 * @param o.lines        from createCode().lines()
 * @param o.cursor       { line, column } (1-based line, 0-based column)
 * @param o.style        extra inline CSS for the window (corner radius, edge, shadow)
 */
export function workbench(o) {
  const { theme, icons } = o;
  const c = theme.color;
  const mode = theme.iconMode;
  const hc = theme.highContrast;
  const vars = {
    "side-width": `${o.sideWidth}px`,
    fg: c("foreground"),
    icon: c("icon.foreground"),
    "title-bg": c("titleBar.activeBackground"),
    "title-fg": c("titleBar.activeForeground"),
    "title-border": c("titleBar.border"),
    "activity-bg": c("activityBar.background"),
    "activity-fg": c("activityBar.foreground"),
    "activity-inactive": c("activityBar.inactiveForeground"),
    "activity-active": c("activityBar.activeBorder"),
    "activity-border": c("activityBar.border"),
    // High contrast themes: VS Code outlines the active view, the selected row and the active tab.
    "activity-outline": hc ? `1px solid ${c("contrastActiveBorder")}` : "none",
    "side-bg": c("sideBar.background"),
    "side-fg": c("sideBar.foreground"),
    "side-border": c("sideBar.border"),
    "side-title": c("sideBarTitle.foreground"),
    "section-bg": c("sideBarSectionHeader.background"),
    "section-fg": c("sideBarSectionHeader.foreground"),
    // The keyboard focus is in the editor, so the Explorer shows its selection as inactive.
    "selected-bg": c("list.inactiveSelectionBackground"),
    "selected-outline": hc ? `1px dotted ${c("contrastActiveBorder")}` : "none",
    "tabs-bg": c("editorGroupHeader.tabsBackground"),
    "tabs-border": hc ? `1px solid ${c("contrastBorder")}` : "none",
    "tab-bg": c("tab.inactiveBackground"),
    "tab-fg": c("tab.inactiveForeground"),
    "tab-border": c("tab.border"),
    "tab-on-bg": c("tab.activeBackground"),
    "tab-on-fg": c("tab.activeForeground"),
    "tab-on-top": c("tab.activeBorderTop"),
    "tab-on-outline": hc ? `1px solid ${c("contrastActiveBorder")}` : "none",
    "editor-bg": c("editor.background"),
    "editor-fg": c("editor.foreground"),
    "line-number": c("editorLineNumber.foreground"),
    "line-number-on": c("editorLineNumber.activeForeground"),
    "current-line": c("editor.lineHighlightBackground"),
    "current-line-border": `${hc ? 1 : 2}px solid ${c("editor.lineHighlightBorder")}`,
    guide: c("editorIndentGuide.background1"),
    "guide-on": c("editorIndentGuide.activeBackground1"),
    cursor: c("editorCursor.foreground"),
    ruler: c("editorOverviewRuler.border"),
    "status-bg": c("statusBar.background"),
    "status-fg": c("statusBar.foreground"),
    "status-border": c("statusBar.border"),
    "remote-bg": c("statusBarItem.remoteBackground"),
    "remote-fg": c("statusBarItem.remoteForeground"),
  };
  const style = Object.entries(vars).map(([key, value]) => `--${key}:${value}`).join(";");

  // Explorer
  const parents = [];
  const rows = o.tree.map(([depth, name, kind]) => {
    parents.length = depth - 1;
    const parent = parents.at(-1) ?? o.folder;
    const icon = kind === "file" ? icons.fileIcon(mode, name, { parent }) : icons.folderIcon(mode, name, { parent, expanded: kind === "open" });
    if (kind !== "file") parents.push(name);
    const twistie = kind === "file" ? "" : kind === "open" ? GLYPH.chevronDown : GLYPH.chevronRight;
    const selected = kind === "file" && name === o.active && parent === o.activeParent;
    return `<div class="row${selected ? " selected" : ""}" style="padding-left:${8 + 8 * (depth - 1)}px"><span class="twistie">${twistie}</span><img src="${icon.uri}" alt="">${esc(name)}</div>`;
  }).join("");

  // Tabs
  const tabs = o.tabs.map((tab) => {
    const icon = icons.fileIcon(mode, tab.name, { parent: tab.parent });
    return `<div class="tab${tab.name === o.active ? " on" : ""}"><img src="${icon.uri}" alt="">${esc(tab.name)}<span class="x">${GLYPH.close}</span></div>`;
  }).join("");

  // Editor
  const { lines, cursor } = o;
  const indents = indentLevels(lines.map((runs) => runs.map((run) => run.text).join("")));
  const active = activeGuide(indents, cursor.line);
  let editor = `<div class="current" style="top:${(cursor.line - 1) * LINE_HEIGHT}px"></div>`;
  lines.forEach((runs, index) => {
    const top = index * LINE_HEIGHT;
    for (let level = 1; level <= indents[index]; level++) {
      const on = active && level === active.level && index >= active.from && index <= active.to;
      editor += `<div class="guide${on ? " on" : ""}" style="top:${top}px;height:${LINE_HEIGHT}px;left:calc(${CONTENT_LEFT}px + ${(level - 1) * 2} * var(--char, ${CHAR}px))"></div>`;
    }
    editor += `<div class="ln${index + 1 === cursor.line ? " on" : ""}" style="top:${top}px">${index + 1}</div>`;
    editor += `<div class="line" style="top:${top}px">${runs.map(span).join("")}</div>`;
  });
  editor += `<div class="cursor" style="top:${(cursor.line - 1) * LINE_HEIGHT}px;left:calc(${CONTENT_LEFT}px + ${cursor.column} * var(--char, ${CHAR}px))"></div>`;
  editor += `<div class="ruler"></div>`;

  const item = (html, cls = "") => `<span class="item ${cls}">${html}</span>`;
  return `<div class="wb" style="width:${o.width}px;height:${o.height}px;${style};${o.style ?? ""}">
<div class="title"><div class="menu">${["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"].map((m) => `<span>${m}</span>`).join("")}</div>
<div class="name">${esc(o.active)} - ${esc(o.folder)}</div>
<div class="controls"><span>${GLYPH.minimize}</span><span>${GLYPH.maximize}</span><span>${GLYPH.windowClose}</span></div></div>
<div class="body">
<div class="activity"><div class="item on">${GLYPH.files}</div><div class="item">${GLYPH.search}</div><div class="item">${GLYPH.sourceControl}</div><div class="item">${GLYPH.debug}</div><div class="item">${GLYPH.extensions}</div><div class="spacer"></div><div class="item">${GLYPH.account}</div><div class="item">${GLYPH.gear}</div></div>
<div class="side"${o.sideWidth ? "" : ' style="display:none"'}><div class="heading">Explorer${GLYPH.more}</div><div class="section">${GLYPH.chevronDown}${esc(o.folder)}</div>${rows}</div>
<div class="group"><div class="tabs">${tabs}<div class="actions">${GLYPH.split}${GLYPH.more}</div></div><div class="editor">${editor}</div></div>
</div>
<div class="status">${item(GLYPH.remote, "remote")}${item(GLYPH.branch + "main")}${item(GLYPH.error + "0&nbsp;" + GLYPH.warning + "0")}
<div class="right">${item(`Ln ${cursor.line}, Col ${cursor.column + 1}`)}${item("Spaces: 2")}${item("UTF-8")}${item("LF")}${item("{} " + LANGUAGE_NAME[o.language])}${item(GLYPH.bell)}</div></div>
</div>`;
}

function span(run) {
  const decoration = [run.underline && "underline", run.strike && "line-through"].filter(Boolean).join(" ");
  const css = `color:${run.color}${run.italic ? ";font-style:italic" : ""}${run.bold ? ";font-weight:bold" : ""}${decoration ? `;text-decoration:${decoration}` : ""}`;
  return `<span style="${css}">${esc(run.text)}</span>`;
}

// Indent guides as the editor draws them (indentation of 2 spaces): a line shows one guide per level, and
// an empty line takes its level from the lines around it.
function indentLevels(texts) {
  const own = texts.map((text) => (text.trim() ? Math.floor(text.match(/^ */)[0].length / 2) : -1));
  return own.map((level, index) => {
    if (level >= 0) return level;
    const above = own.slice(0, index).findLast((l) => l >= 0) ?? -1;
    const below = own.slice(index + 1).find((l) => l >= 0) ?? -1;
    if (above < 0 || below < 0) return 0;
    // VS Code: inside the block above, between two blocks of the same depth, or inside the block that ends below.
    return above < below ? above + 1 : above === below ? below : below + 1;
  });
}

// The highlighted guide is the one of the block that holds the cursor line.
function activeGuide(indents, line) {
  const level = indents[line - 1];
  if (!level) return null;
  let from = line - 1;
  let to = line - 1;
  while (from > 0 && indents[from - 1] >= level) from--;
  while (to < indents.length - 1 && indents[to + 1] >= level) to++;
  return { level, from, to };
}
