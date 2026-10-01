// Gera os temas de ícones em ./icons a partir de src/icons.
//
// - src/icons/mapping.json         quais arquivos/pastas usam cada ícone
// - src/icons/drawn/*.mjs           desenhos originais (edição Minimal), SVG 16×16 com {{cor}}
// - src/icons/logos/*.mjs           desenhos com logos (edição principal); o que não estiver
//                                   aqui usa o desenho original
// - src/icons/system/tokens.json    cor de cada {{cor}} no modo escuro e no claro
// - src/icons/system/folder.mjs     formato das pastas (fechada/aberta + selo)
//
// Saída:
//   icons/dark|light/*.svg               desenhos originais (usados pelas duas edições)
//   icons/logos/dark|light/*.svg         só os desenhos com logo
//   icons/serena-icons.json              edição com logos
//   icons/serena-icons-minimal.json      edição minimalista
//
// Chamado pelo build.mjs; não precisa rodar sozinho.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { folderIcon } from "./system/folder.mjs";


export const EDITIONS = [
  { id: "serena-icons", label: "Serena Icons", file: "serena-icons.json", logos: true },
  { id: "serena-icons-minimal", label: "Serena Icons Minimal", file: "serena-icons-minimal.json", logos: false },
];

async function loadDir(dir, errors, what) {
  const icons = {};
  const folders = {};
  if (!fs.existsSync(dir)) return { icons, folders };
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mjs")).sort()) {
    const mod = await import(pathToFileURL(path.join(dir, file)).href);
    for (const [id, markup] of Object.entries(mod.icons ?? {})) {
      if (icons[id]) errors.push(`${what}: ícone "${id}" desenhado em mais de um módulo`);
      icons[id] = markup;
    }
    for (const [id, spec] of Object.entries(mod.folders ?? {})) {
      if (folders[id]) errors.push(`${what}: pasta "${id}" desenhada em mais de um módulo`);
      folders[id] = spec;
    }
  }
  return { icons, folders };
}

