// Minimal PNG reader and writer (Node's zlib only), used to check and repack what Chrome captures.
//
// decodePng: 8-bit RGB or RGBA, not interlaced (what Chrome writes).
// encodePng: writes IHDR, sRGB, IDAT and IEND only, so no text chunk, time stamp or tool name ends up in the file.
//            Opaque images are stored as RGB. Several filter choices are tried and the smallest file wins.

import zlib from "node:zlib";

const SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

const CRC_TABLE = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});
const crc32 = (buf) => {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};

const paeth = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
};

/** @returns {{ width: number, height: number, data: Buffer, chunks: string[] }} data is RGBA, 4 bytes per pixel */
export function decodePng(file) {
  if (!file.subarray(0, 8).equals(SIGNATURE)) throw new Error("not a PNG file");
  let width = 0, height = 0, channels = 0;
  const idat = [];
  const chunks = [];
  for (let at = 8; at < file.length;) {
    const length = file.readUInt32BE(at);
    const type = file.toString("latin1", at + 4, at + 8);
    const body = file.subarray(at + 8, at + 8 + length);
    chunks.push(type);
    if (type === "IHDR") {
      width = body.readUInt32BE(0);
      height = body.readUInt32BE(4);
      const [depth, colorType, , , interlace] = body.subarray(8);
      if (depth !== 8 || (colorType !== 2 && colorType !== 6) || interlace !== 0) {
        throw new Error(`unsupported PNG (bit depth ${depth}, color type ${colorType}, interlace ${interlace})`);
      }
      channels = colorType === 6 ? 4 : 3;
    } else if (type === "IDAT") idat.push(body);
    at += 12 + length;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const data = Buffer.alloc(width * height * 4);
  let prev = new Uint8Array(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const row = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? row[x - channels] : 0;
      const b = prev[x];
      const c = x >= channels ? prev[x - channels] : 0;
      const add = filter === 0 ? 0 : filter === 1 ? a : filter === 2 ? b : filter === 3 ? (a + b) >> 1 : paeth(a, b, c);
      row[x] = (row[x] + add) & 0xff;
    }
    for (let x = 0, o = y * width * 4; x < width; x++, o += 4) {
      data[o] = row[x * channels];
      data[o + 1] = row[x * channels + 1];
      data[o + 2] = row[x * channels + 2];
      data[o + 3] = channels === 4 ? row[x * channels + 3] : 255;
    }
    prev = row;
  }
  return { width, height, data, chunks };
}

const chunk = (type, body) => {
  const out = Buffer.alloc(12 + body.length);
  out.writeUInt32BE(body.length, 0);
  out.write(type, 4, "latin1");
  body.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + body.length)), 8 + body.length);
  return out;
};

// One filtered copy of the image. mode 0-4 uses that PNG filter on every row; "adaptive" picks, row by row,
// the filter whose output has the smallest sum of absolute values (the usual heuristic).
function filtered(pixels, width, height, channels, mode) {
  const stride = width * channels;
  const out = Buffer.alloc((stride + 1) * height);
  const candidates = mode === "adaptive" ? [0, 1, 2, 3, 4] : [mode];
  const scratch = candidates.map(() => new Uint8Array(stride));
  const zero = new Uint8Array(stride);
  for (let y = 0; y < height; y++) {
    const row = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y ? pixels.subarray((y - 1) * stride, y * stride) : zero;
    let best = 0, bestSum = Infinity;
    candidates.forEach((filter, i) => {
      const dst = scratch[i];
      let sum = 0;
      for (let x = 0; x < stride; x++) {
        const a = x >= channels ? row[x - channels] : 0;
        const b = prev[x];
        const c = x >= channels ? prev[x - channels] : 0;
        const sub = filter === 0 ? 0 : filter === 1 ? a : filter === 2 ? b : filter === 3 ? (a + b) >> 1 : paeth(a, b, c);
        const v = (row[x] - sub) & 0xff;
        dst[x] = v;
        sum += v < 128 ? v : 256 - v;
      }
      if (sum < bestSum) { bestSum = sum; best = i; }
    });
    out[y * (stride + 1)] = candidates[best];
    out.set(scratch[best], y * (stride + 1) + 1);
  }
  return out;
}

/** @param {{ width: number, height: number, data: Buffer }} image RGBA */
export function encodePng({ width, height, data }) {
  let opaque = true;
  for (let i = 3; i < data.length; i += 4) if (data[i] !== 255) { opaque = false; break; }
  const channels = opaque ? 3 : 4;
  let pixels = data;
  if (opaque) {
    pixels = Buffer.alloc(width * height * 3);
    for (let i = 0, o = 0; i < data.length; i += 4, o += 3) {
      pixels[o] = data[i];
      pixels[o + 1] = data[i + 1];
      pixels[o + 2] = data[i + 2];
    }
  }
  let best = null;
  for (const mode of [0, 1, 2, 4, "adaptive"]) {
    const packed = zlib.deflateSync(filtered(pixels, width, height, channels, mode), { level: 9, memLevel: 9 });
    if (!best || packed.length < best.length) best = packed;
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header.set([8, opaque ? 2 : 6, 0, 0, 0], 8);
  return Buffer.concat([SIGNATURE, chunk("IHDR", header), chunk("sRGB", Buffer.from([0])), chunk("IDAT", best), chunk("IEND", Buffer.alloc(0))]);
}
