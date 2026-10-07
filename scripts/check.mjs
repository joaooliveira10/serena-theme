// Serena Theme: checks that "node build.mjs" does not make. No dependencies, only Node's standard library.
//
// Usage:  node scripts/check.mjs                      run it after "node build.mjs"
//         node scripts/check.mjs --verbose            also prints the measured contrast of every syntax color
//         node scripts/check.mjs --stamp-screenshots  records the colors the screenshots were rendered from
//         node scripts/check.mjs <folder>             checks another copy of the repository
//
// Prints one line per problem and exits with code 1 when there is at least one.
// Lines that start with "warning" do not fail the run: they are things to look at, not errors.
//
// What it checks:
//   1. src/variants     the same roles in every variant, valid colors, contrast of the syntax colors on the editor
//                       background (4.5:1, and 7:1 in the high contrast themes), UI keys that one variant sets
//                       and another does not
//   2. src/tokens.mjs   every rule uses a role that exists and paints something
//   3. package.json     theme lists in sync with src/variants and with the generated files; no code entry point,
//                       no dependencies, and no contribution other than themes and icon themes
//   4. icons            mapping keys, icon theme JSON (every path resolves, no unused SVG), safe SVG, and that
//                       .vscodeignore lets every file that is needed into the package (LICENSE and notices included)
//   5. texts            numbers in README.md, issue forms, CHANGELOG.md, pinned tool versions in workflows and guides
//
// Nothing here is a count written by hand: the numbers come from src/ and from the generated files.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const root = path.resolve(args.find((a) => !a.startsWith("--")) ?? path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
const at = (...p) => path.join(root, ...p);
const exists = (...p) => fs.existsSync(at(...p));
const text = (...p) => fs.readFileSync(at(...p), "utf8");
const json = (...p) => JSON.parse(text(...p).replace(/^\/\/.*\r?\n/, "")); // generated themes start with one "//" line
const load = (...p) => import(pathToFileURL(at(...p)).href);
const mjsIn = (...p) => (exists(...p) ? fs.readdirSync(at(...p)).filter((f) => f.endsWith(".mjs")).sort() : []);
const walk = (dir) => (exists(dir) ? fs.readdirSync(at(dir), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`])) : []);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const list = (items, max = 6) => (items.length > max ? `${items.slice(0, max).join(", ")} and ${items.length - max} more` : items.join(", "));

// ── Reporting ────────────────────────────────────────────────────────────────────────
const failures = [];
const warnings = [];
let area = "";
const add = (to, msg) => { if (!to.some(([where, text]) => where === area && text === msg)) to.push([area, msg]); }; // the same line only once
const fail = (msg) => add(failures, msg);
const warn = (msg) => add(warnings, msg);
// One part that cannot be read (a missing file, a syntax error) is reported and the other parts still run.
const part = async (name, fn) => {
  area = name;
  try {
    await fn();
  } catch (e) {
    area = name;
    fail(`could not be checked: ${e.message.split("\n")[0]}`);
  }
};

// ── Colors ───────────────────────────────────────────────────────────────────────────
const HEX = /^#([0-9a-f]{6}|[0-9a-f]{8})$/i;
const isHex = (c) => typeof c === "string" && HEX.test(c);
const sameColor = (a, b) => isHex(a) && isHex(b) && a.toLowerCase() === b.toLowerCase();
const rgba = (hex) => [1, 3, 5, 7].map((i) => (i < hex.length ? parseInt(hex.slice(i, i + 2), 16) : 255));
const channel = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
// WCAG contrast of a color painted on an opaque background. A translucent color is blended first.
const contrast = (color, background) => {
  const [r, g, b, a] = rgba(color);
  const back = rgba(background);
  const t = a / 255;
  const [hi, lo] = [luminance([r, g, b].map((c, i) => c * t + back[i] * (1 - t))), luminance(back)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// ── 1. Variants ──────────────────────────────────────────────────────────────────────
const TYPES = { dark: "vs-dark", light: "vs", hc: "hc-black", hcLight: "hc-light" };
// Every syntax color against editor.background: WCAG AA for the regular themes, AAA for the high contrast ones.
const MIN_CONTRAST = { dark: 4.5, light: 4.5, hc: 7, hcLight: 7 };
const BRACKETS = [1, 2, 3, 4, 5, 6].map((n) => `editorBracketHighlight.foreground${n}`); // painted on the code as well
// "One meaning per color" outside the editor too: symbol icons (suggestions, outline, breadcrumbs) use the color of their role.
const SYMBOL_ROLE = {
  func: ["function", "method", "constructor"],
  type: ["class", "interface", "struct", "enumerator", "typeParameter", "module", "namespace", "package"],
  constant: ["enumeratorMember", "constant", "number", "boolean", "null"],
  property: ["field", "property", "key"],
  fg: ["variable"],
  keyword: ["keyword"],
  string: ["string"],
  special: ["event"],
};
// Keys that one family (dark or light) leaves to the VS Code default on purpose, so they are not reported.
// The defaults were read in VS Code 1.140: white text on the dark badge colors, black or white overlays that suit
// any dark background, or a color derived from a key the theme does set. The list only silences a warning.
const LEFT_TO_VSCODE = {
  light: ["activityErrorBadge.foreground", "activityWarningBadge.foreground", "statusBarItem.errorForeground", "statusBarItem.warningForeground",
    "debugView.exceptionLabelForeground", "multiDiffEditor.headerBackground", "terminal.findMatchBackground"],
  dark: ["banner.background", "diffEditor.unchangedRegionShadow", "inlineEdit.gutterIndicator.background", "multiDiffEditor.border",
    "notebook.symbolHighlightBackground", "panelInput.border", "scrollbar.shadow", "statusBarItem.activeBackground", "textCodeBlock.background",
    "walkThrough.embeddedEditorBackground"],
};

const variants = []; // the default export of each file, plus .file
let ROLES = [];
const lowest = {}; // lowest syntax contrast found, per kind of theme
const contrastTable = [];

await part("src/variants", async () => {
  for (const file of mjsIn("src", "variants")) {
    // A file that cannot be loaded (a syntax error) is named, and the other variants are still checked.
    let v;
    try { v = (await load("src", "variants", file)).default; } catch (e) { fail(`${file} cannot be loaded: ${e.message.split("\n")[0]}`); continue; }
    if (v === null || typeof v !== "object") { fail(`${file}: no "export default { id, label, type, roles, colors }"`); continue; }
    variants.push({ ...v, roles: v.roles ?? {}, colors: v.colors ?? {}, file });
  }
  if (!variants.length) return fail("no variant found");
  // The roles are whatever the variants define: a role added to one file must be added to all of them.
  ROLES = [...new Set(variants.flatMap((v) => Object.keys(v.roles)))];
  const repeated = (key) => variants.filter((v, i) => variants.findIndex((o) => o[key] === v[key]) !== i).map((v) => `${v.file} (${v[key]})`);
  for (const key of ["id", "label"]) if (repeated(key).length) fail(`two variants share the same ${key}: ${repeated(key).join(", ")}`);

  for (const v of variants) {
    area = `src/variants/${v.file}`;
    if (`${v.id}.mjs` !== v.file) fail(`id "${v.id}" does not match the file name`);
    if (typeof v.label !== "string" || !v.label.trim()) fail("label is missing");
    if (!TYPES[v.type]) fail(`type "${v.type}" is not one of ${Object.keys(TYPES).join(", ")} (the theme would get no uiTheme)`);
    for (const role of ROLES) {
      if (!(role in v.roles)) fail(`role "${role}" is missing (${list(variants.filter((o) => role in o.roles).map((o) => o.id), 3)} define it)`);
      else if (!isHex(v.roles[role])) fail(`role ${role}: ${JSON.stringify(v.roles[role])} is not #rrggbb or #rrggbbaa`);
    }
    for (const [key, c] of Object.entries(v.colors)) if (!isHex(c)) fail(`${key}: ${JSON.stringify(c)} is not #rrggbb or #rrggbbaa`);
    const upper = [...Object.entries(v.roles), ...Object.entries(v.colors)].filter(([, c]) => isHex(c) && c !== c.toLowerCase()).map(([key]) => key);
    if (upper.length) warn(`write colors in lowercase, so the same color is always spelled the same way: ${list(upper)}`);
    // A repeated key in an object literal is legal JavaScript: the last one wins silently.
    const seen = new Set();
    for (const [, quoted, bare] of text("src", "variants", v.file).matchAll(/^\s*(?:"([^"]+)"|([A-Za-z_$][\w$]*)):\s*"#/gm)) {
      const key = quoted ?? `roles.${bare}`;
      if (seen.has(key)) fail(`"${key}" is defined twice (the second value silently wins)`);
      seen.add(key);
    }
    if (isHex(v.roles.fg) && !sameColor(v.colors["editor.foreground"], v.roles.fg)) fail(`editor.foreground must be the "fg" role color ${v.roles.fg}`);
    for (const [role, kinds] of Object.entries(SYMBOL_ROLE)) for (const kind of kinds) {
      const key = `symbolIcon.${kind}Foreground`;
      if (isHex(v.roles[role]) && key in v.colors && !sameColor(v.colors[key], v.roles[role])) fail(`${key} is ${v.colors[key]}, but the "${role}" role is ${v.roles[role]} (one meaning per color)`);
    }
    const bg = v.colors["editor.background"];
    if (!/^#[0-9a-f]{6}$/i.test(bg ?? "")) { fail("editor.background must be an opaque #rrggbb"); continue; }
    const min = MIN_CONTRAST[v.type];
    for (const [what, c] of [...ROLES.map((role) => [`role ${role}`, v.roles[role]]), ...BRACKETS.map((key) => [key, v.colors[key]])]) {
      if (!isHex(c)) continue; // reported above, or a bracket color this variant leaves to VS Code
      const ratio = contrast(c, bg);
      contrastTable.push(`${String(v.id).padEnd(28)} ${what.padEnd(36)} ${c.padEnd(9)} ${ratio.toFixed(2)}:1`);
      if (!min) continue;
      const kind = min === 7 ? "high contrast" : "regular";
      if (!(lowest[kind] <= ratio)) lowest[kind] = ratio;
      if (ratio < min) fail(`${what} ${c} on ${bg} is ${ratio.toFixed(2)}:1, below ${min}:1`);
    }
  }

  // UI keys that some variants set and others do not. (With a wrong type the families are unknown: fix that first.)
  area = "src/variants";
  if (variants.some((v) => !TYPES[v.type])) return;
  const has = (v, key) => key in v.colors;
  const isHighContrast = (v) => v.type === "hc" || v.type === "hcLight";
  for (const key of new Set(variants.flatMap((v) => Object.keys(v.colors)))) {
    if (variants.every((v) => has(v, key))) continue;
    // Two variants of the same type (Dark and Dark Vivid, Light and Light Vivid) differ only in their colors:
    // a key in one and not in its sibling is a copy that was forgotten.
    const forgotten = variants.filter((v) => !has(v, key) && variants.some((o) => o.type === v.type && has(o, key)));
    for (const v of forgotten) fail(`"${key}" is set in ${variants.find((o) => o.type === v.type && has(o, key)).id} but not in its sibling ${v.id}`);
    // Between families it can be on purpose (outlines only the high contrast themes need, a VS Code default that
    // already fits), so it is only a warning.
    if (variants.every((v) => has(v, key) === isHighContrast(v))) continue;
    const missing = variants.filter((v) => !has(v, key) && !forgotten.includes(v) && !LEFT_TO_VSCODE[v.type]?.includes(key));
    if (missing.length) warn(`"${key}" is set in ${list(variants.filter((v) => has(v, key)).map((v) => v.id), 4)} but not in: ${missing.map((v) => v.id).join(", ")}`);
  }
});

