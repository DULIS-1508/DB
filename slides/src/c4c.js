// 02장 · 02. 데이터 형식 — 2.4 (후반) 메서드 + 마무리
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox, hlRuns } = require("./lib");

module.exports = async function ({ D, add, sec, H }) {
  const { codeOut, table, SRC, PYT } = H;
  const S24 = "SECTION 2.4  ·  함수와 메서드";
  const STR = "Python Library — String Methods (docs.python.org/3/library/stdtypes.html)";

  // method family slide: left code+output, right list of methods
  async function methodSlide(title, Ic, color, methods, code, out, note, tipLabel, tipText) {
    const s = add();
    header(s, S24, title);
    const lw = 6.6;
    const b = codeOut(s, MX, 1.65, lw, code, out, { fs: 13, lh: 0.33 });
    if (note) txt(s, note, { x: MX, y: b + 0.12, w: lw, h: 0.6, fontSize: 14, color: T.text });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    methods.forEach(([m, d, ex], i) => {
      const y = 1.65 + i * 1.08;
      card(s, rx, y, rw, 0.95, { fill: T.card, line: color });
      txt(s, m, { x: rx + 0.2, y: y + 0.08, w: rw - 0.4, h: 0.4, fontFace: F.code, fontSize: 16, color });
      txt(s, [{ text: d + "   ", options: { fontSize: 14 } }, { text: ex, options: { fontFace: F.code, fontSize: 12, color: T.text } }], { x: rx + 0.2, y: y + 0.5, w: rw - 0.4, h: 0.38, valign: "middle" });
    });
    tip(s, MX, 6.3, CW, 0.5, tipLabel, tipText, T.green, 15);
    footer(s, STR);
    return s;
  }

  // ---------- 메서드 개념 ----------
  {
    const s = add();
    header(s, S24, "메서드란? — 그 데이터에 딸린 '전용 리모컨 버튼'");
    const cw = (CW - 0.6) / 3;
    const remotes = [[fa.FaTv, "TV 리모컨", ["채널 ▲▼", "음량 ＋－", "외부 입력"], "TV 에만 동작", T.cyan], [fa.FaSnowflake, "에어컨 리모컨", ["온도 ▲▼", "바람 세기", "제습 모드"], "에어컨에만 동작", T.green], [fa.FaFont, "문자열의 '버튼'", [".upper( )  대문자로", ".replace( )  바꾸기", ".split( )  나누기"], "문자열에만 동작", T.yellow]];
    for (let i = 0; i < 3; i++) {
      const [Ic, h, btns, d, c] = remotes[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.65, cw, 3.35, { fill: T.card, line: c, lw: 1.5 });
      await iconCircle(s, Ic, x + 0.3, 1.85, 0.75, c, "#FFFFFF", 55);
      txt(s, h, { x: x + 1.2, y: 1.85, w: cw - 1.35, h: 0.75, fontFace: F.b, fontSize: 18, valign: "middle" });
      btns.forEach((bt, j) => {
        s.addShape("roundRect", { x: x + 0.3, y: 2.85 + j * 0.55, w: cw - 0.6, h: 0.45, rectRadius: 0.22, fill: { color: c, transparency: 80 }, line: { type: "none" } });
        txt(s, bt, { x: x + 0.3, y: 2.85 + j * 0.55, w: cw - 0.6, h: 0.45, fontFace: i === 2 ? F.code : F.sb, fontSize: i === 2 ? 13 : 14, align: "center", valign: "middle" });
      });
      txt(s, d, { x, y: 4.5, w: cw, h: 0.4, fontSize: 14, color: c, align: "center" });
    }
    s.addShape("roundRect", { x: MX, y: 5.2, w: CW, h: 0.9, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.accent, width: 1 } });
    txt(s, [{ text: "menu", options: { color: T.cyan } }, { text: ".", options: { color: T.pink } }, { text: "upper", options: { color: T.yellow } }, { text: "( )", options: { color: T.codeText } }, { text: "      ←   'menu 의 대문자 버튼을 눌러라'", options: { fontFace: F.sb, color: T.text, fontSize: 16 } }],
      { x: MX + 0.4, y: 5.2, w: CW - 0.8, h: 0.9, fontFace: F.code, fontSize: 24, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "핵심", "메서드 = 특정 타입의 데이터에 딸린 함수.  점( . )은 '~의' 라고 읽으세요!", T.yellow);
    footer(s, PYT + " — Methods");
  }
  {
    const s = add();
    header(s, S24, "함수 vs 메서드 — 한 장으로 비교");
    const hw = (CW - 0.4) / 2;
    const cols = [["함수 (function)", "자판기 · 공용 도구", "이름( 데이터 )", "len('busan')", "5", "누구나 쓰는 도구 — 여러 타입에 사용", T.accent2],
      ["메서드 (method)", "리모컨 버튼 · 전용 기능", "데이터.이름( )", "'busan'.upper()", "'BUSAN'", "그 데이터 타입 전용 — 문자열에만, 숫자에만 …", T.yellow]];
    cols.forEach(([h, an, shape, ex, r, d, c], i) => {
      const x = MX + i * (hw + 0.4);
      card(s, x, 1.65, hw, 3.9, { fill: T.card, line: c, lw: 2 });
      txt(s, h, { x: x + 0.3, y: 1.8, w: hw - 0.6, h: 0.5, fontFace: F.b, fontSize: 22, color: c });
      txt(s, "비유 : " + an, { x: x + 0.3, y: 2.35, w: hw - 0.6, h: 0.4, fontSize: 15, color: T.text });
      txt(s, "모양", { x: x + 0.3, y: 2.95, w: 1.2, h: 0.5, fontFace: F.sb, fontSize: 15, color: T.muted, valign: "middle" });
      s.addShape("roundRect", { x: x + 1.5, y: 2.95, w: hw - 1.8, h: 0.5, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, shape, { x: x + 1.5, y: 2.95, w: hw - 1.8, h: 0.5, fontFace: F.code, fontSize: 16, color: c, align: "center", valign: "middle" });
      txt(s, "예", { x: x + 0.3, y: 3.6, w: 1.2, h: 0.5, fontFace: F.sb, fontSize: 15, color: T.muted, valign: "middle" });
      s.addShape("roundRect", { x: x + 1.5, y: 3.6, w: hw - 1.8, h: 0.5, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, ex + "  →  " + r, { x: x + 1.5, y: 3.6, w: hw - 1.8, h: 0.5, fontFace: F.code, fontSize: 14, color: T.codeText, align: "center", valign: "middle" });
      txt(s, d, { x: x + 0.3, y: 4.35, w: hw - 0.6, h: 0.9, fontSize: 15 });
    });
    card(s, MX, 5.7, CW, 0.5, { fill: T.card2 });
    txt(s, "구별법 :  이름이 맨 앞에 오면 함수,  데이터 뒤에 점( . )으로 붙으면 메서드!", { x: MX + 0.3, y: 5.7, w: CW - 0.6, h: 0.5, fontFace: F.sb, fontSize: 15, color: T.white, valign: "middle" });
    tip(s, MX, 6.35, CW, 0.45, "둘 다", "괄호( )를 붙여야 실행돼요. 넣을 값이 없어도 ( ) 는 꼭!", T.cyan, 14);
    footer(s, PYT);
  }
  {
    const s = add();
    header(s, S24, "같은 일, 다른 모양 — 예제로 익히기");
    const rows = [["하고 싶은 일", "함수로", "메서드로", "결과"], ["글자 수 세기", "len('busan')", "—", "5"], ["대문자로 바꾸기", "—", "'busan'.upper()", "'BUSAN'"], ["타입 확인", "type('busan')", "—", "<class 'str'>"], ["'a' 개수 세기", "—", "'banana'.count('a')", "3"], ["앞뒤 공백 지우기", "—", "' hi '.strip()", "'hi'"]];
    table(s, MX, 1.65, rows, [3.0, 3.0, 3.6, CW - 9.6], { codeCols: [1, 2, 3], hl: { 1: T.accent2, 2: T.yellow, 3: T.green }, rowH: 0.62 });
    card(s, MX, 5.55, CW, 0.6, { fill: T.card2 });
    txt(s, [{ text: "왜 둘로 나뉠까?  ", options: { fontFace: F.b, color: T.yellow } }, { text: "'글자 수 세기'는 여러 타입에 공통이라 함수, '대문자'는 글자에만 의미가 있어서 문자열의 메서드예요." }], { x: MX + 0.3, y: 5.55, w: CW - 0.6, h: 0.6, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "외울 필요 없어요", "자주 쓰다 보면 손이 기억해요. 헷갈리면 이 표를 다시 보세요!", T.green);
    footer(s, PYT);
  }

  // ---------- 문자열 메서드 6 묶음 ----------
  await methodSlide("문자열 메서드 ① 대소문자 바꾸기", fa.FaFont, T.yellow,
    [[".upper( )", "모두 대문자", "'apple' → 'APPLE'"], [".lower( )", "모두 소문자", "'HELLO' → 'hello'"], [".title( )", "단어 첫 글자만 대문자", "→ 'Hello Busan'"], [".capitalize( )", "문장 첫 글자만 대문자", "→ 'Hello busan'"]],
    ["m = 'apple'", "print(m.upper())", "print('HELLO'.lower())", "print('hello busan'.title())", "print('hello busan'.capitalize())"], "APPLE\nhello\nHello Busan\nHello busan",
    "영어 이름 · 이메일 · 상품 코드를 같은 모양으로 맞출 때 써요.", "실무 예", "'Seoul', 'SEOUL', 'seoul' 을 같은 도시로 세려면 → 먼저 .lower( ) 로 통일!");
  await methodSlide("문자열 메서드 ② 공백 지우기 — strip", fa.FaEraser, T.cyan,
    [[".strip( )", "양쪽 공백 지우기", "'  Busan  ' → 'Busan'"], [".lstrip( )", "왼쪽(left)만", "→ 'Busan  '"], [".rstrip( )", "오른쪽(right)만", "→ '  Busan'"]],
    ["city = '  Busan  '", "print('[' + city.strip() + ']')", "print('[' + city.lstrip() + ']')", "print('[' + city.rstrip() + ']')"], "[Busan]\n[Busan  ]\n[  Busan]",
    "[ ] 로 감싸서 출력하면 공백이 눈에 보여요.", "실무 예", "설문 · 회원가입 데이터에는 실수로 넣은 공백이 많아요 — 분석 전에 .strip( ) 은 기본!");
  await methodSlide("문자열 메서드 ③ 바꾸기 — replace", fa.FaExchangeAlt, T.pink,
    [[".replace(A, B)", "A 를 모두 B 로", "'tea' → 'coffee'"], [".replace(A, '')", "A 를 지우기", "'-' 지우기"], ["여러 번 연결", "차례로 바꾸기", ".replace(',', '').replace('원', '')"]],
    ["print('I like tea'.replace('tea', 'coffee'))", "print('010-1234-5678'.replace('-', ''))", "price = '4,500원'", "num = price.replace(',', '').replace('원', '')", "print(int(num) * 2)"], "I like coffee\n01012345678\n9000",
    "'4,500원' 은 글자라서 계산이 안 돼요 → 쉼표 · 원을 지우고 int( ) 로!", "실무 예", "엑셀에서 가져온 '1,234,000원' 같은 금액도 replace + int 로 숫자로 바꿔 계산해요.");
  {
    const s = add();
    header(s, S24, "문자열 메서드 ④ 찾기 · 세기");
    const word = "banana", n = word.length, bw = 0.9, x0 = MX + 0.3;
    txt(s, "t = 'banana'", { x: MX, y: 1.55, w: 5, h: 0.45, fontFace: F.code, fontSize: 18, color: T.codeText });
    for (let i = 0; i < n; i++) {
      const x = x0 + i * bw, c = word[i] === "n" ? T.pink : word[i] === "a" ? T.cyan : T.white;
      s.addShape("rect", { x, y: 2.1, w: bw, h: 0.8, fill: { color: T.card }, line: { color: T.accent2, width: 1.2 } });
      txt(s, word[i], { x, y: 2.1, w: bw, h: 0.8, fontFace: F.code, fontSize: 24, color: c, align: "center", valign: "middle" });
      txt(s, String(i), { x, y: 2.95, w: bw, h: 0.35, fontFace: F.code, fontSize: 13, color: T.muted, align: "center" });
    }
    const rows = [["메서드", "하는 일", "결과"], ["t.find('n')", "처음 나오는 위치", "2"], ["t.find('z')", "없으면 -1", "-1"], ["t.count('a')", "몇 번 나오나", "3"], ["t.startswith('ba')", "~로 시작하나", "True"], ["t.endswith('na')", "~로 끝나나", "True"]];
    table(s, MX, 3.55, rows, [3.0, 2.6, 1.3], { codeCols: [0, 2], hl: { 0: T.yellow, 2: T.green }, rowH: 0.44 });
    const rx = MX + 7.25, rw = CW - 7.25;
    txt(s, "실무 예 : 리뷰 분석", { x: rx, y: 1.6, w: rw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, rx, 2.05, rw, ["review = '맛있어요. 정말 맛있어요!'", "print(review.count('맛있'))", "print('맛있' in review)"], "2\nTrue", { fs: 12, lh: 0.34 });
    card(s, rx, 5.12, rw, 1.15, { fill: T.card2 });
    txt(s, [{ text: "in 과 find 의 차이", options: { fontFace: F.b, color: T.accent2, breakLine: true } }, { text: "in 은 '있다/없다(True/False)', find 는 '어디에 있나(위치 번호)'를 알려 줘요." }], { x: rx + 0.25, y: 5.12, w: rw - 0.5, h: 1.15, fontSize: 14, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.4, CW, 0.45, "기억", "위치 번호는 인덱스처럼 0부터 세요 — 'banana' 의 첫 'n' 은 2번!", T.green, 14);
    footer(s, STR);
  }
  await methodSlide("문자열 메서드 ⑤ 나누기 · 합치기 — split · join", fa.FaCut, T.green,
    [[".split(구분자)", "구분자로 잘라 리스트로", "'a,b,c' → ['a','b','c']"], [".split( )", "괄호가 비면 공백으로", "'Hello Busan' → 2조각"], ["'연결자'.join(목록)", "목록을 하나로 붙이기", "'-'.join([...])"]],
    ["line = 'seoul,busan,ulsan'", "print(line.split(','))", "print('Hello Busan World'.split())", "print('-'.join(['2026', '10', '05']))"], "['seoul', 'busan', 'ulsan']\n['Hello', 'Busan', 'World']\n2026-10-05",
    "split 결과의 [ ] 는 '리스트' — 03. 데이터 구조에서 배워요.", "실무 예", "CSV 파일 한 줄 'kim,25,부산' 을 split(',') 하면 이름 · 나이 · 지역으로 나뉘어요!");
  await methodSlide("문자열 메서드 ⑥ 확인하기 — is 로 시작하는 메서드", fa.FaCheckDouble, T.accent2,
    [[".isdigit( )", "숫자로만 되어 있나?", "'2026' → True"], [".isalpha( )", "문자로만 되어 있나?", "'Busan' → True"], ["결과", "항상 True 또는 False", "조건문(04장)과 함께"]],
    ["print('2026'.isdigit())", "print('20a6'.isdigit())", "print('Busan'.isalpha())", "print('Busan1'.isalpha())"], "True\nFalse\nTrue\nFalse",
    "is~ 메서드는 질문에 '예/아니오'로 답하는 버튼이에요.", "실무 예", "입력된 나이 · 전화번호가 숫자로만 되어 있는지 .isdigit( ) 으로 먼저 검사해요.");

  // ---------- 주의 & 응용 ----------
  {
    const s = add();
    header(s, S24, "가장 많이 하는 실수 — 메서드는 원본을 바꾸지 않아요!");
    const hw = (CW - 0.4) / 2;
    txt(s, "✗  메서드만 부르고 끝내면", { x: MX, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.pink });
    let b = codeOut(s, MX, 2.05, hw, ["s = 'busan'", "s.upper()       # 결과를 버림!", "print(s)"], "busan", { fs: 14, lh: 0.38 });
    txt(s, "대문자 결과가 만들어졌지만 아무 데도 담지 않아서 사라졌어요.", { x: MX, y: b + 0.12, w: hw, h: 0.6, fontSize: 14, color: T.text });
    const rx = MX + hw + 0.4;
    txt(s, "✓  결과를 변수에 다시 담기", { x: rx, y: 1.6, w: hw, h: 0.4, fontFace: F.b, fontSize: 17, color: T.green });
    b = codeOut(s, rx, 2.05, hw, ["s = 'busan'", "s = s.upper()   # 다시 담기!", "print(s)"], "BUSAN", { fs: 14, lh: 0.38 });
    txt(s, "s = s.upper( ) — 바뀐 결과를 다시 s 상자에 넣어야 해요.", { x: rx, y: b + 0.12, w: hw, h: 0.6, fontSize: 14, color: T.text });
    card(s, MX, 5.65, CW, 0.55, { fill: T.card2 });
    txt(s, [{ text: "비유 : 복사기  ", options: { fontFace: F.b, color: T.yellow } }, { text: "메서드는 원본을 고치지 않고 '고친 복사본'을 새로 만들 뿐 — 변수에 담지 않으면 버려져요." }],
      { x: MX + 0.3, y: 5.65, w: CW - 0.6, h: 0.55, fontSize: 14, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "왜 그럴까?", "문자열은 한 번 만들면 바꿀 수 없는(immutable) 데이터이기 때문이에요.", T.cyan);
    footer(s, STR);
  }
  {
    const s = add();
    header(s, S24, "메서드 이어 쓰기 — 컨베이어 벨트처럼 차례로");
    s.addShape("roundRect", { x: MX, y: 1.7, w: CW, h: 0.85, rectRadius: 0.1, fill: { color: T.codeBg }, line: { color: T.accent, width: 1 } });
    txt(s, [{ text: "'  hello busan  '", options: { color: "FCD34D" } }, { text: ".strip()", options: { color: T.cyan } }, { text: ".title()", options: { color: T.green } }], { x: MX, y: 1.7, w: CW, h: 0.85, fontFace: F.code, fontSize: 24, align: "center", valign: "middle" });
    const st = [["'  hello busan  '", "처음 값", T.muted], ["'hello busan'", ".strip( ) 으로 공백 제거", T.cyan], ["'Hello Busan'", ".title( ) 로 첫 글자 대문자", T.green]];
    const bw = 3.6, gap = (CW - 3 * bw) / 2;
    st.forEach(([v, d, c], i) => {
      const x = MX + i * (bw + gap);
      card(s, x, 2.9, bw, 1.6, { fill: T.card, line: c, lw: 1.5 });
      txt(s, v, { x, y: 3.0, w: bw, h: 0.75, fontFace: F.code, fontSize: 18, color: T.yellow, align: "center", valign: "middle" });
      txt(s, d, { x, y: 3.75, w: bw, h: 0.55, fontSize: 14, color: c, align: "center" });
      if (i < 2) s.addShape("rightArrow", { x: x + bw + 0.1, y: 3.5, w: gap - 0.2, h: 0.4, fill: { color: T.accent }, line: { type: "none" } });
    });
    txt(s, "실무 예 : 고객 이메일 정리", { x: MX, y: 4.75, w: 6, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    codeOut(s, MX, 5.2, 7.2, ["email = '  Kim@Example.COM '", "print(email.strip().lower())"], null, { fs: 13, lh: 0.32, noNums: true });
    outputBox(s, MX + 7.5, 5.2, CW - 7.5, 1.05, "kim@example.com", { fs: 15 });
    footer(s, STR);
  }
  {
    const s = add();
    header(s, S24, "종합 실습 — 엉망인 주문 데이터 깔끔하게 정리하기");
    const lw = 7.4;
    const b = codeOut(s, MX, 1.65, lw, ["name  = '  kim minsu '", "phone = '010-1234-5678'", "price = '4,500원'", "review = '맛있어요! 또 올게요. 정말 맛있어요'", "", "print(name.strip().title())", "print(phone.replace('-', ''))", "print(int(price.replace(',', '').replace('원', '')) * 3)", "print(review.count('맛있'), len(review))"],
      "Kim Minsu\n01012345678\n13500\n2 20", { fs: 12, lh: 0.3 });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    const used = [["이름 정리", ".strip( ) → .title( )"], ["번호 정리", ".replace('-', '')"], ["금액 계산", "replace → int( ) → × 3"], ["리뷰 분석", ".count( ) · len( )"]];
    txt(s, "사용한 도구", { x: rx, y: 1.65, w: rw, h: 0.4, fontFace: F.b, fontSize: 16, color: T.yellow });
    used.forEach(([k, v], i) => {
      const y = 2.15 + i * 0.85;
      card(s, rx, y, rw, 0.72, { fill: T.card });
      txt(s, k, { x: rx + 0.2, y, w: 1.5, h: 0.72, fontFace: F.b, fontSize: 15, color: T.accent2, valign: "middle" });
      txt(s, v, { x: rx + 1.7, y, w: rw - 1.8, h: 0.72, fontFace: F.code, fontSize: 13, valign: "middle" });
    });
    tip(s, rx, 5.65, rw, 0.65, "도전", "phone 에서 앞 3자리만 뽑아 보세요 (힌트 : [:3])", T.green, 14);
    footer(s, STR);
    s.addNotes("실제 데이터 분석의 80%는 이런 '데이터 정리(전처리)'입니다. 08장 pandas에서도 같은 메서드를 .str.strip(), .str.replace() 형태로 그대로 씁니다.");
  }
  {
    const s = add();
    header(s, S24, "메서드는 어떻게 찾을까? — 외우지 말고 찾아 쓰기");
    const cw = (CW - 0.6) / 3;
    const ways = [["① 점 찍고 기다리기", "Colab 에서 변수 뒤에 . 을 찍으면 사용할 수 있는 메서드 목록이 자동으로 떠요 (Tab 키)", "s.▌ → upper / lower / …", T.yellow], ["② dir( ) 로 목록 보기", "그 타입이 가진 메서드 이름을 모두 보여 줘요. 문자열 메서드는 47개!", "dir('')", T.cyan], ["③ help( ) 로 설명 보기", "메서드가 무슨 일을 하는지 설명을 보여 줘요 (영어)", "help(str.upper)", T.green]];
    ways.forEach(([h, d, ex, c], i) => {
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.7, cw, 3.6, { fill: T.card, line: c, lw: 1.5 });
      txt(s, h, { x: x + 0.3, y: 1.85, w: cw - 0.6, h: 0.5, fontFace: F.b, fontSize: 18, color: c });
      txt(s, d, { x: x + 0.3, y: 2.45, w: cw - 0.6, h: 1.6, fontSize: 15 });
      s.addShape("roundRect", { x: x + 0.3, y: 4.3, w: cw - 0.6, h: 0.6, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, ex, { x: x + 0.3, y: 4.3, w: cw - 0.6, h: 0.6, fontFace: F.code, fontSize: 15, color: T.codeText, align: "center", valign: "middle" });
    });
    card(s, MX, 5.5, CW, 0.65, { fill: T.card2 });
    txt(s, "이번 시간 꼭 기억할 메서드 :  upper · lower · strip · replace · split · count  — 이 6개면 충분해요!", { x: MX + 0.3, y: 5.5, w: CW - 0.6, h: 0.65, fontFace: F.sb, fontSize: 15, color: T.yellow, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "AI 도우미 활용", "Colab 의 Gemini 에게 '문자열에서 숫자만 남기는 메서드?' 처럼 물어봐도 좋아요. 단, 결과는 직접 실행해 확인!", T.cyan, 14);
    footer(s, STR);
  }
  {
    const s = add();
    header(s, S24, "함수 · 메서드에서 자주 만나는 오류 3가지");
    const errs = [["TypeError", "len(5)", "object of type 'int' has no len()", "숫자에는 '길이'가 없어요 → 타입 확인!"], ["AttributeError", "'abc'.push()", "'str' object has no attribute 'push'", "문자열에 없는 버튼(메서드) → 이름 · 철자 확인"], ["괄호 빠뜨림", "'busan'.upper", "<built-in method upper of str object …>", "오류는 아니지만 실행 안 됨 → ( ) 붙이기"]];
    errs.forEach(([n, code, msg, fix], i) => {
      const y = 1.7 + i * 1.45;
      card(s, MX, y, CW, 1.25, { fill: T.card });
      txt(s, n, { x: MX + 0.25, y: y + 0.1, w: 3.0, h: 0.45, fontFace: F.b, fontSize: 17, color: T.pink });
      s.addShape("roundRect", { x: MX + 0.25, y: y + 0.6, w: 3.0, h: 0.5, rectRadius: 0.08, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, code, { x: MX + 0.25, y: y + 0.6, w: 3.0, h: 0.5, fontFace: F.code, fontSize: 14, color: T.codeText, align: "center", valign: "middle" });
      txt(s, msg, { x: MX + 3.5, y: y + 0.1, w: CW - 3.7, h: 0.45, fontFace: F.code, fontSize: 13, color: T.pink, valign: "middle" });
      txt(s, "→ " + fix, { x: MX + 3.5, y: y + 0.6, w: CW - 3.7, h: 0.5, fontSize: 15, color: T.green, valign: "middle" });
    });
    tip(s, MX, 6.15, CW, 0.6, "읽는 요령", "오류 이름(TypeError · AttributeError …)이 곧 힌트! '타입 문제'인지 '없는 메서드'인지 먼저 구분하세요.", T.yellow, 15);
    footer(s, PYT + " — Errors and Exceptions");
  }
  await D.summary(S24, "2.4 핵심 정리 — 함수와 메서드", [
    ["함수", "자판기 — 이름(값) 모양,  len · type · print · round · max · min · sum"],
    ["메서드", "그 데이터 전용 리모컨 버튼 — 데이터.이름( ) 모양, 점(.) = '~의'"],
    ["문자열 메서드", "upper · lower · strip · replace · split · join · find · count · isdigit"],
    ["주의", "원본은 그대로 → s = s.upper( ) 처럼 다시 담기,  괄호( ) 꼭!"],
  ], "02. 데이터 형식 정리와 실습 체크리스트");

  // ---------- 마무리 ----------
  sec("마무리");
  {
    const s = add();
    header(s, "02. 데이터 형식 마무리", "실습 체크리스트 — Chap02 실습 노트북에서 해 보기");
    const tasks = [["타입 확인", "5 · 5.0 · '5' · True 를 type( ) 으로 확인"], ["형식 변환", "float(10) · int(3.14) · round(2.5) 결과 예상 후 실행"], ["인덱싱 · 슬라이싱", "'Hello Busan' 에서 'Busan' 꺼내기"], ["f-string", "f'{name}의 가격은 {price:,}원' 출력"], ["메서드 6종", "upper · lower · strip · replace · split · count"], ["종합 실습", "주문 데이터 정리 코드 직접 타이핑"]];
    const cw = (CW - 0.3) / 2, box = await icon(fa.FaRegSquare, "#FACC15");
    tasks.forEach(([h, d], i) => {
      const x = MX + Math.floor(i / 3) * (cw + 0.3), y = 1.7 + (i % 3) * 1.4;
      card(s, x, y, cw, 1.2, { fill: T.card });
      s.addImage({ data: box, x: x + 0.3, y: y + 0.38, w: 0.42, h: 0.42 });
      txt(s, (i + 1) + ". " + h, { x: x + 0.95, y: y + 0.14, w: cw - 1.1, h: 0.45, fontFace: F.b, fontSize: 17 });
      txt(s, d, { x: x + 0.95, y: y + 0.6, w: cw - 1.1, h: 0.5, fontSize: 14, color: T.text });
    });
    tip(s, MX, 6.0, CW, 0.7, "실습 노트북 활용", "빈 코드 셀에 슬라이드 예제를 직접 입력하며 따라 해 보세요. 결과를 먼저 예상하고 실행하면 실력이 쑥쑥!", T.green, 15);
    footer(s);
  }
  {
    const s = add();
    header(s, "02. 데이터 형식 마무리", "오늘 배운 것 한 장 요약");
    const q = [["2.1", "데이터 타입", "str · int · float · complex · list · dict · bool … — type( ) · 동적 타이핑"], ["2.2", "숫자형", "int(정수) · float(실수, 작은 오차) · complex — 변환은 int( ) 버림 · round( )"], ["2.3", "문자형", "따옴표 · 인덱싱 [0] · 슬라이싱 [시작:끝] · len · in · f-string"], ["2.4", "함수와 메서드", "함수 = 자판기 이름(값),  메서드 = 리모컨 버튼 데이터.이름( )"]];
    q.forEach(([n, h, d], i) => {
      const y = 1.7 + i * 1.05;
      card(s, MX, y, CW, 0.9, { fill: T.card });
      txt(s, n, { x: MX + 0.25, y, w: 0.9, h: 0.9, fontFace: F.xb, fontSize: 22, color: T.accent2, valign: "middle" });
      txt(s, h, { x: MX + 1.25, y, w: 2.4, h: 0.9, fontFace: F.b, fontSize: 18, valign: "middle" });
      txt(s, d, { x: MX + 3.7, y, w: CW - 3.9, h: 0.9, fontSize: 15, color: T.text, valign: "middle" });
    });
    tip(s, MX, 6.0, CW, 0.7, "다음 시간", "03. 데이터 구조 — 여러 값을 한 번에 담는 리스트 · 튜플 · 딕셔너리 · 집합 · 불린", T.cyan, 16);
    footer(s);
  }
  await D.refs("02. 데이터 형식 마무리", [
    "김진성. 「비즈니스 데이터 분석 with Python」 02장 — 02. 데이터 형식 (2.1 데이터 타입 · 숫자형 데이터 · 2.3 문자형 데이터 · 2.4 함수와 메서드). WikiDocs. https://wikidocs.net/205809",
    "김진성. Chap02 변수와 데이터 유형 실습 노트북 (.ipynb)",
    "Python Software Foundation. Built-in Types — Numeric Types, Text Sequence Type (str), String Methods. https://docs.python.org/3/library/stdtypes.html",
    "Python Software Foundation. Built-in Functions. https://docs.python.org/3/library/functions.html",
    "Python Software Foundation. The Python Tutorial — An Informal Introduction (Numbers, Text). https://docs.python.org/3/tutorial/introduction.html",
    "Python Software Foundation. The Python Tutorial — Formatted String Literals. https://docs.python.org/3/tutorial/inputoutput.html",
    "Python Software Foundation. Floating-Point Arithmetic: Issues and Limitations. https://docs.python.org/3/tutorial/floatingpoint.html",
    "Python Software Foundation. Errors and Exceptions. https://docs.python.org/3/tutorial/errors.html",
    "Microsoft Support. Excel specifications and limits (15자리 숫자 정밀도). https://support.microsoft.com",
  ]);
  await D.closing("02장 · 02. 데이터 형식");
};
