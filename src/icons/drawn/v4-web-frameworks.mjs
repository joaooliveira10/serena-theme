// Serena Icons — batch "v4-web-frameworks" (45 FILE icons, MINIMAL edition).
// Original artwork only: palette token + monogram or a functional symbol, no brand marks.
// Inner SVG markup for viewBox "0 0 16 16" with {{token}} placeholders; generated from
// work/v4-web-frameworks/batch.mjs (glyphs.mjs helpers) by gen.mjs and inlined as plain
// strings, so this module has NO imports. Lint clean with render.mjs --strict.
// Families (style.md §4): component/template languages + TS/Angular file roles -> chips;
// framework/runtime configs -> sliders in the owner's token (mirrored knob layout;
// nest has its own right/far-left/far-right layout so it never matches angular);
// lockfiles -> box + lock mark; tools -> original functional symbols.
// Note: vue and typescript-service set their small-font V 5 px wide (0,0 0,2 2,4 4,2 4,0,
// like small M/W) because the 3-px small V reads as U at 2x ("UUE", "SUC").
export const icons = {
  // .vue SFCs + vue.config: chip VUE (sage); small-font V drawn 5 px wide so it never reads as U
  "vue":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{sage}}\" fill-opacity=\".2\"/><path d=\"M2.5 5.5V7.5L4.5 9.5L6.5 7.5V5.5M8.5 5.5V9.5H10.5V5.5M14.5 5.5H12.5V9.5H14.5M12.5 7.5H13.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/>",
  // nuxt.config/.nuxtrc: config sliders (sage, the Vue family colour), mirrored knobs vs java-config
  "nuxt":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\" stroke-opacity=\".5\"/><path d=\"M4.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{sage}}\"/><path d=\"M9.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{sage}}\"/><path d=\"M5.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{sage}}\"/>",
  // .svelte + svelte.config: chip SV (orange)
  "svelte":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{orange}}\" fill-opacity=\".2\"/><path d=\"M7.5 5.5L6.5 4.5H4.5L3.5 5.5V6.5L4.5 7.5H6.5L7.5 8.5V9.5L6.5 10.5H4.5L3.5 9.5M9.5 4.5V8.5L11.5 10.5L13.5 8.5V4.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{orange}}\"/>",
  // .astro + astro.config: chip AS (peach)
  "astro":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{peach}}\" fill-opacity=\".2\"/><path d=\"M3.5 10.5V5.5L4.5 4.5H6.5L7.5 5.5V10.5M3.5 7.5H7.5M13.5 5.5L12.5 4.5H10.5L9.5 5.5V6.5L10.5 7.5H12.5L13.5 8.5V9.5L12.5 10.5H10.5L9.5 9.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{peach}}\"/>",
  // angular.json/ng-package.json: config sliders (red), mirrored knobs
  "angular":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{red}}\" stroke-opacity=\".5\"/><path d=\"M4.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{red}}\"/><path d=\"M9.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{red}}\"/><path d=\"M5.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{red}}\"/>",
  // *.component.ts: role chip CMP (red)
  "angular-component":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{red}}\" fill-opacity=\".2\"/><path d=\"M4.5 5.5H3.5L2.5 6.5V8.5L3.5 9.5H4.5M6.5 9.5V5.5L8.5 7.5L10.5 5.5V9.5M12.5 9.5V5.5H13.5L14.5 6.5L13.5 7.5H12.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{red}}\"/>",
  // *.directive.ts/*.pipe.ts: role chip DIR (red)
  "angular-directive":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{red}}\" fill-opacity=\".2\"/><path d=\"M3.5 5.5H4.5L5.5 6.5V8.5L4.5 9.5H3.5V5.5ZM7.5 5.5H9.5M8.5 5.5V9.5M7.5 9.5H9.5M11.5 9.5V5.5H12.5L13.5 6.5L12.5 7.5H11.5M12.5 7.5L13.5 8.5V9.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{red}}\"/>",
  // *.service.ts: role chip SVC on the TS tile (blue); 5-px small V
  "typescript-service":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{blue}}\" fill-opacity=\".2\"/><path d=\"M4.5 5.5H3.5L2.5 6.5L4.5 8.5L3.5 9.5H2.5M6.5 5.5V7.5L8.5 9.5L10.5 7.5V5.5M14.5 5.5H13.5L12.5 6.5V8.5L13.5 9.5H14.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // *.controller.ts/*.gateway.ts: role chip CTL (blue)
  "typescript-controller":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{blue}}\" fill-opacity=\".2\"/><path d=\"M5.5 5.5H4.5L3.5 6.5V8.5L4.5 9.5H5.5M7.5 5.5H9.5M8.5 5.5V9.5M11.5 5.5V9.5H13.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // guards/interceptors/resolvers/middleware: role chip GRD (blue)
  "typescript-guard":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{blue}}\" fill-opacity=\".2\"/><path d=\"M5.5 5.5H4.5L3.5 6.5V8.5L4.5 9.5H5.5V7.5M7.5 9.5V5.5H8.5L9.5 6.5L8.5 7.5H7.5M8.5 7.5L9.5 8.5V9.5M11.5 5.5H12.5L13.5 6.5V8.5L12.5 9.5H11.5V5.5Z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // nest-cli.json: config sliders (rose), own knob layout (right/far-left/far-right) so it never matches angular.json in shape
  "nest":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\" stroke-opacity=\".5\"/><path d=\"M8.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{rose}}\"/><path d=\"M3.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{rose}}\"/><path d=\"M9.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{rose}}\"/>",
  // *.stories.* + .storybook/*: page + story lines (pink) + bookmark mark (peach, stories role)
  "storybook":
    "<path d=\"M12.5 9.5v-5l-3-3h-6v13h6M9.5 1.5v3h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{pink}}\"/><path d=\"M5.5 5.5H10.5M5.5 8.5H10.5M5.5 11.5H8.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{pink}}\"/><path d=\"M12 12h3v4h-1v-1h-1v1h-1v-4z\" fill=\"{{peach}}\"/>",
  // tailwind.config.*: sliders (cyan) with hollow square knobs (utility tokens) -> apart from tsconfig/go-config
  "tailwind":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\" stroke-opacity=\".5\"/><path d=\"M4.5 3.5h2v2h-2v-2zM9.5 7.5h2v2h-2v-2zM5.5 11.5h2v2h-2v-2z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/>",
  // postcss.config/.postcssrc: css braces around a plugin plus (rust)
  "postcss":
    "<path d=\"M5.5 2.5h-1l-1 1v3l-1 1 1 1v3l1 1h1M11.5 2.5h1l1 1v3l1 1-1 1v3l-1 1h-1M8.5 4.5v6M5.5 7.5h6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rust}}\"/>",
  // babel.config/.babelrc: stepped tower (yellow)
  "babel":
    "<path d=\"M6.5 2.5h3v3h2v3h2v5h-11v-5h2v-3h2v-3z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{yellow}}\"/>",
  // webpack.config.*: bundler inputs converging into a lidded box (blue)
  "webpack":
    "<path d=\"M2.5 2.5l5 5M2.5 8.5h5M2.5 14.5l5-5M9.5 6.5h5v6h-5v-6zM9.5 8.5h5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // rollup.config.*: bundler inputs rolled into a solid ball (red)
  "rollup":
    "<path d=\"M2.5 2.5l5 5M2.5 8.5h5M2.5 14.5l5-5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{red}}\"/><path d=\"M12 5.5a3 3 0 1 1 0 6a3 3 0 1 1 0-6z\" fill=\"{{red}}\"/>",
  // jest.config/setup: test flask (red) notched for a green check mark
  "jest":
    "<path d=\"M5.5 1.5h5M6.5 1.5v4l-4 8h7M11.5 9.5l-2-4v-4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{red}}\"/><path d=\"M4.5 11H10v2H3.5z\" fill=\"{{red}}\"/><path d=\"M11.5 14.5l1 1 3-3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/>",
  // vitest.config/workspace/setup: test flask (sage) with yellow liquid
  "vitest":
    "<path d=\"M5.5 1.5h5M6.5 1.5v4l-4 8h11l-4-8v-4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/><path d=\"M4.5 11h7l1 2h-9z\" fill=\"{{yellow}}\"/>",
  // playwright.config: browser window (solid title band) + check (green)
  "playwright":
    "<path d=\"M3 2h10a2 2 0 0 1 2 2H1a2 2 0 0 1 2-2z\" fill=\"{{green}}\"/><path d=\"M1.5 4.5v7.5a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-7.5M4.5 9.5l2 2 5-5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/>",
  // cypress.config/.json: browser window + pointer arrow (teal)
  "cypress":
    "<path d=\"M3 2h10a2 2 0 0 1 2 2H1a2 2 0 0 1 2-2z\" fill=\"{{teal}}\"/><path d=\"M1.5 4.5v7.5a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-7.5M5.5 6.5l5 5M5.5 6.5h3M5.5 6.5v3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/>",
  // nx.json/.nxignore: three stacked project tiles on one spine; the affected one solid, the others .5 (blue)
  "nx":
    "<path d=\"M3.5 1.5h9v2h-9v-2zM3.5 11.5h9v2h-9v-2z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\" stroke-opacity=\".5\"/><path d=\"M8.5 3.5v2M8.5 9.5v2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/><path d=\"M3 6h10v3H3z\" fill=\"{{blue}}\"/>",
  // turbo.json: speedometer dial + needle + hub (pink), ink y4..12 so it sits centred in lists
  "turborepo":
    "<path d=\"M2.5 10.5a6 6 0 0 1 12 0M8.5 10.5l3-3M2.5 12.5h12\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{pink}}\"/><path d=\"M7.75 9h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{pink}}\"/>",
  // yarn.lock/.yarnrc/.pnp.*: lockfile box (blue) + lock mark
  "yarn":
    "<path d=\"M2.5 5.5h11v4M9.5 13.5h-7v-8M4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/><path d=\"M12.5 14v-1.5h2V14\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/><path d=\"M11 14h5v2h-5z\" fill=\"{{muted}}\"/>",
  // pnpm-lock/pnpm-workspace/.pnpmfile: lockfile box (orange) + lock mark
  "pnpm":
    "<path d=\"M2.5 5.5h11v4M9.5 13.5h-7v-8M4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{orange}}\"/><path d=\"M12.5 14v-1.5h2V14\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/><path d=\"M11 14h5v2h-5z\" fill=\"{{muted}}\"/>",
  // bun.lock(b)/bunfig.toml: lockfile box (sand) + lock mark
  "bun":
    "<path d=\"M2.5 5.5h11v4M9.5 13.5h-7v-8M4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/><path d=\"M12.5 14v-1.5h2V14\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/><path d=\"M11 14h5v2h-5z\" fill=\"{{muted}}\"/>",
  // deno.json(c)/deno.lock/jsr.json: config sliders (fg), mirrored knobs vs generic config
  "deno":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{fg}}\" stroke-opacity=\".5\"/><path d=\"M4.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{fg}}\"/><path d=\"M9.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{fg}}\"/><path d=\"M5.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{fg}}\"/>",
  // biome.json: solid check over a lint squiggle (blue)
  "biome":
    "<path d=\"M2 6l1.5-1.5 2.5 2.5 5.5-5.5 1.5 1.5-7 7z\" fill=\"{{blue}}\"/><path d=\"M2.5 13.5l2-2 2 2 2-2 2 2 2-2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // *.prisma schema: letter + lines, P + field columns (teal)
  "prisma":
    "<path d=\"M2.5 8.5V2.5H5.5L6.5 3.5V4.5L5.5 5.5H2.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/><path d=\"M8.5 2.5H13.5M8.5 5.5H13.5M8.5 8.5H11.5M2.5 11.5H6.5M8.5 11.5H13.5M2.5 13.5H5.5M8.5 13.5H11.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/>",
  // drizzle.config: database cylinder + mini sliders (yellow)
  "drizzle":
    "<path d=\"M3.5 1.5h4l2 2-2 2h-4l-2-2 2-2zM1.5 3.5v8l2 2h4l2-2v-8M1.5 7.5l2 2h4l2-2M10.5 11.5h5M10.5 14.5h5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{yellow}}\"/><path d=\"M11 10h2v3h-2zM13 13h2v3h-2z\" fill=\"{{yellow}}\"/>",
  // firebase.json/*.rules: shield with rule lines (orange)
  "firebase":
    "<path d=\"M8.5 1.5l5 2v5l-5 5-5-5v-5l5-2zM5.5 5.5h6M5.5 7.5h6M6.5 9.5h4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{orange}}\"/>",
  // supabase/config.toml, seed.sql: database cylinder + up arrow (green)
  "supabase":
    "<path d=\"M3.5 1.5h4l2 2-2 2h-4l-2-2 2-2zM1.5 3.5v8l2 2h4l2-2v-8M1.5 7.5l2 2h4l2-2M13.5 14.5v-6M11.5 10.5l2-2 2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/>",
  // vercel.json: deploy arrow on a solid baseline (fg)
  "vercel":
    "<path d=\"M8.5 10.5v-8M4.5 6.5l4-4 4 4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{fg}}\"/><path d=\"M2 12h13v2H2z\" fill=\"{{fg}}\"/>",
  // netlify.toml/_redirects/_headers: globe + deploy arrow (teal)
  "netlify":
    "<path d=\"M1.5 6.5a5 5 0 1 0 10 0a5 5 0 1 0-10 0M2.5 4.5h8M2.5 8.5h8M6.5 1.5v10M13.5 15.5v-5M11.5 12.5l2-2 2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/>",
  // wrangler.*/.dev.vars: chamfered cloud + speed lines (peach)
  "cloudflare":
    "<path d=\"M6.5 12.5h7l2-2v-1l-2-2h-1v-1l-2-2h-2l-2 2v1l-1 1v3l1 1zM1.5 7.5h3M1.5 10.5h2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{peach}}\"/>",
  // electron-builder/forge/electron-vite config: monitor with <> (cyan)
  "electron":
    "<path d=\"M3 1.5h10a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1 -1.5 1.5h-10a1.5 1.5 0 0 1 -1.5 -1.5v-7a1.5 1.5 0 0 1 1.5 -1.5zM8.5 11.5v2M5.5 13.5h6M6.5 4.5l-2 2 2 2M10.5 4.5l2 2-2 2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/>",
  // tauri.conf.*: monitor with { } (sand)
  "tauri":
    "<path d=\"M3 1.5h10a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1 -1.5 1.5h-10a1.5 1.5 0 0 1 -1.5 -1.5v-7a1.5 1.5 0 0 1 1.5 -1.5zM8.5 11.5v2M5.5 13.5h6M6.5 3.5h-1v2l-1 1 1 1v2h1M10.5 3.5h1v2l1 1-1 1v2h-1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/>",
  // metro/react-native.config, eas.json: phone with <> (cyan)
  "react-native":
    "<path d=\"M5 1.5h6a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1 -1.5 1.5h-6a1.5 1.5 0 0 1 -1.5 -1.5v-10a1.5 1.5 0 0 1 1.5 -1.5zM6.5 6.5l-1 1 1 1M9.5 6.5l1 1-1 1M7.5 12.5h1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/>",
  // manage.py, django templates: chip DJ (sage)
  "django":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{sage}}\" fill-opacity=\".2\"/><path d=\"M3.5 4.5H6.5L7.5 5.5V9.5L6.5 10.5H3.5V4.5ZM11.5 4.5H13.5V9.5L12.5 10.5H10.5L9.5 9.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/>",
  // *.j2/*.jinja/*.njk: css-family braces around % (rose)
  "jinja":
    "<path d=\"M5.5 2.5h-1l-1 1v3l-1 1 1 1v3l1 1h1M11.5 2.5h1l1 1v3l1 1-1 1v3l-1 1h-1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/><path d=\"M6.5 4.5H7.5V5.5H6.5V4.5ZM9.5 9.5H10.5V10.5H9.5V9.5ZM6.5 10.5L10.5 4.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/>",
  // *.hbs/*.mustache: double braces {{ }} (brown)
  "handlebars":
    "<path d=\"M4.5 3.5h-1v3l-1 1 1 1v3h1M7.5 3.5h-1v3l-1 1 1 1v3h1M9.5 3.5h1v3l1 1-1 1v3h-1M12.5 3.5h1v3l1 1-1 1v3h-1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{brown}}\"/>",
  // *.pug/*.jade: chip PUG (sand)
  "pug":
    "<path d=\"M3 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" fill=\"{{sand}}\" fill-opacity=\".2\"/><path d=\"M3.5 9.5V5.5H4.5L5.5 6.5L4.5 7.5H3.5M7.5 5.5V9.5H9.5V5.5M13.5 5.5H12.5L11.5 6.5V8.5L12.5 9.5H13.5V7.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/>",
  // *.liquid: drop with liquid (sage)
  "liquid":
    "<path d=\"M8.5 1.5l-5 5v3a5 5 0 0 0 10 0v-3l-5-5z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\"/><path d=\"M5 10h7a3.5 3.5 0 0 1-7 0z\" fill=\"{{sage}}\"/>",
  // robots.txt/humans.txt/sitemaps: robot head (grey)
  "robots":
    "<path d=\"M4.5 4.5h8a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-5a2 2 0 0 1 2 -2zM8.5 3.5v1M6.5 10.5h4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{grey}}\"/><path d=\"M7.75 1h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{grey}}\"/><path d=\"M5 7h2v2H5zM10 7h2v2h-2z\" fill=\"{{grey}}\"/>",
  // favicon/touch icons/web manifest: app-icon tile with a star (yellow)
  "favicon":
    "<path d=\"M5 2.5h6a2.5 2.5 0 0 1 2.5 2.5v6a2.5 2.5 0 0 1 -2.5 2.5h-6a2.5 2.5 0 0 1 -2.5 -2.5v-6a2.5 2.5 0 0 1 2.5 -2.5z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{yellow}}\"/><path d=\"M8 4.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6L8 10.5l-2.4 1.2.5-2.6-1.9-1.8 2.6-.4z\" fill=\"{{yellow}}\"/>",
};
