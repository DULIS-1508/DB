// 01장 · 02. 파이썬 시작 — intro + 2.1 파이썬 설치
const pptxgen = require("pptxgenjs");
const si = require("react-icons/si");
const fa = require("react-icons/fa");
const vsc = require("react-icons/vsc");
const L = require("./lib");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox, browserWin, dark, hlRuns } = L;

const SRC = "wikidocs 「비즈니스 데이터 분석 with Python」(김진성)";
const S21 = "SECTION 2.1  ·  파이썬 설치", S22 = "SECTION 2.2  ·  파이썬 패키지 설치", S23 = "SECTION 2.3  ·  Google Colab";
const ANA = "Anaconda Documentation (anaconda.com/docs)";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "비즈니스 데이터 분석 with Python - 01장. 파이썬 준비 · 02. 파이썬 시작";
pres.author = "김진성";
let curSection = null;
function sec(title) { curSection = title; pres.addSection({ title }); }
function add() { return pres.addSlide({ sectionTitle: curSection }); }

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
  for (let i = 0; i < rows.length; i++) {
    const [k, v] = rows[i];
    const y = 1.7 + i * 1.0;
    card(s, MX, y, CW, 0.85, { fill: T.card });
    s.addImage({ data: await icon(fa.FaCheckCircle, "#34D399"), x: MX + 0.25, y: y + 0.24, w: 0.38, h: 0.38 });
    txt(s, k, { x: MX + 0.85, y, w: 3.1, h: 0.85, fontFace: F.b, fontSize: 18, color: T.accent2, valign: "middle" });
    txt(s, v, { x: MX + 4.0, y, w: CW - 4.2, h: 0.85, fontSize: 16, valign: "middle" });
  }
  if (next) tip(s, MX, 6.3, CW, 0.5, "다음으로", next, T.cyan);
  footer(s);
}
// numbered step flow (horizontal)
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

