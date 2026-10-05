// 02장 · 02. 데이터 형식 — 2.3 문자형 데이터 + 2.4 (전반) 함수
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox, hlRuns } = require("./lib");

module.exports = async function ({ D, add, sec, H }) {
  const { codeOut, table, SRC, PYT } = H;
  const S23 = "SECTION 2.3  ·  문자형 데이터", S24 = "SECTION 2.4  ·  함수와 메서드";

  // ======================= 2.3 =======================
  sec("2.3 문자형 데이터");
  await D.divider("2.3", "문자형 데이터", "글자를 담고, 한 글자씩 꺼내 쓰기", ["문자열 만들기 (따옴표 · 여러 줄)", "인덱싱과 슬라이싱", "for 반복 · len( ) · in"], fa.FaFont);
  {
    const s = add();
    header(s, S23, "가. 문자열 만들기 — 따옴표로 감싸면 글자!");
    const hw = (CW - 0.4) / 2;
    txt(s, "작은따옴표 · 큰따옴표 — 둘 다 같아요", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    let b = codeOut(s, MX, 2.05, hw, ["a = 'Busan'", "b = \"Busan\"", "print(a == b)", "print(\"It's Busan\")"], "True\nIt's Busan", { fs: 14, lh: 0.34 });
    txt(s, "글자 안에 ' 가 있으면 바깥을 \" 로 감싸면 돼요.", { x: MX, y: b + 0.12, w: hw, h: 0.45, fontSize: 14, color: T.text });
    const rx = MX + hw + 0.4;
    txt(s, "따옴표가 있고 없고의 차이", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    const rows = [["코드", "타입", "뜻"], ["4500", "int", "숫자 4500"], ["'4500'", "str", "글자 '4','5','0','0'"], ["Busan", "—", "변수 이름 (없으면 오류)"], ["'Busan'", "str", "글자 Busan"]];
    table(s, rx, 2.05, rows, [1.6, 1.0, hw - 2.6], { codeCols: [0, 1], hl: { 0: T.yellow, 1: T.green }, rowH: 0.52 });
    tip(s, MX, 6.15, CW, 0.6, "자주 하는 실수", "print(Busan) → NameError! 따옴표가 없으면 파이썬은 Busan 을 '변수 이름'으로 생각해요.", T.pink, 15);
    footer(s, SRC + " 2.3, " + PYT + " — Text");
  }
  {
    const s = add();
    header(s, S23, "여러 줄 문자열과 특수 문자 (\\n · \\t)");
    const hw = (CW - 0.4) / 2;
    txt(s, "따옴표 세 개 ''' ''' — 여러 줄 그대로", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["notice = '''[파이썬 카페 공지]", "영업시간 : 09:00 ~ 21:00", "매주 월요일 휴무'''", "print(notice)"], "[파이썬 카페 공지]\n영업시간 : 09:00 ~ 21:00\n매주 월요일 휴무", { fs: 13, lh: 0.32 });
    const rx = MX + hw + 0.4;
    txt(s, "\\n 은 줄 바꿈, \\t 는 탭(간격)", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["print('아메리카노\\n라떼')", "print('메뉴\\t가격')"], "아메리카노\n라떼\n메뉴    가격", { fs: 14, lh: 0.36 });
    tip(s, MX, 6.15, CW, 0.6, "읽는 법", "\\ (역슬래시) + 글자 = '특수 문자'. 키보드의 ₩ 키가 역슬래시예요 (한글 글꼴에서는 ₩ 로 보여요).", T.cyan, 15);
    footer(s, SRC + " 2.3, " + PYT + " — Text");
  }
  {
    const s = add();
    header(s, S23, "나. 문자열은 '글자 배열' — 인덱스로 한 글자씩 꺼내기");
    const word = "Python", n = word.length, bw = 1.15, x0 = MX + 0.9, y0 = 2.7;
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
    codeOut(s, rx, 1.65, rw, ["print(word[0])", "print(word[1])", "print(word[-1])"], "P\ny\nn", { fs: 14, lh: 0.36 });
    card(s, MX, 4.5, rx - MX - 0.35, 1.6, { fill: T.card2 });
    txt(s, [{ text: "인덱스는 0 부터!", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "첫 글자가 [0], 두 번째가 [1] … 마지막 글자는 [-1] 로 거꾸로 셀 수도 있어요. 사물함 번호가 0번부터 시작한다고 생각하세요." }],
      { x: MX + 0.3, y: 4.5, w: rx - MX - 0.95, h: 1.6, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "한글도 OK", "문자열은 유니코드로 처리돼서 '파이썬'[0] → '파' 처럼 한글도 한 글자씩 꺼낼 수 있어요.", T.cyan);
    footer(s, SRC + " 2.3, " + PYT + " — Text (indexing)");
  }
  {
    const s = add();
    header(s, S23, "슬라이싱 [시작 : 끝] — 원하는 만큼 잘라내기");
    const word = "Hello Busan", n = word.length, bw = 0.62, x0 = MX + 0.2, y0 = 2.1;
    txt(s, "s = 'Hello Busan'", { x: MX, y: 1.55, w: 6, h: 0.45, fontFace: F.code, fontSize: 18, color: T.codeText });
    for (let i = 0; i < n; i++) {
      const x = x0 + i * bw, hl = i < 5 ? T.yellow : i > 5 ? T.cyan : T.muted;
      s.addShape("rect", { x, y: y0, w: bw, h: 0.75, fill: { color: T.card }, line: { color: hl, width: 1.5 } });
      txt(s, word[i] === " " ? "␣" : word[i], { x, y: y0, w: bw, h: 0.75, fontFace: F.code, fontSize: 20, color: hl, align: "center", valign: "middle" });
      txt(s, String(i), { x, y: y0 + 0.8, w: bw, h: 0.35, fontFace: F.code, fontSize: 12, color: T.muted, align: "center" });
    }
    const rows = [["코드", "결과", "읽는 법"], ["s[0:5]", "'Hello'", "0번부터 5번 '앞'까지"], ["s[:5]", "'Hello'", "처음부터 5번 앞까지"], ["s[6:]", "'Busan'", "6번부터 끝까지"], ["s[-3:]", "'san'", "뒤에서 3글자"], ["s[::-1]", "'nasuB olleH'", "거꾸로 뒤집기"]];
    table(s, MX, 3.45, rows, [2.2, 2.6, 3.4], { codeCols: [0, 1], hl: { 0: T.yellow, 1: T.green }, rowH: 0.47 });
    const rx = MX + 8.55, rw = CW - 8.55;
    card(s, rx, 3.45, rw, 2.8, { fill: T.card2 });
    txt(s, [{ text: "끝 번호는 '포함 안 됨'", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "[0:5] 는 0,1,2,3,4 — 5번은 빠져요. '끝 바로 앞에서 멈춘다'고 기억하세요.", options: { breakLine: true } }, { text: " ", options: { fontSize: 6, breakLine: true } }, { text: "글자 수 = 끝 − 시작", options: { fontFace: F.sb, color: T.green } }],
      { x: rx + 0.25, y: 3.45, w: rw - 0.5, h: 2.8, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.4, CW, 0.45, "데이터 분석에서는", "'2026-10-05'[:4] → '2026' 처럼 날짜에서 연도만 뽑을 때 자주 써요!", T.green, 14);
    footer(s, PYT + " — Text (slicing)");
  }
  {
    const s = add();
    header(s, S23, "다. for 반복 · 라. 길이 len( ) · 마. 포함 확인 in");
    const cw = (CW - 0.6) / 3;
    const parts = [["다. 한 글자씩 반복 (for)", ["for ch in 'Busan':", "    print(ch)"], "B\nu\ns\na\nn", "for 문은 04장에서 자세히!"], ["라. 글자 수 세기 len( )", ["msg = '파이썬 카페'", "print(len(msg))"], "6", "띄어쓰기도 1글자로 세요"], ["마. 들어 있나? in", ["menu = '아이스 아메리카노'", "print('아이스' in menu)", "print('라떼' in menu)"], "True\nFalse", "메뉴 · 리뷰 검색에 활용"]];
    parts.forEach(([h, code, out, note], i) => {
      const x = MX + i * (cw + 0.3);
      txt(s, h, { x, y: 1.6, w: cw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
      const b = codeOut(s, x, 2.05, cw, code, out, { fs: 12, lh: 0.32, noNums: true });
      txt(s, note, { x, y: b + 0.15, w: cw, h: 0.4, fontSize: 14, color: T.text });
    });
    tip(s, MX, 6.3, CW, 0.5, "텍스트 분석의 첫걸음", "리뷰에 '맛있' 이 들어 있는지(in), 리뷰가 얼마나 긴지(len) — 고객 리뷰 분석이 여기서 시작해요!", T.green, 15);
    footer(s, SRC + " 2.3");
  }
  {
    const s = add();
    header(s, S23, "문자열에 변수 끼워 넣기 — f-string");
    const lw = 6.8;
    let b = codeOut(s, MX, 1.65, lw, ["name = '아메리카노'", "price = 4500", "print(f'{name}의 가격은 {price}원')", "print(f'{name}의 가격은 {price:,}원')"], "아메리카노의 가격은 4500원\n아메리카노의 가격은 4,500원", { fs: 13, lh: 0.36 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    explainList(s, rx, 1.65, rw, [[1, "따옴표 앞에 f", "f'...' — format(서식)의 f"], [2, "{ } 안에 변수 이름", "그 자리에 변수 값이 들어가요"], [3, "{price:,}", "천 단위 쉼표 넣기 (금액 표시에 최고!)"]], { ih: 0.95, gap: 0.12 });
    card(s, MX, b + 0.2, lw, 0.95, { fill: T.card2 });
    txt(s, [{ text: "+ 로 붙이면?  ", options: { fontFace: F.b, color: T.pink } }, { text: "name + '의 가격은 ' + str(price) + '원' — 길고 str( ) 도 필요해요. f-string 이 훨씬 편해요!" }], { x: MX + 0.25, y: b + 0.2, w: lw - 0.5, h: 0.95, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "더 알아보기", "출력 서식은 '입력문과 출력문' 장에서 자세히 배워요. 지금은 f 와 { } 만 기억!", T.cyan);
    footer(s, PYT + " — Formatted String Literals");
  }
  await D.summary(S23, "2.3 핵심 정리", [
    ["문자열 만들기", "' ' 또는 \" \" 로 감싸기, 여러 줄은 ''' ''',  \\n 줄바꿈 · \\t 탭"],
    ["인덱싱", "s[0] 첫 글자, s[-1] 마지막 글자 — 번호는 0부터"],
    ["슬라이싱", "s[시작:끝] — 끝 바로 앞까지,  s[:4] · s[6:] · s[::-1]"],
    ["for · len · in · f-string", "한 글자씩 반복 · 글자 수 · 포함 여부 · 변수 끼워 넣기"],
  ], "글자를 '다루는 도구'를 배워 봅시다 → 2.4 함수와 메서드");

  // ======================= 2.4 (전반 : 함수) =======================
  sec("2.4 함수와 메서드");
  await D.divider("2.4", "함수와 메서드", "데이터를 다루는 '도구' 사용법 — 천천히, 예제로!", ["함수 = 자판기 (넣으면 나온다)", "메서드 = 리모컨 버튼 (그 데이터 전용)", "문자열 메서드 6가지 묶음"], fa.FaTools);
  {
    const s = add();
    header(s, S24, "함수란? — '넣으면 결과가 나오는' 자판기");
    // vending machine diagram
    const y = 1.85;
    card(s, MX, y, 3.0, 2.2, { fill: T.card, line: T.cyan, lw: 1.5 });
    txt(s, "① 넣는 것", { x: MX, y: y + 0.15, w: 3.0, h: 0.4, fontFace: F.b, fontSize: 16, color: T.cyan, align: "center" });
    txt(s, "'Busan'", { x: MX, y: y + 0.65, w: 3.0, h: 0.7, fontFace: F.code, fontSize: 24, color: T.yellow, align: "center", valign: "middle" });
    txt(s, "인자 (argument)", { x: MX, y: y + 1.5, w: 3.0, h: 0.4, fontSize: 13, color: T.text, align: "center" });
    s.addShape("rightArrow", { x: MX + 3.15, y: y + 0.85, w: 0.9, h: 0.5, fill: { color: T.accent }, line: { type: "none" } });
    s.addShape("roundRect", { x: MX + 4.2, y: y - 0.1, w: 3.2, h: 2.4, rectRadius: 0.15, fill: { color: T.accent, transparency: 40 }, line: { color: T.accent2, width: 2 } });
    s.addImage({ data: await icon(fa.FaCogs, "#FFFFFF"), x: MX + 5.45, y: y + 0.1, w: 0.7, h: 0.7 });
    txt(s, "② 함수 len", { x: MX + 4.2, y: y + 0.9, w: 3.2, h: 0.5, fontFace: F.b, fontSize: 20, align: "center" });
    txt(s, "'글자 수를 세는 기계'", { x: MX + 4.2, y: y + 1.45, w: 3.2, h: 0.4, fontSize: 14, color: T.pale, align: "center" });
    s.addShape("rightArrow", { x: MX + 7.55, y: y + 0.85, w: 0.9, h: 0.5, fill: { color: T.accent }, line: { type: "none" } });
    card(s, MX + 8.6, y, CW - 8.6, 2.2, { fill: T.card, line: T.green, lw: 1.5 });
    txt(s, "③ 나오는 것", { x: MX + 8.6, y: y + 0.15, w: CW - 8.6, h: 0.4, fontFace: F.b, fontSize: 16, color: T.green, align: "center" });
    txt(s, "5", { x: MX + 8.6, y: y + 0.65, w: CW - 8.6, h: 0.7, fontFace: F.code, fontSize: 30, color: T.yellow, align: "center", valign: "middle" });
    txt(s, "반환값 (return value)", { x: MX + 8.6, y: y + 1.5, w: CW - 8.6, h: 0.4, fontSize: 13, color: T.text, align: "center" });
    // code line
    s.addShape("roundRect", { x: MX, y: 4.35, w: CW, h: 0.8, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.accent, width: 1 } });
    txt(s, [{ text: "len", options: { color: T.accent2 } }, { text: "(", options: { color: T.codeText } }, { text: "'Busan'", options: { color: "FCD34D" } }, { text: ")      →      5", options: { color: T.codeText } }], { x: MX, y: 4.35, w: CW, h: 0.8, fontFace: F.code, fontSize: 24, align: "center", valign: "middle" });
    card(s, MX, 5.35, CW, 0.75, { fill: T.card2 });
    txt(s, [{ text: "자판기와 똑같아요  ", options: { fontFace: F.b, color: T.yellow } }, { text: "돈과 버튼(넣는 것) → 자판기(함수)가 일을 함 → 음료(결과)가 나옴. 안에서 어떻게 동작하는지 몰라도 쓸 수 있어요!" }],
      { x: MX + 0.3, y: 5.35, w: CW - 0.6, h: 0.75, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "한 줄 정의", "함수 = 특정 일을 하도록 미리 만들어 둔 코드 묶음. 이름 뒤에 ( ) 를 붙여서 부른다!", T.cyan);
    footer(s, PYT + " — Built-in Functions");
  }
  {
    const s = add();
    header(s, S24, "함수 사용법 해부하기 — 이름( 넣을 값 )");
    s.addShape("roundRect", { x: MX + 1.0, y: 1.9, w: CW - 2.0, h: 1.2, rectRadius: 0.12, fill: { color: T.codeBg }, line: { color: T.accent, width: 1.5 } });
    txt(s, [{ text: "result", options: { color: T.cyan } }, { text: " = ", options: { color: T.codeText } }, { text: "len", options: { color: T.accent2 } }, { text: "(", options: { color: T.pink } }, { text: "'Busan'", options: { color: "FCD34D" } }, { text: ")", options: { color: T.pink } }],
      { x: MX + 1.0, y: 1.9, w: CW - 2.0, h: 1.2, fontFace: F.code, fontSize: 40, align: "center", valign: "middle" });
    const parts = [["result =", "결과를 담을 변수", "나온 값을 상자에 보관", T.cyan], ["len", "함수 이름", "무슨 일을 할지", T.accent2], ["( )", "괄호", "'지금 실행해!' 신호", T.pink], ["'Busan'", "인자 (넣는 값)", "함수에 건네줄 재료", T.yellow]];
    const pw = (CW - 0.9) / 4;
    parts.forEach(([k, n, d, c], i) => {
      const x = MX + i * (pw + 0.3);
      card(s, x, 3.4, pw, 1.75, { fill: T.card, line: c, lw: 1.5 });
      txt(s, k, { x, y: 3.5, w: pw, h: 0.5, fontFace: F.code, fontSize: 18, color: c, align: "center" });
      txt(s, n, { x, y: 4.05, w: pw, h: 0.4, fontFace: F.b, fontSize: 16, align: "center" });
      txt(s, d, { x: x + 0.15, y: 4.5, w: pw - 0.3, h: 0.5, fontSize: 13, color: T.text, align: "center" });
    });
    card(s, MX, 5.35, CW, 0.75, { fill: T.card2 });
    txt(s, [{ text: "인자가 여러 개면?  ", options: { fontFace: F.b, color: T.yellow } }, { text: "쉼표로 구분 →  round(3.14159, 2)  : '3.14159 를 소수 2자리로'" }], { x: MX + 0.3, y: 5.35, w: CW - 0.6, h: 0.75, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "괄호를 빠뜨리면?", "len 만 쓰면 '기계'만 가리킬 뿐 실행되지 않아요. 꼭 len( ) 처럼 괄호까지!", T.pink);
    footer(s, PYT + " — Built-in Functions");
  }
  {
    const s = add();
    header(s, S24, "사실 우리는 이미 함수를 쓰고 있었어요!");
    const used = [["print( )", "화면에 출력", "print('Hi')", "Hi", fa.FaPrint], ["type( )", "타입 알려 주기", "type(3.5)", "float", fa.FaTag], ["int( )", "정수로 바꾸기", "int('7')", "7", fa.FaHashtag], ["float( )", "실수로 바꾸기", "float(7)", "7.0", fa.FaPercent], ["str( )", "문자열로 바꾸기", "str(7)", "'7'", fa.FaFont], ["len( )", "길이 세기", "len('파이썬')", "3", fa.FaRulerHorizontal]];
    const cw = (CW - 0.6) / 3;
    for (let i = 0; i < 6; i++) {
      const [n, d, ex, r, Ic] = used[i];
      const x = MX + (i % 3) * (cw + 0.3), y = 1.65 + Math.floor(i / 3) * 2.05;
      card(s, x, y, cw, 1.85, { fill: T.card });
      await iconCircle(s, Ic, x + 0.25, y + 0.22, 0.6);
      txt(s, n, { x: x + 1.0, y: y + 0.2, w: cw - 1.1, h: 0.4, fontFace: F.code, fontSize: 18, color: T.yellow });
      txt(s, d, { x: x + 1.0, y: y + 0.58, w: cw - 1.1, h: 0.35, fontSize: 14, color: T.text });
      s.addShape("roundRect", { x: x + 0.25, y: y + 1.1, w: cw - 0.5, h: 0.5, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, ex + "  →  " + r, { x: x + 0.35, y: y + 1.1, w: cw - 0.7, h: 0.5, fontFace: F.code, fontSize: 13, color: T.codeText, valign: "middle" });
    }
    tip(s, MX, 6.0, CW, 0.7, "내장 함수(built-in)", "파이썬을 설치하면 처음부터 들어 있는 함수 — import 없이 바로 써요. 전부 '이름( )' 모양이죠?", T.green, 15);
    footer(s, "Python Built-in Functions (docs.python.org/3/library/functions.html)");
  }
  {
    const s = add();
    header(s, S24, "자주 쓰는 내장 함수 ① — 숫자 다루기");
    const rows = [["함수", "하는 일", "예시", "결과"], ["abs(x)", "절댓값 (부호 떼기)", "abs(-7)", "7"], ["round(x)", "반올림 (정수로)", "round(3.7)", "4"], ["round(x, n)", "소수 n자리로 반올림", "round(3.14159, 2)", "3.14"], ["max(…)", "가장 큰 값", "max(3, 9, 5)", "9"], ["min(…)", "가장 작은 값", "min(3, 9, 5)", "3"], ["sum([…])", "합계 (목록을 넣음)", "sum([4500, 5000, 3000])", "12500"]];
    table(s, MX, 1.65, rows, [1.8, 2.5, 3.4, 1.2], { codeCols: [0, 2, 3], hl: { 0: T.yellow, 3: T.green }, rowH: 0.55 });
    const rx = MX + 9.2, rw = CW - 9.2;
    card(s, rx, 1.65, rw, 3.85, { fill: T.card2 });
    txt(s, [{ text: "카페 예시", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "오늘 3잔 판매", options: { breakLine: true } }, { text: "4500, 5000, 3000", options: { fontFace: F.code, color: T.codeText, breakLine: true } }, { text: " ", options: { fontSize: 6, breakLine: true } },
      { text: "합계 sum → 12500", options: { breakLine: true } }, { text: "최고 max → 5000", options: { breakLine: true } }, { text: "최저 min → 3000" }], { x: rx + 0.2, y: 1.65, w: rw - 0.35, h: 3.85, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 5.75, CW, 0.5, "[ ] 는?", "여러 값을 묶은 '리스트' — sum([…]) 처럼 묶어서 넣어요. 다음 시간(03. 데이터 구조)에 자세히!", T.cyan, 15);
    tip(s, MX, 6.35, CW, 0.5, "round 주의", "round(2.5) → 2,  round(3.5) → 4 — 딱 .5 일 때는 가까운 짝수로 가요.", T.pink, 15);
    footer(s, "Python Built-in Functions");
  }
  {
    const s = add();
    header(s, S24, "반환값을 '변수에 담아' 계속 쓰기");
    const hw = (CW - 0.4) / 2;
    txt(s, "반환값을 변수에 저장하고 다시 계산", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    let b = codeOut(s, MX, 2.05, hw, ["r = len('Busan')     # r 에 5 저장", "print(r + 1)"], "6", { fs: 14, lh: 0.38 });
    const rx = MX + hw + 0.4;
    txt(s, "함수 안에 함수 — 안쪽부터 계산", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["print(len('Busan'))", "print(type(len('Busan')))"], "5\n<class 'int'>", { fs: 14, lh: 0.38 });
    card(s, MX, 4.85, CW, 1.2, { fill: T.card2 });
    txt(s, [{ text: "print 와 반환값의 차이  ", options: { fontFace: F.b, color: T.accent2, breakLine: true } }, { text: "len('Busan') 은 값 5 를 '돌려줄' 뿐, 화면에 보여 주는 건 print 의 일. 안쪽부터 : ① len → 5  ② type(5) → int  ③ print 로 출력" }],
      { x: MX + 0.3, y: 4.85, w: CW - 0.6, h: 1.2, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "기억하기", "자판기 음료를 손에 들고 있다가(변수) 나중에 마시듯 — 결과값은 담고, 넣고, 계산에 쓸 수 있어요!", T.green, 15);
    footer(s, "Python Built-in Functions");
  }
};
