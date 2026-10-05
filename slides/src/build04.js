// 02장 · 02. 데이터 형식 — intro + 2.1 데이터 타입 + 2.2 숫자형 데이터
const fa = require("react-icons/fa");
const L = require("./lib");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox } = L;
const { makeDeck } = require("./deck");

const SRC = "wikidocs 「비즈니스 데이터 분석 with Python」(김진성)";
const PYT = "Python Tutorial (docs.python.org/3/tutorial)";
const D = makeDeck("비즈니스 데이터 분석 with Python - 02장. 변수와 데이터 유형 · 02. 데이터 형식");
const { add, sec } = D;
const S21 = "SECTION 2.1  ·  데이터 타입", S22 = "SECTION 2.2  ·  숫자형 데이터";

// code + output; returns bottom y
function codeOut(s, x, y, w, lines, out, opts = {}) {
  const cb = codeBlock(s, x, y, w, lines, Object.assign({ fs: 14, lh: 0.34 }, opts));
  let bottom = y + cb.h;
  if (out != null) {
    const oh = opts.oh || 0.55 + out.split("\n").length * 0.26;
    outputBox(s, x, bottom + 0.12, w, oh, out, { fs: opts.ofs || 13 });
    bottom += 0.12 + oh;
  }
  return bottom;
}
function table(s, x, y, rows, colW, opts = {}) {
  const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: i === 0 ? F.b : (opts.codeCols || []).includes(j) ? F.code : F.r, fontSize: i === 0 ? 15 : opts.fs || 15,
    color: i === 0 ? T.white : (opts.hl || {})[j] || T.text, fill: { color: i === 0 ? T.card2 : (i % 2 ? T.card : T.bg) }, align: (opts.left || []).includes(j) ? "left" : "center", valign: "middle", margin: [0.03, 0.12, 0.03, 0.12] } })));
  s.addTable(tbl, { x, y, w: colW.reduce((a, b) => a + b, 0), colW, rowH: opts.rowH || 0.5, border: { type: "solid", color: "1E2A5A", pt: 1 } });
}
const H = { codeOut, table, SRC, PYT };

