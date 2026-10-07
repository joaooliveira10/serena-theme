// Gera os temas de cores em ./themes e o tema de ícones em ./icons a partir de ./src.
// Uso: node build.mjs
// Depois: node scripts/check.mjs (confere o que o build não confere: contraste, ícones, números do README...)
//
// - src/tokens.mjs      regras de sintaxe (iguais para todas as variantes, usando papéis)
// - src/variants/*.mjs  cada variante: cor de cada papel + cores da interface
// - src/icons/          ícones de arquivos e pastas (veja src/icons/build-icons.mjs)
//
// Não há dependências para instalar. O CI roda com o Node 24.
//
// O build termina com código 1, e uma linha por problema dizendo o arquivo e a chave, quando encontra:
// papel desconhecido em src/tokens.mjs (r.keywrod), regra sem cor nem estilo, variante com "type" errado,
// "id" ou "label" repetido, papel ausente numa variante ou cor que não é #rrggbb / #rrggbbaa.
// Tudo é conferido antes de qualquer gravação: com um problema, em src/ ou nos ícones, nenhum arquivo é
// escrito nem apagado (themes/, icons/, README.md e package.json ficam como estavam).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tokenColors, semanticTokenColors } from "./src/tokens.mjs";
import { buildIcons } from "./src/icons/build-icons.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const ROLES = ["fg", "punct", "comment", "keyword", "func", "string", "constant", "type", "property", "special", "param"];
const HEX = /^#([0-9a-f]{6}|[0-9a-f]{8})$/i;
// "type" de cada variante e o "uiTheme" que ele vira no package.json.
// A ordem das chaves é a ordem dos temas: escuros, claros e depois alto contraste.
const UI_THEME = { dark: "vs-dark", light: "vs", hc: "hc-black", hcLight: "hc-light" };
const TYPES = Object.keys(UI_THEME);

const errors = [];
const check = (cond, msg) => { if (!cond) errors.push(msg); };
const isHex = (value) => typeof value === "string" && HEX.test(value);
const finish = () => {
  if (!errors.length) return;
  // O mesmo problema de src/tokens.mjs aparece uma vez por variante: mostra uma linha só.
  console.error("\nProblemas encontrados (nada foi gravado):\n" + [...new Set(errors)].map((e) => "  - " + e).join("\n"));
  process.exit(1);
};

const variantDir = path.join(root, "src", "variants");
const themeFiles = []; // [caminho, conteúdo] de cada tema: gravados só no fim, depois de tudo conferido
const variants = [];
const source = new Map(); // variante -> arquivo de origem, para as mensagens de erro
for (const file of fs.readdirSync(variantDir).filter((f) => f.endsWith(".mjs")).sort()) {
  const v = (await import(pathToFileURL(path.join(variantDir, file)).href)).default;
  if (v === null || typeof v !== "object") {
    errors.push(`src/variants/${file}: falta o "export default { id, label, type, roles, colors }"`);
    continue;
  }
  source.set(v, `src/variants/${file}`);
  variants.push(v);
}
check(variants.length > 0, "src/variants: nenhuma variante encontrada");
// Escuros, claros e depois alto contraste; dentro de cada grupo, por nome.
variants.sort((a, b) => TYPES.indexOf(a.type) - TYPES.indexOf(b.type) || String(a.label).localeCompare(String(b.label), "en"));

// src/tokens.mjs lê os papéis como r.keyword, r.func... Um nome errado (r.keywrod) seria só "undefined" e a regra
// sairia sem cor, sem aviso. Com este Proxy o build acusa o nome.
const strictRoles = (v) => new Proxy(v.roles ?? {}, {
  get(roles, role) {
    if (typeof role === "string") check(ROLES.includes(role), `src/tokens.mjs: papel desconhecido "r.${role}" (os papéis são: ${ROLES.join(", ")})`);
    return roles[role];
  },
});

