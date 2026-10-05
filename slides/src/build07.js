// 03장 입력과 출력 — 표지 · 도입 · 01. 입력문
const fa = require("react-icons/fa");
const L = require("./lib");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, outputBox, browserWin, dark } = L;
const { makeDeck } = require("./deck");
const K = require("./lib3");
const { codeOut, consoleOut, table, pill, arrowR, arrowD, box } = K;

const SRC = "wikidocs 「비즈니스 데이터 분석 with Python」(김진성) 03장";
const PYI = "Python Tutorial — Input and Output (docs.python.org/3/tutorial/inputoutput.html)";
const PYF = "Python Built-in Functions — input( ) · print( ) · open( ) (docs.python.org/3/library/functions.html)";
const D = makeDeck("비즈니스 데이터 분석 with Python - 03장. 입력과 출력");
const { add, sec } = D;
const S1 = "01. 입력문  ·  input( )";

(async () => {
  sec("표지");
  await D.titleSlide("03장. 입력과 출력", "01. 입력문  ·  02. 출력문  ·  03. 파일 입출력", SRC + "  ·  Chap03 실습 노트북  ·  Python 공식 문서로 보완", fa.FaExchangeAlt);
  {
    const s = add();
    header(s, "비즈니스 데이터 분석 with Python", "Contents — 03장. 입력과 출력");
    txt(s, "실습 파일 : Chap03 입력과 출력 노트북 (.ipynb)  ·  연습문제는 별도 파일 (PBL 연습문제)", { x: MX, y: 1.6, w: CW, h: 0.4, fontFace: F.sb, fontSize: 16, color: T.accent2 });
    const items = [["01", "입력문", "input( ) 으로 사용자에게 묻기", ["1-1 사용자 입력", "1-2 숫자로 변환 int · float", "1-3 문자열로 변환 str"], fa.FaKeyboard, T.cyan],
      ["02", "출력문", "print( ) 로 보기 좋게 보여 주기", ["2-1 콤마(,) 와 더하기(+)", "2-2 sep= · end=", "2-3 format · % · f-string", "2-4 이스케이프 문자"], fa.FaDesktop, T.yellow],
      ["03", "파일 입출력", "open( ) 으로 파일에 저장 · 읽기", ["3-1 파일 열기 · 모드", "3-2 읽기 · 3-3 쓰기 · 닫기", "3-4 단어로 나누기", "3-5 환전 결과 저장"], fa.FaFileAlt, T.green]];
    const cw = (CW - 0.6) / 3;
    for (let i = 0; i < 3; i++) {
      const [n, t, d, list, Ic, c] = items[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 2.15, cw, 4.0, { fill: T.card, line: c, lw: 1.5 });
      await iconCircle(s, Ic, x + 0.3, 2.4, 0.85, c, "#FFFFFF", 55);
      txt(s, n, { x: x + 1.35, y: 2.32, w: cw - 1.5, h: 0.5, fontFace: F.xb, fontSize: 24, color: c });
      txt(s, t, { x: x + 1.35, y: 2.8, w: cw - 1.5, h: 0.45, fontFace: F.b, fontSize: 20 });
      txt(s, d, { x: x + 0.3, y: 3.45, w: cw - 0.6, h: 0.4, fontSize: 14, color: T.text });
      txt(s, list.map((l, k) => ({ text: l, options: { bullet: { indent: 14 }, breakLine: k < list.length - 1 } })), { x: x + 0.3, y: 3.95, w: cw - 0.5, h: 2.0, fontSize: 14, color: T.white, valign: "top", paraSpaceAfter: 6 });
    }
    tip(s, MX, 6.35, CW, 0.5, "연습문제", "04. PBL 연습문제는 별도 파일(학생용 · 정답용)로 제공돼요.", T.pink, 15);
    footer(s, SRC);
  }
  {
    const s = add();
    header(s, "03장 시작하기", "모든 프로그램은 입력 → 처리 → 출력");
    const st = [["입력 (Input)", "키보드로 값을 받기", "input( )", fa.FaKeyboard, T.cyan], ["처리 (Process)", "계산 · 변환 · 판단", "+ − × ÷ , int( ) …", fa.FaCogs, T.accent2], ["출력 (Output)", "화면에 보여 주기", "print( )", fa.FaDesktop, T.yellow], ["저장 (File)", "파일로 남기기", "open( ) · write( )", fa.FaSave, T.green]];
    const bw = 2.6, gap = (CW - 4 * bw) / 3;
    for (let i = 0; i < 4; i++) {
      const [h, d, code, Ic, c] = st[i];
      const x = MX + i * (bw + gap);
      card(s, x, 1.7, bw, 2.6, { fill: T.card, line: c, lw: 1.5 });
      await iconCircle(s, Ic, x + bw / 2 - 0.45, 1.9, 0.9, c, "#FFFFFF", 55);
      txt(s, h, { x, y: 2.9, w: bw, h: 0.45, fontFace: F.b, fontSize: 17, color: c, align: "center" });
      txt(s, d, { x, y: 3.32, w: bw, h: 0.4, fontSize: 14, align: "center" });
      txt(s, code, { x, y: 3.75, w: bw, h: 0.4, fontFace: F.code, fontSize: 13, color: T.yellow, align: "center" });
      if (i < 3) arrowR(s, x + bw + 0.08, 2.85, gap - 0.16);
    }
    card(s, MX, 4.55, CW, 1.5, { fill: T.card2 });
    txt(s, [{ text: "카페 키오스크로 생각해 보기", options: { fontFace: F.b, color: T.yellow, breakLine: true } },
      { text: "① 메뉴 · 수량을 누른다 (입력)  →  ② 가격 × 수량을 계산한다 (처리)  →  ③ 화면에 결제 금액이 뜬다 (출력)  →  ④ 영수증 · 매출 기록이 남는다 (파일 저장)" }],
      { x: MX + 0.3, y: 4.55, w: CW - 0.6, h: 1.5, fontSize: 16, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "이번 장 목표", "사용자와 '대화하는' 프로그램 만들기 — 묻고(input) · 보여 주고(print) · 기록하기(file)", T.cyan, 15);
    footer(s, PYI);
  }

  // ======================= 01. 입력문 =======================
  sec("01. 입력문");
  await D.divider("01", "입력문 input( )", "프로그램이 사용자에게 묻고, 답을 받아 오기", ["1-1 사용자 입력 — 프롬프트 · 변수 대입", "1-2 숫자로 변환 — int( ) · float( )", "1-3 문자열로 변환 — str( )"], fa.FaKeyboard);
  {
    const s = add();
    header(s, S1, "1-1 input( ) — 프로그램이 사용자에게 질문하기");
    const lw = 6.3;
    const b = codeOut(s, MX, 1.65, lw, ["name = input('이름을 입력하세요 : ')", "print('안녕하세요,', name)"], [["이름을 입력하세요 : ", "홍길동"], "안녕하세요, 홍길동"], { fs: 14, lh: 0.36 });
    explainSteps(s, MX, b + 0.2, lw, [["1", "질문(프롬프트)을 화면에 보여 주고 기다려요"], ["2", "사용자가 입력하고 Enter 를 누르면"], ["3", "입력한 값이 name 변수에 담겨요"]]);
    // Colab mock
    const rx = MX + lw + 0.4, rw = CW - lw - 0.4;
    const r = browserWin(s, rx, 1.65, rw, 3.35, "colab.research.google.com");
    s.addShape("roundRect", { x: r.x, y: r.y + 0.05, w: r.w, h: 0.75, rectRadius: 0.06, fill: { color: "EEF2FF" }, line: { color: "C7D2FE", width: 0.75 } });
    s.addShape("ellipse", { x: r.x + 0.12, y: r.y + 0.25, w: 0.34, h: 0.34, fill: { color: "6366F1" }, line: { type: "none" } });
    txt(s, "▶", { x: r.x + 0.12, y: r.y + 0.25, w: 0.34, h: 0.34, fontSize: 10, color: "FFFFFF", align: "center", valign: "middle" });
    dark(s, "name = input('이름을 입력하세요 : ')", { x: r.x + 0.6, y: r.y + 0.05, w: r.w - 0.7, h: 0.75, fontFace: F.code, fontSize: 11, valign: "middle" });
    dark(s, "이름을 입력하세요 :", { x: r.x + 0.1, y: r.y + 1.0, w: 2.0, h: 0.4, fontFace: F.code, fontSize: 11, valign: "middle" });
    s.addShape("rect", { x: r.x + 2.1, y: r.y + 1.0, w: r.w - 2.25, h: 0.4, fill: { color: "FFFFFF" }, line: { color: "6366F1", width: 1.5 } });
    dark(s, "홍길동|", { x: r.x + 2.2, y: r.y + 1.0, w: r.w - 2.4, h: 0.4, fontFace: F.code, fontSize: 12, valign: "middle", color: "1E293B" });
    s.addShape("rect", { x: r.x, y: r.y + 1.6, w: r.w, h: 0.75, fill: { color: "FEF9C3" }, line: { type: "none" } });
    dark(s, "입력 칸이 생기면 값을 쓰고 Enter!  (입력을 안 하면 셀이 계속 '실행 중' 상태로 멈춰 있어요)", { x: r.x + 0.1, y: r.y + 1.6, w: r.w - 0.2, h: 0.75, fontSize: 11, valign: "middle" });
    card(s, rx, 5.2, rw, 0.95, { fill: T.card2 });
    txt(s, [{ text: "키오스크 비유  ", options: { fontFace: F.b, color: T.yellow } }, { text: "'메뉴를 고르세요' 화면 = 프롬프트, 손님이 누른 버튼 = 입력값" }], { x: rx + 0.25, y: 5.2, w: rw - 0.5, h: 0.95, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.35, CW, 0.5, "프롬프트", "input( ) 괄호 안의 안내 문구를 '프롬프트 문자열' 이라고 불러요.", T.cyan, 15);
    footer(s, SRC + " 1-1, " + PYF);
  }
  {
    const s = add();
    header(s, S1, "input( ) 문장 해부하기");
    // big anatomy line
    s.addShape("roundRect", { x: MX + 0.6, y: 2.0, w: CW - 1.2, h: 0.95, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.accent, width: 1.2 } });
    txt(s, [{ text: "age", options: { color: T.cyan } }, { text: " = ", options: { color: T.codeText } }, { text: "input", options: { color: T.green } }, { text: "(", options: { color: T.codeText } }, { text: "'나이를 입력하세요 : '", options: { color: "FCD34D" } }, { text: ")", options: { color: T.codeText } }],
      { x: MX + 0.6, y: 2.0, w: CW - 1.2, h: 0.95, fontFace: F.code, fontSize: 26, align: "center", valign: "middle" });
    const parts = [["① 변수", "입력값을 담을 그릇", T.cyan, MX + 0.9], ["② input( ) 함수", "키보드 입력을 기다림", T.green, MX + 3.9], ["③ 프롬프트 문자열", "사용자에게 보여 줄 안내 문구", T.yellow, MX + 7.5]];
    parts.forEach(([h, d, c, x]) => {
      arrowD(s, x + 1.2, 3.05, 0.45, c);
      box(s, x, 3.6, 2.9, 1.15, h, d, c);
    });
    card(s, MX, 5.0, CW, 1.1, { fill: T.card2 });
    txt(s, [{ text: "친절한 프롬프트 만들기  ", options: { fontFace: F.b, color: T.yellow } }, { text: "끝에 ' : ' 나 공백을 넣으면 입력값과 붙지 않아 읽기 쉬워요.  input( ) 처럼 비워 두면 빈 칸만 떠서 무엇을 입력할지 몰라요!" }],
      { x: MX + 0.3, y: 5.0, w: CW - 0.6, h: 1.1, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "순서", "오른쪽(input) 이 먼저 실행 → 사용자가 입력 → 그 값이 왼쪽 변수(age)에 저장!", T.cyan, 15);
    footer(s, SRC + " 1-1");
  }
  {
    const s = add();
    header(s, S1, "중요! input( ) 으로 받은 값은 무조건 '문자열'");
    const lw = 6.3;
    const b = codeOut(s, MX, 1.65, lw, ["age = input('나이를 입력하세요 : ')", "print(age)", "print(type(age))"], [["나이를 입력하세요 : ", "20"], "20", "<class 'str'>"], { fs: 14, lh: 0.36 });
    txt(s, "숫자 20 을 입력했는데… 타입은 str(문자열)!", { x: MX, y: b + 0.12, w: lw, h: 0.4, fontFace: F.b, fontSize: 15, color: T.pink });
    const rx = MX + lw + 0.4, rw = CW - lw - 0.4;
    card(s, rx, 1.65, rw, 3.6, { fill: T.card, line: T.yellow, lw: 1.5 });
    txt(s, "택배 상자 비유", { x: rx + 0.25, y: 1.75, w: rw - 0.5, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    // box picture
    const bx = rx + 0.5;
    [["20", "키보드로 입력"], ["'20'", "input( ) 이 문자열 상자에 포장"]].forEach(([v, d], i) => {
      const y = 2.3 + i * 1.35;
      s.addShape("rect", { x: bx, y, w: 1.4, h: 0.9, fill: { color: i ? "B45309" : T.card2, transparency: i ? 30 : 0 }, line: { color: i ? T.yellow : T.accent2, width: 1.5 } });
      txt(s, v, { x: bx, y, w: 1.4, h: 0.9, fontFace: F.code, fontSize: 22, color: T.white, align: "center", valign: "middle" });
      txt(s, d, { x: bx + 1.6, y, w: rw - 2.3, h: 0.9, fontSize: 14, valign: "middle" });
      if (!i) arrowD(s, bx + 0.54, 3.25, 0.35, T.yellow);
    });
    txt(s, "뭘 넣어도 '문자열' 상자에 담겨 와요 — 숫자로 쓰려면 상자를 뜯어야(변환) 해요!", { x: rx + 0.25, y: 4.55, w: rw - 0.5, h: 0.65, fontSize: 13, color: T.text });
    tip(s, MX, 5.6, CW, 0.6, "type( )", "2.1 에서 배운 type( ) 으로 언제든 확인할 수 있어요 — str 이면 따옴표 붙은 글자!", T.cyan, 15);
    footer(s, SRC + " 1-1, " + PYF);
  }
  {
    const s = add();
    header(s, S1, "그래서 생기는 함정 — 20 + 1 = 201 ?!");
    const hw = (CW - 0.4) / 2;
    txt(s, "✗  문자열 + 숫자 → 오류", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeOut(s, MX, 2.05, hw, ["age = input('나이 : ')     # '20'", "print(age + 1)"], "TypeError: can only concatenate str\n(not \"int\") to str", { fs: 13, lh: 0.34 });
    const rx = MX + hw + 0.4;
    txt(s, "✗  문자열 + 문자열 → 이어 붙이기", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeOut(s, rx, 2.05, hw, ["age = input('나이 : ')     # '20'", "print(age + '1')"], "201", { fs: 13, lh: 0.34 });
    card(s, MX, 4.85, CW, 1.3, { fill: T.card2 });
    txt(s, [{ text: "왜 그럴까?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "'20' 은 숫자가 아니라 글자 '2' 와 '0' 이에요. 글자끼리 + 는 '이어 붙이기' (2.3 문자열 연결)라서 '20' + '1' = '201'.  계산하려면 먼저 숫자로 바꿔야 해요 → 다음 장 int( )!" }],
      { x: MX + 0.3, y: 4.85, w: CW - 0.6, h: 1.3, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "오류 읽기", "concatenate = 이어 붙이다 → 'str 에는 str 만 이어 붙일 수 있어요' 라는 뜻!", T.cyan, 15);
    footer(s, SRC + " 1-2");
  }
  {
    const s = add();
    header(s, S1, "1-2 숫자로 변환 — int( ) · float( ) 로 상자 뜯기");
    // conversion diagram
    const rows = [["'20'", "int( )", "20", "정수 (개수 · 나이 · 수량)", T.cyan], ["'3.5'", "float( )", "3.5", "실수 (키 · 몸무게 · 환율)", T.green]];
    rows.forEach(([a, f, b, d, c], i) => {
      const y = 1.7 + i * 1.05;
      s.addShape("rect", { x: MX, y, w: 1.4, h: 0.8, fill: { color: "B45309", transparency: 30 }, line: { color: T.yellow, width: 1.5 } });
      txt(s, a, { x: MX, y, w: 1.4, h: 0.8, fontFace: F.code, fontSize: 18, align: "center", valign: "middle" });
      arrowR(s, MX + 1.55, y + 0.24, 0.5);
      pill(s, f, MX + 2.15, y + 0.17, 1.4, c, 0.46, 15);
      arrowR(s, MX + 3.65, y + 0.24, 0.5);
      s.addShape("ellipse", { x: MX + 4.3, y: y - 0.02, w: 0.84, h: 0.84, fill: { color: c, transparency: 50 }, line: { color: c, width: 1.5 } });
      txt(s, b, { x: MX + 4.3, y: y - 0.02, w: 0.84, h: 0.84, fontFace: F.code, fontSize: 17, align: "center", valign: "middle" });
      txt(s, d, { x: MX + 5.3, y, w: 2.5, h: 0.8, fontSize: 13, color: T.text, valign: "middle" });
    });
    const rx = MX + 7.9, rw = CW - 7.9;
    const b = codeOut(s, rx, 1.65, rw, ["age = int(input('나이 : '))", "print(age + 1)"], [["나이 : ", "20"], "21"], { fs: 13, lh: 0.34 });
    txt(s, "input( ) 을 int( ) 로 감싸면 한 줄로 끝!", { x: rx, y: b + 0.1, w: rw, h: 0.4, fontSize: 13, color: T.green });
    codeOut(s, MX, 3.85, 7.6, ["height = float(input('키(m) : '))", "print(height * 100, 'cm')"], [["키(m) : ", "1.75"], "175.0 cm"], { fs: 13, lh: 0.3 });
    tip(s, rx, 4.9, rw, 0.85, "읽는 순서", "안쪽 괄호부터! ① input( ) 받기 ② int( ) 변환 ③ age 에 저장", T.yellow, 13);
    tip(s, rx, 5.9, rw, 0.85, "비유", "input( ) = 포장된 상자,  int( ) · float( ) = 상자를 뜯는 칼!", T.cyan, 13);
    footer(s, SRC + " 1-2, " + PYF);
  }
  {
    const s = add();
    header(s, S1, "int( ) 와 float( ) — 무엇을 넣으면 어떻게 될까?");
    const rows = [["코드", "결과", "설명"], ["int('20')", "20", "정수 모양 글자 → 정수 ✓"], ["float('20')", "20.0", "정수 모양도 실수로 ✓"], ["float('3.5')", "3.5", "소수점 글자 → 실수 ✓"], ["int('3.5')", "ValueError", "소수점 글자는 int 로 바로 못 바꿈 ✗"], ["int('20살')", "ValueError", "숫자가 아닌 글자 섞임 ✗"], ["int(3.9)", "3", "숫자(실수) → 정수는 버림 (2.2 복습)"]];
    table(s, MX, 1.65, rows, [3.2, 2.4, CW - 5.6], { codeCols: [0, 1], hl: { 0: T.yellow, 1: T.green }, rowH: 0.56, fs: 15, left: [2] });
    card(s, MX, 5.75, CW, 0.55, { fill: T.card2 });
    txt(s, [{ text: "어떤 걸 쓸까?  ", options: { fontFace: F.b, color: T.yellow } }, { text: "소수점이 나올 수 있으면 float( ),  개수처럼 딱 떨어지면 int( )" }], { x: MX + 0.3, y: 5.75, w: CW - 0.6, h: 0.55, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.4, CW, 0.45, "ValueError", "'값(value)이 이상해요' — 바꿀 수 없는 글자를 넣었다는 뜻이에요.", T.pink, 14);
    footer(s, PYF);
    s.addNotes("int('3.5') → ValueError: invalid literal for int() with base 10: '3.5'.  int(float('3.5')) 처럼 두 번 변환하면 3 이 됩니다.");
  }
  {
    const s = add();
    header(s, S1, "예제 ① 반지름을 입력받아 원의 둘레 구하기");
    D.stepFlow(s, 1.6, [["입력", "input( ) 으로 반지름 받기"], ["변환", "float( ) 로 숫자로"], ["계산", "둘레 = 2 × 3.14 × r"], ["출력", "print( ) 로 결과 보여 주기"]], 0.95);
    const lw = 6.6;
    const b = codeOut(s, MX, 2.7, lw, ["r = float(input('반지름을 입력하세요 : '))", "length = 2 * 3.14 * r", "print('원의 둘레는', length)", "print('반올림하면', round(length, 2))"],
      [["반지름을 입력하세요 : ", "5"], "원의 둘레는 31.400000000000002", "반올림하면 31.4"], { fs: 13, lh: 0.3 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 2.7, rw, 2.15, { fill: T.card2 });
    txt(s, [{ text: "31.400000000000002 ?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "컴퓨터는 실수를 2진수로 저장해서 아주 작은 오차가 생겨요 (2.2 숫자형). 보여 줄 때는 round( ) 나 f-string 으로 자릿수를 정리해요." }],
      { x: rx + 0.25, y: 2.7, w: rw - 0.5, h: 2.15, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, rx, 5.0, rw, 1.1, "더 정확히", "import math 후 math.pi 를 쓰면 3.14159… 로 계산돼요.", T.cyan, 13);
    tip(s, MX, 6.35, CW, 0.5, "핵심 패턴", "입력 → 변환 → 계산 → 출력 — 앞으로 만드는 거의 모든 프로그램의 뼈대예요!", T.green, 15);
    footer(s, SRC + " 1-2");
  }
  {
    const s = add();
    header(s, S1, "예제 ② 카페 키오스크 — 수량을 입력받아 결제 금액 계산");
    const lw = 6.6;
    const b = codeOut(s, MX, 1.65, lw, ["price = 4500                      # 아메리카노 가격", "qty = int(input('몇 잔 주문할까요? '))", "total = price * qty", "print('결제 금액 :', total, '원')"],
      [["몇 잔 주문할까요? ", "3"], "결제 금액 : 13500 원"], { fs: 13, lh: 0.34 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const qa = [["Q. int( ) 를 빼면?", "qty 가 '3' (문자열) 그대로 → 4500 * '3' 은 '3' 을 4500번 반복한 긴 글자가 돼요. 금액 계산이 엉망!", T.pink], ["Q. 2.5 잔을 입력하면?", "int('2.5') → ValueError. 잔 수는 정수니까 int( ) 가 맞아요.", T.cyan]];
    qa.forEach(([q, a, c], i) => {
      const y = 1.65 + i * 1.75;
      card(s, rx, y, rw, 1.55, { fill: T.card, line: c, lw: 1.2 });
      txt(s, [{ text: q, options: { fontFace: F.b, color: c, breakLine: true } }, { text: a, options: { fontSize: 13 } }], { x: rx + 0.25, y, w: rw - 0.5, h: 1.55, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    });
    card(s, MX, b + 0.2, lw, 6.15 - b - 0.2, { fill: T.card2 });
    txt(s, [{ text: "직접 바꿔 보기  ", options: { fontFace: F.b, color: T.yellow } }, { text: "price 를 5000(라떼)으로 바꾸고, 입력한 수량에 따라 금액이 달라지는지 확인!" }], { x: MX + 0.3, y: b + 0.2, w: lw - 0.6, h: 6.15 - b - 0.2, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.35, CW, 0.5, "실무 연결", "주문 · 재고 · 견적 프로그램 모두 '입력받은 수량 × 단가' 에서 시작해요.", T.green, 15);
    footer(s, SRC + " 1-2");
    s.addNotes("4500 * '3' 은 '3' 을 4500번 반복한 긴 문자열이 됩니다(오류가 아님). 숫자 × 문자열 = 문자열 반복 (2.3 복습).");
  }
  {
    const s = add();
    header(s, S1, "1-3 문자열로 변환 — str( ) 로 숫자를 글자로");
    const hw = (CW - 0.4) / 2;
    txt(s, "✗  문자열 + 숫자는 이어 붙일 수 없어요", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.pink });
    codeOut(s, MX, 2.05, hw, ["age = 20", "print('나이는 ' + age + '살')"], "TypeError: can only concatenate str\n(not \"int\") to str", { fs: 13, lh: 0.34 });
    const rx = MX + hw + 0.4;
    txt(s, "✓  str( ) 로 숫자를 글자로 바꾸면 OK", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.green });
    codeOut(s, rx, 2.05, hw, ["age = 20", "print('나이는 ' + str(age) + '살')"], "나이는 20살", { fs: 13, lh: 0.34 });
    // reverse diagram
    const y = 4.85;
    s.addShape("ellipse", { x: MX + 1.0, y: y - 0.05, w: 0.9, h: 0.9, fill: { color: T.cyan, transparency: 50 }, line: { color: T.cyan, width: 1.5 } });
    txt(s, "20", { x: MX + 1.0, y: y - 0.05, w: 0.9, h: 0.9, fontFace: F.code, fontSize: 18, align: "center", valign: "middle" });
    arrowR(s, MX + 2.05, y + 0.25, 0.6);
    pill(s, "str( )", MX + 2.8, y + 0.17, 1.4, T.yellow, 0.46, 15);
    arrowR(s, MX + 4.35, y + 0.25, 0.6);
    s.addShape("rect", { x: MX + 5.1, y, w: 1.4, h: 0.8, fill: { color: "B45309", transparency: 30 }, line: { color: T.yellow, width: 1.5 } });
    txt(s, "'20'", { x: MX + 5.1, y, w: 1.4, h: 0.8, fontFace: F.code, fontSize: 18, align: "center", valign: "middle" });
    txt(s, "숫자를 다시 '글자 상자'에 포장 → 다른 글자와 + 로 이어 붙일 수 있어요", { x: MX + 6.8, y, w: CW - 6.8, h: 0.8, fontSize: 14, valign: "middle" });
    card(s, MX, 5.78, CW, 0.52, { fill: T.card2 });
    txt(s, [{ text: "더 쉬운 방법  ", options: { fontFace: F.b, color: T.yellow } }, { text: "print('나이는', age, '살')  처럼 콤마(,)를 쓰거나 f-string 을 쓰면 str( ) 없이도 돼요 → 02 출력문에서!" }], { x: MX + 0.3, y: 5.78, w: CW - 0.6, h: 0.52, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.4, CW, 0.45, "언제 쓰나?", "+ 로 문자열을 만들 때,  파일에 숫자를 저장할 때(write 는 문자열만 OK) 꼭 필요해요!", T.cyan, 15);
    footer(s, SRC + " 1-3, " + PYF);
  }
  {
    const s = add();
    header(s, S1, "형 변환 함수 3총사 한눈에 보기");
    const cards = [["int( )", "정수로", "'20' → 20\n3.9 → 3", "input 받은 개수 · 나이 · 수량", T.cyan], ["float( )", "실수로", "'3.5' → 3.5\n'20' → 20.0", "input 받은 키 · 금액 · 환율", T.green], ["str( )", "문자열로", "20 → '20'\n3.5 → '3.5'", "+ 로 문장 만들기, 파일에 쓰기", T.yellow]];
    const cw = (CW - 0.6) / 3;
    cards.forEach(([f, d, ex, use, c], i) => {
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.65, cw, 3.9, { fill: T.card, line: c, lw: 1.5 });
      txt(s, f, { x, y: 1.8, w: cw, h: 0.65, fontFace: F.code, fontSize: 30, color: c, align: "center" });
      txt(s, d, { x, y: 2.45, w: cw, h: 0.45, fontFace: F.b, fontSize: 18, align: "center" });
      s.addShape("roundRect", { x: x + 0.3, y: 3.05, w: cw - 0.6, h: 1.05, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, ex, { x: x + 0.3, y: 3.05, w: cw - 0.6, h: 1.05, fontFace: F.code, fontSize: 15, color: T.codeText, align: "center", valign: "middle" });
      txt(s, [{ text: "언제?", options: { fontFace: F.b, color: c, breakLine: true } }, { text: use }], { x: x + 0.25, y: 4.25, w: cw - 0.5, h: 1.15, fontSize: 14, align: "center", valign: "middle" });
    });
    tip(s, MX, 5.8, CW, 0.9, "한 줄 공식", "숫자 입력 = int(input('…')) 또는 float(input('…')),   숫자를 글자와 + 로 잇기 = str(숫자)", T.green, 16);
    footer(s, PYF);
  }
  await D.summary(S1, "01. 입력문 핵심 정리", [
    ["input( )", "사용자에게 묻고 입력값을 받아요 — 괄호 안 = 프롬프트 문자열"],
    ["항상 문자열", "무엇을 입력해도 str!  '20' + '1' = '201',  '20' + 1 = TypeError"],
    ["숫자로 변환", "int(input( )) 정수 · float(input( )) 실수 — 입력 → 변환 → 계산 → 출력"],
    ["문자열로 변환", "str(숫자) — + 로 문장을 만들거나 파일에 쓸 때"],
  ], "받은 값을 보기 좋게 보여 주기 → 02. 출력문");

  const ctx = { D, add, sec, K, SRC, PYI, PYF };
  await require("./c7b")(ctx);
  await require("./c7c")(ctx);
  await D.pres.writeFile({ fileName: process.argv[2] || "CH03.pptx" });
})();

// numbered small steps under code (left column)
function explainSteps(s, x, y, w, items) {
  items.forEach(([n, t], i) => {
    const iy = y + i * 0.52;
    numBadge(s, n, x + 0.05, iy + 0.06, 0.34);
    txt(s, t, { x: x + 0.55, y: iy, w: w - 0.6, h: 0.46, fontSize: 14, valign: "middle" });
  });
}
