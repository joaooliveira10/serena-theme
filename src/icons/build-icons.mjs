// Gera os temas de ícones em ./icons a partir de src/icons.
//
// - src/icons/mapping.json         quais arquivos/pastas usam cada ícone
// - src/icons/drawn/*.mjs           desenhos originais (edição Minimal), SVG 16×16 com {{cor}}
// - src/icons/logos/*.mjs           desenhos com logos (edição principal); o que não estiver
//                                   aqui usa o desenho original
// - src/icons/system/tokens.json    cor de cada {{cor}} nos modos escuro, claro e alto contraste
// - src/icons/system/folder.mjs     formato das pastas (fechada/aberta + selo)
//
// Saída:
//   icons/dark|light|hc/*.svg            desenhos originais (usados pelas duas edições)
//   icons/logos/dark|light|hc/*.svg      só os desenhos com logo
//   icons/serena-icons.json              edição com logos
//   icons/serena-icons-minimal.json      edição minimalista
//
// Nada é corrigido em silêncio. Com qualquer problema (id que não serve de nome de arquivo, desenho com
// algo além de <path>, logo que aponta para um desenho que não existe, chave em dois conceitos...) o build
// devolve os erros, não escreve nada em ./icons e o build.mjs sai com código 1.
// buildIcons() confere e monta tudo na memória e devolve { errors, editions, summary, write }: quem grava é
// write(), que só existe sem erros. O build.mjs o chama depois de conferir também os temas de cores.
// Um arquivo só é regravado quando o conteúdo muda; o que não é mais gerado é apagado.
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

// O id de um conceito vira nome de arquivo (icons/<modo>/<id>.svg) e id de ícone no tema. Só minúsculas,
// dígitos, "-" e "_", começando por letra: "../x" escreveria fora de ./icons, e ids numéricos mudam a
// ordem das regras no VS Code (spec.md, seção 3.2).
const SAFE_ID = /^[a-z][a-z0-9_-]*$/;

// Extensões de "ambiente": mapeá-las sequestraria Dockerfile.dev, .env.local, config.yml.dist (spec.md, seção 8).
const GENERIC_EXTENSIONS = new Set(["dev", "prod", "local", "example", "template", "sample", "dist", "bak", "old", "orig"]);

// No alto contraste as partes secundárias (.5) ficam mais fortes. O fundo dos chips (.2) não muda:
// um fundo mais forte diminuiria o contraste das letras no tema claro de alto contraste.
const HC_OPACITY = { ".5": ".85" };

// Um ícone é uma lista de <path .../> com atributos de desenho, e mais nada: o que não está aqui é recusado
// (<script>, <text>, <image>, <use>, style, on*, href, url(), transform...). A conferência é feita no desenho
// como foi escrito: cores só como {{nome}} de tokens.json (nunca um #hex fixo) e opacidades só .2 e .5
// (style.md, seção 3). Os valores de tokens.json são conferidos à parte, ao carregar.
const PAINT = /^(none|\{\{\w+\}\})$/;
const SAFE_ATTRS = {
  d: /^[MmLlHhVvCcSsQqTtAaZz0-9eE .,+-]+$/,
  fill: PAINT,
  stroke: PAINT,
  "fill-rule": /^(evenodd|nonzero)$/,
  "fill-opacity": /^\.[25]$/,
  "stroke-opacity": /^\.[25]$/,
  "stroke-width": /^\d*\.?\d+$/,
  "stroke-linecap": /^(round|butt|square)$/,
  "stroke-linejoin": /^(round|miter|bevel)$/,
};

