// Serena Icons — FOLDER batch ("folders").
//
// Deliverable: folders = { "<concept id from mapping.json>": { token, badge } }.
// The closed/open silhouettes come from system/folder.mjs (folderIcon(spec, open));
// only the colour token and the 7×7 badge (pixels x 9..15, y 9..15) are authored here.
//
// Design rules applied (style.md §10):
//   * special folder = colour + badge; the badge is drawn in the folder's own token.
//   * default / unknown folder = solid `muted`, no badge.
//   * dependency stores (node_modules, vendor, .venv) are QUIET: a `muted` folder with a
//     package box whose colour names the ecosystem (Node green, vendor brown, Python blue)
//     — the one deliberate accent in the batch.
//   * badges are 1px round-capped strokes on pixel centres or integer fills, so they are
//     crisp at 1x and soften at 2x; every glyph was checked at 1x on #16171d and #ecedf3.
//   * colours were assigned so that folders that usually sit side by side (Vue/React src,
//     a .NET project, a Go root, a JS/Python repo root …) differ in colour wherever the
//     palette allows; where two siblings share a token their badges have different
//     silhouettes (e.g. utils wrench vs config sliders, api plug vs i18n bubble).
import { stroke as S, fill as F, dot, monogram } from "../system/glyphs.mjs";
import { BADGES } from "../system/folder.mjs";

const spec = (token, badge = "") => ({ token, badge });