for (const v of variants) {
  const src = source.get(v);
  const others = (key) => variants.filter((o) => o !== v && o[key] === v[key]).map((o) => source.get(o));

  // O id vira nome de arquivo em themes/: sem id válido, nada é escrito.
  const idOk = typeof v.id === "string" && /^[a-z0-9][a-z0-9-]*$/.test(v.id);
  check(idOk, `${src}: id ${JSON.stringify(v.id)} inválido (use letras minúsculas, números e hífens)`);
  if (idOk) check(!others("id").length, `${src}: id "${v.id}" repetido em ${others("id").join(", ")}`);
  const labelOk = typeof v.label === "string" && v.label.trim() !== "";
  check(labelOk, `${src}: label ${JSON.stringify(v.label)} inválido`);
  if (labelOk) check(!others("label").length, `${src}: label "${v.label}" repetido em ${others("label").join(", ")}`);
  check(TYPES.includes(v.type), `${src}: type ${JSON.stringify(v.type)} deve ser um de: ${TYPES.join(", ")}`);

  for (const role of ROLES) {
    const value = v.roles?.[role];
    check(isHex(value), `${src}: papel "${role}" ${value === undefined ? "ausente" : `com cor inválida: ${JSON.stringify(value)}`}`);
  }
  for (const role of Object.keys(v.roles ?? {})) check(ROLES.includes(role), `${src}: papel "${role}" desconhecido (os papéis são: ${ROLES.join(", ")}; um papel novo entra na lista ROLES do build.mjs)`);
  check(v.colors !== null && typeof v.colors === "object", `${src}: falta o bloco "colors"`);
  for (const [key, value] of Object.entries(v.colors ?? {})) check(isHex(value), `${src}: cor inválida em "${key}": ${JSON.stringify(value)}`);

  const roles = strictRoles(v);
  const theme = {
    $schema: "vscode://schemas/color-theme",
    name: v.label,
    type: v.type,
    semanticHighlighting: true,
    colors: v.colors,
    tokenColors: tokenColors(roles),
    semanticTokenColors: semanticTokenColors(roles),
  };

  // Toda regra precisa pintar alguma coisa. Sem cor só vale quando a regra define um estilo (itálico, negrito...).
  // Uma cor que veio de um papel da variante já foi conferida acima; aqui sobram as cores escritas direto na regra.
  // Numa variante com papel faltando, as regras desse papel ficam sem cor por consequência: a linha do papel basta.
  const rolesOk = ROLES.every((role) => isHex(v.roles?.[role]));
  const fromRole = new Set(Object.values(v.roles ?? {}));
  const checkRule = (what, fg, hasStyle) => {
    if (!rolesOk) return;
    if (fg === undefined) check(hasStyle, `src/tokens.mjs: ${what} não define cor nem estilo`);
    else if (!fromRole.has(fg)) check(isHex(fg), `src/tokens.mjs: ${what} com cor inválida: ${JSON.stringify(fg)}`);
  };
  for (const rule of theme.tokenColors) {
    checkRule(`regra "${rule.name ?? [].concat(rule.scope)[0]}"`, rule.settings?.foreground, rule.settings?.fontStyle !== undefined);
  }
  for (const [selector, value] of Object.entries(theme.semanticTokenColors)) {
    const isObject = value !== null && typeof value === "object";
    const hasStyle = isObject && Object.entries(value).some(([key, style]) => key !== "foreground" && style !== undefined);
    checkRule(`regra semântica "${selector}"`, isObject ? value.foreground : value, hasStyle);
  }

  if (!idOk) continue;
  const header = `// Gerado por build.mjs a partir de src/. Não edite este arquivo: edite src/ e rode "node build.mjs".\n`;
  themeFiles.push([path.join(root, "themes", `${v.id}-color-theme.json`), header + JSON.stringify(theme, null, 2) + "\n"]);
}
if (!variants.length) finish();

