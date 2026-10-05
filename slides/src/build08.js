// 03장 · 04. PBL 연습문제 — 학생용(문제) / 정답용
// usage: node build08.js out.pptx [answer]
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, outputBox } = require("./lib");
const { makeDeck } = require("./deck");
const { codeOut, consoleOut, table, pill, arrowR, arrowD, box } = require("./lib3");
const P = require("./pbl3_data");

const ANS = process.argv[3] === "answer";
const SRC = "wikidocs 「비즈니스 데이터 분석 with Python」(김진성) 03장 04. PBL · Chap03 PBL 연습문제 노트북";
const SRCB = "03장 강의 슬라이드 내용 기반 보충 문제 (원문에 없음)";
const D = makeDeck("비즈니스 데이터 분석 with Python - 03장 · 04. PBL 연습문제" + (ANS ? " (정답 · 해설)" : ""));
const { add, sec } = D;
const WIDE = ["2-1", "2-3", "B5"];
const warn = (m) => console.log("WARN", m);
const lines = (o) => (Array.isArray(o) ? o.length : o.split("\n").length);
const COLOR = { "1. 덧셈 · 곱셈 · 나눗셈": T.cyan, "2. 파일 읽고 새로 저장": T.green, "3. 단어 수 세기": T.yellow, "보충 문제": T.pink };

function result(s, x, y, w, o, label) {
  if (Array.isArray(o)) return consoleOut(s, x, y, w, o, { ofs: 12 });
  const h = 0.55 + lines(o) * 0.26;
  outputBox(s, x, y, w, h, o, { fs: o.split("\n").some((l) => l.length > 34) ? 12 : 13 });
  if (label) { s.addShape("rect", { x: x + 0.15, y: y + 0.08, w: 1.4, h: 0.3, fill: { color: T.bg }, line: { type: "none" } }); txt(s, label, { x: x + 0.2, y: y + 0.08, w: 2, h: 0.3, fontFace: F.sb, fontSize: 12, color: T.yellow }); }
  return y + h;
}
function explainCard(s, x, y, w, h, p, color) {
  card(s, x, y, w, h, { fill: T.card, line: color, lw: 1 });
  const runs = [{ text: "해설", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: p.x, options: { fontSize: h < 1.5 ? 12 : 13, breakLine: !!p.alt } }];
  if (p.alt) { runs.push({ text: "다른 정답  ", options: { fontFace: F.b, color: T.green, fontSize: 12 } }); runs.push({ text: p.alt.replace(/\\n/g, " ⏎ "), options: { fontFace: F.code, fontSize: 11, color: T.codeText } }); }
  txt(s, runs, { x: x + 0.25, y, w: w - 0.5, h, fontSize: 15, valign: "middle", paraSpaceAfter: 5 });
}

