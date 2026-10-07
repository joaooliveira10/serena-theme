// Serena Icons - LOGO edition, batch logos-b (v4): web frameworks, JS tooling, editors/CI + folder badges.
// Plain strings, no imports. Rules: logo-style.md. Hand-maintained (helpers of system/glyphs.mjs inlined): edit the strings.
// Not drawn here (stay Minimal): cypress, nx, bun, circleci (file and folder) and react-native (its mark is the React atom).
// Their owners' rules do not allow a recoloured or redrawn logo (logo-style.md, section 0).
// Licence and credit per icon: THIRD_PARTY_NOTICES.md.
// ShareAlike: `biome` derives from a CC BY-SA 4.0 logo - release that SVG under CC BY-SA 4.0.
// Folder ids `git` and `android` are drawn in exemplars.mjs and deliberately NOT re-exported here (duplicate ids are a build error).

export const icons = {
  // Angular exemplar geometry (CC BY 4.0, adaptation allowed; attribution: Google LLC) with the base notched at x>=11,y>=11 (cut at x=10 along the base's own 1:2 edge) + role mark `dot` in lavender (the UI/components token).
  "angular-component": "<path d=\"M6 2L2 4v6l4-8zM10 2l4 2v6l-4-8zM8 5l2 4H6l2-4zM5 11h5v3l-2 1-4-2 1-2z\" fill=\"{{red}}\"/><path d=\"M12.75 13h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{lavender}}\"/>",
  // Angular exemplar geometry, same notch, + role mark `plus` in peach (a directive adds behaviour to an element); different shape and colour from the component mark.
  "angular-directive": "<path d=\"M6 2L2 4v6l4-8zM10 2l4 2v6l-4-8zM8 5l2 4H6l2-4zM5 11h5v3l-2 1-4-2 1-2z\" fill=\"{{red}}\"/><path d=\"M13.5 12.5v2M12.5 13.5h2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{peach}}\"/>",
  // Nuxt mountains (MIT; attribution: NuxtLabs), current outline logo redrawn in 1px: taller left peak, smaller right peak, legs at 1:2 meeting at (9.5,10.5), the left base curving up into the right peak and a 1px gap before the right base end, as in the logo. Token sage = the Minimal nuxt config and the .nuxt badge (one colour per brand).
  "nuxt": "<path d=\"M2.5 12.5L6.5 4.5L9.5 10.5M2.5 12.5H8.5L11.5 6.5L14.5 12.5H11.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/>",
  // Svelte (simple-icons path CC0; no-endorsement conditions): brand chip for a solid logo - the two interlocking tilted links as a tint @.2 (two capsules at the logo's 1:2 tilt, one path so the overlap is not doubled) + the inner S redrawn as a 1px line with 1:2 bars and 45deg turns. Token orange = the Minimal svelte chip and the .svelte-kit badge (one colour per brand).
  "svelte": "<path d=\"M6.34 10.68L12.84 7.43A3 3 0 0 0 10.16 2.07L3.66 5.32A3 3 0 0 0 6.34 10.68zM10.66 5.32L4.16 8.57A3 3 0 0 0 6.84 13.93L13.34 10.68A3 3 0 0 0 10.66 5.32z\" fill=\"{{orange}}\" fill-opacity=\".2\"/><path d=\"M11.5 3.5L5.5 6.5L4.5 7.5V8.5L5.5 9.5L11.5 6.5L12.5 7.5V8.5L11.5 9.5L5.5 12.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{orange}}\"/>",
  // NestJS head (MIT; attribution: Kamil Myśliwiec; logo by Jakub Staron): solid silhouette shrunk to 12 px (x 0.4536 at (2.25, 2.8064), crispness search), curves flattened and simplified to 0.15 px (axis-aligned runs snapped to whole pixels) so the 6 kB path fits; rose keeps it apart from Angular red.
  "nest": "<path d=\"M9 3l-.56-.13 .28.44-.05 1.07 .07-.51 .53-.53L9 3zM10 3l-1.18 1 .01.57-1.67-.46-1.89.17-1.65 1.18-1.04.35-.33.64 .96 1.06 .02.36 .77-.32v.49l.21-.46 1.4.13 1.17.68 .8 1.09 .27 1.03-.59-.43-.46.64-.02-.57-.35.71-.68-.31-.03-.74-.74.11-.21.83 .51.8-.4.11 1.19.38 1.24-.22 1.04-.82 .53-1.24-.14 1.6-1.03 1.24 1.38-.35-1.75 1.42 2.02-.63 1.6-1.66-.76 1.81 1.31-1.33 .63-1.68 .08 1.35 .34-.53 .42-1.06 .14-1.52-.44-1.76-1.08-1.68-.23.83-.58.63-.82.33-.87-.06 1.17-.5 .61-1.17-.3-1.26L10 3z\" fill=\"{{rose}}\"/>",
  // Storybook (MIT; attribution: Storybooks): brand chip - the 12x14 tile @.2 + the 'S' redrawn in the Serena 5x7 hand + the bookmark ribbon (knocked out in the logo) in full at the top right. Token pink = the Minimal storybook icon and the .storybook folder (one colour per brand; also keeps it apart from rose Nest).
  "storybook": "<path d=\"M3.5 1h9a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1 -1.5 1.5h-9a1.5 1.5 0 0 1 -1.5 -1.5v-11a1.5 1.5 0 0 1 1.5 -1.5z\" fill=\"{{pink}}\" fill-opacity=\".2\"/><path d=\"M10.5 6.5L9.5 5.5H7.5L6.5 6.5V7.5L7.5 8.5H9.5L10.5 9.5V10.5L9.5 11.5H7.5L6.5 10.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{pink}}\"/><path d=\"M10 1h2v3l-1-1-1 1z\" fill=\"{{pink}}\"/>",
  // PostCSS alchemical mark (CC BY 4.0, postcss/brand) redrawn in 1px: circle r6 + inscribed triangle with 1:2 sides whose base corners overshoot the circle like the logo; the inner square and circle are dropped (noise at 16 px).
  "postcss": "<path d=\"M2.5 7.5a6 6 0 1 0 12 0a6 6 0 1 0 -12 0M8.5 1.5L13.5 11.5H3.5L8.5 1.5z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rust}}\"/>",
  // Babel brush 'B' (MIT; attribution: Sebastian McKenzie) redrawn italic at 1:2 over 12 rows: a 2px parallelogram stem for the brush weight + 1px bowls (upper bowl smaller, as in the logo).
  "babel": "<path d=\"M8 2h2L4 14H2z\" fill=\"{{yellow}}\"/><path d=\"M9.5 2.5H12.5L13.5 3.5V5.5L11.5 7.5H7.5M11.5 7.5L12.5 8.5V11.5L11.5 12.5H5.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{yellow}}\"/>",
  // rollup.js (MIT; attribution: the Rollup contributors) redrawn on the grid: the hook + foot solid, the left wedge as a tint @.2 (keeps a solid logo at ~24%), the diagonal cut as a 2px-wide 1:2 slit.
  "rollup": "<path d=\"M3 2H8V4L3 14z\" fill=\"{{red}}\" fill-opacity=\".2\"/><path d=\"M8 2H9C11.5 2 13 3.8 13 6C13 7 12 7.6 10.5 8L13.5 14H5L10 4H8z\" fill=\"{{red}}\"/>",
  // Yarn (CC BY 4.0; attribution: Yarn, yarnpkg/assets): brand chip - disc r7 @.2 + the sitting cat reduced to a 1px outline (ears, head, body, tail). Token blue = the Minimal yarn lock and the .yarn badge (one colour per brand).
  "yarn": "<path d=\"M1 8a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\" fill=\"{{blue}}\" fill-opacity=\".2\"/><path d=\"M6.5 7.5V3.5L7.5 4.5H8.5L9.5 3.5V6.5L10.5 7.5V11.5L9.5 12.5H5.5L4.5 11.5V9.5L6.5 7.5zM10.5 12.5H11.5L12.5 11.5V10.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // pnpm block grid (MIT; attribution: Zoltan Kochan and other contributors): 3x3 blocks of 3px with 1px gaps in the logo's pattern; the brand-orange blocks as the simple-icons hollow squares (1px hole) in full, the grey blocks solid @.5.
  "pnpm": "<path d=\"M3 2h3v3h-3v-3zM4 3h1v1h-1v-1zM7 2h3v3h-3v-3zM8 3h1v1h-1v-1zM11 2h3v3h-3v-3zM12 3h1v1h-1v-1zM11 6h3v3h-3v-3zM12 7h1v1h-1v-1z\" fill=\"{{orange}}\" fill-rule=\"evenodd\"/><path d=\"M7 6h3v3h-3v-3zM3 10h3v3h-3v-3zM7 10h3v3h-3v-3zM11 10h3v3h-3v-3z\" fill=\"{{orange}}\" fill-opacity=\".5\"/>",
  // Deno (MIT; attribution: the Deno authors): brand chip - the dark disc as a tint @.2 (r6.5) + the dinosaur (white in the logo) as a solid fill with the eye knocked out on a whole pixel.
  "deno": "<path d=\"M1.5 8a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0\" fill=\"{{fg}}\" fill-opacity=\".2\"/><path d=\"M4.55 10.9A4.5 4.5 0 0 1 8.39 3.52C10.5 3.5 12 4.5 12.5 6.5L12 7.5L9 8C8.5 9 8.2 10 8 10.5C6.5 11 5.5 11.2 4.55 10.9zM9 5h1v1H9z\" fill=\"{{fg}}\" fill-rule=\"evenodd\"/>",
  // Biome mark (CC BY-SA 4.0; attribution: Biome contributors - the derived SVG stays CC BY-SA 4.0): simple-icons path x 0.5 (12 px) at (2, 1.804): base on the integer row 13 and corners on x=2/14, offset chosen by the crispness search among integer-base fits; shape unchanged.
  "biome": "<path d=\"M8 2.61L5.33 7.24A6.04 6.04 0 0 1 8.49 7.13L9.39 7.34L8.54 10.95L7.64 10.73C6.53 10.47 5.46 11.05 5.01 11.98L4.17 11.58C4.81 10.26 6.31 9.46 7.85 9.83L8.28 8.03A5.11 5.11 0 0 0 2 13H14L8 2.61Z\" fill=\"{{blue}}\"/>",
  // Drizzle slashes (simple-icons path CC0): thickened to 1.5px-wide 1:2 parallelograms 6 rows tall in the logo's low/high/low/high rhythm, 1px gaps.
  "drizzle": "<path d=\"M1 12h1.5l3 -6h-1.5zM5 9h1.5l3 -6h-1.5zM6 12h1.5l3 -6h-1.5zM10 9h1.5l3 -6h-1.5z\" fill=\"{{sage}}\"/>",
  // Prettier (MIT; attribution: James Long): the staggered bars of the 'P' on 7 whole pixel rows (logo rows 0,1,3,5,7,9,10), segment breaks kept; single token, the multicolour is not reproduced.
  "prettier": "<path d=\"M2.5 1.5H10.5M2.5 3.5H3.5M5.5 3.5H12.5M2.5 5.5H3.5M5.5 5.5H5.5M10.5 5.5H13.5M2.5 7.5H2.5M4.5 7.5H6.5M8.5 7.5H13.5M2.5 9.5H2.5M4.5 9.5H10.5M2.5 11.5H3.5M5.5 11.5H5.5M2.5 13.5H5.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/>",
  // stylelint tuxedo (MIT; attribution: Thirouin, Clark & Hallows): two lapels as 2px 1:2 bands meeting in a V, bow tie (two 1:2 triangles + knot) and one button, as fills.
  "style-config": "<path d=\"M1 1h2l5 10v4L1 1zM15 1h-2l-5 10v4l7-14z\" fill=\"{{fg}}\"/><path d=\"M5 1L8 2.5 11 1v3L8 2.5 5 4zM7 2h2v1H7zM7 6h2v2H7z\" fill=\"{{fg}}\"/>",
  // Cursor cube (simple-icons path CC0): 12x13 hexagon with 1:2 edges; left face full, the lower right wedge @.5, the light triangle (top face + upper right face) @.2, as in the logo.
  "cursor": "<path d=\"M8 1l6 3-6 3-6-3 6-3zM14 4L8 7v7l6-10z\" fill=\"{{fg}}\" fill-opacity=\".2\"/><path d=\"M2 4l6 3v7l-6-3V4z\" fill=\"{{fg}}\"/><path d=\"M14 4v7l-6 3 6-10z\" fill=\"{{fg}}\" fill-opacity=\".5\"/>",
};

