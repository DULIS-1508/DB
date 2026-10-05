// 02장 · 03. 데이터 구조 — 3.3 튜플 + 3.4 딕셔너리
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox } = require("./lib");

module.exports = async function ({ D, add, sec, H }) {
  const { codeOut, table, boxes, SRC, PYT } = H;
  const S33 = "SECTION 3.3  ·  튜플 (tuple)", S34 = "SECTION 3.4  ·  딕셔너리 (dict)";

  // ======================= 3.3 튜플 =======================
  sec("3.3 튜플");
  await D.divider("3.3", "튜플 (tuple)", "( ) — 한번 싸면 못 바꾸는 봉인된 도시락", ["만들기 · 검색", "변경 불가! 바꾸고 싶다면?", "합치기 · 언패킹 · 언제 쓸까"], fa.FaLock);
  {
    const s = add();
    header(s, S33, "튜플 만들기 — 소괄호 ( ) 안에 쉼표로");
    s.addShape("roundRect", { x: MX, y: 1.7, w: 7.6, h: 0.7, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.cyan, width: 1 } });
    txt(s, [{ text: "menu", options: { color: T.cyan } }, { text: " = (", options: { color: T.codeText } }, { text: "'짜장면', '짬뽕', '탕수육'", options: { color: "FCD34D" } }, { text: ")", options: { color: T.codeText } }], { x: MX, y: 1.7, w: 7.6, h: 0.7, fontFace: F.code, fontSize: 20, align: "center", valign: "middle" });
    boxes(s, MX + 0.9, 2.85, ["'짜장면'", "'짬뽕'", "'탕수육'"], { bw: 1.85, bh: 0.85, fs: 16, neg: true, color: T.cyan });
    const lock = await icon(fa.FaLock, "#38BDF8");
    s.addImage({ data: lock, x: MX + 6.6, y: 2.98, w: 0.55, h: 0.55 });
    const rx = MX + 7.95, rw = CW - 7.95;
    const feats = [["순서 유지", "인덱스 · 슬라이싱 가능"], ["변경 불가", "바꾸기 · 추가 · 삭제 ✗"], ["중복 허용", "같은 값 여러 번 OK"], ["괄호 생략 OK", "t = 1, 2, 3 도 튜플"]];
    feats.forEach(([k, v], i) => {
      const y = 1.7 + i * 0.95;
      card(s, rx, y, rw, 0.82, { fill: T.card });
      txt(s, [{ text: k + "  ", options: { fontFace: F.b, color: T.cyan } }, { text: v, options: { fontSize: 14 } }], { x: rx + 0.25, y, w: rw - 0.4, h: 0.82, fontSize: 16, valign: "middle" });
    });
    const hw = 3.65;
    codeOut(s, MX, 4.1, hw, ["t = 1, 2, 3", "print(t, type(t))"], "(1, 2, 3) <class 'tuple'>", { fs: 12, lh: 0.28, noNums: true, ofs: 12 });
    codeOut(s, MX + hw + 0.3, 4.1, hw, ["print(type(('a',)))", "print(type(('a')))"], "<class 'tuple'>\n<class 'str'>", { fs: 12, lh: 0.28, noNums: true, ofs: 12 });
    tip(s, MX + 7.95, 5.6, CW - 7.95, 1.2, "값이 1개면", "('a',) 처럼 쉼표 필수! ('a') 는 그냥 괄호 친 문자열이에요.", T.pink, 14);
    footer(s, SRC + " 3-3, " + PYT);
  }
  {
    const s = add();
    header(s, S33, "1) 검색 — 리스트와 똑같아요");
    const lw = 6.9;
    codeOut(s, MX, 1.65, lw, ["menu = ('짜장면', '짬뽕', '탕수육',", "        '라조기', '깐풍기', '짬뽕')", "print(menu[0], menu[-1])", "print(menu[1:3])", "print(menu[3:])", "print(menu.index('라조기'),", "      menu.count('짬뽕'), len(menu))"],
      "짜장면 짬뽕\n('짬뽕', '탕수육')\n('라조기', '깐풍기', '짬뽕')\n3 2 6", { fs: 13, lh: 0.27, ofs: 12 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const rows = [["코드", "뜻"], ["menu[0]", "첫 번째 값"], ["menu[1:3]", "1, 2번 → 튜플"], ["index(값)", "값의 위치"], ["count(값)", "값의 개수"], ["len(menu)", "전체 개수"]];
    table(s, rx, 1.65, rows, [2.4, rw - 2.4], { codeCols: [0], hl: { 0: T.cyan }, rowH: 0.52 });
    tip(s, rx, 4.95, rw, 1.15, "메서드는 2개뿐", "튜플은 바꿀 수 없으니 메서드도 index( ) · count( ) 두 개만 있어요!", T.yellow, 14);
    tip(s, MX, 6.3, CW, 0.5, "슬라이싱 결과", "튜플을 잘라도 결과는 튜플 ( ) — 리스트를 자르면 리스트 [ ] 였죠!", T.cyan, 15);
    footer(s, SRC + " 3-3");
  }
  {
    const s = add();
    header(s, S33, "2) 변경 불가 — 바꾸려고 하면 오류!");
    const hw = (CW - 0.4) / 2;
    txt(s, "✗  값 바꾸기", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeOut(s, MX, 2.05, hw, ["menu[0] = '우동'"], "TypeError: 'tuple' object does not\nsupport item assignment", { fs: 13, lh: 0.34 });
    const rx = MX + hw + 0.4;
    txt(s, "✗  값 추가하기", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeOut(s, rx, 2.05, hw, ["menu.append('우동')"], "AttributeError: 'tuple' object\nhas no attribute 'append'", { fs: 13, lh: 0.34 });
    card(s, MX, 4.5, CW, 1.6, { fill: T.card2 });
    const lock = await icon(fa.FaBoxOpen, "#FACC15");
    s.addImage({ data: lock, x: MX + 0.4, y: 4.85, w: 0.9, h: 0.9 });
    txt(s, [{ text: "봉인된 도시락 비유", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "한번 포장한 도시락은 반찬을 바꾸거나 더 넣을 수 없어요.", options: { breakLine: true } }, { text: "→ '실수로 바뀌면 안 되는 값'을 지킬 때 튜플을 써요. 덕분에 리스트보다 가볍고 빨라요." }],
      { x: MX + 1.6, y: 4.5, w: CW - 1.9, h: 1.6, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "오류 읽기", "item assignment = '칸에 값 넣기',  has no attribute = '그런 메서드(버튼) 없음'", T.cyan, 15);
    footer(s, SRC + " 3-3, " + PYT);
  }
  {
    const s = add();
    header(s, S33, "꼭 바꿔야 한다면? — 리스트로 풀었다가 다시 튜플로");
    // flow diagram
    const steps = [["튜플", "('a', 'b', 'c')", T.cyan], ["list( )", "봉인 풀기", T.accent2], ["리스트 수정", "['a', 'x', 'c']", T.green], ["tuple( )", "다시 봉인", T.yellow]];
    const bw = 2.55, gap = (CW - 4 * bw) / 3;
    steps.forEach(([h, d, c], i) => {
      const x = MX + i * (bw + gap);
      card(s, x, 1.6, bw, 0.85, { fill: T.card, line: c, lw: 1.5 });
      txt(s, h, { x, y: 1.62, w: bw, h: 0.42, fontFace: F.b, fontSize: 16, color: c, align: "center" });
      txt(s, d, { x, y: 2.0, w: bw, h: 0.38, fontFace: F.code, fontSize: 12, color: T.text, align: "center" });
      if (i < 3) s.addShape("rightArrow", { x: x + bw + 0.08, y: 1.88, w: gap - 0.16, h: 0.3, fill: { color: T.accent }, line: { type: "none" } });
    });
    const cw = (CW - 0.6) / 3;
    const parts = [["값 바꾸기", ["t = ('a', 'b', 'c')", "l = list(t)", "l[1] = 'x'", "t = tuple(l)", "print(t)"], "('a', 'x', 'c')"],
      ["값 추가하기", ["t = ('a', 'b')", "l = list(t)", "l.append('c')", "t = tuple(l)", "print(t)"], "('a', 'b', 'c')"],
      ["값 삭제하기", ["t = ('a', 'b', 'c')", "l = list(t)", "l.remove('a')", "t = tuple(l)", "print(t)"], "('b', 'c')"]];
    parts.forEach(([h, code, out], i) => {
      const x = MX + i * (cw + 0.3);
      txt(s, h, { x, y: 2.58, w: cw, h: 0.38, fontFace: F.b, fontSize: 16, color: T.yellow });
      codeOut(s, x, 2.98, cw, code, out, { fs: 12, lh: 0.27, ofs: 12 });
    });
    tip(s, MX, 6.3, CW, 0.5, "핵심", "list( ) 와 tuple( ) 은 서로 바꿔 주는 변환 함수 — int( ) · str( ) 처럼 '형 변환'이에요!", T.green, 15);
    footer(s, SRC + " 3-3");
  }
  {
    const s = add();
    header(s, S33, "3) 합치기 · 반복 · 언패킹(풀어 담기)");
    const hw = (CW - 0.4) / 2;
    txt(s, "+ 로 합치기,  * 로 반복", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["print(('a', 'b') + ('c',))", "print(('a', 'b') * 2)"], "('a', 'b', 'c')\n('a', 'b', 'a', 'b')", { fs: 13, lh: 0.34 });
    txt(s, "원본은 그대로, 새 튜플이 만들어져요 (문자열 + · * 와 같아요).", { x: MX, y: 4.72, w: hw, h: 0.4, fontSize: 13, color: T.text });
    const rx = MX + hw + 0.4;
    txt(s, "언패킹 — 한 번에 여러 변수로", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    codeOut(s, rx, 2.05, hw, ["x, y, z = (10, 20, 30)", "print(x, y, z)"], "10 20 30", { fs: 13, lh: 0.34 });
    // diagram
    boxes(s, rx + 0.4, 4.6, ["10", "20", "30"], { bw: 1.3, bh: 0.55, fs: 15, noIdx: true, color: T.green });
    ["x", "y", "z"].forEach((v, i) => {
      const bx = rx + 0.4 + i * 1.3;
      s.addShape("downArrow", { x: bx + 0.5, y: 5.2, w: 0.3, h: 0.35, fill: { color: T.green }, line: { type: "none" } });
      txt(s, v, { x: bx, y: 5.55, w: 1.3, h: 0.4, fontFace: F.code, fontSize: 17, color: T.cyan, align: "center" });
    });
    card(s, MX, 5.15, hw, 1.05, { fill: T.card2 });
    txt(s, [{ text: "실무 예 : 위치 좌표", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "busan = (35.1796, 129.0756)", options: { fontFace: F.code, fontSize: 13, color: T.codeText, breakLine: true } }, { text: "lat, lng = busan   # 위도, 경도", options: { fontFace: F.code, fontSize: 13, color: T.codeText } }],
      { x: MX + 0.3, y: 5.15, w: hw - 0.6, h: 1.05, fontSize: 14, valign: "middle", paraSpaceAfter: 1 });
    tip(s, MX, 6.3, CW, 0.5, "개수 맞추기", "왼쪽 변수 개수 = 튜플 값 개수! 다르면 ValueError 가 나요.", T.pink, 15);
    footer(s, SRC + " 3-3, " + PYT + " — Tuples and Sequences");
  }
  {
    const s = add();
    header(s, S33, "리스트 vs 튜플 — 언제 무엇을 쓸까?");
    const rows = [["비교", "리스트 [ ]", "튜플 ( )"], ["값 바꾸기 · 추가 · 삭제", "가능", "불가능"], ["메서드", "append · sort 등 많음", "index · count 2개"], ["속도 · 메모리", "보통", "더 가볍고 빠름"], ["안전성", "실수로 바뀔 수 있음", "바뀌지 않음 (보호)"], ["어울리는 데이터", "장바구니, 매일 매출, 명단", "요일, 좌표, 생년월일, 설정값"]];
    table(s, MX, 1.65, rows, [3.6, (CW - 3.6) / 2, (CW - 3.6) / 2], { hl: { 0: T.accent2, 1: T.text, 2: T.cyan }, rowH: 0.62, fs: 15 });
    codeOut(s, MX, 5.6, CW, ["week = ('월', '화', '수', '목', '금', '토', '일')   # 요일은 바뀔 일이 없으니 튜플!"], null, { fs: 13, lh: 0.34, noNums: true });
    footer(s, PYT + " — Tuples and Sequences");
  }
  await D.summary(S33, "3.3 튜플 핵심 정리", [
    ["만들기", "( ) 또는 괄호 생략 t = 1, 2, 3 — 값 1개면 ('a',) 쉼표 필수"],
    ["검색", "리스트와 같은 인덱싱 · 슬라이싱,  메서드는 index( ) · count( ) 뿐"],
    ["변경 불가", "menu[0] = … → TypeError,  바꾸려면 list( ) → 수정 → tuple( )"],
    ["활용", "+ 합치기 · * 반복 · 언패킹 x, y = (10, 20) — 고정값 보호용"],
  ], "이름으로 값을 찾는다면? → 3.4 딕셔너리");

  // ======================= 3.4 딕셔너리 =======================
  sec("3.4 딕셔너리");
  await D.divider("3.4", "딕셔너리 (dict)", "{ 키 : 값 } — 단어로 뜻을 찾는 사전", ["만들기 · 검색 (get · keys · values · items)", "추가 · 변경 · 삭제", "복사 · 중첩 · 실무 활용"], fa.FaBook);
  {
    const s = add();
    header(s, S34, "딕셔너리 만들기 — { 키 : 값,  키 : 값 }");
    s.addShape("roundRect", { x: MX, y: 1.7, w: CW, h: 0.7, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.yellow, width: 1 } });
    txt(s, [{ text: "dic", options: { color: T.cyan } }, { text: " = {", options: { color: T.codeText } }, { text: "'name'", options: { color: T.pink } }, { text: ": ", options: { color: T.codeText } }, { text: "'kim'", options: { color: "FCD34D" } }, { text: ", ", options: { color: T.codeText } },
      { text: "'age'", options: { color: T.pink } }, { text: ": ", options: { color: T.codeText } }, { text: "25", options: { color: "FCD34D" } }, { text: ", ", options: { color: T.codeText } }, { text: "'city'", options: { color: T.pink } }, { text: ": ", options: { color: T.codeText } }, { text: "'Busan'", options: { color: "FCD34D" } }, { text: "}", options: { color: T.codeText } }],
      { x: MX, y: 1.7, w: CW, h: 0.7, fontFace: F.code, fontSize: 20, align: "center", valign: "middle" });
    // key -> value diagram
    const pairs = [["'name'", "'kim'"], ["'age'", "25"], ["'city'", "'Busan'"]];
    txt(s, "키 (이름표)", { x: MX + 0.3, y: 2.6, w: 2.4, h: 0.35, fontFace: F.sb, fontSize: 14, color: T.pink, align: "center" });
    txt(s, "값 (내용)", { x: MX + 3.9, y: 2.6, w: 2.4, h: 0.35, fontFace: F.sb, fontSize: 14, color: T.yellow, align: "center" });
    pairs.forEach(([k, v], i) => {
      const y = 3.0 + i * 0.75;
      s.addShape("roundRect", { x: MX + 0.3, y, w: 2.4, h: 0.6, rectRadius: 0.1, fill: { color: T.pink, transparency: 75 }, line: { color: T.pink, width: 1.2 } });
      txt(s, k, { x: MX + 0.3, y, w: 2.4, h: 0.6, fontFace: F.code, fontSize: 15, color: T.white, align: "center", valign: "middle" });
      s.addShape("rightArrow", { x: MX + 2.9, y: y + 0.15, w: 0.8, h: 0.3, fill: { color: T.accent }, line: { type: "none" } });
      s.addShape("roundRect", { x: MX + 3.9, y, w: 2.4, h: 0.6, rectRadius: 0.1, fill: { color: T.card }, line: { color: T.yellow, width: 1.2 } });
      txt(s, v, { x: MX + 3.9, y, w: 2.4, h: 0.6, fontFace: F.code, fontSize: 15, color: T.yellow, align: "center", valign: "middle" });
    });
    const rx = MX + 6.9, rw = CW - 6.9;
    const feats = [["키로 찾기", "번호 대신 '이름표'로 값을 꺼내요"], ["키는 중복 불가", "같은 키를 또 쓰면 덮어써요"], ["변경 가능", "추가 · 수정 · 삭제 자유"], ["값은 아무거나", "숫자 · 문자 · 리스트 · 딕셔너리도 OK"]];
    feats.forEach(([k, v], i) => {
      const y = 2.6 + i * 0.82;
      card(s, rx, y, rw, 0.7, { fill: T.card });
      txt(s, [{ text: k + "  ", options: { fontFace: F.b, color: T.yellow } }, { text: v, options: { fontSize: 13 } }], { x: rx + 0.25, y, w: rw - 0.4, h: 0.7, fontSize: 15, valign: "middle" });
    });
    card(s, MX, 5.45, 6.3, 0.7, { fill: T.card2 });
    txt(s, [{ text: "사전 비유  ", options: { fontFace: F.b, color: T.yellow } }, { text: "'apple'(키)을 찾으면 '사과'(값)가 나와요!" }], { x: MX + 0.25, y: 5.45, w: 5.9, h: 0.7, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "실무 연결", "엑셀 한 행(row)의 '열 이름 : 값' = 딕셔너리 한 개!  JSON 데이터도 이 모양이에요.", T.cyan, 15);
    footer(s, SRC + " 3-4, " + PYT + " — Dictionaries");
  }
  {
    const s = add();
    header(s, S34, "1) 검색 — dic[키] 와 get(키)");
    const hw = (CW - 0.4) / 2;
    txt(s, "dic[키] — 없는 키면 오류", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["dic = {'name': 'kim', 'age': 25,", "       'city': 'Busan'}", "print(dic['name'])", "print(dic['phone'])"], "kim\nKeyError: 'phone'", { fs: 13, lh: 0.32 });
    const rx = MX + hw + 0.4;
    txt(s, "get(키) — 없으면 None (안전!)", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    codeOut(s, rx, 2.05, hw, ["print(dic.get('age'))", "print(dic.get('phone'))", "print(dic.get('phone', '없음'))"], "25\nNone\n없음", { fs: 13, lh: 0.32 });
    card(s, MX, 5.38, CW, 0.8, { fill: T.card2 });
    txt(s, [{ text: "편의점 비유  ", options: { fontFace: F.b, color: T.yellow } }, { text: "dic['phone'] = '그거 주세요!' → 없으면 오류로 멈춤.   get('phone', '없음') = '없으면 \"없음\"이라고 알려 주세요' → 멈추지 않아요." }],
      { x: MX + 0.3, y: 5.38, w: CW - 0.6, h: 0.8, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "인덱스 번호는 ✗", "dic[0] 처럼 번호로는 못 꺼내요 — 딕셔너리는 오직 '키'로! (len(dic) → 3, 'name' in dic → True)", T.pink, 14);
    footer(s, SRC + " 3-4");
  }
  {
    const s = add();
    header(s, S34, "키만 · 값만 · 둘 다 — keys( ) · values( ) · items( )");
    const lw = 7.3;
    codeOut(s, MX, 1.65, lw, ["print(dic.keys())", "print(dic.values())", "print(dic.items())"], "dict_keys(['name', 'age', 'city'])\ndict_values(['kim', 25, 'Busan'])\ndict_items([('name', 'kim'), ('age', 25),\n            ('city', 'Busan')])", { fs: 13, lh: 0.34, ofs: 12 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const m = [["keys( )", "키(이름표)만 모아 보기", T.pink], ["values( )", "값(내용)만 모아 보기", T.yellow], ["items( )", "(키, 값) 짝을 튜플로", T.green]];
    m.forEach(([k, d, c], i) => {
      const y = 1.65 + i * 0.85;
      card(s, rx, y, rw, 0.75, { fill: T.card, line: c, lw: 1.5 });
      txt(s, k, { x: rx + 0.2, y, w: 1.7, h: 0.75, fontFace: F.code, fontSize: 16, color: c, valign: "middle" });
      txt(s, d, { x: rx + 1.9, y, w: rw - 2.0, h: 0.75, fontSize: 14, valign: "middle" });
    });
    txt(s, "for 로 하나씩 꺼내기 (04장 미리보기)", { x: rx, y: 4.2, w: rw, h: 0.4, fontFace: F.b, fontSize: 14, color: T.cyan });
    codeOut(s, rx, 4.6, rw, ["for k, v in dic.items():", "    print(k, v)"], "name kim / age 25 / city Busan", { fs: 12, lh: 0.28, ofs: 12, oh: 0.5, noNums: true });
    tip(s, MX, 5.4, lw, 0.75, "리스트로 바꾸기", "list(dic.keys()) → ['name', 'age', 'city']", T.cyan, 14);
    footer(s, SRC + " 3-4, " + PYT + " — Looping Techniques");
    s.addNotes("실제 출력은 줄바꿈되어 name kim / age 25 / city Busan 이 세 줄로 나옵니다. 슬라이드에서는 공간상 / 로 구분했습니다.");
  }
  {
    const s = add();
    header(s, S34, "2) 추가 · 변경 — dic[키] = 값 하나로 둘 다!");
    const hw = (CW - 0.4) / 2;
    txt(s, "있는 키 → 변경,  없는 키 → 추가", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, MX, 2.05, hw, ["dic['age'] = 26          # 변경", "dic['phone'] = '010-1234-5678'", "print(dic)"], "{'name': 'kim', 'age': 26,\n 'city': 'Busan', 'phone': '010-1234-5678'}", { fs: 12, lh: 0.32, ofs: 11 });
    const rx = MX + hw + 0.4;
    txt(s, "update( ) — 여러 개를 한 번에", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.green });
    codeOut(s, rx, 2.05, hw, ["dic = {'name': 'kim', 'age': 25, 'city': 'Busan'}", "dic.update({'age': 27, 'job': 'student'})", "print(dic)"], "{'name': 'kim', 'age': 27,\n 'city': 'Busan', 'job': 'student'}", { fs: 11, lh: 0.32, ofs: 11 });
    card(s, MX, 5.1, CW, 1.05, { fill: T.card2 });
    txt(s, [{ text: "사물함 비유  ", options: { fontFace: F.b, color: T.yellow } }, { text: "이름표(키)가 붙은 사물함이 있으면 내용물만 갈아 넣고(변경), 없으면 새 사물함을 만들어요(추가). 같은 이름표의 사물함은 절대 2개가 될 수 없어요." }],
      { x: MX + 0.3, y: 5.1, w: CW - 0.6, h: 1.05, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "update 는", "여러 키를 한 번에 — 있는 키(age)는 변경, 없는 키(job)는 추가!", T.green, 15);
    footer(s, SRC + " 3-4");
  }
  {
    const s = add();
    header(s, S34, "setdefault( ) — '없을 때만' 추가하는 안전한 추가");
    const lw = 7.2;
    codeOut(s, MX, 1.65, lw, ["dic = {'name': 'kim', 'age': 25, 'city': 'Busan'}", "print(dic.setdefault('city', 'Seoul'))", "print(dic.setdefault('job', 'student'))", "print(dic)"],
      "Busan\nstudent\n{'name': 'kim', 'age': 25, 'city': 'Busan',\n 'job': 'student'}", { fs: 12, lh: 0.32, ofs: 12 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const m = [["'city' 는 이미 있음", "→ 기존 값 'Busan' 을 그대로 돌려줌 (Seoul 로 안 바뀜!)", T.pink], ["'job' 은 없음", "→ 'student' 로 새로 추가하고 그 값을 돌려줌", T.green]];
    m.forEach(([h, d, c], i) => {
      const y = 1.65 + i * 1.5;
      card(s, rx, y, rw, 1.3, { fill: T.card, line: c, lw: 1.5 });
      txt(s, [{ text: h, options: { fontFace: F.b, color: c, breakLine: true } }, { text: d, options: { fontSize: 14 } }], { x: rx + 0.25, y, w: rw - 0.5, h: 1.3, fontSize: 16, valign: "middle", paraSpaceAfter: 4 });
    });
    card(s, rx, 4.7, rw, 1.4, { fill: T.card2 });
    txt(s, [{ text: "dic[키] = 값 과 차이", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "dic['city'] = 'Seoul' 은 무조건 덮어쓰기, setdefault 는 이미 있으면 손대지 않아요." }], { x: rx + 0.25, y: 4.7, w: rw - 0.5, h: 1.4, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "기억법", "set + default = '기본값으로 설정' — 비어 있을 때만 기본값을 채워 넣어요.", T.cyan, 15);
    footer(s, SRC + " 3-4");
  }
  {
    const s = add();
    header(s, S34, "키 중복은 덮어쓰기 · fromkeys( ) 로 한 번에 만들기");
    const hw = (CW - 0.4) / 2;
    txt(s, "같은 키를 두 번 쓰면?", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeOut(s, MX, 2.05, hw, ["d = {20: 'son', 30: 'kim', 30: 'lee'}", "print(d)"], "{20: 'son', 30: 'lee'}", { fs: 13, lh: 0.34 });
    txt(s, "키 30 의 값 'kim' 이 나중 값 'lee' 로 덮어써져요. 키는 '주민번호'처럼 유일해야 해요.", { x: MX, y: 4.5, w: hw, h: 0.6, fontSize: 13, color: T.text });
    const rx = MX + hw + 0.4;
    txt(s, "dict.fromkeys(키 목록, 기본값)", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.code, fontSize: 16, color: T.green });
    codeOut(s, rx, 2.05, hw, ["score = dict.fromkeys(['kor', 'eng', 'math'], 0)", "print(score)"], "{'kor': 0, 'eng': 0, 'math': 0}", { fs: 12, lh: 0.34 });
    txt(s, "과목별 점수표를 0점으로 초기화 — 성적 입력 전 빈 양식 만들기!", { x: rx, y: 4.5, w: hw, h: 0.6, fontSize: 13, color: T.text });
    card(s, MX, 5.2, CW, 0.95, { fill: T.card2 });
    txt(s, [{ text: "키가 될 수 있는 것  ", options: { fontFace: F.b, color: T.yellow } }, { text: "숫자 · 문자열 · 튜플처럼 '바뀌지 않는 값'만! 리스트는 키가 될 수 없어요 (TypeError: unhashable type: 'list'). 값(value)에는 아무거나 넣을 수 있어요." }],
      { x: MX + 0.3, y: 5.2, w: CW - 0.6, h: 0.95, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "튜플의 쓸모", "좌표 (35, 129) 같은 튜플은 딕셔너리의 키로 쓸 수 있어요 — 바뀌지 않으니까!", T.cyan, 15);
    footer(s, SRC + " 3-4, " + PYT + " — Dictionaries");
  }
  {
    const s = add();
    header(s, S34, "3) 삭제 — pop · popitem · del · clear");
    const rows = [["방법", "하는 일", "예 (dic = {'name': 'kim', 'age': 25, 'city': 'Busan'})", "결과 dic"], ["pop(키)", "키로 삭제 + 값 돌려줌", "dic.pop('age')  → 25", "{'name': 'kim', 'city': 'Busan'}"], ["popitem( )", "마지막 쌍 삭제 + 돌려줌", "dic.popitem()  → ('city', 'Busan')", "{'name': 'kim', 'age': 25}"],
      ["del dic[키]", "키로 삭제", "del dic['city']", "{'name': 'kim', 'age': 25}"], ["clear( )", "전부 비우기", "dic.clear()", "{ }"]];
    table(s, MX, 1.65, rows, [2.0, 2.8, 4.6, CW - 9.4], { codeCols: [0, 2, 3], hl: { 0: T.yellow, 3: T.green }, rowH: 0.7, fs: 13, hfs: 13 });
    card(s, MX, 5.35, CW, 0.8, { fill: T.card2 });
    txt(s, [{ text: "리스트와 비교  ", options: { fontFace: F.b, color: T.yellow } }, { text: "리스트 pop(번호) ↔ 딕셔너리 pop(키).  딕셔너리엔 remove( ) 가 없어요!" }], { x: MX + 0.3, y: 5.35, w: CW - 0.6, h: 0.8, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "오류 주의", "dic.pop('phone') · del dic['phone'] → KeyError — 없는 키는 지울 수 없어요.", T.pink, 15);
    footer(s, SRC + " 3-4");
  }
  {
    const s = add();
    header(s, S34, "4) 복사 — 리스트와 똑같은 함정!");
    const hw = (CW - 0.4) / 2;
    txt(s, "✗  a = dic", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    codeOut(s, MX, 2.05, hw, ["dic = {'name': 'kim', 'age': 25}", "a = dic", "a['age'] = 99", "print(dic['age'])"], "99", { fs: 13, lh: 0.32 });
    txt(s, "a 를 고쳤는데 dic 도 바뀌었어요 — 같은 사전에 이름표만 2개!", { x: MX, y: 5.1, w: hw, h: 0.5, fontSize: 14, color: T.text });
    const rx = MX + hw + 0.4;
    txt(s, "✓  copy( ) 또는 dict( )", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    codeOut(s, rx, 2.05, hw, ["dic = {'name': 'kim', 'age': 25}", "b = dic.copy()      # dict(dic) 도 OK", "b['age'] = 30", "print(dic['age'], b['age'])"], "25 30", { fs: 13, lh: 0.32 });
    txt(s, "b 는 독립된 복사본 → 원본 dic 은 25 그대로!", { x: rx, y: 5.1, w: hw, h: 0.5, fontSize: 14, color: T.text });
    tip(s, MX, 5.9, CW, 0.6, "규칙 하나", "리스트 · 딕셔너리 · 집합처럼 '바뀌는' 데이터는 = 로 복사하지 말고 .copy( ) 를 쓰세요!", T.yellow, 15);
    footer(s, SRC + " 3-4");
  }
  {
    const s = add();
    header(s, S34, "5) 실무 활용 — 중첩 딕셔너리 · 메뉴판 · 개수 세기");
    const cw = (CW - 0.6) / 3;
    const parts = [["중첩 : 선수 명단", ["st = {1: {'name': 'son',", "           'age': 31},", "      2: {'name': 'karina',", "           'age': 24}}", "print(st[1]['age'])", "print(st[2]['name'])"], "31\nkarina", "st[1] 로 안쪽 사전 → ['age']"],
      ["메뉴판 : 주문 합계", ["price = {'아메리카노': 4500,", "         '라떼': 5000}", "order = ['라떼', '아메리카노',", "         '라떼']", "total = price['라떼'] * 2 \\", "      + price['아메리카노']", "print(total)"], "14500", "메뉴 이름(키)으로 가격 찾기"],
      ["개수 세기 : 방문 도시", ["cnt = {}", "for c in ['부산', '서울', '부산',", "          '대구', '부산']:", "    cnt[c] = cnt.get(c, 0) + 1", "print(cnt)"], "{'부산': 3, '서울': 1,\n '대구': 1}", "get(c, 0) — 처음이면 0부터"]];
    parts.forEach(([h, code, out, note], i) => {
      const x = MX + i * (cw + 0.3);
      txt(s, h, { x, y: 1.6, w: cw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
      const b = codeOut(s, x, 2.05, cw, code, out, { fs: 11, lh: 0.28, noNums: true, ofs: 11 });
      txt(s, note, { x, y: b + 0.1, w: cw, h: 0.4, fontSize: 13, color: T.text });
    });
    tip(s, MX, 6.3, CW, 0.5, "미리보기", "for 반복문은 04장에서 배워요. 지금은 '딕셔너리로 이런 것도 되는구나!' 정도면 충분해요.", T.cyan, 15);
    footer(s, SRC + " 3-4");
  }
  {
    const s = add();
    header(s, S34, "딕셔너리 메서드 한눈에 보기");
    const rows = [["메서드", "하는 일", "메서드", "하는 일"], ["get(키, 기본값)", "안전하게 값 꺼내기", "pop(키)", "키 삭제 + 값 반환"], ["keys( )", "키 목록", "popitem( )", "마지막 쌍 삭제 + 반환"], ["values( )", "값 목록", "clear( )", "전부 삭제"],
      ["items( )", "(키, 값) 목록", "copy( )", "복사본 만들기"], ["update(딕셔너리)", "여러 개 추가 · 변경", "setdefault(키, 값)", "없을 때만 추가"], ["dict.fromkeys(목록, 값)", "키 목록으로 새로 만들기", "—", "—"]];
    table(s, MX, 1.65, rows, [3.3, CW / 2 - 3.3, 3.0, CW / 2 - 3.0], { codeCols: [0, 2], hl: { 0: T.yellow, 2: T.yellow }, rowH: 0.6, fs: 14 });
    tip(s, MX, 6.0, CW, 0.7, "가장 많이 쓰는 3총사", "get( ) · items( ) · update( ) — 실무 데이터(JSON, API 응답)를 다룰 때 매일 써요!", T.green, 15);
    footer(s, SRC + " 3-4, " + PYT);
  }
  await D.summary(S34, "3.4 딕셔너리 핵심 정리", [
    ["만들기", "{ 키 : 값 } — 키는 중복 불가(덮어씀), 바뀌지 않는 값만 키 가능"],
    ["검색", "dic[키] (없으면 KeyError) · get(키, 기본값) · keys · values · items"],
    ["추가 · 변경", "dic[키] = 값 (있으면 변경, 없으면 추가) · update( ) · setdefault( )"],
    ["삭제 · 복사", "pop(키) · popitem( ) · del dic[키] · clear( ),  복사는 copy( )"],
  ], "중복 없이 모으려면? → 3.5 집합");
};