/** Motivo pelo qual o desenho não pode ser gravado, ou null quando é só <path> com atributos permitidos. */
function unsafeMarkup(body) {
  if (!body) return "desenho vazio";
  let rest = body;
  while (rest) {
    const el = /^<path((?: [a-z-]+="[^"]*")+)\/>/.exec(rest);
    if (!el) return `só <path .../> é permitido; encontrei ${JSON.stringify(rest.slice(0, 60))}`;
    for (const [, name, value] of el[1].matchAll(/ ([a-z-]+)="([^"]*)"/g)) {
      if (!Object.hasOwn(SAFE_ATTRS, name)) return `atributo "${name}" não é permitido`;
      if (!SAFE_ATTRS[name].test(value)) return `valor não permitido em ${name}=${JSON.stringify(value.slice(0, 60))}`;
    }
    rest = rest.slice(el[0].length);
  }
  return null;
}

// Os dicionários indexados por id ou por chave do mapping.json não herdam de Object.prototype:
// "constructor" é um id (e um nome de arquivo) válido e não pode ser confundido com uma propriedade herdada.
const dict = () => Object.create(null);

async function loadDir(dir, errors, what) {
  const icons = dict();
  const folders = dict();
  if (!fs.existsSync(dir)) return { icons, folders };
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mjs")).sort()) {
    const mod = await import(pathToFileURL(path.join(dir, file)).href);
    for (const [id, markup] of Object.entries(mod.icons ?? {})) {
      if (icons[id]) errors.push(`${what}: ícone "${id}" desenhado em mais de um módulo`);
      // Ex.: "nuget-config": A["nugget"] vale undefined. Sem este erro o arquivo perderia o logo sem aviso.
      if (typeof markup !== "string" || !markup) errors.push(`${what}/${file}: ícone "${id}" sem desenho (referência a um id que não existe?)`);
      icons[id] = markup;
    }
    for (const [id, spec] of Object.entries(mod.folders ?? {})) {
      if (folders[id]) errors.push(`${what}: pasta "${id}" desenhada em mais de um módulo`);
      if (!spec || typeof spec !== "object" || typeof spec.token !== "string" || (spec.badge !== undefined && typeof spec.badge !== "string")) {
        errors.push(`${what}/${file}: pasta "${id}" precisa ser { token, badge } (referência a um id que não existe?)`);
      }
      folders[id] = spec;
    }
  }
  return { icons, folders };
}

// Nome de cada SVG: arquivos usam o id; pastas usam "folder-<id>" (+ "-open").
const folderName = (id, open) => (id === "folder" ? "folder" : `folder-${id}`) + (open ? "-open" : "");

/** O que há de errado com uma chave do mapping.json, ou null. */
function keyProblem(kind, key) {
  if (typeof key !== "string" || !key) return "está vazia";
  if (/[\s*?]/.test(key)) return "tem espaço ou curinga (o VS Code não aceita padrões)";
  if (kind === "languageIds") return null; // ids de linguagem são comparados como estão escritos
  if (key !== key.toLowerCase()) return "precisa estar em minúsculas (o VS Code compara em minúsculas)";
  const parts = key.split("/");
  if (parts.length > 2 || parts.some((p) => !p)) return 'aceita no máximo uma pasta-pai ("pai/nome")';
  if (kind === "fileExtensions") {
    if (parts.at(-1).startsWith(".")) return "extensão se escreve sem o ponto inicial";
    if (parts.length === 1 && GENERIC_EXTENSIONS.has(key)) return "extensão genérica demais (pegaria Dockerfile.dev, .env.local...)";
  }
  return null;
}