(async () => {
  const ctx = { pres, add, sec, divider, summary, stepFlow, SRC, S21, S22, S23, ANA };
  // ================= Title =================
  sec("표지");
  {
    const s = add();
    s.background = { color: T.bg };
    s.addShape("rect", { x: 0, y: 0, w: 0.08, h: 7.5, fill: { color: T.accent }, line: { type: "none" } });
    s.addImage({ data: await icon(si.SiGooglecolab, "#1E2A5A"), x: 8.4, y: 1.6, w: 4.4, h: 4.4 });
    txt(s, "PYTHON FOR BUSINESS DATA ANALYSIS", { x: 1.0, y: 1.6, w: 9, h: 0.4, fontFace: F.sb, fontSize: 18, color: T.accent2, charSpacing: 2 });
    txt(s, "비즈니스 데이터 분석 with Python", { x: 1.0, y: 2.1, w: 10, h: 0.9, fontFace: F.xb, fontSize: 44 });
    s.addShape("rect", { x: 1.0, y: 3.25, w: 1.6, h: 0.04, fill: { color: T.accent }, line: { type: "none" } });
    txt(s, "01장. 파이썬 준비 — 02. 파이썬 시작", { x: 1.0, y: 3.55, w: 9, h: 0.7, fontFace: F.b, fontSize: 32 });
    txt(s, "2.1 파이썬 설치  /  2.2 파이썬 패키지 설치  /  2.3 Google Colab", { x: 1.0, y: 4.3, w: 9.5, h: 0.4, fontSize: 18, color: T.text });
    txt(s, "출처 : " + SRC + "  ·  각 공식 문서로 보완", { x: 1.0, y: 6.3, w: 10, h: 0.35, fontSize: 13, color: T.muted });
    footer(s);
  }
  // ================= Contents =================
  {
    const s = add();
    header(s, "비즈니스 데이터 분석 with Python", "Contents — 01장 · 02. 파이썬 시작");
    txt(s, "실습 파일 : Chap01_파이썬준비_실습.ipynb", { x: MX, y: 1.6, w: 8, h: 0.4, fontFace: F.sb, fontSize: 16, color: T.accent2 });
    const items = [["2.1", "파이썬 설치", "내 컴퓨터에 Anaconda 설치하고\n첫 코드 실행하기", si.SiAnaconda], ["2.2", "파이썬 패키지 설치", "pip · conda 로\n필요한 도구 추가하기", fa.FaBoxOpen], ["2.3", "Google Colab", "설치 없이 웹에서\n파이썬 쓰기 (우리 수업!)", si.SiGooglecolab]];
    const cw = (CW - 0.6) / 3;
    for (let i = 0; i < 3; i++) {
      const [n, t, d, Ic] = items[i];
      const x = MX + i * (cw + 0.3), y = 2.3;
      card(s, x, y, cw, 3.9, { fill: T.card, line: i === 2 ? T.yellow : undefined, lw: 1.5 });
      await iconCircle(s, Ic, x + 0.35, y + 0.35, 0.95);
      txt(s, n, { x: x + 0.35, y: y + 1.5, w: cw - 0.7, h: 0.6, fontFace: F.xb, fontSize: 30, color: T.accent2 });
      txt(s, t, { x: x + 0.35, y: y + 2.15, w: cw - 0.6, h: 0.5, fontFace: F.b, fontSize: 21 });
      txt(s, d, { x: x + 0.35, y: y + 2.8, w: cw - 0.6, h: 0.9, fontSize: 15, color: T.text });
    }
    footer(s, SRC);
  }
  // ================= Mission =================
  {
    const s = add();
    header(s, "02. 파이썬 시작", "오늘의 미션 : 내 손으로 첫 파이썬 코드 실행하기");
    const lw = 6.2;
    card(s, MX, 1.7, lw, 4.35, { fill: T.card });
    txt(s, "오늘 수업이 끝나면 할 수 있어요", { x: MX + 0.3, y: 1.85, w: lw - 0.6, h: 0.45, fontFace: F.b, fontSize: 18, color: T.accent2 });
    const goals = ["파이썬을 쓰는 3가지 방법을 구분한다", "Anaconda를 설치하고 Jupyter를 연다", "pip / conda 로 패키지를 설치한다", "Colab에서 코드를 쓰고 실행 · 저장한다", "Colab에 내 데이터 파일을 불러온다"];
    for (let i = 0; i < goals.length; i++) {
      const y = 2.45 + i * 0.68;
      s.addImage({ data: await icon(fa.FaRegSquare, "#818CF8"), x: MX + 0.35, y: y + 0.1, w: 0.3, h: 0.3 });
      txt(s, goals[i], { x: MX + 0.85, y, w: lw - 1.1, h: 0.5, fontSize: 16, valign: "middle" });
    }
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    codeBlock(s, rx, 1.7, rw, ["print(\"Hello, Python!\")"], { label: "나의 첫 코드", fs: 18, lh: 0.5 });
    outputBox(s, rx, 3.15, rw, 0.95, "Hello, Python!", { fs: 16 });
    card(s, rx, 4.3, rw, 1.75, { fill: T.card2 });
    txt(s, [{ text: "print( ) 란?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "괄호 안의 내용을 화면에 '출력'하는 명령입니다. 따옴표 \" \" 안의 글자는 그대로 보여 줍니다." }],
      { x: rx + 0.3, y: 4.3, w: rw - 0.6, h: 1.75, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "걱정 마세요", "설치가 잘 안 되어도 괜찮습니다. 수업은 설치가 필요 없는 Colab으로 진행해요!", T.green);
    footer(s);
  }
  // ================= 3 ways =================
  {
    const s = add();
    header(s, "02. 파이썬 시작", "파이썬을 쓰는 3가지 방법 — 큰 그림 먼저");
    const ways = [[si.SiPython, "#FACC15", "① 파이썬만 설치", "python.org", "빈 주방", "언어 본체만 설치. 필요한 도구는 하나씩 직접 설치", "가볍다 / 직접 챙길 게 많다", false],
      [si.SiAnaconda, "#44A833", "② Anaconda 설치", "anaconda.com", "풀옵션 주방", "파이썬 + 분석 패키지 + Jupyter 를 한 번에 설치", "편하다 / 용량이 크다", false],
      [si.SiGooglecolab, "#F9AB00", "③ Google Colab", "colab.research.google.com", "공유 주방 (빌려 쓰기)", "설치 없이 웹 브라우저에서 바로 사용", "제일 쉽다 / 인터넷 필요", true]];
    const cw = (CW - 0.6) / 3;
    for (let i = 0; i < 3; i++) {
      const [Ic, c, h, url, an, d, pc, ours] = ways[i];
      const x = MX + i * (cw + 0.3), y = 1.65;
      card(s, x, y, cw, 4.45, { fill: T.card, line: ours ? T.yellow : undefined, lw: 2 });
      if (ours) {
        s.addShape("roundRect", { x: x + cw - 1.45, y: y + 0.25, w: 1.2, h: 0.36, rectRadius: 0.18, fill: { color: T.yellow }, line: { type: "none" } });
        txt(s, "우리 수업", { x: x + cw - 1.45, y: y + 0.25, w: 1.2, h: 0.36, fontFace: F.b, fontSize: 12, color: T.bg, align: "center", valign: "middle" });
      }
      s.addImage({ data: await icon(Ic, c), x: x + 0.3, y: y + 0.25, w: 0.75, h: 0.75 });
      txt(s, h, { x: x + 0.3, y: y + 1.15, w: cw - 0.5, h: 0.45, fontFace: F.b, fontSize: 19 });
      txt(s, url, { x: x + 0.3, y: y + 1.6, w: cw - 0.5, h: 0.35, fontFace: F.code, fontSize: 12, color: T.muted });
      s.addShape("roundRect", { x: x + 0.3, y: y + 2.1, w: cw - 0.6, h: 0.5, rectRadius: 0.1, fill: { color: c.slice(1), transparency: 82 }, line: { type: "none" } });
      txt(s, "비유 : " + an, { x: x + 0.3, y: y + 2.1, w: cw - 0.6, h: 0.5, fontFace: F.sb, fontSize: 15, align: "center", valign: "middle" });
      txt(s, d, { x: x + 0.3, y: y + 2.8, w: cw - 0.6, h: 0.85, fontSize: 15 });
      txt(s, pc, { x: x + 0.3, y: y + 3.75, w: cw - 0.6, h: 0.5, fontSize: 14, color: T.text });
    }
    tip(s, MX, 6.3, CW, 0.5, "어떤 걸 써도", "파이썬 문법은 똑같습니다. 차이는 '어디서, 얼마나 편하게' 쓰느냐 뿐이에요.");
    footer(s, "python.org, " + ANA + ", Google Colab");
  }

  // ======================= 2.1 =======================
  sec("2.1 파이썬 설치");
  await divider("2.1", "파이썬 설치", "내 컴퓨터에 Anaconda 설치하기", ["설치 전 확인 사항", "Windows · Mac 설치 순서", "설치 확인과 Jupyter Notebook 첫 실행"], si.SiAnaconda);
  {
    const s = add();
    header(s, S21, "왜 Anaconda로 설치할까?");
    const hw = (CW - 0.4) / 2;
    const cols = [[si.SiPython, "#FACC15", "python.org 파이썬", ["파이썬 언어 본체 + 표준 라이브러리", "pandas · numpy 등은 따로 설치", "에디터(Jupyter)도 따로 설치"], T.muted],
      [si.SiAnaconda, "#44A833", "Anaconda Distribution", ["파이썬 + 표준 라이브러리", "pandas · numpy · matplotlib 등 분석 패키지 포함", "Jupyter · Navigator · conda 포함"], T.green]];
    for (let i = 0; i < 2; i++) {
      const [Ic, c, h, pts, lc] = cols[i];
      const x = MX + i * (hw + 0.4);
      card(s, x, 1.7, hw, 3.2, { fill: T.card, line: i ? T.green : undefined, lw: 1.5 });
      s.addImage({ data: await icon(Ic, c), x: x + 0.3, y: 1.95, w: 0.65, h: 0.65 });
      txt(s, h, { x: x + 1.15, y: 1.95, w: hw - 1.35, h: 0.65, fontFace: F.b, fontSize: 20, valign: "middle" });
      for (let j = 0; j < 3; j++) {
        const y = 2.95 + j * 0.6;
        s.addImage({ data: await icon(i ? fa.FaCheck : fa.FaMinus, i ? "#34D399" : "#8A93B8"), x: x + 0.35, y: y + 0.12, w: 0.22, h: 0.22 });
        txt(s, pts[j], { x: x + 0.75, y, w: hw - 1.0, h: 0.46, fontSize: 15, valign: "middle" });
      }
    }
    card(s, MX, 5.1, CW, 1.0, { fill: T.card2 });
    txt(s, [{ text: "결론  ", options: { fontFace: F.b, color: T.yellow } }, { text: "데이터 분석에 필요한 도구를 한 번에 설치해 주므로, 처음 배우는 사람에게는 Anaconda가 편합니다. (최신 Anaconda 2025.12에는 Python 3.13이 들어 있습니다)" }],
      { x: MX + 0.3, y: 5.1, w: CW - 0.6, h: 1.0, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "참고", "둘 다 설치할 필요는 없습니다. 하나만 고르세요!", T.cyan);
    footer(s, SRC + ", " + ANA + " — Release notes 2025.12");
  }
  {
    const s = add();
    header(s, S21, "설치 전에 확인하기");
    const chk = [[fa.FaDesktop, "운영체제", "Windows / macOS / Linux 중 무엇인지", "Windows : 설정 → 시스템 → 정보"], [fa.FaMicrochip, "Mac 칩 종류", "Apple 실리콘(M1~)인지 Intel인지", "Mac : 왼쪽 위 사과 → 이 Mac에 관하여"],
      [fa.FaHdd, "저장 공간", "설치에 수 GB가 필요", "여유 공간을 넉넉히 확보"], [fa.FaUser, "사용자 이름", "Windows 사용자 폴더 이름에 한글 · 띄어쓰기가 있는지", "C:\\Users\\홍길동 → 문제 생길 수 있음"]];
    const cw = (CW - 0.3) / 2;
    for (let i = 0; i < 4; i++) {
      const [Ic, h, d, how] = chk[i];
      const x = MX + (i % 2) * (cw + 0.3), y = 1.7 + Math.floor(i / 2) * 2.15;
      card(s, x, y, cw, 1.95, { fill: T.card, line: i === 3 ? T.pink : undefined, lw: 1.25 });
      await iconCircle(s, Ic, x + 0.3, y + 0.3, 0.8, i === 3 ? T.pink : T.accent);
      txt(s, h, { x: x + 1.3, y: y + 0.25, w: cw - 1.5, h: 0.45, fontFace: F.b, fontSize: 18 });
      txt(s, d, { x: x + 1.3, y: y + 0.72, w: cw - 1.5, h: 0.55, fontSize: 15 });
      txt(s, how, { x: x + 1.3, y: y + 1.3, w: cw - 1.5, h: 0.45, fontSize: 13, color: T.text });
    }
    tip(s, MX, 6.3, CW, 0.5, "가장 흔한 실패 원인", "한글 사용자 이름! 설치 경로에 한글이 들어가면 오류가 날 수 있어요. 이때는 C:\\anaconda3 처럼 영어 경로로 설치하세요.", T.pink, 14);
    footer(s, ANA);
  }
  {
    const s = add();
    header(s, S21, "설치 순서 한눈에 보기 (Windows 기준)");
    stepFlow(s, 1.75, [["다운로드", "내 운영체제용\n설치 파일 받기"], ["파일 실행", ".exe 더블클릭\n→ Next"], ["옵션 선택", "Just Me,\nPATH 체크 안 함"], ["설치 완료", "Install → Finish\n(몇 분 걸림)"], ["실행 확인", "Prompt 에서\n버전 확인"]], 2.0);
    const hw = (CW - 0.4) / 2;
    card(s, MX, 4.0, hw, 2.05, { fill: T.card2 });
    txt(s, [{ text: "설치되는 것들", options: { fontFace: F.b, color: T.accent2, breakLine: true } }, { text: "Python · conda · Anaconda Navigator · Jupyter Notebook · Anaconda Prompt · 수백 개의 분석 패키지" }],
      { x: MX + 0.3, y: 4.0, w: hw - 0.6, h: 2.05, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    card(s, MX + hw + 0.4, 4.0, hw, 2.05, { fill: T.card2 });
    txt(s, [{ text: "시간이 걸려요", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "파일이 커서 다운로드와 설치에 시간이 걸립니다. 설치 중 창이 멈춘 것처럼 보여도 기다려 주세요." }],
      { x: MX + hw + 0.7, y: 4.0, w: hw - 0.6, h: 2.05, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "Mac 사용자", ".pkg 설치 파일을 받아 '계속' 버튼을 눌러 진행합니다. 칩 종류(Apple 실리콘 / Intel)에 맞는 파일을 고르세요.", T.cyan, 15);
    footer(s, ANA + " — Installing on Windows / macOS");
  }
  {
    const s = add();
    header(s, S21, "① 다운로드 — anaconda.com/download");
    const bw = 7.6;
    const c = browserWin(s, MX, 1.7, bw, 4.4, "https://www.anaconda.com/download");
    s.addImage({ data: await icon(si.SiAnaconda, "#44A833"), x: c.x + 0.2, y: c.y + 0.15, w: 0.5, h: 0.5 });
    dark(s, "Download Anaconda Distribution", { x: c.x + 0.85, y: c.y + 0.15, w: c.w - 1, h: 0.5, fontFace: F.b, fontSize: 20, valign: "middle" });
    const oss = [[fa.FaWindows, "Windows", "64-Bit Graphical Installer"], [fa.FaApple, "Mac", "Apple Silicon / Intel"], [fa.FaLinux, "Linux", "64-Bit Installer"]];
    const ow = (c.w - 0.6) / 3;
    for (let i = 0; i < 3; i++) {
      const [Ic, n, d] = oss[i];
      const x = c.x + 0.1 + i * (ow + 0.2), y = c.y + 1.0;
      s.addShape("roundRect", { x, y, w: ow, h: 2.3, rectRadius: 0.1, fill: { color: "FFFFFF" }, line: { color: i === 0 ? "44A833" : "CBD5E1", width: i === 0 ? 2 : 1 } });
      s.addImage({ data: await icon(Ic, "#334155"), x: x + ow / 2 - 0.3, y: y + 0.2, w: 0.6, h: 0.6 });
      dark(s, n, { x, y: y + 0.9, w: ow, h: 0.4, fontFace: F.b, fontSize: 16, align: "center" });
      dark(s, d, { x: x + 0.1, y: y + 1.3, w: ow - 0.2, h: 0.4, fontSize: 11, align: "center", color: "475569" });
      s.addShape("roundRect", { x: x + 0.25, y: y + 1.75, w: ow - 0.5, h: 0.38, rectRadius: 0.19, fill: { color: "44A833" }, line: { type: "none" } });
      txt(s, "Download", { x: x + 0.25, y: y + 1.75, w: ow - 0.5, h: 0.38, fontFace: F.b, fontSize: 12, align: "center", valign: "middle" });
    }
    txt(s, "(화면 구성을 단순화한 그림)", { x: MX, y: 6.15, w: 4, h: 0.3, fontSize: 11, color: T.muted });
    const rx = MX + bw + 0.35, rw = CW - bw - 0.35;
    explainList(s, rx, 1.7, rw, [[1, "주소 입력", "anaconda.com/download"], [2, "이메일 입력은 선택", "Skip registration 가능"], [3, "운영체제 고르기", "Windows : 64-Bit 설치 파일"], [4, "파일 확인", "Anaconda3-….exe 저장됨"]], { ih: 0.98, gap: 0.14 });
    footer(s, ANA + " — Installing Anaconda Distribution");
  }
  {
    const s = add();
    header(s, S21, "② ~ ④ 설치 프로그램에서 고를 것 (Windows)");
    const dw = 7.2;
    // installer dialog mock
    s.addShape("rect", { x: MX, y: 1.7, w: dw, h: 4.4, fill: { color: "F1F5F9" }, line: { color: T.muted, width: 0.75 } });
    s.addShape("rect", { x: MX, y: 1.7, w: dw, h: 0.4, fill: { color: "E2E8F0" }, line: { type: "none" } });
    dark(s, "Anaconda3 Setup", { x: MX + 0.2, y: 1.7, w: 4, h: 0.4, fontSize: 12, valign: "middle" });
    dark(s, "Select Installation Type", { x: MX + 0.3, y: 2.25, w: dw - 0.6, h: 0.4, fontFace: F.b, fontSize: 16 });
    const opt = [["Just Me (recommended)", true], ["All Users (requires admin privileges)", false]];
    opt.forEach(([o, on], i) => {
      const y = 2.8 + i * 0.45;
      s.addShape("ellipse", { x: MX + 0.45, y: y + 0.08, w: 0.22, h: 0.22, fill: { color: "FFFFFF" }, line: { color: "334155", width: 1 } });
      if (on) s.addShape("ellipse", { x: MX + 0.5, y: y + 0.13, w: 0.12, h: 0.12, fill: { color: "2563EB" }, line: { type: "none" } });
      dark(s, o, { x: MX + 0.8, y, w: dw - 1.2, h: 0.38, fontSize: 14, valign: "middle" });
    });
    numBadge(s, 1, MX + dw - 0.6, 2.85, 0.32);
    dark(s, "Destination Folder", { x: MX + 0.3, y: 3.85, w: 4, h: 0.35, fontFace: F.b, fontSize: 14 });
    s.addShape("rect", { x: MX + 0.45, y: 4.25, w: dw - 1.6, h: 0.38, fill: { color: "FFFFFF" }, line: { color: "94A3B8", width: 0.75 } });
    dark(s, "C:\\Users\\student\\anaconda3", { x: MX + 0.55, y: 4.25, w: dw - 1.8, h: 0.38, fontFace: F.code, fontSize: 13, valign: "middle" });
    numBadge(s, 2, MX + dw - 0.6, 4.28, 0.32);
    const ck = [["Add Anaconda3 to my PATH environment variable", false], ["Register Anaconda3 as my default Python", true]];
    ck.forEach(([o, on], i) => {
      const y = 4.9 + i * 0.45;
      s.addShape("rect", { x: MX + 0.45, y: y + 0.08, w: 0.22, h: 0.22, fill: { color: on ? "2563EB" : "FFFFFF" }, line: { color: "334155", width: 1 } });
      dark(s, o, { x: MX + 0.8, y, w: dw - 1.6, h: 0.38, fontSize: 13, valign: "middle" });
    });
    numBadge(s, 3, MX + dw - 0.6, 4.95, 0.32);
    const rx = MX + dw + 0.35, rw = CW - dw - 0.35;
    explainList(s, rx, 1.7, rw, [[1, "Just Me 선택", "내 계정에만 설치 (공식 권장)"], [2, "설치 경로 확인", "경로에 한글 · 띄어쓰기가 없어야 안전"], [3, "PATH 추가는 체크 안 함", "다른 프로그램과 충돌할 수 있어 공식적으로 권장하지 않음"]], { ih: 1.2, gap: 0.15 });
    tip(s, rx, 5.65, rw, 0.45, "나머지는", "기본값 그대로 Next / Install", T.green, 14);
    txt(s, "(설치 화면을 단순화한 그림 — 버전에 따라 문구가 조금 다를 수 있음)", { x: MX, y: 6.2, w: dw, h: 0.3, fontSize: 11, color: T.muted });
    footer(s, ANA + " — Installing on Windows");
  }
  {
    const s = add();
    header(s, S21, "⑤ 설치 확인 — Anaconda Prompt 에서 버전 보기");
    const lw = 6.8;
    txt(s, "시작 메뉴 → 'Anaconda Prompt' 검색 → 실행  (Mac : 터미널 앱)", { x: MX, y: 1.6, w: CW, h: 0.4, fontSize: 16, color: T.text });
    codeBlock(s, MX, 2.15, lw, ["python --version", "conda --version"], { label: "Anaconda Prompt", fs: 16, lh: 0.42, markers: { 0: 1, 1: 2 } });
    outputBox(s, MX, 3.75, lw, 1.15, "Python 3.13.9\nconda 25.x.x", { fs: 15 });
    txt(s, "(버전 숫자는 설치 시점에 따라 다를 수 있음)", { x: MX, y: 4.95, w: lw, h: 0.3, fontSize: 11, color: T.muted });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    explainList(s, rx, 2.15, rw, [[1, "python --version", "설치된 파이썬 버전 보기"], [2, "conda --version", "conda 패키지 관리자 버전 보기"]], { ih: 1.0, gap: 0.15 });
    card(s, rx, 4.4, rw, 1.7, { fill: T.card2, line: T.pink });
    txt(s, [{ text: "'python'은(는) 내부 또는 외부 명령이 아닙니다…", options: { fontFace: F.b, color: T.pink, breakLine: true } }, { text: "일반 '명령 프롬프트(cmd)'에서 입력했을 때 흔히 나와요. 꼭 'Anaconda Prompt'에서 입력하세요." }],
      { x: rx + 0.25, y: 4.4, w: rw - 0.5, h: 1.7, fontSize: 14, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "성공!", "버전 숫자가 보이면 설치 완료입니다.", T.green);
    footer(s, ANA + " — Verifying your installation");
  }
  {
    const s = add();
    header(s, S21, "Anaconda Navigator — 클릭으로 프로그램 실행");
    const bw = 7.6;
    s.addShape("rect", { x: MX, y: 1.7, w: bw, h: 4.4, fill: { color: "F8FAFC" }, line: { color: T.muted, width: 0.75 } });
    s.addShape("rect", { x: MX, y: 1.7, w: 1.6, h: 4.4, fill: { color: "E2E8F0" }, line: { type: "none" } });
    s.addImage({ data: await icon(si.SiAnaconda, "#44A833"), x: MX + 0.2, y: 1.85, w: 0.4, h: 0.4 });
    dark(s, "Navigator", { x: MX + 0.65, y: 1.85, w: 0.95, h: 0.4, fontFace: F.b, fontSize: 11, valign: "middle" });
    ["Home", "Environments", "Learning"].forEach((m, i) => dark(s, m, { x: MX + 0.25, y: 2.5 + i * 0.45, w: 1.3, h: 0.35, fontSize: 12, fontFace: i === 0 ? F.b : F.r, valign: "middle" }));
    const apps = [[si.SiJupyter, "#F37626", "Jupyter Notebook", true], [si.SiJupyter, "#F37626", "JupyterLab", false], [si.SiSpyderide, "#EE2B2B", "Spyder", false], [vsc.VscCode, "#3B82F6", "VS Code", false]];
    const aw = (bw - 1.6 - 0.75) / 2;
    for (let i = 0; i < 4; i++) {
      const [Ic, c, n, on] = apps[i];
      const x = MX + 1.85 + (i % 2) * (aw + 0.25), y = 1.95 + Math.floor(i / 2) * 2.0;
      s.addShape("roundRect", { x, y, w: aw, h: 1.8, rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { color: on ? "F37626" : "CBD5E1", width: on ? 2 : 1 } });
      s.addImage({ data: await icon(Ic, c), x: x + aw / 2 - 0.3, y: y + 0.15, w: 0.6, h: 0.6 });
      dark(s, n, { x, y: y + 0.8, w: aw, h: 0.35, fontFace: F.b, fontSize: 13, align: "center" });
      s.addShape("roundRect", { x: x + aw / 2 - 0.55, y: y + 1.25, w: 1.1, h: 0.36, rectRadius: 0.18, fill: { color: on ? "2563EB" : "94A3B8" }, line: { type: "none" } });
      txt(s, "Launch", { x: x + aw / 2 - 0.55, y: y + 1.25, w: 1.1, h: 0.36, fontFace: F.b, fontSize: 12, align: "center", valign: "middle" });
    }
    numBadge(s, 1, MX + 1.85 + aw - 0.45, 3.15, 0.32);
    txt(s, "(화면 구성을 단순화한 그림 — 설치된 앱에 따라 다름)", { x: MX, y: 6.15, w: bw, h: 0.3, fontSize: 11, color: T.muted });
    const rx = MX + bw + 0.35, rw = CW - bw - 0.35;
    card(s, rx, 1.7, rw, 2.0, { fill: T.card });
    txt(s, [{ text: "Navigator 란?", options: { fontFace: F.b, color: T.accent2, breakLine: true } }, { text: "명령어 없이 마우스 클릭만으로 Jupyter · Spyder 등을 실행하고 패키지를 관리하는 '메뉴판' 프로그램" }],
      { x: rx + 0.25, y: 1.7, w: rw - 0.5, h: 2.0, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    explainList(s, rx, 3.9, rw, [[1, "Jupyter → Launch", "브라우저에 노트북 화면이 열림"]], { ih: 1.1 });
    tip(s, rx, 5.2, rw, 0.9, "단축 경로", "시작 메뉴에서 'Jupyter Notebook'을 바로 실행해도 됩니다.", T.cyan, 14);
    footer(s, ANA + " — Anaconda Navigator");
  }
  {
    const s = add();
    header(s, S21, "Jupyter Notebook 첫 실행 — 새 노트북 만들기");
    stepFlow(s, 1.65, [["브라우저 열림", "주소 : localhost:8888\n(내 컴퓨터 안의 주소)"], ["폴더 이동", "실습 파일을 둘\n폴더를 클릭"], ["새 노트북", "New → Notebook\n→ Python 3 선택"], ["코드 실행", "코드 입력 후\nShift + Enter"]], 1.55);
    const lw = 7.2;
    codeBlock(s, MX, 3.45, lw, ["print(\"Hello, Python!\")", "1 + 2"], { label: "Untitled.ipynb — Jupyter Notebook", fs: 16, lh: 0.42 });
    outputBox(s, MX, 4.95, lw, 1.15, "Hello, Python!\n3", { fs: 15 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 3.45, rw, 2.65, { fill: T.card2 });
    txt(s, [{ text: "localhost 란?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "인터넷 사이트가 아니라 '내 컴퓨터'를 뜻하는 주소입니다. Jupyter는 내 컴퓨터에서 돌아가고, 화면만 브라우저로 보여 줍니다.", options: { breakLine: true } },
      { text: " ", options: { fontSize: 6, breakLine: true } }, { text: "검은 창(서버)을 닫으면 Jupyter도 꺼져요!", options: { fontFace: F.sb, color: T.pink } }],
      { x: rx + 0.25, y: 3.45, w: rw - 0.5, h: 2.65, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "저장", "노트북 파일은 .ipynb 확장자로 저장됩니다. Colab에서도 그대로 열 수 있어요.", T.green);
    footer(s, "Project Jupyter Documentation (docs.jupyter.org)");
  }
  {
    const s = add();
    header(s, S21, "설치할 때 자주 만나는 문제와 해결법");
    const rows = [["증상", "원인", "해결"], ["설치 중 오류 · 실행이 안 됨", "설치 경로에 한글 · 띄어쓰기", "C:\\anaconda3 처럼 영어 경로로 재설치"], ["'python'은(는) 내부 또는 외부 명령이 아닙니다", "일반 cmd 에서 실행", "Anaconda Prompt 에서 실행"],
      ["설치가 너무 오래 걸림", "파일이 크고 패키지가 많음", "멈춘 것이 아니니 기다리기"], ["백신 · 보안 경고 창", "새 프로그램 설치 확인", "공식 사이트에서 받은 파일이면 허용"], ["Jupyter 창이 바로 꺼짐", "검은 서버 창을 닫음", "서버 창은 켜 둔 채 사용"]];
    const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: i === 0 || j === 0 ? F.b : F.r, fontSize: i === 0 ? 16 : 14, color: i === 0 ? T.white : j === 0 ? T.pink : j === 2 ? T.green : T.text,
      fill: { color: i === 0 ? T.card2 : (i % 2 ? T.card : T.bg) }, valign: "middle", margin: [0.04, 0.15, 0.04, 0.15] } })));
    s.addTable(tbl, { x: MX, y: 1.7, w: CW, colW: [4.2, 3.6, CW - 7.8], rowH: 0.7, border: { type: "solid", color: "1E2A5A", pt: 1 } });
    tip(s, MX, 6.3, CW, 0.5, "그래도 안 되면?", "괜찮습니다! 우리 수업은 Colab으로 진행하니, 설치 문제는 수업 후 함께 해결해요.", T.yellow);
    footer(s, ANA + " — Troubleshooting");
  }
  {
    const s = add();
    header(s, S21, "참고 · python.org 에서 파이썬만 설치할 때");
    const lw = 7.0;
    s.addShape("rect", { x: MX, y: 1.7, w: lw, h: 3.4, fill: { color: "F1F5F9" }, line: { color: T.muted, width: 0.75 } });
    s.addShape("rect", { x: MX, y: 1.7, w: lw, h: 0.4, fill: { color: "E2E8F0" }, line: { type: "none" } });
    dark(s, "Python 3.14 Setup", { x: MX + 0.2, y: 1.7, w: 4, h: 0.4, fontSize: 12, valign: "middle" });
    dark(s, "Install Python 3.14 (64-bit)", { x: MX + 0.3, y: 2.25, w: lw - 0.6, h: 0.45, fontFace: F.b, fontSize: 17 });
    s.addShape("roundRect", { x: MX + 0.3, y: 2.85, w: 3.2, h: 0.5, rectRadius: 0.05, fill: { color: "FFFFFF" }, line: { color: "2563EB", width: 1.5 } });
    dark(s, "→ Install Now", { x: MX + 0.45, y: 2.85, w: 3, h: 0.5, fontFace: F.b, fontSize: 14, valign: "middle", color: "2563EB" });
    dark(s, "→ Customize installation", { x: MX + 0.45, y: 3.45, w: 3.5, h: 0.4, fontSize: 13, valign: "middle", color: "475569" });
    s.addShape("rect", { x: MX + 0.35, y: 4.35, w: 0.24, h: 0.24, fill: { color: "2563EB" }, line: { color: "334155", width: 1 } });
    dark(s, "Add python.exe to PATH", { x: MX + 0.75, y: 4.28, w: 4, h: 0.38, fontFace: F.b, fontSize: 14, valign: "middle" });
    s.addShape("ellipse", { x: MX + 0.15, y: 4.12, w: 3.8, h: 0.7, fill: { color: "FFFFFF", transparency: 100 }, line: { color: T.pink, width: 2.5 } });
    txt(s, "(설치 화면을 단순화한 그림)", { x: MX, y: 5.15, w: 4, h: 0.3, fontSize: 11, color: T.muted });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    explainList(s, rx, 1.7, rw, [[1, "python.org/downloads", "최신 버전 다운로드 (현재 3.14)"], [2, "PATH 체크 꼭!", "맨 아래 Add python.exe to PATH"], [3, "Install Now", "기본 설정으로 설치"]], { ih: 1.1, gap: 0.15 });
    tip(s, MX, 6.3, CW, 0.5, "헷갈리지 마세요", "Anaconda 는 PATH 체크 안 함(권장),  python.org 설치는 PATH 체크(권장) — 설치 방법마다 다릅니다.", T.pink, 15);
    footer(s, "Python Documentation — Using Python on Windows (docs.python.org)");
  }
  await summary(S21, "2.1 핵심 정리", [
    ["3가지 방법", "python.org(빈 주방) · Anaconda(풀옵션 주방) · Colab(빌려 쓰는 주방)"],
    ["Anaconda 설치", "anaconda.com/download → Just Me → 영어 경로 → PATH 체크 안 함"],
    ["설치 확인", "Anaconda Prompt 에서 python --version / conda --version"],
    ["Jupyter 실행", "Navigator 또는 시작 메뉴 → 브라우저에서 New → Notebook"],
  ], "설치한 파이썬에 도구를 더 추가하려면? → 2.2 파이썬 패키지 설치");

  await require("./c2b")(ctx);
  await require("./c2c")(ctx);
  await pres.writeFile({ fileName: process.argv[2] || "CH02.pptx" });
})();
