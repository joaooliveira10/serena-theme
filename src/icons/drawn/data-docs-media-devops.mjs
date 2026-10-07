// Serena Icons — batch "data-docs-media-devops" (FILE icons).
// Data/serialization (syntax symbol or letter + lines), documents (prose lines + glyph), media
// (framed content), archives/security, dev tools and DevOps (original functional symbols —
// no vendor logos). Inner SVG markup for viewBox "0 0 16 16" with {{token}} placeholders.
// Hand-maintained: written with the helpers of system/glyphs.mjs and inlined as
// plain strings, so this module has NO imports (same convention as languages-source.mjs and
// build-config-tooling.mjs). Edit the strings, or import the helpers as folders.mjs does.
export const icons = {
  // ── default ───────────────────────────────────────────────────────────────────────────────────
  // default file: plain folded page (muted) — exemplar
  "file":
    "<path d=\"M3.5 1.5h6l3 3v10h-9v-13zM9.5 1.5v3h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/>",
  // ── DATA / SERIALIZATION ──────────────────────────────────────────────────────────────────────
  // JSON: braces around a value dot (sand) — exemplar
  "json":
    "<path d=\"M5.5 2.5h-1l-1 1v3l-1 1v1l1 1v3l1 1h1M10.5 2.5h1l1 1v3l1 1v1l-1 1v3l-1 1h-1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/><path d=\"M7 7h2v2H7z\" fill=\"{{sand}}\"/>",
  // YAML: Y + key/value lines (rose) — exemplar
  "yaml":
    "<path d=\"M2.5 2.5V3.5L4.5 5.5L6.5 3.5V2.5M4.5 5.5V8.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/><path d=\"M8.5 2.5H13.5M8.5 5.5H13.5M8.5 8.5H11.5M2.5 11.5H3.5M5.5 11.5H13.5M5.5 13.5H10.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/>",
  // TOML: T + key lines with a [section] header row (brown)
  "toml":
    "<path d=\"M2.5 2.5H6.5M4.5 2.5V8.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{brown}}\"/><path d=\"M8.5 2.5H13.5M8.5 5.5H13.5M8.5 8.5H11.5M5.5 12.5H10.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{brown}}\"/><path d=\"M3.5 10.5h-1v4h1M12.5 10.5h1v4h-1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{brown}}\"/>",
  // XML: markup chevrons wrapping nested data rows (peach); html keeps the plain </> glyph
  "xml":
    "<path d=\"M5.5 3.5l-4 4 4 4M10.5 3.5l4 4-4 4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{peach}}\"/><path d=\"M6.5 5.5H9.5M7.5 7.5H9.5M6.5 9.5H9.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{peach}}\"/>",
  // CSV/TSV/spreadsheets: frame, solid header rule, cell rules at .5 (sage)
  "table":
    "<path d=\"M3 2.5h10a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1 -1.5 1.5h-10a1.5 1.5 0 0 1 -1.5 -1.5v-8a1.5 1.5 0 0 1 1.5 -1.5zM2.5 5.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/><path d=\"M6.5 6.5v6M2.5 9.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\" stroke-opacity=\".5\"/>",
  // SQL is a language -> chip (peach)
  "sql":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{peach}}\" fill-opacity=\".2\"/><path d=\"M5.5 5.5H4.5L3.5 6.5L5.5 8.5L4.5 9.5H3.5M8.5 5.5L9.5 6.5V8.5L8.5 9.5L7.5 8.5V6.5L8.5 5.5ZM8.5 8.5L9.5 9.5M11.5 5.5V9.5H13.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{peach}}\"/>",
  // sqlite/db/mdb: cylinder of three discs (sand)
  "database":
    "<path d=\"M4.5 1.5h7l2 2-2 2h-7l-2-2 2-2zM2.5 3.5v9l2 2h7l2-2v-9M2.5 7.5l2 2h7l2-2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/>",
  // ── DOCUMENTS ─────────────────────────────────────────────────────────────────────────────────
  // Markdown: # + prose lines (blue) — exemplar
  "markdown":
    "<path d=\"M3.5 2.5V6.5M5.5 2.5V6.5M2.5 3.5H6.5M2.5 5.5H6.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/><path d=\"M8.5 4.5H13.5M2.5 9.5H13.5M2.5 12.5H10.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // README: info mark in a circle, bold 2px i from fills (cyan)
  "readme":
    "<path d=\"M1.5 8a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/><path d=\"M7 4h2v2H7zM7 7h2v5H7z\" fill=\"{{cyan}}\"/>",
  // LICENSE: prose lines + award medal (sand)
  "license":
    "<path d=\"M2.5 3.5H7.5M2.5 6.5H6.5M2.5 9.5H7.5M2.5 12.5H5.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/><path d=\"M10.5 1.5h2l2 2v2l-2 2h-2l-2-2v-2l2-2zM10.5 8.5v5l1-1 1 1v-5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/><path d=\"M10.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{sand}}\"/>",
  // CHANGELOG/HISTORY: clock face with a counter-clockwise history arrow (sage)
  "changelog":
    "<path d=\"M3.5 4.5l2-2h4l3 3v4l-3 3h-4l-3-3v-1M1.5 2.5v3h3M7.5 5.5v3h2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/>",
  // CODEOWNERS/CONTRIBUTING/AUTHORS: two people (pink)
  "community":
    "<path d=\"M4.5 3.5h1l1 1v1l-1 1h-1l-1-1v-1l1-1zM1.5 13.5v-2l2-2h3l2 2v2M10.5 2.5h1l1 1v1l-1 1h-1l-1-1v-1l1-1zM9.5 7.5h3l2 2v3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{pink}}\"/>",
  // plain text: page + lines (grey)
  "text":
    "<path d=\"M3.5 1.5h6l3 3v10h-9v-13zM9.5 1.5v3h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{grey}}\"/><path d=\"M5.5 5.5H10.5M5.5 8.5H10.5M5.5 11.5H8.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{grey}}\"/>",
  // *.log: timestamp tick + message, four entries (muted)
  "log":
    "<path d=\"M2.5 3.5H3.5M5.5 3.5H13.5M2.5 6.5H3.5M5.5 6.5H11.5M2.5 9.5H3.5M5.5 9.5H13.5M2.5 12.5H3.5M5.5 12.5H9.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/>",
  // PDF: page with a solid label band (red), no vendor mark
  "pdf":
    "<path d=\"M3.5 1.5h6l3 3v10h-9v-13zM9.5 1.5v3h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{red}}\"/><path d=\"M5.5 5.5H10.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{red}}\"/><path d=\"M2 8h9v2H2z\" fill=\"{{red}}\"/>",
  // office documents/slides: page with an image block + paragraph lines (blue)
  "document":
    "<path d=\"M3.5 1.5h6l3 3v10h-9v-13zM9.5 1.5v3h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/><path d=\"M5 5h3v3H5z\" fill=\"{{blue}}\"/><path d=\"M9.5 5.5H10.5M9.5 7.5H10.5M5.5 10.5H10.5M5.5 12.5H8.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // ── MEDIA (framed content) ────────────────────────────────────────────────────────────────────
  // raster images: frame + mountains + sun (teal) — exemplar
  "image":
    "<path d=\"M3 2.5h10a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1 -1.5 1.5h-10a1.5 1.5 0 0 1 -1.5 -1.5v-8a1.5 1.5 0 0 1 1.5 -1.5zM2.5 12.5l4-4 3 3 2-2 2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/><path d=\"M9.75 4h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{teal}}\"/>",
  // SVG: bezier hump with anchor + tangent handles (orange)
  "svg":
    "<path d=\"M4.5 3.5h7M2.5 13.5v-2l1-2 2-2 2-1 2 1 2 2 1 2v2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{orange}}\"/><path d=\"M1.75 2h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75zM12.75 2h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75zM6 2h3v3H6z\" fill=\"{{orange}}\"/>",
  // fonts: Aa specimen in the media frame (rose)
  "font":
    "<path d=\"M3 2.5h10a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1 -1.5 1.5h-10a1.5 1.5 0 0 1 -1.5 -1.5v-8a1.5 1.5 0 0 1 1.5 -1.5zM3.5 10.5v-4l1-1h1l1 1v4M3.5 8.5h3M11.5 7.5v3M11.5 8.5l-1-1h-1l-1 1v1l1 1h1l1-1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/>",
  // audio: beamed eighth notes in the media frame (lavender)
  "audio":
    "<path d=\"M3 2.5h10a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1 -1.5 1.5h-10a1.5 1.5 0 0 1 -1.5 -1.5v-8a1.5 1.5 0 0 1 1.5 -1.5zM6.5 9.5v-5h5v4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{lavender}}\"/><path d=\"M5 9h2v2H5zM10 8h2v2h-2z\" fill=\"{{lavender}}\"/>",
  // video: solid play triangle in the media frame (pink)
  "video":
    "<path d=\"M3 2.5h10a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1 -1.5 1.5h-10a1.5 1.5 0 0 1 -1.5 -1.5v-8a1.5 1.5 0 0 1 1.5 -1.5z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{pink}}\"/><path d=\"M6 4v8l4-4z\" fill=\"{{pink}}\"/>",
  // ── ARCHIVES, BINARIES, SECURITY ──────────────────────────────────────────────────────────────
  // zip/tar/7z/...: page with a zipper and pull tab (brown)
  "archive":
    "<path d=\"M3.5 1.5h6l3 3v10h-9v-13zM9.5 1.5v3h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{brown}}\"/><path d=\"M6 2h1v1H6zM7 3h1v1H7zM6 4h1v1H6zM7 5h1v1H7zM6 6h1v1H6z\" fill=\"{{brown}}\"/><path d=\"M5.5 8.5h3v3h-3v-3z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{brown}}\"/>",
  // exe/dll/so/bin: two rows of bits (grey)
  "binary":
    "<path d=\"M3.5 4.5L4.5 3.5V7.5M3.5 7.5H5.5M7.5 3.5H9.5V7.5H7.5V3.5ZM11.5 4.5L12.5 3.5V7.5M11.5 7.5H13.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{grey}}\"/><path d=\"M3.5 9.5H5.5V13.5H3.5V9.5ZM7.5 10.5L8.5 9.5V13.5M7.5 13.5H9.5M11.5 9.5H13.5V13.5H11.5V9.5Z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{grey}}\"/>",
  // pem/crt/cer: card with text lines and a medal seal (green)
  "certificate":
    "<path d=\"M8.5 11.5h-5.5a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5h10a1.5 1.5 0 0 1 1.5 1.5v3.5M11.5 12.5v2M13.5 12.5v2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/><path d=\"M4.5 5.5H11.5M4.5 8.5H7.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/><path d=\"M11.75 9h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{green}}\"/>",
  // ssh/gpg/pfx/jks keys: horizontal key with a round bow (sand); .env uses the diagonal yellow key
  "key":
    "<path d=\"M1.5 7.5a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M9.5 7.5h5M12.5 7.5v2M14.5 7.5v3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/><path d=\"M5 7h1v1h-1v-1z\" fill=\"{{sand}}\"/>",
  // ── DEV TOOLS ─────────────────────────────────────────────────────────────────────────────────
  // .http/.rest request files: request -> / <- response (cyan)
  "http":
    "<path d=\"M2.5 4.5h11M10.5 1.5l3 3-3 3M13.5 10.5h-11M5.5 7.5l-3 3 3 3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/>",
  // diff/patch: added line (+, sage) over removed line (-, rose)
  "diff":
    "<path d=\"M4.5 2.5v6M1.5 5.5h6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/><path d=\"M10.5 5.5H14.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/><path d=\"M1.5 12.5H7.5M10.5 12.5H14.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/>",
  // AI instructions/prompts/skills: sparkle + twinkle (lavender), not a vendor mark
  "ai":
    "<path d=\"M6.5 3Q7 8 12 8.5Q7 9 6.5 14Q6 9 1 8.5Q6 8 6.5 3z\" fill=\"{{lavender}}\"/><path d=\"M12.5 1.5v4M10.5 3.5h4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{lavender}}\"/>",
  // ── DEVOPS ────────────────────────────────────────────────────────────────────────────────────
  // Dockerfile/Containerfile: stack of three shipping containers (blue), no whale
  "dockerfile":
    "<path d=\"M5.5 3.5h6v3h-6v-3zM7.5 4.5v1M9.5 4.5v1M1.5 9.5h6v3h-6v-3zM3.5 10.5v1M5.5 10.5v1M9.5 9.5h6v3h-6v-3zM11.5 10.5v1M13.5 10.5v1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // compose.yaml: two service containers wired into one network node (blue)
  "docker-compose":
    "<path d=\"M1.5 2.5h6v3h-6v-3zM3.5 3.5v1M5.5 3.5v1M9.5 2.5h6v3h-6v-3zM11.5 3.5v1M13.5 3.5v1M4.5 6.5v2h8v-2M8.5 8.5v2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/><path d=\"M7.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{blue}}\"/>",
  // .dockerignore: container stack with a prohibition sign (blue)
  "docker-ignore":
    "<path d=\"M5.5 3.5h6v3h-6v-3zM7.5 4.5v1M9.5 4.5v1M1.5 9.5h6v3h-6v-3zM3.5 10.5v1M5.5 10.5v1M11.5 9.5h2l2 2v2l-2 2h-2l-2-2v-2l2-2zM10.5 10.5l4 4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // .gitignore/.gitattributes/...: branch graph, trunk + 45deg branch (rust), no diamond
  "git":
    "<path d=\"M4.5 5.5v5M5.5 9.5l5-5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rust}}\"/><path d=\"M3.75 2h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75zM3.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75zM10.75 2h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{rust}}\"/>",
  // .github/workflows/*.yml: 9x9 octagon run button with a pixel-stepped play triangle, wired to a job node (lavender), no octocat
  "github-actions":
    "<path d=\"M3.5 1.5h4l2 2v4l-2 2h-4l-2-2v-4l2-2zM5.5 10.5v2h5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{lavender}}\"/><path d=\"M4 3h1v5H4zM5 4h1v3H5zM6 5h1v1H6zM11 11h3v3h-3z\" fill=\"{{lavender}}\"/>",
  // other CI/CD (gitlab-ci, azure-pipelines, Jenkinsfile ...): stages flowing through a pipe (peach)
  "ci":
    "<path d=\"M1.5 3.5h13M1.5 11.5h13M4.5 7.5h8M11.5 5.5l2 2-2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{peach}}\"/><path d=\"M1.75 6h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75zM6.75 6h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{peach}}\"/>",
  // dependabot/renovate: two refresh arrows around a dependency (teal)
  "dependency-bot":
    "<path d=\"M1.5 7.5v-2l4-4h4l3 3M10.5 5.5h3v-3M13.5 7.5v2l-4 4h-4l-3-3M4.5 9.5h-3v3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/><path d=\"M6.75 6h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{teal}}\"/>",
  // k8s/Helm/Kustomize: three pods (ring nodes) linked in a triangle (cyan), no wheel
  "kubernetes":
    "<path d=\"M6.5 1.5h2l1 1v2l-1 1h-2l-1-1v-2l1-1zM2.5 10.5h2l1 1v2l-1 1h-2l-1-1v-2l1-1zM10.5 10.5h2l1 1v2l-1 1h-2l-1-1v-2l1-1zM6.5 6.5l-2 4M8.5 6.5l2 4M6.5 12.5h2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/>",
  // Terraform/HCL: infrastructure code -> chip TF (purple)
  "terraform":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{purple}}\" fill-opacity=\".2\"/><path d=\"M3.5 4.5H7.5M5.5 4.5V10.5M13.5 4.5H9.5V10.5M9.5 7.5H12.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{purple}}\"/>",
};
