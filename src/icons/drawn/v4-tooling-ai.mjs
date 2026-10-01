// Serena Icons — batch "v4-tooling-ai" (FILE icons, MINIMAL edition).
// AI assistants (variants of `ai`), CI providers (variants of `ci`), infrastructure, tooling,
// docs generators, design/3D/ML assets and mobile/game engines. Original artwork only: every
// brand is evoked with its palette token + a generic functional symbol or a Serena-font monogram,
// never with its logo or mascot. Inner SVG markup for viewBox "0 0 16 16" with {{token}}
// placeholders; generated from work/v4-tooling-ai/batch.mjs (glyphs.mjs helpers) and inlined as
// plain strings so this module has NO imports. All ids lint clean with render.mjs --strict.
export const icons = {
  // ── AI assistants (variants of `ai`: lavender sparkle) ─────────────────────────────────────
  // Claude memory/settings: speech bubble with a 4-point sparkle (rust) — not the starburst mark
  "claude":
    "<path d=\"M4 1.5h9a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-5.5l-3 3v-3h-.5a1.5 1.5 0 0 1-1.5-1.5v-7a1.5 1.5 0 0 1 1.5-1.5z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rust}}\"/><path d=\"M8.5 3Q9 6 12 6.5Q9 7 8.5 10Q8 7 5 6.5Q8 6 8.5 3z\" fill=\"{{rust}}\"/>",
  // Cursor rules: solid pointer arrow + small sparkle (fg) — no cube
  "cursor":
    "<path d=\"M3 2l8 8H6l-3 3z\" fill=\"{{fg}}\"/><path d=\"M7.5 10.5l2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{fg}}\"/><path d=\"M12.5 2.5v4M10.5 4.5h4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{fg}}\"/><path d=\"M11 3h3v3h-3z\" fill=\"{{fg}}\"/>",
  // Gemini context/settings: twin 4-point stars on the diagonal (blue) — "twins", not one gradient star
  "gemini":
    "<path d=\"M5.5 1Q6 5 10 5.5Q6 6 5.5 10Q5 6 1 5.5Q5 5 5.5 1z\" fill=\"{{blue}}\"/><path d=\"M10.5 6Q11 10 15 10.5Q11 11 10.5 15Q10 11 6 10.5Q10 10 10.5 6z\" fill=\"{{blue}}\"/>",
  // Copilot instructions: notched page + prose lines + sparkle in the corner-mark slot (purple)
  "copilot":
    "<path d=\"M12.5 9.5v-5l-3-3h-6v13h6M9.5 1.5v3h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{purple}}\"/><path d=\"M5.5 6.5H10.5M5.5 9.5H8.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{purple}}\"/><path d=\"M13.5 11.5v4M11.5 13.5h4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{purple}}\"/><path d=\"M12 12h3v3h-3z\" fill=\"{{purple}}\"/>",
  // MCP server config: two-prong plug with its cable (sage) — a connector protocol
  "mcp":
    "<path d=\"M6.5 1.5v2M10.5 1.5v2M3.5 4.5h10v3l-3 3h-4l-3-3v-3zM8.5 10.5v4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/>",
  // ── CI providers (variants of `ci`: peach rails + stages + arrow) ──────────────────────────
  // GitLab CI: DAG pipeline — one stage fans out to two parallel jobs and joins into an arrow (orange)
  "gitlab":
    "<path d=\"M1.75 6h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{orange}}\"/><path d=\"M6.75 2h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{orange}}\"/><path d=\"M6.75 10h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{orange}}\"/><path d=\"M4.5 3.5v8M4.5 3.5h1M4.5 11.5h1M10.5 3.5v8M9.5 3.5h1M9.5 11.5h1M10.5 7.5h3M12.5 5.5l2 2-2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{orange}}\"/>",
  // Azure Pipelines: multi-stage — two linked stage lanes, each running to its own arrow (blue)
  "azure-pipelines":
    "<path d=\"M1.75 2h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{blue}}\"/><path d=\"M1.75 10h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{blue}}\"/><path d=\"M4.5 3.5h6M9.5 1.5l2 2-2 2M4.5 11.5h8M11.5 9.5l2 2-2 2M2.5 5.5v4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // Jenkinsfile: stages cascading one after another (stage view) (rose) — no butler
  "jenkins":
    "<path d=\"M1.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{rose}}\"/><path d=\"M5.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{rose}}\"/><path d=\"M9.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{rose}}\"/><path d=\"M4.5 4.5h2v2M8.5 8.5h2v2M12.5 12.5h2M13.5 11.5l1 1-1 1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/>",
  // CircleCI: pipeline closed into a loop with a direction arrow and one stage (grey) — no ringed dot
  "circleci":
    "<path d=\"M5.5 3.5h5a4 4 0 0 1 0 8h-5a4 4 0 0 1 0-8zM8.5 1.5l2 2-2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{grey}}\"/><path d=\"M4.75 10h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{grey}}\"/>",
  // Bitbucket Pipelines: stages + arrow over a tray (cyan) — no bucket
  "bitbucket":
    "<path d=\"M1.5 9.5v3h13v-3M4.5 5.5h8M11.5 3.5l2 2-2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/><path d=\"M1.75 4h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{cyan}}\"/><path d=\"M6.75 4h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{cyan}}\"/>",
  // ── infrastructure & platforms ────────────────────────────────────────────────────────────
  // Helm charts: manifest box with a chart tag on the front (blue) — no ship's wheel
  "helm":
    "<path d=\"M2.5 5.5h11v8h-11v-8zM4.5 2.5h7l2 3M4.5 2.5l-2 3M5.5 8.5h3l1 1-1 1h-3v-2z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // Ansible: letter + lines, A with two task items (red)
  "ansible":
    "<path d=\"M2.5 8.5V3.5L3.5 2.5H5.5L6.5 3.5V8.5M2.5 5.5H6.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{red}}\"/><path d=\"M8.5 2.5H13.5M8.5 5.5H13.5M8.5 8.5H11.5M2.5 11.5H3.5M5.5 11.5H13.5M2.5 13.5H3.5M5.5 13.5H10.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{red}}\"/>",
  // nginx.conf: web-server rack (green)
  "nginx":
    "<path d=\"M3.5 2.5h9v4h-9v-4zM3.5 8.5h9v4h-9v-4zM5.5 4.5h2M5.5 10.5h2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/><path d=\"M10 4h1v1h-1zM10 10h1v1h-1z\" fill=\"{{green}}\"/>",
  // Apache httpd/.htaccess: server unit over a padlock — access rules (rose) — no feather; not a
  // recoloured nginx rack (colour alone must not separate two icons)
  "apache":
    "<path d=\"M3.5 2.5h9v4h-9v-4zM5.5 4.5h2M5.5 10.5v-1l1-1h3l1 1v1M4.5 10.5h7v4h-7v-4z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/><path d=\"M10 4h1v1h-1z\" fill=\"{{rose}}\"/>",
  // AWS CDK/SAM/Serverless: cloud with a service box (orange) — no smile arrow
  "aws":
    "<path d=\"M3.5 12.5h9l2-2v-1l-2-2h-1v-1l-2-2h-2l-2 2v1h-2l-2 2v1l2 2z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{orange}}\"/><path d=\"M7 8h3v3H7z\" fill=\"{{orange}}\"/>",
  // Azure azd/SWA/ARM: cloud with a deploy arrow (blue) — no "A" mark
  "azure":
    "<path d=\"M3.5 12.5h9l2-2v-1l-2-2h-1v-1l-2-2h-2l-2 2v1h-2l-2 2v1l2 2zM8.5 10.5v-3M6.5 9.5l2-2 2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // Bicep: IaC language -> chip BI (cyan)
  "bicep":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{cyan}}\" fill-opacity=\".2\"/><path d=\"M4.5 4.5H7.5L8.5 5.5V6.5L7.5 7.5H4.5M7.5 7.5L8.5 8.5V9.5L7.5 10.5H4.5V4.5M10.5 4.5H12.5M11.5 4.5V10.5M10.5 10.5H12.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/>",
  // Bazel/Starlark: build language -> chip BZ (sage)
  "bazel":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{sage}}\" fill-opacity=\".2\"/><path d=\"M3.5 4.5H6.5L7.5 5.5V6.5L6.5 7.5H3.5M6.5 7.5L7.5 8.5V9.5L6.5 10.5H3.5V4.5M9.5 4.5H13.5V5.5L9.5 9.5V10.5H13.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/>",
  // ── tooling ───────────────────────────────────────────────────────────────────────────────
  // asdf/mise/SDKMAN pins: a version tag (sand)
  "version-manager":
    "<path d=\"M1.5 1.5h6l7 7-6 6-7-7v-6z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/><path d=\"M3.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{sand}}\"/>",
  // CSpell/typos/Vale: ABC over a check (teal + green)
  "spellcheck":
    "<path d=\"M3.5 6.5V3.5L4.5 2.5L5.5 3.5V6.5M3.5 4.5H5.5M7.5 6.5V2.5H8.5L9.5 3.5L8.5 4.5H7.5M8.5 4.5L9.5 5.5L8.5 6.5H7.5M13.5 2.5H12.5L11.5 3.5V5.5L12.5 6.5H13.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/><path d=\"M4.5 10.5l3 3 5-5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/>",
  // Gherkin .feature: Given/When steps led by chevrons, Then led by a check (green) — no cucumber
  "gherkin":
    "<path d=\"M2.5 2.5l1 1-1 1M2.5 6.5l1 1-1 1M1.5 11.5l1 1 2-2M6.5 3.5h8M6.5 7.5h6M6.5 11.5h7\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/>",
  // Husky git hooks: a hook that runs checks (rose hook + green check) — no dog
  "husky":
    "<path d=\"M10.75 1h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{rose}}\"/><path d=\"M11.5 4.5v7l-3 3-3-3v-2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/><path d=\"M2.5 5.5l2 2 3-3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/>",
  // commitlint: commit node on its line + green check
  "commitlint":
    "<path d=\"M1.5 5.5h4M11.5 5.5h3M7.5 3.5h2l1 1v2l-1 1h-2l-1-1v-2l1-1z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/><path d=\"M4.5 11.5l2 2 5-5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/>",
  // OpenAPI/Swagger/Spectral: braces around a request/response pair of arrows (sage)
  "openapi":
    "<path d=\"M5.5 2.5h-1l-1 1v3l-1 1v1l1 1v3l1 1h1M10.5 2.5h1l1 1v3l1 1v1l-1 1v3l-1 1h-1M6.5 5.5h4M9.5 4.5l1 1-1 1M10.5 10.5h-4M7.5 9.5l-1 1 1 1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/>",
  // Postman collections: paper plane with its centre fold (peach) — no rocket roundel
  "postman":
    "<path d=\"M14.5 1.5l-12 6 4 2 2 4 6-12zM6.5 9.5l8-8\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{peach}}\"/>",
  // gettext/ARB/strings catalogs: two overlapping speech bubbles (cyan, like the i18n folder badge)
  "i18n":
    "<path d=\"M7 5.5h6a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-.5v3l-3-3h-2.5a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5zM10.5 3.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v7.5l2-2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/><path d=\"M8 8h1v1H8zM11 8h1v1h-1z\" fill=\"{{cyan}}\"/>",
  // ── docs & documents ──────────────────────────────────────────────────────────────────────
  // docs-site generators (VitePress, Hugo, Sphinx, ...): open book with prose on both pages (teal)
  "docs-site":
    "<path d=\"M8.5 4.5l-2-2h-4v10h4l2 2 2-2h4v-10h-4l-2 2v10M4.5 5.5h2M4.5 8.5h2M10.5 5.5h2M10.5 8.5h2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/>",
  // MkDocs: open book, right page opens with a heading block (Markdown) (blue)
  "mkdocs":
    "<path d=\"M8.5 4.5l-2-2h-4v10h4l2 2 2-2h4v-10h-4l-2 2v10M4.5 5.5h2M4.5 8.5h2M10.5 9.5h2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/><path d=\"M10 5h3v2h-3z\" fill=\"{{blue}}\"/>",
  // Docusaurus: open book with < > across its pages (green) — no dinosaur
  "docusaurus":
    "<path d=\"M8.5 4.5l-2-2h-4v10h4l2 2 2-2h4v-10h-4l-2 2v10M6.5 5.5l-2 2 2 2M10.5 5.5l2 2-2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/>",
  // LaTeX/BibTeX: typesetting language -> chip TEX (teal)
  "latex":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{teal}}\" fill-opacity=\".2\"/><path d=\"M3.5 5.5H5.5M4.5 5.5V9.5M9.5 5.5H7.5V9.5H9.5M7.5 7.5H8.5M11.5 5.5V6.5L13.5 8.5V9.5M13.5 5.5V6.5L11.5 8.5V9.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/>",
  // Typst: chip TYP (cyan)
  "typst":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{cyan}}\" fill-opacity=\".2\"/><path d=\"M3.5 5.5H5.5M4.5 5.5V9.5M7.5 5.5V6.5L8.5 7.5L9.5 6.5V5.5M8.5 7.5V9.5M11.5 9.5V5.5H12.5L13.5 6.5L12.5 7.5H11.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/>",
  // ── design, media, models ─────────────────────────────────────────────────────────────────
  // draw.io/Excalidraw/PlantUML/Mermaid/D2/Graphviz: flowchart, two boxes feeding a solid node (orange)
  "diagram":
    "<path d=\"M1.5 2.5h4v3h-4v-3zM1.5 10.5h4v3h-4v-3zM3.5 6.5v3M6.5 4.5h5v2M6.5 11.5h5v-2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{orange}}\"/><path d=\"M9 6h5v4H9z\" fill=\"{{orange}}\"/>",
  // Figma/Sketch/Illustrator/...: vector pen nib (pink)
  "design":
    "<path d=\"M5.5 1.5h6M6.5 3.5h4l3 3v1l-5 5-5-5v-1l3-3zM8.5 9.5v3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{pink}}\"/><path d=\"M7.75 6h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{pink}}\"/>",
  // glTF/FBX/STL/Blender/STEP: isometric cube, top face shaded (peach)
  "model-3d":
    "<path d=\"M8.5 1.5l6 3-6 3-6-3z\" fill=\"{{peach}}\" fill-opacity=\".5\"/><path d=\"M8.5 1.5l6 3-6 3-6-3 6-3zM2.5 4.5v6l6 3 6-3v-6M8.5 7.5v6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{peach}}\"/>",
  // ONNX/PyTorch/safetensors/GGUF/pickle/NumPy: two layers of neurons, crossing links (purple)
  "ml-model":
    "<path d=\"M3.5 3.5l10 5M3.5 8.5l10-5M3.5 8.5l10 5M3.5 13.5l10-5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{purple}}\" stroke-opacity=\".5\"/><path d=\"M2.75 2h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{purple}}\"/><path d=\"M2.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{purple}}\"/><path d=\"M2.75 12h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{purple}}\"/><path d=\"M12.75 2h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{purple}}\"/><path d=\"M12.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{purple}}\"/><path d=\"M12.75 12h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{purple}}\"/>",
  // ── mobile, desktop & game engines ────────────────────────────────────────────────────────
  // Android manifest/ProGuard/AIDL: phone with two antenna ticks (green) — no robot head
  "android":
    "<path d=\"M6 4.5h4a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1 -1.5 1.5h-4a1.5 1.5 0 0 1 -1.5 -1.5v-7a1.5 1.5 0 0 1 1.5 -1.5zM6.5 4.5l-3-3M9.5 4.5l3-3M7.5 12.5h1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/>",
  // Xcode projects/storyboards/plists: drafting set square (blueprint blue) — no hammer
  "xcode":
    "<path d=\"M2.5 2.5v11h11l-11-11zM4.5 7.5v4h4l-4-4zM3.5 5.5h1M3.5 9.5h1M6.5 12.5v1M10.5 12.5v1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // CocoaPods Podfile/.lock/podspec: manifest box holding three pods (rose)
  "cocoapods":
    "<path d=\"M2.5 5.5h11v8h-11v-8zM4.5 2.5h7l2 3M4.5 2.5l-2 3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/><path d=\"M4 9h2v2H4zM7 9h2v2H7zM10 9h2v2h-2z\" fill=\"{{rose}}\"/>",
  // Unity YAML assets/scenes/prefabs: letter + lines, U (fg) — no cube
  "unity":
    "<path d=\"M2.5 2.5V7.5L3.5 8.5H5.5L6.5 7.5V2.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{fg}}\"/><path d=\"M8.5 2.5H13.5M8.5 5.5H13.5M8.5 8.5H11.5M2.5 11.5H13.5M2.5 13.5H9.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{fg}}\"/>",
  // Godot GDScript/scenes: chip GDS (blue) — 3 letters because "GD" reads as the Go chip "GO" at 1x
  "godot":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{blue}}\" fill-opacity=\".2\"/><path d=\"M5.5 5.5H4.5L3.5 6.5V8.5L4.5 9.5H5.5V7.5M7.5 5.5H8.5L9.5 6.5V8.5L8.5 9.5H7.5V5.5ZM13.5 5.5H12.5L11.5 6.5L13.5 8.5L12.5 9.5H11.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // Arduino sketches/PlatformIO: chip INO (teal)
  "arduino":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{teal}}\" fill-opacity=\".2\"/><path d=\"M3.5 5.5H5.5M4.5 5.5V9.5M3.5 9.5H5.5M7.5 9.5V5.5M7.5 5.5L10.5 8.5M10.5 5.5V9.5M13.5 5.5L14.5 6.5V8.5L13.5 9.5L12.5 8.5V6.5L13.5 5.5Z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/>",
  // Qt QML/qmake/.ui: chip QT (sage)
  "qt":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{sage}}\" fill-opacity=\".2\"/><path d=\"M4.5 4.5H6.5L7.5 5.5V8.5L5.5 10.5H4.5L3.5 9.5V5.5L4.5 4.5ZM5.5 8.5L7.5 10.5M9.5 4.5H13.5M11.5 4.5V10.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/>",
};
