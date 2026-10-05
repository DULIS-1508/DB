// 02장 · 1-2 전역/지역 변수, 1-3 연산자
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox, hlRuns } = require("./lib");

module.exports = async function ({ D, add, sec, SRC, PYT, S33, S34, codeOut }) {
  const errBox = (s, x, y, w, h, msg) => {
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: T.pink, transparency: 88 }, line: { color: T.pink, width: 1 } });
    txt(s, msg, { x: x + 0.2, y, w: w - 0.4, h, fontFace: F.code, fontSize: 13, color: T.pink, valign: "middle" });
  };
  // table helper (dark style)
  const table = (s, y, rows, colW, opts = {}) => {
    const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: i === 0 ? F.b : (opts.codeCols || []).includes(j) ? F.code : F.r, fontSize: i === 0 ? 15 : opts.fs || 15,
      color: i === 0 ? T.white : (opts.hl || {})[j] || T.text, fill: { color: i === 0 ? T.card2 : (i % 2 ? T.card : T.bg) }, align: "center", valign: "middle", margin: [0.03, 0.1, 0.03, 0.1] } })));
    s.addTable(tbl, { x: MX, y, w: colW.reduce((a, b) => a + b, 0), colW, rowH: opts.rowH || 0.5, border: { type: "solid", color: "1E2A5A", pt: 1 } });
  };

  // ======================= 1-2 =======================
  sec("1.2 전역 변수와 지역 변수");
  await D.divider("1.2", "전역 변수와 지역 변수", "변수를 '어디에서' 쓸 수 있을까?", ["함수 맛보기 (def)", "전역 변수 vs 지역 변수", "global 과 nonlocal"], fa.FaHome);
  {
    const s = add();
    header(s, S33, "먼저 맛보기 — 함수(def)는 '나만의 명령 레시피'");
    const lw = 6.6;
    const cb = codeBlock(s, MX, 1.65, lw, ["def greet():", "    print('안녕하세요!')", "", "greet()"], { fs: 14, lh: 0.4, markers: { 0: 1, 1: 2, 3: 3 } });
    outputBox(s, MX, 1.65 + cb.h + 0.15, lw, 0.8, "안녕하세요!", { fs: 15 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    explainList(s, rx, 1.65, rw, [[1, "def 이름( ):", "함수(레시피) 정의 — 끝에 콜론 :"], [2, "들여쓰기 4칸", "함수 안에 속한 코드 (Tab 1번)"], [3, "이름( )", "만들어 둔 함수를 실행"]], { ih: 1.0, gap: 0.12 });
    card(s, MX, 5.1, CW, 1.0, { fill: T.card2 });
    txt(s, [{ text: "왜 지금 함수를?  ", options: { fontFace: F.b, color: T.yellow } }, { text: "전역 · 지역 변수는 '함수 안이냐 밖이냐'로 나뉘기 때문이에요. 함수는 05장에서 자세히 배우니 지금은 '코드를 묶은 상자' 정도로만 이해하세요." }],
      { x: MX + 0.3, y: 5.1, w: CW - 0.6, h: 1.0, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "비유", "def = 레시피 적어 두기,  greet() = 그 레시피대로 요리하기", T.cyan);
    footer(s, PYT + " — Defining Functions");
  }
  {
    const s = add();
    header(s, S33, "전역 변수 vs 지역 변수 — 거실과 내 방");
    // house diagram
    s.addShape("roundRect", { x: MX, y: 1.7, w: 7.4, h: 4.35, rectRadius: 0.12, fill: { color: T.card }, line: { color: T.cyan, width: 2 } });
    txt(s, "프로그램 전체 = 집  (전역 영역)", { x: MX + 0.3, y: 1.8, w: 6, h: 0.4, fontFace: F.b, fontSize: 16, color: T.cyan });
    s.addShape("roundRect", { x: MX + 0.3, y: 2.35, w: 3.0, h: 1.2, rectRadius: 0.1, fill: { color: T.cyan, transparency: 80 }, line: { type: "none" } });
    txt(s, [{ text: "거실의 TV", options: { fontFace: F.b, breakLine: true } }, { text: "jeon = '전역'", options: { fontFace: F.code, fontSize: 13, color: T.yellow } }], { x: MX + 0.3, y: 2.35, w: 3.0, h: 1.2, fontSize: 15, align: "center", valign: "middle" });
    s.addShape("roundRect", { x: MX + 3.7, y: 2.35, w: 3.4, h: 3.4, rectRadius: 0.1, fill: { color: T.bg }, line: { color: T.yellow, width: 2, dashType: "dash" } });
    txt(s, "함수 = 내 방  (지역 영역)", { x: MX + 3.85, y: 2.45, w: 3.1, h: 0.4, fontFace: F.b, fontSize: 14, color: T.yellow });
    s.addShape("roundRect", { x: MX + 4.0, y: 3.0, w: 2.8, h: 1.1, rectRadius: 0.1, fill: { color: T.yellow, transparency: 80 }, line: { type: "none" } });
    txt(s, [{ text: "내 방의 일기장", options: { fontFace: F.b, breakLine: true } }, { text: "ji = '지역'", options: { fontFace: F.code, fontSize: 13, color: T.yellow } }], { x: MX + 4.0, y: 3.0, w: 2.8, h: 1.1, fontSize: 15, align: "center", valign: "middle" });
    txt(s, "방 안에서는 거실 TV도 보이고 일기장도 보여요", { x: MX + 3.85, y: 4.25, w: 3.1, h: 0.9, fontSize: 13, color: T.text });
    txt(s, "거실에서는 방 안의 일기장이 안 보여요", { x: MX + 0.3, y: 3.8, w: 3.1, h: 0.9, fontSize: 13, color: T.text });
    const rx = MX + 7.75, rw = CW - 7.75;
    const rows = [["전역 변수", "함수 밖에서 만든 변수", "프로그램 어디서든 사용", "프로그램 끝날 때까지", T.cyan], ["지역 변수", "함수 안에서 만든 변수", "그 함수 안에서만 사용", "함수 실행 중에만", T.yellow]];
    rows.forEach(([n, a, b, c, col], i) => {
      const y = 1.7 + i * 2.25;
      card(s, rx, y, rw, 2.05, { fill: T.card, line: col });
      txt(s, n, { x: rx + 0.25, y: y + 0.12, w: rw - 0.5, h: 0.45, fontFace: F.b, fontSize: 19, color: col });
      txt(s, [{ text: "• " + a, options: { breakLine: true } }, { text: "• " + b, options: { breakLine: true } }, { text: "• 수명 : " + c }], { x: rx + 0.25, y: y + 0.6, w: rw - 0.5, h: 1.35, fontSize: 14, paraSpaceAfter: 4 });
    });
    tip(s, MX, 6.3, CW, 0.5, "핵심", "변수가 '어디서 만들어졌는지'가 '어디서 쓸 수 있는지'를 결정합니다 (= 변수의 범위, scope).", T.yellow);
    footer(s, SRC + " 1.2");
  }
  {
    const s = add();
    header(s, S33, "1) 전역 변수 — 함수 안과 밖 어디서나");
    const lw = 7.0;
    const cb = codeBlock(s, MX, 1.65, lw, ["jeon = 'awesome'            # 전역 변수 정의", "", "def myfunc():", "    print('파이썬은', jeon)  # 함수 안에서 사용", "", "myfunc()", "print('파이썬은', jeon)      # 함수 밖에서 사용"], { fs: 14, lh: 0.36, markers: { 0: 1, 3: 2, 6: 3 } });
    outputBox(s, MX, 1.65 + cb.h + 0.15, lw, 1.0, "파이썬은 awesome\n파이썬은 awesome", { fs: 14 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    explainList(s, rx, 1.65, rw, [[1, "함수 밖에서 만들기", "→ 전역 변수"], [2, "함수 안에서 읽기", "거실 TV는 방에서도 보여요"], [3, "함수 밖에서 읽기", "당연히 사용 가능"]], { ih: 1.0, gap: 0.12 });
    tip(s, MX, 6.3, CW, 0.5, "정리", "전역 변수는 한 번 만들면 프로그램이 끝날 때까지 어디서든 '읽을' 수 있어요.", T.cyan);
    footer(s, SRC + " 1.2");
  }
  {
    const s = add();
    header(s, S33, "2) 지역 변수 — 함수 안에서만 살아요");
    const hw = (CW - 0.4) / 2;
    txt(s, "① 같은 이름이어도 서로 다른 변수", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["jeon = 'awesome'", "def myfunc():", "    jeon = 'fantastic'  # 지역 변수", "    print('파이썬은', jeon)", "myfunc()", "print('파이썬은', jeon)"], "파이썬은 fantastic\n파이썬은 awesome", { fs: 13, lh: 0.32 });
    const rx = MX + hw + 0.4;
    txt(s, "② 지역 변수를 함수 밖에서 쓰면?", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.pink });
    const cb = codeBlock(s, rx, 2.05, hw, ["def myfunc():", "    ji = 'fantastic'", "    print('파이썬은', ji)", "myfunc()", "print('파이썬은', ji)  # 함수 밖!"], { fs: 13, lh: 0.32 });
    errBox(s, rx, 2.05 + cb.h + 0.15, hw, 0.6, "NameError: name 'ji' is not defined");
    txt(s, "함수 실행이 끝나면 지역 변수 ji 는 사라져요. 방 밖에서는 일기장을 볼 수 없어요.", { x: rx, y: 2.05 + cb.h + 0.9, w: hw, h: 0.8, fontSize: 14, color: T.text });
    tip(s, MX, 6.3, CW, 0.5, "정리", "함수 안의 jeon 은 방 안의 새 상자 — 거실의 jeon(awesome)은 그대로! 지역 변수는 함수 밖에서 안 보여요.", T.yellow, 15);
    footer(s, SRC + " 1.2");
  }
  {
    const s = add();
    header(s, S33, "3) global — 함수 안에서 전역 변수 만들기 · 바꾸기");
    const hw = (CW - 0.4) / 2;
    txt(s, "① 함수 안에서 만든 변수를 밖에서도", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["def myfunc():", "    global glo", "    glo = 'fantastic'", "myfunc()", "print('파이썬은', glo)"], "파이썬은 fantastic", { fs: 13, lh: 0.3 });
    const rx = MX + hw + 0.4;
    txt(s, "② 전역 변수의 값을 함수 안에서 변경", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["glo = 'awesome'", "def myfunc():", "    global glo", "    glo = 'fantastic'", "myfunc()", "print('파이썬은 ' + glo)"], "파이썬은 fantastic", { fs: 13, lh: 0.3 });
    tip(s, MX, 5.75, CW, 0.5, "global 이름", "= '방 안의 새 상자가 아니라 거실(전역)의 상자를 쓰겠다'는 선언", T.yellow, 15);
    tip(s, MX, 6.35, CW, 0.5, "실무 팁", "global 을 많이 쓰면 어디서 값이 바뀌었는지 찾기 어려워요. 꼭 필요할 때만 사용하세요.", T.pink, 15);
    footer(s, SRC + " 1.2, Python Reference — The global statement");
  }
  {
    const s = add();
    header(s, S33, "4) nonlocal — 함수 안의 함수에서 바깥 함수 변수 바꾸기");
    const hw = (CW - 0.4) / 2;
    txt(s, "✓ nonlocal 을 쓰면", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.green });
    codeOut(s, MX, 2.05, hw, ["def outer():", "    non = 10", "    def inner():", "        nonlocal non", "        non = non + 10", "        print(non)", "    inner()", "outer()"], "20", { fs: 13, lh: 0.27 });
    const rx = MX + hw + 0.4;
    txt(s, "✗ nonlocal 없이 바꾸려 하면", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.pink });
    const cb = codeBlock(s, rx, 2.05, hw, ["def outer():", "    non = 10", "    def inner():", "        non = non + 10  # 오류!", "        print(non)", "    inner()", "outer()"], { fs: 13, lh: 0.27 });
    errBox(s, rx, 2.05 + cb.h + 0.12, hw, 0.85, "UnboundLocalError: cannot access local\nvariable 'non' where it is not associated…");
    tip(s, MX, 6.15, CW, 0.65, "비유", "큰 방(outer) 안의 작은 방(inner) — 작은 방에서 큰 방 물건을 바꾸려면 nonlocal! 단, 집 밖(전역)에선 안 보여요. (이번 학기엔 개념만)", T.cyan, 14);
    footer(s, SRC + " 1.2, Python Reference — The nonlocal statement");
  }
  await D.summary(S33, "1.2 핵심 정리", [
    ["전역 변수", "함수 밖에서 생성 — 어디서든 사용, 프로그램 끝까지 유지"],
    ["지역 변수", "함수 안에서 생성 — 그 함수 안에서만, 실행 중에만 존재"],
    ["global", "함수 안에서 전역 변수를 만들거나 값을 바꿀 때"],
    ["nonlocal", "중첩 함수에서 바깥 함수의 변수를 바꿀 때"],
  ], "이제 변수로 계산해 봅시다! → 1.3 연산자");

  // ======================= 1-3 =======================
  sec("1.3 연산자");
  await D.divider("1.3", "연산자", "계산하고, 비교하고, 판단하는 기호들", ["산술 · 비교 · 논리 연산자", "ID · 멤버십 · 비트 · 축약 할당 연산자", "연산자 우선순위"], fa.FaCalculator);
  {
    const s = add();
    header(s, S34, "파이썬의 연산자 7가지 한눈에 보기");
    const ops = [["산술", "+  -  *  /  //  %  **", "계산하기", fa.FaCalculator, T.accent2], ["비교", "==  !=  >  <  >=  <=", "크기 · 같음 비교 → True/False", fa.FaBalanceScale, T.yellow], ["논리", "and  or  not", "여러 조건 묶기", fa.FaProjectDiagram, T.green], ["할당", "=  +=  -=  *=  …", "값 넣기 · 누적하기", fa.FaArrowLeft, T.cyan],
      ["ID", "is  is not", "같은 객체인가?", fa.FaFingerprint, T.pink], ["멤버십", "in  not in", "안에 들어 있나?", fa.FaSearch, T.orange], ["비트", "&  |  ^  ~  <<  >>", "이진수 단위 계산", fa.FaMicrochip, T.muted]];
    const cw = (CW - 0.9) / 4, ch = 2.15;
    for (let i = 0; i < 7; i++) {
      const [n, sym, d, Ic, c] = ops[i];
      const x = MX + (i % 4) * (cw + 0.3), y = 1.65 + Math.floor(i / 4) * (ch + 0.25);
      card(s, x, y, cw, ch, { fill: T.card, line: c });
      await iconCircle(s, Ic, x + 0.25, y + 0.25, 0.65, c, "#FFFFFF", 60);
      txt(s, n + " 연산자", { x: x + 1.05, y: y + 0.25, w: cw - 1.2, h: 0.65, fontFace: F.b, fontSize: 17, valign: "middle" });
      s.addShape("roundRect", { x: x + 0.25, y: y + 1.05, w: cw - 0.5, h: 0.45, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, sym, { x: x + 0.25, y: y + 1.05, w: cw - 0.5, h: 0.45, fontFace: F.code, fontSize: 13, color: T.yellow, align: "center", valign: "middle" });
      txt(s, d, { x: x + 0.25, y: y + 1.6, w: cw - 0.4, h: 0.45, fontSize: 13, color: T.text });
    }
    const x = MX + 3 * (cw + 0.3), y = 1.65 + ch + 0.25;
    card(s, x, y, cw, ch, { fill: T.card2 });
    txt(s, [{ text: "띄어쓰기 규칙", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "연산자 앞뒤 한 칸", options: { breakLine: true } }, { text: "✓ 1 + 1", options: { fontFace: F.code, color: T.green, breakLine: true } }, { text: "✗ 1+1   ✗ 1   +   1", options: { fontFace: F.code, color: T.pink } }],
      { x: x + 0.25, y: y + 0.1, w: cw - 0.4, h: ch - 0.2, fontSize: 13, valign: "middle", paraSpaceAfter: 4 });
    footer(s, SRC + " 1.3, Python Reference — Expressions");
  }
  {
    const s = add();
    header(s, S34, "2) 산술 연산자 — 계산기 기능");
    const rows = [["연산자", "이름", "예제", "결과", "기억하기"], ["+", "더하기", "9 + 2", "11", ""], ["-", "빼기", "9 - 2", "7", ""], ["*", "곱하기", "9 * 2", "18", "× 대신 *"], ["/", "나누기", "9 / 2", "4.5", "결과는 항상 실수"], ["//", "몫", "9 // 2", "4", "나눗셈의 몫만"], ["%", "나머지", "9 % 2", "1", "나눗셈의 나머지만"], ["**", "제곱", "9 ** 2", "81", "9²"], ["( )", "괄호", "(1 + 2) * 3", "9", "괄호 먼저 계산"]];
    table(s, 1.65, rows, [1.3, 1.5, 2.3, 1.2, 2.6], { codeCols: [0, 2, 3], hl: { 0: T.yellow, 3: T.green }, rowH: 0.5 });
    const rx = MX + 9.25, rw = CW - 9.25;
    card(s, rx, 1.65, rw, 4.5, { fill: T.card2 });
    txt(s, [{ text: "비즈니스 예 : // 와 %", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "135분은 몇 시간 몇 분?", options: { breakLine: true } }, { text: "135 // 60  → 2 (시간)", options: { fontFace: F.code, color: T.green, breakLine: true } }, { text: "135 % 60   → 15 (분)", options: { fontFace: F.code, color: T.green, breakLine: true } },
      { text: " ", options: { fontSize: 8, breakLine: true } }, { text: "커피 100잔을 12잔 상자에?", options: { breakLine: true } }, { text: "100 // 12  → 8 (상자)", options: { fontFace: F.code, color: T.green, breakLine: true } }, { text: "100 % 12   → 4 (남는 잔)", options: { fontFace: F.code, color: T.green } }],
      { x: rx + 0.25, y: 1.65, w: rw - 0.5, h: 4.5, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "자주 하는 실수", "곱하기는 x 가 아니라 *,  제곱은 ^ 가 아니라 ** 입니다!", T.pink);
    footer(s, SRC + " 1.3");
  }
  {
    const s = add();
    header(s, S34, "a) 문자열 연산 — + 는 연결, * 는 반복");
    const hw = (CW - 0.4) / 2;
    txt(s, "+  :  문자열 이어 붙이기", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["a = 'Hello '", "b = 'Busan'", "print(a + b)"], "Hello Busan", { fs: 15, lh: 0.38 });
    const rx = MX + hw + 0.4;
    txt(s, "*  :  문자열 반복하기", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["print('Busan ' * 3)", "print('-' * 20)"], "Busan Busan Busan \n--------------------", { fs: 15, lh: 0.38 });
    card(s, MX, 5.1, CW, 1.0, { fill: T.card2 });
    txt(s, [{ text: "같은 기호, 다른 동작  ", options: { fontFace: F.b, color: T.accent2 } }, { text: "숫자끼리 + 는 덧셈(1 + 2 → 3), 문자열끼리 + 는 연결('1' + '2' → '12') — 타입에 따라 결과가 달라요!" }],
      { x: MX + 0.3, y: 5.1, w: CW - 0.6, h: 1.0, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "활용", "print('-' * 20) 은 출력 결과에 구분선을 그을 때 자주 써요.", T.cyan);
    footer(s, SRC + " 1.3");
  }
  {
    const s = add();
    header(s, S34, "3) 비교 연산자 — 결과는 항상 True 또는 False");
    const rows = [["연산자", "뜻", "예 (x = 9, y = 2)", "결과"], ["==", "같다", "x == y", "False"], ["!=", "같지 않다", "x != y", "True"], [">", "크다", "x > y", "True"], ["<", "작다", "x < y", "False"], [">=", "크거나 같다", "x >= y", "True"], ["<=", "작거나 같다", "x <= y", "False"]];
    table(s, 1.65, rows, [1.4, 2.0, 2.6, 1.6], { codeCols: [0, 2, 3], hl: { 0: T.yellow, 3: T.green }, rowH: 0.52 });
    const rx = MX + 7.95, rw = CW - 7.95;
    txt(s, "a) 복합 비교 (Chained)", { x: rx, y: 1.65, w: rw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, rx, 2.1, rw, ["print(1 < 3 < 5)", "print(1 < 3 > 5)", "score = 85", "print(80 <= score < 90)"], "True\nFalse\nTrue", { fs: 13, lh: 0.3 });
    s.addShape("roundRect", { x: MX, y: 5.45, w: 7.6, h: 0.7, rectRadius: 0.08, fill: { color: T.pink, transparency: 88 }, line: { color: T.pink, width: 1 } });
    txt(s, [{ text: "= 와 == 를 헷갈리지 마세요!   ", options: { fontFace: F.b, color: T.pink } }, { text: "x = 9  (넣어라)     x == 9  (같은가?)", options: { fontFace: F.code, color: T.codeText } }], { x: MX + 0.2, y: 5.45, w: 7.3, h: 0.7, fontSize: 13, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "쓰임", "1 < 3 < 5 는 (1 < 3) and (3 < 5) — if 조건문(04장) · 데이터 필터링(08장)에서 계속 쓰여요.", T.cyan, 15);
    footer(s, SRC + " 1.3");
  }
  {
    const s = add();
    header(s, S34, "4) 논리 연산자 — 여러 조건을 묶어 판단하기");
    const rows = [["연산자", "뜻", "예제", "결과"], ["and", "둘 다 True 이면 True", "9 > 2 and 3 > 1", "True"], ["or", "하나라도 True 이면 True", "9 > 2 or 3 < 1", "True"], ["not", "True ↔ False 뒤집기", "not (9 > 2)", "False"]];
    table(s, 1.65, rows, [1.3, 3.0, 2.9, 1.2], { codeCols: [0, 2, 3], hl: { 0: T.yellow, 3: T.green }, rowH: 0.55 });
    const rx = MX + 8.75, rw = CW - 8.75;
    card(s, rx, 1.65, rw, 2.2, { fill: T.card2 });
    txt(s, [{ text: "비즈니스 예", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "age = 25", options: { fontFace: F.code, breakLine: true } }, { text: "member = True", options: { fontFace: F.code, breakLine: true } }, { text: "age >= 19 and member", options: { fontFace: F.code, color: T.green, breakLine: true } }, { text: "→ True (성인 회원 할인!)" }],
      { x: rx + 0.25, y: 1.65, w: rw - 0.5, h: 2.2, fontSize: 14, valign: "middle", paraSpaceAfter: 2 });
    s.addShape("roundRect", { x: MX, y: 4.1, w: CW, h: 1.95, rectRadius: 0.1, fill: { color: T.pink, transparency: 90 }, line: { color: T.pink, width: 1 } });
    txt(s, [{ text: "주의 : & 와 | 는 비트 연산자 — 비교식과 함께 쓰면 계산 순서가 달라져요", options: { fontFace: F.b, color: T.pink, breakLine: true } },
      { text: "9 > 2 | 3 < 1      → False   (2 | 3 을 먼저 계산 → 9 > 3 < 1)", options: { fontFace: F.code, fontSize: 14, color: T.codeText, breakLine: true } },
      { text: "(9 > 2) | (3 < 1)  → True    (괄호로 묶어야 의도대로)", options: { fontFace: F.code, fontSize: 14, color: T.codeText, breakLine: true } },
      { text: "→ 조건을 묶을 때는 and · or · not 을 쓰세요!", options: { fontFace: F.sb, color: T.yellow } }],
      { x: MX + 0.3, y: 4.1, w: CW - 0.6, h: 1.95, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "외우기", "and = 그리고(둘 다),  or = 또는(하나라도),  not = 아니다(반대로)", T.cyan);
    footer(s, SRC + " 1.3, Python Reference — Operator precedence");
  }
  {
    const s = add();
    header(s, S34, "5) ID 연산자 is  ·  6) 멤버십 연산자 in");
    const hw = (CW - 0.4) / 2;
    txt(s, "is : '완전히 같은 물건'인가?", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeOut(s, MX, 2.05, hw, ["x = ['busan', 'seoul']", "y = ['busan', 'seoul']", "z = x", "print(x == y, x is y, x is z)"], "True False True", { fs: 13, lh: 0.3 });
    const rx = MX + hw + 0.4;
    txt(s, "in : '안에 들어 있나?'", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.orange });
    codeOut(s, rx, 2.05, hw, ["x = ['busan', 'seoul']", "print('busan' in x)", "print('busan' not in x)", "print('커피' in '아이스 커피')"], "True\nFalse\nTrue", { fs: 13, lh: 0.3 });
    tip(s, MX, 5.7, CW, 0.55, "is vs ==", "== 는 '내용이 같은가', is 는 '같은 물건인가' (쌍둥이 ≠ 같은 사람) — is 는 주로 x is None 확인에!", T.pink, 14);
    tip(s, MX, 6.35, CW, 0.5, "in 은 언제?", "목록에 있는지, 글자 속에 단어가 있는지 확인할 때 — 데이터 검색에 아주 많이 써요!", T.orange, 15);
    footer(s, SRC + " 1.3");
  }
  {
    const s = add();
    header(s, S34, "7) 비트 연산자 — 이진수 자리마다 계산 (참고)");
    const rows = [["연산자", "이름", "규칙", "5 ○ 3", "결과"], ["&", "AND", "두 비트 모두 1 → 1", "5 & 3", "1"], ["|", "OR", "하나라도 1 → 1", "5 | 3", "7"], ["^", "XOR", "하나만 1 → 1", "5 ^ 3", "6"], ["~", "NOT", "모든 비트 뒤집기", "~5", "-6"], ["<<", "왼쪽 이동", "오른쪽에 0 채우며 이동", "5 << 1", "10"], [">>", "오른쪽 이동", "오른쪽으로 이동", "5 >> 1", "2"]];
    table(s, 1.65, rows, [1.2, 1.6, 3.3, 1.5, 1.1], { codeCols: [0, 3, 4], hl: { 0: T.yellow, 4: T.green }, rowH: 0.52 });
    const rx = MX + 9.0, rw = CW - 9.0;
    card(s, rx, 1.65, rw, 3.65, { fill: T.card2 });
    txt(s, [{ text: "5 & 3 을 이진수로", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "5 → 1 0 1", options: { fontFace: F.code, breakLine: true } }, { text: "3 → 0 1 1", options: { fontFace: F.code, breakLine: true } }, { text: "&   0 0 1  → 1", options: { fontFace: F.code, color: T.green } }],
      { x: rx + 0.25, y: 1.65, w: rw - 0.5, h: 3.65, fontSize: 16, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 5.6, CW, 0.55, "이번 학기에는", "비트 연산은 데이터 분석에서 거의 쓰지 않아요. '이런 게 있다' 정도로 넘어가도 됩니다.", T.cyan, 15);
    footer(s, SRC + " 1.3");
  }
  {
    const s = add();
    header(s, S34, "8) 축약 할당 연산자 — 누적 계산을 짧게");
    const rows = [["연산자", "줄여 쓰기", "풀어 쓰기"], ["+=", "a += b", "a = a + b"], ["-=", "a -= b", "a = a - b"], ["*=", "a *= b", "a = a * b"], ["/=", "a /= b", "a = a / b"], ["//=", "a //= b", "a = a // b"], ["%=", "a %= b", "a = a % b"], ["**=", "a **= b", "a = a ** b"]];
    table(s, 1.65, rows, [1.4, 2.2, 2.4], { codeCols: [0, 1, 2], hl: { 0: T.yellow, 1: T.green }, rowH: 0.5 });
    const rx = MX + 6.35, rw = CW - 6.35;
    txt(s, "실습 : 위에서부터 차례로 실행하면? (# 뒤가 결과)", { x: rx, y: 1.6, w: rw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeBlock(s, rx, 2.05, rw, ["cal = 10", "cal += 2      # 12", "cal -= 2      # 10", "cal *= 2      # 20", "cal /= 2      # 10.0   (/ 는 실수)", "cal **= 2     # 100.0", "cal //= 2     # 50.0", "cal %= 2      # 0.0"], { fs: 13, lh: 0.42 });
    tip(s, MX, 6.15, CW, 0.6, "쓰임", "장바구니 합계 : total += price — 반복문(04장)과 함께 '합계 · 개수 세기'에 정말 많이 써요!", T.green);
    footer(s, SRC + " 1.3");
  }
  {
    const s = add();
    header(s, S34, "9) 연산자 우선순위 — 무엇부터 계산할까?");
    const order = [["1", "( )", "괄호"], ["2", "**", "제곱"], ["3", "*  /  //  %", "곱하기 · 나누기"], ["4", "+  -", "더하기 · 빼기"], ["5", "==  !=  >  <  …", "비교"], ["6", "not → and → or", "논리"]];
    order.forEach(([n, o, d], i) => {
      const y = 1.65 + i * 0.72;
      card(s, MX, y, 5.4, 0.62, { fill: i ? T.card : T.accent, ft: i ? 0 : 40 });
      txt(s, n, { x: MX + 0.15, y, w: 0.5, h: 0.62, fontFace: F.xb, fontSize: 18, color: T.yellow, align: "center", valign: "middle" });
      txt(s, o, { x: MX + 0.75, y, w: 2.6, h: 0.62, fontFace: F.code, fontSize: 15, valign: "middle" });
      txt(s, d, { x: MX + 3.4, y, w: 1.9, h: 0.62, fontSize: 14, color: T.text, valign: "middle" });
    });
    const rx = MX + 5.75, rw = CW - 5.75;
    const ex = [["10 + 2 * 5", "20"], ["(10 + 2) * 5", "60"], ["10 + 2 * 5 ** 2", "60"], ["10 + 5 * 2 > 20", "False"], ["100 + 5 * 3", "115"], ["(100 + 5) * 3", "315"]];
    txt(s, "print( ) 로 확인해 보기 (실습 노트북 예제)", { x: rx, y: 1.6, w: rw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    ex.forEach(([e, r], i) => {
      const y = 2.1 + i * 0.56;
      s.addShape("rect", { x: rx, y, w: rw, h: 0.5, fill: { color: i % 2 ? T.card2 : T.codeBg }, line: { type: "none" } });
      txt(s, "print(" + e + ")", { x: rx + 0.2, y, w: rw - 1.6, h: 0.5, fontFace: F.code, fontSize: 14, color: T.codeText, valign: "middle" });
      txt(s, "→ " + r, { x: rx + rw - 1.4, y, w: 1.3, h: 0.5, fontFace: F.code, fontSize: 14, color: T.green, valign: "middle" });
    });
    tip(s, MX, 6.15, CW, 0.6, "꿀팁", "순서가 헷갈리면 괄호( )로 묶으세요. 계산도 확실해지고 읽는 사람도 편해요!", T.green);
    footer(s, SRC + " 1.3, Python Reference — Operator precedence");
  }
  {
    const s = add();
    header(s, S34, "종합 실습 — 파이썬 카페 매출 계산기");
    const lw = 7.4;
    const cb = codeBlock(s, MX, 1.65, lw, ["price = 4500                   # 가격", "count = 120                    # 판매량", "discount = 0.1                 # 할인율 10%", "sales = price * count          # 매출", "net = sales * (1 - discount)   # 할인 후 매출", "boxes = count // 12            # 12잔씩 포장", "print('매출 :', sales)", "print('할인 후 :', int(net))", "print('포장 상자 :', boxes, '/ 남는 잔 :', count % 12)", "print('목표 달성? ', net >= 500000)"], { fs: 12, lh: 0.27 });
    outputBox(s, MX, 1.65 + cb.h + 0.12, lw, 1.35, "매출 : 540000\n할인 후 : 486000\n포장 상자 : 10 / 남는 잔 : 0\n목표 달성?  False", { fs: 12 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const used = [["변수", "price, count, …"], ["산술", "*  -  //  %"], ["괄호 우선순위", "(1 - discount)"], ["형 변환", "int(net)"], ["비교", "net >= 500000"]];
    txt(s, "이 코드에 쓰인 오늘의 개념", { x: rx, y: 1.65, w: rw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    used.forEach(([k, v], i) => {
      const y = 2.15 + i * 0.72;
      card(s, rx, y, rw, 0.62, { fill: T.card });
      txt(s, k, { x: rx + 0.2, y, w: 1.9, h: 0.62, fontFace: F.b, fontSize: 15, color: T.accent2, valign: "middle" });
      txt(s, v, { x: rx + 2.1, y, w: rw - 2.2, h: 0.62, fontFace: F.code, fontSize: 13, valign: "middle" });
    });
    tip(s, rx, 5.85, rw, 0.85, "도전", "count 를 125 로 바꾸면 남는 잔은? 먼저 예상해 보세요!", T.green, 14);
    footer(s);
  }
  await D.summary(S34, "1.3 핵심 정리", [
    ["산술", "+ - * / // % ** — / 는 실수, // 는 몫, % 는 나머지"],
    ["비교 · 논리", "== != > < >= <= → True/False,  and · or · not 으로 묶기"],
    ["is · in", "is 는 같은 객체인가(주로 None),  in 은 포함되어 있는가"],
    ["축약 · 우선순위", "total += x 로 누적,  헷갈리면 괄호 ( ) 먼저!"],
  ], "01. 변수와 연산자 정리와 실습 체크리스트");
};
