// 03장 — 02. 출력문
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, outputBox } = require("./lib");

module.exports = async function ({ D, add, sec, K, SRC, PYI, PYF }) {
  const { codeOut, consoleOut, table, pill, arrowR, arrowD, box } = K;
  const S2 = "02. 출력문  ·  print( )";
  const FS = "Python Tutorial — Fancier Output Formatting (docs.python.org/3/tutorial/inputoutput.html)";

  sec("02. 출력문");
  await D.divider("02", "출력문 print( )", "결과를 보기 좋게 화면에 보여 주기", ["2-1 콤마(,) 와 더하기(+)", "2-2 sep= · end= 매개변수", "2-3 출력 형식 — format · % · f-string", "2-4 이스케이프 문자 \\n \\t …"], fa.FaDesktop);
  {
    const s = add();
    header(s, S2, "2-1 콤마(,) 와 더하기(+) — 띄어 쓰기 vs 붙여 쓰기");
    const hw = (CW - 0.4) / 2;
    txt(s, "콤마(,) — 사이에 공백을 넣어 출력", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.cyan });
    codeOut(s, MX, 2.05, hw, ["a1 = 'Python'", "a2 = 'is'", "a3 = 'fun'", "print(a1, a2, a3)"], "Python is fun", { fs: 14, lh: 0.34 });
    const rx = MX + hw + 0.4;
    txt(s, "더하기(+) — 공백 없이 하나로 연결", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["a1 = 'Python'", "a2 = 'is'", "a3 = 'fun'", "print(a1 + a2 + a3)"], "Pythonisfun", { fs: 14, lh: 0.34 });
    // word blocks picture
    const pic = (x, sep, c) => {
      ["Python", "is", "fun"].forEach((w0, i) => {
        const bx = x + i * (sep ? 1.75 : 1.45);
        s.addShape("roundRect", { x: bx, y: 5.25, w: 1.4, h: 0.6, rectRadius: 0.08, fill: { color: c, transparency: 70 }, line: { color: c, width: 1.2 } });
        txt(s, w0, { x: bx, y: 5.25, w: 1.4, h: 0.6, fontFace: F.code, fontSize: 15, align: "center", valign: "middle" });
        if (sep && i < 2) txt(s, "␣", { x: bx + 1.4, y: 5.25, w: 0.35, h: 0.6, fontSize: 16, color: T.pink, align: "center", valign: "middle" });
      });
    };
    pic(MX + 0.4, true, T.cyan);
    pic(rx + 0.6, false, T.yellow);
    txt(s, "␣ = 콤마가 자동으로 넣어 주는 공백", { x: MX, y: 5.88, w: hw, h: 0.33, fontSize: 12, color: T.muted, align: "center" });
    txt(s, "+ 는 글자를 딱 붙여요 (공백이 필요하면 ' ' 를 직접 더하기)", { x: rx, y: 5.88, w: hw, h: 0.33, fontSize: 12, color: T.muted, align: "center" });
    tip(s, MX, 6.3, CW, 0.5, "기억", "print(a, b) 는 '띄어 쓰기',  print(a + b) 는 '붙여 쓰기'", T.green, 15);
    footer(s, SRC + " 2-1");
  }
  {
    const s = add();
    header(s, S2, "콤마 vs 더하기 — 숫자와 섞을 때 차이가 커요");
    const rows = [["비교", "콤마 ,", "더하기 +"], ["사이 공백", "자동으로 1칸", "없음 (딱 붙음)"], ["숫자와 섞기", "print('나이 :', 20)  ✓", "print('나이 : ' + 20)  ✗ TypeError"], ["숫자끼리", "print(3, 4) → 3 4", "print(3 + 4) → 7 (계산!)"], ["추천 상황", "여러 값을 간단히 나열", "글자를 빈틈없이 이어 붙일 때"]];
    table(s, MX, 1.65, rows, [2.4, (CW - 2.4) / 2, (CW - 2.4) / 2], { codeCols: [], hl: { 0: T.accent2, 1: T.cyan, 2: T.yellow }, rowH: 0.55, fs: 15 });
    const hw = (CW - 0.4) / 2;
    codeOut(s, MX, 4.55, hw, ["print('합계 :', 3 + 4, '개')"], "합계 : 7 개", { fs: 14, lh: 0.34 });
    codeOut(s, MX + hw + 0.4, 4.55, hw, ["print('합계 : ' + str(3 + 4) + '개')"], "합계 : 7개", { fs: 13, lh: 0.34 });
    footer(s, SRC + " 2-1, " + PYF);
  }
  {
    const s = add();
    header(s, S2, "2-2 sep= — 값과 값 사이에 넣을 기호 정하기");
    const lw = 6.6;
    codeOut(s, MX, 1.65, lw, ["print('2025', '03', '01')", "print('2025', '03', '01', sep='-')", "print('010', '1234', '5678', sep='-')", "print('사과', '배', '감', sep=' | ')", "print('a', 'b', 'c', sep='')"],
      "2025 03 01\n2025-03-01\n010-1234-5678\n사과 | 배 | 감\nabc", { fs: 13, lh: 0.34 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 1.65, rw, 2.3, { fill: T.card, line: T.cyan, lw: 1.5 });
    txt(s, "sep = separator (구분자)", { x: rx + 0.25, y: 1.75, w: rw - 0.5, h: 0.4, fontFace: F.b, fontSize: 16, color: T.cyan });
    ["2025", "03", "01"].forEach((v, i) => {
      const bx = rx + 0.35 + i * 1.6;
      s.addShape("roundRect", { x: bx, y: 2.35, w: 1.1, h: 0.6, rectRadius: 0.08, fill: { color: T.card2 }, line: { color: T.accent2, width: 1.2 } });
      txt(s, v, { x: bx, y: 2.35, w: 1.1, h: 0.6, fontFace: F.code, fontSize: 15, align: "center", valign: "middle" });
      if (i < 2) { s.addShape("ellipse", { x: bx + 1.17, y: 2.43, w: 0.44, h: 0.44, fill: { color: T.pink, transparency: 40 }, line: { type: "none" } }); txt(s, "-", { x: bx + 1.17, y: 2.43, w: 0.44, h: 0.44, fontFace: F.code, fontSize: 16, align: "center", valign: "middle" }); }
    });
    txt(s, "값 '사이사이' 에만 들어가요 (맨 앞 · 맨 뒤 ✗). 기본값은 공백 ' '", { x: rx + 0.25, y: 3.1, w: rw - 0.5, h: 0.75, fontSize: 13, color: T.text });
    card(s, rx, 4.15, rw, 1.95, { fill: T.card2 });
    txt(s, [{ text: "실무 활용", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "날짜 2025-03-01, 전화번호 010-1234-5678, CSV 한 줄 kim,25,Busan (sep=',') 처럼 정해진 형식으로 출력할 때 딱!" }],
      { x: rx + 0.25, y: 4.15, w: rw - 0.5, h: 1.95, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.35, CW, 0.5, "주의", "sep= 는 print( ) 괄호 안 '맨 뒤' 에 써요 — 출력할 값들을 먼저, 옵션은 나중에!", T.pink, 15);
    footer(s, SRC + " 2-2, " + PYF);
  }
  {
    const s = add();
    header(s, S2, "2-2 end= — 줄바꿈 대신 넣을 것 정하기");
    const hw = (CW - 0.4) / 2;
    txt(s, "기본 : print( ) 가 끝나면 자동 줄바꿈", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.cyan });
    codeOut(s, MX, 2.05, hw, ["print('Hello')", "print('World')"], "Hello\nWorld", { fs: 14, lh: 0.34 });
    const rx = MX + hw + 0.4;
    txt(s, "end= 로 한 줄에 이어서 출력", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["print('Hello', end=' ')", "print('World')"], "Hello World", { fs: 14, lh: 0.34 });
    // diagram
    const y = 4.55;
    s.addShape("roundRect", { x: MX, y, w: CW, h: 0.95, rectRadius: 0.1, fill: { color: T.card }, line: { color: T.accent2, width: 1 } });
    txt(s, "print('Hello')", { x: MX + 0.3, y, w: 2.6, h: 0.95, fontFace: F.code, fontSize: 15, valign: "middle" });
    txt(s, "=", { x: MX + 2.9, y, w: 0.4, h: 0.95, fontSize: 20, align: "center", valign: "middle" });
    txt(s, "print('Hello', end='\\n')", { x: MX + 3.3, y, w: 3.6, h: 0.95, fontFace: F.code, fontSize: 15, color: T.cyan, valign: "middle" });
    txt(s, "숨어 있던 end 의 기본값이 줄바꿈 \\n !  다른 값으로 바꾸면 줄바꿈 대신 그 글자가 붙어요.", { x: MX + 7.0, y, w: CW - 7.3, h: 0.95, fontSize: 14, valign: "middle" });
    codeOut(s, MX, 5.65, hw, ["print('로딩', end='...'); print('완료')"], null, { fs: 13, lh: 0.32, noNums: true });
    txt(s, "→  로딩...완료", { x: rx, y: 5.65, w: hw, h: 1.08, fontFace: F.code, fontSize: 18, color: T.green, valign: "middle" });
    footer(s, SRC + " 2-2, " + PYF);
  }
  {
    const s = add();
    header(s, S2, "퀴즈 — sep 와 end 를 함께 쓰면?");
    const lw = 6.4;
    codeOut(s, MX, 1.65, lw, ["print('A', 'B', sep=',', end='!\\n')", "print('2025', '03', '01', sep='/', end=' ')", "print('보고서')"], null, { fs: 14, lh: 0.4 });
    txt(s, "결과를 먼저 예상해 보세요!", { x: MX, y: 3.72, w: lw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    outputBox(s, MX, 4.15, lw, 1.07, "A,B!\n2025/03/01 보고서", { fs: 15 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const ex = [["1번 줄", "값 사이 sep=',' → A,B   끝 end='!\\n' → 느낌표 후 줄바꿈", T.cyan], ["2번 줄", "sep='/' → 2025/03/01   end=' ' → 줄바꿈 대신 공백", T.yellow], ["3번 줄", "앞 줄이 줄바꿈 없이 끝났으니 같은 줄에 '보고서'", T.green]];
    ex.forEach(([h, d, c], i) => {
      const y = 1.65 + i * 1.12;
      card(s, rx, y, rw, 0.98, { fill: T.card, line: c, lw: 1.2 });
      txt(s, [{ text: h + "   ", options: { fontFace: F.b, color: c } }, { text: d, options: { fontSize: 13 } }], { x: rx + 0.25, y, w: rw - 0.5, h: 0.98, fontSize: 15, valign: "middle" });
    });
    tip(s, MX, 5.4, CW, 0.75, "정리", "sep = 값과 값 '사이',  end = 출력의 '맨 끝'.  둘 다 쓰지 않으면 sep=' ', end='\\n' 이 기본!", T.green, 15);
    footer(s, PYF);
  }
  {
    const s = add();
    header(s, S2, "2-3 출력 형식 — 같은 문장을 만드는 3가지 방법");
    txt(s, "name = '홍길동',  score = 95  →  '홍길동님의 점수는 95점' 만들기", { x: MX, y: 1.6, w: CW, h: 0.4, fontFace: F.code, fontSize: 15, color: T.cyan });
    const ways = [["① str.format( )", "{ } 자리에 차례대로", "'{}님의 점수는 {}점'\n.format(name, score)", "Python 2.6~", T.accent2], ["② % 서식", "%s · %d 자리에 끼우기", "'%s님의 점수는 %d점'\n% (name, score)", "오래된 방식 (C 언어 스타일)", T.yellow], ["③ f-string ★", "f 를 붙이고 { } 에 변수 직접", "f'{name}님의\n점수는 {score}점'", "Python 3.6~ · 가장 추천", T.green]];
    const cw = (CW - 0.6) / 3;
    ways.forEach(([h, d, code, note, c], i) => {
      const x = MX + i * (cw + 0.3);
      card(s, x, 2.15, cw, 3.55, { fill: T.card, line: c, lw: i === 2 ? 2.5 : 1.5 });
      txt(s, h, { x, y: 2.25, w: cw, h: 0.5, fontFace: F.b, fontSize: 19, color: c, align: "center" });
      txt(s, d, { x, y: 2.75, w: cw, h: 0.4, fontSize: 14, align: "center" });
      s.addShape("roundRect", { x: x + 0.2, y: 3.3, w: cw - 0.4, h: 1.25, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, code, { x: x + 0.2, y: 3.3, w: cw - 0.4, h: 1.25, fontFace: F.code, fontSize: 13, color: T.codeText, align: "center", valign: "middle" });
      txt(s, note, { x, y: 4.7, w: cw, h: 0.4, fontSize: 13, color: T.text, align: "center" });
      txt(s, "→ 홍길동님의 점수는 95점", { x, y: 5.1, w: cw, h: 0.4, fontFace: F.code, fontSize: 12, color: T.green, align: "center" });
    });
    tip(s, MX, 5.95, CW, 0.75, "왜 3가지?", "결과는 똑같아요! 옛날 코드 · 인터넷 예제에서 셋 다 보이니 '읽을 줄' 은 알고, 직접 쓸 때는 f-string 으로!", T.green, 15);
    footer(s, SRC + " 2-3, " + FS);
  }
  {
    const s = add();
    header(s, S2, "① str.format( ) — 빈칸 { } 이 있는 양식 채우기");
    const lw = 6.6;
    const b = codeOut(s, MX, 1.65, lw, ["msg = '{}님, 주문하신 {}가 준비되었습니다.'", "print(msg.format('김민수', '라떼'))", "print(msg.format('이지은', '케이크'))"], "김민수님, 주문하신 라떼가 준비되었습니다.\n이지은님, 주문하신 케이크가 준비되었습니다.", { fs: 13, lh: 0.32 });
    codeOut(s, MX, b + 0.15, lw, ["print('{1} {0}'.format('A', 'B'))          # B A", "print('{name}은 {age}살'.format(name='kim', age=20))", "# kim은 20살"], null, { fs: 12, lh: 0.32 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 1.65, rw, 2.0, { fill: T.card, line: T.accent2, lw: 1.5 });
    txt(s, [{ text: "양식 비유", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "'___님, 주문하신 ___가 준비되었습니다' 같은 빈칸 양식을 한 번 만들어 두고, 사람 · 메뉴만 바꿔 계속 재사용!" }], { x: rx + 0.25, y: 1.65, w: rw - 0.5, h: 2.0, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    const rows = [["쓰는 법", "채우는 순서"], ["{ } { }", "넣은 순서대로"], ["{1} {0}", "번호로 (0부터)"], ["{name}", "이름으로"]];
    table(s, rx, 3.85, rows, [2.0, rw - 2.0], { codeCols: [0], hl: { 0: T.yellow }, rowH: 0.5, fs: 14 });
    tip(s, rx, 6.0, rw, 0.8, "언제 좋을까?", "데이터만 바꿔 반복 출력 — 안내 문자 · 알림 · 리포트", T.cyan, 13);
    footer(s, SRC + " 2-3, " + FS);
  }
  {
    const s = add();
    header(s, S2, "② % 서식 — 자리마다 '형식' 을 정해 끼우기");
    const rows = [["기호", "뜻", "예", "결과"], ["%d", "정수 (decimal)", "'%d개' % 3", "3개"], ["%f", "실수 (float)", "'%.2f원' % 1234.5678", "1234.57원"], ["%s", "문자열 (string)", "'%s님' % '홍길동'", "홍길동님"], ["%c", "문자 1개 (character)", "'%c' % 'A'", "A"]];
    table(s, MX, 1.65, rows, [1.4, 3.1, 4.3, CW - 8.8], { codeCols: [0, 2, 3], hl: { 0: T.yellow, 3: T.green }, rowH: 0.5, fs: 15 });
    const lw = 7.0;
    codeOut(s, MX, 4.3, lw, ["print('%s님 %d점' % ('홍길동', 95))", "print('%.1f' % 3.14159)"], "홍길동님 95점\n3.1", { fs: 13, lh: 0.3 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 4.3, rw, 2.3, { fill: T.card2 });
    txt(s, [{ text: "%.2f 읽기", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "% + .2 (소수점 2자리) + f (실수) → 반올림해서 소수 둘째 자리까지.  값이 여러 개면 ( ) 로 묶어서 순서대로!" }], { x: rx + 0.25, y: 4.3, w: rw - 0.5, h: 2.3, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    footer(s, SRC + " 2-3, Python Library — printf-style String Formatting");
  }
  {
    const s = add();
    header(s, S2, "③ f-string — 가장 쉽고 많이 쓰는 방법 ★");
    s.addShape("roundRect", { x: MX, y: 1.7, w: CW, h: 0.9, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.green, width: 1.2 } });
    txt(s, [{ text: "print(", options: { color: T.codeText } }, { text: "f", options: { color: T.pink, bold: true } }, { text: "'", options: { color: "FCD34D" } }, { text: "{name}", options: { color: T.cyan } }, { text: "님의 점수는 ", options: { color: "FCD34D" } }, { text: "{score}", options: { color: T.cyan } }, { text: "점'", options: { color: "FCD34D" } }, { text: ")", options: { color: T.codeText } }],
      { x: MX, y: 1.7, w: CW, h: 0.9, fontFace: F.code, fontSize: 24, align: "center", valign: "middle" });
    const parts = [["f", "따옴표 앞에 f — '이건 f-string 이야!' 표시", T.pink], ["{변수}", "중괄호 안에 변수 이름을 그대로 — 값으로 바뀌어 들어가요", T.cyan], ["{식}", "계산식도 OK — {score + 5} , {price * qty}", T.yellow]];
    parts.forEach(([k, d, c], i) => {
      const y = 2.85 + i * 0.72;
      pill(s, k, MX, y + 0.1, 1.5, c, 0.44, 14);
      txt(s, d, { x: MX + 1.7, y, w: 5.2, h: 0.64, fontSize: 14, valign: "middle" });
    });
    const rx = MX + 7.1, rw = CW - 7.1;
    codeOut(s, rx, 2.85, rw, ["name = '홍길동'", "score = 95", "print(f'{name}님의 점수는 {score}점')", "print(f'보너스 포함 {score + 5}점')"], "홍길동님의 점수는 95점\n보너스 포함 100점", { fs: 12, lh: 0.3 });
    card(s, MX, 5.15, 6.9, 1.0, { fill: T.card2 });
    txt(s, [{ text: "자주 하는 실수  ", options: { fontFace: F.b, color: T.pink } }, { text: "f 를 빼먹으면 {name} 이 글자 그대로 출력돼요!" }], { x: MX + 0.3, y: 5.15, w: 6.3, h: 1.0, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.35, CW, 0.5, "복습", "2.3 문자형 데이터에서 잠깐 봤던 f-string — 이번엔 서식 옵션까지 배워요!", T.cyan, 15);
    footer(s, SRC + " 2-3, " + FS);
  }
  {
    const s = add();
    header(s, S2, "f-string 서식 옵션 — { 값 : 옵션 }");
    const rows = [["옵션", "뜻", "코드", "결과"], [":.3f", "소수점 3자리 (반올림)", "f'{1234567.891:.3f}'", "1234567.891"], [":,", "천 단위 쉼표", "f'{1234567.891:,}'", "1,234,567.891"], [":,.0f", "쉼표 + 소수점 없이", "f'{1234567.891:,.0f}'", "1,234,568"],
      [":+", "부호 항상 표시", "f'{5:+}'   f'{-5:+}'", "+5   -5"], [":.2%", "백분율 (×100, 소수 2자리)", "f'{0.1234:.2%}'", "12.34%"], [":%Y-%m-%d %H:%M:%S", "날짜 · 시간 형식", "f'{now:%Y-%m-%d %H:%M:%S}'", "2025-03-01 09:30:00"]];
    table(s, MX, 1.65, rows, [3.2, 3.0, 3.9, CW - 10.1], { codeCols: [0, 2, 3], hl: { 0: T.yellow, 3: T.green }, rowH: 0.56, fs: 13, hfs: 14 });
    tip(s, MX, 5.75, CW, 0.5, "읽는 법", "콜론( : ) 앞은 '무엇을',  뒤는 '어떤 모양으로'.  :,.0f 처럼 옵션을 겹쳐 쓸 수도 있어요.", T.cyan, 15);
    tip(s, MX, 6.35, CW, 0.5, "날짜 예시", "now = datetime.datetime(2025, 3, 1, 9, 30, 0) 으로 만든 값 (import datetime 필요)", T.muted, 13);
    footer(s, SRC + " 2-3, Python Library — Format Specification Mini-Language");
  }
  {
    const s = add();
    header(s, S2, "실무 예 — f-string 으로 매출 보고 한 줄 만들기");
    const lw = 7.4;
    const b = codeOut(s, MX, 1.65, lw, ["import datetime", "now = datetime.datetime(2025, 3, 1, 9, 30)", "sales = 12500000      # 매출", "rate = 0.074          # 이익률", "growth = 0.052        # 전월 대비 성장", "print(f'[{now:%Y-%m-%d %H:%M}] 보고')", "print(f'매출 {sales:,}원 | 이익률 {rate:.1%}')", "print(f'성장률 {growth:+.1%}')"],
      "[2025-03-01 09:30] 보고\n매출 12,500,000원 | 이익률 7.4%\n성장률 +5.2%", { fs: 12, lh: 0.3 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const m = [["{sales:,}", "12500000 → 12,500,000", T.yellow], ["{rate:.1%}", "0.074 → 7.4%", T.cyan], ["{growth:+.1%}", "0.052 → +5.2%", T.green], ["{now:%Y-%m-%d %H:%M}", "날짜를 원하는 모양으로", T.pink]];
    m.forEach(([k, d, c], i) => {
      const y = 1.65 + i * 1.05;
      card(s, rx, y, rw, 0.9, { fill: T.card, line: c, lw: 1.2 });
      txt(s, [{ text: k, options: { fontFace: F.code, color: c, fontSize: 13, breakLine: true } }, { text: d, options: { fontSize: 13 } }], { x: rx + 0.2, y, w: rw - 0.4, h: 0.9, valign: "middle" });
    });
    tip(s, MX, 6.35, CW, 0.5, "포인트", "숫자는 그대로 두고 '보여 주는 모양' 만 바꿔요 — 계산은 원래 값으로 정확하게!", T.green, 15);
    footer(s, SRC + " 2-3");
  }
  {
    const s = add();
    header(s, S2, "2-4 이스케이프 문자 — 역슬래시(\\) 로 특별한 글자 넣기");
    const rows = [["이스케이프", "뜻", "예", "결과"], ["\\n", "줄바꿈 (new line)", "'첫 줄\\n둘째 줄'", "첫 줄 ↵ 둘째 줄"], ["\\t", "탭 (tab) — 칸 띄우기", "'이름\\t나이'", "이름    나이"], ["\\\\", "역슬래시 자체", "'C:\\\\temp'", "C:\\temp"],
      ["\\'", "작은따옴표", "'It\\'s'", "It's"], ["\\\"", "큰따옴표", "\"그는 \\\"안녕\\\" 했다\"", "그는 \"안녕\" 했다"], ["\\b", "백스페이스 (앞 글자 지움)", "'Hello\\bWorld'", "HellWorld (환경마다 다름)"]];
    table(s, MX, 1.65, rows, [2.0, 3.4, 3.9, CW - 9.3], { codeCols: [0, 2, 3], hl: { 0: T.yellow, 3: T.green }, rowH: 0.56, fs: 14 });
    tip(s, MX, 5.75, CW, 0.5, "왜 필요?", "따옴표 안에서 Enter 를 칠 수 없고, 따옴표를 또 쓰면 문자열이 끝나 버려요 → \\ 로 '특별 모드' 알리기!", T.cyan, 15);
    tip(s, MX, 6.35, CW, 0.5, "주의", "Windows 경로 'C:\\new' 는 \\n 이 줄바꿈이 돼요! 'C:\\\\new' 또는 '/' 를 쓰세요.", T.pink, 15);
    footer(s, SRC + " 2-4, Python Reference — String and Bytes literals");
    s.addNotes("\\b 는 터미널에서는 앞 글자를 지운 것처럼 보이지만(HellWorld), Colab 출력창에서는 특수문자로 표시되는 등 환경마다 다르게 보입니다. 실무에서는 거의 쓰지 않습니다.");
  }
  {
    const s = add();
    header(s, S2, "이스케이프 문자 실습 — 결과 확인하기");
    const hw = (CW - 0.4) / 2;
    codeOut(s, MX, 1.65, hw, ["print('첫 줄\\n둘째 줄')", "print('이름\\t나이')", "print('C:\\\\temp')"], "첫 줄\n둘째 줄\n이름    나이\nC:\\temp", { fs: 14, lh: 0.36 });
    const rx = MX + hw + 0.4;
    codeOut(s, rx, 1.65, hw, ["print('It\\'s')", "print(\"그는 \\\"안녕\\\" 했다\")", "print(\"It's\")   # 다른 따옴표로 감싸도 OK"], "It's\n그는 \"안녕\" 했다\nIt's", { fs: 13, lh: 0.36 });
    card(s, MX, 5.45, CW, 0.82, { fill: T.card2 });
    txt(s, [{ text: "따옴표 꿀팁  ", options: { fontFace: F.b, color: T.yellow } }, { text: "안에 ' 가 있으면 바깥을 \" 로 \"It's\",  안에 \" 가 있으면 바깥을 ' 로 — 이스케이프 없이도 해결!" }],
      { x: MX + 0.3, y: 5.45, w: CW - 0.6, h: 0.82, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.38, CW, 0.45, "\\n 은 파일에서도!", "03 파일 입출력에서 여러 줄을 저장할 때 \\n 으로 줄을 나눠요 — 꼭 기억!", T.green, 15);
    footer(s, SRC + " 2-4");
  }
  await D.summary(S2, "02. 출력문 핵심 정리", [
    ["콤마 vs 더하기", "print(a, b) 띄어 쓰기 · 숫자도 OK,  print(a + b) 붙여 쓰기 · 문자열끼리만"],
    ["sep= · end=", "sep = 값 사이 기호 (기본 ' '),  end = 맨 끝 (기본 '\\n' 줄바꿈)"],
    ["출력 형식", "format { } · % 서식 %d %f %s · f-string f'{값:옵션}' ★ — :,  :.2f  :.1%  :+"],
    ["이스케이프", "\\n 줄바꿈 · \\t 탭 · \\\\ 역슬래시 · \\' \\\" 따옴표"],
  ], "화면 대신 파일에 남기기 → 03. 파일 입출력");
};
