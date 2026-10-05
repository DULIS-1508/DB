// 02장 · 02. 데이터 형식 (2-1 데이터 타입, 2-2 숫자형, 2-3 문자형) + 마무리
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox } = require("./lib");

module.exports = async function ({ D, add, sec, SRC, PYT, S32, codeOut }) {
  const S21 = "SECTION 2-1  ·  데이터 타입", S22 = "SECTION 2-2  ·  숫자형 데이터", S23 = "SECTION 2-3  ·  문자형 데이터";
  // ---- wrap-up
  sec("마무리");
  {
    const s = add();
    header(s, "01. 변수와 연산자 마무리", "실습 체크리스트 — Chap02 실습 노트북에서 해 보기");
    const tasks = [["변수 만들기", "price = 4500 처럼 할당하고 print 로 확인"], ["이름 규칙 실험", "2myvar = 1 을 실행해 SyntaxError 확인"], ["형 변환", "str(100) + '원',  int('3') + 3 실행"], ["전역 · 지역", "함수 안에서 만든 ji 를 밖에서 print → 오류 확인"], ["연산자 표 채우기", "9 와 2 로 + - * / // % ** 결과 확인"], ["축약 할당", "cal = 10 부터 += -= … 를 차례로 실행"]];
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
    header(s, "01. 변수와 연산자 마무리", "오늘 배운 것 한 장 요약");
    const q = [["1.1", "변수", "이름표 붙은 상자 — = 로 할당, 이름 규칙, type( ) · 형 변환, 다중 변수, print"], ["1.2", "범위", "전역(어디서나) vs 지역(함수 안만) — global · nonlocal"], ["1.3", "연산자", "산술 · 비교 · 논리 · ID · 멤버십 · 비트 · 축약 할당 · 우선순위"]];
    q.forEach(([n, h, d], i) => {
      const y = 1.75 + i * 1.3;
      card(s, MX, y, CW, 1.1, { fill: T.card });
      txt(s, n, { x: MX + 0.25, y, w: 0.9, h: 1.1, fontFace: F.xb, fontSize: 22, color: T.accent2, valign: "middle" });
      txt(s, h, { x: MX + 1.25, y, w: 2.2, h: 1.1, fontFace: F.b, fontSize: 18, valign: "middle" });
      txt(s, d, { x: MX + 3.5, y, w: CW - 3.7, h: 1.1, fontSize: 16, color: T.text, valign: "middle" });
    });
    tip(s, MX, 6.0, CW, 0.7, "다음 시간", "02. 데이터 형식 — 숫자형(int · float · complex)과 문자형(str) 데이터", T.cyan, 16);
    footer(s);
  }
  await D.refs("01. 변수와 연산자 마무리", [
    "김진성. 「비즈니스 데이터 분석 with Python」 02장. 변수와 데이터 유형 — 01. 변수와 연산자 (1.1 변수 · 1.2 전역 변수와 지역 변수 · 1.3 연산자). WikiDocs. https://wikidocs.net/205426",
    "김진성. Chap02 변수와 데이터 유형 실습 노트북 (.ipynb)",
    "Python Software Foundation. The Python Tutorial — An Informal Introduction to Python. https://docs.python.org/3/tutorial/introduction.html",
    "Python Software Foundation. The Python Tutorial — Defining Functions. https://docs.python.org/3/tutorial/controlflow.html",
    "Python Software Foundation. Built-in Functions. https://docs.python.org/3/library/functions.html",
    "Python Software Foundation. Expressions — Operator precedence. https://docs.python.org/3/reference/expressions.html",
    "Python Software Foundation. Lexical analysis — Identifiers and keywords. https://docs.python.org/3/reference/lexical_analysis.html",
    "PEP 8 — Style Guide for Python Code. https://peps.python.org/pep-0008/",
  ]);
  await D.closing("02장. 변수와 데이터 유형");
};
