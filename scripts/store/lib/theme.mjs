// Reads what "node build.mjs" generated: the six color themes (with the roles of their variant) and the icon
// themes, and resolves file and folder icons the way VS Code does.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

/** The themes in the order of package.json (dark, light, high contrast). */
export async function loadThemes(root) {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const themes = [];
  for (const entry of pkg.contributes.themes) {
    const file = path.join(root, entry.path);
    const id = path.basename(file).replace(/-color-theme\.json$/, "");
    // The generated files start with one "//" comment line; the rest is plain JSON.
    const json = JSON.parse(fs.readFileSync(file, "utf8").replace(/^\s*\/\/[^\n]*\n/, ""));
    const variant = (await import(pathToFileURL(path.join(root, "src", "variants", `${id}.mjs`)).href)).default;
    themes.push({
      id,
      label: entry.label,
      type: json.type, // dark | light | hc | hcLight
      dark: json.type === "dark" || json.type === "hc",
      highContrast: json.type === "hc" || json.type === "hcLight",
      iconMode: json.type === "dark" ? "dark" : json.type === "light" ? "light" : "hc",
      json,
      roles: variant.roles,
      /** A color the theme sets. Throws when it does not, so the images never show an invented color. */
      color(key) {
        const value = json.colors[key];
        if (!value) throw new Error(`${id}: the theme does not set "${key}"`);
        return value;
      },
      has: (key) => Boolean(json.colors[key]),
    });
  }
  return themes;
}

// ── Icons ────────────────────────────────────────────────────────────────────────────

// Language ids of VS Code's built-in languages, for the file names the images show. An icon theme may give an
// icon to a language instead of an extension (Markdown here), and VS Code falls back to it when neither the
// file name nor an extension has an icon. Add a line when a new file name needs it.
const LANGUAGE_OF_NAME = { dockerfile: "dockerfile", makefile: "makefile", ".gitignore": "ignore", ".env": "dotenv" };
const LANGUAGE_OF_EXTENSION = {
  md: "markdown", ts: "typescript", tsx: "typescriptreact", js: "javascript", mjs: "javascript", cjs: "javascript", jsx: "javascriptreact",
  json: "json", jsonc: "jsonc", html: "html", css: "css", scss: "scss", less: "less", xml: "xml", svg: "xml", yml: "yaml", yaml: "yaml",
  py: "python", go: "go", rs: "rust", java: "java", c: "c", h: "c", cpp: "cpp", cs: "csharp", php: "php", rb: "ruby", swift: "swift",
  dart: "dart", lua: "lua", r: "r", sql: "sql", sh: "shellscript", ps1: "powershell", bat: "bat", ini: "ini", log: "log", diff: "diff",
  txt: "plaintext",
};
export const languageOf = (name) => {
  const lower = name.toLowerCase();
  return LANGUAGE_OF_NAME[lower] ?? LANGUAGE_OF_EXTENSION[lower.slice(lower.lastIndexOf(".") + 1)] ?? "";
};

/** file: "serena-icons.json" or "serena-icons-minimal.json" */
export function loadIconTheme(root, file) {
  const dir = path.join(root, "icons");
  const json = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  const cache = new Map();
  const section = (mode) => {
    const part = mode === "light" ? json.light : mode === "hc" ? json.highContrast : json;
    if (!part) throw new Error(`${file}: no icons for the "${mode}" mode`);
    return part;
  };
  const icon = (id, rule) => {
    const definition = json.iconDefinitions[id];
    if (!definition) throw new Error(`${file}: "${rule}" points to the unknown icon "${id}"`);
    const svg = path.join(dir, definition.iconPath);
    if (!cache.has(svg)) cache.set(svg, "data:image/svg+xml;base64," + fs.readFileSync(svg).toString("base64"));
    return { id, rule, logo: definition.iconPath.includes("/logos/"), uri: cache.get(svg) };
  };
  return {
    file,
    /**
     * VS Code's order: the file name, then the longest extension, then the language, then the default icon.
     * A key may carry the parent folder ("parent/name"); that form wins over the plain one.
     */
    fileIcon(mode, name, { parent = "", languageId = languageOf(name) } = {}) {
      const maps = section(mode);
      const lower = name.toLowerCase();
      const dir = parent.toLowerCase();
      const tries = [];
      if (dir) tries.push(["fileNames", `${dir}/${lower}`]);
      tries.push(["fileNames", lower]);
      const parts = lower.split(".");
      for (let i = 1; i < parts.length; i++) {
        const ext = parts.slice(i).join(".");
        if (dir) tries.push(["fileExtensions", `${dir}/${ext}`]);
        tries.push(["fileExtensions", ext]);
      }
      if (languageId) tries.push(["languageIds", languageId]);
      for (const [map, key] of tries) if (maps[map]?.[key]) return icon(maps[map][key], `${map}["${key}"]`);
      return icon(maps.file, "file");
    },
    folderIcon(mode, name, { parent = "", expanded = false } = {}) {
      const maps = section(mode);
      const names = expanded ? maps.folderNamesExpanded : maps.folderNames;
      const lower = name.toLowerCase();
      const dir = parent.toLowerCase();
      for (const key of dir ? [`${dir}/${lower}`, lower] : [lower]) {
        if (names?.[key]) return icon(names[key], `${expanded ? "folderNamesExpanded" : "folderNames"}["${key}"]`);
      }
      return icon(expanded ? maps.folderExpanded : maps.folder, expanded ? "folderExpanded" : "folder");
    },
  };
}