// README: o bloco "Prefer no italics?" é gerado das regras. Uma regra do usuário só vence a do tema quando tem o
// MESMO seletor (TextMate: o escopo mais específico vence; semântico: vence a maior pontuação, e "*" vale 0),
// então todo seletor em itálico do tema precisa aparecer no bloco.
const readmePath = path.join(root, "README.md");
let readme; // README.md com o bloco novo
let readmeSummary;
{
  const roles = variants[0].roles ?? {};
  const italic = [];
  const boldItalic = [];
  for (const rule of tokenColors(roles)) {
    const style = rule.settings?.fontStyle ?? "";
    if (!style.includes("italic")) continue;
    (style.includes("bold") ? boldItalic : italic).push([].concat(rule.scope).map((s) => JSON.stringify(s)).join(", "));
  }
  const semantic = Object.entries(semanticTokenColors(roles)).filter(([, v]) => v?.italic === true).map(([k]) => k);
  const current = fs.readFileSync(readmePath, "utf8");
  // Um README salvo com CRLF (editor no Windows) continua valendo: o bloco sai com o mesmo fim de linha do arquivo.
  const eol = current.includes("\r\n") ? "\r\n" : "\n";
  const block = [
    "```jsonc",
    "{",
    '  "editor.tokenColorCustomizations": {',
    '    "[Serena*]": {',
    '      "textMateRules": [',
    "        {",
    '          "scope": [',
    italic.map((line) => "            " + line).join("," + eol),
    "          ],",
    '          "settings": { "fontStyle": "" }',
    "        },",
    "        {",
    '          "scope": [' + boldItalic.join(", ") + "],",
    '          "settings": { "fontStyle": "bold" }',
    "        }",
    "      ]",
    "    }",
    "  },",
    '  "editor.semanticTokenColorCustomizations": {',
    '    "[Serena*]": {',
    '      "rules": {',
    ["*", ...semantic].map((k) => "        " + JSON.stringify(k) + ': { "italic": false }').join("," + eol),
    "      }",
    "    }",
    "  }",
    "}",
    "```",
  ].join(eol);
  const marker = /(<!-- no-italics:start -->\r?\n)[\s\S]*?(\r?\n<!-- no-italics:end -->)/;
  check(marker.test(current), "README.md: marcadores <!-- no-italics:start --> / <!-- no-italics:end --> ausentes");
  readme = current.replace(marker, (_, start, end) => start + block + end);
  readmeSummary = `sem itálico: ${italic.length} regras TextMate, ${semantic.length} semânticas`;
}

// Os ícones são conferidos e montados na memória; icons.write() grava (e só existe quando os ícones estão certos).
const icons = await buildIcons(root);
errors.push(...icons.errors);

const pkgPath = path.join(root, "package.json");
let pkg = null;
try {
  pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
} catch (e) {
  errors.push(`package.json: não pôde ser lido (${e.message.split("\n")[0]})`);
}
if (pkg) check(pkg.contributes !== null && typeof pkg.contributes === "object", 'package.json: falta o bloco "contributes"');

// Daqui para cima nada foi gravado. Com qualquer problema o build para aqui, e a árvore fica como estava.
finish();

for (const [file, content] of themeFiles) {
  fs.writeFileSync(file, content);
  console.log(`ok  ${path.relative(root, file)}`);
}
// Um tema que nenhuma variante gera mais (variante renomeada ou apagada) não pode ficar em themes/: ele seria
// empacotado. O build só chega aqui com as variantes certas: um id inválido para antes de apagar um tema bom.
for (const file of fs.readdirSync(path.join(root, "themes"))) {
  if (!file.endsWith("-color-theme.json") || variants.some((v) => file === `${v.id}-color-theme.json`)) continue;
  fs.rmSync(path.join(root, "themes", file));
  console.log(`removido  ${path.join("themes", file)} (nenhuma variante gera este tema)`);
}

fs.writeFileSync(readmePath, readme);
console.log(`ok  README.md (${readmeSummary})`);

icons.write();
console.log(`ok  icons/ (${icons.summary})`);

// Mantém as listas de temas do package.json em sincronia com o que foi gerado.
pkg.contributes.themes = variants.map((v) => ({
  label: v.label,
  uiTheme: UI_THEME[v.type],
  path: `./themes/${v.id}-color-theme.json`,
}));
pkg.contributes.iconThemes = icons.editions;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
