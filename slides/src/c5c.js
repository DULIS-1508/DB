// 02장 · 03. 데이터 구조 — 3.5 집합 + 3.6 부울 + 마무리
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox } = require("./lib");

module.exports = async function ({ D, add, sec, H }) {
  const { codeOut, table, boxes, SRC, PYT } = H;
  const S35 = "SECTION 3.5  ·  집합 (set)", S36 = "SECTION 3.6  ·  부울 (bool)";
  const SEED = "※ 집합은 순서가 없어서 출력 순서가 실행할 때마다 다를 수 있어요.";

  // Venn diagram: highlight = 'A' | 'B' | 'AB' (intersection) | 'all' | 'Aonly' | 'sym'
  function venn(s, x, y, d, mode, c) {
    const off = d * 0.55;
    const fillA = ["all", "Aonly", "sym"].includes(mode), fillB = ["all", "sym"].includes(mode);
    s.addShape("ellipse", { x, y, w: d, h: d, fill: { color: fillA ? c : T.card, transparency: fillA ? 55 : 0 }, line: { color: T.accent2, width: 1.5 } });
    s.addShape("ellipse", { x: x + off, y, w: d, h: d, fill: { color: fillB ? c : T.card, transparency: fillB ? 55 : 30 }, line: { color: T.accent2, width: 1.5 } });
    // intersection lens approximated with a small ellipse
    const lensFill = mode === "all" || mode === "AB" ? c : T.card;
    const lensT = mode === "all" || mode === "AB" ? (mode === "AB" ? 35 : 55) : 0;
    s.addShape("ellipse", { x: x + off, y: y + d * 0.12, w: d - off, h: d * 0.76, fill: { color: lensFill, transparency: lensT }, line: { type: "none" } });
    txt(s, "A", { x: x + 0.05, y: y + d / 2 - 0.2, w: off - 0.05, h: 0.4, fontFace: F.b, fontSize: 14, color: T.white, align: "center" });
    txt(s, "B", { x: x + d, y: y + d / 2 - 0.2, w: off, h: 0.4, fontFace: F.b, fontSize: 14, color: T.white, align: "center" });
  }

  // ======================= 3.5 집합 =======================
  sec("3.5 집합");
  await D.divider("3.5", "집합 (set)", "{ } — 중복 없는 출석부", ["만들기 · 특징 (중복 ✗ · 순서 ✗)", "추가 · 삭제", "합집합 · 교집합 · 차집합 · 대칭차집합"], fa.FaDotCircle);
  {
    const s = add();
    header(s, S35, "집합 만들기 — 중복은 자동으로 사라져요");
    const lw = 6.6;
    codeOut(s, MX, 1.65, lw, ["dunk = {'강백호', '서태웅', '채치수'}", "print(dunk)", "print(len(dunk))", "print('강백호' in dunk, '정대만' in dunk)", "print({20, 20, 30})"], "{'서태웅', '강백호', '채치수'}\n3\nTrue False\n{20, 30}", { fs: 13, lh: 0.32 });
    txt(s, SEED, { x: MX, y: 5.88, w: lw, h: 0.35, fontSize: 12, color: T.muted });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    // bag diagram: duplicates dropped
    card(s, rx, 1.65, rw, 2.3, { fill: T.card, line: T.green, lw: 1.5 });
    txt(s, "출석부 비유", { x: rx + 0.25, y: 1.72, w: rw - 0.5, h: 0.4, fontFace: F.b, fontSize: 16, color: T.green });
    const inp = ["20", "20", "30"];
    inp.forEach((v, i) => {
      const bx = rx + 0.25 + i * 0.75;
      s.addShape("ellipse", { x: bx, y: 2.35, w: 0.65, h: 0.65, fill: { color: i === 1 ? T.pink : T.accent, transparency: i === 1 ? 40 : 30 }, line: { type: "none" } });
      txt(s, v, { x: bx, y: 2.35, w: 0.65, h: 0.65, fontFace: F.code, fontSize: 15, color: T.white, align: "center", valign: "middle" });
    });
    s.addShape("rightArrow", { x: rx + 2.6, y: 2.5, w: 0.55, h: 0.35, fill: { color: T.green }, line: { type: "none" } });
    ["20", "30"].forEach((v, i) => {
      const bx = rx + 3.3 + i * 0.75;
      s.addShape("ellipse", { x: bx, y: 2.35, w: 0.65, h: 0.65, fill: { color: T.green, transparency: 30 }, line: { type: "none" } });
      txt(s, v, { x: bx, y: 2.35, w: 0.65, h: 0.65, fontFace: F.code, fontSize: 15, color: T.white, align: "center", valign: "middle" });
    });
    txt(s, "같은 학생은 출석부에 한 번만! 이름이 적힌 '순서'는 의미 없어요.", { x: rx + 0.25, y: 3.15, w: rw - 0.5, h: 0.7, fontSize: 13, color: T.text });
    const feats = [["중복 불가", "같은 값은 하나만 남음"], ["순서 없음", "인덱스 · 슬라이싱 ✗"], ["추가 · 삭제 OK", "add · remove · discard"]];
    feats.forEach(([k, v], i) => {
      const y = 4.1 + i * 0.68;
      card(s, rx, y, rw, 0.58, { fill: T.card2 });
      txt(s, [{ text: k + "  ", options: { fontFace: F.b, color: T.green } }, { text: v, options: { fontSize: 13 } }], { x: rx + 0.25, y, w: rw - 0.4, h: 0.58, fontSize: 15, valign: "middle" });
    });
    tip(s, MX, 6.3, CW, 0.5, "빈 집합 주의", "{ } 는 빈 '딕셔너리'예요!  빈 집합은 set( ) 으로 만들어요.", T.pink, 15);
    footer(s, SRC + " 3-5, " + PYT + " — Sets");
  }
  {
    const s = add();
    header(s, S35, "순서가 없다 = 번호로 꺼낼 수 없다");
    const hw = (CW - 0.4) / 2;
    txt(s, "✗  인덱스로 꺼내기", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeOut(s, MX, 2.05, hw, ["dunk = {'강백호', '서태웅', '채치수'}", "print(dunk[0])"], "TypeError: 'set' object is not\nsubscriptable", { fs: 13, lh: 0.34 });
    const rx = MX + hw + 0.4;
    txt(s, "✓  필요하면 리스트로 바꿔서", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    codeOut(s, rx, 2.05, hw, ["names = sorted(dunk)   # 정렬된 리스트", "print(names[0])"], "강백호", { fs: 13, lh: 0.34 });
    card(s, MX, 4.8, CW, 1.4, { fill: T.card2 });
    txt(s, [{ text: "실무 예 : 중복 제거 — 집합의 가장 큰 쓸모!", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "visit = ['부산', '서울', '부산', '대구', '서울']     # 방문 기록 5건", options: { fontFace: F.code, fontSize: 13, color: T.codeText, breakLine: true } },
      { text: "print(set(visit), len(set(visit)))   →  {'부산', '대구', '서울'} 3", options: { fontFace: F.code, fontSize: 13, color: T.green, breakLine: true } }, { text: "→ 방문한 '서로 다른 도시'는 3곳!  (고객 수 · 상품 종류 세기에 딱)", options: { fontSize: 14 } }],
      { x: MX + 0.3, y: 4.8, w: CW - 0.6, h: 1.4, fontSize: 14, valign: "middle", paraSpaceAfter: 1 });
    tip(s, MX, 6.3, CW, 0.5, "subscriptable", "'[ ] 로 번호를 붙여 꺼낼 수 있는' 이라는 뜻 — 집합은 번호가 없어서 안 돼요.", T.cyan, 15);
    footer(s, SRC + " 3-5");
  }
  {
    const s = add();
    header(s, S35, "1) 추가 — add( ) 한 개 · update( ) 여러 개");
    const hw = (CW - 0.4) / 2;
    txt(s, "add(값) — 1개 추가", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.code, fontSize: 16, color: T.green });
    codeOut(s, MX, 2.05, hw, ["dunk = {'강백호', '서태웅', '채치수'}", "dunk.add('송태섭')", "print(dunk)"], "{'서태웅', '송태섭', '강백호', '채치수'}", { fs: 12, lh: 0.32, ofs: 12 });
    const rx = MX + hw + 0.4;
    txt(s, "update(여러 값) — 이미 있는 값은 무시", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.code, fontSize: 15, color: T.yellow });
    codeOut(s, rx, 2.05, hw, ["dunk = {'강백호', '서태웅', '채치수'}", "dunk.update(['정대만', '강백호'])", "print(dunk)"], "{'서태웅', '강백호', '정대만', '채치수'}", { fs: 12, lh: 0.32, ofs: 12 });
    card(s, MX, 4.85, CW, 1.2, { fill: T.card2 });
    txt(s, [{ text: "update 에는 리스트 · 튜플 · 집합 무엇이든!", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "'강백호' 는 이미 있으니 무시되고 '정대만' 만 들어왔어요 → 4명.  리스트의 append ↔ 집합의 add,  리스트의 extend ↔ 집합의 update 로 짝지어 기억하세요." }],
      { x: MX + 0.3, y: 4.85, w: CW - 0.6, h: 1.2, fontSize: 14, valign: "middle", paraSpaceAfter: 2 });
    txt(s, SEED, { x: MX, y: 6.2, w: CW, h: 0.35, fontSize: 12, color: T.muted });
    footer(s, SRC + " 3-5");
  }
  {
    const s = add();
    header(s, S35, "2) 삭제 — remove · discard · pop · clear");
    const rows = [["방법", "하는 일", "없는 값이면?", "예 (dunk = {'강백호', '서태웅', '채치수'})"], ["remove(값)", "값 삭제", "KeyError 오류!", "dunk.remove('서태웅') → {'강백호', '채치수'}"], ["discard(값)", "값 삭제", "조용히 넘어감 (안전)", "dunk.discard('윤대협') → 변화 없음"],
      ["pop( )", "아무거나 1개 꺼내기", "빈 집합이면 오류", "dunk.pop() → '서태웅' (무엇이 나올지 몰라요)"], ["clear( )", "전부 비우기", "—", "dunk.clear() → set()"]];
    table(s, MX, 1.65, rows, [2.1, 2.5, 2.6, CW - 7.2], { codeCols: [0, 3], hl: { 0: T.yellow, 2: T.pink }, rowH: 0.68, fs: 13, left: [3] });
    card(s, MX, 5.25, CW, 0.9, { fill: T.card2 });
    txt(s, [{ text: "remove vs discard  ", options: { fontFace: F.b, color: T.yellow } }, { text: "remove 는 '없으면 화내는' 직원, discard 는 '없으면 그냥 넘어가는' 직원 — 있는지 확실치 않으면 discard!" }], { x: MX + 0.3, y: 5.25, w: CW - 0.6, h: 0.9, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "set() 출력", "빈 집합은 { } 가 아니라 set() 으로 표시돼요 ({ } 는 빈 딕셔너리니까!)", T.cyan, 15);
    footer(s, SRC + " 3-5");
  }
  {
    const s = add();
    header(s, S35, "3) 집합 연산 — 벤 다이어그램으로 이해하기");
    txt(s, "A = {'파이썬', '엑셀', 'R'}   (김 대리가 아는 도구)        B = {'파이썬', 'SQL'}   (이 대리가 아는 도구)", { x: MX, y: 1.55, w: CW, h: 0.4, fontFace: F.code, fontSize: 13, color: T.cyan });
    const ops = [["합집합", "A | B", "A.union(B)", "{'파이썬', 'SQL', 'R', '엑셀'}", "둘 중 한 명이라도 아는 도구", "all", T.accent2], ["교집합", "A & B", "A.intersection(B)", "{'파이썬'}", "둘 다 아는 도구", "AB", T.green],
      ["차집합", "A - B", "A.difference(B)", "{'R', '엑셀'}", "김 대리만 아는 도구", "Aonly", T.yellow], ["대칭차집합", "A ^ B", "A.symmetric_difference(B)", "{'SQL', 'R', '엑셀'}", "한 명만 아는 도구 (공통 제외)", "sym", T.pink]];
    const cw = (CW - 0.9) / 4;
    ops.forEach(([n, op, m, res, d, mode, c], i) => {
      const x = MX + i * (cw + 0.3);
      card(s, x, 2.05, cw, 4.1, { fill: T.card, line: c, lw: 1.5 });
      txt(s, n, { x, y: 2.12, w: cw, h: 0.45, fontFace: F.b, fontSize: 18, color: c, align: "center" });
      venn(s, x + (cw - 2.05) / 2, 2.62, 1.32, mode, c);
      txt(s, op, { x, y: 4.05, w: cw, h: 0.4, fontFace: F.code, fontSize: 18, color: T.white, align: "center" });
      txt(s, m, { x, y: 4.45, w: cw, h: 0.35, fontFace: F.code, fontSize: 11, color: T.muted, align: "center" });
      txt(s, res, { x: x + 0.1, y: 4.85, w: cw - 0.2, h: 0.55, fontFace: F.code, fontSize: 12, color: T.yellow, align: "center", valign: "middle" });
      txt(s, d, { x: x + 0.1, y: 5.45, w: cw - 0.2, h: 0.6, fontSize: 13, color: T.text, align: "center", valign: "middle" });
    });
    tip(s, MX, 6.3, CW, 0.5, "실무", "두 달의 구매 고객 비교 — 두 달 모두 산 충성 고객(&), 이번 달 신규 고객(-) 찾기에 그대로 써요!", T.cyan, 15);
    footer(s, SRC + " 3-5, " + PYT + " — Sets");
    s.addNotes("PYTHONHASHSEED=0 으로 실행한 결과입니다. 집합은 순서가 없어서 출력 순서는 달라질 수 있지만 '들어 있는 값'은 항상 같습니다. 원문은 symmetric_difference 를 '차집합'으로 설명하지만 정확히는 '대칭 차집합'입니다.");
  }
  {
    const s = add();
    header(s, S35, "_update 메서드 — 결과로 '원본 A 자체'를 바꾸기");
    const rows = [["새 집합을 돌려줌 (A 그대로)", "A 자체를 바꿈", "실행 후 A"], ["A.union(B)", "A.update(B)", "{'파이썬', 'SQL', 'R', '엑셀'}"], ["A.intersection(B)", "A.intersection_update(B)", "{'파이썬'}"], ["A.difference(B)", "A.difference_update(B)", "{'R', '엑셀'}"], ["A.symmetric_difference(B)", "A.symmetric_difference_update(B)", "{'SQL', 'R', '엑셀'}"]];
    table(s, MX, 1.65, rows, [3.6, 4.4, CW - 8.0], { codeCols: [0, 1, 2], hl: { 0: T.cyan, 1: T.pink, 2: T.yellow }, rowH: 0.62, fs: 13, hfs: 14 });
    const hw = (CW - 0.4) / 2;
    codeOut(s, MX, 4.88, hw, ["A = {'파이썬', '엑셀', 'R'}", "C = A.union({'SQL'})   # A 그대로"], null, { fs: 12, lh: 0.28, noNums: true });
    codeOut(s, MX + hw + 0.4, 4.88, hw, ["A = {'파이썬', '엑셀', 'R'}", "A.update({'SQL'})      # A 가 바뀜"], null, { fs: 12, lh: 0.28, noNums: true });
    tip(s, MX, 6.35, CW, 0.48, "이름 규칙", "뒤에 _update 가 붙으면 '원본을 업데이트(변경)한다' — 리스트의 sort( ) 처럼!", T.green, 15);
    footer(s, SRC + " 3-5, " + PYT);
  }
  {
    const s = add();
    header(s, S35, "집합 메서드 한눈에 보기");
    const rows = [["메서드", "하는 일", "메서드 / 연산자", "하는 일"], ["add(x)", "1개 추가", "union( )  |", "합집합"], ["update(목록)", "여러 개 추가", "intersection( )  &", "교집합"], ["remove(x)", "삭제 (없으면 오류)", "difference( )  -", "차집합"],
      ["discard(x)", "삭제 (없어도 OK)", "symmetric_difference( )  ^", "대칭차집합"], ["pop( )", "아무거나 1개 꺼내기", "issubset(B)", "A 가 B 에 다 들어 있나?"], ["clear( ) · copy( )", "비우기 · 복사", "x in A", "x 가 있나? (True/False)"]];
    table(s, MX, 1.65, rows, [2.6, CW / 2 - 2.6, 3.6, CW / 2 - 3.6], { codeCols: [0, 2], hl: { 0: T.yellow, 2: T.green }, rowH: 0.6, fs: 14 });
    tip(s, MX, 6.0, CW, 0.7, "issubset", "{1, 2}.issubset({1, 2, 3}) → True  (부분집합 확인 — 원문 표의 'set( )' 칸은 issubset( ) 의 오타로 보여요)", T.cyan, 14);
    footer(s, SRC + " 3-5, " + PYT);
  }
  await D.summary(S35, "3.5 집합 핵심 정리", [
    ["만들기", "{값, 값} 또는 set(목록) — 빈 집합은 set( ),  중복 자동 제거 · 순서 없음"],
    ["추가 · 삭제", "add · update,  remove(없으면 오류) · discard(안전) · pop · clear"],
    ["연산", "| 합집합 · & 교집합 · - 차집합 · ^ 대칭차집합 (_update 는 원본 변경)"],
    ["활용", "중복 제거 len(set(목록)), 공통 고객 · 신규 고객 찾기"],
  ], "참 / 거짓을 담는 그릇 → 3.6 부울");

  // ======================= 3.6 부울 =======================
  sec("3.6 부울");
  await D.divider("3.6", "부울 (bool)", "True / False — 예 · 아니오 스위치", ["비교 결과는 부울", "bool( ) — 무엇이 참이고 무엇이 거짓?", "if · 함수 · isinstance 와 함께"], fa.FaToggleOn);
  {
    const s = add();
    header(s, S36, "부울 = 딱 두 개의 값 True · False");
    const hw = (CW - 0.4) / 2;
    // switch visual
    const on = await icon(fa.FaToggleOn, "#34D399"), off = await icon(fa.FaToggleOff, "#F472B6");
    card(s, MX, 1.6, hw, 1.1, { fill: T.card, line: T.green, lw: 1.5 });
    s.addImage({ data: on, x: MX + 0.35, y: 1.75, w: 0.8, h: 0.8 });
    txt(s, [{ text: "True", options: { fontFace: F.code, fontSize: 24, color: T.green, breakLine: true } }, { text: "참 · 예 · 켜짐 (1)", options: { fontSize: 14, color: T.text } }], { x: MX + 1.5, y: 1.6, w: hw - 1.7, h: 1.1, valign: "middle" });
    card(s, MX + hw + 0.4, 1.6, hw, 1.1, { fill: T.card, line: T.pink, lw: 1.5 });
    s.addImage({ data: off, x: MX + hw + 0.75, y: 1.75, w: 0.8, h: 0.8 });
    txt(s, [{ text: "False", options: { fontFace: F.code, fontSize: 24, color: T.pink, breakLine: true } }, { text: "거짓 · 아니오 · 꺼짐 (0)", options: { fontSize: 14, color: T.text } }], { x: MX + hw + 1.9, y: 1.6, w: hw - 1.7, h: 1.1, valign: "middle" });
    txt(s, "비교하면 결과는 항상 부울!", { x: MX, y: 2.8, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, MX, 3.2, hw, ["print(10 > 9)", "print(10 == 9)", "print(10 < 9)"], "True\nFalse\nFalse", { fs: 13, lh: 0.28 });
    const rx = MX + hw + 0.4;
    txt(s, "부울도 숫자처럼 계산돼요", { x: rx, y: 2.8, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.cyan });
    codeOut(s, rx, 3.2, hw, ["print(type(True))", "print(True + True)"], "<class 'bool'>\n2", { fs: 13, lh: 0.28 });
    txt(s, "True = 1, False = 0 → sum( ) 으로 '조건에 맞는 개수'를 셀 수 있어요.", { x: rx, y: 5.78, w: hw, h: 0.5, fontSize: 12, color: T.text });
    tip(s, MX, 6.38, CW, 0.45, "대소문자", "True · False 는 첫 글자만 대문자! true · TRUE 는 NameError 가 나요.", T.pink, 15);
    footer(s, SRC + " 3-6, Python Library — Truth Value Testing");
  }
  {
    const s = add();
    header(s, S36, "if 와 부울 — 조건에 따라 다른 길로");
    const lw = 6.4;
    codeOut(s, MX, 1.65, lw, ["a = 200", "b = 33", "if b > a:", "    print('b가 a보다 크다')", "else:", "    print('b가 a보다 크지 않다')"], "b가 a보다 크지 않다", { fs: 13, lh: 0.29 });
    // flow diagram
    const rx = MX + lw + 0.5, rw = CW - lw - 0.5;
    s.addShape("diamond", { x: rx + rw / 2 - 1.3, y: 1.7, w: 2.6, h: 1.3, fill: { color: T.card2 }, line: { color: T.yellow, width: 1.5 } });
    txt(s, "b > a ?", { x: rx + rw / 2 - 1.3, y: 1.7, w: 2.6, h: 1.3, fontFace: F.code, fontSize: 16, color: T.yellow, align: "center", valign: "middle" });
    txt(s, "33 > 200 → False", { x: rx, y: 3.05, w: rw, h: 0.35, fontFace: F.code, fontSize: 13, color: T.muted, align: "center" });
    const bw = (rw - 0.4) / 2;
    [["True 이면", "'크다' 출력", T.green, 0], ["False 이면", "'크지 않다' 출력 ✓", T.pink, 1]].forEach(([h, d, c, i]) => {
      const x = rx + i * (bw + 0.4);
      s.addShape("downArrow", { x: x + bw / 2 - 0.15, y: 3.42, w: 0.3, h: 0.4, fill: { color: c }, line: { type: "none" } });
      card(s, x, 3.9, bw, 1.0, { fill: T.card, line: c, lw: i ? 2.5 : 1 });
      txt(s, [{ text: h, options: { fontFace: F.b, color: c, breakLine: true } }, { text: d, options: { fontSize: 13 } }], { x, y: 3.9, w: bw, h: 1.0, fontSize: 15, align: "center", valign: "middle" });
    });
    card(s, MX, 5.25, CW, 0.9, { fill: T.card2 });
    txt(s, [{ text: "갈림길 비유  ", options: { fontFace: F.b, color: T.yellow } }, { text: "if 는 갈림길의 표지판. 조건이 True 면 왼쪽 길, False 면 else 길로 가요. (if 문은 04장에서 자세히!)" }], { x: MX + 0.3, y: 5.25, w: CW - 0.6, h: 0.9, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "들여쓰기", "if · else 아래 줄은 4칸 들여쓰기 — 파이썬은 들여쓰기로 '이 조건에 속한 코드'를 구분해요.", T.cyan, 15);
    footer(s, SRC + " 3-6");
  }
  {
    const s = add();
    header(s, S36, "bool( ) — 무엇이 참이고 무엇이 거짓일까?");
    const hw = (CW - 0.4) / 2;
    txt(s, "True — '뭔가 들어 있으면' 참", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    codeOut(s, MX, 2.05, hw, ["print(bool('Hello'), bool(15))", "print(bool(['a']), bool(' '))  # 공백 1칸"], "True True\nTrue True", { fs: 13, lh: 0.34 });
    const rx = MX + hw + 0.4;
    txt(s, "False — '비어 있거나 0' 이면 거짓", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    const rows = [["값", "bool( )"], ["False", "False"], ["None", "False"], ["0", "False"], ["''  (빈 문자열)", "False"], ["()  []  {}  (빈 그릇)", "False"]];
    table(s, rx, 2.05, rows, [hw - 1.8, 1.8], { codeCols: [0, 1], hl: { 0: T.yellow, 1: T.pink }, rowH: 0.52, fs: 14 });
    card(s, MX, 5.2, CW, 0.95, { fill: T.card2 });
    txt(s, [{ text: "상자 비유  ", options: { fontFace: F.b, color: T.yellow } }, { text: "상자를 흔들어 봐서 '뭔가 들어 있으면 True, 텅 비었으면 False'. 공백 ' ' 도 한 글자가 들어 있으니 True!" }], { x: MX + 0.3, y: 5.2, w: CW - 0.6, h: 0.95, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "실무 활용", "if cart:  → 장바구니가 비어 있지 않을 때만 결제 진행 — 이렇게 짧게 쓸 수 있어요.", T.cyan, 15);
    footer(s, SRC + " 3-6, Python Library — Truth Value Testing");
  }
  {
    const s = add();
    header(s, S36, "부울을 돌려주는 함수 · isinstance( ) · 빈 장바구니 확인");
    const cw = (CW - 0.6) / 3;
    const parts = [["True/False 를 돌려주는 함수", ["def is_adult(age):", "    return age >= 19", "", "print(is_adult(25))", "print(is_adult(15))"], "True\nFalse", "나이가 19 이상이면 True"],
      ["isinstance(값, 타입)", ["print(isinstance(200, int))", "print(isinstance('200', int))", "print(isinstance(3.5,", "                 (int, float)))"], "True\nFalse\nTrue", "숫자인지 확인할 때 (type 과 비슷)"],
      ["빈 장바구니 확인", ["cart = []", "if not cart:", "    print('장바구니가 비어 있어요')"], "장바구니가 비어 있어요", "not cart → 비었으면 True"]];
    parts.forEach(([h, code, out, note], i) => {
      const x = MX + i * (cw + 0.3);
      txt(s, h, { x, y: 1.6, w: cw, h: 0.4, fontFace: F.b, fontSize: 15, color: T.yellow });
      const b = codeOut(s, x, 2.05, cw, code, out, { fs: 11, lh: 0.3, noNums: true, ofs: 12 });
      txt(s, note, { x, y: b + 0.1, w: cw, h: 0.45, fontSize: 13, color: T.text });
    });
    tip(s, MX, 6.3, CW, 0.5, "is · has 로 시작하는 이름", "is_adult · isdigit · isinstance 처럼 'is~' 함수는 대부분 True/False 를 돌려줘요!", T.green, 15);
    footer(s, SRC + " 3-6, Python Built-in Functions");
  }
  await D.summary(S36, "3.6 부울 핵심 정리", [
    ["값", "True · False 두 개뿐 (첫 글자 대문자), 숫자로는 1 · 0"],
    ["만들어지는 곳", "비교 연산 ( > == < … ),  in,  isinstance( ),  is~ 함수"],
    ["bool( )", "비어 있거나 0 · None 이면 False,  뭔가 들어 있으면 True"],
    ["쓰임", "if 조건문의 갈림길 — if cart:  ·  if not cart:"],
  ], "03. 데이터 구조 마무리");

  // ======================= 마무리 =======================
  sec("마무리");
  {
    const s = add();
    header(s, "03. 데이터 구조 마무리", "같은 데이터, 4가지 그릇에 담아 보기");
    const items = [["리스트", "visit = ['부산', '서울', '부산']", "순서대로 · 중복 OK · 수정 OK", "['부산', '서울', '부산']", T.accent2], ["튜플", "visit = ('부산', '서울', '부산')", "순서대로 · 중복 OK · 수정 ✗", "('부산', '서울', '부산')", T.cyan],
      ["집합", "visit = {'부산', '서울', '부산'}", "중복 제거 · 순서 없음", "{'부산', '서울'}", T.green], ["딕셔너리", "visit = {'부산': 2, '서울': 1}", "이름(키)으로 값 찾기", "visit['부산'] → 2", T.yellow]];
    items.forEach(([n, code, d, out, c], i) => {
      const y = 1.65 + i * 1.08;
      card(s, MX, y, CW, 0.92, { fill: T.card, line: c, lw: 1.5 });
      txt(s, n, { x: MX + 0.25, y, w: 1.5, h: 0.92, fontFace: F.b, fontSize: 18, color: c, valign: "middle" });
      txt(s, code, { x: MX + 1.75, y, w: 4.5, h: 0.92, fontFace: F.code, fontSize: 13, color: T.codeText, valign: "middle" });
      txt(s, d, { x: MX + 6.3, y, w: 2.6, h: 0.92, fontSize: 13, color: T.text, valign: "middle" });
      txt(s, out, { x: MX + 8.95, y, w: CW - 9.1, h: 0.92, fontFace: F.code, fontSize: 12, color: T.yellow, valign: "middle" });
    });
    tip(s, MX, 6.15, CW, 0.65, "그리고 부울", "'부산' in visit → True — 네 그릇 모두 in 으로 '들어 있나?'를 물어보면 부울로 답해 줘요!", T.pink, 15);
    footer(s, PYT);
    s.addNotes("집합 출력 순서는 실행마다 다를 수 있습니다 ({'서울', '부산'} 처럼).");
  }
  {
    const s = add();
    header(s, "03. 데이터 구조 마무리", "실습 체크리스트 — Chap02 실습 노트북에서 해 보기");
    const tasks = [["리스트", "매출 리스트 만들고 append · sort · sum · max"], ["리스트 복사", "b = a 와 b = a.copy( ) 차이 확인"], ["튜플", "값 바꾸기 → TypeError 확인 후 list( ) 로 우회"], ["딕셔너리", "회원 정보 만들고 get · update · pop"], ["집합", "방문 기록 중복 제거, 두 집합의 & · | · -"], ["부울", "bool( ) 로 빈 값 · 0 · ' ' 확인"]];
    const cw = (CW - 0.3) / 2, box = await icon(fa.FaRegSquare, "#FACC15");
    tasks.forEach(([h, d], i) => {
      const x = MX + Math.floor(i / 3) * (cw + 0.3), y = 1.7 + (i % 3) * 1.4;
      card(s, x, y, cw, 1.2, { fill: T.card });
      s.addImage({ data: box, x: x + 0.3, y: y + 0.38, w: 0.42, h: 0.42 });
      txt(s, (i + 1) + ". " + h, { x: x + 0.95, y: y + 0.14, w: cw - 1.1, h: 0.45, fontFace: F.b, fontSize: 17 });
      txt(s, d, { x: x + 0.95, y: y + 0.6, w: cw - 1.1, h: 0.5, fontSize: 14, color: T.text });
    });
    tip(s, MX, 6.0, CW, 0.7, "연습문제", "리스트 · 튜플 · 딕셔너리 · 집합 PBL 연습문제는 별도 파일(PBL 연습문제)로 풀어 봐요!", T.green, 15);
    footer(s);
  }
  {
    const s = add();
    header(s, "03. 데이터 구조 마무리", "오늘 배운 것 한 장 요약");
    const q = [["3.2", "리스트 [ ]", "번호 붙은 서랍장 — 순서 · 중복 · 수정 OK,  append · insert · pop · sort · copy"], ["3.3", "튜플 ( )", "봉인된 도시락 — 수정 ✗,  index · count,  언패킹 x, y = t"], ["3.4", "딕셔너리 { : }", "사전 — 키로 찾기,  get · keys · values · items · update · pop"],
      ["3.5", "집합 { }", "출석부 — 중복 ✗ · 순서 ✗,  add · discard,  | & - ^"], ["3.6", "부울", "True / False 스위치 — 비교 결과, bool( ), if 조건"]];
    q.forEach(([n, h, d], i) => {
      const y = 1.65 + i * 0.86;
      card(s, MX, y, CW, 0.74, { fill: T.card });
      txt(s, n, { x: MX + 0.25, y, w: 0.9, h: 0.74, fontFace: F.xb, fontSize: 20, color: T.accent2, valign: "middle" });
      txt(s, h, { x: MX + 1.2, y, w: 2.6, h: 0.74, fontFace: F.b, fontSize: 17, valign: "middle" });
      txt(s, d, { x: MX + 3.85, y, w: CW - 4.05, h: 0.74, fontSize: 14, color: T.text, valign: "middle" });
    });
    tip(s, MX, 6.1, CW, 0.7, "다음 시간", "04. PBL 연습문제 — 리스트 · 튜플 · 딕셔너리 · 집합 문제를 직접 풀어 보기!", T.cyan, 16);
    footer(s);
  }
  await D.refs("03. 데이터 구조 마무리", [
    "김진성. 「비즈니스 데이터 분석 with Python」 02장 — 03. 데이터 구조 (3.1 개요 · 3-2 리스트 · 튜플 · 3-4 딕셔너리 · 집합 · 부울). WikiDocs. https://wikidocs.net/205237",
    "김진성. Chap02 변수와 데이터 유형 실습 노트북 (.ipynb)",
    "Python Software Foundation. The Python Tutorial — Data Structures (Lists, Tuples and Sequences, Sets, Dictionaries). https://docs.python.org/3/tutorial/datastructures.html",
    "Python Software Foundation. Built-in Types — Sequence Types, Set Types, Mapping Types, Truth Value Testing. https://docs.python.org/3/library/stdtypes.html",
    "Python Software Foundation. Built-in Functions (len, sorted, list, tuple, dict, set, bool, isinstance). https://docs.python.org/3/library/functions.html",
    "Python Software Foundation. Sorting Techniques (HOWTO). https://docs.python.org/3/howto/sorting.html",
  ]);
  await D.closing("02장 · 03. 데이터 구조");
};
