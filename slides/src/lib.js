// Shared design tokens + helpers matching the original CH01 deck (dark navy / indigo)
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");

const T = {
  bg: "0A1128", card: "0D1B3D", card2: "10193A", deep: "0B1330",
  accent: "6366F1", accent2: "818CF8", pale: "C7D2FE",
  white: "FFFFFF", text: "C9D0E8", muted: "8A93B8",
  yellow: "FACC15", green: "34D399", pink: "F472B6", orange: "FB923C", cyan: "38BDF8",
  codeBg: "070D20", codeText: "E2E8F0",
};
const F = {
  r: "Paperlogy 4 Regular", m: "Paperlogy 5 Medium", sb: "Paperlogy 6 SemiBold",
  b: "Paperlogy 7 Bold", xb: "Paperlogy 8 ExtraBold", code: "Consolas",
};
const W = 13.333, H = 7.5, MX = 0.75, CW = W - 2 * MX;

const iconCache = new Map();
async function icon(Comp, color = "#FFFFFF", size = 256) {
  const key = (Comp.name || Comp.displayName) + color;
  if (iconCache.has(key)) return iconCache.get(key);
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  const d = "image/png;base64," + buf.toString("base64");
  iconCache.set(key, d);
  return d;
}

let pageNo = 0;
function header(slide, section, title) {
  slide.background = { color: T.bg };
  slide.addText(section, { x: MX, y: 0.3, w: 9, h: 0.32, fontFace: F.sb, fontSize: 16, color: T.accent2, charSpacing: 1.5, margin: 0, isTextBox: true });
  slide.addText(title, { x: MX, y: 0.64, w: CW, h: 0.55, fontFace: F.b, fontSize: 30, color: T.white, margin: 0, isTextBox: true });
  slide.addShape("rect", { x: MX, y: 1.38, w: CW, h: 0.012, fill: { color: T.white, transparency: 82 }, line: { type: "none" } });
}
function footer(slide, source) {
  pageNo += 1;
  if (source) slide.addText("출처 : " + source, { x: MX, y: 6.98, w: 10.6, h: 0.3, fontFace: F.r, fontSize: 10, color: T.muted, margin: 0, isTextBox: true });
  slide.addText(String(pageNo), { x: W - MX - 1, y: 6.98, w: 1, h: 0.3, fontFace: F.r, fontSize: 12, color: T.muted, align: "right", margin: 0, isTextBox: true });
}
function card(slide, x, y, w, h, opts = {}) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: opts.r ?? 0.12, fill: { color: opts.fill || T.card, transparency: opts.ft || 0 },
    line: opts.line ? { color: opts.line, width: opts.lw || 1 } : { color: T.accent, width: 0.75, transparency: 60 } });
}
function tip(slide, x, y, w, h, label, text, color = T.yellow, size = 16) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.12, fill: { color, transparency: 88 }, line: { color, width: 1 } });
  slide.addText([
    { text: label + "  ", options: { fontFace: F.b, color } },
    { text, options: { fontFace: F.r, color: T.white } },
  ], { x: x + 0.25, y, w: w - 0.5, h, fontSize: size, valign: "middle", margin: 0, isTextBox: true });
}
async function iconCircle(slide, Ic, x, y, d, color = T.accent, iconColor = "#C7D2FE", tr = 70) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color, transparency: tr }, line: { type: "none" } });
  const p = d * 0.25;
  slide.addImage({ data: await icon(Ic, iconColor), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p });
}
function numBadge(slide, n, x, y, d = 0.36, color = T.accent) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color }, line: { type: "none" } });
  slide.addText(String(n), { x, y, w: d, h: d, fontFace: F.b, fontSize: Math.round(d * 38), color: T.white, align: "center", valign: "middle", margin: 0, isTextBox: true });
}
function txt(slide, text, o) {
  slide.addText(text, Object.assign({ fontFace: F.r, fontSize: 16, color: T.white, margin: 0, valign: "top", isTextBox: true }, o));
}

