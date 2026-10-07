// Regras de sintaxe compartilhadas por todas as variantes.
// Cada variante fornece a cor de cada papel (r.keyword, r.func...).

export const tokenColors = (r) => [
  {
    name: "Comentários",
    scope: ["comment", "punctuation.definition.comment", "string.comment"],
    settings: { foreground: r.comment, fontStyle: "italic" },
  },
  {
    name: "Palavras-chave e controle de fluxo",
    scope: ["keyword", "keyword.control", "storage.type", "storage.modifier", "keyword.operator.new", "keyword.operator.expression", "keyword.operator.logical.python", "keyword.operator.instanceof"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Operadores e pontuação",
    scope: ["keyword.operator", "punctuation", "meta.brace", "punctuation.separator", "punctuation.terminator"],
    settings: { foreground: r.punct },
  },
  {
    name: "Operadores lógicos, ternário e comparação",
    scope: ["keyword.operator.logical", "keyword.operator.ternary", "keyword.operator.comparison", "keyword.operator.relational", "keyword.operator.null-coalescing"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Sigilos de palavras-chave (@media, @param, and em media queries)",
    scope: ["punctuation.definition.keyword", "punctuation.definition.block.tag.jsdoc", "keyword.operator.logical.and.media", "keyword.operator.logical.not.media", "keyword.operator.logical.only.media"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Strings",
    scope: ["string", "string.quoted", "string.template", "punctuation.definition.string", "property.value.dotenv"],
    settings: { foreground: r.string },
  },
  {
    name: "Escapes e regex",
    scope: ["constant.character.escape", "string.regexp"],
    settings: { foreground: r.property },
  },
  {
    name: "Regex: âncoras",
    scope: ["keyword.control.anchor.regexp", "support.other.match.begin.regexp", "support.other.match.end.regexp"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Regex: classes de caracteres",
    scope: ["constant.other.character-class.regexp", "support.other.escape.special.regexp", "constant.character.set.regexp"],
    settings: { foreground: r.constant },
  },
  {
    name: "Regex: delimitadores de grupos e conjuntos",
    scope: ["constant.other.set.regexp", "punctuation.definition.character-class.regexp", "punctuation.definition.group.regexp", "support.other.parenthesis.regexp"],
    settings: { foreground: r.punct },
  },
  {
    name: "Python regex: referências \\1 e (?P=nome) como no JS (a gramática as marca como tag)",
    scope: ["entity.name.tag.backreference.regexp", "entity.name.tag.named.backreference.regexp"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Python regex: nome do grupo (?P<nome>) como no JS (a gramática o marca como tag)",
    scope: ["entity.name.tag.named.group.regexp"],
    settings: { foreground: r.fg },
  },
  {
    name: "Interpolação em template strings e f-strings",
    scope: ["punctuation.definition.template-expression", "punctuation.section.embedded", "constant.character.format.placeholder", "punctuation.definition.interpolation"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Números e constantes",
    scope: ["constant.numeric", "constant.language", "constant.other", "support.constant", "source variable.other.constant", "meta.embedded variable.other.constant", "variable.other.enummember", "entity.other.keyframe-offset"],
    settings: { foreground: r.constant },
  },
  {
    name: "Const locais (dentro de funções) ficam com a cor de variável",
    scope: ["meta.block meta.definition.variable variable.other.constant"],
    settings: { foreground: r.fg },
  },
  {
    name: "Cor hexadecimal (#) inteira em pêssego",
    scope: ["constant.other.color punctuation.definition.constant"],
    settings: { foreground: r.constant },
  },
  {
    name: "Funções",
    scope: ["entity.name.function", "support.function", "meta.function-call entity.name.function", "variable.function", "meta.function-call.generic"],
    settings: { foreground: r.func },
  },
  {
    name: "Tipos, classes, interfaces, componentes",
    scope: ["entity.name.type", "entity.name.class", "support.type", "support.class", "entity.other.inherited-class", "storage.type.primitive"],
    settings: { foreground: r.type },
  },
  {
    name: "Variáveis",
    scope: ["source variable", "source variable.other", "meta.definition.variable"],
    settings: { foreground: r.fg },
  },
  {
    name: "Parâmetros",
    scope: ["variable.parameter"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "this / self / cls",
    scope: ["variable.language.this", "variable.language.self", "variable.language.super", "variable.language.special.self", "variable.language.special.cls", "variable.parameter.function.language.special.self", "variable.parameter.function.language.special.cls", "variable.language.java"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "Propriedades e chaves",
    scope: ["variable.other.property", "variable.other.object.property", "variable.object.property", "support.variable.property", "meta.object-literal.key", "meta.object-literal.key string.quoted", "meta.attribute.python", "entity.name.tag.yaml", "support.type.property-name", "variable.other.constant.property", "keyword.other.definition.ini", "variable.key.dotenv", "variable.other.env", "variable.interpolation.dotenv"],
    settings: { foreground: r.property },
  },
  {
    name: "Aspas de chaves entre aspas (igual ao JSON)",
    scope: ["meta.object-literal.key punctuation.definition.string"],
    settings: { foreground: r.punct },
  },
  {
    name: "Tags HTML/JSX (os sinais < > ficam como pontuação)",
    scope: ["entity.name.tag"],
    settings: { foreground: r.special },
  },
  {
    name: "Atributos HTML/JSX",
    scope: ["entity.other.attribute-name"],
    settings: { foreground: r.constant, fontStyle: "italic" },
  },
  {
    name: "CSS: seletores de classe e id",
    scope: ["entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css", "entity.other.attribute-name.class.less", "entity.other.attribute-name.id.less", "entity.other.attribute-name.parent-selector-suffix", "entity.other.attribute-name.parent-selector-suffix punctuation.definition.entity"],
    settings: { foreground: r.type, fontStyle: "" },
  },
  {
    name: "CSS: pseudo-classes e pseudo-elementos",
    scope: ["entity.other.attribute-name.pseudo-class", "entity.other.attribute-name.pseudo-element"],
    settings: { foreground: r.keyword, fontStyle: "italic" },
  },
  {
    name: "CSS: unidades e valores",
    scope: ["keyword.other.unit", "support.constant.property-value"],
    settings: { foreground: r.constant },
  },
  {
    name: "CSS: url()",
    scope: ["variable.parameter.url"],
    settings: { foreground: r.string, fontStyle: "" },
  },
  {
    name: "Decorators: @",
    scope: ["punctuation.decorator", "punctuation.definition.decorator", "punctuation.definition.annotation"],
    settings: { foreground: r.property, fontStyle: "italic" },
  },
  {
    name: "Decorators: nome",
    scope: ["entity.name.function.decorator", "meta.decorator meta.function-call entity.name.function", "storage.type.annotation"],
    settings: { foreground: r.func, fontStyle: "italic" },
  },
  {
    name: "Imports / módulos",
    scope: ["entity.name.namespace", "entity.name.module"],
    settings: { foreground: r.type },
  },
  {
    name: "Markdown: títulos",
    scope: ["markup.heading", "entity.name.section.markdown"],
    settings: { foreground: r.keyword, fontStyle: "bold" },
  },
  {
    name: "Markdown: marcadores de lista e citação",
    scope: ["punctuation.definition.list.begin.markdown", "punctuation.definition.quote.begin.markdown"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Markdown: citação",
    scope: ["markup.quote"],
    settings: { fontStyle: "italic" },
  },
  {
    name: "Markdown: riscado",
    scope: ["markup.strikethrough"],
    settings: { fontStyle: "strikethrough" },
  },
  {
    name: "Markdown: negrito",
    scope: ["markup.bold"],
    settings: { foreground: r.constant, fontStyle: "bold" },
  },
  {
    name: "Markdown: itálico",
    scope: ["markup.italic"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "Markdown: negrito + itálico",
    scope: ["markup.bold markup.italic", "markup.italic markup.bold"],
    settings: { fontStyle: "bold italic" },
  },
  {
    name: "Markdown: código inline e blocos sem linguagem",
    scope: ["markup.inline.raw", "markup.fenced_code"],
    settings: { foreground: r.string },
  },
  {
    name: "Markdown: blocos com linguagem usam as cores da linguagem",
    scope: ["markup.fenced_code meta.embedded"],
    settings: { foreground: r.fg },
  },
  {
    name: "Markdown: links",
    scope: ["markup.underline.link", "string.other.link"],
    settings: { foreground: r.func },
  },
  {
    name: "Diff",
    scope: ["markup.inserted", "markup.inserted punctuation.definition.inserted"],
    settings: { foreground: r.string },
  },
  {
    scope: ["markup.deleted", "markup.deleted punctuation.definition.deleted"],
    settings: { foreground: r.special },
  },
  {
    scope: ["markup.changed", "markup.changed punctuation.definition.changed"],
    settings: { foreground: r.func },
  },
  {
    name: "Diff: cabeçalhos (diff --git, --- a/arquivo, +++ b/arquivo)",
    scope: ["meta.diff.header"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Diff: intervalo do hunk (@@ -12,9 +12,9 @@)",
    scope: ["meta.diff.range"],
    settings: { foreground: r.property },
  },
  {
    name: "Diff: linha index (index 3f2a9c1..b7d4e02) discreta, na cor de comentário",
    scope: ["meta.diff.index"],
    settings: { foreground: r.comment },
  },
  {
    name: "Log: erros e exceções na cor de erro",
    scope: ["log.error", "log.exception", "log.exceptiontype"],
    settings: { foreground: r.special },
  },
  {
    name: "Log: avisos na cor de aviso",
    scope: ["log.warning"],
    settings: { foreground: r.type },
  },
  {
    name: "Inválido",
    scope: ["invalid", "invalid.illegal"],
    settings: { foreground: r.special, fontStyle: "underline" },
  },
  {
    name: "Git commit: assunto entre 51 e 72 colunas é só um aviso (acima de 72 continua como erro)",
    scope: ["invalid.deprecated.line-too-long.git-commit"],
    settings: { foreground: r.type, fontStyle: "" },
  },

  // ───── C# e Java ─────
  {
    name: "C#: parâmetros na declaração (e o 'value' implícito dos setters)",
    scope: ["entity.name.variable.parameter.cs", "variable.other.value.cs"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "C#: propriedades, campos e eventos na declaração",
    scope: ["entity.name.variable.property.cs", "entity.name.variable.field.cs", "entity.name.variable.event.cs"],
    settings: { foreground: r.property },
  },
  {
    name: "C#: membros de enum na declaração",
    scope: ["entity.name.variable.enum-member.cs"],
    settings: { foreground: r.constant },
  },
  {
    name: "C#: this/base (o Roslyn envia como keyword; o itálico do TextMate é mantido)",
    scope: ["variable.language.this.cs", "variable.language.base.cs"],
    settings: { foreground: r.keyword, fontStyle: "italic" },
  },
  {
    name: "C#: true/false/null e discard _ (o Roslyn envia como keyword)",
    scope: ["constant.language.boolean.true.cs", "constant.language.boolean.false.cs", "constant.language.null.cs", "variable.language.discard.cs"],
    settings: { foreground: r.keyword },
  },
  {
    name: "C#: operadores lógicos, de comparação e ?? (o Roslyn envia 'operator' ou 'operatorOverloaded'; os dois ficam como pontuação)",
    scope: ["keyword.operator.logical.cs", "keyword.operator.comparison.cs", "keyword.operator.relational.cs", "keyword.operator.null-coalescing.cs"],
    settings: { foreground: r.punct },
  },
  {
    name: "C#: chaves de interpolação { } em $\"\" (o Roslyn envia como 'punctuation')",
    scope: ["punctuation.definition.interpolation.begin.cs", "punctuation.definition.interpolation.end.cs"],
    settings: { foreground: r.punct },
  },
  {
    name: "C#: aspas de char 'x'",
    scope: ["punctuation.definition.char.begin.cs", "punctuation.definition.char.end.cs"],
    settings: { foreground: r.string },
  },
  {
    name: "C#: # das diretivas de pré-processador",
    scope: ["meta.preprocessor.cs punctuation.separator.hash.cs"],
    settings: { foreground: r.keyword },
  },
  {
    name: "C#: texto de #region / #warning / #error",
    scope: ["string.unquoted.preprocessor.message.cs"],
    settings: { foreground: r.comment },
  },
  {
    name: "C#: XML doc (///): nome da tag, como @param no JSDoc/Javadoc",
    scope: ["comment.block.documentation.cs entity.name.tag"],
    settings: { foreground: r.keyword },
  },
  {
    name: "C#: XML doc (///): atributos, aspas, valores e delimitadores ficam como comentário",
    scope: ["comment.block.documentation.cs entity.other.attribute-name", "comment.block.documentation.cs punctuation.definition.tag.cs", "comment.block.documentation.cs punctuation.separator.equals.cs", "comment.block.documentation.cs string.quoted.double.cs", "comment.block.documentation.cs punctuation.definition.string", "comment.block.documentation.cs constant.character.entity", "comment.block.documentation.cs constant.character.entity punctuation.definition.constant"],
    settings: { foreground: r.comment },
  },
  {
    name: "Java: tipos referenciados (String, List<Order>, Map<K, V>)",
    scope: ["storage.type.java", "storage.type.generic.java"],
    settings: { foreground: r.type },
  },
  {
    name: "Java: curinga ? de genéricos",
    scope: ["storage.type.generic.wildcard.java"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Java: caminho de package/import",
    scope: ["storage.modifier.package.java", "storage.modifier.import.java"],
    settings: { foreground: r.type },
  },
  {
    name: "Java: campos na declaração (limitação da gramática: locais em blocos static {} / {} e em lambdas de inicializador de campo também ficam nesta cor)",
    scope: ["meta.definition.variable.java variable.other.definition.java"],
    settings: { foreground: r.property },
  },
  {
    name: "Java: variáveis locais na declaração (dentro de métodos)",
    scope: ["meta.method.body.java meta.definition.variable.java variable.other.definition.java"],
    settings: { foreground: r.fg },
  },
  {
    name: "Java: componentes de record",
    scope: ["meta.record.identifier.java"],
    settings: { foreground: r.property },
  },
  {
    name: "Java: membros nomeados de anotação (@Deprecated(since = ...))",
    scope: ["constant.other.key.java"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },

  // ───── Go e YAML ─────
  {
    name: "Go: tipos predeclarados (int, string, error, bool, byte, rune, uintptr)",
    scope: ["storage.type.numeric.go", "storage.type.string.go", "storage.type.boolean.go", "storage.type.byte.go", "storage.type.error.go", "storage.type.rune.go", "storage.type.uintptr.go"],
    settings: { foreground: r.type },
  },
  {
    name: "Go: alias de import (str \"strings\")",
    scope: ["variable.other.import.go"],
    settings: { foreground: r.type },
  },
  {
    name: "Go: verbos de formatação (%v %d %w)",
    scope: ["constant.other.placeholder.go"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Go: runas ('x', '\\n')",
    scope: ["constant.other.rune.go"],
    settings: { foreground: r.string },
  },
  {
    name: "Go: separador _ e sinal do expoente dentro de números",
    scope: ["punctuation.separator.constant.numeric.go", "keyword.operator.plus.exponent.decimal.go", "keyword.operator.minus.exponent.decimal.go", "keyword.operator.plus.exponent.hexadecimal.go", "keyword.operator.minus.exponent.hexadecimal.go"],
    settings: { foreground: r.constant },
  },
  {
    name: "Go: operador de canal <- (envio/recebimento, como await)",
    scope: ["keyword.operator.channel.go"],
    settings: { foreground: r.keyword },
  },
  {
    name: "go.mod: operador =>",
    scope: ["operator.go.mod"],
    settings: { foreground: r.punct },
  },
  {
    name: "YAML: tags (!!str, !Ref, !e!tipo) com o sinal ! incluso",
    scope: ["storage.type.tag.shorthand.yaml", "storage.type.tag.verbatim.yaml", "storage.type.tag.non-specific.yaml", "storage.type.tag-handle.yaml", "punctuation.definition.tag.primary.yaml", "punctuation.definition.tag.secondary.yaml", "punctuation.definition.tag.named.yaml", "punctuation.definition.tag.non-specific.yaml", "punctuation.definition.tag.begin.yaml", "punctuation.definition.tag.end.yaml"],
    settings: { foreground: r.type },
  },
  {
    name: "YAML: âncoras e aliases (&nome, *nome) com o sinal incluso",
    scope: ["keyword.control.flow.anchor.yaml", "keyword.control.flow.alias.yaml", "variable.other.anchor.yaml", "variable.other.alias.yaml", "punctuation.definition.anchor.yaml", "punctuation.definition.alias.yaml", "entity.name.type.anchor.yaml", "keyword.control.property.anchor.yaml"],
    settings: { foreground: r.keyword },
  },
  {
    name: "YAML: chave de merge << (gramática YAML 1.1 / GitHub Actions) como chave, igual à gramática padrão",
    scope: ["constant.language.merge.yaml"],
    settings: { foreground: r.property },
  },
  {
    name: "YAML: marcadores de documento --- e ...",
    scope: ["entity.other.document.begin.yaml", "entity.other.document.end.yaml"],
    settings: { foreground: r.punct },
  },
  {
    name: "YAML: aspas de chaves entre aspas (igual ao JSON)",
    scope: ["entity.name.tag.yaml punctuation.definition.string"],
    settings: { foreground: r.punct },
  },
  {
    name: "YAML: indicador de indentação do block scalar (|2) igual ao | e ao -/+",
    scope: ["constant.numeric.indentation-indicator.yaml"],
    settings: { foreground: r.keyword },
  },
  {
    name: "GitHub Actions: ${{ }} e pontuação/operadores dentro da expressão",
    scope: ["meta.embedded.block.github-actions-expression"],
    settings: { foreground: r.punct },
  },

  // ───── JavaScript, TypeScript e Python ─────
  {
    name: "TS: 'asserts' em assinaturas de asserção é palavra-chave",
    scope: ["keyword.operator.type.asserts"],
    settings: { foreground: r.keyword },
  },
  {
    name: "JS/TS: '*' em import * as / export * from é palavra-chave",
    scope: ["constant.language.import-export-all"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Números: prefixos e sufixos (0x, j, n do BigInt) na cor do número",
    scope: ["constant.numeric storage.type"],
    settings: { foreground: r.constant },
  },
  {
    name: "JS: arguments (como this)",
    scope: ["variable.language.arguments"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "Entidades HTML/XML (&nbsp; &amp;) como escapes",
    scope: ["constant.character.entity", "constant.character.entity punctuation.definition.entity", "constant.character.entity punctuation.definition.constant"],
    settings: { foreground: r.property },
  },
  {
    name: "Python: def de nomes mágicos que a gramática marca como variável (__post_init__)",
    scope: ["meta.function.python > support.variable.magic"],
    settings: { foreground: r.func },
  },
  {
    name: "Python 3.12+: declaração de parâmetros de tipo (class C[T], def f[T], type X[T])",
    scope: ["variable.parameter.type.typevar", "variable.parameter.type.paramspec", "variable.parameter.type.typevartuple"],
    settings: { foreground: r.type, fontStyle: "" },
  },
  {
    name: "Python: decorators que são classes (@property, @staticmethod, @classmethod)",
    scope: ["meta.function.decorator.python > support.type"],
    settings: { foreground: r.func, fontStyle: "italic" },
  },
  {
    name: "Python: atributo seguido de [ (self.itens[0], request.headers[\"x\"]) como os demais atributos",
    scope: ["meta.member.access.python > meta.item-access.python > meta.indexed-name.python"],
    settings: { foreground: r.property },
  },
  {
    name: "Python: docstrings são documentação (como JSDoc/Javadoc/XML doc)",
    scope: ["string.quoted.docstring", "string.quoted.docstring punctuation.definition.string"],
    settings: { foreground: r.comment, fontStyle: "italic" },
  },

  // ───── Rust, C, C++, Kotlin, Swift, Dart, Scala, Groovy, Zig ─────
  {
    name: "Rust: lifetimes e rótulos de laço ('a, 'static, 'outer) inteiros em keyword, como o 'lifetime' do rust-analyzer (storage.modifier.lifetime)",
    scope: ["punctuation.definition.lifetime.rust", "entity.name.type.lifetime.rust"],
    settings: { foreground: r.keyword, fontStyle: "" },
  },
  {
    name: "Rust: ponto, expoente e sinal dentro de floats (1.5e-3) na cor do número",
    scope: ["punctuation.separator.dot.decimal.rust", "keyword.operator.exponent.rust", "keyword.operator.exponent.sign.rust"],
    settings: { foreground: r.constant },
  },
  {
    name: "Rust: sufixo de tipo em literais numéricos (42_i32, 0xFF_u64) na cor do número",
    scope: ["constant.numeric entity.name.type.numeric.rust"],
    settings: { foreground: r.constant },
  },
  {
    name: "Rust: aspas de char ('x', b'x')",
    scope: ["punctuation.definition.char.rust"],
    settings: { foreground: r.string },
  },
  {
    name: "Rust: atributos #[...] / #![...] como decorators (nome em função, tudo em itálico)",
    scope: ["meta.attribute.rust"],
    settings: { foreground: r.func, fontStyle: "italic" },
  },
  {
    name: "Rust: super em caminhos (use super::*) é palavra-chave como crate (o rust-analyzer envia keyword)",
    scope: ["variable.language.super.rust"],
    settings: { foreground: r.keyword, fontStyle: "" },
  },
  {
    name: "Rust: operadores lógicos/comparação/bit e as barras de closure |x| como pontuação (o rust-analyzer envia todos como 'operator'; mesma decisão do C#)",
    scope: ["keyword.operator.logical.rust", "keyword.operator.comparison.rust"],
    settings: { foreground: r.punct },
  },
  {
    name: "Rust: metavariáveis de macro_rules! ($key) como parâmetros",
    scope: ["meta.macro.metavariable.rust keyword.operator.macro.dollar.rust", "variable.other.metavariable.name.rust"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "Rust: especificador de fragmento de macro_rules! ($key:expr) como tipo",
    scope: ["variable.other.metavariable.specifier.rust"],
    settings: { foreground: r.type },
  },
  {
    name: "Rust: placeholders {} {:04} {name:?} em strings de formatação, como os verbos do Go",
    scope: ["meta.interpolation.rust"],
    settings: { foreground: r.keyword },
  },
  {
    name: "C/C++: o # das diretivas (#include, #define, #if) junto da diretiva, como no C#",
    scope: ["punctuation.definition.directive.c", "punctuation.definition.directive.cpp"],
    settings: { foreground: r.keyword },
  },
  {
    name: "C/C++: nomes de macro em #define/#ifdef na cor de keyword (clangd/cpptools enviam 'macro'; igual ao Dark+ e à regra macro do C#)",
    scope: ["entity.name.function.preprocessor.c", "entity.name.function.preprocessor.cpp"],
    settings: { foreground: r.keyword },
  },
  {
    name: "C/C++: argumentos de #pragma (once, warning, disable)",
    scope: ["entity.other.attribute-name.pragma.preprocessor.c", "entity.other.attribute-name.pragma.preprocessor.cpp"],
    settings: { foreground: r.keyword, fontStyle: "" },
  },
  {
    name: "C/C++: tipos embutidos (int, char, unsigned, void, bool, size_t, uint8_t, auto) na cor de tipo, como os primitivos de Java/Go/Rust",
    scope: ["storage.type.built-in.primitive.c", "storage.type.built-in.c", "storage.type.built-in.primitive.cpp", "storage.type.built-in.cpp", "source.cpp storage.type.integral"],
    settings: { foreground: r.type },
  },
  {
    name: "C/C++: membros acessados com . e -> (rb->tail) como propriedades, como o 'property' do clangd/cpptools",
    scope: ["variable.other.member.c", "variable.other.member.cpp"],
    settings: { foreground: r.property },
  },
  {
    name: "C/C++: sizeof, alignof, typeid, noexcept(...), casts e delete são palavras-chave",
    scope: ["keyword.operator.sizeof.c", "keyword.operator.sizeof.cpp", "keyword.operator.sizeof.variadic.cpp", "keyword.operator.alignof.cpp", "keyword.operator.alignas.cpp", "keyword.operator.typeid.cpp", "keyword.operator.noexcept.cpp", "keyword.operator.delete.cpp", "keyword.operator.delete.array.cpp", "source.cpp keyword.operator.cast"],
    settings: { foreground: r.keyword },
  },
  {
    name: "C/C++: especificadores de printf (%d %s %.2f) como os verbos do Go/Python",
    scope: ["constant.other.placeholder.c", "source.cpp constant.other.placeholder"],
    settings: { foreground: r.keyword },
  },
  {
    name: "C/C++: [] de parâmetros array (argv[]) é pontuação",
    scope: ["storage.modifier.array.bracket.square.c", "source.cpp storage.modifier.array.bracket.square"],
    settings: { foreground: r.punct },
  },
  {
    name: "C++: * e & em declarações (char**, T&, T&&) são pontuação, como em C e Rust",
    scope: ["storage.modifier.pointer.cpp", "storage.modifier.reference.cpp"],
    settings: { foreground: r.punct },
  },
  {
    name: "C++: qualificadores antes de :: (std::, Side::) na cor de tipo, como o 'namespace'/'class' do clangd/cpptools",
    scope: ["source.cpp entity.name.scope-resolution"],
    settings: { foreground: r.type },
  },
  {
    name: "C/C++: separador de dígitos 1'000 na cor do número",
    scope: ["punctuation.separator.constant.numeric.cpp", "source.c punctuation.separator.constant.numeric"],
    settings: { foreground: r.constant },
  },
  {
    name: "C++: membros na lista de inicialização do construtor (: symbol_{...}) são campos",
    scope: ["entity.name.function.call.initializer.cpp"],
    settings: { foreground: r.property },
  },
  {
    name: "C++: atributos [[nodiscard]] como decorators",
    scope: ["support.other.attribute.cpp"],
    settings: { foreground: r.func, fontStyle: "italic" },
  },
  {
    name: "C++: símbolo de operator<< / operator= na declaração é o nome da função (cpptools: operatorOverload)",
    scope: ["entity.name.operator.cpp"],
    settings: { foreground: r.func },
  },
  {
    name: "Kotlin: anotações (@Serializable, @file:JvmName) como decorators",
    scope: ["entity.name.type.annotation.kotlin", "entity.name.type.annotation-site.kotlin", "entity.name.function.annotation.kotlin"],
    settings: { foreground: r.func, fontStyle: "italic" },
  },
  {
    name: "Kotlin: caminho de package/import (como Java)",
    scope: ["entity.name.package.kotlin"],
    settings: { foreground: r.type },
  },
  {
    name: "Kotlin: código dentro de ${...} não é string",
    scope: ["meta.template.expression.kotlin"],
    settings: { foreground: r.fg },
  },
  {
    name: "Swift: nome de atributos (@MainActor, @State, @available) como decorators",
    scope: ["storage.modifier.attribute.swift"],
    settings: { foreground: r.func, fontStyle: "italic" },
  },
  {
    name: "Swift: @ de atributos (como o @ de decorators)",
    scope: ["punctuation.definition.attribute.swift"],
    settings: { foreground: r.property, fontStyle: "italic" },
  },
  {
    name: "Swift: self / super / Self",
    scope: ["variable.language.swift"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "Swift: parâmetros genéricos e associatedtype na declaração (os usos já são tipo)",
    scope: ["variable.language.generic-parameter.swift", "variable.language.associatedtype.swift"],
    settings: { foreground: r.type },
  },
  {
    name: "Swift: parâmetros implícitos de closure ($0, $1)",
    scope: ["variable.language.closure-parameter.swift"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "Swift: código dentro de \\( ) não é string",
    scope: ["meta.embedded.line.swift"],
    settings: { foreground: r.fg },
  },
  {
    name: "Swift: ?: e o : de case como pontuação (a gramática marca o ? como operador infixo comum e reusa o escopo ternary no 'case x:')",
    scope: ["keyword.operator.ternary.swift"],
    settings: { foreground: r.punct },
  },
  {
    name: "Swift: # das diretivas de compilação (#if, #elseif, #endif) junto da diretiva",
    scope: ["punctuation.definition.preprocessor.swift"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Dart: this/super: keyword + itálico (o analysis server envia KEYWORD), como no C#",
    scope: ["variable.language.dart"],
    settings: { foreground: r.keyword, fontStyle: "italic" },
  },
  {
    name: "Dart: true/false/null na cor de keyword (o analysis server envia null como KEYWORD; true/false dividem o escopo), como no C#",
    scope: ["constant.language.dart"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Dart: var e void são palavras-chave (o analysis server envia KEYWORD)",
    scope: ["storage.type.primitive.dart"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Dart: is / is! é palavra-chave",
    scope: ["keyword.operator.dart"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Dart: : e ? (argumentos nomeados, tipos anuláveis, ?. e ??) como pontuação — a gramática marca todos como ternary",
    scope: ["keyword.operator.ternary.dart"],
    settings: { foreground: r.punct },
  },
  {
    name: "Dart: && e || (a gramática os divide em dois operadores bit a bit) na cor de keyword",
    scope: ["keyword.operator.bitwise.dart"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Dart: $ / ${ } da interpolação como marcas de interpolação",
    scope: ["meta.embedded.expression.dart"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Dart: identificadores dentro da interpolação ($id) são código, não parâmetros",
    scope: ["meta.embedded.expression.dart variable.parameter.dart"],
    settings: { foreground: r.fg, fontStyle: "" },
  },
  {
    name: "Scala: = e operadores de comparação como pontuação — a gramática dá ao = (todo val/def) o escopo de comparação; o Metals colore operadores simbólicos como métodos",
    scope: ["keyword.operator.comparison.scala"],
    settings: { foreground: r.punct },
  },
  {
    name: "Scala: this/super: keyword + itálico (o Metals envia KEYWORD), como no C#",
    scope: ["variable.language.scala"],
    settings: { foreground: r.keyword, fontStyle: "italic" },
  },
  {
    name: "Scala: true/false/null na cor de keyword (o Metals envia KEYWORD), como no C#",
    scope: ["constant.language.scala"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Scala: aspas de char ('x')",
    scope: ["punctuation.definition.character.begin.scala", "punctuation.definition.character.end.scala"],
    settings: { foreground: r.string },
  },
  {
    name: "Scala: caminho de package/import (Metals: namespace)",
    scope: ["entity.name.package.scala", "entity.name.import.scala"],
    settings: { foreground: r.type },
  },
  {
    name: "Groovy: tipos (String, Map<K, V>, List<Order>) na cor de tipo",
    scope: ["storage.type.groovy", "storage.type.generic.groovy", "storage.type.object.array.groovy", "storage.type.parameters.groovy"],
    settings: { foreground: r.type },
  },
  {
    name: "Groovy: caminho de package/import (como Java)",
    scope: ["storage.modifier.package.groovy", "storage.modifier.import.groovy"],
    settings: { foreground: r.type },
  },
  {
    name: "Groovy: this / super",
    scope: ["variable.language.groovy"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "Groovy: código dentro de ${...} não é string",
    scope: ["source.groovy.embedded"],
    settings: { foreground: r.fg },
  },
  {
    name: "Groovy: membros nomeados de anotação (@ToString(includeNames = true)), como Java",
    scope: ["constant.other.key.groovy"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "Zig: tipos primitivos (u8, usize, f64, bool, void, type, anytype, c_int) na cor de tipo — o ZLS os envia como 'type'",
    scope: ["keyword.type.zig", "keyword.type.integer.zig", "keyword.type.c.zig"],
    settings: { foreground: r.type },
  },
  {
    name: "Zig: null, undefined, true, false na cor de constante",
    scope: ["keyword.constant.default.zig", "keyword.constant.bool.zig"],
    settings: { foreground: r.constant },
  },

  // ───── PHP, Ruby, Lua, R, Elixir, Perl, shell, PowerShell, SQL, Vue, Svelte, Astro, Angular, Dockerfile, Makefile, TOML, INI, HCL, GraphQL, XML, Markdown, CSS ─────
  {
    name: "PHP: sigilo $ na cor da variável (como shell/SCSS)",
    scope: ["variable.other.php punctuation.definition.variable.php", "variable.other.class.php punctuation.definition.variable.php", "variable.other.global.php punctuation.definition.variable.php", "variable.other.global.safer.php punctuation.definition.variable.php"],
    settings: { foreground: r.fg },
  },
  {
    name: "PHP: $this com o $ incluso",
    scope: ["variable.language.this.php punctuation.definition.variable.php"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "PHP: parâmetros na declaração (com o $)",
    scope: ["meta.function.parameters.php variable.other.php", "meta.function.parameters.php variable.other.php punctuation.definition.variable.php"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "PHP: & e ... nos parâmetros sem itálico",
    scope: ["meta.function.parameters.php storage.modifier.reference.php"],
    settings: { foreground: r.keyword, fontStyle: "" },
  },
  {
    name: "PHP: ... variádico sem itálico",
    scope: ["meta.function.parameters.php keyword.operator.variadic.php"],
    settings: { foreground: r.punct, fontStyle: "" },
  },
  {
    name: "PHP: chaves de interpolação {$x} em strings",
    scope: ["punctuation.definition.variable.php"],
    settings: { foreground: r.keyword },
  },
  {
    name: "PHP: argumentos nomeados (methods: ...)",
    scope: ["entity.name.variable.parameter.php"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "PHP: namespaces em use/nomes qualificados e aliases",
    scope: ["support.other.namespace.php", "entity.other.alias.php"],
    settings: { foreground: r.type },
  },
  {
    name: "PHP: casos de enum",
    scope: ["constant.enum.php"],
    settings: { foreground: r.constant },
  },
  {
    name: "PHP: atributos #[Route] são classes (como no C#; o Intelephense envia class)",
    scope: ["support.attribute.php", "support.attribute.builtin.php"],
    settings: { foreground: r.type },
  },
  {
    name: "PHP: delimitadores #[ ] dos atributos",
    scope: ["meta.attribute.php"],
    settings: { foreground: r.punct },
  },
  {
    name: "PHP: tipos primitivos (int, string, array, mixed, void)",
    scope: ["keyword.other.type.php"],
    settings: { foreground: r.type },
  },
  {
    name: "PHP: instanceof e o as do foreach",
    scope: ["keyword.operator.type.php", "keyword.operator.as.php"],
    settings: { foreground: r.keyword },
  },
  {
    name: "PHP: identificador de heredoc/nowdoc (como Ruby/shell)",
    scope: ["keyword.operator.heredoc.php", "keyword.operator.nowdoc.php"],
    settings: { foreground: r.string },
  },
  {
    name: "Ruby: @variável e @@variável são estado do objeto (como campos), com o sigilo",
    scope: ["variable.other.readwrite.instance.ruby", "variable.other.readwrite.class.ruby", "variable.other.readwrite.instance.ruby punctuation.definition.variable.ruby", "variable.other.readwrite.class.ruby punctuation.definition.variable.ruby"],
    settings: { foreground: r.property },
  },
  {
    name: "Ruby: sigilo $ de globais",
    scope: ["variable.other.readwrite.global.ruby punctuation.definition.variable.ruby"],
    settings: { foreground: r.fg },
  },
  {
    name: "Ruby: globais pré-definidas ($0, $!, $~)",
    scope: ["variable.other.readwrite.global.pre-defined.ruby", "variable.other.readwrite.global.pre-defined.ruby punctuation.definition.variable.ruby"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "Ruby: dois-pontos de :símbolo na cor do símbolo",
    scope: ["constant.language.symbol.ruby punctuation.definition.constant.ruby", "constant.language.symbol.interpolated.ruby punctuation.section.symbol.begin.ruby", "constant.language.symbol.interpolated.ruby punctuation.section.symbol.end.ruby"],
    settings: { foreground: r.constant },
  },
  {
    name: "Ruby: parâmetros nomeados na declaração (discount: 0.0)",
    scope: ["constant.other.symbol.hashkey.parameter.function.ruby"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "Ruby: : dos parâmetros nomeados sem itálico",
    scope: ["constant.other.symbol.hashkey.parameter.function.ruby punctuation.definition.constant.ruby"],
    settings: { foreground: r.punct, fontStyle: "" },
  },
  {
    name: "Ruby: conteúdo de #{...} é código, não string",
    scope: ["meta.embedded.line.ruby"],
    settings: { foreground: r.fg },
  },
  {
    name: "Ruby: * ** & nos parâmetros",
    scope: ["storage.type.variable.ruby"],
    settings: { foreground: r.punct },
  },
  {
    name: "Perl: sigilos $ @ % na cor da variável",
    scope: ["variable.other.readwrite.global.perl punctuation.definition.variable.perl", "variable.other.subpattern.perl punctuation.definition.variable.perl"],
    settings: { foreground: r.fg },
  },
  {
    name: "Perl: variáveis pré-definidas ($_, @_, $!, $0, $a/$b) como this/arguments",
    scope: ["variable.other.predefined.perl", "variable.other.predefined.perl punctuation.definition.variable.perl", "variable.other.readwrite.global.special.perl", "variable.other.readwrite.global.special.perl punctuation.definition.variable.perl", "variable.other.predefined.program-name.perl", "variable.other.predefined.program-name.perl punctuation.definition.variable.perl"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "Perl: chaves de hash sem aspas (error =>, $h{count})",
    scope: ["constant.other.key.perl", "constant.other.bareword.perl"],
    settings: { foreground: r.property },
  },
  {
    name: "PowerShell: sigilo $ na cor da variável",
    scope: ["variable.other.readwrite.powershell punctuation.definition.variable.powershell", "variable.language.powershell punctuation.definition.variable.powershell", "interpolated.complex.variable.other.readwrite.powershell punctuation.definition.variable.powershell"],
    settings: { foreground: r.fg },
  },
  {
    name: "PowerShell: $true/$false/$null com o $",
    scope: ["constant.language.powershell punctuation.definition.variable.powershell"],
    settings: { foreground: r.constant },
  },
  {
    name: "PowerShell: variáveis automáticas ($_, $this, $PSItem, $args) como this",
    scope: ["support.variable.automatic.powershell", "support.variable.automatic.powershell punctuation.definition.variable.powershell", "interpolated.complex.support.variable.automatic.powershell", "interpolated.complex.support.variable.automatic.powershell punctuation.definition.variable.powershell"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "PowerShell: membros ($x.Name, .Count)",
    scope: ["variable.other.member.powershell"],
    settings: { foreground: r.property, fontStyle: "" },
  },
  {
    name: "PowerShell: tipos [string] [List[int]] [System.IO.File] (o PSES envia type)",
    scope: ["storage.type.powershell"],
    settings: { foreground: r.type },
  },
  {
    name: "PowerShell: function/filter/workflow continuam palavras-chave",
    scope: ["meta.function.powershell storage.type.powershell"],
    settings: { foreground: r.keyword },
  },
  {
    name: "PowerShell: nome da classe (a gramática usa entity.name.function)",
    scope: ["source.powershell > entity.name.function"],
    settings: { foreground: r.type },
  },
  {
    name: "PowerShell: atributos [CmdletBinding()] [Parameter()] são classes .NET (como no C#)",
    scope: ["support.function.attribute.powershell"],
    settings: { foreground: r.type },
  },
  {
    name: "PowerShell: chaves de hashtable @{ Name = ... }",
    scope: ["meta.hashtable.assignment.powershell variable.other.readwrite.powershell"],
    settings: { foreground: r.property },
  },
  {
    name: "PowerShell: palavras-chave da ajuda (.SYNOPSIS, .PARAMETER)",
    scope: ["keyword.operator.documentation.powershell"],
    settings: { foreground: r.keyword },
  },
  {
    name: "PowerShell: alvo de using namespace/module",
    scope: ["source.powershell > variable.parameter.powershell"],
    settings: { foreground: r.type, fontStyle: "" },
  },
  {
    name: "Lua: campos depois de . e : (self.name, M.__index)",
    scope: ["entity.other.attribute.lua"],
    settings: { foreground: r.property },
  },
  {
    name: "Lua: pontuação que a gramática deixa sem escopo (, . : { } [ ])",
    scope: ["source.lua"],
    settings: { foreground: r.punct },
  },
  {
    name: "Lua: ... na lista de parâmetros (como o ... do corpo)",
    scope: ["meta.parameter.lua"],
    settings: { foreground: r.constant },
  },
  {
    name: "Lua: tags de documentação (---@param, @class) como @param do JSDoc",
    scope: ["comment.line.double-dash.documentation.lua storage.type.annotation.lua", "storage.type.class.ldoc", "punctuation.definition.block.tag.ldoc"],
    settings: { foreground: r.keyword, fontStyle: "italic" },
  },
  {
    name: "R: chamadas de funções que a gramática não conhece (group_by(), ggplot())",
    scope: ["meta.function-call.r"],
    settings: { foreground: r.func },
  },
  {
    name: "R: argumentos das chamadas voltam à cor normal",
    scope: ["meta.function-call.arguments.r"],
    settings: { foreground: r.fg },
  },
  {
    name: "R: $ @ : ~ são operadores",
    scope: ["keyword.accessor.dollar.r", "keyword.other.r"],
    settings: { foreground: r.punct },
  },
  {
    name: "R: tags roxygen (@param)",
    scope: ["comment.line.roxygen.r keyword.other.r"],
    settings: { foreground: r.keyword },
  },
  {
    name: "R: in do for",
    scope: ["keyword.operator.word.r"],
    settings: { foreground: r.keyword },
  },
  {
    name: "R: construtores de tipo list(), numeric(), character() (como list()/int() no Python)",
    scope: ["storage.type.r"],
    settings: { foreground: r.type },
  },
  {
    name: "Elixir: dois-pontos de :átomo na cor do átomo",
    scope: ["constant.other.symbol.elixir punctuation.definition.constant.elixir", "constant.other.symbol.double-quoted.elixir punctuation.definition.constant.elixir"],
    settings: { foreground: r.constant },
  },
  {
    name: "Elixir: atributos de módulo (@max_age, @spec) são constantes de compilação, com o @",
    scope: ["variable.other.readwrite.module.elixir", "variable.other.readwrite.module.elixir punctuation.definition.variable.elixir"],
    settings: { foreground: r.constant },
  },
  {
    name: "Elixir: and/or/not/in/when",
    scope: ["keyword.operator.elixir"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Elixir: conteúdo de #{...} é código, não string",
    scope: ["meta.embedded.line.elixir"],
    settings: { foreground: r.fg },
  },
  {
    name: "Elixir: escapes em strings e sigilos",
    scope: ["constant.character.escaped.elixir"],
    settings: { foreground: r.property },
  },
  {
    name: "Elixir: __MODULE__, __ENV__ (como __CLASS__ no PHP)",
    scope: ["variable.language.elixir"],
    settings: { foreground: r.constant },
  },
  {
    name: "Elixir: pontos em defmodule A.B.C",
    scope: ["meta.module.elixir"],
    settings: { foreground: r.punct },
  },
  {
    name: "Elixir: & de &1 na cor do argumento",
    scope: ["variable.other.anonymous.elixir punctuation.definition.variable.elixir"],
    settings: { foreground: r.fg },
  },
  {
    name: "SQL: tipos de dados (INTEGER, VARCHAR, TIMESTAMP)",
    scope: ["storage.type.sql"],
    settings: { foreground: r.type },
  },
  {
    name: "SQL: alias/esquema em nomes qualificados (o.total, public.orders)",
    scope: ["constant.other.database-name.sql"],
    settings: { foreground: r.fg },
  },
  {
    name: "SQL: coluna/tabela depois do ponto (como propriedade)",
    scope: ["constant.other.table-name.sql"],
    settings: { foreground: r.property },
  },
  {
    name: "Shell: parâmetros especiais $? $ $! $# $* (como this/arguments)",
    scope: ["variable.language.special.shell"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "Shell: chaves de array associativo [web1]=8080",
    scope: ["entity.other.attribute-name.bracket.shell"],
    settings: { foreground: r.property, fontStyle: "" },
  },
  {
    name: "Makefile: variáveis automáticas $@ $< $^ (como this/arguments)",
    scope: ["variable.language.makefile"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "XML: = entre atributo e valor (sem escopo na gramática)",
    scope: ["meta.tag.xml", "meta.tag.preprocessor.xml"],
    settings: { foreground: r.punct },
  },
  {
    name: "Markdown: bloco de código indentado igual ao cercado sem linguagem",
    scope: ["markup.raw.block.markdown"],
    settings: { foreground: r.string },
  },
  {
    name: "Markdown: linha horizontal ---",
    scope: ["meta.separator.markdown"],
    settings: { foreground: r.punct },
  },
  {
    name: "SCSS: seletores %placeholder como classes",
    scope: ["entity.other.attribute-name.placeholder.css"],
    settings: { foreground: r.type, fontStyle: "" },
  },
  {
    name: "SCSS: % do placeholder",
    scope: ["entity.other.attribute-name.placeholder.css punctuation.definition.entity.css"],
    settings: { foreground: r.punct, fontStyle: "" },
  },
  {
    name: "SCSS: chaves de map (small: 576px)",
    scope: ["support.type.map.key.scss"],
    settings: { foreground: r.property },
  },
  {
    name: "SCSS: parâmetros de @mixin/@function",
    scope: ["meta.at-rule.mixin.scss variable.scss", "meta.at-rule.function.scss variable.scss"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "SCSS: : do valor padrão em @function (a gramática marca como url)",
    scope: ["meta.at-rule.function.scss variable.parameter.url.scss"],
    settings: { foreground: r.punct, fontStyle: "" },
  },
  {
    name: "SassDoc: @ de @param",
    scope: ["punctuation.definition.block.tag.sassdoc"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Less: sigilo @ na cor da variável",
    scope: ["variable.other.readwrite.less punctuation.definition.variable.less"],
    settings: { foreground: r.fg },
  },
  {
    name: "Less: chaves de interpolação @{...}",
    scope: ["variable.other.readwrite.less punctuation.definition.expression.less"],
    settings: { foreground: r.keyword },
  },
  {
    name: "Less: &-sufixo (&-title) como o &__sufixo do SCSS",
    scope: ["entity.other.attribute-name.parent.less", "entity.other.attribute-name.parent.less entity.name.tag.less"],
    settings: { foreground: r.type, fontStyle: "" },
  },
  {
    name: "Less: & do seletor pai",
    scope: ["entity.other.attribute-name.parent.less punctuation.definition.entity.less"],
    settings: { foreground: r.special, fontStyle: "" },
  },
  {
    name: "Vue: tags de componentes (<MyButton>) como no JSX/Svelte/Astro (o Volar envia component → class)",
    scope: ["entity.name.tag.html.vue", "source.vue meta.tag.other.unrecognized.html.derivative entity.name.tag.html", "text.html.vue meta.tag.other.unrecognized.html.derivative entity.name.tag.html"],
    settings: { foreground: r.type },
  },
  {
    name: "Svelte: nome do evento/propriedade em on:/bind:/let: (como atributo)",
    scope: ["meta.directive.on.svelte entity.name.type.svelte", "meta.directive.bind.svelte entity.name.type.svelte", "meta.directive.bind.svelte variable.language.svelte", "meta.directive.let.svelte entity.name.type.svelte"],
    settings: { foreground: r.constant, fontStyle: "italic" },
  },
  {
    name: "Svelte: funções de transition:/in:/out:/animate: (como use:)",
    scope: ["meta.directive.transition.svelte entity.name.type.svelte", "meta.directive.in.svelte entity.name.type.svelte", "meta.directive.out.svelte entity.name.type.svelte", "meta.directive.animate.svelte entity.name.type.svelte"],
    settings: { foreground: r.func },
  },
  {
    name: "Angular: {{ }} de interpolação (como no Vue)",
    scope: ["text.html.derivative > punctuation.definition.block.ts", "control.block.body.ng > punctuation.definition.block.ts"],
    settings: { foreground: r.keyword },
  },
  {
    name: "TOML: chaves",
    scope: ["variable.other.key.toml"],
    settings: { foreground: r.property },
  },
  {
    name: "TOML/INI: nomes de tabelas e seções [package] [server]",
    scope: ["entity.name.section.toml", "support.type.property-name.table.toml", "support.type.property-name.array.toml", "entity.name.section.group-title.ini"],
    settings: { foreground: r.type },
  },
  {
    name: "TOML: pontos em [a.b]",
    scope: ["meta.group.toml", "meta.group.double.toml"],
    settings: { foreground: r.punct },
  },
  {
    name: "HCL/Terraform: atributos e chaves (region = ...)",
    scope: ["variable.declaration.hcl variable.other.readwrite.hcl", "meta.mapping.key.hcl variable.other.readwrite.hcl", "variable.other.member.hcl"],
    settings: { foreground: r.property },
  },
  {
    name: "Terraform: var, local, data, module, each, count, self (como this)",
    scope: ["variable.other.readwrite.terraform"],
    settings: { foreground: r.special, fontStyle: "italic" },
  },
  {
    name: "HCL: tipos (string, number, list(...))",
    scope: ["storage.type.hcl"],
    settings: { foreground: r.type },
  },
  {
    name: "HCL: in do for",
    scope: ["keyword.operator.word.hcl"],
    settings: { foreground: r.keyword },
  },
  {
    name: "HCL: identificador de heredoc",
    scope: ["keyword.control.heredoc.hcl"],
    settings: { foreground: r.string },
  },
  {
    name: "GraphQL: valores de enum",
    scope: ["constant.character.enum.graphql"],
    settings: { foreground: r.constant },
  },
  {
    name: "GraphQL: campos, aliases e chaves de objetos",
    scope: ["variable.graphql", "variable.arguments.graphql", "string.unquoted.graphql", "string.unquoted.alias.graphql"],
    settings: { foreground: r.property },
  },
  {
    name: "GraphQL: uso de $variável nos argumentos (como a declaração)",
    scope: ["meta.arguments.graphql variable.graphql"],
    settings: { foreground: r.param, fontStyle: "italic" },
  },
  {
    name: "GraphQL: scalar",
    scope: ["entity.scalar.graphql"],
    settings: { foreground: r.type },
  },
  {
    name: "GraphQL: fragmentos (como nomes de operações)",
    scope: ["entity.name.fragment.graphql", "variable.fragment.graphql"],
    settings: { foreground: r.func },
  },
  {
    name: "GraphQL: diretivas (@deprecated) como decorators",
    scope: ["entity.name.function.directive.graphql"],
    settings: { foreground: r.func, fontStyle: "italic" },
  },
];

// Realce semântico (servidores de linguagem). Em JS/TS as variáveis ficam de propósito
// só com as cores TextMate (regras "source variable..." acima): assim o resultado é
// igual no TypeScript clássico e no TypeScript 7 (tsgo), que não envia o modificador "local".
export const semanticTokenColors = (r) => ({
  "parameter": { foreground: r.param, italic: true },
  "selfParameter": { foreground: r.special, italic: true },
  "clsParameter": { foreground: r.special, italic: true },
  "property": r.property,
  "enumMember": r.constant,
  "type": r.type,
  "class": r.type,
  "interface": r.type,
  "namespace": r.type,
  "function": r.func,
  // Parâmetro cujo tipo é uma função (resolve, reject, next, callback): tsserver/tsgo enviam function.declaration
  // sobre o escopo TextMate de parâmetro; sem isto a declaração herdaria o itálico e pareceria um decorator.
  "function.declaration": { foreground: r.func, italic: false },
  "method": r.func,
  "variable:python": r.fg,
  "variable.readonly:python": r.constant,

  // Python (Pylance). Em empate de pontuação vence a regra que vem depois:
  // os decorators precisam ficar depois de classMember.
  "variable.classMember:python": r.property,
  "variable.classMember.readonly:python": r.constant,
  "variable.dynamicAttribute:python": r.property,
  "builtinConstant:python": r.constant,
  "keyword.overridden:python": r.keyword,
  "*.decorator:python": { foreground: r.func, italic: true },
  "variable.decorator:python": { foreground: r.func, italic: true },

  // C# (Roslyn) e Java (redhat.java)
  // operatorOverloaded: operadores definidos pelo usuário (Guid ==, DateTime +, records). Sem regra, a extensão C#
  // os pinta como método; aqui ficam como os demais operadores do C# (mesma cor do TextMate, sem troca ao carregar).
  "operatorOverloaded": r.punct,
  "delegate": r.type,
  "constant": r.constant,
  "event": r.property,
  "macro:csharp": r.keyword,
  "preprocessorText": r.comment,
  "excludedCode": r.comment,
  "regexCharacterClass": r.constant,
  "regexComment": { foreground: r.comment, italic: true },
  "xmlDocCommentName": r.keyword,
  "namespace.deprecated:csharp": r.fg,
  "macro:aspnetcorerazor": r.keyword,
  "namespace.deprecated:aspnetcorerazor": r.fg,
  "annotation": { foreground: r.func, italic: true },
  "annotationMember": { foreground: r.param, italic: true },
  "record": r.type,
  "recordComponent": { foreground: r.property, italic: false },
  "property.static.readonly:java": r.constant,

  // Go (gopls, com "ui.semanticTokens": true)
  "variable.readonly:go": r.constant,
  "typeParameter:go": { foreground: r.type, italic: false },
  "*.format:go": r.keyword,

  // Rust, C/C++, Kotlin, Swift, Dart, Scala, Groovy, Zig
  "selfKeyword:rust": { foreground: r.special, italic: true },
  "selfTypeKeyword:rust": { foreground: r.special, italic: true },
  "lifetime:rust": r.keyword,
  "attribute:rust": { foreground: r.func, italic: true },
  "derive:rust": { foreground: r.type, italic: true },
  "decorator:rust": { foreground: r.func, italic: true },
  "*.mutable:rust": { underline: true },
  "macro:c": r.keyword,
  "macro:cpp": r.keyword,
  "concept:cpp": r.type,
  "struct:c": r.type,
  "struct:cpp": r.type,
  "decorator:kotlin": { foreground: r.func, italic: true },
  "operator.declaration:kotlin": r.func,
  "source.interpolation:dart": r.keyword,
  "variable.instance:dart": r.property,
  "variable.static:dart": r.property,
  "property:dart": r.fg,
  "property.instance:dart": r.property,
  "property.static:dart": r.property,
  "variable.importPrefix:dart": r.type,
  "errorTag:zig": r.constant,

  // PHP, Dockerfile, TOML, Terraform e outros
  "property.static.readonly:php": r.constant,
  "parameter:dockerfile": { foreground: r.fg, italic: false },
  "macro:dockerfile": r.property,
  "tomlTableKey": r.type,
  "tomlArrayKey": r.type,
  "hcl-attrName": r.property,
  "hcl-blockType": r.type,
  "hcl-blockLabel": r.constant,
  "hcl-bool": r.constant,
  "hcl-number": r.constant,
  "hcl-string": r.string,
  "hcl-objectKey": r.property,
  "hcl-mapKey": r.property,
  "hcl-keyword": r.keyword,
  "hcl-typePrimitive": r.type,
  "hcl-typeComplex": r.type,
  "hcl-functionName": r.func,

  "*.deprecated": { strikethrough: true },
});
