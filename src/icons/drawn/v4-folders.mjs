// Serena Icons — v4 FOLDER batch ("v4-folders"), MINIMAL edition.
//
// Deliverable: folders = { "<concept id from mapping.json>": { token, badge } }.
// Plain strings, no imports. The closed/open silhouettes come from system/folder.mjs
// (folderIcon(spec, open)); only the colour token and the 7×7 badge (pixels x 9..15,
// y 9..15) are authored here. Authored with the glyphs.mjs helpers and inlined.
//
// Design rules applied (style.md §10 + the existing 55 folders in drawn/folders.mjs):
//   * special folder = colour + badge; the badge is drawn in the folder's own token
//     (exceptions: the quiet muted folders below, and .cursor = grey folder + fg pointer).
//   * GENERATED OUTPUT / TOOL STATE stays QUIET, like node_modules/vendor/venv: a muted
//     folder whose badge colour names the tool (.angular red, .next fg, .nuxt sage,
//     .svelte-kit orange, .vercel fg, .wrangler peach, .yarn blue). The mapping
//     suggested brand-coloured folders for these; muted keeps gitignored build state
//     from competing with source folders at the repo root (style.md §9).
//   * every badge silhouette differs from the 55 existing badges; where a suggestion
//     collided with an existing one it was redrawn:
//       windows  — vscode already owns "window + title bar" → a sash window with a sill
//       husky    — hooks already owns the hook → a paw print
//       supabase — database owns the outline cylinder → two stacked solid disks
//       netlify  — public owns the globe → an up-arrow inside the ring (deploy)
//       claude   — ai owns the solid sparkle → a 4-point star outline
//       gemini   — twin stars read like ai's sparkle pair → the Gemini (twins) sign
//       cypress  — .cursor owns the bare pointer → the pointer inside a browser window
//                  (playwright's window build), echoing the cypress.config file icon
//       helm     — package box is taken → an anchor (nautical, not the ship's wheel)
//       gitlab   — .github owns the vertical fork → a sideways merge into one node
//       angular / nuxt / svelte — clock and output tray are taken → hourglass, N, SK
//       yarn     — a ring would read like the cache clock → a solid striped ball
//       generated — gear is services' → a magic wand with loose sparkles (not a wrench)
//   * colours: chosen so folders that usually sit side by side differ (Laravel app/,
//     API/React src/, Nuxt root, Flutter root, infra, Go root, ML root, Unity Assets,
//     Next.js root were checked in mock explorers). Deviations from the mapping:
//     windows cyan (lib/.vscode are blue in a Flutter root), notebooks peach (models is
//     orange in ML repos), constants peach (Serena's constant colour; hooks is rose),
//     firebase yellow (functions is orange next to it; also keeps the shield apart
//     from the orange assets gem), jobs lavender / emails pink / validators sage
//     (Laravel app/ and API src/ siblings), plugins sand (components is lavender in
//     Vue/Nuxt), content yellow (data is sand in Hugo), proto sand (scripts is sage
//     in gRPC repos), shaders purple (media is pink in game assets). Review fixes
//     (2026-10-01): a folder echoes its file icon — gemini blue (GEMINI.md), cypress
//     teal (cypress.config); .cursor is a grey folder with the fg pointer (a solid fg
//     folder out-shouted src/).
//   * no brand logos or near-copies (style.md §12): letters come from the Serena
//     stroke font; symbols are generic (phone, laptop, window, shield, pointer, anchor …).
//   * badges are 1px round-capped strokes on pixel centres or integer fills; 45° or 1:2
//     diagonals (the bolt and the pointer are filled shapes); checked at 1x on
//     #16171d / #ecedf3.