// ── 2. Syntax rules ──────────────────────────────────────────────────────────────────
let scopeCount = 0;
let tokens = null;
await part("src/tokens.mjs", async () => {
  tokens = await load("src", "tokens.mjs");
  const used = new Set();
  // Roles are read as r.keyword, r.func... A misspelled name is just "undefined" in JavaScript.
  const roles = new Proxy({}, {
    get: (_, role) => {
      if (typeof role !== "string") return undefined;
      used.add(role);
      if (!ROLES.includes(role)) fail(`unknown role r.${role} (the roles are: ${ROLES.join(", ")})`);
      return ROLES.includes(role) ? `<${role}>` : undefined;
    },
  });
  const fromRole = (fg) => typeof fg === "string" && /^<[^<>]+>$/.test(fg);
  const STYLES = ["italic", "bold", "underline", "strikethrough"];
  const owner = new Map();
  for (const rule of tokens.tokenColors(roles)) {
    const name = rule.name ?? String([].concat(rule.scope)[0]);
    const settings = rule.settings ?? {};
    if (!Array.isArray(rule.scope) || !rule.scope.length) fail(`rule "${name}": scope must be a non-empty array`);
    if (settings.foreground === undefined && settings.fontStyle === undefined) fail(`rule "${name}" sets neither a color nor a font style`);
    if (settings.foreground !== undefined && !fromRole(settings.foreground)) fail(`rule "${name}": foreground ${JSON.stringify(settings.foreground)} must be a role (r.keyword, r.func...), not a literal color`);
    for (const word of String(settings.fontStyle ?? "").split(" ").filter(Boolean)) if (!STYLES.includes(word)) fail(`rule "${name}": unknown fontStyle "${word}"`);
    for (const scope of [].concat(rule.scope ?? [])) {
      if (typeof scope !== "string" || scope !== scope.trim() || !scope || scope.includes(",")) fail(`rule "${name}": bad scope ${JSON.stringify(scope)}`);
      if (owner.has(scope)) fail(`scope "${scope}" is in two rules ("${owner.get(scope)}" and "${name}"): the later one overrides the earlier`);
      owner.set(scope, name);
    }
  }
  scopeCount = owner.size;
  for (const [selector, value] of Object.entries(tokens.semanticTokenColors(roles))) {
    const isObject = value !== null && typeof value === "object";
    if (!/^(\*|[A-Za-z][\w-]*)(\.[A-Za-z][\w-]*)*(:[\w-]+)?$/.test(selector)) fail(`semantic selector "${selector}" is not type.modifier:language`);
    if (value === undefined || (isObject && !Object.values(value).some((x) => x !== undefined))) fail(`semantic rule "${selector}" has no style`);
    if (isObject) for (const key of Object.keys(value)) if (key !== "foreground" && !STYLES.includes(key)) fail(`semantic rule "${selector}": unknown key "${key}"`);
    const fg = isObject ? value.foreground : value;
    if (fg !== undefined && !fromRole(fg)) fail(`semantic rule "${selector}": foreground ${JSON.stringify(fg)} must be a role, not a literal color`);
  }
  for (const role of ROLES) if (!used.has(role)) warn(`role "${role}" is defined in the variants but no rule uses it`);
});

