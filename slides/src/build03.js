// CH03 변수와 데이터 유형 — intro + 3.1 변수
const fa = require("react-icons/fa");
const si = require("react-icons/si");
const L = require("./lib");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox, hlRuns } = L;
const { makeDeck } = require("./deck");

const SRC = "wikidocs 「비즈니스 데이터 분석 with Python」(김진성)";
const PYT = "Python Tutorial (docs.python.org/3/tutorial)";
const S31 = "SECTION 1.1  ·  변수", S32 = "SECTION 02  ·  데이터 형식", S33 = "SECTION 1.2  ·  전역 변수와 지역 변수", S34 = "SECTION 1.3  ·  연산자";
const D = makeDeck("비즈니스 데이터 분석 with Python - 02장. 변수와 데이터 유형");
const { add, sec } = D;

// variable box drawing: label tag + box with value
function varBox(s, x, y, name, value, opts = {}) {
  const w = opts.w || 2.4, h = opts.h || 1.5, c = opts.color || T.accent2;
  s.addShape("roundRect", { x, y: y + 0.35, w, h, rectRadius: 0.1, fill: { color: T.card }, line: { color: c, width: 2 } });
  s.addShape("roundRect", { x: x + 0.25, y, w: w - 0.5, h: 0.6, rectRadius: 0.1, fill: { color: c }, line: { type: "none" } });
  txt(s, name, { x: x + 0.25, y, w: w - 0.5, h: 0.6, fontFace: F.code, fontSize: 17, color: T.bg, align: "center", valign: "middle" });
  txt(s, value, { x, y: y + 0.95, w, h: h - 0.6, fontFace: F.code, fontSize: opts.fs || 24, color: opts.vc || T.yellow, align: "center", valign: "middle" });
}
function codeOut(s, x, y, w, lines, out, opts = {}) {
  const cb = codeBlock(s, x, y, w, lines, Object.assign({ fs: 15, lh: 0.36 }, opts));
  if (out != null) outputBox(s, x, y + cb.h + 0.15, w, opts.oh || (0.55 + out.split("\n").length * 0.27), out, { fs: opts.ofs || 14 });
  return cb;
}

