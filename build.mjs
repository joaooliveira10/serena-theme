// Gera os temas de cores em ./themes e o tema de ícones em ./icons a partir de ./src.
// Uso: node build.mjs
//
// - src/tokens.mjs      regras de sintaxe (iguais para todas as variantes, usando papéis)
// - src/variants/*.mjs  cada variante: cor de cada papel + cores da interface
// - src/icons/          ícones de arquivos e pastas (veja src/icons/build-icons.mjs)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tokenColors, semanticTokenColors } from "./src/tokens.mjs";
import { buildIcons } from "./src/icons/build-icons.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const ROLES = ["fg", "punct", "comment", "keyword", "func", "string", "constant", "type", "property", "special", "param"];
const HEX = /^#([0-9a-f]{6}|[0-9a-f]{8})$/i;

const variantDir = path.join(root, "src", "variants");
const variants = [];
for (const file of fs.readdirSync(variantDir).filter((f) => f.endsWith(".mjs")).sort()) {
  variants.push((await import(pathToFileURL(path.join(variantDir, file)).href)).default);
}
// Escuros, claros e depois alto contraste; dentro de cada grupo, por nome.
const ORDER = { dark: 0, light: 1, hc: 2, hcLight: 3 };
variants.sort((a, b) => ORDER[a.type] - ORDER[b.type] || a.label.localeCompare(b.label));

const errors = [];
const check = (cond, msg) => { if (!cond) errors.push(msg); };

for (const v of variants) {
  for (const role of ROLES) check(HEX.test(v.roles?.[role] ?? ""), `${v.id}: papel "${role}" ausente ou inválido`);
  for (const [key, value] of Object.entries(v.colors)) check(HEX.test(value), `${v.id}: cor inválida em "${key}": ${value}`);

  const theme = {
    $schema: "vscode://schemas/color-theme",
    name: v.label,
    type: v.type,
    semanticHighlighting: true,
    colors: v.colors,
    tokenColors: tokenColors(v.roles),
    semanticTokenColors: semanticTokenColors(v.roles),
  };

  for (const rule of theme.tokenColors) {
    const fg = rule.settings.foreground;
    check(fg === undefined || HEX.test(fg), `${v.id}: regra "${rule.name ?? rule.scope[0]}" sem cor válida`);
  }

  const out = path.join(root, "themes", `${v.id}-color-theme.json`);
  const header = `// Gerado por build.mjs a partir de src/. Não edite este arquivo: edite src/ e rode "node build.mjs".\n`;
  fs.writeFileSync(out, header + JSON.stringify(theme, null, 2) + "\n");
  console.log(`ok  ${path.relative(root, out)}`);
}

// README: o bloco "Prefer no italics?" é gerado das regras. Uma regra do usuário só vence a do tema quando tem o
// MESMO seletor (TextMate: o escopo mais específico vence; semântico: vence a maior pontuação, e "*" vale 0),
// então todo seletor em itálico do tema precisa aparecer no bloco.
{
  const roles = variants[0].roles;
  const italic = [];
  const boldItalic = [];
  for (const rule of tokenColors(roles)) {
    const style = rule.settings.fontStyle ?? "";
    if (!style.includes("italic")) continue;
    (style.includes("bold") ? boldItalic : italic).push([].concat(rule.scope).map((s) => JSON.stringify(s)).join(", "));
  }
  const semantic = Object.entries(semanticTokenColors(roles)).filter(([, v]) => v?.italic === true).map(([k]) => k);
  const block = [
    "```jsonc",
    "{",
    '  "editor.tokenColorCustomizations": {',
    '    "[Serena*]": {',
    '      "textMateRules": [',
    "        {",
    '          "scope": [',
    italic.map((line) => "            " + line).join(",\n"),
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
    ["*", ...semantic].map((k) => "        " + JSON.stringify(k) + ': { "italic": false }').join(",\n"),
    "      }",
    "    }",
    "  }",
    "}",
    "```",
  ].join("\n");
  const readmePath = path.join(root, "README.md");
  const readme = fs.readFileSync(readmePath, "utf8");
  const marker = /(<!-- no-italics:start -->\n)[\s\S]*?(\n<!-- no-italics:end -->)/;
  check(marker.test(readme), "README.md: marcadores <!-- no-italics:start --> / <!-- no-italics:end --> ausentes");
  fs.writeFileSync(readmePath, readme.replace(marker, (_, start, end) => start + block + end));
  console.log(`ok  README.md (sem itálico: ${italic.length} regras TextMate, ${semantic.length} semânticas)`);
}

const icons = await buildIcons(root);
errors.push(...icons.errors);
console.log(`ok  icons/ (${icons.summary})`);

// Mantém as listas de temas do package.json em sincronia com o que foi gerado.
const pkgPath = path.join(root, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.contributes.themes = variants.map((v) => ({
  label: v.label,
  uiTheme: { dark: "vs-dark", light: "vs", hc: "hc-black", hcLight: "hc-light" }[v.type],
  path: `./themes/${v.id}-color-theme.json`,
}));
pkg.contributes.iconThemes = icons.editions;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

if (errors.length) {
  console.error("\nProblemas encontrados:\n" + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