export const folders = {

  // ── platform folders (Flutter / React Native / KMP / Tauri roots) ───────────────────────
  // phone with a dimmed screen (no robot head)
  android: {
    token: "green",
    badge: '<path d="M10.5 9.5h4v6h-4v-6z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{green}}"/><path d="M11 10h3v3h-3z" fill="{{green}}" fill-opacity=".5"/>',
  },
  // ios / macos / watchos …: a laptop (screen + wide base); no Apple logo
  apple: {
    token: "grey",
    badge: '<path d="M10.5 9.5h4v4h-4v-4zM9.5 15.5h6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{grey}}"/>',
  },
  // sash window with a sill — two lites, never four panes (logo); cyan ≠ lib/.vscode blue
  windows: {
    token: "cyan",
    badge: '<path d="M9.5 15.5h6M10.5 15.5v-6h4v6M10.5 12.5h4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{cyan}}"/>',
  },
  // '$' shell prompt; no penguin
  linux: {
    token: "yellow",
    badge: '<path d="M14.5 10.5H11.5L10.5 11.5L11.5 12.5H13.5L14.5 13.5L13.5 14.5H10.5M12.5 9.5V15.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{yellow}}"/>',
  },
  // src-tauri: solid desktop monitor (client/ owns the outline monitor)
  tauri: {
    token: "sand",
    badge: '<path d="M9 9h7v5H9z" fill="{{sand}}"/><path d="M12.5 14.5v1M10.5 15.5h4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{sand}}"/>',
  },

  // ── repo tooling ────────────────────────────────────────────────────────────────────────
  // .husky: a paw print (the hook glyph belongs to hooks/)
  husky: {
    token: "rose",
    badge: '<path d="M11 9h1v2h-1zM13 9h1v2h-1zM9 11h1v2H9zM15 11h1v2h-1z" fill="{{rose}}"/><path d="M11 13h3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z" fill="{{rose}}"/>',
  },
  // bookmark ribbon (the stories role mark); no bookmarked 'S'
  storybook: {
    token: "pink",
    badge: '<path d="M10.5 9.5h4v6l-2-2-2 2v-6z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{pink}}"/>',
  },
  // 'P' in the stroke font (schema DSL); no prism triangle
  prisma: {
    token: "teal",
    badge: '<path d="M10.5 15.5V9.5H13.5L14.5 10.5V11.5L13.5 12.5H10.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{teal}}"/>',
  },
  // two stacked solid disks = hosted database; the outline cylinder is database/
  supabase: {
    token: "green",
    badge: '<path d="M10 9h5l1 1v1l-1 1h-5l-1-1v-1zM9 13l1 1h5l1-1v2l-1 1h-5l-1-1z" fill="{{green}}"/>',
  },
  // half-filled shield (security rules), as the firebase.json file icon; no flame
  firebase: {
    token: "yellow",
    badge: '<path d="M9.5 9.5h6v3l-3 3-3-3v-3z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{yellow}}"/><path d="M10 10h2v5l-2-2z" fill="{{yellow}}"/>',
  },
  // netlify / .netlify (functions + state): teal up-arrow in a ring (deploy); no diamond
  netlify: {
    token: "teal",
    badge: '<path d="M11.5 9.5h2l2 2v2l-2 2h-2l-2-2v-2l2-2zM12.5 14.5v-3M11.5 12.5l1-1 1 1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{teal}}"/>',
  },
  // teal browser window + 3×3 ↖ pointer = the cypress.config file icon in small (same build as
  // playwright/: solid title band + 1px frame + pixel mark). .cursor owns the BARE solid
  // pointer; here it sits inside a frame. No 'cy' roundel
  cypress: {
    token: "teal",
    badge: '<path d="M9.5 10.5h6v5h-6v-5z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{teal}}"/><path d="M9 9h7v2H9z" fill="{{teal}}"/><path d="M11 12h3v1h-3zM11 13h2v1h-2zM11 14h1v1h-1zM13 14h1v1h-1z" fill="{{teal}}"/>',
  },
  // browser window with a check (e2e run); no masks. Sage: teal would sit next to prisma/ at a sorted root
  playwright: {
    token: "sage",
    badge: '<path d="M9.5 10.5h6v5h-6v-5z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{sage}}"/><path d="M9 9h7v2H9z" fill="{{sage}}"/><path d="M11 13h1v1h-1zM12 14h1v1h-1zM13 13h1v1h-1zM14 12h1v1h-1z" fill="{{sage}}"/>',
  },

  // ── infrastructure ──────────────────────────────────────────────────────────────────────
  // 'TF' small caps; no parallelograms
  terraform: {
    token: "purple",
    badge: '<path d="M9.5 10.5H11.5M10.5 10.5V14.5M15.5 10.5H13.5V14.5M13.5 12.5H14.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{purple}}"/>',
  },
  // letter + lines: 'A' + two task lines + list line; no roundel
  ansible: {
    token: "red",
    badge: '<path d="M9.5 13.5V10.5L10.5 9.5L11.5 10.5V13.5M9.5 11.5H11.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{red}}"/><path d="M13.5 10.5h2M13.5 12.5h2M9.5 15.5h6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{red}}"/>',
  },
  // helm / charts: an anchor (nautical), not the ship's wheel
  helm: {
    token: "blue",
    badge: '<path d="M12.5 9.5l1 1-1 1-1-1 1-1zM10.5 11.5h4M12.5 11.5v4M9.5 13.5l2 2h2l2-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{blue}}"/>',
  },
  // k8s cluster: three linked nodes; no 7-spoke wheel
  kubernetes: {
    token: "cyan",
    badge: '<path d="M11.5 11.5l-1 2M13.5 11.5l1 2M11.5 14.5h2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{cyan}}"/><path d="M11.75 9h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z" fill="{{cyan}}"/><path d="M9.75 13h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z" fill="{{cyan}}"/><path d="M13.75 13h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z" fill="{{cyan}}"/>',
  },

  // ── CI, AI and editor dot-folders ───────────────────────────────────────────────────────
  // loop arrow (the pipeline runs on every push); no ringed dot
  circleci: {
    token: "grey",
    badge: '<path d="M12.5 9.5h-1l-2 2v2l2 2h2l2-2v-1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{grey}}"/><path d="M16 9v3h-3z" fill="{{grey}}"/>',
  },
  // sideways merge: two branches joining one node (.github owns the vertical fork)
  gitlab: {
    token: "orange",
    badge: '<path d="M9 9h2v2H9zM9 14h2v2H9z" fill="{{orange}}"/><path d="M10.5 10.5l2 2M10.5 14.5l2-2M12.5 12.5h1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{orange}}"/><path d="M13.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z" fill="{{orange}}"/>',
  },
  // 4-point star outline (ai/ owns the solid sparkle); not the Claude starburst
  claude: {
    token: "rust",
    badge: '<path d="M12.5 9.5v1M12.5 14.5v1M9.5 12.5h1M14.5 12.5h1M12.5 10.5l2 2-2 2-2-2 2-2z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{rust}}"/>',
  },
  // mouse pointer badge in fg (the brand is black/white, as the .cursorrules file icon) on a
  // quiet grey folder (like .circleci / apple): a solid fg folder was the loudest object in
  // the tree. No cube
  cursor: {
    token: "grey",
    badge: '<path d="M9 9v6l1.5-1.5 1.25 2.5 1-.5-1.25-2.5H14z" fill="{{fg}}"/>',
  },
  // the Gemini (twins) sign ♊ in blue = the GEMINI.md file colour, so folder and file link up
  // (in real roots .github/.husky/.idea usually sort between .gemini and a blue .vscode)
  gemini: {
    token: "blue",
    badge: '<path d="M9.5 9.5l1 1h4l1-1M9.5 15.5l1-1h4l1 1M11.5 10.5v4M13.5 10.5v4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{blue}}"/>',
  },

  // ── generated framework output / tool state: quiet muted folder, tool colour on the badge ───
  // .angular (CLI cache): red hourglass
  angular: {
    token: "muted",
    badge: '<path d="M9.5 9.5h6M9.5 15.5h6M10.5 10.5l4 4M14.5 10.5l-4 4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{red}}"/><path d="M11 13h3v1h1v1h-5v-1h1z" fill="{{red}}"/>',
  },
  // .next: '>>' chevrons in fg; no 'N' roundel
  next: {
    token: "muted",
    badge: '<path d="M9.5 9.5l3 3-3 3M12.5 9.5l3 3-3 3" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{fg}}"/>',
  },
  // .nuxt: sage 'N'; no mountain peaks
  nuxt: {
    token: "muted",
    badge: '<path d="M10.5 15.5V9.5M10.5 10.5L14.5 14.5M14.5 9.5V15.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{sage}}"/>',
  },
  // .svelte-kit: orange 'SK' small caps; no S-ribbon
  svelte: {
    token: "muted",
    badge: '<path d="M11.5 10.5H10.5L9.5 11.5L11.5 13.5L10.5 14.5H9.5M13.5 10.5V14.5M15.5 10.5L13.5 12.5L15.5 14.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{orange}}"/>',
  },
  // .vercel: fg upload tray (deploy); no triangle
  vercel: {
    token: "muted",
    badge: '<path d="M12.5 13.5v-4M10.5 11.5l2-2 2 2M9.5 13.5v2h6v-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{fg}}"/>',
  },
  // .wrangler: peach cloud outline (infra/ owns the solid cloud)
  cloudflare: {
    token: "muted",
    badge: '<path d="M10.5 14.5h4l1-1v-1l-1-1-1-1h-1l-1 1h-1l-1 1v1l1 1z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{peach}}"/>',
  },
  // .yarn (releases, cache, plugins): a solid blue ball of yarn on a quiet folder, like node_modules
  yarn: {
    token: "muted",
    badge: '<path d="M11 9h3l2 2v3l-2 2h-3l-2-2v-3zM9 13l4-4h1l-5 5zM11 16l5-5v1l-4 4z" fill="{{blue}}" fill-rule="evenodd"/>',
  },

  // ── source structure & project folders ──────────────────────────────────────────────────
  // ring-bound notebook; peach, because models/ is orange in ML repos
  notebooks: {
    token: "peach",
    badge: '<path d="M10.5 9.5h5v6h-5v-6zM9.5 10.5h2M9.5 12.5h2M9.5 14.5h2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{peach}}"/>',
  },
  // puzzle piece; sand, because components/ is lavender in Vue/Nuxt
  plugins: {
    token: "sand",
    badge: '<path d="M9 11h5v5H9z" fill="{{sand}}"/><path d="M10.75 9h1.5a.75 .75 0 0 1 .75 .75V11h-3V9.75a.75 .75 0 0 1 .75-.75zM14 12h1.25a.75 .75 0 0 1 .75 .75v1.5a.75 .75 0 0 1-.75 .75H14z" fill="{{sand}}"/>',
  },
  // checkbox with the tick escaping the box
  validators: {
    token: "sage",
    badge: '<path d="M11.5 11.5h-2v4h4v-2M10.5 12.5l1 1 4-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{sage}}"/>',
  },
  // events / listeners / subscribers: lightning bolt
  events: {
    token: "yellow",
    badge: '<path d="M13 9h3l-3 3h3l-5 4 1.5-3H10z" fill="{{yellow}}"/>',
  },
  // jobs / queues / workers / cron: a queue (three items) with a play head
  jobs: {
    token: "lavender",
    badge: '<path d="M9.5 10.5h2M9.5 12.5h2M9.5 14.5h2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{lavender}}"/><path d="M13 10v6l3-3z" fill="{{lavender}}"/>',
  },
  // benchmarks / bench / perf: speedometer gauge
  benchmarks: {
    token: "green",
    badge: '<path d="M9.5 14.5v-3l2-2h2l2 2v3M12.5 13.5l1-1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{green}}"/><path d="M12 13h1v1h-1z" fill="{{green}}"/>',
  },
  // design / figma / mockups: a vector path with two anchor points
  design: {
    token: "pink",
    badge: '<path d="M10.5 13.5v-1l2-2h1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{pink}}"/><path d="M9 14h2v2H9zM14 9h2v2h-2z" fill="{{pink}}"/>',
  },
  // a person (head + shoulders)
  auth: {
    token: "purple",
    badge: '<path d="M11.75 9h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z" fill="{{purple}}"/><path d="M9.5 15.5v-1l1-1h4l1 1v1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{purple}}"/>',
  },
  // '#' in peach, Serena's constant colour
  constants: {
    token: "peach",
    badge: '<path d="M11.5 10.5V14.5M13.5 10.5V14.5M10.5 11.5H14.5M10.5 13.5H14.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{peach}}"/>',
  },
  // errors / exceptions: warning triangle with a knocked-out '!'
  errors: {
    token: "red",
    badge: '<path d="M12.5 9L16 16H9zM12 11v2h1v-2zM12 14v1h1v-1z" fill="{{red}}" fill-rule="evenodd"/>',
  },
  // emails / mail / mailers: '@'
  emails: {
    token: "pink",
    badge: '<path d="M14.5 14.5V10.5L13.5 9.5H11.5L10.5 10.5V14.5L11.5 15.5H13.5M14.5 13.5H12.5V11.5H14.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{pink}}"/>',
  },
  // content / posts / blog: a pencil (yellow, the colour of a pencil)
  content: {
    token: "yellow",
    badge: '<path d="M10.5 12.5l3-3 2 2-3 3h-2v-2zM12.5 10.5l2 2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{yellow}}"/>',
  },
  // proto / grpc: message envelope (as the proto file icon); sand = types/IDL
  proto: {
    token: "sand",
    badge: '<path d="M9.5 10.5h6v5h-6v-5zM9.5 10.5l3 3 3-3" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{sand}}"/>',
  },
  // a half-lit disc (shading)
  shaders: {
    token: "purple",
    badge: '<path d="M11.5 9.5h2l2 2v2l-2 2h-2l-2-2v-2l2-2z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{purple}}"/><path d="M13 10h1l1 1v3l-1 1h-1z" fill="{{purple}}"/>',
  },
  // archive / backups: a box with a zipper strip (as the archive file icon)
  archive: {
    token: "brown",
    badge: '<path d="M9.5 9.5h6v6h-6v-6z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{brown}}"/><path d="M11 10h2v1h-2zM12 11h2v1h-2zM11 12h2v1h-2zM12 13h2v1h-2z" fill="{{brown}}"/>',
  },
  // serverless functions: λ
  functions: {
    token: "orange",
    badge: '<path d="M9.5 10.5h1l5 5M12.5 12.5l-3 3" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{orange}}"/>',
  },
  // generated / codegen: a magic wand with sparkles, all muted (generated = quiet)
  generated: {
    token: "muted",
    badge: '<path d="M9.5 15.5l3-3M14.5 9.5v2M13.5 10.5h2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="{{muted}}"/><path d="M10 10h1v1h-1zM15 13h1v1h-1z" fill="{{muted}}"/>',
  },
};
