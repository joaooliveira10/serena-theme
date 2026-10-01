// Serena Icons — folder shapes.
//
// Folders are SOLID silhouettes in one token (the only large filled shapes in the set,
// so the tree reads as structure first, files second).
//
//   closed : tab (x 1..6, y 2..4, 45° shoulder to x 8) + body (x 1..15, y 4..14), r = 1
//   open   : back plate at 50% opacity + front flap (full) whose sides lean on a 1:2
//            slope (clean, regular anti-aliasing at 1x).
//
// Special folders = colour (token) + optional BADGE drawn in the 7×7 badge slot at the
// bottom-right. When a badge is present the folder silhouette gets a NOTCH — the slot
// plus a 1px knock-out ring (x ≥ 8, y ≥ 8) is removed from the shape — so the badge
// sits on the sidebar background and reads at 1x without masks or outlines.
//
//   BADGE_SLOT   = pixels x 9..15, y 9..15   (coordinates 9 → 16)
//   knock-out    = x ≥ 8, y ≥ 8
//   badge ink    = 1px round-capped strokes on pixel centres (9.5 … 15.5), or fills on
//                  integers; 1–2 tokens (usually the folder token itself).
//
// Deliverable format for a folder batch (see style.md):
//   export const folders = { "<id>": { token: "<token>", badge: "<badge markup or ''>" } }
// Build/preview code turns that into closed/open SVGs with folderIcon(spec, open).

export const FOLDER_DEFAULT_TOKEN = "muted";
export const BADGE_SLOT = { x: 9, y: 9, w: 7, h: 7 };
export const KNOCKOUT = { x: 8, y: 8 };

const tk = (t) => `{{${t}}}`;

const CLOSED = "M1 3a1 1 0 0 1 1-1h4l2 2h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z";
const CLOSED_NOTCH = "M1 3a1 1 0 0 1 1-1h4l2 2h6a1 1 0 0 1 1 1v3H8v6H2a1 1 0 0 1-1-1z";
// back plate: tab + top band + the wedge left of the flap (never reaches the badge
// slot, so the same path serves notched folders)
const BACK = "M1 3a1 1 0 0 1 1-1h4l2 2h5a1 1 0 0 1 1 1v3H4l-3 6z";
// front flap: top edge y=8 (x 4..16), bottom y=14 (x 1..13), sides slope 1:2
const FLAP = "M4 8h12l-3 6H1z";
const FLAP_NOTCH = "M4 8h4v6H1z";

/** Closed folder silhouette. `notch` removes the badge slot + knock-out ring. */
export function folderClosed(token = FOLDER_DEFAULT_TOKEN, { notch = false } = {}) {
  return `<path d="${notch ? CLOSED_NOTCH : CLOSED}" fill="${tk(token)}"/>`;
}

/** Open folder: back plate at .5 opacity + solid front flap. */
export function folderOpen(token = FOLDER_DEFAULT_TOKEN, { notch = false } = {}) {
  return (
    `<path d="${BACK}" fill="${tk(token)}" fill-opacity=".5"/>` +
    `<path d="${notch ? FLAP_NOTCH : FLAP}" fill="${tk(token)}"/>`
  );
}

/** Wraps badge markup; returns it unchanged (badges are authored in absolute 16×16
 *  coordinates inside BADGE_SLOT). Kept as a function so call sites read clearly. */
export function badge(markup) {
  return markup || "";
}

/** Full folder icon markup from a { token, badge } spec (what build + render use). */
export function folderIcon(spec = {}, open = false) {
  const token = spec.token ?? FOLDER_DEFAULT_TOKEN;
  const notch = !!spec.badge;
  return (open ? folderOpen(token, { notch }) : folderClosed(token, { notch })) + badge(spec.badge);
}

// ---------------------------------------------------------------------------
// Ready-made badge glyphs (7×7 slot, 1px strokes on pixel centres). Drawers may use
// these directly or author their own inside BADGE_SLOT.
// ---------------------------------------------------------------------------
const S = (d, t) => `<path d="${d}" fill="none" stroke="${tk(t)}" stroke-linecap="round" stroke-linejoin="round"/>`;
const Fi = (d, t) => `<path d="${d}" fill="${tk(t)}"/>`;

export const BADGES = {
  /** </> chevrons — source code */
  code: (t) => S("M11.5 10.5l-2 2 2 2M13.5 10.5l2 2-2 2", t),
  /** check — tests */
  check: (t) => S("M9.5 12.5l2 2 4-4", t),
  /** three text lines — docs */
  lines: (t) => S("M9.5 10.5h6M9.5 12.5h6M9.5 14.5h4", t),
  /** sliders — config / settings */
  sliders: (t) => S("M9.5 10.5h6M9.5 14.5h6", t) + Fi("M11 9h2v3h-2zM13 13h2v3h-2z", t),
  /** down arrow into tray — build output / dist */
  output: (t) => S("M12.5 9.5v4M10.5 11.5l2 2 2-2M9.5 15.5h6", t),
  /** image frame — assets / images */
  image: (t) => S("M9.5 10.5h6v5h-6v-5zM10.5 14.5l2-2 2 2", t),
  /** prompt >_ — scripts / bin */
  prompt: (t) => S("M9.5 10.5l2 2-2 2M12.5 15.5h3", t),
  /** package box — modules / vendor */
  box: (t) => S("M9.5 10.5h6v5h-6v-5zM9.5 12.5h6M11.5 10.5v2", t),
  /** globe-ish grid — public / web / i18n */
  globe: (t) => S("M9.5 12.5a3 3 0 1 0 6 0a3 3 0 1 0-6 0M9.5 12.5h6M12.5 9.5v6", t),
  /** key — secrets / auth / certs */
  key: (t) => S("M9.5 10.5h3v3h-3v-3zM12.5 12.5h3M14.5 12.5v2", t),
  /** branch — .git / .github / workflows / ci */
  branch: (t) => S("M10.5 9.5v6M10.5 13.5l3-3", t) + Fi("M14 9h2v2h-2z", t),
  /** database cylinder — db / migrations / data / sql */
  database: (t) => S("M10.5 9.5h4l1 1v4l-1 1h-4l-1-1v-4l1-1zM9.5 11.5h6", t),
};
