// 02장 · 03. 데이터 구조 — intro + 3.1 개요 + 3.2 리스트
const fa = require("react-icons/fa");
const L = require("./lib");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox } = L;
const { makeDeck } = require("./deck");

const SRC = "wikidocs 「비즈니스 데이터 분석 with Python」(김진성)";
const PYT = "Python Tutorial — Data Structures (docs.python.org/3/tutorial/datastructures.html)";
const D = makeDeck("비즈니스 데이터 분석 with Python - 02장. 변수와 데이터 유형 · 03. 데이터 구조");
const { add, sec } = D;
const S31 = "SECTION 3.1  ·  데이터 구조 한눈에", S32 = "SECTION 3.2  ·  리스트 (list)";

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
  const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: i === 0 ? F.b : (opts.codeCols || []).includes(j) ? F.code : F.r, fontSize: i === 0 ? (opts.hfs || 15) : opts.fs || 15,
    color: i === 0 ? T.white : (opts.hl || {})[j] || T.text, fill: { color: i === 0 ? (opts.hfill || T.card2) : (i % 2 ? T.card : T.bg) }, align: (opts.left || []).includes(j) ? "left" : "center", valign: "middle", margin: [0.03, 0.1, 0.03, 0.1] } })));
  s.addTable(tbl, { x, y, w: colW.reduce((a, b) => a + b, 0), colW, rowH: opts.rowH || 0.5, border: { type: "solid", color: "1E2A5A", pt: 1 } });
}
// row of boxes with index numbers (list / tuple picture)
function boxes(s, x, y, vals, opts = {}) {
  const bw = opts.bw || 1.3, bh = opts.bh || 0.7, c = opts.color || T.accent2;
  vals.forEach((v, i) => {
    const bx = x + i * bw, hl = (opts.hl || []).includes(i);
    s.addShape("rect", { x: bx, y, w: bw, h: bh, fill: { color: hl ? c : T.card, transparency: hl ? 65 : 0 }, line: { color: c, width: 1.5 } });
    txt(s, v, { x: bx, y, w: bw, h: bh, fontFace: F.code, fontSize: opts.fs || 14, color: T.yellow, align: "center", valign: "middle" });
    if (!opts.noIdx) txt(s, String(i), { x: bx, y: y + bh + 0.05, w: bw, h: 0.3, fontFace: F.code, fontSize: 12, color: T.green, align: "center" });
    if (opts.neg) txt(s, String(i - vals.length), { x: bx, y: y - 0.35, w: bw, h: 0.3, fontFace: F.code, fontSize: 12, color: T.pink, align: "center" });
  });
}
const H = { codeOut, table, boxes, SRC, PYT };