// ── custom badges (7×7 slot) ─────────────────────────────────────────────────────
const G = {
  // lib: a small institution/library building (pediment, three columns, base)
  building: (t) => S("M10.5 11.5l2-2 2 2M9.5 11.5h6M10.5 12.5v2M12.5 12.5v2M14.5 12.5v2M9.5 15.5h6", t),
  // app: 2×2 app-launcher tiles
  tiles: (t) => dot(9, 9, t) + dot(13, 9, t) + dot(9, 13, t) + dot(13, 13, t),
  // client: monitor on a stand
  monitor: (t) => S("M9.5 9.5h6v4h-6v-4zM12.5 13.5v2M10.5 15.5h4", t),
  // server: two rack units with status lights
  rack: (t) => S("M9.5 9.5h6v2h-6v-2zM9.5 13.5h6v2h-6v-2z", t) + F("M13 10h1v1h-1zM13 14h1v1h-1z", t),
  // components: three building blocks
  blocks: (t) => S("M11.5 9.5h2v2h-2v-2zM9.5 13.5h2v2h-2v-2zM13.5 13.5h2v2h-2v-2z", t),
  // pages: two overlapping sheets
  sheets: (t) => S("M9.5 11.5h4v4h-4v-4zM11.5 10.5v-1h4v4h-1", t),
  // views: an eye
  eye: (t) => S("M9.5 12.5l2-2h2l2 2-2 2h-2l-2-2z", t) + F("M12 12h1v1h-1z", t),
  // routes: signpost pointing the way
  signpost: (t) => S("M12.5 9.5v1M9.5 10.5h5l1 1-1 1h-5v-2zM12.5 12.5v3", t),
  // api: plug (a connection point)
  plug: (t) => S("M11.5 9.5v1M13.5 9.5v1M10.5 11.5h4v1l-1 1h-2l-1-1v-1zM12.5 13.5v2", t),
  // controllers: joystick on its base
  joystick: (t) => dot(11, 9, t) + S("M12.5 11.5v1M9.5 13.5h6v2h-6v-2z", t),
  // services: 8-tooth cog
  gear: (t) => S("M11.5 9.5v1M13.5 9.5v1M11.5 14.5v1M13.5 14.5v1M9.5 11.5h1M9.5 13.5h1M14.5 11.5h1M14.5 13.5h1M10.5 10.5h4v4h-4v-4z", t),
  // middleware: filter funnel
  funnel: (t) => F("M9 9h7l-3 3v4l-1-1v-3z", t),
  // models: a solid 3D block (front face full, top/side at .5)
  block3d: (t) => F("M9 11h5v5H9z", t) + F("M9 11l2-2h5v5l-2 2v-5z", t, { opacity: ".5" }),
  // types: a T
  tee: (t) => S("M9.5 9.5h6M12.5 9.5v6", t),
  // utils: open-jaw wrench
  wrench: (t) => S("M13.5 9.5l-1 1v1l1 1h1l1-1M12.5 12.5l-3 3M12.5 13.5l-2 2", t),
  // hooks: hook with an eye
  hook: (t) => S("M12.5 9.5h2v2h-2v-2zM13.5 11.5v2l-2 2-2-2v-1", t),
  // store / state: shopping bag
  bag: (t) => S("M9.5 11.5h6v4h-6v-4zM11.5 11.5v-2h2v2", t),
  // mocks / fixtures / fakes: a little ghost (a stand-in)
  ghost: (t) => S("M9.5 15.5v-4l2-2h2l2 2v4l-1-1-1 1-1-1-1 1-1-1-1 1", t) + F("M11 11h1v1h-1zM13 11h1v1h-1z", t),
  // coverage: per-cent sign
  percent: (t) => S("M9.5 15.5l6-6", t) + F("M9 9h2v2H9zM14 14h2v2h-2z", t),
  // docs: open book
  book: (t) => S("M12.5 11.5l-1-1h-2v4h2l1 1 1-1h2v-4h-2l-1 1v3", t),
  // examples / samples / playground: light bulb
  bulb: (t) => S("M11.5 9.5h2l1 1v1l-1 1v1h-2v-1l-1-1v-1l1-1zM11.5 15.5h2", t),
  // assets: cut gem
  gem: (t) => S("M10.5 10.5h4l1 1-3 4-3-4 1-1zM9.5 11.5h6", t),
  // fonts: capital A
  letterA: (t) => monogram("A", { x: 12.5, y: 12.5, token: t }),
  // media: music note
  note: (t) => S("M12.5 13.5v-4l2 1", t) + dot(10, 13, t),
  // styles: paint drop
  drop: (t) => F("M12.5 9l2.5 3v1.5a2.5 2.5 0 0 1-5 0V12z", t),
  // templates / layouts: page layout (header + sidebar)
  layout: (t) => S("M9.5 9.5h6v6h-6v-6zM9.5 11.5h6M11.5 11.5v4", t),
  // i18n / locales: speech bubble
  bubble: (t) => S("M10.5 9.5h4l1 1v2l-1 1h-3l-2 2v-5l1-1z", t) + F("M11 11h1v1h-1zM13 11h1v1h-1z", t),
  // public / static / wwwroot: globe (crisp octagon ring + equator + meridian)
  globe: (t) => S("M11.5 9.5h2l2 2v2l-2 2h-2l-2-2v-2l2-2zM9.5 12.5h6M12.5 9.5v6", t),
  // packages & dependency stores: box with slanted lid and handle slot (as the manifest file icon)
  box: (t) => S("M9.5 11.5h6v4h-6v-4zM10.5 9.5h4l1 2M10.5 9.5l-1 2M11.5 13.5h2", t),
  // docker / containers: ribbed shipping container (generic, not a brand mark)
  container: (t) => S("M9.5 10.5h6v4h-6v-4zM11.5 10.5v4M13.5 10.5v4", t),
  // infra / deploy: cloud
  cloud: (t) => F("M11 16h3.5a1.5 1.5 0 0 0 .4-2.95A2.5 2.5 0 0 0 10.1 12.6 1.75 1.75 0 0 0 11 16z", t),
  // ci / pipelines / workflows: two stages linked by a connector
  pipeline: (t) => S("M9.5 9.5h2v2h-2v-2zM13.5 13.5h2v2h-2v-2zM11.5 10.5h3v3", t),
  // .github: fork (two heads merging into one line) — no hosting-service logo
  fork: (t) => S("M10.5 10.5l2 2 2-2M12.5 12.5v2", t) + F("M9 9h2v2H9zM14 9h2v2h-2zM12 14h1v2h-1z", t),
  // .vscode: editor window with a title bar (no editor logo)
  window: (t) => S("M9.5 10.5h6v5h-6v-5z", t) + F("M9 10h7v2H9z", t),
  // .idea / .vs / .fleet: window with a side panel
  panes: (t) => S("M9.5 10.5h6v5h-6v-5zM11.5 10.5v5", t),
  // ai / prompts: sparkle + small twinkle
  sparkle: (t) => S("M11.5 11.5v4M9.5 13.5h4M14.5 9.5v2M13.5 10.5h2", t) + F("M10 12h3v3h-3z", t),
  // cache / tmp: clock
  clock: (t) => S("M11.5 9.5h2l2 2v2l-2 2h-2l-2-2v-2l2-2zM12.5 11.5v1h1", t),
  // logs: dotted list
  log: (t) => S("M11.5 10.5h4M11.5 12.5h4M11.5 14.5h3", t) + F("M9 10h1v1H9zM9 12h1v1H9zM9 14h1v1H9z", t),
  // resources: stacked cards
  cards: (t) => S("M11.5 9.5h2M10.5 11.5h4M9.5 13.5h6v2h-6v-2z", t),
  // Go cmd/: run (entry points)
  run: (t) => F("M10 9.5v6l5-3z", t),
  // Go internal/: padlock with keyhole (private packages)
  lock: (t) => S("M11.5 12v-1.5l1-1 1 1V12", t) + F("M10 12h5v4h-5zM12 13v1h1v-1z", t, { evenodd: true }),
};