export const folders = {
  // Storybook tile 7x7 (r1) solid with a 3x5 'S' knocked out on whole pixels. MIT.
  "storybook": { token: "pink", badge: "<path d=\"M10 9h5a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-5a1 1 0 0 1 1 -1zM11 10h3v1h-3zM11 11h1v1h-1zM11 12h3v1h-3zM13 13h1v1h-1zM11 14h3v1h-3z\" fill=\"{{pink}}\" fill-rule=\"evenodd\"/>" },
  // Folder token muted = the Minimal .angular folder (generated CLI cache stays quiet; git exemplar precedent: keep the Minimal folder token); badge in brand red. Angular shield 7x7 (1:2 shoulders, 45deg base) solid with the A's triangle knocked out (pixels (12,11), (11..13,12)). CC BY 4.0.
  "angular": { token: "muted", badge: "<path d=\"M12 9h1l3 1.5V13l-3 3h-1l-3-3v-2.5L12 9zM12 11h1v1h-1zM11 12h3v1h-3z\" fill=\"{{red}}\" fill-rule=\"evenodd\"/>" },
  // Folder token muted = the Minimal .nuxt folder (build output stays quiet); badge in sage. Nuxt peaks as solid 1:2 fills filling the slot height: taller left peak (apex row 10), smaller right peak (apex row 12, clipped by the slot edge), 1px gap between them.
  "nuxt": { token: "muted", badge: "<path d=\"M9 16l3-6 1.25 2.5L11.5 16zM12.5 16l2-4 1.5 3v1z\" fill=\"{{sage}}\"/>" },
  // Folder token muted = the Minimal .svelte-kit folder (generated); badge in orange. Svelte 'S' reduced to 2px pixel runs with one 45deg diagonal.
  "svelte": { token: "muted", badge: "<path d=\"M11 9h4v1h-4zM10 10h2v1h-2zM10 11h3v1h-3zM11 12h3v1h-3zM12 13h3v1h-3zM13 14h2v1h-2zM10 15h4v1h-4z\" fill=\"{{orange}}\"/>" },
  // Folder token grey (quiet, like .circleci / the Minimal .cursor folder: a solid fg folder was the loudest object in the tree); badge in fg. Cursor hexagon (1:2 edges) solid with the light down-pointing triangle knocked out on whole pixels.
  "cursor": { token: "grey", badge: "<path d=\"M12.5 9l3.5 1.75v3.5L12.5 16 9 14.25v-3.5zM10 11h5v1h-5zM11 12h3v1h-3zM12 13h1v1h-1z\" fill=\"{{fg}}\" fill-rule=\"evenodd\"/>" },
  // Folder token muted = the Minimal .yarn folder (cache/releases, like node_modules); badge in blue. Yarn disc r3.5 solid with the cat's head (two ears + 3x2 face) knocked out on whole pixels. CC BY 4.0.
  "yarn": { token: "muted", badge: "<path d=\"M9 12.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0M11 11h1v1h-1zM13 11h1v1h-1zM11 12h3v1h-3zM11 13h3v1h-3z\" fill=\"{{blue}}\" fill-rule=\"evenodd\"/>" },
};
