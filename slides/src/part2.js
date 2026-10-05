// Section 1.1 (rest), 1.2 editors, 1.3 libraries
const si = require("react-icons/si");
const fa = require("react-icons/fa");
const vsc = require("react-icons/vsc");
const tb = require("react-icons/tb");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox } = require("./lib");

module.exports = async function ({ pres, add, sec, divider, summary, SRC, S11, S12, S13, S14 }) {
  // ---------- 1.1 popularity ----------
  {
    const s = add();
    header(s, S11, "지금, 세계에서 가장 인기 있는 언어 중 하나");
    const cw = 7.3;
    card(s, MX, 1.65, cw, 4.4, { fill: T.card });
    s.addChart(pres.charts.BAR, [{ name: "사용 비율(%)", labels: ["JavaScript", "HTML/CSS", "SQL", "Python", "Bash/Shell", "TypeScript", "Java"], values: [66.0, 61.9, 58.6, 57.9, 48.7, 43.6, 29.4] }], {
      x: MX + 0.15, y: 1.75, w: cw - 0.3, h: 4.2, barDir: "bar", catAxisOrientation: "maxMin",
      showTitle: true, title: "개발자가 사용하는 언어 (Stack Overflow 2025, %)", titleFontFace: "+mn-lt", titleFontSize: 14, titleColor: T.white,
      chartColors: [T.accent, T.accent, T.accent, T.yellow, T.accent, T.accent, T.accent], showValue: true, dataLabelPosition: "outEnd", dataLabelColor: T.white, dataLabelFontSize: 12, dataLabelFontFace: "+mn-lt", dataLabelFormatCode: "0.0",
      catAxisLabelColor: T.text, catAxisLabelFontSize: 13, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showLegend: false, barGapWidthPct: 45, valAxisMaxVal: 80, plotArea: { fill: { color: T.card } },
    });
    const rx = MX + cw + 0.3, rw = CW - cw - 0.3;
    const stats = [["+7%p", "1년 새 사용률 상승\n(2024→2025, 역대 최대)", T.yellow], ["1위", "IEEE Spectrum 2025\n(종합 · 구인 수요)", T.green], ["1위", "TIOBE 인기 지수\n(검색량 기반, 2026)", T.cyan]];
    stats.forEach(([n, l, c], i) => {
      const y = 1.65 + i * 1.5;
      card(s, rx, y, rw, 1.3, { fill: T.card2 });
      txt(s, n, { x: rx + 0.2, y, w: 1.55, h: 1.3, fontFace: F.xb, fontSize: 30, color: c, valign: "middle" });
      txt(s, l, { x: rx + 1.75, y, w: rw - 1.85, h: 1.3, fontSize: 14, valign: "middle" });
    });
    tip(s, MX, 6.2, CW, 0.5, "왜 인기일까?", "데이터 분석 · 인공지능(AI) · 자동화의 핵심 도구이기 때문. 브라우저용 PyScript(2022)도 등장!", T.yellow, 15);
    footer(s, "Stack Overflow Developer Survey 2025, IEEE Spectrum Top Programming Languages 2025, TIOBE Index");
    s.addNotes("JavaScript, HTML/CSS는 웹 개발자가 많아 높게 나옵니다. 파이썬은 데이터·AI 붐으로 2025년 한 해에만 7%p 상승했습니다. 원문의 Stack Overflow Insights(질문 비중 증가) 내용을 최신 설문 수치로 보완했습니다.");
  }
  await summary(S11, "1.1 핵심 정리", [
    ["프로그래밍 언어", "컴퓨터에게 일을 시키기 위한 '외국어'. 파이썬은 영어 문장처럼 읽혀 배우기 쉽다."],
    ["탄생", "1989년 귀도 반 로섬이 시작, 이름은 코미디 쇼 〈몬티 파이썬〉에서 유래"],
    ["버전", "Python 2와 3은 호환되지 않음. 지금은 Python 3 (최신 3.14)"],
    ["인기", "데이터 · AI 분야 덕분에 각종 순위 1위권 — 개발자 57.9%가 사용"],
  ], "그럼 파이썬 코드는 어디에 쓰고 실행할까요? → 1.2 파이썬 에디터");

  // ================= 1.2 =================
  sec("1.2 파이썬 에디터");
  await divider("1.2", "파이썬 에디터", "파이썬 코드는 어디에 쓰고, 어떻게 실행할까?", ["에디터란 무엇이고 어떤 기능이 있나", "대표 에디터 7가지 비교", "우리 수업은 무엇을 쓰나 — Google Colab"], vsc.VscCode);

  {
    const s = add();
    header(s, S12, "에디터 = 코드를 쓰는 '워드 프로그램'");
    const hw = (CW - 0.5) / 2;
    const cols = [[fa.FaFileWord, "글을 쓸 때", "한글 · MS 워드", ["문서 작성", "맞춤법 검사 (빨간 밑줄)", "인쇄해서 결과 확인"], T.cyan],
      [vsc.VscCode, "코드를 쓸 때", "파이썬 에디터", ["코드 작성", "문법 오류 표시 (빨간 밑줄)", "실행해서 결과 확인"], T.yellow]];
    for (let i = 0; i < 2; i++) {
      const [Ic, h, sub, items, c] = cols[i];
      const x = MX + i * (hw + 0.5);
      card(s, x, 1.7, hw, 3.3, { fill: T.card, line: c, lw: 1.25 });
      await iconCircle(s, Ic, x + 0.3, 1.95, 0.85, c, "#FFFFFF", 60);
      txt(s, h, { x: x + 1.4, y: 1.95, w: hw - 1.6, h: 0.4, fontFace: F.b, fontSize: 18, color: c });
      txt(s, sub, { x: x + 1.4, y: 2.35, w: hw - 1.6, h: 0.45, fontFace: F.b, fontSize: 20 });
      items.forEach((it, j) => {
        const y = 3.1 + j * 0.6;
        numBadge(s, j + 1, x + 0.35, y + 0.05, 0.32, T.accent);
        txt(s, it, { x: x + 0.85, y, w: hw - 1.1, h: 0.42, fontSize: 16, valign: "middle" });
      });
    }
    txt(s, "=", { x: MX + hw, y: 2.9, w: 0.5, h: 0.6, fontFace: F.xb, fontSize: 30, color: T.accent2, align: "center" });
    card(s, MX, 5.2, CW, 0.8, { fill: T.card2 });
    txt(s, [{ text: "정의  ", options: { fontFace: F.b, color: T.accent2 } }, { text: "에디터(editor)는 파이썬 코드를 작성하고 실행할 수 있는 소프트웨어 도구입니다. 파이썬으로 프로그램을 만들려면 에디터가 필요합니다." }],
      { x: MX + 0.3, y: 5.2, w: CW - 0.6, h: 0.8, fontSize: 16, valign: "middle" });
    tip(s, MX, 6.2, CW, 0.5, "좋은 소식", "Google Colab을 쓰면 아무것도 설치하지 않고 인터넷 브라우저에서 바로 코드를 쓸 수 있습니다.", T.green);
    footer(s, SRC);
  }

  {
    const s = add();
    header(s, S12, "에디터가 해 주는 7가지 일");
    const f = [[fa.FaPalette, "코드 작성 · 문법 강조", "단어 종류별로 색을 칠해 읽기 쉽게"], [fa.FaMagic, "자동 완성", "앞 글자만 쓰면 나머지를 추천"], [fa.FaBug, "디버깅", "한 줄씩 실행하며 오류 찾기"],
      [fa.FaPlay, "즉시 실행", "버튼 하나로 실행, 결과 바로 확인"], [fa.FaAlignLeft, "코드 포맷팅", "들여쓰기 · 띄어쓰기 자동 정리"], [fa.FaCodeBranch, "버전 관리 (Git)", "변경 기록 저장, 협업"], [fa.FaPuzzlePiece, "플러그인 · 확장", "필요한 기능을 앱처럼 추가"]];
    const cw = (CW - 0.9) / 4, ch = 2.15;
    for (let i = 0; i < 7; i++) {
      const [Ic, h, b] = f[i];
      const x = MX + (i % 4) * (cw + 0.3), y = 1.65 + Math.floor(i / 4) * (ch + 0.25);
      card(s, x, y, cw, ch, { fill: T.card });
      numBadge(s, i + 1, x + cw - 0.55, y + 0.25, 0.32, T.accent);
      await iconCircle(s, Ic, x + 0.25, y + 0.25, 0.75);
      txt(s, h, { x: x + 0.25, y: y + 1.1, w: cw - 0.4, h: 0.4, fontFace: F.b, fontSize: 16, color: T.accent2 });
      txt(s, b, { x: x + 0.25, y: y + 1.5, w: cw - 0.4, h: 0.55, fontSize: 14 });
    }
    const x = MX + 3 * (cw + 0.3), y = 1.65 + ch + 0.25;
    card(s, x, y, cw, ch, { fill: T.yellow, ft: 88, line: T.yellow });
    txt(s, [{ text: "처음엔 이것만!", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "① 작성  ④ 실행\n두 가지만 알면 충분합니다. 나머지는 쓰다 보면 자연스럽게 익혀요." }],
      { x: x + 0.25, y: y + 0.15, w: cw - 0.5, h: ch - 0.3, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    footer(s, SRC);
  }

  {
    const s = add();
    header(s, S12, "눈으로 보는 '문법 강조'와 '자동 완성'");
    const hw = (CW - 0.5) / 2;
    txt(s, "메모장에서 쓴 코드 (색 없음)", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.muted });
    s.addShape("roundRect", { x: MX, y: 2.05, w: hw, h: 1.5, rectRadius: 0.08, fill: { color: "F8FAFC" }, line: { color: T.muted, width: 0.75 } });
    txt(s, "import pandas as pd\n# 판매 데이터 읽기\ndata = pd.read_csv(\"sales.csv\")", { x: MX + 0.25, y: 2.15, w: hw - 0.5, h: 1.3, fontFace: F.code, fontSize: 15, color: "1E293B", valign: "middle", lineSpacing: 26 });
    txt(s, "에디터에서 쓴 코드 (문법 강조)", { x: MX + hw + 0.5, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeBlock(s, MX + hw + 0.5, 2.05, hw, ["import pandas as pd", "# 판매 데이터 읽기", "data = pd.read_csv(\"sales.csv\")"], { label: "에디터", fs: 15, lh: 0.3 });
    const lg = [["F472B6", "명령어 (import, as)"], ["7C89B8", "# 주석 = 메모"], ["FCD34D", "\"문자열\""]];
    lg.forEach(([c, l], i) => {
      const x = MX + hw + 0.5 + i * 2.0;
      s.addShape("rect", { x, y: 3.8, w: 0.2, h: 0.2, fill: { color: c }, line: { type: "none" } });
      txt(s, l, { x: x + 0.3, y: 3.75, w: 1.75, h: 0.3, fontSize: 12, color: T.text, valign: "middle" });
    });
    // autocomplete mock
    txt(s, "자동 완성 : 'pd.re' 까지만 치면…", { x: MX, y: 4.1, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.accent2 });
    s.addShape("roundRect", { x: MX, y: 4.55, w: hw, h: 0.5, rectRadius: 0.06, fill: { color: T.codeBg }, line: { color: T.accent, width: 1, transparency: 40 } });
    txt(s, [{ text: "data = pd.re", options: { color: T.codeText } }, { text: "|", options: { color: T.yellow } }], { x: MX + 0.25, y: 4.55, w: hw - 0.5, h: 0.5, fontFace: F.code, fontSize: 15, valign: "middle" });
    const opts = ["read_csv", "read_excel", "read_json"];
    s.addShape("rect", { x: MX + 1.6, y: 5.05, w: 2.6, h: 1.05, fill: { color: "1E2A5A" }, line: { color: T.accent2, width: 1 } });
    opts.forEach((o, i) => {
      if (i === 0) s.addShape("rect", { x: MX + 1.6, y: 5.05, w: 2.6, h: 0.35, fill: { color: T.accent }, line: { type: "none" } });
      txt(s, o, { x: MX + 1.75, y: 5.05 + i * 0.35, w: 2.4, h: 0.35, fontFace: F.code, fontSize: 14, color: T.white, valign: "middle" });
    });
    txt(s, "← 후보 목록\nTab 키로 선택", { x: MX + 4.35, y: 5.1, w: hw - 4.35, h: 0.9, fontSize: 14, color: T.text });
    card(s, MX + hw + 0.5, 4.1, hw, 2.0, { fill: T.card2 });
    txt(s, [{ text: "왜 중요할까?", options: { fontFace: F.b, color: T.accent2, breakLine: true } },
      { text: "색깔 덕분에 오타를 바로 알아챌 수 있고(따옴표를 안 닫으면 노란색이 끝까지 번짐), 긴 함수 이름을 외우지 않아도 됩니다." }],
      { x: MX + hw + 0.75, y: 4.1, w: hw - 0.5, h: 2.0, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "초보자 포인트", "코드 색이 이상하게 변했다면? 따옴표나 괄호를 안 닫은 경우가 대부분입니다.");
    footer(s);
  }

  {
    const s = add();
    header(s, S12, "대표 파이썬 에디터 한눈에 보기");
    const eds = [[si.SiJupyter, "#F37626", "Jupyter", "Notebook · 셀 단위 실행", "데이터 분석"], [si.SiGooglecolab, "#F9AB00", "Google Colab", "설치 없이 웹에서 쓰는 Jupyter", "우리 수업"],
      [si.SiPycharm, "#21D789", "PyCharm", "JetBrains의 전문가용 IDE", "개발자"], [tb.TbBrandVscode, "#3B9CE8", "VS Code", "마이크로소프트 · 가볍고 확장 多", "개발자"],
      [si.SiPython, "#FACC15", "IDLE", "파이썬 설치 시 기본 제공", "입문"], [si.SiSpyderide, "#EE2B2B", "Spyder", "과학 계산 · 데이터 분석용 IDE", "데이터 분석"], [si.SiAnaconda, "#44A833", "Anaconda", "에디터+라이브러리 종합 세트", "데이터 분석"]];
    const cw = (CW - 0.9) / 4, ch = 2.2;
    for (let i = 0; i < 7; i++) {
      const [Ic, c, n, d, tag] = eds[i];
      const x = MX + (i % 4) * (cw + 0.3), y = 1.65 + Math.floor(i / 4) * (ch + 0.25);
      const ours = tag === "우리 수업";
      card(s, x, y, cw, ch, { fill: T.card, line: ours ? T.yellow : undefined, lw: 1.5 });
      s.addImage({ data: await icon(Ic, c), x: x + 0.25, y: y + 0.25, w: 0.65, h: 0.65 });
      s.addShape("roundRect", { x: x + cw - 1.35, y: y + 0.3, w: 1.15, h: 0.34, rectRadius: 0.17, fill: { color: ours ? T.yellow : T.accent, transparency: ours ? 0 : 60 }, line: { type: "none" } });
      txt(s, tag, { x: x + cw - 1.35, y: y + 0.3, w: 1.15, h: 0.34, fontFace: F.sb, fontSize: 11, color: ours ? T.bg : T.white, align: "center", valign: "middle" });
      txt(s, n, { x: x + 0.25, y: y + 1.05, w: cw - 0.4, h: 0.45, fontFace: F.b, fontSize: 18 });
      txt(s, d, { x: x + 0.25, y: y + 1.5, w: cw - 0.4, h: 0.55, fontSize: 14, color: T.text });
    }
    const x = MX + 3 * (cw + 0.3), y = 1.65 + ch + 0.25;
    card(s, x, y, cw, ch, { fill: T.card2 });
    txt(s, [{ text: "IDE 란?", options: { fontFace: F.b, color: T.accent2, breakLine: true } }, { text: "통합 개발 환경. 작성 · 실행 · 디버깅을 한 프로그램에서 모두 하는 '종합 작업실'" }],
      { x: x + 0.25, y: y + 0.15, w: cw - 0.5, h: ch - 0.3, fontSize: 14, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "우리 수업", "Google Colab (= 웹에서 쓰는 Jupyter Notebook)을 사용합니다. 구글 계정만 있으면 OK!", T.yellow);
    footer(s, SRC + ", 각 에디터 공식 사이트");
  }

  {
    const s = add();
    header(s, S12, "① Jupyter Notebook — '셀' 단위로 실행하는 공책");
    const nx = MX, nw = 7.4;
    card(s, nx, 1.65, nw, 4.45, { fill: T.deep, line: T.accent, lw: 1 });
    s.addImage({ data: await icon(si.SiJupyter, "#F37626"), x: nx + 0.2, y: 1.78, w: 0.32, h: 0.32 });
    txt(s, "Chap01_파이썬준비_실습.ipynb", { x: nx + 0.6, y: 1.75, w: 5, h: 0.38, fontSize: 13, color: T.text, valign: "middle" });
    s.addShape("rect", { x: nx, y: 2.2, w: nw, h: 0.01, fill: { color: T.accent, transparency: 60 }, line: { type: "none" } });
    // markdown cell
    s.addShape("rect", { x: nx + 0.9, y: 2.4, w: nw - 1.1, h: 0.75, fill: { color: T.card2 }, line: { color: T.muted, width: 0.5 } });
    txt(s, [{ text: "## 첫 번째 실습", options: { fontFace: F.b, fontSize: 16, breakLine: true } }, { text: "달력을 출력해 봅시다.", options: { fontSize: 14, color: T.text } }], { x: nx + 1.05, y: 2.4, w: nw - 1.4, h: 0.75, valign: "middle" });
    // code cell
    txt(s, "[1]:", { x: nx + 0.15, y: 3.4, w: 0.7, h: 0.35, fontFace: F.code, fontSize: 13, color: T.accent2 });
    s.addShape("rect", { x: nx + 0.9, y: 3.35, w: nw - 1.1, h: 0.85, fill: { color: T.codeBg }, line: { color: T.accent2, width: 1.25 } });
    txt(s, [{ text: "import", options: { color: "F472B6" } }, { text: " calendar\n", options: { color: T.codeText } }, { text: "print", options: { color: "7DD3FC" } }, { text: "(calendar.month(2026, 1))", options: { color: T.codeText } }],
      { x: nx + 1.05, y: 3.35, w: nw - 1.4, h: 0.85, fontFace: F.code, fontSize: 14, valign: "middle", lineSpacing: 22 });
    s.addShape("ellipse", { x: nx + 0.35, y: 3.75, w: 0.35, h: 0.35, fill: { color: T.green }, line: { type: "none" } });
    s.addImage({ data: await icon(fa.FaPlay, "#0A1128"), x: nx + 0.46, y: 3.84, w: 0.15, h: 0.17 });
    // output
    txt(s, "     January 2026\nMo Tu We Th Fr Sa Su\n          1  2  3  4\n 5  6  7  8  9 10 11 …", { x: nx + 1.05, y: 4.35, w: nw - 1.4, h: 1.5, fontFace: F.code, fontSize: 13, color: T.text });
    // callouts
    const rx = nx + nw + 0.35, rw = CW - nw - 0.35;
    explainList(s, rx, 1.65, rw, [[1, "텍스트 셀 (Markdown)", "설명 · 메모를 적는 칸"], [2, "코드 셀", "파이썬 코드를 적는 칸"], [3, "실행 ▶ (Shift + Enter)", "셀 하나만 실행 — 조금씩 확인 가능"], [4, "결과", "바로 아래에 결과가 나타남"]], { ih: 0.98, gap: 0.17 });
    numBadge(s, 1, nx + nw - 0.5, 2.6, 0.32); numBadge(s, 2, nx + nw - 0.5, 3.6, 0.32); numBadge(s, 4, nx + nw - 0.5, 4.5, 0.32);
    tip(s, MX, 6.3, CW, 0.5, "장점", "코드 · 설명 · 그래프를 한 문서에 담을 수 있어, 분석 과정을 기록하는 '실험 노트'로 딱 좋습니다.", T.green);
    footer(s, SRC + ", Project Jupyter (jupyter.org)");
  }

  async function twoEditors(title, a, b, src) {
    const s = add();
    header(s, S12, title);
    const hw = (CW - 0.4) / 2;
    for (let i = 0; i < 2; i++) {
      const [Ic, c, name, who, pts, good] = i ? b : a;
      const x = MX + i * (hw + 0.4);
      card(s, x, 1.65, hw, 4.45, { fill: T.card });
      s.addImage({ data: await icon(Ic, c), x: x + 0.3, y: 1.9, w: 0.8, h: 0.8 });
      txt(s, name, { x: x + 1.3, y: 1.88, w: hw - 1.5, h: 0.45, fontFace: F.b, fontSize: 22 });
      txt(s, who, { x: x + 1.3, y: 2.33, w: hw - 1.5, h: 0.4, fontSize: 14, color: T.text });
      for (let j = 0; j < pts.length; j++) {
        const y = 3.0 + j * 0.58;
        s.addImage({ data: await icon(fa.FaCheck, "#818CF8"), x: x + 0.35, y: y + 0.12, w: 0.22, h: 0.22 });
        txt(s, pts[j], { x: x + 0.75, y, w: hw - 1.0, h: 0.46, fontSize: 15, valign: "middle" });
      }
      s.addShape("roundRect", { x: x + 0.3, y: 5.45, w: hw - 0.6, h: 0.45, rectRadius: 0.1, fill: { color: c.replace("#", ""), transparency: 85 }, line: { type: "none" } });
      txt(s, "이런 사람에게 : " + good, { x: x + 0.45, y: 5.45, w: hw - 0.9, h: 0.45, fontFace: F.sb, fontSize: 14, valign: "middle" });
    }
    footer(s, src);
    return s;
  }
  {
    const s = await twoEditors("② PyCharm  vs  ③ Visual Studio Code",
      [si.SiPycharm, "#21D789", "PyCharm", "JetBrains가 만든 파이썬 전용 IDE", ["문법 오류를 실시간으로 찾아 알려 줌", "고급 디버깅 : 한 단계씩 실행하며 분석", "Git · 데이터베이스 · 웹 프레임워크 통합"], "본격적인 파이썬 개발자"],
      [tb.TbBrandVscode, "#3B9CE8", "VS Code", "마이크로소프트의 가벼운 만능 에디터", ["파이썬 외 여러 언어 지원", "수천 개 확장 기능으로 내 맘대로 구성", "에디터 안에서 터미널 · Git · 디버깅"], "여러 언어를 함께 쓰는 사람"],
      SRC + ", jetbrains.com/pycharm, code.visualstudio.com");
    tip(s, MX, 6.3, CW, 0.5, "참고", "둘 다 무료 버전이 있지만 컴퓨터에 설치가 필요합니다. 이번 학기에는 몰라도 괜찮아요.", T.cyan);
  }
  {
    const s = await twoEditors("④ IDLE  vs  ⑤ Spyder",
      [si.SiPython, "#FACC15", "IDLE", "파이썬을 설치하면 함께 깔리는 기본 에디터", ["단순한 화면 — 초보자에게 적합", "작성한 코드를 바로 실행", "간단한 디버깅 (단계별 실행)"], "파이썬을 막 설치해 본 입문자"],
      [si.SiSpyderide, "#EE2B2B", "Spyder", "데이터 과학자 · 엔지니어용 IDE", ["과학 계산 · 데이터 분석에 최적화", "변수 값을 표로 보는 '변수 탐색기'", "플러그인으로 기능 확장"], "MATLAB · R 같은 분석 화면이 익숙한 사람"],
      SRC + ", docs.python.org/3/library/idle.html, spyder-ide.org");
    tip(s, MX, 6.3, CW, 0.5, "참고", "Spyder는 아래에서 볼 Anaconda를 설치하면 함께 들어 있습니다.", T.cyan);
  }

  {
    const s = add();
    header(s, S12, "⑥ Anaconda — 데이터 분석 '종합 선물 세트'");
    const bx = MX, bw = 7.0;
    card(s, bx, 1.7, bw, 4.4, { fill: T.card, line: "44A833", lw: 1.5 });
    s.addImage({ data: await icon(si.SiAnaconda, "#44A833"), x: bx + 0.3, y: 1.9, w: 0.6, h: 0.6 });
    txt(s, "Anaconda 하나만 설치하면 →", { x: bx + 1.05, y: 1.9, w: bw - 1.3, h: 0.6, fontFace: F.b, fontSize: 18, valign: "middle" });
    const inside = [[si.SiPython, "#FACC15", "Python", "언어 본체"], [fa.FaBoxOpen, "#C7D2FE", "Conda", "패키지 관리자"], [fa.FaCompass, "#C7D2FE", "Navigator", "클릭으로 실행하는 메뉴판"],
      [si.SiJupyter, "#F37626", "Jupyter", "노트북 에디터"], [si.SiSpyderide, "#EE2B2B", "Spyder", "분석용 IDE"], [si.SiRstudioide, "#75AADB", "RStudio", "R 언어 에디터"]];
    const iw = (bw - 0.6 - 0.4) / 3;
    for (let i = 0; i < 6; i++) {
      const [Ic, c, n, d] = inside[i];
      const x = bx + 0.3 + (i % 3) * (iw + 0.2), y = 2.75 + Math.floor(i / 3) * 1.6;
      card(s, x, y, iw, 1.4, { fill: T.card2 });
      s.addImage({ data: await icon(Ic, c), x: x + iw / 2 - 0.25, y: y + 0.15, w: 0.5, h: 0.5 });
      txt(s, n, { x, y: y + 0.7, w: iw, h: 0.33, fontFace: F.b, fontSize: 15, align: "center" });
      txt(s, d, { x, y: y + 1.02, w: iw, h: 0.3, fontSize: 12, color: T.text, align: "center" });
    }
    const rx = bx + bw + 0.35, rw = CW - bw - 0.35;
    const pts = [["왜 쓰나?", "데이터 분석 · 머신러닝에 필요한 도구와 패키지를 한 번에 설치"], ["장점", "패키지 관리와 환경 설정이 편리해 데이터 과학자들이 선호"], ["설치", "Anaconda 공식 웹사이트(anaconda.com)에서 설치 파일 다운로드"]];
    pts.forEach(([k, v], i) => {
      const y = 1.7 + i * 1.5;
      card(s, rx, y, rw, 1.3, { fill: T.card });
      txt(s, k, { x: rx + 0.25, y: y + 0.15, w: rw - 0.5, h: 0.4, fontFace: F.b, fontSize: 16, color: T.accent2 });
      txt(s, v, { x: rx + 0.25, y: y + 0.55, w: rw - 0.5, h: 0.7, fontSize: 14 });
    });
    tip(s, MX, 6.3, CW, 0.5, "비유", "스마트폰을 사면 카메라 · 메모 · 계산기 앱이 기본으로 깔려 있듯, Anaconda에는 분석 도구가 기본으로 들어 있어요.");
    footer(s, SRC + ", Anaconda Documentation");
  }

  {
    const s = add();
    header(s, S12, "Conda로 '가상 환경' 만들기");
    // concept
    const lw = 5.6;
    card(s, MX, 1.65, lw, 4.45, { fill: T.card });
    txt(s, "가상 환경 = 프로젝트별 '독립된 방'", { x: MX + 0.3, y: 1.8, w: lw - 0.6, h: 0.45, fontFace: F.b, fontSize: 17, color: T.accent2 });
    const rooms = [["방 A : 수업용", "Python 3.12 + pandas"], ["방 B : 회사 업무", "Python 3.10 + 옛날 라이브러리"]];
    for (let i = 0; i < 2; i++) {
      const y = 2.45 + i * 1.3;
      card(s, MX + 0.3, y, lw - 0.6, 1.1, { fill: T.card2, line: i ? T.cyan : T.yellow });
      s.addImage({ data: await icon(fa.FaDoorOpen, i ? "#38BDF8" : "#FACC15"), x: MX + 0.5, y: y + 0.3, w: 0.5, h: 0.5 });
      txt(s, rooms[i][0], { x: MX + 1.2, y: y + 0.12, w: lw - 1.7, h: 0.42, fontFace: F.b, fontSize: 16 });
      txt(s, rooms[i][1], { x: MX + 1.2, y: y + 0.55, w: lw - 1.7, h: 0.42, fontSize: 14, color: T.text });
    }
    txt(s, "방마다 설치한 것이 섞이지 않아 서로 충돌하지 않습니다.", { x: MX + 0.3, y: 5.15, w: lw - 0.6, h: 0.8, fontSize: 15, color: T.white });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    codeBlock(s, rx, 1.65, rw, ["# ① 'myenv'라는 이름의 방 만들기", "conda create --name myenv python=3.12", "", "# ② 그 방에 라이브러리 설치", "conda install numpy pandas"], { label: "Anaconda Prompt (터미널)", fs: 14, markers: { 1: 1, 4: 2 } });
    explainList(s, rx, 4.3, rw, [[1, "conda create --name 이름 python=버전", "새 가상 환경을 지정한 파이썬 버전으로 만든다"], [2, "conda install 패키지1 패키지2", "필요한 라이브러리를 한 번에 설치"]], { ih: 0.88, gap: 0.08 });
    tip(s, MX, 6.3, CW, 0.5, "Colab 사용자는?", "Colab은 구글이 환경을 미리 준비해 두어 가상 환경을 만들 필요가 없습니다. 개념만 알아 두세요!", T.green);
    footer(s, SRC + ", Conda User Guide (docs.conda.io)");
    s.addNotes("원문 예시는 python=3.8이었으나, 3.8은 2024년 10월 지원 종료되어 3.12로 바꿔 표기했습니다.");
  }

  {
    const s = add();
    header(s, S12, "나에게 맞는 에디터는? — 선택 가이드");
    const q = [["설치 없이 바로 시작하고 싶다", "Google Colab", si.SiGooglecolab, "#F9AB00", true], ["내 컴퓨터에서 데이터 분석을 하고 싶다", "Anaconda + Jupyter", si.SiAnaconda, "#44A833"],
      ["여러 언어로 프로그램을 만들고 싶다", "VS Code", tb.TbBrandVscode, "#3B9CE8"], ["파이썬 전문 개발자가 되고 싶다", "PyCharm", si.SiPycharm, "#21D789"]];
    for (let i = 0; i < 4; i++) {
      const [qq, a, Ic, c, ours] = q[i];
      const y = 1.7 + i * 1.12;
      card(s, MX, y, 7.0, 0.92, { fill: T.card });
      s.addImage({ data: await icon(fa.FaQuestionCircle, "#818CF8"), x: MX + 0.25, y: y + 0.27, w: 0.38, h: 0.38 });
      txt(s, qq, { x: MX + 0.85, y, w: 6.0, h: 0.92, fontSize: 17, valign: "middle" });
      s.addShape("rightArrow", { x: MX + 7.2, y: y + 0.26, w: 0.7, h: 0.4, fill: { color: T.accent }, line: { type: "none" } });
      card(s, MX + 8.1, y, CW - 8.1, 0.92, { fill: T.card2, line: ours ? T.yellow : c.replace("#", ""), lw: ours ? 2 : 1 });
      s.addImage({ data: await icon(Ic, c), x: MX + 8.35, y: y + 0.21, w: 0.5, h: 0.5 });
      txt(s, a, { x: MX + 9.05, y, w: CW - 9.2, h: 0.92, fontFace: F.b, fontSize: 18, valign: "middle" });
    }
    tip(s, MX, 6.3, CW, 0.5, "결론", "에디터는 '연필 종류'일 뿐, 파이썬 문법은 어디서나 똑같습니다. 우리는 Colab으로 시작해요!", T.yellow);
    footer(s);
  }

  await summary(S12, "1.2 핵심 정리", [
    ["에디터", "코드를 쓰고 실행하는 프로그램 (= 코드용 워드 프로그램)"],
    ["주요 기능", "문법 강조 · 자동 완성 · 디버깅 · 즉시 실행 · 포맷팅 · Git · 확장"],
    ["종류", "Jupyter · Colab · PyCharm · VS Code · IDLE · Spyder · Anaconda"],
    ["우리 수업", "Google Colab — 설치 없이 웹에서 쓰는 Jupyter Notebook"],
  ], "에디터를 열었다면, 남이 만든 기능을 빌려 쓰는 법을 배워 봅시다 → 1.3 라이브러리");

  // ================= 1.3 =================
  sec("1.3 파이썬 라이브러리");
  await divider("1.3", "파이썬 라이브러리", "남이 만든 기능을 빌려 쓰는 법", ["라이브러리 = 도서관", "표준 라이브러리와 외부 라이브러리", "import 와 pip 사용법"], fa.FaBook);

  {
    const s = add();
    header(s, S13, "라이브러리 = 기능을 빌려 주는 '도서관'");
    const steps = [[fa.FaUniversity, "도서관", "라이브러리 (library)", "pandas, math …"], [fa.FaBook, "책 한 권", "모듈 · 기능", "read_csv, sqrt …"], [fa.FaHandHolding, "빌리기", "import", "import pandas"], [fa.FaLightbulb, "읽고 활용", "코드에서 사용", "pd.read_csv(…)"]];
    const bw = 2.55, gap = (CW - 4 * bw) / 3;
    for (let i = 0; i < 4; i++) {
      const [Ic, a, b, c] = steps[i];
      const x = MX + i * (bw + gap);
      card(s, x, 1.75, bw, 3.0, { fill: T.card });
      await iconCircle(s, Ic, x + bw / 2 - 0.45, 1.95, 0.9);
      txt(s, a, { x, y: 3.0, w: bw, h: 0.4, fontFace: F.b, fontSize: 18, align: "center" });
      txt(s, "= " + b, { x, y: 3.45, w: bw, h: 0.4, fontFace: F.sb, fontSize: 15, color: T.yellow, align: "center" });
      txt(s, c, { x: x + 0.15, y: 3.95, w: bw - 0.3, h: 0.5, fontFace: F.code, fontSize: 13, color: T.text, align: "center", valign: "middle" });
      if (i < 3) s.addShape("rightArrow", { x: x + bw + 0.08, y: 3.05, w: gap - 0.16, h: 0.4, fill: { color: T.accent }, line: { type: "none" } });
    }
    card(s, MX, 4.95, CW, 1.15, { fill: T.card2 });
    txt(s, [{ text: "정의  ", options: { fontFace: F.b, color: T.accent2 } }, { text: "라이브러리는 다른 프로그램에서 반복해서 쓸 수 있도록 미리 작성해 둔 코드 모음입니다. 파이썬에서는 '패키지(package)'라고도 부릅니다. 수학 계산 · 날짜 처리 · 데이터 분석 기능을 import 한 줄로 불러와 바로 씁니다." }],
      { x: MX + 0.3, y: 4.95, w: CW - 0.6, h: 1.15, fontSize: 16, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "핵심", "모든 기능을 처음부터 만들 필요가 없다! — 이것이 파이썬이 강력한 이유입니다.");
    footer(s, SRC);
  }

  {
    const s = add();
    header(s, S13, "라이브러리가 없다면? vs 있다면?");
    const hw = (CW - 0.4) / 2;
    txt(s, "✗  직접 만들기 — 제곱근(√) 구하기", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    const a = codeBlock(s, MX, 2.05, hw, ["x = 2", "guess = x / 2", "for i in range(20):", "    guess = (guess + x / guess) / 2", "print(guess)"], { label: "직접 계산 (뉴턴 방법)", fs: 14 });
    txt(s, "계산 원리(수학)를 알아야 하고, 코드가 길고, 틀리기 쉽습니다.", { x: MX, y: 2.05 + a.h + 0.15, w: hw, h: 0.7, fontSize: 15, color: T.text });
    const rx = MX + hw + 0.4;
    txt(s, "✓  라이브러리 쓰기", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    const b = codeBlock(s, rx, 2.05, hw, ["import math", "print(math.sqrt(2))"], { label: "math 라이브러리", fs: 14 });
    outputBox(s, rx, 2.05 + b.h + 0.2, hw, 0.85, "1.4142135623730951");
    txt(s, "누군가 이미 정확하게 만들어 둔 기능을 '빌려서' 단 2줄!", { x: rx, y: 2.05 + b.h + 1.2, w: hw, h: 0.7, fontSize: 15, color: T.text });
    tip(s, MX, 6.3, CW, 0.5, "포인트", "왼쪽 코드는 이해하지 않아도 됩니다. '라이브러리 덕분에 짧아진다'는 느낌만 기억하세요.", T.green);
    footer(s, "Python 표준 라이브러리 문서 (docs.python.org/3/library/math.html)");
  }

  {
    const s = add();
    header(s, S13, "라이브러리는 크게 두 종류");
    const hw = (CW - 1.2) / 2;
    // standard
    card(s, MX, 1.65, hw, 4.45, { fill: T.card, line: T.accent2, lw: 1.5 });
    s.addImage({ data: await icon(si.SiPython, "#FACC15"), x: MX + 0.3, y: 1.85, w: 0.6, h: 0.6 });
    txt(s, "표준 라이브러리", { x: MX + 1.05, y: 1.82, w: hw - 1.2, h: 0.4, fontFace: F.b, fontSize: 20 });
    txt(s, "파이썬 설치 시 '기본 탑재'", { x: MX + 1.05, y: 2.22, w: hw - 1.2, h: 0.35, fontSize: 14, color: T.accent2 });
    ["math", "random", "datetime", "os", "json", "calendar"].forEach((m, i) => {
      const x = MX + 0.3 + (i % 3) * ((hw - 0.6) / 3), y = 2.9 + Math.floor(i / 3) * 0.7;
      s.addShape("roundRect", { x: x + 0.05, y, w: (hw - 0.6) / 3 - 0.1, h: 0.5, rectRadius: 0.1, fill: { color: T.accent, transparency: 70 }, line: { type: "none" } });
      txt(s, m, { x: x + 0.05, y, w: (hw - 0.6) / 3 - 0.1, h: 0.5, fontFace: F.code, fontSize: 14, align: "center", valign: "middle" });
    });
    txt(s, "→ 설치 없이 바로 import", { x: MX + 0.3, y: 4.45, w: hw - 0.6, h: 0.45, fontFace: F.b, fontSize: 16, color: T.green });
    txt(s, "비유 : 스마트폰 기본 앱 (계산기, 시계, 달력)", { x: MX + 0.3, y: 5.0, w: hw - 0.6, h: 0.8, fontSize: 15, color: T.text });
    // vs
    txt(s, "VS", { x: MX + hw, y: 3.5, w: 1.2, h: 0.6, fontFace: F.xb, fontSize: 26, color: T.accent2, align: "center" });
    // external
    const rx = MX + hw + 1.2;
    card(s, rx, 1.65, hw, 4.45, { fill: T.card, line: T.yellow, lw: 1.5 });
    s.addImage({ data: await icon(si.SiPypi, "#FACC15"), x: rx + 0.3, y: 1.85, w: 0.6, h: 0.6 });
    txt(s, "외부 라이브러리", { x: rx + 1.05, y: 1.82, w: hw - 1.2, h: 0.4, fontFace: F.b, fontSize: 20 });
    txt(s, "필요할 때 '추가 설치'", { x: rx + 1.05, y: 2.22, w: hw - 1.2, h: 0.35, fontSize: 14, color: T.yellow });
    ["pandas", "numpy", "matplotlib", "sklearn", "tensorflow", "…"].forEach((m, i) => {
      const x = rx + 0.3 + (i % 3) * ((hw - 0.6) / 3), y = 2.9 + Math.floor(i / 3) * 0.7;
      s.addShape("roundRect", { x: x + 0.05, y, w: (hw - 0.6) / 3 - 0.1, h: 0.5, rectRadius: 0.1, fill: { color: T.yellow, transparency: 80 }, line: { type: "none" } });
      txt(s, m, { x: x + 0.05, y, w: (hw - 0.6) / 3 - 0.1, h: 0.5, fontFace: F.code, fontSize: 13, align: "center", valign: "middle" });
    });
    txt(s, "→ pip install 로 설치 후 import", { x: rx + 0.3, y: 4.45, w: hw - 0.6, h: 0.45, fontFace: F.b, fontSize: 16, color: T.green });
    txt(s, "비유 : 앱스토어에서 내려받는 앱 (전 세계 개발자 · 기업이 만들어 공개)", { x: rx + 0.3, y: 5.0, w: hw - 0.6, h: 0.8, fontSize: 15, color: T.text });
    tip(s, MX, 6.3, CW, 0.5, "기억하기", "표준 = 기본 앱,  외부 = 앱스토어 앱.  둘 다 쓰기 전에는 import 가 필요합니다!");
    footer(s, SRC);
  }

  {
    const s = add();
    header(s, S13, "표준 라이브러리 — 설치 없이 바로 쓰는 기본 도구");
    const stats = [["200개+", "핵심 모듈 수"], ["0번", "추가 설치 필요"], ["C 언어", "대부분의 내부 구현 (그래서 빠름)"]];
    stats.forEach(([n, l], i) => {
      const x = MX + i * ((CW - 0.6) / 3 + 0.3), w = (CW - 0.6) / 3;
      card(s, x, 1.65, w, 1.35, { fill: T.card2 });
      txt(s, n, { x: x + 0.3, y: 1.7, w: w - 0.6, h: 0.75, fontFace: F.xb, fontSize: 34, color: T.yellow });
      txt(s, l, { x: x + 0.3, y: 2.45, w: w - 0.6, h: 0.45, fontSize: 15, color: T.text });
    });
    const rows = [["math", "수학 계산", "math.sqrt(16) → 4.0", fa.FaCalculator], ["random", "무작위 숫자 (난수)", "random.randint(1, 6) → 주사위", fa.FaDiceFive], ["datetime", "날짜 · 시간 처리", "datetime.date.today() → 오늘 날짜", fa.FaCalendarAlt],
      ["os", "운영체제 (폴더 · 파일)", "os.listdir() → 폴더 안 파일 목록", fa.FaFolderOpen], ["json", "JSON 데이터 처리", "json.loads(…) → 웹 데이터 읽기", fa.FaFileCode]];
    for (let i = 0; i < 5; i++) {
      const [m, d, ex, Ic] = rows[i];
      const y = 3.2 + i * 0.6;
      if (i % 2 === 0) s.addShape("rect", { x: MX, y, w: CW, h: 0.6, fill: { color: T.card }, line: { type: "none" } });
      s.addImage({ data: await icon(Ic, "#818CF8"), x: MX + 0.2, y: y + 0.16, w: 0.28, h: 0.28 });
      txt(s, m, { x: MX + 0.7, y, w: 1.6, h: 0.6, fontFace: F.code, fontSize: 16, color: T.yellow, valign: "middle" });
      txt(s, d, { x: MX + 2.4, y, w: 3.5, h: 0.6, fontSize: 15, valign: "middle" });
      txt(s, ex, { x: MX + 6.0, y, w: CW - 6.2, h: 0.6, fontFace: F.code, fontSize: 14, color: T.text, valign: "middle" });
    }
    footer(s, SRC + ", The Python Standard Library (docs.python.org)");
    s.addNotes("원문 내용: 표준 라이브러리는 200개 이상의 핵심 모듈로 구성되며, 대부분 C 언어로 작성되어 있다. I/O 같은 기본 시스템 기능을 제공한다.");
  }

  {
    const s = add();
    header(s, S13, "실습 ① calendar 로 달력 만들기");
    const lw = 6.4;
    const cb = codeBlock(s, MX, 1.65, lw, ["import calendar", "print(calendar.calendar(2026))"], { label: "Colab 코드 셀", fs: 16, lh: 0.4, markers: { 0: 1, 1: 2 } });
    explainList(s, MX, 1.65 + cb.h + 0.25, lw, [[1, "import calendar", "'달력' 라이브러리를 빌려 온다 (표준이라 설치 X)"], [2, "print( calendar.calendar(2026) )", "2026년 달력을 만들어서(calendar) 화면에 출력(print)"]], { ih: 1.0, gap: 0.15 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    outputBox(s, rx, 1.65, rw, 3.35, "                 2026\n\n      January\nMo Tu We Th Fr Sa Su\n          1  2  3  4\n 5  6  7  8  9 10 11\n12 13 14 15 16 17 18\n19 20 21 22 23 24 25\n26 27 28 29 30 31\n   … (12월까지 계속)", { fs: 13 });
    card(s, rx, 5.15, rw, 0.95, { fill: T.card2 });
    txt(s, [{ text: "명령 프롬프트(cmd)에서는  ", options: { color: T.text } }, { text: "python -m calendar 2024", options: { fontFace: F.code, color: T.yellow } }, { text: "  로도 실행 가능", options: { color: T.text } }],
      { x: rx + 0.25, y: 5.15, w: rw - 0.5, h: 0.95, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "직접 해 보기", "2026 을 내가 태어난 해로 바꿔 실행해 보세요. 표준 라이브러리 전체 목록 : docs.python.org/3/library", T.green);
    footer(s, SRC + ", docs.python.org/3/library/calendar.html");
  }

  {
    const s = add();
    header(s, S13, "import 문 읽는 법 — 앞으로 계속 나올 3가지 모양");
    const forms = [["import calendar", "라이브러리 통째로 빌리기", "calendar.month(…)  처럼 '라이브러리이름.기능' 으로 사용", T.accent2],
      ["import pandas as pd", "빌리고 별명(as) 붙이기", "이름이 길어서 pd 로 줄여 부름 → pd.read_csv(…)", T.yellow],
      ["from sklearn.linear_model import LinearRegression", "필요한 기능만 쏙 빌리기", "책장(sklearn)의 칸(linear_model)에서 책 1권만 → LinearRegression()", T.green]];
    forms.forEach(([code, h, d, c], i) => {
      const y = 1.7 + i * 1.5;
      card(s, MX, y, CW, 1.3, { fill: T.card });
      numBadge(s, i + 1, MX + 0.25, y + 0.2, 0.4, c);
      s.addShape("roundRect", { x: MX + 0.85, y: y + 0.17, w: 6.6, h: 0.46, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, L_hl(code), { x: MX + 1.0, y: y + 0.17, w: 6.4, h: 0.46, fontFace: F.code, fontSize: 14, valign: "middle" });
      txt(s, h, { x: MX + 7.7, y: y + 0.17, w: CW - 7.9, h: 0.46, fontFace: F.b, fontSize: 17, color: c, valign: "middle" });
      txt(s, d, { x: MX + 0.85, y: y + 0.72, w: CW - 1.1, h: 0.45, fontSize: 15, color: T.text, valign: "middle" });
    });
    tip(s, MX, 6.3, CW, 0.5, "관례", "pandas → pd,  numpy → np,  matplotlib.pyplot → plt  는 전 세계 공통 별명이에요.");
    footer(s, "Python Tutorial — Modules (docs.python.org/3/tutorial/modules.html)");
  }

  {
    const s = add();
    header(s, S13, "외부 라이브러리 설치하기 — pip");
    const nodes = [[si.SiPypi, "#FACC15", "PyPI", "파이썬 라이브러리\n'앱스토어' (인터넷)"], [fa.FaDownload, "#C7D2FE", "pip install", "내려받아 설치하는\n명령어"], [fa.FaLaptopCode, "#34D399", "내 환경", "이제 import 해서\n사용 가능!"]];
    const bw = 3.0, gap = (CW - 3 * bw) / 2;
    for (let i = 0; i < 3; i++) {
      const [Ic, c, n, d] = nodes[i];
      const x = MX + i * (bw + gap);
      card(s, x, 1.7, bw, 2.2, { fill: T.card });
      s.addImage({ data: await icon(Ic, c), x: x + bw / 2 - 0.35, y: 1.9, w: 0.7, h: 0.7 });
      txt(s, n, { x, y: 2.65, w: bw, h: 0.4, fontFace: F.b, fontSize: 18, align: "center" });
      txt(s, d, { x, y: 3.05, w: bw, h: 0.75, fontSize: 14, color: T.text, align: "center" });
      if (i < 2) s.addShape("rightArrow", { x: x + bw + 0.2, y: 2.6, w: gap - 0.4, h: 0.45, fill: { color: T.accent }, line: { type: "none" } });
    }
    const hw = (CW - 0.4) / 2;
    txt(s, "내 컴퓨터 (명령 프롬프트 · 터미널)", { x: MX, y: 4.15, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.accent2 });
    codeBlock(s, MX, 4.6, hw, ["pip install pandas"], { label: "터미널", fs: 16, noNums: true });
    txt(s, "Google Colab (코드 셀)", { x: MX + hw + 0.4, y: 4.15, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeBlock(s, MX + hw + 0.4, 4.6, hw, ["!pip install pandas"], { label: "Colab 코드 셀", fs: 16, noNums: true });
    txt(s, "앞에 ! 를 붙인다 = '파이썬 코드가 아니라 터미널 명령이야'", { x: MX + hw + 0.4, y: 5.82, w: hw, h: 0.35, fontSize: 14, color: T.text });
    tip(s, MX, 6.3, CW, 0.5, "알아 두기", "Colab에는 pandas · numpy · matplotlib 등이 이미 설치되어 있어, 대부분 바로 import 하면 됩니다.", T.green);
    footer(s, SRC + ", pip documentation (pip.pypa.io), PyPI (pypi.org)");
  }

  {
    const s = add();
    header(s, S13, "꼭 알아야 할 외부 라이브러리 5가지");
    const libs = [[si.SiPandas, "#E70488", "pandas", "데이터 분석 · 처리", "파이썬 속\n'엑셀 시트'", "08장"], [si.SiNumpy, "#4DABCF", "NumPy", "수치 계산 · 배열 연산", "초고속\n'공학용 계산기'", "07장"],
      [fa.FaChartBar, "#38BDF8", "Matplotlib", "데이터 시각화", "그래프 그리는\n'도화지'", "09장"], [si.SiScikitlearn, "#F7931E", "scikit-learn", "머신러닝 알고리즘", "데이터로 배우는\n'예측 기계'", "12장"],
      [si.SiTensorflow, "#FF6F00", "TensorFlow", "딥러닝 프레임워크", "인공지능의\n'두뇌 공장'", "심화"]];
    const cw = (CW - 1.2) / 5;
    for (let i = 0; i < 5; i++) {
      const [Ic, c, n, d, a, ch] = libs[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.7, cw, 4.35, { fill: T.card });
      s.addImage({ data: await icon(Ic, c), x: x + cw / 2 - 0.4, y: 1.95, w: 0.8, h: 0.8 });
      txt(s, n, { x, y: 2.95, w: cw, h: 0.45, fontFace: F.b, fontSize: 18, align: "center" });
      txt(s, d, { x: x + 0.1, y: 3.45, w: cw - 0.2, h: 0.4, fontSize: 14, color: T.text, align: "center" });
      txt(s, a, { x: x + 0.15, y: 4.0, w: cw - 0.3, h: 0.75, fontFace: F.sb, fontSize: 15, color: T.yellow, align: "center", valign: "middle" });
      s.addShape("roundRect", { x: x + cw / 2 - 0.7, y: 5.1, w: 1.4, h: 0.42, rectRadius: 0.2, fill: { color: T.accent, transparency: 55 }, line: { type: "none" } });
      txt(s, ch === "심화" ? "심화 학습" : ch + "에서 배움", { x: x + cw / 2 - 0.7, y: 5.1, w: 1.4, h: 0.42, fontFace: F.sb, fontSize: 12, align: "center", valign: "middle" });
    }
    tip(s, MX, 6.3, CW, 0.5, "공식 사이트", "pandas.pydata.org · numpy.org · matplotlib.org · scikit-learn.org · tensorflow.org", T.cyan, 14);
    footer(s, SRC + ", 각 라이브러리 공식 사이트");
  }

  {
    const s = add();
    header(s, S13, "표준 vs 외부 라이브러리 — 한 장으로 비교");
    const rows = [["구분", "표준 라이브러리", "외부 라이브러리"], ["설치 여부", "파이썬 설치 시 기본 제공", "별도 설치 필요"], ["사용 방법", "바로 import 가능", "pip 등으로 설치 후 import"],
      ["특징", "기본 기능 제공", "특정 분야의 고급 기능 제공"], ["만든 곳", "파이썬 개발팀", "전 세계 개발자 · 기업"], ["예시", "math, datetime, os", "pandas, numpy, matplotlib"]];
    const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: {
      fontFace: i === 0 || j === 0 ? F.b : F.r, fontSize: i === 0 ? 17 : 16, color: i === 0 ? T.white : j === 0 ? T.accent2 : T.white,
      fill: { color: i === 0 ? (j === 1 ? T.accent : j === 2 ? "8A6D0B" : T.card2) : (i % 2 ? T.card : T.bg) }, align: j === 0 ? "left" : "center", valign: "middle", margin: [0.04, 0.15, 0.04, 0.15] } })));
    s.addTable(tbl, { x: MX, y: 1.75, w: CW, colW: [2.4, (CW - 2.4) / 2, (CW - 2.4) / 2], rowH: 0.68, border: { type: "solid", color: "1E2A5A", pt: 1 } });
    tip(s, MX, 6.15, CW, 0.6, "정리", "파이썬은 다양한 외부 라이브러리 덕분에 데이터 분석 · AI · 웹 개발에서 가장 널리 쓰이는 언어가 되었습니다.", T.yellow, 15);
    footer(s, SRC);
  }

  await summary(S13, "1.3 핵심 정리", [
    ["라이브러리", "미리 만들어 둔 기능 모음 (= 도서관). '패키지'라고도 부름"],
    ["표준 라이브러리", "기본 탑재 — math, random, datetime, os, json, calendar …"],
    ["외부 라이브러리", "pip install 로 추가 설치 (Colab은 !pip) — pandas, numpy …"],
    ["import", "import 이름 / import 이름 as 별명 / from 이름 import 기능"],
  ], "이 도구들로 엑셀이 어려운 일을 어떻게 해결할까요? → 1.4 파이썬이 필요한 이유");
};

function L_hl(code) {
  return require("./lib").hlLine(code).map((r) => ({ text: r.t, options: { color: r.c } }));
}
