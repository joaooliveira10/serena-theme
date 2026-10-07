# Security policy

Serena Theme contains only color themes and file icon themes: JSON files and SVG images. It has no executable code, no dependencies and no activation events, so it cannot run anything on your machine.

How that is kept true:

- The package is built from a whitelist (`.vscodeignore`). The build scripts of this repository (`build.mjs`, `scripts/check.mjs`) are not part of it; they use only Node's standard library, so there is nothing to install.
- Every push to `main`, every pull request and every release, before anything is published, runs `node scripts/check.mjs`, which refuses an icon that is anything other than plain SVG shapes (no scripts, styles, event handlers or links to other files) and a `package.json` that declares code, dependencies or other extensions to install. The same workflows then list the packaged files and fail on any file outside the expected set.
- The packaging and publishing tools (`vsce`, `ovsx`) are not dependencies of the extension. The GitHub workflows download pinned versions of them with install scripts disabled; their own dependencies are resolved by npm at run time, never from a release less than 7 days old. Nothing they bring ends up in the package.
- The images of the store page are drawn by `scripts/store/render.mjs`, which is run by hand and never by the workflows. It is the only script here that needs something installed (the npm package `shiki` and a Chromium-based browser, run headless with a throw-away profile), and it is not part of the package either.

## Reporting a vulnerability

If you find a security problem — for example in the build scripts or the GitHub workflows of this repository — please **do not open a public issue**. Report it privately through [GitHub's private vulnerability reporting](https://github.com/joaooliveira10/serena-theme/security/advisories/new).

You will get an answer as soon as possible, and the fix will be credited to you if you wish.