/** Regras do mapping.json (spec.md, seção 8). Devolve false quando algum id não serve de nome de arquivo. */
function checkMapping(mapping, errors) {
  let idsOk = true;
  const svgOwner = new Map(); // nome do SVG -> conceito que o gera
  const keyOwner = new Map(); // "tipo:chave" -> conceito
  const claimSvg = (name, who) => {
    if (svgOwner.has(name)) errors.push(`${who} e ${svgOwner.get(name)} gerariam o mesmo arquivo "${name}.svg"`);
    else svgOwner.set(name, who);
  };
  const claimKey = (kind, key, id) => {
    const problem = keyProblem(kind, key);
    if (problem) { errors.push(`"${id}": chave ${JSON.stringify(key)} (${kind}) ${problem}`); return; }
    const k = `${kind}:${key}`;
    if (!keyOwner.has(k)) keyOwner.set(k, id);
    else if (keyOwner.get(k) === id) errors.push(`"${key}" (${kind}) aparece duas vezes em "${id}"`);
    else errors.push(kind === "folderNames" ? `pasta "${key}" está em "${keyOwner.get(k)}" e "${id}"` : `"${key}" (${kind}) está em "${keyOwner.get(k)}" e "${id}"`);
  };
  for (const [list, what] of [[mapping.files, "arquivo"], [mapping.folders, "pasta"]]) {
    for (const f of list) {
      if (typeof f.id !== "string" || !SAFE_ID.test(f.id)) { errors.push(`mapping.json: id inválido ${JSON.stringify(f.id)} (${what}; use minúsculas, dígitos, "-" e "_", começando por letra)`); idsOk = false; continue; }
      if (what === "arquivo") {
        claimSvg(f.id, `arquivo "${f.id}"`);
        for (const kind of ["fileExtensions", "fileNames", "languageIds"]) for (const key of f[kind] ?? []) claimKey(kind, key, f.id);
      } else {
        for (const open of [false, true]) claimSvg(folderName(f.id, open), `pasta "${f.id}"`);
        for (const key of f.names ?? []) claimKey("folderNames", key, f.id);
      }
    }
  }
  return idsOk;
}

const writeIfChanged = (file, content) => {
  const stat = fs.statSync(file, { throwIfNoEntry: false });
  if (stat && !stat.isFile()) fs.rmSync(file, { recursive: true, force: true });
  else if (stat && fs.readFileSync(file, "utf8") === content) return;
  fs.writeFileSync(file, content);
};

/** Deixa a pasta com exatamente estes arquivos: apaga o que sobrou, grava só o que mudou. */
function syncDir(dir, files) {
  fs.mkdirSync(dir, { recursive: true });
  for (const old of fs.readdirSync(dir)) if (!files.has(old)) fs.rmSync(path.join(dir, old), { recursive: true, force: true });
  for (const [name, content] of files) writeIfChanged(path.join(dir, name), content);
}

