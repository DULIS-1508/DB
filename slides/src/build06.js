// 02장 · 04. PBL 연습문제 — 학생용(문제) / 정답용 두 가지로 빌드
// usage: node build06.js out.pptx [answer]
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, outputBox } = require("./lib");
const { makeDeck } = require("./deck");
const P = require("./pbl_data");

const ANS = process.argv[3] === "answer";
const SRC = "wikidocs 「비즈니스 데이터 분석 with Python」(김진성) 04. PBL 연습문제 · Chap02 PBL 연습문제 노트북";
const D = makeDeck("비즈니스 데이터 분석 with Python - 02장 · 04. PBL 연습문제" + (ANS ? " (정답 · 해설)" : ""));
const { add, sec } = D;
const warn = (m) => console.log("WARN", m);

function codeOut(s, x, y, w, lines, out, opts = {}) {
  const cb = codeBlock(s, x, y, w, lines, Object.assign({ fs: 13, lh: 0.32 }, opts));
  let bottom = y + cb.h;
  if (out != null) {
    const oh = 0.55 + out.split("\n").length * 0.26;
    outputBox(s, x, bottom + 0.12, w, oh, out, { fs: opts.ofs || 13 });
    bottom += 0.12 + oh;
  }
  return bottom;
}
function table(s, x, y, rows, colW, opts = {}) {
  const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: i === 0 ? F.b : (opts.codeCols || []).includes(j) ? F.code : F.r, fontSize: i === 0 ? 15 : opts.fs || 14,
    color: i === 0 ? T.white : (opts.hl || {})[j] || T.text, fill: { color: i === 0 ? T.card2 : (i % 2 ? T.card : T.bg) }, align: (opts.left || []).includes(j) ? "left" : "center", valign: "middle", margin: [0.03, 0.1, 0.03, 0.1] } })));
  s.addTable(tbl, { x, y, w: colW.reduce((a, b) => a + b, 0), colW, rowH: opts.rowH || 0.5, border: { type: "solid", color: "1E2A5A", pt: 1 } });
}
function pill(s, text, x, y, w, color) {
  s.addShape("roundRect", { x, y, w, h: 0.36, rectRadius: 0.18, fill: { color, transparency: 80 }, line: { color, width: 1 } });
  txt(s, text, { x, y, w, h: 0.36, fontFace: F.sb, fontSize: 12, color, align: "center", valign: "middle" });
}

const PARTS = [
  ["1. 리스트", "리스트 (list)", "[ ] 번호 붙은 서랍장 — 18문제", fa.FaListOl, T.accent2],
  ["2. 튜플", "튜플 (tuple)", "( ) 봉인된 도시락 — 6문제", fa.FaLock, T.cyan],
  ["3. 딕셔너리", "딕셔너리 (dict)", "{ 키 : 값 } 사전 — 13문제", fa.FaBook, T.yellow],
  ["4. 집합", "집합 (set)", "{ } 중복 없는 출석부 — 8문제", fa.FaDotCircle, T.green],
  ["5. 변수", "변수 · 함수", "len( ) 과 def — 2문제", fa.FaCube, T.pink],
];
const CHEAT = {
  "1. 리스트": [["분류", "코드", "하는 일"], ["꺼내기", "arr[1]  arr[-1]", "1번 칸 · 마지막 칸"], ["자르기", "arr[2:5]  arr[:4]  arr[3:]", "2~4번 · 처음~3번 · 3번~끝"], ["간격", "arr[1:4:2]  arr[::3]", "2칸씩 · 3칸씩 건너뛰기"],
    ["추가", "append(x)  insert(i, x)  extend(목록)", "끝에 1개 · i번 자리 · 여러 개"], ["삭제", "pop()  pop(i)  remove(x)  del arr[i]  clear()", "끝 · i번 · 값 x · 번호(범위) · 전부"], ["정렬 · 세기", "sort()  sort(reverse=True)  index(x)  count(x)", "오름 · 내림 · 위치 · 개수"]],
  "2. 튜플": [["분류", "코드", "하는 일"], ["만들기", "t = (1, 2, 3)   t = 1, 2, 3", "괄호는 생략 가능, 쉼표가 핵심"], ["꺼내기", "t[2]   t[2:4]", "리스트와 같음 (결과는 튜플)"], ["메서드", "index(x)   count(x)", "딱 2개뿐!"], ["특징", "t[0] = 9  → TypeError", "순서 O · 변경 X · del t 는 가능"]],
  "3. 딕셔너리": [["분류", "코드", "하는 일"], ["만들기", "dic = {'name': 'son', 'age': 31}", "{ 키 : 값 }"], ["꺼내기", "dic['name']   dic.get('name')", "키로 찾기 (get 은 없으면 None)"], ["모아 보기", "keys()   values()   items()", "키 · 값 · (키, 값)"],
    ["추가 · 변경", "dic['salary'] = 90000", "있으면 변경, 없으면 추가"], ["삭제", "pop(키)  popitem()  del dic[키]  clear()", "키 · 마지막 쌍 · 키 · 전부"], ["초기화", "dict.fromkeys(dic, 0)", "같은 키, 값은 모두 0"]],
  "4. 집합": [["분류", "코드", "하는 일"], ["추가", "add(x)   update(목록)", "1개 · 여러 개"], ["삭제", "discard(x)   remove(x)   pop()", "안전 · 없으면 오류 · 아무거나"], ["새 집합", "a.union(b)  a | b", "합집합 (a 그대로)"],
    ["원본 변경", "a.update(b)  a.intersection_update(b)", "합집합 · 교집합을 a 에"], ["원본 변경", "a.symmetric_difference_update(b)", "공통만 빼고 a 에"]],
  "5. 변수": [["분류", "코드", "하는 일"], ["길이", "len(text)", "글자 수 (공백 포함)"], ["함수 만들기", "def pi():\n    return 3.14", "def 이름( ): + 4칸 들여쓰기 + return"], ["함수 부르기", "pi()", "이름 + 괄호 → 값이 돌아옴"]],
};

