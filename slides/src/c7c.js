// 03장 — 03. 파일 입출력 + 마무리
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, outputBox, browserWin, dark } = require("./lib");

module.exports = async function ({ D, add, sec, K, SRC, PYI, PYF }) {
  const { codeOut, consoleOut, table, pill, arrowR, arrowD, box } = K;
  const S3 = "03. 파일 입출력  ·  open( )";
  const RW = "Python Tutorial — Reading and Writing Files (docs.python.org/3/tutorial/inputoutput.html)";

  sec("03. 파일 입출력");
  await D.divider("03", "파일 입출력", "프로그램이 꺼져도 남는 기록 만들기", ["3-1 파일 열기 open( ) · 모드 r w a", "3-2 읽기 read( ) · 3-3 쓰기 write( ) · 닫기 close( )", "3-4 단어로 나누어 읽기 · 3-5 환전 결과 저장"], fa.FaFileAlt);
  {
    const s = add();
    header(s, S3, "왜 파일에 저장할까? — 화이트보드 vs 공책");
    const hw = (CW - 0.4) / 2;
    const sides = [["변수 (메모리)", "화이트보드", "프로그램 · 런타임을 끄면 싹 지워져요", "sales = 13500", fa.FaChalkboard, T.pink], ["파일 (저장장치)", "공책", "끄고 다시 켜도 그대로 남아 있어요", "sales.txt  →  13500", fa.FaBook, T.green]];
    for (let i = 0; i < 2; i++) {
      const [h, an, d, ex, Ic, c] = sides[i];
      const x = MX + i * (hw + 0.4);
      card(s, x, 1.65, hw, 3.3, { fill: T.card, line: c, lw: 1.5 });
      await iconCircle(s, Ic, x + 0.35, 1.9, 1.0, c, "#FFFFFF", 55);
      txt(s, h, { x: x + 1.6, y: 1.9, w: hw - 1.8, h: 0.5, fontFace: F.b, fontSize: 20, color: c });
      txt(s, an + " 같아요", { x: x + 1.6, y: 2.4, w: hw - 1.8, h: 0.45, fontSize: 16 });
      txt(s, d, { x: x + 0.35, y: 3.15, w: hw - 0.7, h: 0.5, fontSize: 15, color: T.text });
      s.addShape("roundRect", { x: x + 0.35, y: 3.8, w: hw - 0.7, h: 0.8, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, ex, { x: x + 0.35, y: 3.8, w: hw - 0.7, h: 0.8, fontFace: F.code, fontSize: 16, color: T.yellow, align: "center", valign: "middle" });
    }
    card(s, MX, 5.15, CW, 0.95, { fill: T.card2 });
    txt(s, [{ text: "실무에서는  ", options: { fontFace: F.b, color: T.yellow } }, { text: "주문 기록 · 매출 장부 · 설문 결과를 파일로 남겨 두고, 나중에 다시 읽어서 분석해요 (CSV · 엑셀은 08장 pandas 에서!)" }],
      { x: MX + 0.3, y: 5.15, w: CW - 0.6, h: 0.95, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "이번 절", "가장 기본인 '텍스트 파일(.txt)' 로 열기 · 쓰기 · 읽기 · 닫기를 익혀요.", T.cyan, 15);
    footer(s, RW);
  }
  {
    const s = add();
    header(s, S3, "파일 작업은 늘 3단계 — 열고 → 작업하고 → 닫기");
    const st = [["① 열기", "open( )", "냉장고 문 열기", "f = open('test.txt', 'w')", fa.FaDoorOpen, T.cyan], ["② 작업", "write( ) · read( )", "넣거나 꺼내기", "f.write('Hello')", fa.FaExchangeAlt, T.yellow], ["③ 닫기", "close( )", "문 꼭 닫기!", "f.close()", fa.FaDoorClosed, T.green]];
    const bw = 3.5, gap = (CW - 3 * bw) / 2;
    for (let i = 0; i < 3; i++) {
      const [h, f, an, code, Ic, c] = st[i];
      const x = MX + i * (bw + gap);
      card(s, x, 1.7, bw, 3.4, { fill: T.card, line: c, lw: 1.5 });
      await iconCircle(s, Ic, x + bw / 2 - 0.5, 1.9, 1.0, c, "#FFFFFF", 55);
      txt(s, h, { x, y: 3.0, w: bw, h: 0.5, fontFace: F.b, fontSize: 20, color: c, align: "center" });
      txt(s, f, { x, y: 3.5, w: bw, h: 0.4, fontFace: F.code, fontSize: 15, align: "center" });
      txt(s, an, { x, y: 3.9, w: bw, h: 0.4, fontSize: 14, color: T.text, align: "center" });
      s.addShape("roundRect", { x: x + 0.2, y: 4.4, w: bw - 0.4, h: 0.5, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, code, { x: x + 0.2, y: 4.4, w: bw - 0.4, h: 0.5, fontFace: F.code, fontSize: 12, color: T.codeText, align: "center", valign: "middle" });
      if (i < 2) arrowR(s, x + bw + 0.1, 3.1, gap - 0.2);
    }
    card(s, MX, 5.3, CW, 0.85, { fill: T.card2 });
    txt(s, [{ text: "닫지 않으면?  ", options: { fontFace: F.b, color: T.pink } }, { text: "냉장고 문을 열어 두면 음식이 상하듯, 쓴 내용이 파일에 다 저장되지 않거나 다른 프로그램이 파일을 못 열 수 있어요." }],
      { x: MX + 0.3, y: 5.3, w: CW - 0.6, h: 0.85, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "f 는 무엇?", "open( ) 이 돌려주는 '파일 객체' — 파일을 조종하는 리모컨이에요. 이름은 마음대로 (f, file, temp …)", T.cyan, 15);
    footer(s, SRC + " 3-1, " + RW);
  }
  {
    const s = add();
    header(s, S3, "3-1 open( ) 문장 해부하기");
    s.addShape("roundRect", { x: MX + 0.4, y: 1.95, w: CW - 0.8, h: 0.95, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.accent, width: 1.2 } });
    txt(s, [{ text: "temp", options: { color: T.cyan } }, { text: " = ", options: { color: T.codeText } }, { text: "open", options: { color: T.green } }, { text: "(", options: { color: T.codeText } }, { text: "'test.txt'", options: { color: "FCD34D" } }, { text: ", ", options: { color: T.codeText } }, { text: "'w'", options: { color: T.pink } }, { text: ")", options: { color: T.codeText } }],
      { x: MX + 0.4, y: 1.95, w: CW - 0.8, h: 0.95, fontFace: F.code, fontSize: 28, align: "center", valign: "middle" });
    const parts = [["파일 객체", "파일을 조종할 리모컨", T.cyan, MX + 0.6], ["open( )", "파일을 여는 함수", T.green, MX + 3.45], ["① 파일 이름", "열(만들) 파일 이름 · 경로", T.yellow, MX + 6.3], ["② 모드", "읽기 r · 쓰기 w · 추가 a", T.pink, MX + 9.15]];
    parts.forEach(([h, d, c, x]) => {
      arrowD(s, x + 1.12, 3.0, 0.45, c);
      box(s, x, 3.55, 2.55, 1.2, h, d, c);
    });
    card(s, MX, 5.0, CW, 1.1, { fill: T.card2 });
    txt(s, [{ text: "모드를 생략하면?  ", options: { fontFace: F.b, color: T.yellow } }, { text: "open('test.txt') 는 open('test.txt', 'r') 과 같아요 — 기본값은 '읽기 + 텍스트' 모드(rt)." }],
      { x: MX + 0.3, y: 5.0, w: CW - 0.6, h: 1.1, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "한글 파일이면", "open('test.txt', 'w', encoding='utf-8') 처럼 encoding 을 적어 주면 어느 컴퓨터에서나 안전해요.", T.cyan, 15);
    footer(s, SRC + " 3-1, " + PYF);
  }
  {
    const s = add();
    header(s, S3, "파일 여는 모드 (mode) 한눈에 보기");
    const rows = [["모드", "이름", "하는 일", "파일이 없으면", "파일이 있으면"], ["r", "읽기 (기본값)", "내용 읽기", "오류 (FileNotFoundError)", "처음부터 읽기"], ["w", "쓰기", "새로 쓰기", "새 파일 생성", "기존 내용 지우고 덮어쓰기 ⚠"],
      ["a", "추가 (append)", "끝에 이어 쓰기", "새 파일 생성", "기존 내용 뒤에 추가"], ["t", "텍스트 (기본값)", "글자 파일", "—", "r 과 함께 rt (생략 가능)"], ["b", "바이너리", "이미지 등 글자 아닌 파일", "—", "rb · wb 처럼 함께 사용"]];
    table(s, MX, 1.65, rows, [1.2, 2.3, 2.9, 3.0, CW - 9.4], { codeCols: [0], hl: { 0: T.yellow, 4: T.text }, rowH: 0.62, fs: 14, hfs: 14 });
    tip(s, MX, 5.6, CW, 0.6, "가장 위험한 실수", "'w' 로 열면 그 순간 기존 내용이 사라져요! 내용을 보존하며 덧붙이려면 'a'", T.pink, 15);
    tip(s, MX, 6.3, CW, 0.5, "기억법", "r = read 읽기,  w = write 쓰기,  a = append 덧붙이기", T.cyan, 15);
    footer(s, SRC + " 3-1, " + PYF);
  }
  {
    const s = add();
    header(s, S3, "모드 r · w · a — 공책으로 이해하기");
    const m = [["r", "읽기", "공책을 펴서 읽기만 해요.\n쓰기는 불가!", "공책이 없으면 → 오류", fa.FaBookOpen, T.cyan], ["w", "쓰기", "새 공책을 꺼내 처음부터 써요.\n이미 있던 공책은 깨끗이 지우고!", "덮어쓰기 주의 ⚠", fa.FaPen, T.pink], ["a", "추가", "마지막 줄 다음부터 이어서 써요.\n앞 내용은 그대로!", "일기장 · 판매 기록에 딱", fa.FaPlusSquare, T.green]];
    const cw = (CW - 0.6) / 3;
    for (let i = 0; i < 3; i++) {
      const [k, n, d, note, Ic, c] = m[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.65, cw, 4.4, { fill: T.card, line: c, lw: 1.5 });
      txt(s, "'" + k + "'", { x: x + 0.3, y: 1.8, w: 1.4, h: 0.9, fontFace: F.code, fontSize: 40, color: c });
      await iconCircle(s, Ic, x + cw - 1.2, 1.85, 0.85, c, "#FFFFFF", 55);
      txt(s, n + " 모드", { x: x + 0.3, y: 2.75, w: cw - 0.6, h: 0.45, fontFace: F.b, fontSize: 19 });
      // notebook drawing
      const ny = 3.3;
      s.addShape("rect", { x: x + 0.3, y: ny, w: cw - 0.6, h: 1.2, fill: { color: "F8FAFC" }, line: { color: c, width: 1 } });
      for (let l = 0; l < 3; l++) s.addShape("line", { x: x + 0.45, y: ny + 0.32 + l * 0.3, w: cw - 0.9, h: 0, line: { color: "CBD5E1", width: 0.75 } });
      const lines = k === "r" ? ["첫 번째 메모 👀", "", ""] : k === "w" ? ["새 내용 ✍", "", ""] : ["첫 번째 메모", "두 번째 메모", "새 내용 ✍"];
      lines.forEach((t, l) => dark(s, t, { x: x + 0.5, y: ny + 0.08 + l * 0.3, w: cw - 1.0, h: 0.28, fontSize: 11, color: l === 2 && k === "a" || (k === "w" && l === 0) ? "B91C1C" : "1E293B" }));
      txt(s, d, { x: x + 0.3, y: 4.6, w: cw - 0.6, h: 0.85, fontSize: 13, color: T.text });
      pill(s, note, x + 0.3, 5.5, cw - 0.6, c, 0.4, 13);
    }
    tip(s, MX, 6.3, CW, 0.5, "어떤 걸 쓸까?", "새로 만들기 = w,  기록을 계속 쌓기 = a,  저장된 걸 보기 = r", T.yellow, 15);
    footer(s, SRC + " 3-1");
  }
  {
    const s = add();
    header(s, S3, "3-3 파일에 쓰기 — write( ) 와 close( )");
    const lw = 6.8;
    const b = codeOut(s, MX, 1.65, lw, ["f = open('test.txt', 'w')", "f.write('Hello Python\\n')", "f.write('파이썬 파일 입출력\\n')", "f.close()"], null, { fs: 14, lh: 0.36 });
    txt(s, [{ text: "실행 결과 화면에는 아무것도 안 나와요! ", options: { fontFace: F.b, color: T.yellow } }, { text: "대신 test.txt 파일이 생겼어요 → 오른쪽 Colab 파일 패널 확인" }], { x: MX, y: b + 0.15, w: lw, h: 0.75, fontSize: 14 });
    explain(s, MX, b + 1.0, lw, [["1", "open( ) 으로 'w' 모드 → test.txt 새로 만들기"], ["2", "write( ) 로 한 줄씩 쓰기 — \\n 으로 줄바꿈"], ["3", "close( ) 로 닫아야 내용이 확실히 저장!"]]);
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const r = browserWin(s, rx, 1.65, rw, 3.1, "colab — 왼쪽 📁 파일 패널");
    dark(s, "📁 파일", { x: r.x, y: r.y, w: r.w, h: 0.35, fontFace: F.b, fontSize: 12 });
    [["▸ 📁 sample_data", "64748B"], ["   📄 test.txt", "1D4ED8"]].forEach(([t, c], i) => dark(s, t, { x: r.x + 0.1, y: r.y + 0.45 + i * 0.4, w: r.w - 0.2, h: 0.35, fontSize: 12, color: c }));
    s.addShape("rect", { x: r.x, y: r.y + 1.35, w: r.w, h: 0.95, fill: { color: "FEF9C3" }, line: { type: "none" } });
    dark(s, "test.txt 를 더블클릭하면 내용을 바로 볼 수 있어요. (새로고침 🔄 버튼으로 목록 갱신)", { x: r.x + 0.1, y: r.y + 1.35, w: r.w - 0.2, h: 0.95, fontSize: 11, valign: "middle" });
    tip(s, rx, 4.95, rw, 1.2, "숫자 13 이 보인다면?", "write( ) 가 셀의 마지막 줄이면 '쓴 글자 수' 를 보여 줘요 ('Hello Python\\n' = 13글자). 오류 아님!", T.cyan, 13);
    tip(s, MX, 6.35, CW, 0.5, "주의", "write( ) 에는 문자열만! f.write(100) → TypeError,  f.write(str(100)) 은 OK", T.pink, 15);
    footer(s, SRC + " 3-3, " + RW);
  }
  {
    const s = add();
    header(s, S3, "3-2 파일 읽기 — read( ) 로 전체 내용 가져오기");
    const lw = 6.8;
    const b = codeOut(s, MX, 1.65, lw, ["f = open('test.txt', 'r')", "data = f.read()", "f.close()", "print(data)"], "Hello Python\n파이썬 파일 입출력", { fs: 14, lh: 0.36 });
    txt(s, "앞에서 쓴 test.txt 의 내용이 그대로 돌아왔어요!", { x: MX, y: b + 0.12, w: lw, h: 0.4, fontSize: 14, color: T.green });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    card(s, rx, 1.65, rw, 2.3, { fill: T.card, line: T.cyan, lw: 1.5 });
    txt(s, [{ text: "read( ) 는 파일 전체를 '문자열 하나' 로", options: { fontFace: F.b, color: T.cyan, breakLine: true } }, { text: "data 의 실제 값 :", options: { fontSize: 13, breakLine: true } }, { text: "'Hello Python\\n파이썬 파일 입출력\\n'", options: { fontFace: F.code, fontSize: 12, color: T.yellow } }],
      { x: rx + 0.25, y: 1.65, w: rw - 0.5, h: 2.3, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    card(s, rx, 4.15, rw, 1.95, { fill: T.card2 });
    txt(s, [{ text: "읽은 다음에는?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "data 는 평범한 문자열이니까 2.4 의 문자열 메서드 (split · replace · count …) 를 그대로 쓸 수 있어요!" }],
      { x: rx + 0.25, y: 4.15, w: rw - 0.5, h: 1.95, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.35, CW, 0.5, "오류 주의", "없는 파일을 'r' 로 열면 FileNotFoundError — 파일 이름 · 위치를 먼저 확인!", T.pink, 15);
    footer(s, SRC + " 3-2, " + RW);
  }
  {
    const s = add();
    header(s, S3, "실험 — 'w' 는 덮어쓰고, 'a' 는 이어 쓴다");
    const hw = (CW - 0.4) / 2;
    txt(s, "'w' 로 두 번 쓰면 → 마지막 것만 남음", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.pink });
    codeOut(s, MX, 2.05, hw, ["f = open('memo.txt', 'w')", "f.write('첫 번째 메모\\n')", "f.close()", "f = open('memo.txt', 'w')", "f.write('두 번째 메모\\n')", "f.close()", "print(open('memo.txt').read())"], "두 번째 메모", { fs: 13, lh: 0.3 });
    const rx = MX + hw + 0.4;
    txt(s, "이어서 'a' 로 쓰면 → 뒤에 추가", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.green });
    codeOut(s, rx, 2.05, hw, ["f = open('memo.txt', 'a')", "f.write('세 번째 메모\\n')", "f.close()", "print(open('memo.txt').read())"], "두 번째 메모\n세 번째 메모", { fs: 13, lh: 0.3 });
    card(s, rx, 5.05, hw, 1.1, { fill: T.card2 });
    txt(s, [{ text: "실무 예  ", options: { fontFace: F.b, color: T.yellow } }, { text: "매일 매출을 sales_log.txt 에 'a' 모드로 한 줄씩 쌓으면 → 자동 판매 장부 완성!" }], { x: rx + 0.25, y: 5.05, w: hw - 0.5, h: 1.1, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.35, CW, 0.5, "\\n 을 잊으면?", "f.write('a'); f.write('b') → 'ab' 처럼 한 줄에 붙어요. 줄을 나누려면 끝에 \\n!", T.cyan, 15);
    footer(s, SRC + " 3-1, 3-3");
  }
  {
    const s = add();
    header(s, S3, "읽는 방법 3가지 — read( ) · readline( ) · readlines( )");
    txt(s, "fruit.txt 내용 :  사과 ↵ 바나나 ↵ 체리 ↵", { x: MX, y: 1.6, w: CW, h: 0.4, fontFace: F.code, fontSize: 15, color: T.cyan });
    const rows = [["메서드", "읽는 양", "결과 모양", "결과 예"], ["read( )", "전체", "문자열 1개", "'사과\\n바나나\\n체리\\n'"], ["readline( )", "한 줄씩", "문자열 1개 (호출할 때마다 다음 줄)", "'사과\\n'"], ["readlines( )", "전체를 줄 단위로", "리스트 (3.2!)", "['사과\\n', '바나나\\n', '체리\\n']"]];
    table(s, MX, 2.1, rows, [2.4, 2.2, 3.6, CW - 8.2], { codeCols: [0, 3], hl: { 0: T.yellow, 3: T.green }, rowH: 0.62, fs: 14 });
    card(s, MX, 4.75, CW, 1.35, { fill: T.card2 });
    txt(s, [{ text: "어떤 걸 쓸까?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "통째로 보거나 단어를 셀 때 = read( ),  줄마다 따로 처리할 때 = readlines( ) (리스트라서 인덱스 · len 사용 가능)" }],
      { x: MX + 0.3, y: 4.75, w: CW - 0.6, h: 1.35, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "\\n 이 보이는 이유", "줄 끝의 줄바꿈 기호까지 함께 읽어서예요. print( ) 하면 진짜 줄바꿈으로 보여요.", T.cyan, 15);
    footer(s, RW);
  }
  {
    const s = add();
    header(s, S3, "with 문 — close( ) 를 자동으로 해 주는 안전한 방법");
    const hw = (CW - 0.4) / 2;
    txt(s, "기본 방식 (close 직접)", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.text });
    codeOut(s, MX, 2.05, hw, ["f = open('fruit.txt', 'r')", "data = f.read()", "f.close()          # 잊기 쉬움!", "print(data)"], null, { fs: 13, lh: 0.34 });
    const rx = MX + hw + 0.4;
    txt(s, "with 방식 (공식 문서 추천)", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.green });
    codeOut(s, rx, 2.05, hw, ["with open('fruit.txt', encoding='utf-8') as f:", "    data = f.read()        # 읽기 모드", "print(data)", "print(f.closed)    # 닫혔나?"], "사과\n바나나\n체리\nTrue", { fs: 12, lh: 0.34 });
    card(s, MX, 4.35, hw, 1.8, { fill: T.card2 });
    txt(s, [{ text: "자동문 비유", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "with 블록(들여쓴 부분)이 끝나면 파이썬이 알아서 문을 닫아 줘요. 중간에 오류가 나도 닫혀요!" }],
      { x: MX + 0.3, y: 4.35, w: hw - 0.6, h: 1.8, fontSize: 15, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.35, CW, 0.5, "모양", "with open(파일, 모드) as 이름:  ← 콜론 + 다음 줄 4칸 들여쓰기 (if 문과 같은 규칙)", T.cyan, 15);
    footer(s, RW);
  }
  {
    const s = add();
    header(s, S3, "파일 작업에서 자주 만나는 오류");
    const rows = [["오류", "언제?", "해결"], ["FileNotFoundError", "없는 파일을 'r' 로 열 때 (이름 오타 · 위치 다름)", "파일 이름 · 확장자 · 폴더 확인"], ["TypeError: write() argument must be str", "f.write(100) 처럼 숫자를 쓸 때", "f.write(str(100)) 또는 f-string"],
      ["UnicodeDecodeError", "한글 파일을 다른 인코딩으로 읽을 때 (주로 Windows)", "open(…, encoding='utf-8')"], ["ValueError: I/O operation on closed file", "close( ) 한 뒤에 또 읽기 · 쓰기", "다시 open( ) 하거나 with 블록 안에서 작업"]];
    table(s, MX, 1.65, rows, [3.9, 4.6, CW - 8.5], { hl: { 0: T.pink, 2: T.green }, rowH: 0.78, fs: 13, hfs: 14, codeCols: [0], left: [1, 2] });
    tip(s, MX, 5.8, CW, 0.9, "Colab 주의", "Colab 의 파일은 런타임이 끊기면 사라져요! 중요한 파일은 다운로드하거나 Google Drive 에 저장하세요.", T.yellow, 15);
    footer(s, RW + ", Python — Built-in Exceptions");
  }
  {
    const s = add();
    header(s, S3, "3-4 파일 내용을 단어로 나누어 읽기 — read( ) + split( )");
    const lw = 7.0;
    const b = codeOut(s, MX, 1.65, lw, ["with open('sale.txt', 'w', encoding='utf-8') as f:", "    f.write('Python is easy and fun\\n')", "    f.write('Data analysis with Python\\n')", "with open('sale.txt', encoding='utf-8') as f:", "    data = f.read()", "words = data.split()", "print(words)", "print('단어 수 :', len(words))"],
      "['Python', 'is', 'easy', 'and', 'fun', 'Data',\n 'analysis', 'with', 'Python']\n단어 수 : 9", { fs: 12, lh: 0.27 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const st = [["read( )", "파일 전체 → 문자열 하나", T.cyan], ["split( )", "공백 · 줄바꿈 기준으로 잘라 → 리스트", T.yellow], ["len( )", "리스트 칸 수 = 단어 수", T.green]];
    st.forEach(([k, d, c], i) => {
      const y = 1.65 + i * 1.2;
      box(s, rx, y, rw, 0.95, k, d, c, { code: false, tfs: 17, bfs: 13 });
      if (i < 2) arrowD(s, rx + rw / 2 - 0.16, y + 0.97, 0.2, c);
    });
    tip(s, rx, 5.35, rw, 0.8, "복습", "split( ) 은 2.4 문자열 메서드, len( ) 은 2.4 함수!", T.cyan, 13);
    tip(s, MX, 6.35, CW, 0.5, "PBL 예고", "04. PBL 3번 '텍스트 파일 단어 수 세기' 가 바로 이 방법이에요!", T.green, 15);
    footer(s, SRC + " 3-4, Python Library — str.split");
  }
  {
    const s = add();
    header(s, S3, "3-5 종합 예제 — 환전 결과를 파일에 저장하기");
    const lw = 7.6;
    const b = codeOut(s, MX, 1.65, lw, ["rate = 1400                           # 1 USD = 1400원", "usd = float(input('환전할 달러 금액 : '))", "krw = usd * rate", "result = f'{usd:,.2f}달러 = {krw:,.0f}원'", "f = open('test5.txt', 'w', encoding='utf-8')", "f.write(result + '\\n')", "f.close()", "print(result)"],
      [["환전할 달러 금액 : ", "100"], "100.00달러 = 140,000원"], { fs: 12, lh: 0.29 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    [["1", "입력 — float(input( )) 로 달러 받기", T.cyan], ["2", "계산 — 원화 = 달러 × 1400", T.accent2], ["3", "저장 — test5.txt 에 write( )", T.green], ["4", "출력 — print( ) 로 화면에도", T.yellow]].forEach(([n, t, c], i) => {
      const y = 1.65 + i * 0.6;
      numBadge(s, n, rx, y + 0.08, 0.38, c);
      txt(s, t, { x: rx + 0.55, y, w: rw - 0.55, h: 0.54, fontSize: 14, valign: "middle" });
    });
    card(s, rx, 4.2, rw, 1.0, { fill: T.card, line: T.green, lw: 1.5 });
    txt(s, [{ text: "test5.txt 내용", options: { fontFace: F.b, color: T.green, breakLine: true } }, { text: "100.00달러 = 140,000원", options: { fontFace: F.code, fontSize: 13, color: T.yellow } }], { x: rx + 0.25, y: 4.2, w: rw - 0.5, h: 1.0, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    card(s, rx, 5.35, rw, 0.85, { fill: T.card2 });
    txt(s, [{ text: "총출동!  ", options: { fontFace: F.b, color: T.yellow } }, { text: "input · float · f-string · open · write · close", options: { fontSize: 13 } }], { x: rx + 0.25, y: 5.35, w: rw - 0.5, h: 0.85, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.35, CW, 0.5, "바꿔 보기", "'w' 를 'a' 로 바꾸면 환전할 때마다 기록이 쌓이는 '환전 장부' 가 돼요!", T.cyan, 15);
    footer(s, SRC + " 3-5");
    s.addNotes("원문은 환율 1 USD = 1400원으로 계산합니다. 출력 서식(:,.2f / :,.0f)은 슬라이드에서 보기 좋게 정리한 예시입니다.");
  }
  await D.summary(S3, "03. 파일 입출력 핵심 정리", [
    ["3단계", "open( ) 열기 → write( ) / read( ) 작업 → close( ) 닫기 (with 문이면 자동 닫기)"],
    ["모드", "r 읽기(없으면 오류) · w 쓰기(덮어쓰기 ⚠) · a 추가(뒤에 이어 쓰기)"],
    ["쓰기 · 읽기", "write(문자열) + \\n 줄바꿈,  read( ) 전체 · readline( ) 한 줄 · readlines( ) 리스트"],
    ["활용", "read( ).split( ) → 단어 리스트, len( ) 단어 수,  encoding='utf-8' 로 한글 안전"],
  ], "03장 정리와 실습 체크리스트");

  // ======================= 마무리 =======================
  sec("마무리");
  {
    const s = add();
    header(s, "03장 마무리", "오늘 배운 것 한 장 요약 — 입력 → 처리 → 출력 → 저장");
    const q = [["01", "입력문", "input('프롬프트') → 항상 문자열!  숫자는 int( ) · float( ),  글자로는 str( )", T.cyan], ["02", "출력문", "print(a, b) · sep= · end=,  f'{값:,}' f'{값:.2f}' f'{값:.1%}',  \\n \\t", T.yellow], ["03", "파일 입출력", "open(파일, 'r' / 'w' / 'a') → read( ) · write( ) → close( )  (with 로 자동 닫기)", T.green]];
    q.forEach(([n, h, d, c], i) => {
      const y = 1.7 + i * 1.25;
      card(s, MX, y, CW, 1.05, { fill: T.card, line: c, lw: 1.5 });
      txt(s, n, { x: MX + 0.25, y, w: 0.9, h: 1.05, fontFace: F.xb, fontSize: 24, color: c, valign: "middle" });
      txt(s, h, { x: MX + 1.2, y, w: 2.3, h: 1.05, fontFace: F.b, fontSize: 19, valign: "middle" });
      txt(s, d, { x: MX + 3.5, y, w: CW - 3.7, h: 1.05, fontSize: 15, color: T.text, valign: "middle" });
    });
    tip(s, MX, 5.6, CW, 0.65, "한 줄 요약", "묻고(input) → 바꾸고(int · float) → 계산하고 → 보여 주고(print · f-string) → 남긴다(open · write)", T.yellow, 15);
    tip(s, MX, 6.35, CW, 0.5, "다음", "04. PBL 연습문제 (별도 파일) — 계산기 · 파일 복사 · 단어 수 세기", T.cyan, 15);
    footer(s);
  }
  {
    const s = add();
    header(s, "03장 마무리", "실습 체크리스트 — Chap03 실습 노트북에서 해 보기");
    const tasks = [["input + type", "숫자를 입력하고 type( ) 으로 str 확인"], ["int · float 변환", "원의 둘레 · 키오스크 결제 금액 만들기"], ["sep · end", "날짜 2025-03-01, 한 줄 출력 실험"], ["f-string 서식", ":,  :.2f  :.1%  로 매출 보고 한 줄"], ["파일 w · a · r", "memo.txt 덮어쓰기 vs 이어 쓰기 확인"], ["종합", "환전 결과 test5.txt 저장 · 단어 수 세기"]];
    const cw = (CW - 0.3) / 2, bx = await icon(fa.FaRegSquare, "#FACC15");
    tasks.forEach(([h, d], i) => {
      const x = MX + Math.floor(i / 3) * (cw + 0.3), y = 1.7 + (i % 3) * 1.4;
      card(s, x, y, cw, 1.2, { fill: T.card });
      s.addImage({ data: bx, x: x + 0.3, y: y + 0.38, w: 0.42, h: 0.42 });
      txt(s, (i + 1) + ". " + h, { x: x + 0.95, y: y + 0.14, w: cw - 1.1, h: 0.45, fontFace: F.b, fontSize: 17 });
      txt(s, d, { x: x + 0.95, y: y + 0.6, w: cw - 1.1, h: 0.5, fontSize: 14, color: T.text });
    });
    tip(s, MX, 6.0, CW, 0.7, "input 실습 팁", "input( ) 셀을 실행하면 입력 칸이 뜰 때까지 기다리세요. 값을 넣고 Enter 를 눌러야 다음 셀로 넘어가요!", T.green, 15);
    footer(s);
  }
  await D.refs("03장 마무리", [
    "김진성. 「비즈니스 데이터 분석 with Python」 03장 입력과 출력 (01. 입력문 · 02. 출력문 · 03. 파일 입출력 · 04. PBL). WikiDocs. https://wikidocs.net/229300",
    "김진성. Chap03 입력과 출력 실습 노트북 (.ipynb)",
    "Python Software Foundation. The Python Tutorial — Input and Output (Fancier Output Formatting, Reading and Writing Files). https://docs.python.org/3/tutorial/inputoutput.html",
    "Python Software Foundation. Built-in Functions — input( ), print( ), open( ), int( ), float( ), str( ). https://docs.python.org/3/library/functions.html",
    "Python Software Foundation. Format Specification Mini-Language. https://docs.python.org/3/library/string.html#formatspec",
    "Python Software Foundation. printf-style String Formatting. https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting",
    "Python Software Foundation. Lexical analysis — String and Bytes literals (escape sequences). https://docs.python.org/3/reference/lexical_analysis.html",
    "Python Software Foundation. Built-in Exceptions. https://docs.python.org/3/library/exceptions.html",
  ]);
  await D.closing("03장. 입력과 출력");
};

function explain(s, x, y, w, items) {
  items.forEach(([n, t], i) => {
    const iy = y + i * 0.5;
    numBadge(s, n, x + 0.05, iy + 0.06, 0.34);
    txt(s, t, { x: x + 0.55, y: iy, w: w - 0.6, h: 0.46, fontSize: 14, valign: "middle" });
  });
}