// ── 3. package.json and the generated themes ─────────────────────────────────────────
let pkg = {};
await part("package.json", async () => {
  pkg = json("package.json");
  const themes = pkg.contributes?.themes ?? [];
  for (const v of variants) {
    const rel = `themes/${v.id}-color-theme.json`;
    const entry = themes.find((t) => t.path === `./${rel}`);
    if (!entry) { fail(`no contributes.themes entry for ${v.id}: run node build.mjs`); continue; }
    if (entry.label !== v.label || entry.uiTheme !== TYPES[v.type]) fail(`the entry for ${v.id} should be label "${v.label}", uiTheme "${TYPES[v.type]}": run node build.mjs`);
    if (!exists(rel)) { fail(`${rel} does not exist: run node build.mjs`); continue; }
    const built = json(rel);
    const fresh = tokens && same(built.colors, v.colors) && same(built.tokenColors, tokens.tokenColors(v.roles))
      && same(built.semanticTokenColors, JSON.parse(JSON.stringify(tokens.semanticTokenColors(v.roles))));
    if (built.name !== v.label || built.type !== v.type || (tokens && !fresh)) fail(`${rel} is not what src/ generates now: run node build.mjs`);
  }
  if (themes.length !== variants.length) fail(`contributes.themes has ${themes.length} entries for ${variants.length} variants: run node build.mjs`);
  for (const p of [pkg.icon, ...(pkg.contributes?.iconThemes ?? []).map((t) => t.path)]) if (!p || !exists(p)) fail(`"${p}" does not exist`);
  if (!(pkg.contributes?.iconThemes ?? []).length) fail("contributes.iconThemes is empty: run node build.mjs");
  // SECURITY.md: themes and icons only. Nothing that runs code, pulls a dependency or makes VS Code install another extension.
  for (const key of ["main", "browser", "activationEvents", "extensionDependencies", "extensionPack", "dependencies", "devDependencies", "optionalDependencies", "scripts", "bin"]) {
    if (pkg[key] !== undefined) fail(`"${key}" is not allowed: the extension is themes and icons only (SECURITY.md)`);
  }
  const otherContributions = Object.keys(pkg.contributes ?? {}).filter((key) => key !== "themes" && key !== "iconThemes");
  if (otherContributions.length) fail(`contributes.${otherContributions.join(", contributes.")} is not allowed: only themes and iconThemes (SECURITY.md)`);
  // The store banner is the editor background of the first dark theme.
  const dark = variants.find((v) => v.id === "serena-dark") ?? variants.find((v) => v.type === "dark");
  const banner = pkg.galleryBanner?.color;
  if (banner !== undefined && !isHex(banner)) fail(`galleryBanner.color ${JSON.stringify(banner)} is not #rrggbb`);
  else if (banner && dark && !sameColor(banner, dark.colors["editor.background"])) warn(`galleryBanner.color ${banner} is not the ${dark.label} editor background ${dark.colors["editor.background"]}`);
});