(async () => {
  sec("표지");
  await D.titleSlide("02장. 변수와 데이터 유형", "02. 데이터 형식  —  2.1 데이터 타입  /  2.2 숫자형  /  2.3 문자형  /  2.4 함수와 메서드", SRC + "  ·  Chap02 실습 노트북  ·  Python 공식 문서로 보완", fa.FaShapes);
  {
    const s = add();
    header(s, "비즈니스 데이터 분석 with Python", "Contents — 02장 · 02. 데이터 형식");
    txt(s, "실습 파일 : Chap02 실습 노트북 (.ipynb)", { x: MX, y: 1.6, w: 9, h: 0.4, fontFace: F.sb, fontSize: 16, color: T.accent2 });
    const items = [["2.1", "데이터 타입", "값의 종류는\n몇 가지일까?", fa.FaShapes], ["2.2", "숫자형 데이터", "int · float · complex\n숫자의 3가지 모습", fa.FaCalculator], ["2.3", "문자형 데이터", "글자를 담고\n한 글자씩 꺼내기", fa.FaFont], ["2.4", "함수와 메서드", "데이터를 다루는\n도구 사용법", fa.FaTools]];
    const cw = (CW - 0.9) / 4;
    for (let i = 0; i < 4; i++) {
      const [n, t, d, Ic] = items[i];
      const x = MX + i * (cw + 0.3), y = 2.3;
      card(s, x, y, cw, 3.9, { fill: T.card, line: i === 3 ? T.yellow : undefined, lw: 1.5 });
      await iconCircle(s, Ic, x + 0.3, y + 0.35, 0.9);
      txt(s, n, { x: x + 0.3, y: y + 1.5, w: cw - 0.6, h: 0.6, fontFace: F.xb, fontSize: 30, color: T.accent2 });
      txt(s, t, { x: x + 0.3, y: y + 2.15, w: cw - 0.4, h: 0.5, fontFace: F.b, fontSize: 19 });
      txt(s, d, { x: x + 0.3, y: y + 2.8, w: cw - 0.5, h: 0.9, fontSize: 15, color: T.text });
    }
    footer(s, SRC);
  }
  {
    const s = add();
    header(s, "02. 데이터 형식 시작하기", "지난 시간엔 '상자(변수)', 오늘은 '상자 속 내용물'");
    const boxes = [["price", "4500", "숫자 (정수)", "int", T.accent2], ["rate", "0.1", "숫자 (실수)", "float", T.cyan], ["menu", "'아메리카노'", "글자", "str", T.yellow], ["sale", "True", "참 / 거짓", "bool", T.green]];
    const bw = (CW - 0.9) / 4;
    boxes.forEach(([n, v, k, t, c], i) => {
      const x = MX + i * (bw + 0.3);
      s.addShape("roundRect", { x, y: 2.05, w: bw, h: 1.6, rectRadius: 0.1, fill: { color: T.card }, line: { color: c, width: 2 } });
      s.addShape("roundRect", { x: x + 0.3, y: 1.7, w: bw - 0.6, h: 0.6, rectRadius: 0.1, fill: { color: c }, line: { type: "none" } });
      txt(s, n, { x: x + 0.3, y: 1.7, w: bw - 0.6, h: 0.6, fontFace: F.code, fontSize: 17, color: T.bg, align: "center", valign: "middle" });
      txt(s, v, { x, y: 2.5, w: bw, h: 0.9, fontFace: F.code, fontSize: 20, color: T.white, align: "center", valign: "middle" });
      txt(s, k, { x, y: 3.85, w: bw, h: 0.4, fontFace: F.sb, fontSize: 16, color: c, align: "center" });
      txt(s, t, { x, y: 4.25, w: bw, h: 0.45, fontFace: F.code, fontSize: 18, align: "center" });
    });
    card(s, MX, 4.95, CW, 1.15, { fill: T.card2 });
    txt(s, [{ text: "왜 종류를 알아야 할까?  ", options: { fontFace: F.b, color: T.yellow } }, { text: "종류(타입)에 따라 할 수 있는 일이 달라요. 숫자는 더하고 곱할 수 있지만, 글자는 대문자로 바꾸거나 나눌 수 있어요. '4500' 과 4500 은 전혀 다른 데이터랍니다!" }],
      { x: MX + 0.3, y: 4.95, w: CW - 0.6, h: 1.15, fontSize: 16, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "오늘의 순서", "종류 알아보기(2.1) → 숫자(2.2) → 글자(2.3) → 데이터를 다루는 도구, 함수와 메서드(2.4)", T.cyan);
    footer(s);
  }

  // ======================= 2.1 =======================
  sec("2.1 데이터 타입");
  await D.divider("2.1", "데이터 타입", "파이썬 값의 종류는 몇 가지일까?", ["8가지 기본 데이터 타입", "type( ) 으로 타입 확인", "동적 타이핑"], fa.FaShapes);
  {
    const s = add();
    header(s, S21, "파이썬의 기본 데이터 타입 — 8가지 분류");
    const types = [["텍스트", "str", "'Hello Busan'", T.yellow, "2.3"], ["숫자", "int · float · complex", "20 · 20.5 · 1j", T.accent2, "2.2"], ["시퀀스", "list · tuple · range", "['seoul', 'busan']", T.cyan, "03"], ["매핑", "dict", "{'name': 'sam'}", T.cyan, "03"],
      ["집합", "set · frozenset", "{'seoul', 'busan'}", T.cyan, "03"], ["불린", "bool", "True · False", T.green, "03"], ["None", "NoneType", "None (값 없음)", T.muted, ""], ["바이너리", "bytes · bytearray · memoryview", "b'Busan'", T.muted, ""]];
    const cw = (CW - 0.9) / 4, ch = 2.0;
    types.forEach(([n, t, ex, c, when], i) => {
      const x = MX + (i % 4) * (cw + 0.3), y = 1.65 + Math.floor(i / 4) * (ch + 0.25);
      const today = when.startsWith("2.");
      card(s, x, y, cw, ch, { fill: T.card, line: today ? T.yellow : undefined, lw: 1.5 });
      txt(s, n + " 타입", { x: x + 0.25, y: y + 0.18, w: cw - 1.4, h: 0.4, fontFace: F.b, fontSize: 17, color: c });
      txt(s, t, { x: x + 0.25, y: y + 0.68, w: cw - 0.4, h: 0.45, fontFace: F.code, fontSize: 13 });
      txt(s, ex, { x: x + 0.25, y: y + 1.2, w: cw - 0.4, h: 0.4, fontFace: F.code, fontSize: 12, color: T.text });
      if (when) {
        s.addShape("roundRect", { x: x + cw - 1.2, y: y + 0.2, w: 1.0, h: 0.32, rectRadius: 0.16, fill: { color: today ? T.yellow : T.accent, transparency: today ? 0 : 55 }, line: { type: "none" } });
        txt(s, today ? "오늘 " + when : "다음 시간", { x: x + cw - 1.2, y: y + 0.2, w: 1.0, h: 0.32, fontFace: F.b, fontSize: 10, color: today ? T.bg : T.white, align: "center", valign: "middle" });
      }
    });
    tip(s, MX, 6.3, CW, 0.5, "핵심", "데이터의 유형에 따라 수행할 수 있는 연산이 달라져요 — 숫자는 계산, 문자는 연결 · 자르기!", T.yellow);
    footer(s, SRC + " 2.1, Python Built-in Types (docs.python.org)");
  }
  {
    const s = add();
    header(s, S21, "가. type( ) — 값의 종류 확인하기");
    const lw = 6.0;
    let b = codeOut(s, MX, 1.65, lw, ["x = 5", "type(x)"], "int", { fs: 16, lh: 0.42 });
    txt(s, "Colab 에서는 셀 마지막 줄의 값이 그대로 보여요. print( ) 로 감싸면 <class 'int'> 로 나와요.", { x: MX, y: b + 0.15, w: lw, h: 0.75, fontSize: 14, color: T.text });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    txt(s, "여러 값을 확인해 보면", { x: rx, y: 1.6, w: rw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    const rows = [["코드", "결과", "뜻"], ["type(5)", "int", "정수"], ["type(5.0)", "float", "실수"], ["type('5')", "str", "문자열"], ["type(True)", "bool", "참/거짓"], ["type(None)", "NoneType", "값 없음"]];
    table(s, rx, 2.05, rows, [2.4, 1.6, rw - 4.0], { codeCols: [0, 1], hl: { 0: T.yellow, 1: T.green }, rowH: 0.52 });
    tip(s, MX, 5.6, CW, 0.55, "생김새는 같아도", "5 · 5.0 · '5' 는 화면에선 비슷해 보여도 모두 다른 타입이에요. 헷갈리면 type( ) 으로 확인!", T.pink, 15);
    tip(s, MX, 6.3, CW, 0.5, "습관 들이기", "데이터를 불러오면 먼저 type( ) 으로 확인 — 계산 오류의 절반은 타입 문제랍니다.", T.green);
    footer(s, SRC + " 2.1");
  }
  {
    const s = add();
    header(s, S21, "나. 동적 타이핑 — 값을 넣는 순간 타입이 정해져요");
    const lw = 7.6;
    codeBlock(s, MX, 1.65, lw, ["x = 'Hello Busan'                  # str", "x = 20                             # int", "x = 20.5                           # float", "x = 1j                             # complex", "x = ['seoul', 'busan', 'ulsan']    # list", "x = ('seoul', 'busan', 'ulsan')    # tuple", "x = range(6)                       # range",
      "x = {'name' : 'sam', 'age' : 50}   # dict", "x = {'seoul', 'busan', 'ulsan'}    # set", "x = True                           # bool", "x = None                           # NoneType"], { fs: 11, lh: 0.32, label: "Colab 코드 셀 — 원문 예제 (일부)" });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 1.65, rw, 2.25, { fill: T.card });
    txt(s, [{ text: "동적 타이핑 (dynamic typing)", options: { fontFace: F.b, color: T.accent2, breakLine: true } }, { text: "다른 언어처럼 'int x' 라고 타입을 미리 정하지 않아도, 넣는 값을 보고 파이썬이 알아서 타입을 정해요." }],
      { x: rx + 0.25, y: 1.65, w: rw - 0.5, h: 2.25, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    card(s, rx, 4.1, rw, 1.95, { fill: T.card2 });
    txt(s, [{ text: "같은 상자, 다른 내용물", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "x 하나에 값을 바꿔 넣을 때마다 x 의 타입도 바뀌어요. 마지막에 넣은 값이 이깁니다!" }],
      { x: rx + 0.25, y: 4.1, w: rw - 0.5, h: 1.95, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "지금은", "list · tuple · dict · set 은 이름만 기억하세요. 다음 시간(03. 데이터 구조)에 하나씩 배워요.", T.cyan);
    footer(s, SRC + " 2.1");
  }

  // ======================= 2.2 =======================
  sec("2.2 숫자형 데이터");
  await D.divider("2.2", "숫자형 데이터", "숫자의 3가지 모습 : int · float · complex", ["정수형 int · 실수형 float", "복소수형 complex", "숫자 형식 변환"], fa.FaCalculator);
  {
    const s = add();
    header(s, S22, "숫자형 3가지 — 소수점이 있나 없나");
    const nums = [["정수형 int", "소수점 없는 수\n(양수 · 음수 · 0)", "10   1004   -1004", "판매량, 개수, 연도", T.accent2], ["실수형 float", "소수점이 있는 수\n(부동 소수점 수)", "3.14   10.0   -3.14", "가격, 비율, 평균", T.yellow], ["복소수형 complex", "실수부 + 허수부\n(a + bj)", "1j   3 + 4j", "전자공학 · 신호 처리", T.muted]];
    const cw = 3.65;
    nums.forEach(([n, d, ex, use, c], i) => {
      const y = 1.65 + i * 1.5;
      card(s, MX, y, cw + 4.1, 1.32, { fill: T.card, line: c, lw: 1.5 });
      txt(s, n, { x: MX + 0.25, y: y + 0.12, w: 3.2, h: 0.5, fontFace: F.b, fontSize: 19, color: c });
      txt(s, d, { x: MX + 0.25, y: y + 0.6, w: 3.3, h: 0.65, fontSize: 13, color: T.text });
      s.addShape("roundRect", { x: MX + 3.6, y: y + 0.22, w: 4.0, h: 0.5, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, ex, { x: MX + 3.6, y: y + 0.22, w: 4.0, h: 0.5, fontFace: F.code, fontSize: 15, color: T.yellow, align: "center", valign: "middle" });
      txt(s, "쓰임 : " + use, { x: MX + 3.6, y: y + 0.8, w: 4.0, h: 0.4, fontSize: 13, color: T.text, align: "center" });
    });
    const rx = MX + 8.1, rw = CW - 8.1;
    codeOut(s, rx, 1.65, rw, ["x = 10      # int", "y = 3.14    # float", "z = 1j      # complex", "print(x)", "print(y)", "print(z)"], "10\n3.14\n1j", { fs: 13, lh: 0.32 });
    tip(s, MX, 6.3, CW, 0.5, "구분법", "숫자에 소수점(.)이 있으면 float, 없으면 int — 10 은 int, 10.0 은 float!", T.yellow);
    footer(s, SRC + " 2.2");
  }
  {
    const s = add();
    header(s, S22, "가. 정수형 int · 나. 실수형 float");
    const hw = (CW - 0.4) / 2;
    txt(s, "가. int — 소수점 없는 정수, 크기 제한 없음", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.accent2 });
    let b = codeOut(s, MX, 2.05, hw, ["x = 10", "y = 1004", "z = -1004", "print(type(x))", "print(type(y))", "print(type(z))"], "<class 'int'>\n<class 'int'>\n<class 'int'>", { fs: 13, lh: 0.3 });
    const rx = MX + hw + 0.4;
    txt(s, "나. float — 소수점이 있는 실수", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["x = 10.10", "y = 10.0     # .0 만 붙어도 float!", "z = -3.14", "print(type(x))", "print(type(y))", "print(type(z))"], "<class 'float'>\n<class 'float'>\n<class 'float'>", { fs: 13, lh: 0.3 });
    tip(s, MX, 6.15, CW, 0.6, "엑셀과 비교", "엑셀은 숫자가 15자리를 넘으면 뒷자리가 0으로 바뀌지만, 파이썬 int 는 2 ** 100 같은 큰 수도 정확히 계산해요.", T.cyan, 15);
    footer(s, SRC + " 2.2");
  }
  {
    const s = add();
    header(s, S22, "float 의 비밀 — 아주 작은 오차가 생길 수 있어요");
    const lw = 6.2;
    let b = codeOut(s, MX, 1.65, lw, ["print(0.1 + 0.2)", "print(round(0.1 + 0.2, 2))"], "0.30000000000000004\n0.3", { fs: 16, lh: 0.42 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 1.65, rw, 2.15, { fill: T.card });
    txt(s, [{ text: "왜 이럴까?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "컴퓨터는 숫자를 0과 1(2진수)로 저장해요. 1/3 을 10진수로 0.333…로 끝없이 쓰는 것처럼, 0.1 도 2진수로는 끝이 없어 아주 조금 잘려요." }],
      { x: rx + 0.25, y: 1.65, w: rw - 0.5, h: 2.15, fontSize: 14, valign: "middle", paraSpaceAfter: 6 });
    card(s, rx, 4.0, rw, 2.05, { fill: T.card2 });
    txt(s, [{ text: "버그가 아니에요!", options: { fontFace: F.b, color: T.green, breakLine: true } }, { text: "모든 프로그래밍 언어(엑셀 포함)에서 생기는 현상이에요. 결과를 보여 줄 때 round(값, 자릿수) 로 반올림하면 됩니다." }],
      { x: rx + 0.25, y: 4.0, w: rw - 0.5, h: 2.05, fontSize: 14, valign: "middle", paraSpaceAfter: 6 });
    txt(s, "금액 · 비율을 출력할 때는 round( ) 를 습관처럼!", { x: MX, y: b + 0.2, w: lw, h: 0.5, fontFace: F.sb, fontSize: 15, color: T.yellow });
    tip(s, MX, 6.3, CW, 0.5, "참고", "Python 공식 튜토리얼 'Floating-Point Arithmetic: Issues and Limitations' 에 자세히 설명되어 있어요.", T.cyan, 15);
    footer(s, PYT + " — Floating-Point Arithmetic");
  }
  {
    const s = add();
    header(s, S22, "다. 복소수형 complex — 이런 숫자도 있어요 (참고)");
    const hw = (CW - 0.4) / 2;
    txt(s, "수학의 3 + 4i  →  파이썬은 3 + 4j", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["x = 3 + 4j", "print(x.real)    # 실수부", "print(x.imag)    # 허수부"], "3.0\n4.0", { fs: 14, lh: 0.36 });
    const rx = MX + hw + 0.4;
    txt(s, "타입과 속성 확인 (원문 예제)", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["x = 3 + 5j", "y = 5j", "z = -5j", "print(type(x))", "print(type(y), type(z))", "print(x.real, x.imag)"], "<class 'complex'>\n<class 'complex'> <class 'complex'>\n3.0 5.0", { fs: 12, lh: 0.3, ofs: 12 });
    card(s, MX, 5.0, hw, 1.1, { fill: T.card2 });
    txt(s, [{ text: ".real / .imag  ", options: { fontFace: F.b, color: T.accent2 } }, { text: "복소수에 딸린 '속성' — 점(.) 뒤에 붙이는 모양은 2.4절 '메서드'와 비슷해요!" }],
      { x: MX + 0.25, y: 5.0, w: hw - 0.5, h: 1.1, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "이번 학기에는", "비즈니스 데이터 분석에서는 거의 쓰지 않아요. 전자공학 · 신호 처리 · 통신 · 물리학에서 중요합니다.", T.cyan, 15);
    footer(s, SRC + " 2.2");
  }
  {
    const s = add();
    header(s, S22, "라. 형식 변환 — int( ) · float( ) · complex( )");
    const lw = 6.4;
    codeOut(s, MX, 1.65, lw, ["x = 10          # int", "y = 3.14        # float", "a = float(x)    # 정수 → 실수", "b = int(y)      # 실수 → 정수", "print(a)", "print(b)", "print(type(a))", "print(type(b))"], "10.0\n3\n<class 'float'>\n<class 'int'>", { fs: 13, lh: 0.28 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const rows = [["코드", "결과", "기억"], ["float(10)", "10.0", ".0 붙음"], ["int(3.14)", "3", "버림"], ["int(-3.9)", "-3", "버림"], ["round(3.14)", "3", "반올림"], ["complex(10)", "(10+0j)", "허수부 0"]];
    table(s, rx, 1.65, rows, [2.1, 1.4, rw - 3.5], { codeCols: [0, 1], hl: { 0: T.yellow, 1: T.green }, rowH: 0.52 });
    card(s, rx, 4.95, rw, 1.3, { fill: T.pink, ft: 88, line: T.pink });
    txt(s, [{ text: "주의 ① ", options: { fontFace: F.b, color: T.pink } }, { text: "int( ) 는 반올림이 아니라 '버림'!", options: { breakLine: true } }, { text: "주의 ② ", options: { fontFace: F.b, color: T.pink } }, { text: "round(2.5) → 2, round(3.5) → 4 (.5 는 짝수 쪽으로)" }], { x: rx + 0.2, y: 4.95, w: rw - 0.4, h: 1.3, fontSize: 13, valign: "middle", paraSpaceAfter: 4 });
    footer(s, SRC + " 2.2, Python Built-in Functions — round()");
  }
  await D.summary(S22, "2.1 · 2.2 핵심 정리", [
    ["데이터 타입", "str · int · float · complex · list · tuple · dict · set · bool · None …"],
    ["type( ) · 동적 타이핑", "값을 넣는 순간 타입 결정 — type( ) 으로 확인하는 습관"],
    ["int · float", "소수점 유무로 구분 — float 은 작은 오차 → round( ) 로 정리"],
    ["형식 변환", "float( ) · int( )(버림!) · complex( ),  반올림은 round( )"],
  ], "이제 글자 데이터를 다뤄 봅시다 → 2.3 문자형 데이터");

  const ctx = { D, add, sec, H };
  await require("./c4b")(ctx);
  await require("./c4c")(ctx);
  await D.pres.writeFile({ fileName: process.argv[2] || "CH0202.pptx" });
})();
