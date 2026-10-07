// Serena Icons — batch "build-config-tooling" (FILE icons).
// Manifests (package box), lockfiles (box + lock mark), tool/language configs (sliders in
// the owner's token) and tool symbols. Inner SVG markup for viewBox "0 0 16 16" with
// {{token}} placeholders. Hand-maintained: written with the helpers of system/glyphs.mjs and inlined, so the
// module has no imports. Edit the strings, or import the helpers as folders.mjs does.
export const icons = {
  // .csproj/.fsproj/.vbproj: dependency manifest -> package box (purple, .NET)
  "dotnet-project":
    "<path d=\"M2.5 5.5h11v8h-11v-8zM4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{purple}}\"/>",
  // .sln/.slnx: a solution stacks projects -> three isometric layers
  "dotnet-solution":
    "<path d=\"M8.5 1.5l6 3-6 3-6-3 6-3zM2.5 7.5l6 3 6-3M2.5 10.5l6 3 6-3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{purple}}\"/>",
  // Directory.Build.props, global.json, .runsettings: sliders (lavender, knobs mirrored vs appsettings)
  "dotnet-config":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{lavender}}\" stroke-opacity=\".5\"/><path d=\"M4.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{lavender}}\"/><path d=\"M9.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{lavender}}\"/><path d=\"M5.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{lavender}}\"/>",
  // appsettings*.json, launchSettings.json, web.config: runtime settings sliders (purple)
  "dotnet-appsettings":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{purple}}\" stroke-opacity=\".5\"/><path d=\"M9.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{purple}}\"/><path d=\"M4.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{purple}}\"/><path d=\"M8.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{purple}}\"/>",
  // .resx/.resw: string table -> key blocks + value lines
  "dotnet-resource":
    "<path d=\"M2 3h3v2H2zM2 7h3v2H2zM2 11h3v2H2z\" fill=\"{{sand}}\"/><path d=\"M7.5 4.5H13.5M7.5 8.5H11.5M7.5 12.5H12.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sand}}\"/>",
  // NuGet: package box with a down arrow (package fetched from a feed)
  "nuget":
    "<path d=\"M2.5 5.5h11v8h-11v-8zM4.5 2.5h7l2 3M4.5 2.5l-2 3M8.5 7.5v4M6.5 9.5l2 2 2-2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{lavender}}\"/>",
  // pom.xml, mvnw: package box (red)
  "maven":
    "<path d=\"M2.5 5.5h11v8h-11v-8zM4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{red}}\"/>",
  // Gradle scripts: building blocks, keystone filled
  "gradle":
    "<path d=\"M1.5 8.5h5v5h-5v-5zM8.5 8.5h5v5h-5v-5z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\"/><path d=\"M5.75 2h3.5a0.75 0.75 0 0 1 0.75 0.75v3.5a0.75 0.75 0 0 1 -0.75 0.75h-3.5a0.75 0.75 0 0 1 -0.75 -0.75v-3.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{teal}}\"/>",
  // application.properties/yml: sliders (sage)
  "java-config":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{sage}}\" stroke-opacity=\".5\"/><path d=\"M9.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{sage}}\"/><path d=\"M4.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{sage}}\"/><path d=\"M8.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{sage}}\"/>",
  // package.json: package box (green)
  "node-package":
    "<path d=\"M2.5 5.5h11v8h-11v-8zM4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/>",
  // package-lock/yarn/pnpm/bun lock: box + lock mark
  "node-lock":
    "<path d=\"M2.5 5.5h11v4M9.5 13.5h-7v-8M4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\"/><path d=\"M12.5 14v-1.5h2V14\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/><path d=\"M11 14h5v2h-5z\" fill=\"{{muted}}\"/>",
  // .npmrc, .nvmrc, turbo/nx/lerna: sliders (green)
  "node-config":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{green}}\" stroke-opacity=\".5\"/><path d=\"M9.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{green}}\"/><path d=\"M4.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{green}}\"/><path d=\"M8.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{green}}\"/>",
  // tsconfig*.json: sliders (blue)
  "tsconfig":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\" stroke-opacity=\".5\"/><path d=\"M9.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{blue}}\"/><path d=\"M4.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{blue}}\"/><path d=\"M8.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{blue}}\"/>",
  // jsconfig, babel, swc, browserslist ...: sliders (yellow)
  "js-config":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{yellow}}\" stroke-opacity=\".5\"/><path d=\"M9.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{yellow}}\"/><path d=\"M4.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{yellow}}\"/><path d=\"M8.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{yellow}}\"/>",
  // ESLint: check in a shield (code guard)
  "eslint":
    "<path d=\"M8.5 1.5l5 2v5l-5 5-5-5v-5l5-2zM5.5 7.5l2 2 4-4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{lavender}}\"/>",
  // Prettier: brush over two aligned lines
  "prettier":
    "<path d=\"M14.5 1.5l-5 5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{pink}}\"/><path d=\"M9 5l2 2-4 4c-1 1-2.5 1.5-4.5 1.5 0-2 .5-3.5 1.5-4.5z\" fill=\"{{pink}}\"/><path d=\"M9.5 11.5H13.5M9.5 14.5H13.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{pink}}\"/>",
  // .editorconfig: text cursor beside indented lines
  "editorconfig":
    "<path d=\"M2.5 2.5h2M3.5 2.5v11M2.5 13.5h2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{grey}}\"/><path d=\"M6.5 3.5H13.5M8.5 6.5H13.5M8.5 9.5H12.5M6.5 12.5H11.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{grey}}\"/>",
  // vite.config.*: lightning bolt
  "vite":
    "<path d=\"M7.5 1H12l-2.5 5H13l-8 8 2.5-5h-4z\" fill=\"{{purple}}\"/>",
  // webpack/rollup/esbuild/...: inputs converge into one bundle
  "bundler":
    "<path d=\"M2.5 2.5l5 5M2.5 8.5h5M2.5 14.5l5-5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/><path d=\"M11 5h3a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-5a1 1 0 0 1 1 -1z\" fill=\"{{cyan}}\"/>",
  // next.config.*: double chevron
  "next":
    "<path d=\"M2 3h2l5 5-5 5H2l5-5zM7 3h2l5 5-5 5H7l5-5z\" fill=\"{{fg}}\"/>",
  // jest/vitest/playwright/cypress config: lab flask
  "test-config":
    "<path d=\"M5.5 1.5h5M6.5 1.5v4l-4 8h11l-4-8v-4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{rose}}\"/><path d=\"M4.5 11h7l1 2h-9z\" fill=\"{{rose}}\"/>",
  // postcss/tailwind/stylelint: sliders (teal, the CSS colour)
  "style-config":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{teal}}\" stroke-opacity=\".5\"/><path d=\"M9.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{teal}}\"/><path d=\"M4.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{teal}}\"/><path d=\"M8.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{teal}}\"/>",
  // go.mod/go.work: package box (cyan)
  "go-mod":
    "<path d=\"M2.5 5.5h11v8h-11v-8zM4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/>",
  // go.sum: box + lock mark
  "go-sum":
    "<path d=\"M2.5 5.5h11v4M9.5 13.5h-7v-8M4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\"/><path d=\"M12.5 14v-1.5h2V14\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/><path d=\"M11 14h5v2h-5z\" fill=\"{{muted}}\"/>",
  // golangci/goreleaser/air: sliders (cyan)
  "go-config":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{cyan}}\" stroke-opacity=\".5\"/><path d=\"M9.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{cyan}}\"/><path d=\"M4.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{cyan}}\"/><path d=\"M8.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{cyan}}\"/>",
  // pyproject.toml, setup.py, Pipfile: blue box, yellow lid (like the PY chip)
  "python-project":
    "<path d=\"M2.5 5.5h11v8h-11v-8zM6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/><path d=\"M4.5 2.5h7l2 3M4.5 2.5l-2 3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{yellow}}\"/>",
  // requirements*.txt: checklist (yellow ticks, blue lines)
  "python-requirements":
    "<path d=\"M1.5 3.5l1 1 3-3M1.5 8.5l1 1 3-3M1.5 13.5l1 1 3-3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{yellow}}\"/><path d=\"M7.5 3.5H14.5M7.5 8.5H14.5M7.5 13.5H12.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // poetry/uv/pdm/Pipfile lock: python box + yellow lock mark
  "python-lock":
    "<path d=\"M2.5 5.5h11v4M9.5 13.5h-7v-8M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/><path d=\"M4.5 2.5h7l2 3M4.5 2.5l-2 3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{yellow}}\"/><path d=\"M12.5 14v-1.5h2V14\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{yellow}}\"/><path d=\"M11 14h5v2h-5z\" fill=\"{{yellow}}\"/>",
  // ruff/mypy/flake8/.python-version: blue sliders, one yellow knob
  "python-config":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\" stroke-opacity=\".5\"/><path d=\"M9.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{blue}}\"/><path d=\"M4.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{yellow}}\"/><path d=\"M8.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{blue}}\"/>",
  // Makefile/CMake/just/Task: hammer
  "makefile":
    "<path d=\"M7 4l3-3 5 5-3 3z\" fill=\"{{orange}}\"/><path d=\"M8.5 7.5l-6 6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{orange}}\"/>",
  // any other *.lock: muted box + lock mark
  "lock":
    "<path d=\"M2.5 5.5h11v4M9.5 13.5h-7v-8M4.5 2.5h7l2 3M4.5 2.5l-2 3M6.5 8.5h3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/><path d=\"M12.5 14v-1.5h2V14\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/><path d=\"M11 14h5v2h-5z\" fill=\"{{muted}}\"/>",
  // ini/cfg/conf/properties: grey sliders (= exemplar 'settings')
  "config":
    "<path d=\"M2.5 4.5h11M2.5 8.5h11M2.5 12.5h11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{grey}}\" stroke-opacity=\".5\"/><path d=\"M9.75 3h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{grey}}\"/><path d=\"M4.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{grey}}\"/><path d=\"M8.75 11h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{grey}}\"/>",
  // .env*: key (ring bow)
  "env":
    "<path d=\"M3 7h3l2 2v3l-2 2H3l-2-2V9l2-2zM3 9v3h3V9z\" fill=\"{{yellow}}\" fill-rule=\"evenodd\"/><path d=\"M7.5 7.5l5-5M10.5 4.5l2 2M12.5 2.5l1 1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{yellow}}\"/>",
  // .env.example/.sample/...: muted key + dot mark
  "env-example":
    "<path d=\"M3 7h3l2 2v3l-2 2H3l-2-2V9l2-2zM3 9v3h3V9z\" fill=\"{{muted}}\" fill-rule=\"evenodd\"/><path d=\"M7.5 7.5l5-5M10.5 4.5l2 2M12.5 2.5l1 1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/><path d=\"M12.75 13h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{yellow}}\"/>",
  // .vscode/*, .code-workspace, .vsix: editor window with side bar
  "vscode":
    "<path d=\"M3 2.5h10a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1 -1.5 1.5h-10a1.5 1.5 0 0 1 -1.5 -1.5v-8a1.5 1.5 0 0 1 1.5 -1.5zM5.5 2.5v11\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/><path d=\"M8.5 6.5H12.5M8.5 9.5H11.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{blue}}\"/>",
  // *color-theme.json, tmLanguage ...: painter's palette
  "vscode-theme":
    "<path d=\"M6.5 2.5h4l3 3v2l-1 1h-2l-1 1v2l-2 2h-2l-3-3v-4l4-4z\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{pink}}\"/><path d=\"M4.75 7h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{pink}}\"/><path d=\"M7.75 4h1.5a0.75 0.75 0 0 1 0.75 0.75v1.5a0.75 0.75 0 0 1 -0.75 0.75h-1.5a0.75 0.75 0 0 1 -0.75 -0.75v-1.5a0.75 0.75 0 0 1 0.75 -0.75z\" fill=\"{{pink}}\"/><path d=\"M10 5h2v2h-2v-2z\" fill=\"{{pink}}\"/>",
  // generic ignore files: prohibition sign
  "ignore":
    "<path d=\"M2.5 8a5.5 5.5 0 1 0 11 0a5.5 5.5 0 1 0 -11 0M4.5 4.5l7 7\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"{{muted}}\"/>",
};
