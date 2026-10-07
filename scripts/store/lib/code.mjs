// Colors a code sample the way the editor does, in three layers:
//
//   1. the TextMate grammar and the generated theme file, through shiki (the grammars VS Code ships);
//   2. semantic highlighting: what the TypeScript language server changes on top of the grammar. A static
//      render has no language server, so the differences are recorded next to each sample
//      (samples/semantic.json) and applied here with the role colors of the variant;
//   3. bracket pair colorization (on by default in VS Code): editorBracketHighlight.foreground1 to 6.

// From VS Code's TypeScript language configuration (extensions/typescript-basics): which brackets are
// colored, which pair is matched but not colored ("${" ... "}"), the scopes whose "<" and ">" are operators
// and not brackets, and the scopes that count as code although they sit inside a string.
const TYPESCRIPT = {
  colored: [["(", ")"], ["[", "]"], ["{", "}"], ["<", ">"]],
  plain: [["${", "}"]],
  notBrackets: ["keyword.operator.relational", "storage.type.function.arrow", "keyword.operator.bitwise.shift", "meta.brace.angle", "punctuation.definition.tag", "keyword.operator.assignment.compound.bitwise"],
  code: ["punctuation.definition.template-expression", "entity.name.type.instance.jsdoc", "entity.name.function.tagged-template", "variable.other.jsdoc"],
};
const LANGUAGES = {
  typescript: TYPESCRIPT,
  tsx: { ...TYPESCRIPT, notBrackets: TYPESCRIPT.notBrackets.filter((scope) => scope !== "meta.brace.angle") },
};

const within = (scope, name) => scope === name || scope.startsWith(name + ".");

// Brackets are only looked for in code: not in comments, strings or regular expressions. The innermost
// scope that says something decides, as in VS Code.
function isCode(scopes, config) {
  for (let i = scopes.length - 1; i >= 0; i--) {
    if (config.code.some((name) => within(scopes[i], name))) return true;
    const kind = /\b(comment|string|regex|meta\.embedded)\b/.exec(scopes[i]);
    if (kind) return kind[1] === "meta.embedded";
  }
  return true;
}

function colorBrackets(lines, config, theme) {
  const opening = new Map();
  const closing = new Map();
  for (const [list, colored] of [[config.colored, true], [config.plain, false]]) {
    for (const [open, close] of list) {
      opening.set(open, { close, colored });
      closing.set(close, true);
    }
  }
  const texts = [...opening.keys(), ...closing.keys()].sort((a, b) => b.length - a.length);
  const stack = [];
  const paint = (cells, start, length, level) => {
    const color = level < 0 ? theme.color("editorBracketHighlight.unexpectedBracket.foreground") : theme.color(`editorBracketHighlight.foreground${(level % 6) + 1}`);
    for (let i = start; i < start + length; i++) cells[i].color = color;
  };
  for (const cells of lines) {
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (!isCode(cell.scopes, config) || cell.scopes.some((scope) => config.notBrackets.some((name) => within(scope, name)))) continue;
      const text = texts.find((t) => t.split("").every((ch, k) => cells[i + k]?.char === ch && cells[i + k].scopes === cell.scopes));
      if (!text) continue;
      const depth = stack.filter((entry) => entry.colored).length;
      if (opening.has(text)) {
        const { close, colored } = opening.get(text);
        stack.push({ close, colored });
        if (colored) paint(cells, i, text.length, depth);
      } else {
        const match = stack.findLastIndex((entry) => entry.close === text);
        if (match < 0) paint(cells, i, text.length, -1);
        else {
          const [entry] = stack.splice(match);
          if (entry.colored) paint(cells, i, text.length, stack.filter((e) => e.colored).length);
        }
      }
      i += text.length - 1;
    }
  }
  if (stack.length) throw new Error("the sample has a bracket that is never closed");
}

/**
 * @param shiki the "shiki" module
 * @param themes from loadThemes()
 */
export async function createCode(shiki, themes) {
  const highlighter = await shiki.createHighlighter({
    themes: themes.map((theme) => ({ ...theme.json, name: theme.id, type: theme.dark ? "dark" : "light" })),
    langs: Object.keys(LANGUAGES),
  });
  return {
    /**
     * @param sample { language: "tsx" | "typescript", code, semantic: [[line, column, text, role, italic], ...] }
     * @returns one array per line with runs of { text, color, italic, bold, underline, strike }
     */
    lines(sample, theme) {
      const config = LANGUAGES[sample.language];
      const { tokens } = highlighter.codeToTokens(sample.code, { lang: sample.language, theme: theme.id, includeExplanation: "scopeName" });
      const lines = tokens.map((line) => line.flatMap((token) => {
        const style = token.fontStyle ?? 0;
        const base = { color: token.color ?? theme.color("editor.foreground"), italic: Boolean(style & 1), bold: Boolean(style & 2), underline: Boolean(style & 4), strike: Boolean(style & 8) };
        return (token.explanation ?? [{ content: token.content, scopes: [] }]).flatMap((piece) => {
          const scopes = piece.scopes.map((scope) => scope.scopeName);
          return [...piece.content].map((char) => ({ char, scopes, ...base }));
        });
      }));
      for (const [line, column, text, role, italic] of sample.semantic ?? []) {
        const cells = lines[line - 1]?.slice(column, column + text.length) ?? [];
        if (cells.map((cell) => cell.char).join("") !== text) throw new Error(`${sample.name}: semantic.json expects "${text}" at line ${line}, column ${column}`);
        if (!theme.roles[role]) throw new Error(`${sample.name}: semantic.json uses the unknown role "${role}"`);
        for (const cell of cells) Object.assign(cell, { color: theme.roles[role], italic });
      }
      colorBrackets(lines, config, theme);
      return lines.map((cells) => {
        const runs = [];
        for (const { char, scopes, ...style } of cells) {
          const last = runs.at(-1);
          const same = last && ["color", "italic", "bold", "underline", "strike"].every((key) => last[key] === style[key]);
          // White space takes the style of the run before it: nothing is drawn there.
          if (same || (last && char === " " && !style.underline && !style.strike)) last.text += char;
          else runs.push({ text: char, ...style });
        }
        return runs;
      });
    },
  };
}
