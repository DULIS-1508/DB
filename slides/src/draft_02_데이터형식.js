// 02장 · 02. 데이터 형식 (2-1 데이터 타입, 2-2 숫자형, 2-3 문자형) + 마무리
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox } = require("./lib");

module.exports = async function ({ D, add, sec, SRC, PYT, S32, codeOut }) {
  const S21 = "SECTION 2-1  ·  데이터 타입", S22 = "SECTION 2-2  ·  숫자형 데이터", S23 = "SECTION 2-3  ·  문자형 데이터";
  sec("02 데이터 형식");
  await D.divider("02", "데이터 형식", "상자 안에 담긴 값은 어떤 종류일까?", ["2-1 데이터 타입과 동적 타이핑", "2-2 숫자형 : int · float · complex", "2-3 문자형 : 문자열 다루기"], fa.FaShapes);
  {
    const s = add();
    header(s, S21, "파이썬의 기본 데이터 타입 — 8가지 분류");
    const types = [["텍스트", "str", "'Busan'", T.yellow, "오늘"], ["숫자", "int · float · complex", "20 · 20.5 · 1j", T.accent2, "오늘"], ["불린", "bool", "True · False", T.green, "다음"], ["시퀀스", "list · tuple · range", "['a', 'b']", T.cyan, "다음"],
      ["매핑", "dict", "{'name': 'sam'}", T.cyan, "다음"], ["집합", "set · frozenset", "{'a', 'b'}", T.cyan, "다음"], ["넌(None)", "NoneType", "None (값 없음)", T.muted, ""], ["바이너리", "bytes · bytearray · memoryview", "b'Busan'", T.muted, ""]];
    const cw = (CW - 0.9) / 4, ch = 2.0;
    types.forEach(([n, t, ex, c, when], i) => {
      const x = MX + (i % 4) * (cw + 0.3), y = 1.65 + Math.floor(i / 4) * (ch + 0.25);
      card(s, x, y, cw, ch, { fill: T.card, line: when === "오늘" ? T.yellow : undefined, lw: 1.5 });
      txt(s, n + " 타입", { x: x + 0.25, y: y + 0.18, w: cw - 0.5, h: 0.4, fontFace: F.b, fontSize: 17, color: c });
      txt(s, t, { x: x + 0.25, y: y + 0.65, w: cw - 0.4, h: 0.45, fontFace: F.code, fontSize: 13 });
      txt(s, ex, { x: x + 0.25, y: y + 1.15, w: cw - 0.4, h: 0.4, fontFace: F.code, fontSize: 12, color: T.text });
      if (when) {
        s.addShape("roundRect", { x: x + cw - 1.2, y: y + 0.2, w: 1.0, h: 0.32, rectRadius: 0.16, fill: { color: when === "오늘" ? T.yellow : T.accent, transparency: when === "오늘" ? 0 : 55 }, line: { type: "none" } });
        txt(s, when === "오늘" ? "오늘 배움" : "03에서", { x: x + cw - 1.2, y: y + 0.2, w: 1.0, h: 0.32, fontFace: F.b, fontSize: 10, color: when === "오늘" ? T.bg : T.white, align: "center", valign: "middle" });
      }
    });
    tip(s, MX, 6.3, CW, 0.5, "핵심", "데이터 타입에 따라 할 수 있는 계산이 달라져요 — 숫자는 더하기, 문자는 이어 붙이기!", T.yellow);
    footer(s, SRC + " 2-1, Python Built-in Types (docs.python.org)");
  }
  {
    const s = add();
    header(s, S21, "동적 타이핑 — 값을 넣는 순간 타입이 정해져요");
    const lw = 7.0;
    codeOut(s, MX, 1.65, lw, ["x = 'Hello Busan'", "print(type(x))", "x = 20", "print(type(x))", "x = 20.5", "print(type(x))", "x = True", "print(type(x))"], "<class 'str'>\n<class 'int'>\n<class 'float'>\n<class 'bool'>", { fs: 13, lh: 0.3, ofs: 13 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 1.65, rw, 2.2, { fill: T.card });
    txt(s, [{ text: "동적 타이핑 (dynamic typing)", options: { fontFace: F.b, color: T.accent2, breakLine: true } }, { text: "다른 언어처럼 'int x' 라고 타입을 미리 적지 않아도, 넣는 값을 보고 파이썬이 알아서 타입을 정합니다." }],
      { x: rx + 0.25, y: 1.65, w: rw - 0.5, h: 2.2, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    card(s, rx, 4.05, rw, 2.0, { fill: T.card2 });
    txt(s, [{ text: "같은 상자, 다른 내용물", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "x 에 새 값을 넣을 때마다 타입도 바뀌어요. 그래서 type( ) 으로 확인하는 습관이 중요합니다." }],
      { x: rx + 0.25, y: 4.05, w: rw - 0.5, h: 2.0, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "실습 노트북", "2-1 의 예제 셀에는 list · dict · set 등 15가지 타입이 모두 나와요 — 하나씩 type( ) 으로 확인해 보세요!", T.green, 15);
    footer(s, SRC + " 2-1");
  }
  // ---- 2-2
  {
    const s = add();
    header(s, S22, "숫자형 3가지 — int · float · complex");
    const nums = [["정수형 int", "소수점 없는 수\n(양수 · 음수 · 0)", "120   -5   0", "판매량, 개수, 연도", T.accent2], ["실수형 float", "소수점이 있는 수\n(부동 소수점)", "4500.5   0.1   -2.75", "가격, 비율, 평균", T.yellow], ["복소수형 complex", "실수부 + 허수부\n(a + bj)", "3 + 4j", "전자공학 · 신호 처리", T.muted]];
    const cw = (CW - 0.6) / 3;
    nums.forEach(([n, d, ex, use, c], i) => {
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.7, cw, 3.9, { fill: T.card, line: c, lw: 1.5 });
      txt(s, n, { x: x + 0.3, y: 1.9, w: cw - 0.6, h: 0.5, fontFace: F.b, fontSize: 20, color: c });
      txt(s, d, { x: x + 0.3, y: 2.5, w: cw - 0.6, h: 0.8, fontSize: 15 });
      s.addShape("roundRect", { x: x + 0.3, y: 3.45, w: cw - 0.6, h: 0.6, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, ex, { x: x + 0.3, y: 3.45, w: cw - 0.6, h: 0.6, fontFace: F.code, fontSize: 15, color: T.yellow, align: "center", valign: "middle" });
      txt(s, "쓰임 : " + use, { x: x + 0.3, y: 4.3, w: cw - 0.6, h: 0.5, fontSize: 14, color: T.text });
    });
    tip(s, MX, 6.0, CW, 0.65, "구분법", "숫자에 소수점(.)이 있으면 float, 없으면 int — 4500 은 int, 4500.0 은 float!", T.yellow);
    footer(s, SRC + " 2-2");
  }
  {
    const s = add();
    header(s, S22, "int 와 float 의 특징 — 알아 두면 덜 놀라요");
    const hw = (CW - 0.4) / 2;
    txt(s, "① int 는 크기 제한이 없어요", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.accent2 });
    codeOut(s, MX, 2.05, hw, ["print(2 ** 100)"], "1267650600228229401496703205376", { fs: 15, lh: 0.4, ofs: 13 });
    txt(s, "엑셀은 15자리가 넘으면 정확도가 떨어지지만, 파이썬 int 는 아무리 커도 정확해요.", { x: MX, y: 3.75, w: hw, h: 0.8, fontSize: 14, color: T.text });
    const rx = MX + hw + 0.4;
    txt(s, "② float 은 아주 작은 오차가 생길 수 있어요", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["print(0.1 + 0.2)", "print(round(0.1 + 0.2, 2))"], "0.30000000000000004\n0.3", { fs: 15, lh: 0.4 });
    txt(s, "컴퓨터가 소수를 2진수로 저장하기 때문 — 버그가 아니에요. round( ) 로 반올림해서 보면 됩니다.", { x: rx, y: 4.1, w: hw, h: 0.8, fontSize: 14, color: T.text });
    tip(s, MX, 6.15, CW, 0.6, "실무 팁", "금액 계산 결과를 보여 줄 때는 round(값, 자릿수) 로 반올림하는 습관을 들이세요.", T.green);
    footer(s, PYT + " — Floating-Point Arithmetic: Issues and Limitations");
  }
  {
    const s = add();
    header(s, S22, "3) 복소수형 complex — 이런 것도 있어요 (참고)");
    const lw = 6.4;
    codeOut(s, MX, 1.65, lw, ["z = 3 + 4j", "print(z)", "print(z.real)    # 실수부", "print(z.imag)    # 허수부", "print(type(z))"], "(3+4j)\n3.0\n4.0\n<class 'complex'>", { fs: 14, lh: 0.36 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 1.65, rw, 2.1, { fill: T.card });
    txt(s, [{ text: "수학의 i  →  파이썬은 j", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "수학의 3 + 4i 를 파이썬에서는 3 + 4j 로 씁니다. (전기공학에서 i 는 전류 기호라 j 를 써요)" }],
      { x: rx + 0.25, y: 1.65, w: rw - 0.5, h: 2.1, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    card(s, rx, 3.95, rw, 2.1, { fill: T.card2 });
    txt(s, [{ text: ".real / .imag", options: { fontFace: F.b, color: T.accent2, breakLine: true } }, { text: "복소수의 실수부와 허수부를 꺼내는 '속성'. 결과는 float 로 나와요." }],
      { x: rx + 0.25, y: 3.95, w: rw - 0.5, h: 2.1, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "이번 학기에는", "비즈니스 데이터 분석에서는 거의 쓰지 않아요. 전자공학 · 신호 처리 · 물리학 분야에서 중요합니다.", T.cyan, 15);
    footer(s, SRC + " 2-2");
  }
  {
    const s = add();
    header(s, S22, "4) 숫자 형식 변환 — int( ) · float( ) · complex( )");
    const rows = [["코드", "결과", "설명"], ["int(3.9)", "3", "소수점 아래 버림 (반올림 X)"], ["int('10') + 5", "15", "숫자 모양 문자 → 정수"], ["float(3)", "3.0", "정수 → 실수"], ["float('4.5')", "4.5", "숫자 모양 문자 → 실수"], ["complex(3)", "(3+0j)", "정수 → 복소수"], ["round(3.9)", "4", "반올림이 필요하면 round"]];
    const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: i === 0 ? F.b : j < 2 ? F.code : F.r, fontSize: 15, color: i === 0 ? T.white : j === 1 ? T.green : j === 0 ? T.yellow : T.text,
      fill: { color: i === 0 ? T.card2 : (i % 2 ? T.card : T.bg) }, align: j === 2 ? "left" : "center", valign: "middle", margin: [0.03, 0.15, 0.03, 0.15] } })));
    s.addTable(tbl, { x: MX, y: 1.65, w: 8.6, colW: [2.6, 1.8, 4.2], rowH: 0.56, border: { type: "solid", color: "1E2A5A", pt: 1 } });
    const rx = MX + 8.95, rw = CW - 8.95;
    card(s, rx, 1.65, rw, 3.9, { fill: T.pink, ft: 88, line: T.pink });
    txt(s, [{ text: "안 되는 변환", options: { fontFace: F.b, color: T.pink, breakLine: true } }, { text: "int('3.5')", options: { fontFace: F.code, breakLine: true } }, { text: "→ ValueError", options: { fontFace: F.code, color: T.pink, breakLine: true } }, { text: " ", options: { fontSize: 6, breakLine: true } }, { text: "int(float('3.5')) 처럼 두 번에 나눠 변환하면 3", options: {} }],
      { x: rx + 0.25, y: 1.65, w: rw - 0.5, h: 3.9, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.15, CW, 0.6, "기억하기", "int( ) 는 '버림', round( ) 는 '반올림' — 매출 계산에서 1원 차이가 날 수 있어요!", T.yellow);
    footer(s, SRC + " 2-2, Python Built-in Functions");
  }
  // ---- 2-3
  {
    const s = add();
    header(s, S23, "문자열 만들기 — 따옴표로 감싸기");
    const hw = (CW - 0.4) / 2;
    txt(s, "① 작은따옴표 · 큰따옴표 — 둘 다 같아요", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["a = 'Busan'", "b = \"Busan\"", "print(a == b)", "print(\"It's Busan\")"], "True\nIt's Busan", { fs: 14, lh: 0.34 });
    txt(s, "글자 안에 ' 가 있으면 바깥을 \" 로 감싸면 돼요.", { x: MX, y: 4.55, w: hw, h: 0.5, fontSize: 14, color: T.text });
    const rx = MX + hw + 0.4;
    txt(s, "② 따옴표 세 개 — 여러 줄 문자열", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["notice = '''[파이썬 카페 공지]", "영업시간 : 09:00 ~ 21:00", "매주 월요일 휴무'''", "print(notice)"], "[파이썬 카페 공지]\n영업시간 : 09:00 ~ 21:00\n매주 월요일 휴무", { fs: 13, lh: 0.32 });
    tip(s, MX, 6.15, CW, 0.6, "자주 하는 실수", "따옴표를 열고 닫지 않으면 SyntaxError — 에디터에서 노란 글씨가 끝까지 번지면 의심하세요!", T.pink, 15);
    footer(s, SRC + " 2-3, " + PYT + " — Text");
  }
  {
    const s = add();
    header(s, S23, "문자열은 '글자 배열' — 인덱스로 한 글자씩 꺼내기");
    const word = "Python", n = word.length, bw = 1.15, x0 = MX + 0.9, y0 = 2.35;
    txt(s, "word = 'Python'", { x: MX, y: 1.6, w: 6, h: 0.5, fontFace: F.code, fontSize: 20, color: T.codeText });
    txt(s, "양수 인덱스 →", { x: MX - 0.4, y: y0 - 0.55, w: 1.6, h: 0.4, fontSize: 12, color: T.green });
    txt(s, "음수 인덱스 →", { x: MX - 0.4, y: y0 + 1.3, w: 1.6, h: 0.4, fontSize: 12, color: T.pink });
    for (let i = 0; i < n; i++) {
      const x = x0 + i * bw;
      txt(s, String(i), { x, y: y0 - 0.5, w: bw, h: 0.4, fontFace: F.code, fontSize: 16, color: T.green, align: "center" });
      s.addShape("rect", { x, y: y0, w: bw, h: 1.0, fill: { color: T.card }, line: { color: T.accent2, width: 1.5 } });
      txt(s, word[i], { x, y: y0, w: bw, h: 1.0, fontFace: F.code, fontSize: 30, color: T.yellow, align: "center", valign: "middle" });
      txt(s, String(i - n), { x, y: y0 + 1.1, w: bw, h: 0.4, fontFace: F.code, fontSize: 16, color: T.pink, align: "center" });
    }
    const rx = x0 + n * bw + 0.4, rw = W - MX - rx;
    codeOut(s, rx, 1.65, rw, ["print(word[0])", "print(word[1])", "print(word[-1])", "print(word[0:2])", "print(word[2:])"], "P\ny\nn\nPy\nthon", { fs: 13, lh: 0.32 });
    card(s, MX, 4.25, rx - MX - 0.35, 1.8, { fill: T.card2 });
    txt(s, [{ text: "인덱스는 0 부터!", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "첫 글자가 [0], 마지막 글자는 [-1].", options: { breakLine: true } }, { text: "슬라이싱 [시작:끝] 은 '끝' 바로 앞까지 → [0:2] 는 0, 1 번째" }],
      { x: MX + 0.3, y: 4.25, w: rx - MX - 0.95, h: 1.8, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "한글도 OK", "파이썬은 문자열을 유니코드로 처리해서 '파이썬'[0] → '파' 처럼 한글도 한 글자씩 다뤄요.", T.cyan);
    footer(s, SRC + " 2-3, " + PYT + " — Text (indexing · slicing)");
  }
  {
    const s = add();
    header(s, S23, "3) 문자열 반복 · 4) 길이 len( ) · 5) 포함 확인 in");
    const cw = (CW - 0.6) / 3;
    const parts = [["3) for 로 한 글자씩", ["for ch in 'Busan':", "    print(ch)"], "B\nu\ns\na\nn", "for 반복문은 04장에서!"], ["4) 글자 수 세기 len( )", ["msg = '파이썬 카페'", "print(len(msg))"], "6", "띄어쓰기도 1글자로 셉니다"], ["5) 들어 있나? in", ["menu = '아이스 아메리카노'", "print('아이스' in menu)", "print('라떼' in menu)"], "True\nFalse", "메뉴 · 리뷰 검색에 활용"]];
    parts.forEach(([h, code, out, note], i) => {
      const x = MX + i * (cw + 0.3);
      txt(s, h, { x, y: 1.6, w: cw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
      const cb = codeBlock(s, x, 2.05, cw, code, { fs: 12, lh: 0.32, noNums: true });
      const oh = 0.55 + out.split("\n").length * 0.25;
      outputBox(s, x, 2.05 + cb.h + 0.12, cw, oh, out, { fs: 13 });
      txt(s, note, { x, y: 2.05 + cb.h + oh + 0.2, w: cw, h: 0.4, fontSize: 14, color: T.text });
    });
    tip(s, MX, 6.3, CW, 0.5, "데이터 분석에서는", "리뷰 글에 '맛있' 이 들어 있는지(in), 글이 얼마나 긴지(len) — 텍스트 분석의 첫걸음이에요!", T.green, 15);
    footer(s, SRC + " 2-3");
  }
  await D.summary(S32, "02 데이터 형식 핵심 정리", [
    ["데이터 타입", "str · int · float · complex · bool · list · dict · set · None 등"],
    ["동적 타이핑", "값을 넣는 순간 타입 결정 — type( ) 으로 확인"],
    ["숫자형", "int(크기 제한 없음) · float(작은 오차 → round) · complex(a + bj)"],
    ["문자형", "' ' · \" \" · ''' ''',  인덱스는 0부터, len( ) · in · [시작:끝]"],
  ], "02장 정리와 실습 체크리스트");

  // ---- wrap-up
  sec("마무리");
  {
    const s = add();
    header(s, "02장 마무리", "실습 체크리스트 — Chap02 실습 노트북에서 해 보기");
    const tasks = [["변수 만들기", "price = 4500 처럼 할당하고 print 로 확인"], ["이름 규칙 실험", "2myvar = 1 을 실행해 SyntaxError 확인"], ["형 변환", "str(100) + '원',  int('3') + 3 실행"], ["전역 · 지역", "함수 안에서 만든 ji 를 밖에서 print → 오류 확인"], ["연산자 표 채우기", "9 와 2 로 + - * / // % ** 결과 확인"], ["문자열 다루기", "'Python'[0], len( ), in 실행해 보기"]];
    const cw = (CW - 0.3) / 2, box = await icon(fa.FaRegSquare, "#FACC15");
    tasks.forEach(([h, d], i) => {
      const x = MX + Math.floor(i / 3) * (cw + 0.3), y = 1.7 + (i % 3) * 1.4;
      card(s, x, y, cw, 1.2, { fill: T.card });
      s.addImage({ data: box, x: x + 0.3, y: y + 0.38, w: 0.42, h: 0.42 });
      txt(s, (i + 1) + ". " + h, { x: x + 0.95, y: y + 0.14, w: cw - 1.1, h: 0.45, fontFace: F.b, fontSize: 17 });
      txt(s, d, { x: x + 0.95, y: y + 0.6, w: cw - 1.1, h: 0.5, fontSize: 14, color: T.text });
    });
    tip(s, MX, 6.0, CW, 0.7, "실습 노트북 활용", "노트북의 빈 코드 셀에 슬라이드 예제를 직접 입력하며 따라 해 보세요. 복사보다 직접 타이핑이 기억에 오래 남아요!", T.green, 15);
    footer(s);
  }
  {
    const s = add();
    header(s, "02장 마무리", "오늘 배운 것 한 장 요약");
    const q = [["1-1", "변수", "이름표 붙은 상자 — = 로 할당, 이름 규칙, type( ) · 형 변환"], ["1-2", "범위", "전역(어디서나) vs 지역(함수 안만) — global · nonlocal"], ["1-3", "연산자", "산술 · 비교 · 논리 · ID · 멤버십 · 비트 · 축약 할당 · 우선순위"], ["02", "데이터 형식", "str · int · float · complex — 인덱스는 0부터"]];
    q.forEach(([n, h, d], i) => {
      const y = 1.7 + i * 1.05;
      card(s, MX, y, CW, 0.9, { fill: T.card });
      txt(s, n, { x: MX + 0.25, y, w: 0.9, h: 0.9, fontFace: F.xb, fontSize: 22, color: T.accent2, valign: "middle" });
      txt(s, h, { x: MX + 1.25, y, w: 2.2, h: 0.9, fontFace: F.b, fontSize: 18, valign: "middle" });
      txt(s, d, { x: MX + 3.5, y, w: CW - 3.7, h: 0.9, fontSize: 16, color: T.text, valign: "middle" });
    });
    tip(s, MX, 6.0, CW, 0.7, "다음 시간", "03. 데이터 구조 — 여러 값을 한 번에 담는 리스트 · 튜플 · 딕셔너리 · 집합 · 불린", T.cyan, 16);
    footer(s);
  }
  await D.refs("02장 마무리", [
    "김진성. 「비즈니스 데이터 분석 with Python」 Chap02. 변수와 데이터 유형. WikiDocs. https://wikidocs.net/205228 · /205808 · /205229 · /205426 · /230931",
    "김진성. Chap02 변수와 데이터 유형 실습 노트북 (.ipynb)",
    "Python Software Foundation. The Python Tutorial — An Informal Introduction to Python. https://docs.python.org/3/tutorial/introduction.html",
    "Python Software Foundation. The Python Tutorial — Defining Functions. https://docs.python.org/3/tutorial/controlflow.html",
    "Python Software Foundation. Built-in Types. https://docs.python.org/3/library/stdtypes.html",
    "Python Software Foundation. Built-in Functions. https://docs.python.org/3/library/functions.html",
    "Python Software Foundation. Expressions — Operator precedence. https://docs.python.org/3/reference/expressions.html",
    "Python Software Foundation. Lexical analysis — Identifiers and keywords. https://docs.python.org/3/reference/lexical_analysis.html",
    "Python Software Foundation. Floating-Point Arithmetic: Issues and Limitations. https://docs.python.org/3/tutorial/floatingpoint.html",
    "PEP 8 — Style Guide for Python Code. https://peps.python.org/pep-0008/",
  ]);
  await D.closing("02장. 변수와 데이터 유형");
};