export const folders = {
  // ── neutral ────────────────────────────────────────────────────────────────────
  // `folder` is also the theme default: the builder points folder / folderExpanded /
  // rootFolder / rootFolderExpanded at this concept (closed + open). No `default` alias.
  folder: spec("muted"), //                                   exemplar (verbatim)

  // ── source structure ───────────────────────────────────────────────────────────
  src: spec("blue", BADGES.code("blue")), //                  exemplar (verbatim)
  lib: spec("blue", G.building("blue")),
  app: spec("purple", G.tiles("purple")),
  client: spec("lavender", G.monitor("lavender")), //       lavender = UI/front-end (keeps it apart from blue .vscode)
  server: spec("teal", G.rack("teal")),
  packages: spec("green", G.box("green")), //                 green = MANIFEST colour (as package.json); sand stays with database

  // ── inside src: UI ─────────────────────────────────────────────────────────────
  components: spec("lavender", G.blocks("lavender")),
  pages: spec("peach", G.sheets("peach")),
  views: spec("peach", G.eye("peach")),
  templates: spec("rust", G.layout("rust")),
  hooks: spec("rose", G.hook("rose")),
  store: spec("purple", G.bag("purple")),
  styles: spec("pink", G.drop("pink")),

  // ── inside src: backend / architecture ─────────────────────────────────────────
  routes: spec("yellow", G.signpost("yellow")),
  api: spec("cyan", G.plug("cyan")),
  controllers: spec("rust", G.joystick("rust")),
  services: spec("teal", G.gear("teal")),
  middleware: spec("rose", G.funnel("rose")),
  models: spec("orange", G.block3d("orange")),
  types: spec("sand", G.tee("sand")), //                      sand = Serena's type colour (as .d.ts letters)
  utils: spec("grey", G.wrench("grey")),
  database: spec("sand", BADGES.database("sand")),
  config: spec("grey", BADGES.sliders("grey")),
  properties: spec("purple", BADGES.sliders("purple")), //    .NET Properties: settings in the .NET colour
  resources: spec("lavender", G.cards("lavender")),
  i18n: spec("cyan", G.bubble("cyan")),

  // ── tests ──────────────────────────────────────────────────────────────────────
  test: spec("green", BADGES.check("green")), //              exemplar (verbatim)
  mocks: spec("sage", G.ghost("sage")),
  coverage: spec("sage", G.percent("sage")),

  // ── docs, examples, media ──────────────────────────────────────────────────────
  docs: spec("teal", G.book("teal")),
  examples: spec("yellow", G.bulb("yellow")),
  assets: spec("orange", G.gem("orange")),
  images: spec("teal", BADGES.image("teal")),
  fonts: spec("rose", G.letterA("rose")),
  media: spec("pink", G.note("pink")),
  public: spec("green", G.globe("green")),

  // ── build, tooling, dependencies ───────────────────────────────────────────────
  dist: spec("brown", BADGES.output("brown")),
  scripts: spec("sage", BADGES.prompt("sage")),
  node_modules: spec("muted", G.box("green")),
  vendor: spec("muted", G.box("brown")),
  venv: spec("muted", G.box("blue")),
  cache: spec("muted", G.clock("muted")),
  logs: spec("muted", G.log("muted")),

  // ── platforms & tools ──────────────────────────────────────────────────────────
  docker: spec("cyan", G.container("cyan")),
  infra: spec("purple", G.cloud("purple")),
  ci: spec("peach", G.pipeline("peach")),
  github: spec("lavender", G.fork("lavender")),
  git: spec("rust", BADGES.branch("rust")),
  vscode: spec("blue", G.window("blue")),
  ide: spec("grey", G.panes("grey")),
  ai: spec("pink", G.sparkle("pink")),
  secrets: spec("yellow", BADGES.key("yellow")),

  // ── Go layout ──────────────────────────────────────────────────────────────────
  "go-cmd": spec("cyan", G.run("cyan")),
  "go-internal": spec("cyan", G.lock("cyan")),
};