export async function buildIcons(root) {
  const src = path.join(root, "src", "icons");
  const out = path.join(root, "icons");
  const errors = [];

  const tokens = JSON.parse(fs.readFileSync(path.join(src, "system", "tokens.json"), "utf8"));
  // "hc" (alto contraste) é opcional: um só conjunto de cores serve ao tema preto e ao tema branco.
  const MODES = ["dark", "light", ...(tokens.hc ? ["hc"] : [])];
  // Cada modo define as mesmas cores, sempre #rrggbb: o valor entra direto em fill="..." / stroke="...".
  let tokensOk = true;
  for (const mode of MODES) {
    for (const t of new Set([...Object.keys(tokens.dark), ...Object.keys(tokens[mode])])) {
      if (!/^#[0-9a-f]{6}$/.test(tokens[mode][t] ?? "") || !tokens.dark[t]) {
        errors.push(`tokens.json: ${mode}.${t} = ${JSON.stringify(tokens[mode][t])} (cada modo precisa das mesmas cores, em #rrggbb minúsculo)`);
        tokensOk = false;
      }
    }
  }
  const mapping = JSON.parse(fs.readFileSync(path.join(src, "mapping.json"), "utf8"));
  const idsOk = checkMapping(mapping, errors);
  const minimal = await loadDir(path.join(src, "drawn"), errors, "drawn");
  const logos = await loadDir(path.join(src, "logos"), errors, "logos");

  const fileIds = new Set(mapping.files.map((f) => f.id));
  const folderIds = new Set(mapping.folders.map((f) => f.id));
  for (const [set, what] of [[minimal, "drawn"], [logos, "logos"]]) {
    for (const id of Object.keys(set.icons)) if (!fileIds.has(id)) errors.push(`${what}: "${id}" não existe no mapping.json`);
    for (const id of Object.keys(set.folders)) if (!folderIds.has(id)) errors.push(`${what}: pasta "${id}" não existe no mapping.json`);
  }

  const result = (summary) => ({
    errors: [...new Set(errors)],
    editions: EDITIONS.map((e) => ({ id: e.id, label: e.label, path: `./icons/${e.file}` })),
    summary,
  });
  // Um id inválido não pode chegar a virar caminho de arquivo, nem uma cor inválida a virar atributo:
  // para aqui, sem tocar em ./icons.
  if (!idsOk || !tokensOk) return result("nada gerado");

  // SVGs de cada conjunto: { nome: markup }. Na edição com logos, um conceito sem logo usa o desenho
  // original (é o esperado); um logo declarado mas vazio já virou erro em loadDir.
  const collect = (set, fallback) => {
    const svgs = dict();
    for (const f of mapping.files) {
      const markup = set.icons[f.id];
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

  // Conteúdo de cada pasta de saída: Map(pasta -> Map(arquivo -> conteúdo)). Nada é gravado ainda.
  const dirs = new Map();
  const render = (svgs, dirOf) => {
    for (const [name, markup] of Object.entries(svgs)) {
      const unsafe = unsafeMarkup(markup);
      if (unsafe) errors.push(`"${name}": ${unsafe}`);
    }
    for (const mode of MODES) {
      const files = new Map();
      for (const [name, markup] of Object.entries(svgs)) {
        let body = markup.replace(/\{\{(\w+)\}\}/g, (m, t) => {
          // hasOwn: "{{constructor}}" ou "{{toString}}" não são cores
          if (!Object.hasOwn(tokens[mode], t)) { errors.push(`cor "{{${t}}}" desconhecida em "${name}"`); return "#ff00ff"; }
          return tokens[mode][t];
        });
        if (mode === "hc") body = body.replace(/(fill|stroke)-opacity="(\.\d+)"/g, (m, attr, value) => `${attr}-opacity="${HC_OPACITY[value] ?? value}"`);
        files.set(`${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">${body}</svg>\n`);
      }
      dirs.set(dirOf(mode), files);
    }
  };
  render(minimalSvgs, (mode) => path.join(out, mode));
  render(logoSvgs, (mode) => path.join(out, "logos", mode));

  // Associações (iguais nas duas edições). Os blocos "light" e "highContrast" repetem tudo com os ícones
  // de cada modo; chaves repetidas ou fora do padrão já foram recusadas em checkMapping.
  const assoc = (suffix) => {
    const a = { fileExtensions: dict(), fileNames: dict(), languageIds: dict(), folderNames: dict(), folderNamesExpanded: dict() };
    for (const f of mapping.files) {
      for (const key of ["fileExtensions", "fileNames", "languageIds"]) for (const k of f[key] ?? []) a[key][k] = f.id + suffix;
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

  const themes = new Map();
  for (const edition of EDITIONS) {
    const iconDefinitions = dict();
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
    themes.set(edition.file, JSON.stringify(theme) + "\n");
  }

  const logoFiles = Object.keys(logoSvgs).filter((name) => fileIds.has(name)).length;
  const logoFolders = mapping.folders.filter((f) => logos.folders[f.id]).length;
  const summary = `${mapping.files.length} arquivos, ${mapping.folders.length} pastas; logos em ${logoFiles} arquivos e ${logoFolders} pastas`;
  if (errors.length) return result(summary);

  // Nada foi gravado até aqui. Quem grava é write(), que o build.mjs chama depois de conferir também os temas
  // de cores; com erros nos ícones, write não existe.
  const write = () => {
    for (const [dir, files] of dirs) syncDir(dir, files);
    for (const [file, content] of themes) writeIfChanged(path.join(out, file), content);
  };
  return { ...result(summary), write };
}