async function problemSlide(p) {
  const color = COLOR[p.p];
  const s = add();
  const sub = p.p === "보충 문제" ? "보충 문제 (원문에 없음)" : "PBL " + p.p;
  header(s, "PBL 연습문제  ·  " + sub + (ANS ? "  ·  정답 · 해설" : ""), `${p.n.startsWith("B") ? p.n : "Q" + p.n}.  ${p.t}`);
  const tw = Math.min(3.6, 0.6 + p.tag.length * 0.13);
  pill(s, p.tag, W - MX - tw, 0.28, tw, color);
  const wide = ANS && WIDE.includes(p.n);
  const LW = wide ? CW : 6.15, rx = MX + 6.15 + 0.35, RW = CW - 6.15 - 0.35;
  let y = 1.6;
  const qh = wide ? 0.7 : p.q.length > 46 ? 1.15 : 0.85;
  card(s, MX, y, LW, qh, { fill: T.card, line: color, lw: 1.5 });
  s.addShape("roundRect", { x: MX + 0.18, y: y + qh / 2 - 0.22, w: 0.75, h: 0.44, rectRadius: 0.22, fill: { color }, line: { type: "none" } });
  txt(s, p.n, { x: MX + 0.18, y: y + qh / 2 - 0.22, w: 0.75, h: 0.44, fontFace: F.b, fontSize: 14, color: T.bg, align: "center", valign: "middle" });
  txt(s, p.q, { x: MX + 1.1, y, w: LW - 1.3, h: qh, fontSize: 15, valign: "middle" });
  y += qh + 0.2;
  if (wide) {
    // answer : full-width code, then result + 해설
    y -= 0.05;
    y += codeBlock(s, MX, y, CW, p.a, { fs: 13, lh: 0.29, label: "정답 예시" }).h + 0.15;
    const hw = (CW - 0.35) / 2;
    const rb = result(s, MX, y, hw, p.o);
    explainCard(s, MX + hw + 0.35, y, hw, Math.max(rb - y, 6.8 - y), p, color);
    if (Math.max(rb, y + 0.9) > 6.85) warn(`wide overflow ${p.n} ${rb.toFixed(2)}`);
    footer(s, p.n.startsWith("B") ? SRCB : SRC);
    return;
  }
  if (p.g) {
    txt(s, "주어진 코드", { x: MX, y, w: LW, h: 0.35, fontFace: F.b, fontSize: 14, color: T.cyan });
    y += 0.38;
    y += codeBlock(s, MX, y, LW, p.g, { fs: 12, lh: 0.3, label: "Chap03 PBL 노트북" }).h + 0.15;
  }
  if (ANS && p.split) {
    explainCard(s, MX, y, LW, 6.8 - y, p, color);
    y = 6.8;
  } else if (p.e) {
    txt(s, (p.eLabel || "목표 출력") + (Array.isArray(p.e) ? "  (밑줄 = 키보드로 입력한 값)" : ""), { x: MX, y, w: LW, h: 0.35, fontFace: F.b, fontSize: 14, color: T.yellow });
    y += 0.38;
    y = result(s, MX, y, LW, p.e, p.eLabel);
  }
  if (y > 6.85) warn(`left overflow ${p.n} ${y.toFixed(2)}`);
  if (!ANS) {
    card(s, rx, 1.6, RW, 1.35, { fill: T.card2, line: T.yellow, lw: 1.2 });
    txt(s, [{ text: "힌트", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: p.h, options: { fontSize: 14 } }], { x: rx + 0.25, y: 1.6, w: RW - 0.5, h: 1.35, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    s.addShape("roundRect", { x: rx, y: 3.15, w: RW, h: 3.6, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.accent2, width: 1.2, dashType: "dash" } });
    txt(s, "✍  내 답안", { x: rx + 0.25, y: 3.25, w: RW - 0.5, h: 0.4, fontFace: F.b, fontSize: 15, color: T.accent2 });
    for (let i = 0; i < 4; i++) s.addShape("line", { x: rx + 0.3, y: 4.15 + i * 0.52, w: RW - 0.6, h: 0, line: { color: "1E2A5A", width: 1 } });
    txt(s, "노트북 빈 셀에 직접 작성 → 실행 → 목표 출력과 비교!", { x: rx + 0.25, y: 6.25, w: RW - 0.5, h: 0.4, fontSize: 12, color: T.muted });
  } else {
    let ry = 1.6;
    txt(s, "정답 코드", { x: rx, y: ry, w: RW, h: 0.35, fontFace: F.b, fontSize: 14, color: T.green });
    ry += 0.38;
    const fs = p.a.some((l) => l.length > 38) ? 11 : 12;
    ry += codeBlock(s, rx, ry, RW, p.a, { fs, lh: p.split ? 0.28 : 0.3, label: "정답 예시" }).h + 0.12;
    ry = result(s, rx, ry, RW, p.o) + 0.15;
    if (p.split) { if (ry > 6.9) warn(`split overflow ${p.n}`); footer(s, p.n.startsWith("B") ? SRCB : SRC); return; }
    const xh = Math.max(1.0, 6.8 - ry);
    if (ry + 1.0 > 6.85) warn(`right overflow ${p.n} ${ry.toFixed(2)}`);
    explainCard(s, rx, ry, RW, xh, p, color);
  }
  footer(s, p.n.startsWith("B") ? SRCB : SRC);
}

(async () => {
  sec("표지");
  await D.titleSlide("03장. 입력과 출력", "04. PBL 연습문제" + (ANS ? "  —  정답 · 해설" : "  —  원문 3문제(6문항) + 보충 7문제"), SRC, ANS ? fa.FaCheckDouble : fa.FaPencilAlt);
  {
    const s = add();
    header(s, "04. PBL 연습문제", ANS ? "정답 · 해설 활용법" : "연습문제 활용법 — 이렇게 풀어 보세요");
    D.stepFlow(s, 1.7, ANS ? [["먼저 풀기", "학생용 파일로 직접 풀어 본 뒤 정답을 확인해요."], ["비교하기", "내 코드와 정답 코드 비교 — '다른 정답' 도 함께 적어 두었어요."], ["해설 읽기", "왜 그렇게 써야 하는지, 자주 하는 실수까지 확인!"]]
      : [["문제 읽기", "목표 출력과 '키보드로 입력할 값' 을 먼저 확인해요."], ["노트북에서 작성", "Chap03 PBL 노트북의 빈 셀에 코드를 입력하고 실행해요."], ["결과 비교", "목표 출력과 같으면 성공! 다르면 힌트를 다시 읽어요."]], 1.6);
    const parts = [["1", "덧셈 · 곱셈 · 나눗셈", "input · int · print", fa.FaCalculator, T.cyan], ["2", "파일 읽고 새로 저장", "open · write · read (4문항)", fa.FaCopy, T.green], ["3", "단어 수 세기", "read · split · len", fa.FaSortNumericUp, T.yellow], ["B", "보충 문제 7개", "강의 내용 복습 (원문에 없음)", fa.FaPlusCircle, T.pink]];
    const cw = (CW - 0.3 * 3) / 4;
    for (let i = 0; i < 4; i++) {
      const [n, t, d, Ic, c] = parts[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 3.65, cw, 2.2, { fill: T.card, line: c, lw: 1.5 });
      await iconCircle(s, Ic, x + cw / 2 - 0.4, 3.85, 0.8, c, "#FFFFFF", 55);
      txt(s, (n === "B" ? "" : n + ". ") + t, { x, y: 4.75, w: cw, h: 0.45, fontFace: F.b, fontSize: 16, align: "center" });
      txt(s, d, { x: x + 0.1, y: 5.2, w: cw - 0.2, h: 0.45, fontSize: 12, color: T.text, align: "center" });
    }
    tip(s, MX, 6.15, CW, 0.6, ANS ? "기억하기" : "준비물", ANS ? "모든 정답은 Python 3 에서 실제로 실행해 확인했어요 (입력값 50 · 10 등 예시 기준)." : "2번 → 3번은 이어지는 문제예요! 2-1 에서 만든 exam.txt 를 3번에서도 써요.", ANS ? T.green : T.yellow, 15);
    footer(s, SRC);
  }
  sec("원문 PBL 문제");
  await D.divider("PBL", "원문 PBL 문제", "Chap03 PBL 연습문제 노트북 — 3문제 6문항", ["1. 덧셈 · 곱셈 · 나눗셈 구하기", "2. 텍스트 파일에서 데이터를 읽고 새로 저장하기 (2-1 ~ 2-4)", "3. 텍스트 파일을 읽은 다음 단어 수 표시하기"], fa.FaClipboardList);
  {
    const s = add();
    header(s, "PBL 연습문제  ·  준비", "풀기 전 1분 복습 — 03장 치트 시트");
    const rows = [["분류", "코드", "하는 일"], ["숫자 입력", "a = int(input('숫자 = '))", "입력 → 정수로 변환"], ["출력", "print('결과는', a + b)   f'{값:,}'", "콤마는 공백 1칸 · f-string 서식"], ["몫 · 나눗셈", "a / b → 5.0      a // b → 5", "/ 는 항상 실수,  // 는 몫(정수)"],
      ["파일 쓰기", "f = open('x.txt', 'w', encoding='utf-8')  f.write('…\\n')  f.close()", "w 는 새로 쓰기 (덮어쓰기)"], ["파일 읽기", "f = open('x.txt', 'r', encoding='utf-8')  data = f.read()", "전체를 문자열 하나로"], ["단어 수", "len(data.split())", "공백 · 줄바꿈 기준으로 잘라 세기"]];
    table(s, MX, 1.65, rows, [1.9, 7.0, CW - 8.9], { codeCols: [1], hl: { 0: T.accent2, 1: T.yellow }, rowH: 0.6, fs: 13, left: [1] });
    tip(s, MX, 6.15, CW, 0.6, "준비 완료?", "표를 보지 않고 풀 수 있으면 최고! 막히면 03장 강의 슬라이드로 돌아가 보세요.", T.cyan, 15);
    footer(s, "03장 강의 슬라이드 요약");
  }
  await problemSlide(P[0]);
  {
    const s = add();
    header(s, "PBL 연습문제  ·  PBL 2. 파일 읽고 새로 저장", "2번 문제 한눈에 보기 — exam.txt 를 new.txt 로 복사");
    const st = [["2-1", "exam.txt 만들기", "open(…, 'w')\nwrite( ) × 4줄", T.cyan], ["2-2", "exam.txt 읽기", "open(…, 'r')\nread( ) → print", T.accent2], ["2-3", "new.txt 에 저장", "read( ) 한 data 를\nwrite( )", T.green], ["2-4", "new.txt 읽기", "read( ) → print\n같으면 성공!", T.yellow]];
    const bw = 2.6, gap = (CW - 4 * bw) / 3;
    st.forEach(([n, h, d, c], i) => {
      const x = MX + i * (bw + gap);
      card(s, x, 1.75, bw, 2.4, { fill: T.card, line: c, lw: 1.5 });
      pill(s, n, x + bw / 2 - 0.5, 1.9, 1.0, c, 0.42, 15);
      txt(s, h, { x, y: 2.45, w: bw, h: 0.45, fontFace: F.b, fontSize: 17, align: "center" });
      txt(s, d, { x: x + 0.15, y: 2.95, w: bw - 0.3, h: 0.95, fontFace: F.code, fontSize: 13, color: T.codeText, align: "center", valign: "middle" });
      if (i < 3) arrowR(s, x + bw + 0.08, 2.8, gap - 0.16);
    });
    // file icons pipeline
    const y = 4.45;
    box(s, MX + 0.4, y, 2.6, 1.1, "📄 exam.txt", "원본 (4줄)", T.cyan);
    arrowR(s, MX + 3.15, y + 0.39, 0.7);
    box(s, MX + 4.0, y, 3.4, 1.1, "data (문자열 변수)", "read( ) 로 읽어 온 내용", T.accent2);
    arrowR(s, MX + 7.55, y + 0.39, 0.7);
    box(s, MX + 8.4, y, 2.6, 1.1, "📄 new.txt", "write( ) 로 저장한 복사본", T.green);
    tip(s, MX, 5.85, CW, 0.85, "핵심", "파일 복사 = '읽어서(r) 변수에 담고 → 다른 파일에 그대로 쓰기(w)'.  2-1 을 먼저 실행해야 2-2 ~ 3번이 동작해요!", T.yellow, 15);
    footer(s, SRC);
  }
  for (const p of P.filter((q) => q.p === "2. 파일 읽고 새로 저장")) await problemSlide(p);
  await problemSlide(P.find((q) => q.n === "3"));
  sec("보충 문제");
  await D.divider("B", "보충 문제", "03장 강의 내용 복습 — 원문에 없는 추가 연습 7문제", ["B1 입력 + f-string · B2 sep · B3 end", "B4 f-string 서식 · B5 이스케이프 문자", "B6 'a' 모드 판매 장부 · B7 readlines 줄 수"], fa.FaPlusCircle);
  for (const p of P.filter((q) => q.p === "보충 문제")) await problemSlide(p);
  sec("마무리");
  if (ANS) {
    {
      const s = add();
      header(s, "04. PBL 연습문제 마무리", "자주 틀리는 포인트 TOP 6");
      const items = [["input 은 문자열", "숫자 계산 전에 int( ) · float( ) 로 변환!"], ["/ 와 //", "50 / 10 = 5.0,  50 // 10 = 5"], ["\\n 빠뜨리기", "write( ) 는 자동 줄바꿈이 없어요 — 줄 끝에 \\n"], ["close( ) 잊기", "닫지 않으면 내용이 저장되지 않을 수 있어요 (with 추천)"], ["'w' 의 덮어쓰기", "기존 내용이 사라져요 — 이어 쓰기는 'a'"], ["실행 순서", "exam.txt 를 만드는 2-1 을 먼저 실행해야 2-2 · 3번 OK"]];
      const cw = (CW - 0.3) / 2;
      items.forEach(([h, d], i) => {
        const x = MX + (i % 2) * (cw + 0.3), y = 1.65 + Math.floor(i / 2) * 1.45;
        card(s, x, y, cw, 1.25, { fill: T.card });
        numBadge(s, i + 1, x + 0.25, y + 0.2, 0.4);
        txt(s, h, { x: x + 0.85, y: y + 0.12, w: cw - 1.0, h: 0.5, fontFace: F.b, fontSize: 17, color: T.yellow, valign: "middle" });
        txt(s, d, { x: x + 0.85, y: y + 0.62, w: cw - 1.0, h: 0.5, fontSize: 14, color: T.text, valign: "middle" });
      });
      tip(s, MX, 6.15, CW, 0.6, "다시 풀기", "틀린 문제는 번호를 적어 두고, 하루 뒤에 학생용 파일로 다시 풀어 보세요!", T.cyan, 15);
      footer(s, SRC);
    }
    {
      const s = add();
      header(s, "04. PBL 연습문제 마무리", "원문 확인 사항 — 실행 결과로 바로잡은 부분");
      const rows = [["위치", "원문", "실제 · 수정"], ["1번 출력 화면", "'나눗셈 결과는 5'", "a / b 는 5.0 — 5 로 보이려면 // 또는 int( )"], ["2-1 저장 내용", "'조상의 ○난 얼을' — 첫 글자 오타", "'빛난' 의 오타로 보여 슬라이드는 '빛난' 으로 표기 (단어 수 24 는 동일)"], ["2-3 노트북 주석", "'새로운 net.txt 파일로'", "문제와 같이 new.txt 가 맞음"], ["3번 단어 수", "24 개", "split( ) 결과 24 개로 일치 ✓"]];
      table(s, MX, 1.65, rows, [2.4, 3.6, CW - 6.0], { hl: { 0: T.accent2, 2: T.green }, rowH: 0.66, fs: 14, left: [1, 2] });
      tip(s, MX, 5.6, CW, 0.6, "보충 문제", "B1 ~ B7 은 원문에 없는 문제로, 03장 강의 내용을 복습하도록 추가했어요.", T.pink, 15);
      tip(s, MX, 6.3, CW, 0.5, "확인 방법", "모든 정답은 Python 3 에서 입력값을 넣어 직접 실행해 확인했어요.", T.yellow, 15);
      footer(s, SRC);
    }
  } else {
    const s = add();
    header(s, "04. PBL 연습문제 마무리", "다 풀었나요? — 셀프 체크");
    const tasks = [["1. 계산기", "int(input( )) · 덧셈 · 곱셈 · 나눗셈 출력"], ["2. 파일 복사", "exam.txt 만들기 → 읽기 → new.txt 저장 → 확인"], ["3. 단어 수", "read( ) → split( ) → len( ) = 24"], ["보충 B1 ~ B4", "입력 · sep · end · f-string 서식"], ["보충 B5 ~ B7", "이스케이프 · 'a' 모드 · readlines"], ["정답 확인", "정답 · 해설 파일로 채점하고 다시 풀기"]];
    const cw = (CW - 0.3) / 2, bx = await icon(fa.FaRegSquare, "#FACC15");
    tasks.forEach(([h, d], i) => {
      const x = MX + Math.floor(i / 3) * (cw + 0.3), y = 1.7 + (i % 3) * 1.4;
      card(s, x, y, cw, 1.2, { fill: T.card });
      s.addImage({ data: bx, x: x + 0.3, y: y + 0.38, w: 0.42, h: 0.42 });
      txt(s, h, { x: x + 0.95, y: y + 0.14, w: cw - 1.1, h: 0.45, fontFace: F.b, fontSize: 17 });
      txt(s, d, { x: x + 0.95, y: y + 0.6, w: cw - 1.1, h: 0.5, fontSize: 14, color: T.text });
    });
    tip(s, MX, 6.0, CW, 0.7, "정답 파일", "BizDataAnalysis_CH03_04_PBL연습문제_정답.pptx — 풀고 나서 열어 보세요!", T.green, 15);
    footer(s, SRC);
  }
  await D.closing("03장 · 04. PBL 연습문제");
  await D.pres.writeFile({ fileName: process.argv[2] || "PBL3.pptx" });
})();
