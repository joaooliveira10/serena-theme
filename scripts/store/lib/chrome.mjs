// Headless Chrome as the rasterizer: an HTML page in, a PNG out.
// Chrome never opens a window here and never touches a real profile: it gets the throw-away profile folder
// the caller made for this run (profileDir; render.mjs creates it in the system's temporary folder and deletes it).

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { decodePng, encodePng } from "./png.mjs";

const CANDIDATES = {
  win32: [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ],
  darwin: ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium"],
  linux: ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"],
};

// Without this argument Chrome would use the profile of whoever runs the script.
const profileArg = (profileDir) => {
  if (typeof profileDir !== "string" || !profileDir) throw new Error("profileDir is missing: Chrome is only started with a throw-away profile");
  return `--user-data-dir=${profileDir}`;
};

export function findChrome(explicit) {
  const wanted = explicit || process.env.CHROME_PATH;
  if (wanted) {
    if (!fs.existsSync(wanted)) throw new Error(`Chrome not found at "${wanted}"`);
    return wanted;
  }
  const found = (CANDIDATES[process.platform] ?? []).find((p) => fs.existsSync(p));
  if (!found) throw new Error("Chrome not found: pass --chrome <path to chrome> or set CHROME_PATH");
  return found;
}

/**
 * Renders `html` at `width` x `height` CSS pixels and `scale` device pixels per CSS pixel.
 * Pixels the page does not paint stay transparent. Returns { width, height, data } in device pixels (RGBA).
 */
export function capture({ chrome, workDir, profileDir, name, html, width, height, scale = 2 }) {
  fs.mkdirSync(workDir, { recursive: true });
  const page = path.join(workDir, `${name}.html`);
  const shot = path.join(workDir, `${name}.raw.png`);
  fs.writeFileSync(page, html);
  fs.rmSync(shot, { force: true });
  execFileSync(chrome, [
    "--headless=new",
    profileArg(profileDir),
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--disable-sync",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-gpu",
    "--disable-lcd-text", // grey antialiasing: no colored fringes when the image is scaled down by a web page
    "--hide-scrollbars",
    "--default-background-color=00000000",
    `--force-device-scale-factor=${scale}`,
    `--window-size=${width},${height}`,
    `--screenshot=${shot}`,
    pathToFileURL(page).href,
  ], { stdio: "ignore", timeout: 120000 });
  if (!fs.existsSync(shot)) throw new Error(`Chrome wrote no screenshot for "${name}"`);
  const image = decodePng(fs.readFileSync(shot));
  if (image.width !== width * scale || image.height !== height * scale) {
    throw new Error(`"${name}": expected ${width * scale}x${height * scale}, Chrome captured ${image.width}x${image.height}`);
  }
  return image;
}

/** Writes the image as a PNG without metadata. Returns the size in bytes. */
export function save(image, file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const png = encodePng(image);
  fs.writeFileSync(file, png);
  return png.length;
}

/**
 * Asks Chrome which elements matching `selector` are too wide for their parent, leaving less than `margin`
 * CSS pixels on each side, with the page laid out as for the capture. Returns the text of each one.
 * For names under icons: the cell cuts what does not fit, and the image would not show that anything is missing.
 */
export function misfits({ chrome, workDir, profileDir, name, html, width, height, selector, margin = 0 }) {
  fs.mkdirSync(workDir, { recursive: true });
  const page = path.join(workDir, `${name}.fits.html`);
  const probe = `<script>
const wide = [...document.querySelectorAll(${JSON.stringify(selector)})].filter((el) => el.getBoundingClientRect().width + ${2 * margin} > el.parentElement.getBoundingClientRect().width);
const out = document.createElement("pre");
out.textContent = "FITS" + JSON.stringify(wide.map((el) => el.textContent)) + "FITS";
document.body.append(out);
</script>`;
  if (!html.includes("</body>")) throw new Error(`"${name}": the page has no </body> to put the measuring script before`);
  fs.writeFileSync(page, html.replace("</body>", () => probe + "</body>"));
  const dom = execFileSync(chrome, [
    "--headless=new",
    profileArg(profileDir),
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--disable-sync",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-gpu",
    "--hide-scrollbars",
    `--window-size=${width},${height}`,
    "--dump-dom",
    pathToFileURL(page).href,
  ], { stdio: ["ignore", "pipe", "ignore"], timeout: 120000, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const match = /FITS(\[.*?\])FITS/.exec(dom);
  if (!match) throw new Error(`"${name}": Chrome did not answer the question about widths`);
  return JSON.parse(match[1].replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
}

/**
 * Asks Chrome which of the font families are installed. The images are made with Cascadia Code and Segoe UI;
 * with other fonts they still render, but look different.
 * @returns {Record<string, boolean>}
 */
export function installedFonts({ chrome, workDir, profileDir, families }) {
  fs.mkdirSync(workDir, { recursive: true });
  const page = path.join(workDir, "fonts.html");
  // A family is installed when the text has the same width whatever the fallback behind it is.
  fs.writeFileSync(page, `<!doctype html><meta charset="utf-8"><pre id="out"></pre><script>
const context = document.createElement("canvas").getContext("2d");
const width = (font) => { context.font = "40px " + font; return context.measureText("Serena mmm iii 000 WWW").width; };
const out = {};
for (const family of ${JSON.stringify(families)}) out[family] = width('"' + family + '", serif') === width('"' + family + '", monospace');
document.getElementById("out").textContent = "FONTS" + JSON.stringify(out) + "FONTS";
</script>`);
  const dom = execFileSync(chrome, [
    "--headless=new",
    profileArg(profileDir),
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--disable-sync",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-gpu",
    "--dump-dom",
    pathToFileURL(page).href,
  ], { stdio: ["ignore", "pipe", "ignore"], timeout: 120000, encoding: "utf8" });
  const match = /FONTS(\{.*?\})FONTS/.exec(dom);
  if (!match) throw new Error("Chrome did not answer the font question");
  return JSON.parse(match[1].replace(/&quot;/g, '"'));
}
