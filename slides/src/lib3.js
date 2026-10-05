// 공통 부품 (CH02-03 이후 덱) — 코드+결과, 표, 칸 그림, 입력 콘솔
const { T, F, txt, codeBlock, outputBox } = require("./lib");

// code block + 실행 결과. returns bottom y
function codeOut(s, x, y, w, lines, out, opts = {}) {
  const cb = codeBlock(s, x, y, w, lines, Object.assign({ fs: 14, lh: 0.34 }, opts));
  let bottom = y + cb.h;
  if (out != null) {
    if (Array.isArray(out)) return consoleOut(s, x, bottom + 0.12, w, out, opts);
    const oh = opts.oh || 0.55 + out.split("\n").length * 0.26;
    outputBox(s, x, bottom + 0.12, w, oh, out, { fs: opts.ofs || 13 });
    bottom += 0.12 + oh;
  }
  return bottom;
}
// 실행 결과 with user-typed parts: lines = ["text", ["prompt ", "typed"], ...]. returns bottom y
function consoleOut(s, x, y, w, lines, opts = {}) {
  const h = 0.55 + lines.length * 0.26;
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: "FFFFFF", transparency: 94 }, line: { color: T.muted, width: 0.75, dashType: "dash" } });
  s.addText("실행 결과", { x: x + 0.2, y: y + 0.1, w: 2, h: 0.28, fontFace: F.sb, fontSize: 12, color: T.green, margin: 0, isTextBox: true });
  if (lines.some((l) => Array.isArray(l))) s.addText("▮ = 키보드로 입력한 값", { x: x + w - 2.6, y: y + 0.1, w: 2.4, h: 0.28, fontFace: F.r, fontSize: 11, color: T.yellow, align: "right", margin: 0, isTextBox: true });
  const runs = [];
  lines.forEach((l, i) => {
    const br = i < lines.length - 1;
    if (Array.isArray(l)) {
      runs.push({ text: l[0], options: { color: T.codeText } });
      runs.push({ text: l[1], options: { color: T.yellow, bold: true, underline: { style: "sng", color: T.yellow }, breakLine: br } });
    } else runs.push({ text: l, options: { color: T.codeText, breakLine: br } });
  });
  s.addText(runs, { x: x + 0.2, y: y + 0.42, w: w - 0.4, h: h - 0.52, fontFace: F.code, fontSize: opts.ofs || 13, valign: "top", margin: 0, isTextBox: true, lineSpacing: (opts.ofs || 13) * 1.45 });
  return y + h;
}
function table(s, x, y, rows, colW, opts = {}) {
  const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: i === 0 ? F.b : (opts.codeCols || []).includes(j) ? F.code : F.r, fontSize: i === 0 ? (opts.hfs || 15) : opts.fs || 15,
    color: i === 0 ? T.white : (opts.hl || {})[j] || T.text, fill: { color: i === 0 ? (opts.hfill || T.card2) : (i % 2 ? T.card : T.bg) }, align: (opts.left || []).includes(j) ? "left" : "center", valign: "middle", margin: [0.03, 0.1, 0.03, 0.1] } })));
  s.addTable(tbl, { x, y, w: colW.reduce((a, b) => a + b, 0), colW, rowH: opts.rowH || 0.5, border: { type: "solid", color: "1E2A5A", pt: 1 } });
}
// labelled one-line pill
function pill(s, text, x, y, w, color, h = 0.36, fs = 12) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: h / 2, fill: { color, transparency: 80 }, line: { color, width: 1 } });
  txt(s, text, { x, y, w, h, fontFace: F.sb, fontSize: fs, color, align: "center", valign: "middle" });
}
// arrow between boxes (horizontal)
function arrowR(s, x, y, w, color = T.accent) { s.addShape("rightArrow", { x, y, w, h: 0.32, fill: { color }, line: { type: "none" } }); }
function arrowD(s, x, y, h, color = T.accent) { s.addShape("downArrow", { x, y, w: 0.32, h, fill: { color }, line: { type: "none" } }); }
// box with title + body
function box(s, x, y, w, h, title, body, color, opts = {}) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.1, fill: { color: opts.fill || T.card }, line: { color, width: opts.lw || 1.5 } });
  const runs = [{ text: title, options: { fontFace: F.b, color, fontSize: opts.tfs || 16, breakLine: !!body } }];
  if (body) runs.push({ text: body, options: { fontSize: opts.bfs || 13, color: T.text, fontFace: opts.code ? F.code : F.r } });
  txt(s, runs, { x: x + 0.15, y, w: w - 0.3, h, align: opts.align || "center", valign: "middle", paraSpaceAfter: 3 });
}
module.exports = { codeOut, consoleOut, table, pill, arrowR, arrowD, box };