export async function buildIcons(root) {
  const src = path.join(root, "src", "icons");
  const out = path.join(root, "icons");
  const errors = [];

  const tokens = JSON.parse(fs.readFileSync(path.join(src, "system", "tokens.json"), "utf8"));
  // "hc" (alto contraste) é opcional: cores de luminância média, legíveis no preto e no branco.
  const MODES = ["dark", "light", ...(tokens.hc ? ["hc"] : [])];
  const mapping = JSON.parse(fs.readFileSync(path.join(src, "mapping.json"), "utf8"));
  const minimal = await loadDir(path.join(src, "drawn"), errors, "drawn");
  const logos = await loadDir(path.join(src, "logos"), errors, "logos");

  // Nome de cada SVG: arquivos usam o id; pastas usam "folder-<id>" (+ "-open").
  const folderName = (id, open) => (id === "folder" ? "folder" : `folder-${id}`) + (open ? "-open" : "");

  const fileIds = new Set(mapping.files.map((f) => f.id));
  const folderIds = new Set(mapping.folders.map((f) => f.id));
  for (const id of Object.keys(logos.icons)) if (!fileIds.has(id)) errors.push(`logos: "${id}" não existe no mapping.json`);
  for (const id of Object.keys(logos.folders)) if (!folderIds.has(id)) errors.push(`logos: pasta "${id}" não existe no mapping.json`);

  // SVGs de cada conjunto: { nome: markup }
  const collect = (set, fallback) => {
    const svgs = {};
    for (const f of mapping.files) {
      const markup = set.icons[f.id] ?? (fallback ? null : undefined);
      if (markup) svgs[f.id] = markup;
      else if (!fallback) errors.push(`arquivo "${f.id}" está no mapping.json mas não foi desenhado`);
    }
    for (const f of mapping.folders) {
      const spec = set.folders[f.id];
      if (spec) for (const open of [false, true]) svgs[folderName(f.id, open)] = folderIcon(spec, open);
      else if (!fallback) errors.push(`pasta "${f.id}" está no mapping.json mas não foi desenhada`);
    }
    return svgs;
  };
  const minimalSvgs = collect(minimal, false);
  const logoSvgs = collect(logos, true);

  const writeSet = (svgs, dirOf) => {
    for (const mode of MODES) {
      const dir = dirOf(mode);
      fs.rmSync(dir, { recursive: true, force: true });
      fs.mkdirSync(dir, { recursive: true });
      for (const [name, markup] of Object.entries(svgs)) {
        let body = markup.replace(/\{\{(\w+)\}\}/g, (m, t) => {
          if (!tokens[mode][t]) errors.push(`cor "{{${t}}}" desconhecida em "${name}"`);
          return tokens[mode][t] ?? "#ff00ff";
        });
        // No alto contraste, as partes secundárias (.5) e os fundos (.2) ficam mais fortes.
        if (mode === "hc") {
          body = body
            .replace(/(fill|stroke)-opacity="\.5"/g, '$1-opacity=".65"')
            .replace(/(fill|stroke)-opacity="\.2"/g, '$1-opacity=".3"');
        }
        if (/<text\b/.test(body)) errors.push(`"${name}" usa <text> (fontes não existem no ícone)`);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">${body}</svg>\n`;
        fs.writeFileSync(path.join(dir, `${name}.svg`), svg);
      }
    }
  };
  writeSet(minimalSvgs, (mode) => path.join(out, mode));
  writeSet(logoSvgs, (mode) => path.join(out, "logos", mode));

  // Associações (iguais nas duas edições). O bloco "light" repete tudo com os ícones claros.
  const seen = new Map();
  const assoc = (suffix) => {
    const a = { fileExtensions: {}, fileNames: {}, languageIds: {}, folderNames: {}, folderNamesExpanded: {} };
    for (const f of mapping.files) {
      for (const [key, list] of [["fileExtensions", f.fileExtensions], ["fileNames", f.fileNames], ["languageIds", f.languageIds]]) {
        for (const k of list ?? []) {
          const dup = `${key}:${k}`;
          if (!suffix && seen.has(dup) && seen.get(dup) !== f.id) errors.push(`"${k}" (${key}) está em "${seen.get(dup)}" e "${f.id}"`);
          seen.set(dup, f.id);
          a[key][k] = f.id + suffix;
        }
      }
    }
    for (const f of mapping.folders) {
      for (const n of f.names ?? []) {
        a.folderNames[n] = folderName(f.id, false) + suffix;
        a.folderNamesExpanded[n] = folderName(f.id, true) + suffix;
      }
    }
    return {
      file: "file" + suffix,
      folder: "folder" + suffix,
      folderExpanded: "folder-open" + suffix,
      rootFolder: "folder" + suffix,
      rootFolderExpanded: "folder-open" + suffix,
      ...a,
    };
  };

  for (const edition of EDITIONS) {
    const iconDefinitions = {};
    for (const name of Object.keys(minimalSvgs)) {
      const useLogo = edition.logos && logoSvgs[name];
      const base = useLogo ? "./logos/" : "./";
      iconDefinitions[name] = { iconPath: `${base}dark/${name}.svg` };
      iconDefinitions[`${name}_light`] = { iconPath: `${base}light/${name}.svg` };
      if (MODES.includes("hc")) iconDefinitions[`${name}_hc`] = { iconPath: `${base}hc/${name}.svg` };
    }
    const theme = {
      hidesExplorerArrows: false,
      showLanguageModeIcons: false,
      iconDefinitions,
      ...assoc(""),
      light: assoc("_light"),
      ...(MODES.includes("hc") ? { highContrast: assoc("_hc") } : {}),
    };
    fs.writeFileSync(path.join(out, edition.file), JSON.stringify(theme) + "\n");
  }
  // Nome antigo (antes de existirem duas edições).
  fs.rmSync(path.join(out, "serena-icon-theme.json"), { force: true });

  return {
    errors,
    editions: EDITIONS.map((e) => ({ id: e.id, label: e.label, path: `./icons/${e.file}` })),
    summary: `${mapping.files.length} arquivos, ${mapping.folders.length} pastas; ${Object.keys(logoSvgs).length} com logo`,
  };
}