(async () => {
  // ================= intro =================
  sec("표지");
  await D.titleSlide("02장. 변수와 데이터 유형", "01. 변수와 연산자  —  1.1 변수  /  1.2 전역 변수와 지역 변수  /  1.3 연산자", SRC + " · Chap02 실습 파일  ·  Python 공식 문서로 보완", fa.FaBoxOpen);
  {
    const s = add();
    header(s, "비즈니스 데이터 분석 with Python", "Contents — 02장. 변수와 데이터 유형");
    txt(s, "01. 변수와 연산자  ·  실습 파일 : Chap02 실습 노트북 (.ipynb)", { x: MX, y: 1.6, w: 9, h: 0.4, fontFace: F.sb, fontSize: 16, color: T.accent2 });
    const items = [["1.1", "변수", "값을 담는\n이름표 붙은 상자", fa.FaBoxOpen], ["1.2", "전역 · 지역 변수", "변수가 '보이는'\n범위", fa.FaHome], ["1.3", "연산자", "계산하고 비교하는\n기호들", fa.FaCalculator]];
    const cw = (CW - 0.6) / 3;
    for (let i = 0; i < 3; i++) {
      const [n, t, d, Ic] = items[i];
      const x = MX + i * (cw + 0.3), y = 2.3;
      card(s, x, y, cw, 3.9, { fill: T.card });
      await iconCircle(s, Ic, x + 0.3, y + 0.35, 0.9);
      txt(s, n, { x: x + 0.3, y: y + 1.5, w: cw - 0.6, h: 0.6, fontFace: F.xb, fontSize: 30, color: T.accent2 });
      txt(s, t, { x: x + 0.3, y: y + 2.15, w: cw - 0.4, h: 0.5, fontFace: F.b, fontSize: 19 });
      txt(s, d, { x: x + 0.3, y: y + 2.8, w: cw - 0.5, h: 0.9, fontSize: 15, color: T.text });
    }
    footer(s, SRC);
  }
  {
    const s = add();
    header(s, "02장 시작하기", "오늘의 예제 : '파이썬 카페'의 매출 계산하기");
    const lw = 6.0;
    card(s, MX, 1.7, lw, 4.35, { fill: T.card });
    await iconCircle(s, fa.FaCoffee, MX + 0.3, 1.95, 0.9, T.yellow, "#FFFFFF", 60);
    txt(s, "파이썬 카페 오늘의 장부", { x: MX + 1.4, y: 1.95, w: lw - 1.6, h: 0.9, fontFace: F.b, fontSize: 20, valign: "middle" });
    const rows = [["메뉴", "아메리카노"], ["가격", "4,500원"], ["판매량", "120잔"], ["할인 중?", "예 (10%)"]];
    rows.forEach(([k, v], i) => {
      const y = 3.1 + i * 0.68;
      s.addShape("rect", { x: MX + 0.3, y, w: lw - 0.6, h: 0.58, fill: { color: i % 2 ? T.card2 : T.deep }, line: { type: "none" } });
      txt(s, k, { x: MX + 0.5, y, w: 2, h: 0.58, fontFace: F.sb, fontSize: 16, color: T.accent2, valign: "middle" });
      txt(s, v, { x: MX + 2.6, y, w: lw - 3.1, h: 0.58, fontSize: 16, valign: "middle" });
    });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    txt(s, "오늘 배울 것으로 바꾸면 →", { x: rx, y: 1.7, w: rw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    const map = [["값에 이름 붙이기", "변수", "1.1"], ["숫자인지 글자인지", "type( ) · 형 변환", "1.1"], ["어디서 쓸 수 있나", "전역 · 지역 변수", "1.2"], ["매출 = 가격 × 판매량", "연산자", "1.3"]];
    map.forEach(([a, b, n], i) => {
      const y = 2.25 + i * 0.95;
      card(s, rx, y, rw, 0.8, { fill: T.card2 });
      txt(s, n, { x: rx + 0.2, y, w: 0.7, h: 0.8, fontFace: F.xb, fontSize: 18, color: T.accent2, valign: "middle" });
      txt(s, a, { x: rx + 0.95, y, w: 3.0, h: 0.8, fontSize: 15, valign: "middle" });
      txt(s, b, { x: rx + 3.9, y, w: rw - 4.0, h: 0.8, fontFace: F.b, fontSize: 16, color: T.yellow, valign: "middle" });
    });
    tip(s, MX, 6.3, CW, 0.5, "목표", "수업이 끝나면 이 장부를 파이썬 코드로 계산하고 보기 좋게 출력할 수 있어요!", T.green);
    footer(s);
  }

  // ======================= 3.1 변수 =======================
  sec("1.1 변수");
  await D.divider("1.1", "변수", "값을 담아 두는 '이름표 붙은 상자'", ["변수 만들기와 = 의 진짜 뜻", "변수 이름 규칙", "자주 만나는 오류"], fa.FaBoxOpen);
  {
    const s = add();
    header(s, S31, "변수 = 값을 담는 '이름표 붙은 상자'");
    varBox(s, MX + 0.2, 1.8, "price", "4500");
    varBox(s, MX + 2.9, 1.8, "menu", "\"아메리카노\"", { fs: 16 });
    varBox(s, MX + 5.6, 1.8, "count", "120");
    txt(s, "상자(메모리 공간)에 이름표(변수 이름)를 붙이고 값을 넣어 둡니다.", { x: MX, y: 3.85, w: 8.2, h: 0.5, fontSize: 16, color: T.text });
    const rx = MX + 8.4, rw = CW - 8.4;
    codeBlock(s, rx, 1.8, rw, ["price = 4500", "menu = \"아메리카노\"", "count = 120"], { fs: 14, lh: 0.4, label: "파이썬으로 쓰면" });
    card(s, MX, 4.55, CW, 1.5, { fill: T.card2 });
    txt(s, [{ text: "왜 변수를 쓸까?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "4500 이라는 숫자만 보면 무슨 뜻인지 모르지만, price 라는 이름이 붙으면 '가격'임을 알 수 있어요. 또 값을 한 번 저장해 두면 몇 번이고 다시 꺼내 쓸 수 있습니다." }],
      { x: MX + 0.3, y: 4.55, w: CW - 0.6, h: 1.5, fontSize: 16, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "비유", "엑셀에서 셀에 이름을 붙여 두고 수식에서 그 이름으로 부르는 것과 비슷해요.", T.cyan);
    footer(s, SRC + ", " + PYT);
  }
  {
    const s = add();
    header(s, S31, "= 는 '같다'가 아니라 '넣어라(할당)'");
    s.addShape("roundRect", { x: MX, y: 1.75, w: 7.2, h: 1.6, rectRadius: 0.12, fill: { color: T.codeBg }, line: { color: T.accent, width: 1 } });
    txt(s, [{ text: "price", options: { color: T.codeText } }, { text: "  =  ", options: { color: T.pink } }, { text: "4500", options: { color: T.yellow } }], { x: MX, y: 1.75, w: 7.2, h: 1.6, fontFace: F.code, fontSize: 40, align: "center", valign: "middle" });
    s.addShape("leftArrow", { x: MX + 2.4, y: 3.5, w: 3.2, h: 0.5, fill: { color: T.yellow }, line: { type: "none" } });
    txt(s, "오른쪽 값을 왼쪽 상자에 넣는다", { x: MX, y: 4.05, w: 7.2, h: 0.45, fontFace: F.sb, fontSize: 17, color: T.yellow, align: "center" });
    const rx = MX + 7.55, rw = CW - 7.55;
    txt(s, "수학에서는 말이 안 되지만…", { x: rx, y: 1.75, w: rw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.accent2 });
    codeOut(s, rx, 2.2, rw, ["count = 120", "count = count + 1", "print(count)"], "121", { fs: 14 });
    txt(s, "① count + 1 을 먼저 계산(121)\n② 그 결과를 다시 count 에 넣음", { x: rx, y: 5.15, w: rw, h: 0.8, fontSize: 14, color: T.text });
    card(s, MX, 4.75, 7.2, 1.3, { fill: T.card2 });
    txt(s, [{ text: "읽는 법  ", options: { fontFace: F.b, color: T.accent2 } }, { text: "price = 4500 은 'price 는 4500 이다'보다 'price 에 4500 을 넣어라'로 읽으세요. '같다'는 == (등호 2개)로 씁니다 (1.3절)." }],
      { x: MX + 0.3, y: 4.75, w: 6.6, h: 1.3, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "핵심", "= 는 할당 연산자 — 따로 '선언'할 필요 없이, 값을 넣는 순간 변수가 만들어지고 타입도 정해져요.");
    footer(s, PYT + " — An Informal Introduction");
  }
  {
    const s = add();
    header(s, S31, "변수로 매출 계산하기 — 첫 번째 실습");
    const lw = 7.0;
    const cb = codeBlock(s, MX, 1.65, lw, ["price = 4500          # 가격", "count = 120           # 판매량", "sales = price * count # 매출 = 가격 × 판매량", "print(sales)"], { fs: 14, lh: 0.38, markers: { 0: 1, 2: 2, 3: 3 } });
    outputBox(s, MX, 1.65 + cb.h + 0.15, lw, 0.85, "540000", { fs: 16 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    explainList(s, rx, 1.65, rw, [[1, "값 저장", "가격과 판매량을 각각 이름표 상자에 넣기"], [2, "변수끼리 계산", "숫자 대신 이름으로 계산 → 결과를 sales 에"], [3, "출력", "print( ) 로 sales 상자 안을 보기"]], { ih: 1.0, gap: 0.12 });
    card(s, MX, 4.85, lw, 1.2, { fill: T.card2 });
    txt(s, [{ text: "# 뒤는 주석(메모)  ", options: { fontFace: F.b, color: T.accent2 } }, { text: "파이썬은 # 뒤의 글을 무시합니다. 코드에 설명을 달 때 사용해요." }], { x: MX + 0.3, y: 4.85, w: lw - 0.6, h: 1.2, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "직접 해 보기", "price 를 5000 으로 바꾸고 다시 실행해 보세요. 매출이 자동으로 바뀝니다!", T.green);
    footer(s, PYT);
  }
  {
    const s = add();
    header(s, S31, "값 바꾸기(재할당)와 한 번에 여러 변수 만들기");
    const hw = (CW - 0.4) / 2;
    txt(s, "① 새 값을 넣으면 예전 값은 사라져요", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    varBox(s, MX + 0.2, 2.15, "price", "4500", { w: 2.2, h: 1.2, fs: 20, vc: T.muted });
    s.addShape("rightArrow", { x: MX + 2.6, y: 2.95, w: 0.7, h: 0.4, fill: { color: T.accent }, line: { type: "none" } });
    varBox(s, MX + 3.5, 2.15, "price", "5000", { w: 2.2, h: 1.2, fs: 20 });
    codeOut(s, MX, 3.95, hw, ["price = 4500", "price = 5000      # 가격 인상!", "print(price)"], "5000", { fs: 14, lh: 0.34 });
    const rx = MX + hw + 0.4;
    txt(s, "② 쉼표로 여러 변수를 한 줄에", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    codeOut(s, rx, 2.15, hw, ["menu, price = \"라떼\", 5000", "print(menu, price)"], "라떼 5000", { fs: 14, lh: 0.36 });
    tip(s, rx, 4.75, hw, 0.9, "다음 장에서", "여러 변수 한 번에 넣기 3가지 방법을 자세히!", T.cyan, 15);
    footer(s, PYT);
  }
  {
    const s = add();
    header(s, S31, "변수 이름 규칙 — 지키지 않으면 오류!");
    const rules = [["문자 또는 _ 로 시작, 숫자로 시작 X", "myvar2 · _my_var", "2myvar", "SyntaxError"], ["문자 · 숫자 · _ 만 사용", "my_var", "my-var", "빼기(-)로 읽힘"], ["띄어쓰기 사용 불가", "myVar", "my var", "SyntaxError"], ["예약어(파이썬 단어)는 사용 불가", "class_name", "class", "SyntaxError"], ["대문자와 소문자는 다른 이름", "age · Age · AGE", "", "서로 다른 변수 3개"]];
    const hdr = [["규칙", 4.6], ["✓ 가능", 3.0], ["✗ 불가", 2.6], ["결과", CW - 10.2]];
    let x = MX;
    hdr.forEach(([h, w], i) => { txt(s, h, { x: x + 0.15, y: 1.65, w, h: 0.45, fontFace: F.b, fontSize: 16, color: i === 1 ? T.green : i === 2 ? T.pink : T.accent2, valign: "middle" }); x += w; });
    rules.forEach(([r, ok, ng, res], i) => {
      const y = 2.15 + i * 0.78;
      s.addShape("rect", { x: MX, y, w: CW, h: 0.68, fill: { color: i % 2 ? T.card2 : T.card }, line: { type: "none" } });
      txt(s, r, { x: MX + 0.15, y, w: 4.5, h: 0.68, fontSize: 15, valign: "middle" });
      txt(s, ok, { x: MX + 4.75, y, w: 2.9, h: 0.68, fontFace: F.code, fontSize: 15, color: T.green, valign: "middle" });
      txt(s, ng, { x: MX + 7.75, y, w: 2.5, h: 0.68, fontFace: F.code, fontSize: 15, color: T.pink, valign: "middle" });
      txt(s, res, { x: MX + 10.35, y, w: CW - 10.4, h: 0.68, fontSize: 14, color: T.text, valign: "middle" });
    });
    tip(s, MX, 6.2, CW, 0.55, "참고", "한글 변수 이름(가격 = 4500)도 동작하지만, 협업과 호환성을 위해 영어 이름을 권장해요.", T.cyan, 15);
    footer(s, "Python Language Reference — Identifiers and keywords");
  }
  {
    const s = add();
    header(s, S31, "좋은 변수 이름 짓기");
    const hw = (CW - 0.4) / 2;
    card(s, MX, 1.7, hw, 2.6, { fill: T.card, line: T.pink });
    txt(s, "✗  알아보기 어려운 이름", { x: MX + 0.3, y: 1.85, w: hw - 0.6, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    s.addShape("roundRect", { x: MX + 0.3, y: 2.4, w: hw - 0.6, h: 1.65, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
    txt(s, "a = 4500\nb = 120\nc = a * b", { x: MX + 0.5, y: 2.45, w: hw - 1.0, h: 1.55, fontFace: F.code, fontSize: 16, color: T.codeText, valign: "middle", lineSpacing: 26 });
    const rx = MX + hw + 0.4;
    card(s, rx, 1.7, hw, 2.6, { fill: T.card, line: T.green });
    txt(s, "✓  의미가 드러나는 이름", { x: rx + 0.3, y: 1.85, w: hw - 0.6, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    s.addShape("roundRect", { x: rx + 0.3, y: 2.4, w: hw - 0.6, h: 1.65, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
    txt(s, "price = 4500\ncount = 120\nsales = price * count", { x: rx + 0.5, y: 2.45, w: hw - 1.0, h: 1.55, fontFace: F.code, fontSize: 16, color: T.codeText, valign: "middle", lineSpacing: 26 });
    const tips2 = [["snake_case", "소문자 + 밑줄로 단어 연결 : total_sales, unit_price  (파이썬 공식 스타일 PEP 8)"], ["의미 있게", "x, a, temp 보다 price, count, sales 처럼 '무엇'인지 알 수 있게"], ["너무 길지 않게", "the_total_sales_amount_of_today → today_sales"]];
    tips2.forEach(([k, v], i) => {
      const y = 4.5 + i * 0.6;
      txt(s, k, { x: MX, y, w: 2.4, h: 0.5, fontFace: F.b, fontSize: 16, color: T.yellow, valign: "middle" });
      txt(s, v, { x: MX + 2.5, y, w: CW - 2.5, h: 0.5, fontSize: 15, valign: "middle" });
    });
    footer(s, "PEP 8 — Style Guide for Python Code (peps.python.org/pep-0008)");
  }
  {
    const s = add();
    header(s, S31, "예약어 — 파이썬이 이미 쓰고 있는 35개의 단어");
    const lw = 6.4;
    codeOut(s, MX, 1.65, lw, ["import keyword", "print(len(keyword.kwlist))"], "35", { fs: 15, lh: 0.4 });
    card(s, MX, 4.1, lw, 1.95, { fill: T.card2 });
    txt(s, [{ text: "왜 쓰면 안 될까?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "if, for, class 같은 단어는 파이썬 문법에서 특별한 뜻이 있어서, 변수 이름으로 쓰면 파이썬이 헷갈려 SyntaxError 를 냅니다." }],
      { x: MX + 0.3, y: 4.1, w: lw - 0.6, h: 1.95, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    const kws = ["False", "None", "True", "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"];
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35, cols = 4, kw = (rw - 0.15 * (cols - 1)) / cols;
    kws.forEach((k, i) => {
      const x = rx + (i % cols) * (kw + 0.15), y = 1.65 + Math.floor(i / cols) * 0.49;
      const hot = ["if", "for", "def", "class", "import", "True", "False", "None", "and", "or", "not", "in", "is", "global"].includes(k);
      s.addShape("roundRect", { x, y, w: kw, h: 0.4, rectRadius: 0.08, fill: { color: hot ? T.accent : T.card }, line: { type: "none" } });
      txt(s, k, { x, y, w: kw, h: 0.4, fontFace: F.code, fontSize: 13, align: "center", valign: "middle", color: hot ? T.white : T.text });
    });
    tip(s, MX, 6.3, CW, 0.5, "다 외울 필요 없어요", "보라색은 이번 학기에 자주 볼 단어. 에디터에서 색이 바뀌는 단어는 예약어라고 생각하세요!", T.cyan);
    footer(s, "Python Language Reference — Keywords (Python 3.11 기준 35개)");
  }
  {
    const s = add();
    header(s, S31, "다중 변수 — 여러 변수에 한 번에 넣기");
    const cw = (CW - 0.6) / 3;
    const forms = [["① 서로 다른 값", ["b1, b2, b3 = 10, 20, 30", "print(b1, b2, b3)"], "10 20 30", "개수를 꼭 맞춰야 해요"],
      ["② 같은 값을 한 번에", ["a = b = c = 'Seoul'", "print(a, b, c)"], "Seoul Seoul Seoul", "세 상자에 같은 값"],
      ["③ 리스트를 나눠 담기", ["city = ['Seoul', 'Busan', 'Ulsan']", "a, b, c = city", "print(a, b, c)"], "Seoul Busan Ulsan", "'풀기(unpacking)'라고 해요"]];
    forms.forEach(([h, code, out, note], i) => {
      const x = MX + i * (cw + 0.3);
      txt(s, h, { x, y: 1.6, w: cw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
      const cb = codeBlock(s, x, 2.1, cw, code, { fs: 11, lh: 0.34, noNums: true });
      const oh = 0.55 + out.split("\n").length * 0.25;
      outputBox(s, x, 2.1 + cb.h + 0.12, cw, oh, out, { fs: 13 });
      txt(s, note, { x, y: 2.1 + cb.h + oh + 0.2, w: cw, h: 0.4, fontSize: 14, color: T.text });
    });
    card(s, MX, 5.1, CW, 1.0, { fill: T.card2 });
    txt(s, [{ text: "개수가 다르면?  ", options: { fontFace: F.b, color: T.pink } }, { text: "x, y = 'Seoul', 'Busan', 'Ulsan'  →  ValueError: too many values to unpack — 왼쪽 상자 수와 오른쪽 값 수를 맞추세요." }],
      { x: MX + 0.3, y: 5.1, w: CW - 0.6, h: 1.0, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "리스트란?", "[ ] 안에 여러 값을 담은 묶음 — 다음 시간(03. 데이터 구조)에 자세히 배워요.", T.cyan);
    footer(s, SRC + " 1.1, " + PYT);
  }
  {
    const s = add();
    header(s, S31, "타입 확인 type( ) 과 타입 변환 str( ) · int( ) · float( )");
    const hw = (CW - 0.4) / 2;
    txt(s, "① 무엇이 담겼나? — type( )", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["age = 30", "name = 'David'", "print(type(age))", "print(type(name))"], "<class 'int'>\n<class 'str'>", { fs: 13, lh: 0.32 });
    const rx = MX + hw + 0.4;
    txt(s, "② 다른 타입으로 바꾸기 — 형 변환", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["a = str(3)      # 문자열 '3'", "b = int(4)      # 정수 4", "c = float(5)    # 실수 5.0", "print(a, b, c)"], "3 4 5.0", { fs: 13, lh: 0.32 });
    card(s, MX, 5.45, CW, 0.75, { fill: T.card2 });
    txt(s, [{ text: "주의  ", options: { fontFace: F.b, color: T.pink } }, { text: "str = 문자열 · int = 정수 · float = 실수.   int(3.9) 는 반올림이 아니라 버림 → 3,   int('3.5') 는 ValueError" }],
      { x: MX + 0.3, y: 5.45, w: CW - 0.6, h: 0.75, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "언제 쓰나?", "엑셀 · CSV 에서 읽은 숫자가 '문자'로 들어와 계산이 안 될 때 자주 써요!", T.green);
    footer(s, SRC + " 1.1, Python Built-in Functions (docs.python.org)");
  }
  {
    const s = add();
    header(s, S31, "변수 출력 — print( ) 에서 쉼표( , ) vs 더하기( + )");
    const hw = (CW - 0.4) / 2;
    txt(s, "쉼표 ,  — 자동으로 한 칸 띄우고, 타입이 달라도 OK", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.green });
    codeOut(s, MX, 2.05, hw, ["a, b = 'Busan', 'Haeundae'", "c, d = 100, 200", "print(a, b)", "print(a, c)"], "Busan Haeundae\nBusan 100", { fs: 13, lh: 0.3, oh: 0.95 });
    const rx = MX + hw + 0.4;
    txt(s, "더하기 +  — 문자는 연결(공백 없음), 숫자는 덧셈", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["print(a + b)     # 문자 + 문자", "print(c + d)     # 숫자 + 숫자"], "BusanHaeundae\n300", { fs: 14, lh: 0.36 });
    s.addShape("roundRect", { x: MX, y: 5.2, w: CW, h: 0.95, rectRadius: 0.08, fill: { color: T.pink, transparency: 88 }, line: { color: T.pink, width: 1 } });
    txt(s, [{ text: "print(a + c)     # 문자 + 숫자", options: { fontFace: F.code, color: T.codeText, breakLine: true } }, { text: "TypeError: can only concatenate str (not \"int\") to str", options: { fontFace: F.code, color: T.pink, breakLine: true } }, { text: "해결 : print(a + str(c))  또는  print(a, c)", options: { fontFace: F.sb, color: T.green } }], { x: MX + 0.3, y: 5.2, w: CW - 0.6, h: 0.95, fontSize: 13, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "더 편한 방법", "f-string : print(f'{a} {c}') — 따옴표 앞에 f, 변수는 { } 안에. (입력문과 출력문 장에서 자세히!)", T.cyan, 15);
    footer(s, SRC + " 1.1, " + PYT);
  }
  {
    const s = add();
    header(s, S31, "변수에서 자주 만나는 오류 2가지");
    const hw = (CW - 0.4) / 2;
    txt(s, "① NameError — 없는 이름을 불렀을 때", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeBlock(s, MX, 2.1, hw, ["price = 4500", "print(prise)      # 오타!"], { fs: 14, lh: 0.38 });
    s.addShape("roundRect", { x: MX, y: 3.45, w: hw, h: 0.65, rectRadius: 0.08, fill: { color: T.pink, transparency: 88 }, line: { color: T.pink, width: 1 } });
    txt(s, "NameError: name 'prise' is not defined", { x: MX + 0.2, y: 3.45, w: hw - 0.4, h: 0.65, fontFace: F.code, fontSize: 13, color: T.pink, valign: "middle" });
    txt(s, "원인 : 오타, 또는 변수를 만드는 셀을 실행하지 않음\n해결 : 철자 확인, 위 셀부터 차례로 실행", { x: MX, y: 4.25, w: hw, h: 0.9, fontSize: 15, color: T.text });
    const rx = MX + hw + 0.4;
    txt(s, "② SyntaxError — 문법 규칙을 어겼을 때", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeBlock(s, rx, 2.1, hw, ["1st_price = 4500  # 숫자로 시작"], { fs: 14, lh: 0.38 });
    s.addShape("roundRect", { x: rx, y: 3.07, w: hw, h: 0.65, rectRadius: 0.08, fill: { color: T.pink, transparency: 88 }, line: { color: T.pink, width: 1 } });
    txt(s, "SyntaxError: invalid decimal literal", { x: rx + 0.2, y: 3.07, w: hw - 0.4, h: 0.65, fontFace: F.code, fontSize: 13, color: T.pink, valign: "middle" });
    txt(s, "원인 : 이름 규칙 위반, 따옴표 · 괄호 안 닫음 등\n해결 : 이름 규칙 확인 → price_1st", { x: rx, y: 3.9, w: hw, h: 0.9, fontSize: 15, color: T.text });
    tip(s, MX, 6.2, CW, 0.55, "오류 읽는 요령", "빨간 메시지의 마지막 줄 '오류이름: 설명' 을 먼저 읽으세요. 오류 이름이 곧 힌트입니다!", T.yellow);
    footer(s, "Python Tutorial — Errors and Exceptions");
  }
  await D.summary(S31, "1.1 핵심 정리", [
    ["변수", "값을 담는 이름표 붙은 상자 — 이름으로 값을 다시 꺼내 씀"],
    ["= (할당)", "오른쪽을 계산해 왼쪽 이름에 넣기 — 선언 없이 바로 생성"],
    ["이름 규칙", "영문 · 숫자 · _ 만, 숫자로 시작 X, 띄어쓰기 X, 예약어 X, 대소문자 구분"],
    ["확인 · 변환 · 출력", "type( ) 확인, str( ) · int( ) · float( ) 변환, print 는 , 와 +"],
  ], "변수는 어디에서나 쓸 수 있을까? → 1.2 전역 변수와 지역 변수");

  const ctx = { D, add, sec, SRC, PYT, S32, S33, S34, varBox, codeOut };
  await require("./c3b")(ctx);
  await require("./c3c")(ctx);
  await D.pres.writeFile({ fileName: process.argv[2] || "CH03.pptx" });
})();
