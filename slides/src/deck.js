// Shared deck scaffolding (sections, divider, summary, step flow, title/closing) for CH03+
const pptxgen = require("pptxgenjs");
const fa = require("react-icons/fa");
const si = require("react-icons/si");
const { T, F, W, MX, CW, icon, header, footer, card, tip, numBadge, txt } = require("./lib");

function makeDeck(title) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = title;
  pres.author = "김진성";
  let cur = null;
  const sec = (t) => { cur = t; pres.addSection({ title: t }); };
  const add = () => pres.addSlide({ sectionTitle: cur });

  async function titleSlide(chapter, subtitle, src, Ic) {
    const s = add();
    s.background = { color: T.bg };
    s.addShape("rect", { x: 0, y: 0, w: 0.08, h: 7.5, fill: { color: T.accent }, line: { type: "none" } });
    s.addImage({ data: await icon(Ic, "#1E2A5A"), x: 8.4, y: 1.6, w: 4.4, h: 4.4 });
    txt(s, "PYTHON FOR BUSINESS DATA ANALYSIS", { x: 1.0, y: 1.6, w: 9, h: 0.4, fontFace: F.sb, fontSize: 18, color: T.accent2, charSpacing: 2 });
    txt(s, "비즈니스 데이터 분석 with Python", { x: 1.0, y: 2.1, w: 10, h: 0.9, fontFace: F.xb, fontSize: 44 });
    s.addShape("rect", { x: 1.0, y: 3.25, w: 1.6, h: 0.04, fill: { color: T.accent }, line: { type: "none" } });
    txt(s, chapter, { x: 1.0, y: 3.55, w: 9, h: 0.7, fontFace: F.b, fontSize: 32 });
    txt(s, subtitle, { x: 1.0, y: 4.3, w: 9.5, h: 0.4, fontSize: 18, color: T.text });
    txt(s, "출처 : " + src, { x: 1.0, y: 6.3, w: 10, h: 0.35, fontSize: 13, color: T.muted });
    footer(s);
  }
  async function closing(chapter) {
    const s = add();
    s.background = { color: T.bg };
    s.addShape("rect", { x: 0, y: 0, w: 0.08, h: 7.5, fill: { color: T.accent }, line: { type: "none" } });
    s.addImage({ data: await icon(si.SiPython, "#1E2A5A"), x: 8.6, y: 1.6, w: 4.0, h: 4.0 });
    txt(s, "감사합니다.", { x: 1.0, y: 2.6, w: 8, h: 1.1, fontFace: F.xb, fontSize: 54 });
    txt(s, "비즈니스 데이터 분석 with Python  ·  " + chapter, { x: 1.0, y: 3.8, w: 9, h: 0.5, fontSize: 20, color: T.text });
    txt(s, "질문은 언제든 환영합니다", { x: 1.0, y: 4.5, w: 8, h: 0.5, fontSize: 18, color: T.accent2 });
    footer(s);
  }
  async function divider(num, title, sub, items, Ic) {
    const s = add();
    s.background = { color: T.bg };
    s.addShape("rect", { x: 0, y: 0, w: W, h: 7.5, fill: { color: T.card }, line: { type: "none" } });
    s.addImage({ data: await icon(Ic, "#1E2A5A"), x: 8.3, y: 1.3, w: 4.6, h: 4.6 });
    txt(s, "SECTION", { x: 1.0, y: 1.55, w: 4, h: 0.4, fontFace: F.sb, fontSize: 18, color: T.accent2, charSpacing: 3 });
    txt(s, num, { x: 1.0, y: 1.95, w: 5, h: 1.2, fontFace: F.xb, fontSize: 72, color: T.accent2 });
    txt(s, title, { x: 1.0, y: 3.2, w: 8, h: 0.8, fontFace: F.b, fontSize: 40 });
    txt(s, sub, { x: 1.0, y: 4.0, w: 8, h: 0.5, fontSize: 18, color: T.text });
    items.forEach((it, i) => {
      s.addShape("ellipse", { x: 1.0, y: 4.83 + i * 0.42, w: 0.12, h: 0.12, fill: { color: T.accent2 }, line: { type: "none" } });
      txt(s, it, { x: 1.3, y: 4.7 + i * 0.42, w: 7, h: 0.38, fontSize: 16, valign: "middle" });
    });
    footer(s);
  }
  async function summary(section, title, rows, next) {
    const s = add();
    header(s, section, title);
    const ok = await icon(fa.FaCheckCircle, "#34D399");
    rows.forEach(([k, v], i) => {
      const y = 1.7 + i * 1.0;
      card(s, MX, y, CW, 0.85, { fill: T.card });
      s.addImage({ data: ok, x: MX + 0.25, y: y + 0.24, w: 0.38, h: 0.38 });
      txt(s, k, { x: MX + 0.85, y, w: 3.1, h: 0.85, fontFace: F.b, fontSize: 18, color: T.accent2, valign: "middle" });
      txt(s, v, { x: MX + 4.0, y, w: CW - 4.2, h: 0.85, fontSize: 16, valign: "middle" });
    });
    if (next) tip(s, MX, 6.3, CW, 0.5, "다음으로", next, T.cyan);
    footer(s);
  }
  function stepFlow(s, y, steps, h = 1.3) {
    const n = steps.length, gap = 0.35, bw = (CW - gap * (n - 1)) / n;
    steps.forEach(([t, d], i) => {
      const x = MX + i * (bw + gap);
      card(s, x, y, bw, h, { fill: T.card });
      numBadge(s, i + 1, x + 0.2, y + 0.2, 0.38);
      txt(s, t, { x: x + 0.7, y: y + 0.17, w: bw - 0.85, h: 0.45, fontFace: F.b, fontSize: 16, valign: "middle" });
      txt(s, d, { x: x + 0.2, y: y + 0.7, w: bw - 0.35, h: h - 0.8, fontSize: 14, color: T.text });
      if (i < n - 1) s.addShape("rightArrow", { x: x + bw + 0.05, y: y + h / 2 - 0.13, w: gap - 0.1, h: 0.26, fill: { color: T.accent }, line: { type: "none" } });
    });
  }
  async function refs(section, list) {
    const s = add();
    header(s, section, "참고문헌 및 참고자료");
    txt(s, list.map((r, i) => ({ text: r, options: { bullet: { type: "number" }, breakLine: i < list.length - 1 } })), { x: MX, y: 1.6, w: CW, h: 5.2, fontSize: 13, color: T.text, paraSpaceAfter: 6 });
    footer(s);
  }
  return { pres, sec, add, titleSlide, closing, divider, summary, stepFlow, refs };
}
module.exports = { makeDeck };