(async () => {
  sec("표지");
  await D.titleSlide("02장. 변수와 데이터 유형", "03. 데이터 구조  —  리스트 · 튜플 · 딕셔너리 · 집합 · 부울", SRC + "  ·  Chap02 실습 노트북  ·  Python 공식 문서로 보완", fa.FaLayerGroup);
  {
    const s = add();
    header(s, "비즈니스 데이터 분석 with Python", "Contents — 02장 · 03. 데이터 구조");
    txt(s, "실습 파일 : Chap02 실습 노트북 (.ipynb)  ·  연습문제는 별도 파일 (PBL 연습문제)", { x: MX, y: 1.6, w: CW, h: 0.4, fontFace: F.sb, fontSize: 16, color: T.accent2 });
    const items = [["3.1", "데이터 구조 한눈에", "4가지 구조 비교", fa.FaThLarge], ["3.2", "리스트 list", "[ ] 번호 붙은 서랍장", fa.FaListOl], ["3.3", "튜플 tuple", "( ) 봉인된 상자", fa.FaLock],
      ["3.4", "딕셔너리 dict", "{ 키 : 값 } 사전", fa.FaBook], ["3.5", "집합 set", "{ } 중복 없는 명단", fa.FaDotCircle], ["3.6", "부울 bool", "True / False 판단", fa.FaToggleOn]];
    const cw = (CW - 0.6) / 3;
    for (let i = 0; i < 6; i++) {
      const [n, t, d, Ic] = items[i];
      const x = MX + (i % 3) * (cw + 0.3), y = 2.2 + Math.floor(i / 3) * 2.1;
      card(s, x, y, cw, 1.85, { fill: T.card });
      await iconCircle(s, Ic, x + 0.3, y + 0.35, 0.85);
      txt(s, n, { x: x + 1.4, y: y + 0.2, w: cw - 1.6, h: 0.5, fontFace: F.xb, fontSize: 24, color: T.accent2 });
      txt(s, t, { x: x + 1.4, y: y + 0.72, w: cw - 1.6, h: 0.45, fontFace: F.b, fontSize: 18 });
      txt(s, d, { x: x + 1.4, y: y + 1.2, w: cw - 1.6, h: 0.45, fontSize: 14, color: T.text });
    }
    footer(s, SRC);
  }
  {
    const s = add();
    header(s, "03. 데이터 구조 시작하기", "변수 하나에 값 하나? 여러 개를 한 번에 담고 싶다면!");
    const hw = (CW - 0.4) / 2;
    txt(s, "✗  변수를 하나씩 만들면…", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeBlock(s, MX, 2.05, hw, ["sales_mon = 120", "sales_tue = 95", "sales_wed = 130", "sales_thu = 88", "sales_fri = 150", "# … 365일이면 변수 365개?!"], { fs: 13, lh: 0.32 });
    const rx = MX + hw + 0.4;
    txt(s, "✓  데이터 구조(리스트)에 한 번에!", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    codeOut(s, rx, 2.05, hw, ["sales = [120, 95, 130, 88, 150]", "print(sum(sales), max(sales))"], "583 150", { fs: 13, lh: 0.36 });
    card(s, rx, 4.3, hw, 1.15, { fill: T.card2 });
    txt(s, "이름 하나(sales)로 5일치를 담고, 합계 · 최댓값도 한 줄로!", { x: rx + 0.25, y: 4.3, w: hw - 0.5, h: 1.15, fontSize: 15, valign: "middle" });
    tip(s, MX, 5.65, CW, 0.55, "데이터 구조란?", "여러 데이터를 '어떤 모양으로' 묶어 저장할지 정한 그릇 — 리스트 · 튜플 · 딕셔너리 · 집합", T.yellow, 15);
    tip(s, MX, 6.35, CW, 0.5, "실무 연결", "엑셀의 '한 열(column)'이 리스트, '한 행(row)'의 '열이름:값'이 딕셔너리와 비슷해요!", T.cyan, 15);
    footer(s, PYT);
  }

  // ======================= 3.1 =======================
  sec("3.1 데이터 구조 한눈에");
  await D.divider("3.1", "데이터 구조 한눈에", "4가지 그릇의 생김새와 성격", ["리스트 · 튜플 · 딕셔너리 · 집합 비유", "한 장 비교표", "어떤 그릇을 고를까?"], fa.FaThLarge);
  {
    const s = add();
    header(s, S31, "4가지 그릇 — 생활 속 물건으로 기억하기");
    const kinds = [["리스트", "[ ]", "번호 붙은 서랍장", "칸마다 번호(0,1,2…)\n넣고 · 빼고 · 바꾸기 자유", "['서울', '부산']", fa.FaListOl, T.accent2], ["튜플", "( )", "봉인된 도시락", "순서는 있지만\n한번 싸면 못 바꿈", "('짜장면', '짬뽕')", fa.FaLock, T.cyan],
      ["딕셔너리", "{ 키 : 값 }", "사전 · 전화번호부", "'이름'으로 찾기\n키는 중복 불가", "{'name': 'kim'}", fa.FaBook, T.yellow], ["집합", "{ }", "중복 없는 출석부", "같은 값은 한 번만\n순서 없음", "{'강백호', '서태웅'}", fa.FaDotCircle, T.green]];
    const cw = (CW - 0.9) / 4;
    for (let i = 0; i < 4; i++) {
      const [n, sym, an, d, ex, Ic, c] = kinds[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.65, cw, 4.45, { fill: T.card, line: c, lw: 1.5 });
      await iconCircle(s, Ic, x + cw / 2 - 0.45, 1.85, 0.9, c, "#FFFFFF", 55);
      txt(s, n, { x, y: 2.85, w: cw, h: 0.45, fontFace: F.b, fontSize: 20, align: "center" });
      txt(s, sym, { x, y: 3.3, w: cw, h: 0.45, fontFace: F.code, fontSize: 18, color: c, align: "center" });
      s.addShape("roundRect", { x: x + 0.2, y: 3.85, w: cw - 0.4, h: 0.45, rectRadius: 0.22, fill: { color: c, transparency: 80 }, line: { type: "none" } });
      txt(s, an, { x: x + 0.2, y: 3.85, w: cw - 0.4, h: 0.45, fontFace: F.sb, fontSize: 14, align: "center", valign: "middle" });
      txt(s, d, { x: x + 0.2, y: 4.45, w: cw - 0.4, h: 0.8, fontSize: 13, color: T.text, align: "center" });
      txt(s, ex, { x: x + 0.1, y: 5.35, w: cw - 0.2, h: 0.5, fontFace: F.code, fontSize: 12, color: T.yellow, align: "center", valign: "middle" });
    }
    tip(s, MX, 6.3, CW, 0.5, "괄호로 구분!", "[ ] 리스트,  ( ) 튜플,  { } 딕셔너리 · 집합 ( : 가 있으면 딕셔너리 )", T.yellow);
    footer(s, SRC + " 03, " + PYT);
  }
  {
    const s = add();
    header(s, S31, "4가지 데이터 구조 비교표");
    const rows = [["특징", "리스트 list", "튜플 tuple", "집합 set", "딕셔너리 dict"], ["기호", "[ ]", "( )", "{ }", "{ 키 : 값 }"], ["예", "[20, 20, 30]", "(20, 20, 30)", "{20, 20, 30}", "{20: 'son', 30: 'lee'}"], ["꺼내기", "lis[0]", "tup[0]", "인덱스 불가", "dic[20]  (키로)"],
      ["중복", "허용", "허용", "불가 → {20, 30}", "키 중복 불가 (덮어씀)"], ["추가 · 변경", "둘 다 가능", "둘 다 불가", "추가만 가능", "둘 다 가능"], ["순서", "유지", "유지", "없음", "유지 (3.7 이후)"], ["슬라이싱", "가능", "가능", "불가", "불가"], ["합 · 교집합", "불가", "불가", "가능", "불가"]];
    table(s, MX, 1.65, rows, [2.1, 2.55, 2.55, 2.55, CW - 9.75], { codeCols: [], hl: { 0: T.accent2 }, rowH: 0.5, fs: 14 });
    tip(s, MX, 6.35, CW, 0.5, "외우는 팁", "변경 가능한 것은 리스트 · 딕셔너리,  못 바꾸는 것은 튜플,  중복 제거 전문은 집합!", T.yellow, 15);
    footer(s, SRC + " 03 (비교표를 실행 결과에 맞게 정리)");
    s.addNotes("원문 표의 딕셔너리 예 'dic = {20;'son', 30:'kim', 30:'lee'}' 는 ; 오타가 있어 : 로 고쳤고, 같은 키 30 이 두 번 나오면 마지막 값 'lee' 로 덮어써져 {20: 'son', 30: 'lee'} 가 됩니다.");
  }
  {
    const s = add();
    header(s, S31, "어떤 그릇을 고를까? — 선택 가이드");
    const q = [["순서대로 쌓이고, 자주 추가 · 수정된다", "리스트", "매일 매출, 장바구니, 설문 응답", T.accent2], ["절대 바뀌면 안 되는 고정값이다", "튜플", "좌표 (위도, 경도), 요일 이름, 설정값", T.cyan], ["'이름'으로 값을 찾고 싶다", "딕셔너리", "회원 정보 {이름: …, 나이: …}", T.yellow], ["중복을 없애거나 공통점을 찾고 싶다", "집합", "방문 고객 수, 두 반의 공통 수강생", T.green]];
    q.forEach(([qq, a, ex, c], i) => {
      const y = 1.7 + i * 1.12;
      card(s, MX, y, 6.0, 0.95, { fill: T.card });
      txt(s, "Q. " + qq, { x: MX + 0.25, y, w: 5.6, h: 0.95, fontSize: 16, valign: "middle" });
      s.addShape("rightArrow", { x: MX + 6.15, y: y + 0.28, w: 0.6, h: 0.4, fill: { color: T.accent }, line: { type: "none" } });
      card(s, MX + 6.9, y, CW - 6.9, 0.95, { fill: T.card2, line: c, lw: 1.5 });
      txt(s, [{ text: a + "   ", options: { fontFace: F.b, fontSize: 18, color: c } }, { text: ex, options: { fontSize: 14, color: T.text } }], { x: MX + 7.1, y, w: CW - 7.3, h: 0.95, valign: "middle" });
    });
    tip(s, MX, 6.3, CW, 0.5, "실무에서는", "리스트와 딕셔너리를 가장 많이 써요. pandas(08장)의 표도 결국 이 둘로 만들어집니다!", T.cyan);
    footer(s, PYT);
  }

  // ======================= 3.2 리스트 =======================
  sec("3.2 리스트");
  await D.divider("3.2", "리스트 (list)", "[ ] — 번호 붙은 서랍장", ["만들기 · 검색 · 변경", "추가 · 삭제 · 정렬", "복사 · 합치기 · 메서드 정리"], fa.FaListOl);
  {
    const s = add();
    header(s, S32, "리스트 만들기 — 대괄호 [ ] 안에 쉼표로");
    s.addShape("roundRect", { x: MX, y: 1.7, w: 7.2, h: 0.7, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.accent, width: 1 } });
    txt(s, [{ text: "city", options: { color: T.cyan } }, { text: " = [", options: { color: T.codeText } }, { text: "'Seoul', 'Busan', 'Ulsan'", options: { color: "FCD34D" } }, { text: "]", options: { color: T.codeText } }], { x: MX, y: 1.7, w: 7.2, h: 0.7, fontFace: F.code, fontSize: 20, align: "center", valign: "middle" });
    boxes(s, MX + 0.8, 3.05, ["'Seoul'", "'Busan'", "'Ulsan'"], { bw: 1.85, bh: 0.85, fs: 16, neg: true });
    txt(s, "인덱스 →", { x: MX - 0.2, y: 3.95, w: 1.0, h: 0.3, fontSize: 11, color: T.green });
    txt(s, "음수 →", { x: MX - 0.2, y: 2.7, w: 1.0, h: 0.3, fontSize: 11, color: T.pink });
    const rx = MX + 7.55, rw = CW - 7.55;
    const feats = [["순서 유지", "넣은 순서대로, 새 값은 맨 끝에"], ["변경 가능", "바꾸기 · 추가 · 삭제 자유"], ["중복 허용", "같은 값이 여러 번 OK"], ["아무 타입이나", "[1, 'a', True, 3.5] 도 가능"]];
    feats.forEach(([k, v], i) => {
      const y = 1.7 + i * 0.95;
      card(s, rx, y, rw, 0.82, { fill: T.card });
      txt(s, [{ text: k + "  ", options: { fontFace: F.b, color: T.accent2 } }, { text: v, options: { fontSize: 14 } }], { x: rx + 0.25, y, w: rw - 0.4, h: 0.82, fontSize: 16, valign: "middle" });
    });
    card(s, MX, 4.75, 7.2, 1.3, { fill: T.card2 });
    txt(s, [{ text: "서랍장 비유", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "서랍마다 0번부터 번호가 붙어 있어요. 번호로 꺼내고, 바꾸고, 새 서랍을 끝에 덧붙일 수 있어요." }], { x: MX + 0.3, y: 4.75, w: 6.6, h: 1.3, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "빈 리스트", "cart = [ ] — 처음엔 비워 두고 나중에 하나씩 채워 넣을 때 자주 써요.", T.cyan);
    footer(s, SRC + " 3-2, " + PYT);
  }
  {
    const s = add();
    header(s, S32, "1) 검색 — 인덱스 · 음수 인덱스 · 슬라이싱 · index( )");
    const lw = 6.6;
    codeOut(s, MX, 1.65, lw, ["city = ['Seoul', 'Busan', 'Ulsan']", "print(city[0])        # 첫 번째", "print(city[-1])       # 마지막", "print(city[0:2])      # 0, 1번", "print(city.index('Busan'))", "print(len(city))"], "Seoul\nUlsan\n['Seoul', 'Busan']\n1\n3", { fs: 13, lh: 0.32 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const rows = [["코드", "뜻"], ["city[0]", "0번 서랍 (첫 값)"], ["city[-1]", "끝에서 첫 번째"], ["city[0:2]", "0번부터 2번 앞까지"], ["city.index('Busan')", "'Busan' 이 몇 번?"], ["len(city)", "값이 몇 개?"]];
    table(s, rx, 1.65, rows, [3.0, rw - 3.0], { codeCols: [0], hl: { 0: T.yellow }, rowH: 0.52 });
    tip(s, rx, 4.95, rw, 1.1, "기억!", "문자열 인덱싱 · 슬라이싱(2.3)과 똑같아요. 글자 대신 '값'이 한 칸씩 들어 있을 뿐!", T.green, 14);
    tip(s, MX, 6.3, CW, 0.5, "오류 주의", "city[5] → IndexError: list index out of range — 없는 번호의 서랍은 열 수 없어요.", T.pink, 15);
    footer(s, SRC + " 3-2");
  }
  {
    const s = add();
    header(s, S32, "2) 값 바꾸기 — 한 칸 · 여러 칸");
    const cw = (CW - 0.6) / 3;
    const parts = [["한 칸 바꾸기", ["city = ['Seoul', 'Busan', 'Ulsan']", "city[1] = 'Daegu'", "print(city)"], "['Seoul', 'Daegu', 'Ulsan']", "1번 서랍 내용 교체"],
      ["여러 칸 바꾸기 [1:3]", ["city = ['Seoul', 'Busan', 'Ulsan']", "city[1:3] = ['Yangon', 'Chicago']", "print(city)"], "['Seoul', 'Yangon', 'Chicago']", "1, 2번 → 새 값 2개"],
      ["더 많이 넣으면?", ["city = ['Seoul', 'Busan', 'Ulsan']", "city[1:2] = ['Yangon', 'Chicago']", "print(city)"], "['Seoul', 'Yangon', 'Chicago', 'Ulsan']", "1칸 자리에 2개 → 뒤로 밀림"]];
    parts.forEach(([h, code, out, note], i) => {
      const x = MX + i * (cw + 0.3);
      txt(s, h, { x, y: 1.6, w: cw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
      const b = codeOut(s, x, 2.05, cw, code, out, { fs: 11, lh: 0.32, noNums: true, ofs: 11 });
      txt(s, note, { x, y: b + 0.15, w: cw, h: 0.45, fontSize: 14, color: T.text });
    });
    tip(s, MX, 5.6, CW, 0.55, "[1:3] 읽기", "시작 1(포함) ~ 끝 3(미포함) → 1번, 2번 두 칸. 끝 번호는 항상 '바로 앞까지'!", T.cyan, 15);
    tip(s, MX, 6.3, CW, 0.5, "리스트만 가능", "문자열 · 튜플은 이렇게 칸을 바꿀 수 없어요 — 리스트는 '변경 가능(mutable)'!", T.green, 15);
    footer(s, SRC + " 3-2");
  }
  {
    const s = add();
    header(s, S32, "3) 삽입 insert( ) · 4) 추가 append( ) · extend( )");
    const cw = (CW - 0.6) / 3;
    const parts = [["insert(위치, 값)", "원하는 자리에 끼워 넣기", ["city.insert(2, 'Yangon')"], "['Seoul', 'Busan', 'Yangon', 'Ulsan']", T.cyan], ["append(값)", "맨 끝에 1개 추가", ["city.append('Jeju')"], "['Seoul', 'Busan', 'Ulsan', 'Jeju']", T.green],
      ["extend(리스트)", "맨 끝에 여러 개 이어 붙이기", ["abroad = ['Tokyo', 'Paris']", "city.extend(abroad)"], "['Seoul', 'Busan', 'Ulsan',\n 'Tokyo', 'Paris']", T.yellow]];
    parts.forEach(([h, d, code, out, c], i) => {
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.65, cw, 0.95, { fill: T.card, line: c, lw: 1.5 });
      txt(s, h, { x: x + 0.2, y: 1.7, w: cw - 0.4, h: 0.45, fontFace: F.code, fontSize: 16, color: c });
      txt(s, d, { x: x + 0.2, y: 2.12, w: cw - 0.4, h: 0.4, fontSize: 13, color: T.text });
      codeOut(s, x, 2.75, cw, code, out, { fs: 11, lh: 0.28, noNums: true, ofs: 11, label: "원본 city 3개에서" });
    });
    card(s, MX, 5.32, CW, 0.85, { fill: T.card2 });
    txt(s, [{ text: "append vs extend  ", options: { fontFace: F.b, color: T.yellow } }, { text: "append(['Tokyo', 'Paris']) 는 리스트 '통째로' 1칸에 들어가요 → [..., ['Tokyo', 'Paris']].  여러 값을 하나씩 붙이려면 extend!" }],
      { x: MX + 0.3, y: 5.32, w: CW - 0.6, h: 0.85, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "extend 에는", "리스트뿐 아니라 튜플 ('Tokyo', 'Paris') 도 넣을 수 있어요 — 결과는 같아요.", T.cyan);
    footer(s, SRC + " 3-2");
  }
  {
    const s = add();
    header(s, S32, "5) 삭제 — remove · pop · del · clear");
    const rows = [["방법", "기준", "예 (city = ['Seoul', 'Busan', 'Ulsan'])", "결과"], ["remove(값)", "값으로 삭제", "city.remove('Busan')", "['Seoul', 'Ulsan']"], ["pop(번호)", "번호로 삭제 + 꺼낸 값 돌려줌", "city.pop(1)  → 'Busan'", "['Seoul', 'Ulsan']"], ["pop( )", "번호 없으면 맨 끝", "city.pop()  → 'Ulsan'", "['Seoul', 'Busan']"],
      ["del 리스트[번호]", "번호(범위)로 삭제", "del city[0:2]", "['Ulsan']"], ["clear( )", "전부 비우기", "city.clear()", "[ ]"]];
    table(s, MX, 1.65, rows, [2.2, 2.75, 4.0, CW - 8.95], { codeCols: [0, 2, 3], hl: { 0: T.yellow, 3: T.green }, rowH: 0.6, fs: 14 });
    card(s, MX, 5.4, CW, 0.75, { fill: T.card2 });
    txt(s, [{ text: "pop 은 '꺼내기'  ", options: { fontFace: F.b, color: T.yellow } }, { text: "x = city.pop(1) 처럼 빼낸 값을 변수에 받아 쓸 수 있어요 (서랍에서 물건을 꺼내 손에 들기)." }], { x: MX + 0.3, y: 5.4, w: CW - 0.6, h: 0.75, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "오류 주의", "city.remove('Jeju') → ValueError: list.remove(x): x not in list — 없는 값은 지울 수 없어요.", T.pink, 15);
    footer(s, SRC + " 3-2");
  }
  {
    const s = add();
    header(s, S32, "6) 정렬 — sort( ) · sort(reverse=True) · reverse( )");
    const lw = 6.8;
    codeOut(s, MX, 1.65, lw, ["num = [100, 50, 65, 82, 23]", "num.sort()                # 오름차순", "print(num)", "num.sort(reverse=True)    # 내림차순", "print(num)", "city = ['Ulsan', 'Seoul', 'Busan', 'Daegu']", "city.sort()               # 알파벳순", "print(city)"],
      "[23, 50, 65, 82, 100]\n[100, 82, 65, 50, 23]\n['Busan', 'Daegu', 'Seoul', 'Ulsan']", { fs: 12, lh: 0.28 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    txt(s, "reverse( ) 는 정렬이 아니에요!", { x: rx, y: 1.6, w: rw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.pink });
    const rb = codeOut(s, rx, 2.05, rw, ["num = [100, 50, 65, 82, 23]", "num.reverse()", "print(num)"], "[23, 82, 65, 50, 100]", { fs: 13, lh: 0.3 });
    txt(s, "크기와 상관없이 앞뒤 순서만 뒤집어요.", { x: rx, y: rb + 0.05, w: rw, h: 0.4, fontSize: 14, color: T.text });
    card(s, rx, 4.95, rw, 1.2, { fill: T.card2 });
    txt(s, [{ text: "원본을 지키고 싶다면", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "sorted(num) 함수는 정렬된 '새 리스트'를 돌려주고 num 은 그대로 둬요." }], { x: rx + 0.25, y: 4.95, w: rw - 0.5, h: 1.2, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "문자열과 다른 점", "리스트의 sort( ) 는 원본 자체를 바꿔요 (문자열 메서드는 원본을 안 바꿨죠!).", T.cyan);
    footer(s, SRC + " 3-2, Python HOWTO — Sorting");
  }
  {
    const s = add();
    header(s, S32, "7) 복사 — list2 = list1 은 복사가 아니에요!");
    const hw = (CW - 0.4) / 2;
    txt(s, "✗  = 로 '복사'하면", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeOut(s, MX, 2.05, hw, ["a = ['Seoul', 'Busan']", "b = a", "b.append('Jeju')", "print(a)"], "['Seoul', 'Busan', 'Jeju']", { fs: 13, lh: 0.3 });
    // diagram: two labels pointing to one box
    s.addShape("roundRect", { x: MX + 1.6, y: 5.05, w: 2.6, h: 0.7, rectRadius: 0.08, fill: { color: T.card }, line: { color: T.pink, width: 1.5 } });
    txt(s, "['Seoul', …]", { x: MX + 1.6, y: 5.05, w: 2.6, h: 0.7, fontFace: F.code, fontSize: 14, color: T.yellow, align: "center", valign: "middle" });
    [["a", MX + 0.2], ["b", MX + 4.6]].forEach(([n, x]) => {
      s.addShape("roundRect", { x, y: 5.12, w: 0.8, h: 0.55, rectRadius: 0.1, fill: { color: T.pink }, line: { type: "none" } });
      txt(s, n, { x, y: 5.12, w: 0.8, h: 0.55, fontFace: F.code, fontSize: 18, color: T.bg, align: "center", valign: "middle" });
    });
    s.addShape("rightArrow", { x: MX + 1.05, y: 5.25, w: 0.5, h: 0.3, fill: { color: T.pink }, line: { type: "none" } });
    s.addShape("leftArrow", { x: MX + 4.05, y: 5.25, w: 0.5, h: 0.3, fill: { color: T.pink }, line: { type: "none" } });
    txt(s, "이름표만 2개, 서랍장은 1개!", { x: MX, y: 5.8, w: hw, h: 0.4, fontSize: 14, color: T.text, align: "center" });
    const rx = MX + hw + 0.4;
    txt(s, "✓  copy( ) 로 진짜 복사", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    codeOut(s, rx, 2.05, hw, ["a = ['Seoul', 'Busan']", "b = a.copy()", "b.append('Jeju')", "print(a)", "print(b)"], "['Seoul', 'Busan']\n['Seoul', 'Busan', 'Jeju']", { fs: 13, lh: 0.3 });
    txt(s, "list(a) 로도 복사돼요.  list( ) 는 튜플 · 문자열을 리스트로 바꿀 때도 써요 : list('abc') → ['a', 'b', 'c']", { x: rx, y: 5.55, w: hw, h: 0.7, fontSize: 13, color: T.text });
    tip(s, MX, 6.3, CW, 0.5, "비유", "b = a 는 '같은 서랍장에 이름표만 하나 더' — 진짜 복사본이 필요하면 .copy( )!", T.yellow);
    footer(s, SRC + " 3-2");
  }
  {
    const s = add();
    header(s, S32, "8) 합치기 · 9) 개수 세기 — 그리고 리스트로 매출 분석");
    const hw = (CW - 0.4) / 2;
    txt(s, "합치기 : + 또는 extend · 개수 : count · len", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["list1 = ['a', 'b']", "list2 = [1, 2]", "print(list1 + list2)", "visit = ['부산', '서울', '부산']", "print(visit.count('부산'), len(visit))"], "['a', 'b', 1, 2]\n2 3", { fs: 13, lh: 0.32 });
    const rx = MX + hw + 0.4;
    txt(s, "실무 예 : 일주일 매출 분석", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.green });
    codeOut(s, rx, 2.05, hw, ["sales = [120, 95, 130, 88, 150, 210, 180]", "print('합계', sum(sales))", "print('최고', max(sales), '최저', min(sales))", "print('평균', round(sum(sales) / len(sales), 1))", "top3 = sorted(sales, reverse=True)[:3]", "print('상위 3일', top3)"], "합계 973\n최고 210 최저 88\n평균 139.0\n상위 3일 [210, 180, 150]", { fs: 12, lh: 0.28 });
    tip(s, MX, 6.3, CW, 0.5, "복습", "sum · max · min · len · sorted — 2.4 에서 배운 함수들이 리스트를 만나 진짜 힘을 발휘해요!", T.cyan);
    footer(s, SRC + " 3-2");
  }
  {
    const s = add();
    header(s, S32, "10) 리스트 메서드 한눈에 보기");
    const rows = [["메서드", "하는 일", "메서드", "하는 일"], ["append(x)", "맨 끝에 추가", "pop(i)", "i번 꺼내기 (없으면 끝)"], ["insert(i, x)", "i번 자리에 끼워 넣기", "remove(x)", "값 x 삭제"], ["extend(목록)", "여러 개 이어 붙이기", "clear( )", "전부 삭제"],
      ["index(x)", "x 의 위치 번호", "sort( )", "정렬 (reverse=True 내림)"], ["count(x)", "x 의 개수", "reverse( )", "순서 뒤집기"], ["copy( )", "복사본 만들기", "—", "—"]];
    table(s, MX, 1.65, rows, [2.6, CW / 2 - 2.6, 2.6, CW / 2 - 2.6], { codeCols: [0, 2], hl: { 0: T.yellow, 2: T.yellow }, rowH: 0.6 });
    tip(s, MX, 6.0, CW, 0.7, "모양 복습", "모두 '리스트.메서드( )' 모양 — 리스트 전용 리모컨 버튼이에요. 점 찍고 Tab 하면 목록이 떠요!", T.green, 15);
    footer(s, SRC + " 3-2, " + PYT);
  }
  await D.summary(S32, "3.2 리스트 핵심 정리", [
    ["만들기 · 검색", "[ ] 로 만들기,  city[0] · city[-1] · city[0:2] · index( ) · len( )"],
    ["바꾸기 · 추가", "city[1] = 값,  insert(위치, 값) · append(값) · extend(목록)"],
    ["삭제 · 정렬", "remove(값) · pop(번호) · del · clear( ),  sort( ) · reverse( )"],
    ["복사 주의", "b = a 는 같은 리스트! 복사본은 a.copy( ) 또는 list(a)"],
  ], "바꿀 수 없는 리스트? → 3.3 튜플");

  const ctx = { D, add, sec, H };
  await require("./c5b")(ctx);
  await require("./c5c")(ctx);
  await D.pres.writeFile({ fileName: process.argv[2] || "CH0203.pptx" });
})();