// What .vscodeignore lets into the package: vsce keeps a file that no plain line matches, or that a "!" line matches.
const ignoreLines = exists(".vscodeignore") ? text(".vscodeignore").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#")) : [];
const glob = (pattern) => new RegExp("^" + pattern.split("**").map((p) => p.split("*").map((s) => s.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join("[^/]*")).join(".*") + "$");
const ignored = ignoreLines.filter((l) => !l.startsWith("!")).map(glob);
const kept = ignoreLines.filter((l) => l.startsWith("!")).map((l) => glob(l.slice(1)));
const ships = (rel) => !ignored.some((re) => re.test(rel)) || kept.some((re) => re.test(rel));

// ── 4. Icons ─────────────────────────────────────────────────────────────────────────
let iconTokens = null;
await part("src/icons/system/tokens.json", async () => {
  iconTokens = json("src", "icons", "system", "tokens.json");
  for (const mode of ["dark", "light"]) if (!iconTokens[mode]) fail(`mode "${mode}" is missing`);
  const names = Object.keys(iconTokens.dark ?? {}).sort();
  for (const mode of ["dark", "light", "hc"].filter((m) => iconTokens[m])) {
    if (!same(Object.keys(iconTokens[mode]).sort(), names)) fail(`mode "${mode}" must define the same tokens as "dark"`);
    for (const [token, c] of Object.entries(iconTokens[mode])) if (!/^#[0-9a-f]{6}$/i.test(c)) fail(`${mode}.${token}: ${JSON.stringify(c)} is not #rrggbb`);
  }
  // WCAG non-text contrast: every icon color at 3:1 or more on the side bar of each Serena theme.
  // Without an "hc" set, VS Code shows the dark icons in hc-black and the light icons in hc-light.
  for (const v of variants) {
    const side = v.colors["sideBar.background"];
    const mode = { dark: "dark", light: "light", hc: iconTokens.hc ? "hc" : "dark", hcLight: iconTokens.hc ? "hc" : "light" }[v.type];
    if (!/^#[0-9a-f]{6}$/i.test(side ?? "") || !iconTokens[mode]) continue;
    for (const [token, c] of Object.entries(iconTokens[mode])) {
      if (/^#[0-9a-f]{6}$/i.test(c) && contrast(c, side) < 3) fail(`${mode}.${token} ${c} is ${contrast(c, side).toFixed(2)}:1 on the side bar of ${v.label} (${side}), below 3:1`);
    }
  }
});

let mapping = null;
await part("src/icons/mapping.json", async () => {
  mapping = json("src", "icons", "mapping.json");
  // Rules from src/icons/spec.md: VS Code lowercases names and extensions on both sides, matches at most one parent
  // folder, and a purely numeric id would reorder the generated rules. Language ids are compared as written.
  const ID = /^[a-z0-9][a-z0-9_-]*$/;
  const GENERIC = ["dev", "prod", "local", "example", "template", "sample", "dist", "bak", "old", "orig"]; // would hijack Dockerfile.dev, .env.local
  const owner = new Map();
  const claim = (kind, key, id) => {
    if (typeof key !== "string" || !key || key !== key.trim() || (kind !== "languageIds" && key !== key.toLowerCase())) fail(`${id}: ${kind} key ${JSON.stringify(key)} must be lowercase, without spaces around it`);
    if (String(key).split("/").length > 2) fail(`${id}: ${kind} key "${key}" has more than one parent folder (VS Code matches only one)`);
    const ext = String(key).split("/").pop(); // ".github/yml" is <parent folder>/<extension>: only the extension is tested
    if (kind === "fileExtensions" && (ext.startsWith(".") || GENERIC.includes(ext))) fail(`${id}: extension "${key}" is ${ext.startsWith(".") ? "written with a leading dot" : "too generic"}`);
    const k = `${kind}:${kind === "languageIds" ? key : String(key).toLowerCase()}`;
    if (owner.has(k) && owner.get(k) !== id) fail(`${kind} "${key}" is in "${owner.get(k)}" and in "${id}"`);
    owner.set(k, id);
  };
  for (const [concepts, kinds] of [[mapping.files ?? [], ["fileExtensions", "fileNames", "languageIds"]], [mapping.folders ?? [], ["names"]]]) {
    const ids = new Set();
    for (const concept of concepts) {
      if (!ID.test(concept.id ?? "") || /^\d+$/.test(concept.id)) fail(`id ${JSON.stringify(concept.id)} must be lowercase letters, digits, "-" or "_", and not only digits`);
      if (ids.has(concept.id)) fail(`id "${concept.id}" appears twice`);
      if (concepts === mapping.files && /^folder(-|$)/.test(concept.id ?? "")) fail(`file id "${concept.id}" would overwrite a folder SVG (folder-*.svg)`);
      ids.add(concept.id);
      for (const kind of kinds) for (const key of concept[kind] ?? []) claim(kind === "names" ? "folderNames" : kind, key, concept.id);
    }
  }
});

// Artwork modules: a misspelled alias (A["nugget"]) is undefined, and the build would silently fall back to the Minimal drawing.
for (const dir of ["drawn", "logos"]) for (const file of mjsIn("src", "icons", dir)) {
  await part(`src/icons/${dir}/${file}`, async () => {
    const mod = await load("src", "icons", dir, file);
    for (const [id, markup] of Object.entries(mod.icons ?? {})) if (typeof markup !== "string" || !markup) fail(`icon "${id}" has no markup (${typeof markup})`);
    for (const [id, spec] of Object.entries(mod.folders ?? {})) {
      if (!spec || typeof spec !== "object" || (iconTokens?.dark && !iconTokens.dark[spec.token]) || typeof (spec.badge ?? "") !== "string") fail(`folder "${id}" needs { token: <a token of tokens.json>, badge: <string> }`);
    }
  });
}

// SVG: one <svg> root that holds only plain shapes. Everything else is refused, so a script, a style sheet, an
// event handler, an embedded image or a link to another file cannot pass. Elements and attributes are the ones
// src/icons/system/style.md allows.
const NUMBER = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;
const PAINT = /^(none|#[0-9a-f]{6})$/i;
const SHAPE_ATTRS = {
  d: /^[MmLlHhVvCcSsQqTtAaZz0-9eE\s,.+-]+$/,
  points: /^[0-9eE\s,.+-]+$/,
  fill: PAINT,
  stroke: PAINT,
  "fill-opacity": /^(0?\.\d+|[01])$/,
  "stroke-opacity": /^(0?\.\d+|[01])$/,
  "fill-rule": /^(evenodd|nonzero)$/,
  "stroke-width": NUMBER,
  "stroke-linecap": /^(round|butt|square)$/,
  "stroke-linejoin": /^(round|miter|bevel)$/,
  ...Object.fromEntries(["x", "y", "width", "height", "rx", "ry", "cx", "cy", "r", "x1", "y1", "x2", "y2"].map((name) => [name, NUMBER])),
};
const ROOT_ATTRS = { xmlns: /^http:\/\/www\.w3\.org\/2000\/svg$/, width: /^16$/, height: /^16$/, viewBox: /^0 0 16 16$/ };
const SHAPES = ["path", "rect", "circle", "line", "polyline", "polygon", "g"];
const TAG = /<(\/?)([A-Za-z][\w:.-]*)((?:\s+[^\s"'<>\/=]+="[^"<>]*")*)\s*(\/?)>/y;
// Returns the problems of one SVG text ([] when it is fine).
const svgProblems = (svg, darkSet) => {
  const found = [];
  const open = [];
  let pos = 0;
  let roots = 0;
  while (pos < svg.length) {
    if (/\s/.test(svg[pos])) { pos++; continue; }
    TAG.lastIndex = pos;
    const m = TAG.exec(svg);
    if (!m) return [...found, `not well-formed at character ${pos}: ${JSON.stringify(svg.slice(pos, pos + 40))} (text, comments, entities and unquoted attributes are not allowed)`];
    pos = TAG.lastIndex;
    const [, closing, name, attrText, selfClosing] = m;
    if (closing) {
      if (open.pop() !== name) return [...found, `</${name}> does not close the element that is open`];
      continue;
    }
    const isRoot = open.length === 0;
    if (isRoot && ++roots > 1) found.push("more than one root element");
    if (isRoot ? name !== "svg" : !SHAPES.includes(name)) found.push(`element <${name}> is not allowed${isRoot ? " as the root" : ` (only ${SHAPES.join(", ")})`}`);
    const allowed = isRoot ? ROOT_ATTRS : SHAPE_ATTRS;
    const seen = new Set();
    for (const [, attr, value] of attrText.matchAll(/([^\s"'<>\/=]+)="([^"]*)"/g)) {
      if (seen.has(attr)) found.push(`attribute "${attr}" is repeated`);
      seen.add(attr);
      if (/^on/i.test(attr)) found.push(`event handler "${attr}" is not allowed`);
      else if (/(^|:)(href|src)$/i.test(attr) || /url\(|javascript:|data:|&/i.test(value)) found.push(`${attr}="${value.slice(0, 40)}" refers to something outside the file`);
      else if (!allowed[attr]) found.push(`attribute "${attr}" is not allowed on <${name}>`);
      else if (!allowed[attr].test(value)) found.push(`${attr}="${value.slice(0, 40)}" is not valid${attr === "fill" || attr === "stroke" ? " (an unresolved {{token}} or a named color?)" : ""}`);
      // The build makes the high contrast icons stronger by replacing the exact text ".5" with ".85"; ".2" stays
      // (style.md, section 16): another spelling, such as "0.5", would be skipped.
      else if (darkSet && attr.endsWith("-opacity") && value !== ".2" && value !== ".5") found.push(`${attr}="${value}" must be written ".2" or ".5"`);
    }
    if (isRoot) for (const attr of Object.keys(ROOT_ATTRS)) if (!seen.has(attr)) found.push(`the root needs ${attr}`);
    if (!selfClosing) open.push(name);
  }
  if (open.length) found.push(`<${open.at(-1)}> is never closed`);
  if (!roots) found.push("empty file");
  if (/#ff00ff/i.test(svg)) found.push('has the "unknown token" fallback color #ff00ff');
  return found;
};

// Icon theme JSON: every path resolves, every association points to a defined icon, the light and high contrast
// blocks mirror the base block, and no SVG is left unused.
const referenced = new Set();
const facts = {}; // numbers the texts may quote, read from the generated icon theme with the logos
const MAPS = ["fileExtensions", "fileNames", "languageIds", "folderNames", "folderNamesExpanded"];
const SINGLES = ["file", "folder", "folderExpanded", "rootFolder", "rootFolderExpanded"];
for (const edition of pkg.contributes?.iconThemes ?? []) {
  await part(String(edition.path).replace(/^\.\//, ""), async () => {
    const rel = String(edition.path).replace(/^\.\//, "");
    const theme = json(rel);
    const defs = theme.iconDefinitions ?? {};
    const fileOf = {};
    for (const [id, def] of Object.entries(defs)) {
      const iconPath = def?.iconPath;
      if (typeof iconPath !== "string" || !/^\.\/[\w./-]+\.svg$/.test(iconPath) || iconPath.includes("..")) { fail(`"${id}": iconPath ${JSON.stringify(iconPath)} must be "./<folder>/<name>.svg" inside icons/`); continue; }
      fileOf[id] = path.posix.join(path.posix.dirname(rel), iconPath);
      if (!exists(fileOf[id])) fail(`"${id}" points to ${fileOf[id]}, which does not exist`);
      referenced.add(fileOf[id]);
    }
    const used = new Set();
    for (const [where, block, folder] of [["", theme, "dark"], ["light", theme.light, "light"], ["highContrast", theme.highContrast, "hc"]]) {
      if (!block) { if (where === "light") fail('there is no "light" block: light themes would show the dark icons'); continue; }
      const label = where ? `${where}: ` : "";
      for (const key of SINGLES) {
        if (block[key] === undefined && where) continue;
        if (!defs[block[key]]) fail(`${label}${key} points to the undefined icon ${JSON.stringify(block[key])}`);
        used.add(block[key]);
      }
      for (const map of MAPS) {
        const lower = new Map();
        for (const [key, id] of Object.entries(block[map] ?? {})) {
          used.add(id);
          if (!defs[id]) fail(`${label}${map} "${key}" points to the undefined icon ${JSON.stringify(id)}`);
          else if (fileOf[id] && !fileOf[id].includes(`/${folder}/`)) fail(`${label}${map} "${key}" uses ${fileOf[id]}, which is not a ${folder} icon`);
          // VS Code lowercases names and extensions: two keys that differ only in case are the same key.
          const k = map === "languageIds" ? key : key.toLowerCase();
          if (lower.has(k)) fail(`${label}${map} has "${lower.get(k)}" and "${key}": VS Code treats them as the same key`);
          lower.set(k, key);
        }
        if (where && !same(Object.keys(block[map] ?? {}).sort(), Object.keys(theme[map] ?? {}).sort())) fail(`${label}${map} does not have the same keys as the base block`);
      }
      // Without the "expanded" twin, an open folder falls back to the generic open folder (spec.md).
      if (!same(Object.keys(block.folderNames ?? {}).sort(), Object.keys(block.folderNamesExpanded ?? {}).sort())) fail(`${label}folderNames and folderNamesExpanded must have the same keys`);
    }
    const unused = Object.keys(defs).filter((id) => !used.has(id));
    if (unused.length) warn(`${unused.length} icon(s) are defined but no file or folder name uses them: ${list(unused)}`);

    // Numbers for the texts, from the edition with the most logos.
    const isBase = (id) => fileOf[id]?.includes("/dark/");
    const closed = new Set([theme.folder, theme.rootFolder, ...Object.values(theme.folderNames ?? {})]);
    const opened = new Set([theme.folderExpanded, theme.rootFolderExpanded, ...Object.values(theme.folderNamesExpanded ?? {})]);
    const fileIds = Object.keys(defs).filter((id) => isBase(id) && !closed.has(id) && !opened.has(id));
    const folderIds = Object.keys(defs).filter((id) => isBase(id) && closed.has(id));
    const withLogo = (ids) => ids.filter((id) => fileOf[id].includes("/logos/")).length;
    const counts = { fileIcons: fileIds.length, folderIcons: folderIds.length, fileExtensions: Object.keys(theme.fileExtensions ?? {}).length,
      fileNames: Object.keys(theme.fileNames ?? {}).length, folderNames: Object.keys(theme.folderNames ?? {}).length,
      languageIds: Object.keys(theme.languageIds ?? {}).length, logoFiles: withLogo(fileIds), logoFolders: withLogo(folderIds) };
    for (const key of ["fileIcons", "folderIcons", "fileExtensions", "fileNames", "folderNames", "languageIds"]) {
      if (facts[key] !== undefined && facts[key] !== counts[key]) fail(`has ${counts[key]} ${key}, but another edition has ${facts[key]}: the editions must map the same files`);
    }
    if (!(facts.logoFiles >= counts.logoFiles)) Object.assign(facts, counts);
    if (mapping && (counts.fileIcons !== (mapping.files ?? []).length || counts.folderIcons !== (mapping.folders ?? []).length)) {
      fail(`defines ${counts.fileIcons} file and ${counts.folderIcons} folder icons, but mapping.json has ${(mapping.files ?? []).length} and ${(mapping.folders ?? []).length}: run node build.mjs`);
    }
  });
}

let svgCount = 0;
await part("icons", async () => {
  const editions = (pkg.contributes?.iconThemes ?? []).map((t) => String(t.path).replace(/^\.\//, ""));
  const notShipped = new Map();
  for (const rel of walk("icons")) {
    if (editions.includes(rel)) continue;
    if (!rel.endsWith(".svg") || !referenced.has(rel)) {
      // A file nothing uses: an error when it would go into the package, otherwise just clutter.
      (ships(rel) ? fail : warn)(`${rel}: no icon theme uses this file${ships(rel) ? ", and it would be packaged" : ""}`);
      continue;
    }
    svgCount++;
    for (const problem of svgProblems(text(rel), /^icons\/(logos\/)?dark\//.test(rel))) fail(`${rel}: ${problem}`);
    if (!ships(rel)) notShipped.set(path.posix.dirname(rel), (notShipped.get(path.posix.dirname(rel)) ?? 0) + 1);
  }
  for (const [dir, n] of notShipped) fail(`${dir}/: ${n} icon(s) in use are not whitelisted in .vscodeignore, so they would not be packaged`);
});

await part(".vscodeignore", async () => {
  if (!ignoreLines.length) return fail("is missing or empty: everything in the folder would be packaged");
  // LICENSE and THIRD_PARTY_NOTICES.md carry the licences and credits of the logos: the package must hold them.
  const needed = ["package.json", "README.md", "CHANGELOG.md", "LICENSE", "THIRD_PARTY_NOTICES.md", pkg.icon, ...(pkg.contributes?.themes ?? []).map((t) => t.path), ...(pkg.contributes?.iconThemes ?? []).map((t) => t.path)];
  for (const p of needed.filter(Boolean).map((p) => String(p).replace(/^\.\//, ""))) {
    if (!exists(p)) { if (p === "LICENSE" || p === "THIRD_PARTY_NOTICES.md") fail(`${p} does not exist, and it must ship`); continue; }
    if (!ships(p)) fail(`${p} must ship but is not whitelisted, so it would not be packaged`);
  }
  for (const rel of walk("themes")) {
    if (variants.some((v) => rel === `themes/${v.id}-color-theme.json`)) continue;
    (ships(rel) ? fail : warn)(`${rel} is not generated by any variant${ships(rel) ? ", and it would be packaged" : ""}`);
  }
  // Sources and tools never ship.
  for (const p of ["build.mjs", "scripts/check.mjs", "src/tokens.mjs", ".github/workflows/release.yml", "PUBLICAR.md"]) if (exists(p) && ships(p)) fail(`${p} would be packaged`);
});

// ── 5. Texts ─────────────────────────────────────────────────────────────────────────
// Numbers in a text are compared with the generated icon theme wherever a number is followed by one of the nouns
// below ("284 file types", "1,199 file names", "101 de pasta"). The wording around them is free, a text without
// numbers is fine, and "more than 280" or "280+" only has to stay true.
const NOUNS = [
  ["fileExtensions", /^(file )?extensions\b|^extensões\b/i],
  ["fileNames", /^file ?names\b|^nomes de arquivos?\b/i],
  ["folderNames", /^folder names\b|^nomes de pastas?\b/i],
  ["languageIds", /^language (ids|modes)\b|^linguagens\b/i],
  ["fileIcons", /^file (types|icons|kinds)\b|^(ícones|tipos) de arquivos?\b/i],
  ["folderIcons", /^folder icons\b|^folders\b|^(ícones )?de pastas?\b|^pastas\b/i],
];
let claimsChecked = 0;
const checkCounts = (source) => {
  if (facts.fileIcons === undefined) return;
  for (const sentence of source.split(/\n|(?<=[.!?])\s+/)) {
    const logo = /logo/i.test(sentence);
    for (const m of sentence.matchAll(/(\d{1,3}(?:[.,]\d{3})+|\d+)(\+?)[*_`]*\s+/g)) {
      const after = sentence.slice(m.index + m[0].length).replace(/^[*_`]+/, "");
      const before = sentence.slice(0, m.index).replace(/[*_`]+$/, "");
      // "logos for 81 file types", "logos on 81 of those icons": in a sentence about logos, a count of files or
      // icons may be the number of logos.
      const [noun, nounRe] = NOUNS.find(([, re]) => re.test(after)) ?? (logo ? ["icons", /^(of (those|the|these) )?(icons|ícones)\b/i] : []);
      const words = nounRe?.exec(after)?.[0];
      if (!words) continue;
      const n = Number(m[1].replace(/[.,]/g, ""));
      const valid = noun === "icons" ? [facts.logoFiles, facts.logoFiles + facts.logoFolders, facts.fileIcons, facts.fileIcons + facts.folderIcons] : [facts[noun]];
      if (logo && noun === "fileIcons") valid.push(facts.logoFiles);
      if (logo && noun === "folderIcons") valid.push(facts.logoFolders);
      claimsChecked++;
      const atLeast = m[2] === "+" || /(more than|over|at least|mais de|pelo menos)\s*$/i.test(before);
      const about = /(about|around|nearly|almost|roughly|cerca de|quase|aproximadamente|~)\s*$/i.test(before);
      const ok = atLeast ? valid.some((x) => n <= x) : about ? valid.some((x) => Math.abs(n - x) <= x / 10) : valid.includes(n);
      if (!ok) fail(`says "${m[1]}${m[2]} ${words}", but the generated icon theme has ${[...new Set(valid)].join(" or ")}`);
    }
  }
};
await part("README.md", async () => {
  const readme = text("README.md");
  checkCounts(readme);
  for (const v of variants) if (!readme.includes(v.label)) warn(`does not mention the theme "${v.label}"`);
});
await part("package.json description", async () => checkCounts(String(pkg.description ?? "")));

for (const [file, labels] of [["wrong-color.yml", variants.map((v) => v.label)], ["icon-request.yml", (pkg.contributes?.iconThemes ?? []).map((t) => t.label)]]) {
  await part(`.github/ISSUE_TEMPLATE/${file}`, async () => {
    if (!exists(".github", "ISSUE_TEMPLATE", file)) return;
    const options = text(".github", "ISSUE_TEMPLATE", file).split(/\r?\n/).map((line) => line.trim());
    for (const label of labels) if (label && !options.includes(`- ${label}`)) fail(`the list of options does not offer "${label}"`);
  });
}

await part("CHANGELOG.md", async () => {
  if (!text("CHANGELOG.md").split(/\r?\n/).includes(`## ${pkg.version}`)) fail(`no "## ${pkg.version}" entry for the version in package.json`);
});

// vsce and ovsx run with "npx" in the workflows and in the guides. One version everywhere: a command without
// a version runs whatever is newest, and Dependabot does not see these pins. Every "<tool>@<version>" counts,
// in a command or in a sentence ("`@vscode/vsce@3.9.2` e `ovsx@1.2.0`").
await part("tool versions", async () => {
  const pins = { "@vscode/vsce": new Map(), ovsx: new Map() };
  for (const file of [...walk(".github/workflows"), "PUBLICAR.md", "CONTRIBUTING.md", "README.md"].filter((f) => exists(f))) {
    const body = text(file);
    for (const [, tool, version] of body.matchAll(/(@vscode\/vsce|\bovsx)@(\d+(?:\.\d+)*(?:-[\w.]*\w)?)/g)) pins[tool].set(version, [...(pins[tool].get(version) ?? []), file]);
    for (const [, tool] of body.matchAll(/\bnpx\s+(?:--yes\s+|-y\s+)?(@vscode\/vsce|ovsx)(?!@\d)/g)) fail(`${file}: "npx ${tool}" without a version runs whatever is newest: write the version the workflows pin`);
  }
  for (const [tool, versions] of Object.entries(pins)) {
    if (versions.size > 1) fail(`${tool} is pinned to different versions: ${[...versions].map(([version, files]) => `${version} in ${[...new Set(files)].join(", ")}`).join("; ")}`);
  }
});

// Open VSX trusted publishing is registered for this file name and this environment (PUBLICAR.md, section 2).
await part(".github/workflows/release.yml", async () => {
  if (!/^ +environment: release\s*$/m.test(text(".github", "workflows", "release.yml"))) fail('the release job must keep "environment: release": Open VSX only trusts that environment');
  // The list of what may be inside the package is written twice, in validate.yml and in release.yml (the release
  // does not wait for Validate): the two must stay equal.
  const allowed = (file) => (exists(".github", "workflows", file) ? /^ +allowed='(.+)'\s*$/m.exec(text(".github", "workflows", file))?.[1] : undefined);
  if (!allowed("release.yml")) fail("the release must check the list of packaged files before it publishes (the step with allowed='...', as in validate.yml)");
  else if (allowed("validate.yml") !== allowed("release.yml")) fail("the list of packaged files (allowed='...') is not the same in validate.yml and in release.yml");
});

// The store images are rendered by scripts/store/render.mjs, not by the build, so nothing regenerates them when a
// color changes. Whoever
// renders them records the colors they were made from (--stamp-screenshots). Without that file, nothing is said.
await part("images/screenshots", async () => {
  const stamp = ["images", "screenshots", "colors.sha256"];
  const hash = crypto.createHash("sha256").update(JSON.stringify([variants.map((v) => [v.id, v.roles, v.colors]), iconTokens])).digest("hex");
  if (flag("--stamp-screenshots")) fs.writeFileSync(at(...stamp), hash + "\n");
  else if (exists(...stamp) && text(...stamp).trim() !== hash) warn("the colors changed since the screenshots were rendered: render them again, then run node scripts/check.mjs --stamp-screenshots");
});

// ── Report ───────────────────────────────────────────────────────────────────────────
const inActions = process.env.GITHUB_ACTIONS === "true"; // GitHub shows these as annotations on the run
const print = (kind, items) => {
  const perArea = new Map();
  for (const [where, msg] of items) {
    const n = (perArea.get(where) ?? 0) + 1;
    perArea.set(where, n);
    if (n <= 20) console.error(`${inActions ? `::${kind}::` : `${kind}: `}[${where}] ${msg}`);
  }
  for (const [where, n] of perArea) if (n > 20) console.error(`${inActions ? `::${kind}::` : `${kind}: `}[${where}] and ${n - 20} more`);
};
if (flag("--verbose")) console.log(contrastTable.join("\n"));
print("warning", warnings);
print("error", failures);
const ratio = (kind) => (lowest[kind] ? `${(Math.floor(lowest[kind] * 100) / 100).toFixed(2)}:1 ${kind}` : null);
const summary = `${variants.length} variants (lowest syntax contrast: ${[ratio("regular"), ratio("high contrast")].filter(Boolean).join(", ")}), ${scopeCount} scopes, `
  + `${facts.fileIcons ?? "?"} file and ${facts.folderIcons ?? "?"} folder icons (${facts.logoFiles ?? "?"} + ${facts.logoFolders ?? "?"} with a logo), ${svgCount} SVG files, ${claimsChecked} numbers in the texts`;
if (failures.length) {
  console.error(`\n${failures.length} problem(s), ${warnings.length} warning(s). Checked: ${summary}`);
  process.exit(1);
}
console.log(`ok  ${summary}${warnings.length ? `; ${warnings.length} warning(s)` : ""}`);