async function problemSlide(p, color) {
  const s = add();
  header(s, "PBL 연습문제  ·  " + p.p + (ANS ? "  ·  정답 · 해설" : ""), `Q${p.n}.  ${p.t}`);
  const tw = Math.min(3.6, 0.6 + p.tag.length * 0.13);
  pill(s, p.tag, W - MX - tw, 0.28, tw, color);
  const LW = 6.15, rx = MX + LW + 0.35, RW = CW - LW - 0.35;
  // ---- left : question ----
  let y = 1.6;
  const qh = p.q.length > 46 ? 1.15 : 0.85;
  card(s, MX, y, LW, qh, { fill: T.card, line: color, lw: 1.5 });
  numBadge(s, p.n, MX + 0.2, y + qh / 2 - 0.2, 0.4);
  txt(s, p.q, { x: MX + 0.75, y, w: LW - 0.95, h: qh, fontSize: 15, valign: "middle" });
  y += qh + 0.2;
  if (p.c) {
    const right = ANS ? p.k.replace(/\s/g, "").split(",") : [];
    const ch = p.c.length > 2 ? 0.45 : 0.55;
    p.c.forEach((c) => {
      const ok = right.some((r) => c.startsWith(r));
      card(s, MX, y, LW, ch, { fill: ok ? T.card2 : T.bg, line: ok ? T.green : "1E2A5A", lw: ok ? 2 : 1 });
      txt(s, (ok ? "✓  " : "") + c, { x: MX + 0.25, y, w: LW - 0.4, h: ch, fontSize: 15, color: ok ? T.green : T.text, valign: "middle", fontFace: ok ? F.sb : F.r });
      y += ch + 0.08;
    });
    y += 0.1;
  }
  if (p.g) {
    txt(s, "주어진 코드", { x: MX, y, w: LW, h: 0.35, fontFace: F.b, fontSize: 14, color: T.cyan });
    y += 0.38;
    y += codeBlock(s, MX, y, LW, p.g, { fs: p.gfs || 13, lh: 0.32, label: "Chap02 PBL 노트북" }).h + 0.15;
  }
  if (p.e) {
    txt(s, "목표 출력", { x: MX, y, w: LW, h: 0.35, fontFace: F.b, fontSize: 14, color: T.yellow });
    y += 0.38;
    const oh = 0.55 + p.e.split("\n").length * 0.26;
    outputBox(s, MX, y, LW, oh, p.e, { fs: 13 });
    y += oh;
  }
  if (y > 6.85) warn(`left overflow ${p.p} Q${p.n} ${y.toFixed(2)}`);
  // ---- right ----
  if (!ANS) {
    card(s, rx, 1.6, RW, 1.25, { fill: T.card2, line: T.yellow, lw: 1.2 });
    txt(s, [{ text: "힌트", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: p.h, options: { fontSize: 14 } }], { x: rx + 0.25, y: 1.6, w: RW - 0.5, h: 1.25, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    s.addShape("roundRect", { x: rx, y: 3.05, w: RW, h: 3.7, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.accent2, width: 1.2, dashType: "dash" } });
    txt(s, "✍  내 답안", { x: rx + 0.25, y: 3.15, w: RW - 0.5, h: 0.4, fontFace: F.b, fontSize: 15, color: T.accent2 });
    for (let i = 0; i < 4; i++) s.addShape("line", { x: rx + 0.3, y: 4.05 + i * 0.55, w: RW - 0.6, h: 0, line: { color: "1E2A5A", width: 1 } });
    txt(s, "노트북 빈 셀에 직접 작성 → 실행 → 결과 비교!", { x: rx + 0.25, y: 6.25, w: RW - 0.5, h: 0.4, fontSize: 12, color: T.muted });
  } else {
    let ry = 1.6;
    if (p.k) {
      card(s, rx, ry, RW, 0.7, { fill: T.card2, line: T.green, lw: 2 });
      txt(s, [{ text: "정답   ", options: { fontFace: F.b, color: T.green } }, { text: p.k, options: { fontFace: F.xb, color: T.white, fontSize: 20 } }], { x: rx + 0.3, y: ry, w: RW - 0.6, h: 0.7, fontSize: 17, valign: "middle" });
      ry += 0.85;
    }
    txt(s, p.k ? "확인 코드" : "정답 코드", { x: rx, y: ry, w: RW, h: 0.35, fontFace: F.b, fontSize: 14, color: T.green });
    ry += 0.38;
    const longOut = p.o.split("\n").some((l) => l.length > 40);
    ry = codeOut(s, rx, ry, RW, p.a, p.o, { fs: p.a.some((l) => l.length > 36) ? 12 : 13, lh: 0.3, ofs: longOut ? 11 : 13, label: "정답 예시" });
    ry += 0.18;
    const xh = Math.max(0.95, 6.8 - ry);
    if (6.8 - ry < 0.9) warn(`right tight ${p.p} Q${p.n} ${ry.toFixed(2)}`);
    card(s, rx, ry, RW, xh, { fill: T.card, line: color, lw: 1 });
    txt(s, [{ text: "해설", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: p.x, options: { fontSize: 14 } }], { x: rx + 0.25, y: ry, w: RW - 0.5, h: xh, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
  }
  footer(s, SRC);
}

(async () => {
  sec("표지");
  await D.titleSlide("02장. 변수와 데이터 유형", "04. PBL 연습문제" + (ANS ? "  —  정답 · 해설" : "  —  리스트 · 튜플 · 딕셔너리 · 집합 · 변수 47문제"), SRC, ANS ? fa.FaCheckDouble : fa.FaPencilAlt);
  {
    const s = add();
    header(s, "04. PBL 연습문제", ANS ? "정답 · 해설 활용법" : "연습문제 활용법 — 이렇게 풀어 보세요");
    D.stepFlow(s, 1.7, ANS ? [["먼저 풀기", "학생용 파일로 직접 풀어 본 뒤에 정답을 확인해요."], ["비교하기", "내 코드와 정답 코드를 비교 — 다른 방법도 정답일 수 있어요!"], ["해설 읽기", "왜 그 메서드인지, 비슷한 오답은 무엇인지 확인해요."]]
      : [["문제 읽기", "무엇을 출력해야 하는지 '목표 출력'을 먼저 봐요."], ["노트북에서 작성", "Chap02 PBL 노트북의 빈 셀에 코드를 입력하고 실행해요."], ["결과 비교", "목표 출력과 같으면 성공! 다르면 힌트를 다시 읽어요."]], 1.6);
    const parts = PARTS;
    const cw = (CW - 0.4 * 4) / 5;
    for (let i = 0; i < 5; i++) {
      const [k, n, d, Ic, c] = parts[i];
      const x = MX + i * (cw + 0.4);
      card(s, x, 3.65, cw, 2.2, { fill: T.card, line: c, lw: 1.5 });
      await iconCircle(s, Ic, x + cw / 2 - 0.4, 3.85, 0.8, c, "#FFFFFF", 55);
      txt(s, n, { x, y: 4.75, w: cw, h: 0.45, fontFace: F.b, fontSize: 17, align: "center" });
      txt(s, d, { x: x + 0.1, y: 5.2, w: cw - 0.2, h: 0.5, fontSize: 12, color: T.text, align: "center" });
    }
    tip(s, MX, 6.15, CW, 0.6, ANS ? "기억하기" : "규칙", ANS ? "정답은 하나가 아니에요. 같은 결과가 나오는 다른 방법도 함께 적어 두었어요." : "정답을 보기 전에 꼭 직접 실행해 보기! 오류 메시지도 훌륭한 힌트예요.", ANS ? T.green : T.yellow, 15);
    footer(s, SRC);
  }
  for (const [k, n, d, Ic, c] of PARTS) {
    sec(k);
    const qs = P.filter((p) => p.p === k);
    await D.divider(k.split(".")[0], n + " 연습문제", d, qs.slice(0, 3).map((p) => `Q${p.n}. ${p.t}`).concat(qs.length > 3 ? [`… Q${qs[qs.length - 1].n} 까지`] : []), Ic);
    {
      const s = add();
      header(s, "PBL 연습문제  ·  " + k, "풀기 전 1분 복습 — " + n + " 치트 시트");
      const rows = CHEAT[k];
      const rh = rows.length > 6 ? 0.62 : 0.72;
      table(s, MX, 1.65, rows, [2.0, 6.2, CW - 8.2], { codeCols: [1], hl: { 0: c, 1: T.yellow }, rowH: rh, fs: 14, left: [1] });
      tip(s, MX, 6.2, CW, 0.55, "준비 완료?", "표를 보지 않고 풀 수 있으면 최고! 막히면 다시 이 표로 돌아오세요.", c, 15);
      footer(s, "03. 데이터 구조 강의 슬라이드 요약");
    }
    for (const p of qs) await problemSlide(p, c);
  }
  sec("마무리");
  if (ANS) {
    {
      const s = add();
      header(s, "04. PBL 연습문제 마무리", "자주 틀리는 포인트 TOP 6");
      const items = [["끝 번호는 미포함", "arr[2:5] 는 2 · 3 · 4번!  del arr[1:6] 도 5번까지만"], ["append vs extend", "여러 개를 하나씩 붙이려면 extend (또는 +)"], ["reverse( ) ≠ 내림차순", "내림차순은 sort(reverse=True)"],
        ["pop 의 기준", "리스트 pop(번호) · 딕셔너리 pop(키) · 집합 pop( ) 아무거나"], ["remove vs discard", "'없어도 에러 없이' → 집합은 discard"], ["새로 vs 원본 변경", "union → 새 집합,  update · _update → 원본 변경"]];
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
      const rows = [["위치", "원문", "실제 · 수정"], ["리스트 Q2", "'출결 결과가 표시되도록'", "'출력 결과' 의 오타"], ["튜플 Q2", "목표 출력 '300, 400'", "실제 출력은 (300, 400) — 튜플 괄호 포함"], ["딕셔너리 Q5", "son 의 나이", "값이 문자열 '31' 로 저장되어 있음 (출력은 31)"],
        ["집합 Q5 · Q8", "두 문제의 코드 · 의도가 같음", "같은 정답 update( ) — 중복 문제"], ["집합 결과", "출력 순서", "집합은 순서가 없어 실행마다 순서가 다를 수 있음"]];
      table(s, MX, 1.65, rows, [2.4, 4.3, CW - 6.7], { hl: { 0: T.accent2, 2: T.green }, rowH: 0.66, fs: 14, left: [1, 2] });
      tip(s, MX, 6.15, CW, 0.6, "확인 방법", "모든 정답은 Python 3 에서 직접 실행해 결과를 확인했어요 (집합은 PYTHONHASHSEED=0 기준).", T.yellow, 15);
      footer(s, SRC);
    }
  } else {
    const s = add();
    header(s, "04. PBL 연습문제 마무리", "다 풀었나요? — 셀프 체크");
    const tasks = [["1. 리스트 18문제", "슬라이싱 · append · pop · sort · count"], ["2. 튜플 6문제", "index · count · 변경 불가"], ["3. 딕셔너리 13문제", "keys · pop · del · fromkeys · get"], ["4. 집합 8문제", "add · discard · union · _update"], ["5. 변수 2문제", "len( ) · def 함수"], ["정답 확인", "정답 · 해설 파일로 채점하고 틀린 문제 다시 풀기"]];
    const cw = (CW - 0.3) / 2, box = await icon(fa.FaRegSquare, "#FACC15");
    tasks.forEach(([h, d], i) => {
      const x = MX + Math.floor(i / 3) * (cw + 0.3), y = 1.7 + (i % 3) * 1.4;
      card(s, x, y, cw, 1.2, { fill: T.card });
      s.addImage({ data: box, x: x + 0.3, y: y + 0.38, w: 0.42, h: 0.42 });
      txt(s, h, { x: x + 0.95, y: y + 0.14, w: cw - 1.1, h: 0.45, fontFace: F.b, fontSize: 17 });
      txt(s, d, { x: x + 0.95, y: y + 0.6, w: cw - 1.1, h: 0.5, fontSize: 14, color: T.text });
    });
    tip(s, MX, 6.0, CW, 0.7, "정답 파일", "BizDataAnalysis_CH02_04_PBL연습문제_정답.pptx — 풀고 나서 열어 보세요!", T.green, 15);
    footer(s, SRC);
  }
  await D.closing("02장 · 04. PBL 연습문제");
  await D.pres.writeFile({ fileName: process.argv[2] || "PBL.pptx" });
})();