// --- code block with simple syntax highlighting -------------------------
const KW = /\b(import|from|as|for|in|def|return|if|else|True|False)\b/;
function hlLine(line) {
  const runs = [];
  const re = /(#.*$)|(f?"[^"]*"|'[^']*')|\b(import|from|as|for|in|def|return|if|else|True|False|print)\b/g;
  let last = 0, m;
  while ((m = re.exec(line))) {
    if (m.index > last) runs.push({ t: line.slice(last, m.index), c: T.codeText });
    if (m[1]) runs.push({ t: m[1], c: "7C89B8", i: true });
    else if (m[2]) runs.push({ t: m[2], c: "FCD34D" });
    else if (m[3] === "print") runs.push({ t: m[3], c: "7DD3FC" });
    else runs.push({ t: m[3], c: "F472B6" });
    last = m.index + m[0].length;
  }
  if (last < line.length) runs.push({ t: line.slice(last), c: T.codeText });
  if (!runs.length) runs.push({ t: " ", c: T.codeText });
  return runs;
}
// lines: array of strings; markers: {lineIndex: number}; returns {lineY(i)}
function codeBlock(slide, x, y, w, lines, opts = {}) {
  const fs = opts.fs || 15, lh = opts.lh || 0.34, label = opts.label || "Colab 코드 셀";
  const bar = 0.4, padT = 0.18;
  const h = opts.h || bar + padT * 2 + lines.length * lh;
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.accent, width: 1, transparency: 40 } });
  ["F87171", "FBBF24", "34D399"].forEach((c, i) => slide.addShape("ellipse", { x: x + 0.2 + i * 0.22, y: y + 0.14, w: 0.13, h: 0.13, fill: { color: c }, line: { type: "none" } }));
  slide.addText(label, { x: x + 0.95, y: y + 0.06, w: w - 1.2, h: 0.28, fontFace: F.r, fontSize: 11, color: T.muted, margin: 0, valign: "middle", isTextBox: true });
  slide.addShape("rect", { x, y: y + bar, w, h: 0.01, fill: { color: T.accent, transparency: 70 }, line: { type: "none" } });
  const top = y + bar + padT;
  const numW = opts.noNums ? 0 : 0.45;
  lines.forEach((ln, i) => {
    const ly = top + i * lh;
    if (!opts.noNums) slide.addText(String(i + 1), { x: x + 0.12, y: ly, w: 0.3, h: lh, fontFace: F.code, fontSize: fs - 3, color: "4B5578", align: "right", valign: "middle", margin: 0, isTextBox: true });
    const runs = hlLine(ln).map((r) => ({ text: r.t, options: { color: r.c, italic: !!r.i } }));
    slide.addText(runs, { x: x + 0.2 + numW, y: ly, w: w - 0.4 - numW - (opts.markers ? 0.5 : 0), h: lh, fontFace: F.code, fontSize: fs, valign: "middle", margin: 0, isTextBox: true });
  });
  if (opts.markers) for (const [i, n] of Object.entries(opts.markers)) numBadge(slide, n, x + w - 0.48, top + i * lh + (lh - 0.3) / 2, 0.3);
  return { h, lineY: (i) => top + i * lh };
}
// numbered explanation list on the right side of a code block
function explainList(slide, x, y, w, items, opts = {}) {
  const gap = opts.gap ?? 0.16, ih = opts.ih || 0.9;
  items.forEach(([n, title, body], i) => {
    const iy = y + i * (ih + gap);
    card(slide, x, iy, w, ih, { fill: T.card });
    numBadge(slide, n, x + 0.2, opts.inline ? iy + (ih - 0.34) / 2 : iy + Math.min(0.18, (ih - 0.34) / 2), 0.34);
    if (opts.inline) {
      txt(slide, [{ text: title + "   ", options: { fontFace: F.b, color: T.accent2, fontSize: 15 } }, { text: body, options: { fontSize: 14 } }], { x: x + 0.7, y: iy, w: w - 0.85, h: ih, valign: "middle" });
    } else if (ih < 0.9) {
      txt(slide, title, { x: x + 0.7, y: iy + 0.06, w: w - 0.9, h: 0.32, fontFace: F.b, fontSize: 15, color: T.accent2, valign: "middle" });
      txt(slide, body, { x: x + 0.7, y: iy + 0.37, w: w - 0.9, h: ih - 0.4, fontSize: 14, color: T.white });
    } else {
      txt(slide, title, { x: x + 0.7, y: iy + 0.14, w: w - 0.9, h: 0.4, fontFace: F.b, fontSize: 16, color: T.accent2, valign: "middle" });
      txt(slide, body, { x: x + 0.7, y: iy + 0.52, w: w - 0.9, h: ih - 0.6, fontSize: 14, color: T.white });
    }
  });
}
function outputBox(slide, x, y, w, h, text, opts = {}) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: "FFFFFF", transparency: 94 }, line: { color: T.muted, width: 0.75, dashType: "dash" } });
  slide.addText("실행 결과", { x: x + 0.2, y: y + 0.1, w: 2, h: 0.28, fontFace: F.sb, fontSize: 12, color: T.green, margin: 0, isTextBox: true });
  slide.addText(text, { x: x + 0.2, y: y + 0.42, w: w - 0.4, h: h - 0.52, fontFace: F.code, fontSize: opts.fs || 13, color: T.codeText, valign: "top", margin: 0, isTextBox: true });
}

module.exports = { T, F, W, H, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox, hlLine };

// ---- UI mock helpers (CH02) ----
function browserWin(slide, x, y, w, h, url) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.1, fill: { color: "F8FAFC" }, line: { color: T.muted, width: 0.75 } });
  slide.addShape("rect", { x: x + 0.02, y: y + 0.02, w: w - 0.04, h: 0.42, fill: { color: "E2E8F0" }, line: { type: "none" } });
  ["F87171", "FBBF24", "34D399"].forEach((c, i) => slide.addShape("ellipse", { x: x + 0.15 + i * 0.2, y: y + 0.15, w: 0.12, h: 0.12, fill: { color: c }, line: { type: "none" } }));
  slide.addShape("roundRect", { x: x + 0.85, y: y + 0.08, w: w - 1.05, h: 0.28, rectRadius: 0.14, fill: { color: "FFFFFF" }, line: { type: "none" } });
  slide.addText(url, { x: x + 1.0, y: y + 0.08, w: w - 1.3, h: 0.28, fontFace: F.r, fontSize: 11, color: "334155", valign: "middle", margin: 0, isTextBox: true });
  return { x: x + 0.15, y: y + 0.55, w: w - 0.3, h: h - 0.65 };
}
function dark(slide, text, o) { txt(slide, text, Object.assign({ color: "1E293B" }, o)); }
function hlRuns(code) { return hlLine(code).map((r) => ({ text: r.t, options: { color: r.c } })); }
module.exports.browserWin = browserWin; module.exports.dark = dark; module.exports.hlRuns = hlRuns;
