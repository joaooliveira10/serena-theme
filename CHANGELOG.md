# Changelog

## 1.1.0

### Themes

- Regular themes: dimmed text is easier to read. Inactive tabs and panel titles, CodeLens, inlay hints, input placeholders and the terminal hint now reach 4.5:1; line numbers, tabs of unfocused groups, the inactive title bar and git-ignored files reach 3:1. The border of the matching-bracket box reaches 3:1.
- Dark themes: "bright black" text in the terminal reaches 4.5:1.
- Light themes: four syntax colors in Serena Light and five in Serena Light Vivid are slightly darker, and the highlight tints are softer. On a selection, or on a word, find or diff highlight, every code color except comments now reaches 4.5:1; where two highlights overlap it can be lower (4.4:1 for a find match on the current line, about 4.1:1 for the current find match on top of a selection). Secondary buttons no longer turn white on hover.
- High contrast themes: find matches, word occurrences and the matching bracket are drawn as outlines instead of fills, so syntax stays at 7:1 on them. The tints that cannot have an outline (hover, linked editing, the debugger's current line, unchanged regions of a diff) are lighter for the same reason. The scrollbar thumb and the minimap slider reach 3:1.

### Syntax colors

- Log files and the Output panel: `ERROR`, `FATAL` and stack traces use the error color and `WARN` the warning color (they were green and pink).
- `.env` files: keys are teal and, with VS Code's built-in grammar, unquoted values are green.
- Diff, patch and `git commit -v`: the `+`, `-` and `!` markers take the color of their line; headers, hunk ranges and index lines are colored.
- HTML, XML, Markdown, Handlebars, Pug, PHP and Razor: character entities (`&amp;`, `&#169;`) are colored like escapes.
- TypeScript and JavaScript: callback parameters (`resolve`, `reject`, `next`) are no longer italic where they are declared.
- Java: `super` matches `this`.
- C#: overloaded operators are grey like every other operator.
- Python: in regular expressions, back-references are lavender and group names plain, as in JavaScript. With Pylance, `ParamSpec` and `TypeVarTuple` type parameters (Python 3.12 syntax) use the type color.
- Swift: generic parameters and associated types use the type color where they are declared.
- Git commit messages: a subject between 51 and 72 columns is shown as a warning instead of an error.
- If you pasted the "Prefer no italics?" settings from the README, copy them again: they gained one selector (`variable.language.java`).

### Icons

- **Serena Icons**: the logos of React, Jupyter, CircleCI, Qt, Django, Bun, Nx, Cypress, Apache HTTP Server and Apache Maven were replaced by original icons, because their owners' rules do not allow a recolored or redrawn logo, or require permission to use it. 68 file types and 8 folders keep a logo (81 and 9 before).
- 706 new file name, extension, language and folder associations (.NET, Java, Go, Python, JavaScript and TypeScript tooling, AI assistant files, DevOps), for example `README.pt-BR.md`, `appsettings.Homolog.json`, `*.config.ts`, `src/main/java` and `.github/workflows/dependabot.yml`. The icons now match 1,013 file extensions, 1,497 file names, 240 language modes and 764 folder names.
- High contrast icons re-tuned as one set of colors for both themes. On Serena High Contrast Light they gained contrast: at least 4.0:1 on the side bar (3.0 before) and 3.1:1 on a selected row. On Serena High Contrast they lost some: 4.8:1 on the side bar (5.6 before) and 3.4:1 on a selected row (3.9 before). Secondary parts such as slider tracks and the back of an open folder are stronger (3.1:1 or more on both side bars), so two-tone icons look flatter, and the tiles behind letter icons are fainter.
- Light themes: the default file and folder icons, and every other icon drawn in the same grey (lock files, generated files, cache and dependency folders), are darker: 3.2:1 or more on every row state (2.7 before on the selected row).
- `.vhd` files are shown as source code (VHDL), not as archives.

### Listing and project

- New name on the stores, "Serena — Calm Pastel Theme & Icons", and a shorter description. The names of the themes and icon themes did not change.
- README rewritten: a first image of the whole editor, one image comparing the six themes and their role colors, install steps near the top, working badges, and the long settings blocks collapsed. All images were rendered again from the 1.1.0 themes and icons.
- This changelog is now in English.
- New `scripts/check.mjs`, run by CI after the build: contrast of every syntax color, roles, icon mapping, SVG content, the numbers quoted in the README, and that `package.json` declares no code and no dependencies.
- Build and CI: stricter build validation that writes nothing when it fails, a check that also fails when the build creates a file that was not committed, the list of packaged files checked before every release, a release package that CI rebuilds identically (on GitHub's runners the same commit gives the same `.vsix`; a build on another system or in another time zone has a different hash), a stricter `.gitignore` and updated guides.

## 1.0.2

- Store page: link to Open VSX, where the extension is now published too.

## 1.0.1

- Store page: removed the badges that did not work and the mention of Open VSX, where the extension was not yet published.

## 1.0.0

First public release.

- Color themes **Serena Dark**, **Serena Dark Vivid**, **Serena Light**, **Serena Light Vivid**, **Serena High Contrast** and **Serena High Contrast Light**, with the same colors for the same role in every variant.
- Coverage reviewed for C#, Java, JavaScript, TypeScript, Go, Python and YAML, including semantic highlighting (Roslyn, Pylance, TypeScript/tsgo, gopls).
- Coverage of more than 30 other languages: Rust, C, C++, Kotlin, Swift, Dart, Scala, Groovy, Zig, PHP, Ruby, Lua, R, Elixir, Perl, Bash, PowerShell, SQL, Vue, Svelte, Astro, Angular, Dockerfile, Makefile, TOML, INI, Terraform/HCL, GraphQL, XML, Markdown and CSS/SCSS/Less.
- Complete interface in the palette colors: AI chat, inline suggestions, tests, the debugger, the merge editor, the terminal, the Git graph and the status bar.
- Bracket pairs colored in 6 levels, with pair guides in the same color.
- Icon theme in two editions, with 284 file types and 101 folders, and a high contrast version:
  - **Serena Icons**: recognizable logos for 81 file types, redrawn in the palette (where the brand's rules allow it).
  - **Serena Icons Minimal**: original artwork only.
- Configuration files (Svelte, Astro, Vue, Yarn, pnpm, Bun, Swift, Godot and others) with their own configuration icon.
- Issue templates and an automatic build check on GitHub.
