// CH02 · 2.3 Google Colab + wrap-up
const si = require("react-icons/si");
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox, browserWin, dark, hlRuns } = require("./lib");

module.exports = async function ({ pres, add, sec, divider, summary, stepFlow, SRC, S23 }) {
  const COLAB = "Google Colab FAQ · 시작 가이드 (research.google.com/colaboratory)";
  sec("2.3 Google Colab");
  await divider("2.3", "Google Colab", "설치 없이 웹 브라우저에서 파이썬 쓰기", ["Colab 시작하기와 화면 구성", "코드 · 텍스트 셀 실행과 단축키", "파일 불러오기 · 저장 · 런타임"], si.SiGooglecolab);

  {
    const s = add();
    header(s, S23, "Colab = 구글 문서처럼 쓰는 Jupyter Notebook");
    const lw = 5.0;
    card(s, MX, 1.7, lw, 4.35, { fill: T.card, line: T.yellow, lw: 1.5 });
    s.addImage({ data: await icon(si.SiGooglecolab, "#F9AB00"), x: MX + lw / 2 - 0.6, y: 1.95, w: 1.2, h: 1.2 });
    txt(s, "Google Colaboratory", { x: MX, y: 3.3, w: lw, h: 0.45, fontFace: F.b, fontSize: 20, align: "center" });
    txt(s, "줄여서 'Colab (코랩)'", { x: MX, y: 3.75, w: lw, h: 0.4, fontSize: 15, color: T.text, align: "center" });
    txt(s, "Jupyter Notebook 을 기반으로 한 웹 편집기.\nChrome 등 브라우저로 접속해 언제 어디서나 코드를 작성합니다.", { x: MX + 0.3, y: 4.35, w: lw - 0.6, h: 1.4, fontSize: 15, align: "center", valign: "middle" });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const pros = [[fa.FaDownload, "설치가 필요 없음", "구글 계정 + 인터넷만 있으면 OK"], [fa.FaBoxOpen, "패키지가 미리 설치됨", "pandas · numpy · matplotlib 등 바로 import"], [fa.FaGift, "무료로 사용", "구글의 컴퓨터(가상 머신)를 빌려 씀 · GPU도 제한적으로 무료"], [fa.FaShareAlt, "저장 · 공유가 쉬움", "구글 드라이브에 자동 저장, 링크로 공유"]];
    for (let i = 0; i < 4; i++) {
      const [Ic, h, d] = pros[i];
      const y = 1.7 + i * 1.1;
      card(s, rx, y, rw, 0.95, { fill: T.card2 });
      await iconCircle(s, Ic, rx + 0.2, y + 0.15, 0.65);
      txt(s, h, { x: rx + 1.05, y: y + 0.08, w: rw - 1.2, h: 0.4, fontFace: F.b, fontSize: 16 });
      txt(s, d, { x: rx + 1.05, y: y + 0.48, w: rw - 1.2, h: 0.4, fontSize: 14, color: T.text });
    }
    tip(s, MX, 6.3, CW, 0.5, "비유", "내 컴퓨터에 주방을 짓는 대신(Anaconda), 구글의 주방을 빌려 요리하는 것(Colab)!", T.yellow);
    footer(s, SRC + " 2.3, " + COLAB);
  }
  {
    const s = add();
    header(s, S23, "Colab vs 내 컴퓨터의 Jupyter");
    const rows = [["구분", "Google Colab", "Jupyter (Anaconda)"], ["설치", "필요 없음", "Anaconda 설치 필요"], ["실행 장소", "구글의 클라우드 컴퓨터", "내 컴퓨터"], ["패키지", "주요 패키지 미리 설치", "Anaconda 포함 패키지 + 직접 설치"],
      ["파일 저장", "구글 드라이브", "내 컴퓨터 폴더"], ["인터넷", "꼭 필요", "없어도 사용 가능"], ["사용 시간", "무료는 시간 제한 있음", "제한 없음"]];
    const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: i === 0 || j === 0 ? F.b : F.r, fontSize: i === 0 ? 17 : 16, color: i === 0 ? (j === 1 ? T.bg : T.white) : j === 0 ? T.accent2 : j === 1 ? T.yellow : T.text,
      fill: { color: i === 0 ? (j === 1 ? "F9AB00" : T.card2) : (i % 2 ? T.card : T.bg) }, align: j === 0 ? "left" : "center", valign: "middle", margin: [0.04, 0.15, 0.04, 0.15] } })));
    s.addTable(tbl, { x: MX, y: 1.7, w: CW, colW: [2.4, (CW - 2.4) / 2, (CW - 2.4) / 2], rowH: 0.6, border: { type: "solid", color: "1E2A5A", pt: 1 } });
    tip(s, MX, 6.15, CW, 0.6, "공통점", "둘 다 .ipynb 노트북 파일을 쓰고, 셀 단위로 실행합니다. 하나를 익히면 다른 것도 바로 쓸 수 있어요!", T.green, 15);
    footer(s, COLAB + ", Project Jupyter");
  }
  {
    const s = add();
    header(s, S23, "Colab 시작하기 — 4단계");
    stepFlow(s, 1.7, [["구글 로그인", "Gmail 등\n구글 계정으로 로그인"], ["Colab 접속", "아래 주소로 접속\n(Chrome 권장)"], ["새 노트", "'새 노트' 버튼\n또는 파일 → 새 노트"], ["이름 바꾸기", "Untitled0.ipynb 클릭\n→ 이름 변경"]], 1.75);
    const bw = 7.6;
    const c = browserWin(s, MX, 3.7, bw, 2.45, "https://colab.research.google.com");
    s.addImage({ data: await icon(si.SiGooglecolab, "#F9AB00"), x: c.x + 0.1, y: c.y + 0.1, w: 0.45, h: 0.45 });
    s.addShape("rect", { x: c.x + 0.7, y: c.y + 0.12, w: 3.0, h: 0.4, fill: { color: "FFFFFF" }, line: { color: "2563EB", width: 1.5 } });
    dark(s, "Chap02_파이썬시작_실습.ipynb", { x: c.x + 0.8, y: c.y + 0.12, w: 2.9, h: 0.4, fontSize: 12, valign: "middle" });
    numBadge(s, 4, c.x + 3.8, c.y + 0.16, 0.3);
    dark(s, "파일   수정   보기   삽입   런타임   도구   도움말", { x: c.x + 0.7, y: c.y + 0.6, w: 5.5, h: 0.3, fontSize: 11, color: "475569" });
    s.addShape("roundRect", { x: c.x + 0.1, y: c.y + 1.05, w: c.w - 0.2, h: 0.55, rectRadius: 0.06, fill: { color: "F1F5F9" }, line: { color: "CBD5E1", width: 0.75 } });
    dark(s, "+ 코드     + 텍스트", { x: c.x + 0.25, y: c.y + 1.05, w: 3, h: 0.55, fontFace: F.b, fontSize: 12, color: "2563EB", valign: "middle" });
    txt(s, "(화면을 단순화한 그림)", { x: MX, y: 6.18, w: 3, h: 0.28, fontSize: 11, color: T.muted });
    const rx = MX + bw + 0.35, rw = CW - bw - 0.35;
    card(s, rx, 3.7, rw, 2.45, { fill: T.card2 });
    txt(s, [{ text: "파일은 어디에 저장될까?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "내 구글 드라이브 →", options: { breakLine: true } }, { text: "'Colab Notebooks' 폴더", options: { fontFace: F.sb, color: T.accent2, breakLine: true } }, { text: "에 자동으로 저장됩니다." }],
      { x: rx + 0.25, y: 3.7, w: rw - 0.5, h: 2.45, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.5, CW, 0.4, "이름 규칙", "Chap02_파이썬시작_실습.ipynb 처럼 장 번호를 붙이면 나중에 찾기 쉬워요.", T.cyan, 14);
    footer(s, COLAB);
  }
  {
    const s = add();
    header(s, S23, "Colab 화면 구성 한눈에 보기");
    const bw = 8.2;
    const c = browserWin(s, MX, 1.65, bw, 4.5, "colab.research.google.com/drive/…");
    // top bar
    s.addImage({ data: await icon(si.SiGooglecolab, "#F9AB00"), x: c.x + 0.1, y: c.y + 0.05, w: 0.4, h: 0.4 });
    dark(s, "Chap02_파이썬시작_실습.ipynb", { x: c.x + 0.6, y: c.y + 0.02, w: 3.5, h: 0.3, fontSize: 12, fontFace: F.b, valign: "middle" });
    dark(s, "파일  수정  보기  삽입  런타임  도구  도움말", { x: c.x + 0.6, y: c.y + 0.3, w: 4.5, h: 0.25, fontSize: 10, color: "475569", valign: "middle" });
    s.addShape("roundRect", { x: c.x + c.w - 1.2, y: c.y + 0.08, w: 1.1, h: 0.36, rectRadius: 0.18, fill: { color: "2563EB" }, line: { type: "none" } });
    txt(s, "공유", { x: c.x + c.w - 1.2, y: c.y + 0.08, w: 1.1, h: 0.36, fontFace: F.b, fontSize: 11, align: "center", valign: "middle" });
    // toolbar
    dark(s, "+ 코드   + 텍스트", { x: c.x + 0.6, y: c.y + 0.65, w: 2.5, h: 0.32, fontFace: F.b, fontSize: 11, color: "2563EB", valign: "middle" });
    s.addShape("roundRect", { x: c.x + c.w - 1.65, y: c.y + 0.65, w: 1.55, h: 0.32, rectRadius: 0.06, fill: { color: "DCFCE7" }, line: { type: "none" } });
    dark(s, "✓ RAM ▬ 디스크 ▬", { x: c.x + c.w - 1.6, y: c.y + 0.65, w: 1.5, h: 0.32, fontSize: 10, color: "166534", valign: "middle", align: "center" });
    // sidebar
    s.addShape("rect", { x: c.x, y: c.y + 1.05, w: 0.45, h: c.h - 1.1, fill: { color: "E2E8F0" }, line: { type: "none" } });
    s.addImage({ data: await icon(fa.FaFolder, "#475569"), x: c.x + 0.1, y: c.y + 1.9, w: 0.25, h: 0.25 });
    s.addImage({ data: await icon(fa.FaList, "#475569"), x: c.x + 0.1, y: c.y + 1.3, w: 0.25, h: 0.25 });
    // cells
    s.addShape("rect", { x: c.x + 0.6, y: c.y + 1.15, w: c.w - 0.75, h: 0.6, fill: { color: "F8FAFC" }, line: { color: "CBD5E1", width: 0.75 } });
    dark(s, "첫 번째 실습  (텍스트 셀)", { x: c.x + 0.75, y: c.y + 1.15, w: 4, h: 0.6, fontFace: F.b, fontSize: 14, valign: "middle" });
    s.addShape("ellipse", { x: c.x + 0.65, y: c.y + 2.0, w: 0.34, h: 0.34, fill: { color: "334155" }, line: { type: "none" } });
    s.addImage({ data: await icon(fa.FaPlay, "#FFFFFF"), x: c.x + 0.76, y: c.y + 2.08, w: 0.14, h: 0.17 });
    s.addShape("rect", { x: c.x + 1.1, y: c.y + 1.9, w: c.w - 1.25, h: 0.55, fill: { color: "F1F5F9" }, line: { color: "2563EB", width: 1 } });
    txt(s, hlRuns("print(\"Hello, Colab!\")").map((r) => ({ text: r.text, options: { color: r.options.color === T.codeText ? "1E293B" : r.options.color === "FCD34D" ? "B45309" : "0369A1" } })), { x: c.x + 1.2, y: c.y + 1.9, w: c.w - 1.5, h: 0.55, fontFace: F.code, fontSize: 13, valign: "middle" });
    dark(s, "Hello, Colab!", { x: c.x + 1.2, y: c.y + 2.5, w: 4, h: 0.4, fontFace: F.code, fontSize: 13 });
    const marks = [[1, c.x + 4.2, c.y + 0.0], [2, c.x + 2.9, c.y + 0.65], [3, c.x + c.w - 2.05, c.y + 0.65], [4, c.x + 0.05, c.y + 2.25], [5, c.x + 0.62, c.y + 2.42], [6, c.x + c.w - 0.5, c.y + 1.98]];
    marks.forEach(([n, x, y]) => numBadge(s, n, x, y, 0.3, T.pink));
    txt(s, "(화면을 단순화한 그림)", { x: MX, y: 6.18, w: 3, h: 0.28, fontSize: 11, color: T.muted });
    const rx = MX + bw + 0.3, rw = CW - bw - 0.3;
    const ex = [["노트 이름 · 메뉴", "런타임 메뉴를 자주 씀"], ["+ 코드 / + 텍스트", "새 셀 추가"], ["연결 상태 (RAM · 디스크)", "구글 컴퓨터와 연결됨"], ["왼쪽 패널", "목차 · 파일(폴더) 보기"], ["실행 버튼 ▶", "셀 실행 (Shift+Enter)"], ["코드 셀 · 결과", "결과는 셀 바로 아래"]];
    ex.forEach(([h, d], i) => {
      const y = 1.65 + i * 0.75;
      card(s, rx, y, rw, 0.65, { fill: T.card });
      numBadge(s, i + 1, rx + 0.15, y + 0.17, 0.3, T.pink);
      txt(s, [{ text: h, options: { fontFace: F.b, fontSize: 14, color: T.accent2, breakLine: true } }, { text: d, options: { fontSize: 12, color: T.text } }], { x: rx + 0.55, y, w: rw - 0.65, h: 0.65, valign: "middle" });
    });
    footer(s, COLAB);
  }
  {
    const s = add();
    header(s, S23, "셀은 두 종류 — 코드 셀과 텍스트 셀");
    const hw = (CW - 0.4) / 2;
    txt(s, "코드 셀  (+ 코드)", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 18, color: T.yellow });
    codeBlock(s, MX, 2.05, hw, ["# 주석(메모) — 실행 안 됨", "price = 1500", "count = 3", "price * count"], { fs: 14, lh: 0.3 });
    outputBox(s, MX, 4.1, hw, 0.75, "4500", { fs: 15 });
    txt(s, "파이썬 코드를 쓰고 실행 → 결과가 아래에 나옴", { x: MX, y: 4.95, w: hw, h: 0.6, fontSize: 15 });
    const rx = MX + hw + 0.4;
    txt(s, "텍스트 셀  (+ 텍스트)", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 18, color: T.accent2 });
    s.addShape("roundRect", { x: rx, y: 2.05, w: hw / 2 - 0.1, h: 2.75, rectRadius: 0.08, fill: { color: T.codeBg }, line: { color: T.accent, width: 1, transparency: 40 } });
    txt(s, "# 2장 실습\n\n**매출 계산**을\n해 봅시다.\n\n- 가격 : 1500원\n- 수량 : 3개", { x: rx + 0.15, y: 2.15, w: hw / 2 - 0.35, h: 2.55, fontFace: F.code, fontSize: 13, color: T.codeText });
    s.addShape("rightArrow", { x: rx + hw / 2 - 0.08, y: 3.25, w: 0.26, h: 0.3, fill: { color: T.accent }, line: { type: "none" } });
    s.addShape("roundRect", { x: rx + hw / 2 + 0.2, y: 2.05, w: hw / 2 - 0.2, h: 2.75, rectRadius: 0.08, fill: { color: "F8FAFC" }, line: { type: "none" } });
    dark(s, [{ text: "2장 실습", options: { fontFace: F.xb, fontSize: 20, breakLine: true } }, { text: " ", options: { fontSize: 6, breakLine: true } }, { text: "매출 계산", options: { fontFace: F.b, breakLine: false } }, { text: "을 해 봅시다.", options: { breakLine: true } }, { text: " ", options: { fontSize: 6, breakLine: true } }, { text: "• 가격 : 1500원", options: { breakLine: true } }, { text: "• 수량 : 3개" }],
      { x: rx + hw / 2 + 0.35, y: 2.15, w: hw / 2 - 0.5, h: 2.55, fontSize: 14 });
    txt(s, "설명 · 메모를 쓰는 칸. 마크다운(Markdown) 기호로 꾸밈", { x: rx, y: 4.95, w: hw, h: 0.6, fontSize: 15 });
    tip(s, MX, 6.15, CW, 0.6, "마크다운 기호", "#  제목   **굵게**   -  목록   — 텍스트 셀을 더블클릭하면 편집, Shift+Enter 로 완성!", T.cyan, 15);
    footer(s, COLAB + " — Markdown Guide");
  }
  {
    const s = add();
    header(s, S23, "첫 코드 실행하기 — [ ] 안의 숫자 읽기");
    const lw = 7.0;
    const cells = [["[ ]", "print(\"Hello, Colab!\")", null, "아직 실행 전"], ["[1]", "print(\"Hello, Colab!\")", "Hello, Colab!", "1번째로 실행됨"], ["[2]", "10 + 20", "30", "2번째로 실행됨"]];
    cells.forEach(([n, code, out, note], i) => {
      const y = 1.7 + i * 1.45;
      txt(s, n, { x: MX, y, w: 0.6, h: 0.5, fontFace: F.code, fontSize: 15, color: i ? T.accent2 : T.muted, valign: "middle" });
      s.addShape("rect", { x: MX + 0.65, y, w: lw - 0.65, h: 0.5, fill: { color: T.codeBg }, line: { color: T.accent, width: 0.75, transparency: 40 } });
      txt(s, hlRuns(code), { x: MX + 0.8, y, w: lw - 0.9, h: 0.5, fontFace: F.code, fontSize: 15, valign: "middle" });
      if (out) txt(s, out, { x: MX + 0.8, y: y + 0.55, w: lw - 0.9, h: 0.4, fontFace: F.code, fontSize: 15, color: T.green, valign: "middle" });
      txt(s, "← " + note, { x: MX + lw + 0.2, y, w: 2.3, h: 0.5, fontSize: 14, color: T.text, valign: "middle" });
    });
    const rx = MX + lw + 2.5, rw = CW - lw - 2.5;
    card(s, rx, 1.7, rw, 4.3, { fill: T.card2 });
    txt(s, [{ text: "[ 숫자 ] 의 뜻", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "셀이 '몇 번째로' 실행되었는지를 알려 주는 번호표입니다.", options: { breakLine: true } }, { text: " ", options: { fontSize: 8, breakLine: true } },
      { text: "마지막 줄 결과", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "print 없이 10 + 20 만 써도, 셀의 마지막 줄 값은 자동으로 보여 줘요." }],
      { x: rx + 0.25, y: 1.7, w: rw - 0.5, h: 4.3, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "처음 실행할 때", "첫 실행은 구글 컴퓨터에 '연결'하느라 몇 초 걸려요. 두 번째부터는 빨라집니다.", T.cyan);
    footer(s, COLAB);
  }
  {
    const s = add();
    header(s, S23, "꼭 외울 Colab 단축키");
    const keys = [["Shift + Enter", "실행하고 다음 셀로 이동", true], ["Ctrl + Enter", "실행하고 제자리에 있기", false], ["Alt + Enter", "실행하고 아래에 새 셀 추가", false], ["Ctrl + M  →  B", "아래에 코드 셀 추가", false], ["Ctrl + M  →  A", "위에 코드 셀 추가", false], ["Ctrl + M  →  M", "텍스트(마크다운) 셀로 바꾸기", false], ["Ctrl + M  →  Y", "코드 셀로 바꾸기", false], ["Ctrl + M  →  D", "셀 삭제", false]];
    const cw = (CW - 0.3) / 2;
    keys.forEach(([k, d, star], i) => {
      const x = MX + Math.floor(i / 4) * (cw + 0.3), y = 1.7 + (i % 4) * 1.02;
      card(s, x, y, cw, 0.86, { fill: T.card, line: star ? T.yellow : undefined, lw: 1.5 });
      s.addShape("roundRect", { x: x + 0.25, y: y + 0.18, w: 2.7, h: 0.5, rectRadius: 0.08, fill: { color: "1E2A5A" }, line: { color: T.accent2, width: 1 } });
      txt(s, k, { x: x + 0.25, y: y + 0.18, w: 2.7, h: 0.5, fontFace: F.code, fontSize: 15, color: star ? T.yellow : T.white, align: "center", valign: "middle" });
      txt(s, d, { x: x + 3.15, y, w: cw - 3.3, h: 0.86, fontSize: 16, valign: "middle" });
    });
    tip(s, MX, 5.95, CW, 0.75, "외우는 요령", "Ctrl + M 을 먼저 눌렀다 떼고 → 알파벳.   B = Below(아래),  A = Above(위),  M = Markdown,  D = Delete.   전체 목록 : Ctrl + M → H", T.yellow, 14);
    footer(s, COLAB + " — 도구 → 단축키");
  }
  {
    const s = add();
    header(s, S23, "주의 · 셀을 실행한 '순서'가 중요해요");
    const hw = (CW - 0.4) / 2;
    txt(s, "✗  아래 셀을 먼저 실행하면", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeBlock(s, MX, 2.05, hw, ["price = 1500        # 셀 ① (아직 실행 안 함)"], { label: "셀 ①", fs: 13, noNums: true });
    codeBlock(s, MX, 3.25, hw, ["price * 3           # 셀 ② 를 먼저 실행"], { label: "셀 ②", fs: 13, noNums: true });
    s.addShape("roundRect", { x: MX, y: 4.45, w: hw, h: 0.7, rectRadius: 0.08, fill: { color: T.pink, transparency: 88 }, line: { color: T.pink, width: 1 } });
    txt(s, "NameError: name 'price' is not defined", { x: MX + 0.2, y: 4.45, w: hw - 0.4, h: 0.7, fontFace: F.code, fontSize: 14, color: T.pink, valign: "middle" });
    txt(s, "'price 라는 이름을 아직 모른다' — 셀 ①을 실행하지 않았기 때문", { x: MX, y: 5.25, w: hw, h: 0.6, fontSize: 14, color: T.text });
    const rx = MX + hw + 0.4;
    txt(s, "✓  위에서부터 차례대로 실행하면", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    codeBlock(s, rx, 2.05, hw, ["price = 1500        # 셀 ① 먼저 실행"], { label: "셀 ①", fs: 13, noNums: true });
    codeBlock(s, rx, 3.25, hw, ["price * 3           # 그다음 셀 ②"], { label: "셀 ②", fs: 13, noNums: true });
    outputBox(s, rx, 4.45, hw, 0.8, "4500", { fs: 15 });
    txt(s, "셀들은 '기억'을 공유합니다. 앞 셀에서 만든 값을 뒤 셀이 사용해요.", { x: rx, y: 5.3, w: hw, h: 0.6, fontSize: 14, color: T.text });
    tip(s, MX, 6.3, CW, 0.5, "꼬였을 때", "메뉴 런타임 → '모두 실행' 을 누르면 위에서부터 차례대로 다시 실행됩니다.", T.green);
    footer(s, COLAB);
  }
  {
    const s = add();
    header(s, S23, "내 데이터 불러오기 ① — 파일 업로드");
    stepFlow(s, 1.7, [["폴더 아이콘 클릭", "왼쪽 패널의 폴더(파일) 아이콘"], ["업로드", "업로드 아이콘 클릭 또는 파일을 끌어다 놓기"], ["경로 복사", "파일 오른쪽 ⋮ → '경로 복사'"], ["코드에서 사용", "/content/파일이름 으로 읽기"]], 1.5);
    const lw = 7.4;
    const cb = codeBlock(s, MX, 3.45, lw, ["import pandas as pd", "df = pd.read_csv('/content/sales_2024.csv')", "df.head()"], { fs: 14, lh: 0.36, markers: { 1: 1 } });
    explainList(s, MX, 3.45 + cb.h + 0.15, lw, [[1, "/content/", "Colab 컴퓨터의 기본 작업 폴더 (01장 예제의 경로)"]], { ih: 0.6, inline: true });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 3.45, rw, 2.6, { fill: T.pink, ft: 88, line: T.pink });
    txt(s, [{ text: "주의 : 임시 보관함!", options: { fontFace: F.b, color: T.pink, breakLine: true } }, { text: "이렇게 올린 파일은 런타임(구글 컴퓨터 연결)이 끝나면 사라집니다. 다음 날 다시 열면 또 올려야 해요." }],
      { x: rx + 0.25, y: 3.45, w: rw - 0.5, h: 2.6, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "계속 쓰는 파일이라면", "다음 장의 '구글 드라이브 연결'을 사용하세요.", T.cyan);
    footer(s, COLAB + " — External data: Local files, Drive");
  }
  {
    const s = add();
    header(s, S23, "내 데이터 불러오기 ② — 구글 드라이브 연결");
    const lw = 7.4;
    const cb = codeBlock(s, MX, 1.65, lw, ["from google.colab import drive", "drive.mount('/content/drive')", "import pandas as pd", "df = pd.read_csv(", "    '/content/drive/MyDrive/data/sales_2024.csv')"], { fs: 13, lh: 0.32, markers: { 0: 1, 1: 2, 4: 3 } });
    outputBox(s, MX, 1.65 + cb.h + 0.12, lw, 0.72, "Mounted at /content/drive", { fs: 14 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    explainList(s, rx, 1.65, rw, [[1, "drive 도구 빌리기", "Colab 전용 기능"], [2, "드라이브 연결(mount)", "권한 허용 창 → 구글 계정 선택 → 허용"], [3, "드라이브 경로로 읽기", "MyDrive = '내 드라이브'"]], { ih: 0.95, gap: 0.12 });
    // path diagram
    const py = 5.25;
    const parts = [["/content/drive", "연결된 드라이브"], ["/MyDrive", "내 드라이브"], ["/data", "내가 만든 폴더"], ["/sales_2024.csv", "파일"]];
    const pw = (CW - 0.45) / 4;
    parts.forEach(([p, d], i) => {
      const x = MX + i * (pw + 0.15);
      s.addShape("roundRect", { x, y: py, w: pw, h: 0.55, rectRadius: 0.08, fill: { color: T.accent, transparency: 60 - i * 10 }, line: { type: "none" } });
      txt(s, p, { x, y: py, w: pw, h: 0.55, fontFace: F.code, fontSize: 13, align: "center", valign: "middle" });
      txt(s, d, { x, y: py + 0.6, w: pw, h: 0.35, fontSize: 13, color: T.text, align: "center" });
    });
    tip(s, MX, 6.3, CW, 0.5, "장점", "드라이브에 둔 파일은 사라지지 않아 매 수업마다 다시 올릴 필요가 없어요.", T.green);
    footer(s, COLAB + " — External data: Drive");
  }
  {
    const s = add();
    header(s, S23, "런타임 이해하기 — 구글 컴퓨터를 '빌려' 쓰는 시간");
    const hw = 6.2;
    card(s, MX, 1.7, hw, 2.2, { fill: T.card });
    txt(s, [{ text: "런타임(runtime) 이란?", options: { fontFace: F.b, color: T.accent2, breakLine: true } }, { text: "내 노트북에 연결된 구글의 가상 컴퓨터. 코드는 내 컴퓨터가 아니라 여기서 실행됩니다." }],
      { x: MX + 0.3, y: 1.7, w: hw - 0.6, h: 2.2, fontSize: 16, valign: "middle", paraSpaceAfter: 6 });
    const st = [["약 90분", "아무것도 안 하면 연결이 끊김 (유휴 시간)", T.yellow], ["최대 12시간", "무료 버전에서 한 번에 쓸 수 있는 최대 시간", T.cyan]];
    st.forEach(([n, l, c], i) => {
      const y = 4.1 + i * 1.0;
      card(s, MX, y, hw, 0.85, { fill: T.card2 });
      txt(s, n, { x: MX + 0.25, y, w: 2.0, h: 0.85, fontFace: F.xb, fontSize: 24, color: c, valign: "middle" });
      txt(s, l, { x: MX + 2.3, y, w: hw - 2.5, h: 0.85, fontSize: 14, valign: "middle" });
    });
    const rx = MX + hw + 0.35, rw = CW - hw - 0.35;
    txt(s, "런타임 메뉴에서 자주 쓰는 것", { x: rx, y: 1.7, w: rw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.accent2 });
    const menu = [["모두 실행", "위에서부터 모든 셀 실행"], ["세션 다시 시작", "기억(변수)을 지우고 새로 시작"], ["런타임 유형 변경", "GPU 등 선택 (12장 이후)"], ["런타임 연결 해제 및 삭제", "가상 컴퓨터 반납 · 업로드 파일 삭제"]];
    menu.forEach(([m, d], i) => {
      const y = 2.2 + i * 0.97;
      card(s, rx, y, rw, 0.85, { fill: T.card });
      txt(s, [{ text: m, options: { fontFace: F.b, fontSize: 15, breakLine: true } }, { text: d, options: { fontSize: 13, color: T.text } }], { x: rx + 0.25, y, w: rw - 0.4, h: 0.85, valign: "middle" });
    });
    tip(s, MX, 6.3, CW, 0.5, "기억할 것", "연결이 끊겨도 노트(코드)는 드라이브에 남아요. 단, 변수와 업로드 파일은 다시 실행 · 업로드!", T.yellow, 15);
    footer(s, COLAB + " — 시간 제한은 이용 상황에 따라 바뀔 수 있음");
  }
  {
    const s = add();
    header(s, S23, "저장 · 공유 · 내려받기");
    const cw = (CW - 0.6) / 3;
    const it = [[fa.FaSave, "저장", ["자동 저장 (구글 드라이브)", "직접 저장 : Ctrl + S", "드라이브 → Colab Notebooks"]], [fa.FaShareAlt, "공유", ["오른쪽 위 '공유' 버튼", "구글 문서처럼 링크 · 권한 설정", "과제 제출 시 링크 공유"]],
      [fa.FaFileDownload, "내려받기", ["파일 → 다운로드", ".ipynb : 노트북 그대로 (Jupyter에서 열림)", ".py : 코드만 파이썬 파일로"]]];
    for (let i = 0; i < 3; i++) {
      const [Ic, h, pts] = it[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.7, cw, 4.3, { fill: T.card });
      await iconCircle(s, Ic, x + 0.3, 1.95, 0.85);
      txt(s, h, { x: x + 1.35, y: 1.95, w: cw - 1.5, h: 0.85, fontFace: F.b, fontSize: 22, valign: "middle" });
      pts.forEach((p, j) => {
        const y = 3.1 + j * 0.85;
        s.addShape("ellipse", { x: x + 0.35, y: y + 0.22, w: 0.12, h: 0.12, fill: { color: T.accent2 }, line: { type: "none" } });
        txt(s, p, { x: x + 0.6, y, w: cw - 0.85, h: 0.6, fontSize: 15, valign: "middle" });
      });
    }
    tip(s, MX, 6.3, CW, 0.5, "다른 사람 노트를 받았다면", "파일 → '드라이브에 사본 저장' 을 먼저! 그래야 내 것으로 수정할 수 있어요.", T.cyan);
    footer(s, COLAB);
  }
  {
    const s = add();
    header(s, S23, "Colab의 AI 도우미 (Gemini) 똑똑하게 쓰기");
    const hw = (CW - 0.4) / 2;
    card(s, MX, 1.7, hw, 4.35, { fill: T.card });
    await iconCircle(s, fa.FaRobot, MX + 0.3, 1.95, 0.85, T.cyan);
    txt(s, "이런 걸 도와줘요", { x: MX + 1.35, y: 1.95, w: hw - 1.5, h: 0.85, fontFace: F.b, fontSize: 20, valign: "middle" });
    const chk = await icon(fa.FaCheck, "#34D399");
    ["말로 설명하면 코드를 만들어 줌", "오류가 나면 원인과 해결 방법을 설명", "어려운 코드를 한 줄씩 풀이"].forEach((p, j) => {
      const y = 3.1 + j * 0.8;
      s.addImage({ data: chk, x: MX + 0.35, y: y + 0.15, w: 0.24, h: 0.24 });
      txt(s, p, { x: MX + 0.8, y, w: hw - 1.0, h: 0.55, fontSize: 16, valign: "middle" });
    });
    const rx = MX + hw + 0.4;
    card(s, rx, 1.7, hw, 4.35, { fill: T.card, line: T.pink });
    await iconCircle(s, fa.FaExclamationTriangle, rx + 0.3, 1.95, 0.85, T.pink);
    txt(s, "이렇게 쓰세요", { x: rx + 1.35, y: 1.95, w: hw - 1.5, h: 0.85, fontFace: F.b, fontSize: 20, valign: "middle" });
    ["먼저 스스로 오류 메시지를 읽어 보기", "AI 답이 항상 맞지는 않아요 — 실행해서 확인", "받은 코드는 한 줄씩 이해한 뒤 사용"].forEach((p, j) => {
      const y = 3.1 + j * 0.8;
      numBadge(s, j + 1, rx + 0.3, y + 0.1, 0.34, T.pink);
      txt(s, p, { x: rx + 0.8, y, w: hw - 1.0, h: 0.55, fontSize: 16, valign: "middle" });
    });
    tip(s, MX, 6.3, CW, 0.5, "수업 원칙", "AI는 '선생님'이 아니라 '도우미'입니다. 이해하지 못한 코드는 내 실력이 되지 않아요!", T.yellow);
    footer(s, "Google Colab — AI 기능 (화면 · 메뉴 이름은 업데이트에 따라 달라질 수 있음)");
  }
  await summary(S23, "2.3 핵심 정리", [
    ["Colab", "설치 없이 웹에서 쓰는 Jupyter — 패키지 미리 설치, 드라이브에 저장"],
    ["셀", "코드 셀(실행) · 텍스트 셀(설명) — Shift + Enter 로 실행"],
    ["데이터 불러오기", "업로드(/content, 임시) · 드라이브 연결(/content/drive/MyDrive, 영구)"],
    ["런타임", "구글 컴퓨터를 빌리는 시간 — 끊기면 변수 · 업로드 파일은 다시!"],
  ], "02장 정리와 실습 체크리스트");

  // ---- wrap-up
  sec("마무리");
  {
    const s = add();
    header(s, "02장 마무리", "실습 체크리스트 — 오늘 직접 해 보기");
    const tasks = [["Colab 접속", "colab.research.google.com 에 구글 계정으로 로그인"], ["새 노트 만들기", "이름을 Chap02_파이썬시작_실습 으로 변경"], ["첫 코드 실행", "print(\"Hello, Colab!\") 입력 → Shift + Enter"], ["텍스트 셀 추가", "'2장 실습' 제목 쓰기 (Ctrl + M → M)"], ["패키지 설치", "!pip install wordcloud → Successfully 확인"], ["드라이브 연결", "drive.mount('/content/drive') 실행 → 허용"]];
    const cw = (CW - 0.3) / 2;
    for (let i = 0; i < 6; i++) {
      const [h, d] = tasks[i];
      const x = MX + Math.floor(i / 3) * (cw + 0.3), y = 1.7 + (i % 3) * 1.4;
      card(s, x, y, cw, 1.2, { fill: T.card });
      s.addImage({ data: await icon(fa.FaRegSquare, "#FACC15"), x: x + 0.3, y: y + 0.38, w: 0.42, h: 0.42 });
      txt(s, (i + 1) + ". " + h, { x: x + 0.95, y: y + 0.14, w: cw - 1.1, h: 0.45, fontFace: F.b, fontSize: 17 });
      txt(s, hlRuns(d).map((r) => ({ text: r.text, options: { color: r.options.color === T.codeText ? T.text : r.options.color } })), { x: x + 0.95, y: y + 0.6, w: cw - 1.1, h: 0.5, fontSize: 14 });
    }
    tip(s, MX, 6.0, CW, 0.7, "제출", "완성한 노트는 '공유' 버튼으로 링크를 복사해 제출합니다. (제출 방법은 수업 공지 확인)", T.green, 15);
    footer(s);
  }
  {
    const s = add();
    header(s, "02장 마무리", "오늘 배운 것 한 장 요약");
    const q = [["2.1", "어떻게 설치?", "Anaconda : Just Me · 영어 경로 · PATH 체크 안 함 → Prompt 에서 버전 확인"], ["2.2", "도구 추가는?", "pip / conda install — Colab 은 !pip install, 오류는 마지막 줄부터 읽기"], ["2.3", "Colab 은?", "셀 실행(Shift+Enter) · 순서 주의 · 드라이브 연결로 파일 불러오기"]];
    q.forEach(([n, h, d], i) => {
      const y = 1.75 + i * 1.3;
      card(s, MX, y, CW, 1.1, { fill: T.card });
      txt(s, n, { x: MX + 0.25, y, w: 0.9, h: 1.1, fontFace: F.xb, fontSize: 24, color: T.accent2, valign: "middle" });
      txt(s, h, { x: MX + 1.25, y, w: 2.4, h: 1.1, fontFace: F.b, fontSize: 18, valign: "middle" });
      txt(s, d, { x: MX + 3.7, y, w: CW - 3.9, h: 1.1, fontSize: 16, color: T.text, valign: "middle" });
    });
    tip(s, MX, 5.85, CW, 0.75, "다음 시간", "Colab 에서 본격적으로 코드를 씁니다 — 변수와 데이터 유형 (숫자 · 문자 · True/False)", T.cyan, 16);
    footer(s);
  }
  {
    const s = add();
    header(s, "02장 마무리", "참고문헌 및 참고자료");
    const refs = [
      "김진성. 「비즈니스 데이터 분석 with Python」 02. 파이썬 시작. WikiDocs. https://wikidocs.net/205226 · /287232 · /205404 · /232742",
      "Anaconda. Installing Anaconda Distribution. https://www.anaconda.com/docs/getting-started/anaconda/install",
      "Anaconda. Anaconda Distribution 2025.x release notes. https://www.anaconda.com/docs/getting-started/anaconda/release/2025.x",
      "Anaconda. Anaconda Navigator. https://www.anaconda.com/docs/tools/anaconda-navigator",
      "conda. User Guide — Managing packages. https://docs.conda.io/projects/conda/en/latest/user-guide/",
      "pip. User Guide. https://pip.pypa.io/en/stable/user_guide/  ·  PyPI. https://pypi.org",
      "Python Software Foundation. Using Python on Windows. https://docs.python.org/3/using/windows.html",
      "Python Software Foundation. Built-in Exceptions. https://docs.python.org/3/library/exceptions.html",
      "Project Jupyter. Jupyter Notebook Documentation. https://docs.jupyter.org",
      "Google. Colaboratory FAQ. https://research.google.com/colaboratory/faq.html",
      "Google. Colab 시작하기 · External data (Local files, Drive). https://colab.research.google.com",
    ];
    txt(s, refs.map((r, i) => ({ text: r, options: { bullet: { type: "number" }, breakLine: i < refs.length - 1 } })), { x: MX, y: 1.6, w: CW, h: 5.2, fontSize: 13, color: T.text, paraSpaceAfter: 6 });
    footer(s);
  }
  {
    const s = add();
    s.background = { color: T.bg };
    s.addShape("rect", { x: 0, y: 0, w: 0.08, h: 7.5, fill: { color: T.accent }, line: { type: "none" } });
    s.addImage({ data: await icon(si.SiPython, "#1E2A5A"), x: 8.6, y: 1.6, w: 4.0, h: 4.0 });
    txt(s, "감사합니다.", { x: 1.0, y: 2.6, w: 8, h: 1.1, fontFace: F.xb, fontSize: 54 });
    txt(s, "비즈니스 데이터 분석 with Python  ·  02장. 파이썬 시작", { x: 1.0, y: 3.8, w: 9, h: 0.5, fontSize: 20, color: T.text });
    txt(s, "질문은 언제든 환영합니다", { x: 1.0, y: 4.5, w: 8, h: 0.5, fontSize: 18, color: T.accent2 });
    footer(s);
  }
};
