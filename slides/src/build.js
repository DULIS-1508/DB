const pptxgen = require("pptxgenjs");
const si = require("react-icons/si");
const fa = require("react-icons/fa");
const fa6 = require("react-icons/fa6");
const vsc = require("react-icons/vsc");
const L = require("./lib");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox } = L;

const SRC = "wikidocs 「비즈니스 데이터 분석 with Python」(김진성)";
const S11 = "SECTION 1.1  ·  파이썬 역사", S12 = "SECTION 1.2  ·  파이썬 에디터", S13 = "SECTION 1.3  ·  파이썬 라이브러리", S14 = "SECTION 1.4  ·  파이썬이 필요한 이유";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "비즈니스 데이터 분석 with Python - 01장. 파이썬 준비";
pres.author = "김진성";

let curSection = null;
function sec(title) { curSection = title; pres.addSection({ title }); }
function add() { return pres.addSlide({ sectionTitle: curSection }); }

// ---------- reusable slide types ----------
async function divider(num, title, sub, items, Ic) {
  const s = add();
  s.background = { color: T.bg };
  s.addShape("rect", { x: 0, y: 0, w: W, h: 7.5, fill: { color: T.card }, line: { type: "none" } });
  s.addImage({ data: await icon(Ic, "#1E2A5A"), x: 8.3, y: 1.3, w: 4.6, h: 4.6 });
  txt(s, "SECTION", { x: 1.0, y: 1.55, w: 4, h: 0.4, fontFace: F.sb, fontSize: 18, color: T.accent2, charSpacing: 3 });
  txt(s, num, { x: 1.0, y: 1.95, w: 5, h: 1.2, fontFace: F.xb, fontSize: 72, color: T.accent2 });
  txt(s, title, { x: 1.0, y: 3.2, w: 8, h: 0.8, fontFace: F.b, fontSize: 40, color: T.white });
  txt(s, sub, { x: 1.0, y: 4.0, w: 8, h: 0.5, fontSize: 18, color: T.text });
  items.forEach((it, i) => {
    s.addShape("ellipse", { x: 1.0, y: 4.83 + i * 0.42, w: 0.12, h: 0.12, fill: { color: T.accent2 }, line: { type: "none" } });
    txt(s, it, { x: 1.3, y: 4.7 + i * 0.42, w: 7, h: 0.38, fontSize: 16, color: T.white, valign: "middle" });
  });
  footer(s);
}
async function summary(section, title, rows, next) {
  const s = add();
  header(s, section, title);
  for (let i = 0; i < rows.length; i++) {
    const [k, v] = rows[i];
    const y = 1.7 + i * 1.0;
    card(s, MX, y, CW, 0.85, { fill: T.card });
    s.addImage({ data: await icon(fa.FaCheckCircle, "#34D399"), x: MX + 0.25, y: y + 0.24, w: 0.38, h: 0.38 });
    txt(s, k, { x: MX + 0.85, y, w: 3.1, h: 0.85, fontFace: F.b, fontSize: 18, color: T.accent2, valign: "middle" });
    txt(s, v, { x: MX + 4.0, y, w: CW - 4.2, h: 0.85, fontSize: 16, valign: "middle" });
  }
  if (next) tip(s, MX, 6.3, CW, 0.5, "다음으로", next, T.cyan);
  footer(s);
  return s;
}

(async () => {
  // ================= 1. Title =================
  sec("표지");
  {
    const s = add();
    s.background = { color: T.bg };
    s.addShape("rect", { x: 0, y: 0, w: 0.08, h: 7.5, fill: { color: T.accent }, line: { type: "none" } });
    s.addImage({ data: await icon(si.SiPython, "#1E2A5A"), x: 8.6, y: 1.4, w: 4.2, h: 4.2 });
    txt(s, "PYTHON FOR BUSINESS DATA ANALYSIS", { x: 1.0, y: 1.6, w: 9, h: 0.4, fontFace: F.sb, fontSize: 18, color: T.accent2, charSpacing: 2 });
    txt(s, "비즈니스 데이터 분석 with Python", { x: 1.0, y: 2.1, w: 10, h: 0.9, fontFace: F.xb, fontSize: 44 });
    s.addShape("rect", { x: 1.0, y: 3.25, w: 1.6, h: 0.04, fill: { color: T.accent }, line: { type: "none" } });
    txt(s, "01장. 파이썬 준비", { x: 1.0, y: 3.55, w: 9, h: 0.7, fontFace: F.b, fontSize: 32 });
    txt(s, "01. 파이썬 이해  ·  1.1 역사 / 1.2 에디터 / 1.3 라이브러리 / 1.4 필요한 이유", { x: 1.0, y: 4.3, w: 9.5, h: 0.4, fontSize: 18, color: T.text });
    txt(s, "출처 : " + SRC, { x: 1.0, y: 6.3, w: 9, h: 0.35, fontSize: 13, color: T.muted });
    footer(s);
  }

  // ================= 2. Course overview =================
  {
    const s = add();
    header(s, "비즈니스 데이터 분석 with Python", "00. 수업 안내 — 한 학기 로드맵");
    const ch = ["01장. 파이썬 준비", "02장. 변수와 데이터 유형", "03장. 입력문과 출력문", "04장. 조건문과 반복문", "05장. 함수", "06장. 클래스와 상속", "07장. NumPy (수치 계산)",
      "08장. Pandas (데이터 처리)", "09장. Matplotlib (데이터 시각화)", "10장. Folium (지도)", "11장. BeautifulSoup (웹 크롤링)", "12장. 통계 분석과 머신 러닝", "13장. 공공 데이터 분석", "14장. 비즈니스 프로젝트"];
    const groups = [["파이썬 기초 문법", 0, 6, T.accent2], ["데이터 분석 도구", 6, 11, T.cyan], ["분석 실전", 11, 14, T.green]];
    const colW = (CW - 0.6) / 3;
    groups.forEach(([g, a, b, c], gi) => {
      const x = MX + gi * (colW + 0.3);
      txt(s, g, { x, y: 1.6, w: colW, h: 0.4, fontFace: F.b, fontSize: 18, color: c });
      for (let i = a; i < b; i++) {
        const y = 2.1 + (i - a) * 0.66;
        const on = i === 0;
        card(s, x, y, colW, 0.56, { fill: on ? T.accent : T.card, ft: on ? 30 : 0, line: on ? T.accent2 : undefined });
        txt(s, ch[i], { x: x + 0.25, y, w: colW - 0.4, h: 0.56, fontFace: on ? F.b : F.r, fontSize: 15, valign: "middle", color: on ? T.white : T.text });
      }
    });
    txt(s, "◀ 오늘 배울 내용", { x: MX + colW - 1.95, y: 2.1, w: 1.8, h: 0.56, fontFace: F.sb, fontSize: 13, color: T.yellow, align: "right", valign: "middle" });
    footer(s, SRC);
  }

  // ================= 3. Contents =================
  {
    const s = add();
    header(s, "비즈니스 데이터 분석 with Python", "Contents — 01장. 파이썬 준비");
    txt(s, "실습 파일 : Chap01_파이썬준비_실습.ipynb", { x: MX, y: 1.6, w: 8, h: 0.4, fontFace: F.sb, fontSize: 16, color: T.accent2 });
    const items = [
      ["1.1", "파이썬 역사", "파이썬은 누가, 왜 만들었을까?", fa.FaHistory],
      ["1.2", "파이썬 에디터", "코드는 어디에 쓰고 실행할까?", vsc.VscCode],
      ["1.3", "파이썬 라이브러리", "남이 만든 기능을 빌려 쓰는 법", fa.FaBook],
      ["1.4", "파이썬이 필요한 이유", "엑셀만으로는 부족한 5가지 순간", fa.FaChartLine],
    ];
    const cw = (CW - 0.9) / 4;
    for (let i = 0; i < 4; i++) {
      const [n, t, d, Ic] = items[i];
      const x = MX + i * (cw + 0.3), y = 2.3;
      card(s, x, y, cw, 3.9, { fill: T.card });
      await iconCircle(s, Ic, x + 0.3, y + 0.35, 0.9);
      txt(s, n, { x: x + 0.3, y: y + 1.5, w: cw - 0.6, h: 0.6, fontFace: F.xb, fontSize: 30, color: T.accent2 });
      txt(s, t, { x: x + 0.3, y: y + 2.15, w: cw - 0.4, h: 0.5, fontFace: F.b, fontSize: 19 });
      txt(s, d, { x: x + 0.3, y: y + 2.8, w: cw - 0.5, h: 0.9, fontSize: 15, color: T.text });
    }
    footer(s, SRC);
  }

  // ================= 4. Learning goals =================
  {
    const s = add();
    header(s, "01장 시작하기", "코딩이 처음이어도 괜찮아요");
    txt(s, "이번 장은 '코드를 잘 쓰는 법'이 아니라, 파이썬이 어떤 도구인지 감을 잡는 시간입니다.", { x: MX, y: 1.6, w: CW, h: 0.5, fontSize: 18, color: T.text });
    const goals = [
      [fa.FaHistory, "알아보기", "파이썬이 어떻게 생겨났고 왜 인기가 많은지 설명할 수 있다."],
      [vsc.VscCode, "구분하기", "코드를 쓰는 프로그램(에디터)의 종류와 차이를 구분할 수 있다."],
      [fa.FaBook, "이해하기", "라이브러리와 import, pip가 무엇인지 말로 설명할 수 있다."],
      [fa.FaChartLine, "비교하기", "엑셀 대신 파이썬을 쓰면 좋은 상황을 예로 들 수 있다."],
    ];
    for (let i = 0; i < 4; i++) {
      const [Ic, k, v] = goals[i];
      const x = MX + (i % 2) * (CW / 2 + 0.15), y = 2.35 + Math.floor(i / 2) * 1.65, w = CW / 2 - 0.15;
      card(s, x, y, w, 1.4, { fill: T.card });
      await iconCircle(s, Ic, x + 0.3, y + 0.3, 0.8);
      txt(s, "목표 " + (i + 1) + "  ·  " + k, { x: x + 1.35, y: y + 0.22, w: w - 1.6, h: 0.4, fontFace: F.b, fontSize: 17, color: T.accent2 });
      txt(s, v, { x: x + 1.35, y: y + 0.65, w: w - 1.6, h: 0.65, fontSize: 15 });
    }
    tip(s, MX, 6.0, CW, 0.6, "걱정 마세요", "오늘 나오는 코드는 '이런 게 가능하구나' 하고 구경만 해도 충분합니다. 문법은 02장부터 하나씩 배웁니다.", T.green, 15);
    footer(s);
  }

  // ================= 5. Glossary =================
  {
    const s = add();
    header(s, "01장 시작하기", "오늘 나오는 용어, 비유로 먼저 익히기");
    const g = [
      [fa.FaLanguage, "프로그래밍 언어", "컴퓨터와 대화하는 '외국어'", "파이썬은 그중 가장 배우기 쉬운 언어 중 하나"],
      [fa.FaCode, "코드 (Code)", "그 언어로 쓴 '명령문'", "예) print(\"안녕\") → 화면에 안녕을 써 줘"],
      [vsc.VscCode, "에디터 (Editor)", "코드를 쓰는 '워드 프로그램'", "한글·워드로 글을 쓰듯, 에디터로 코드를 씀"],
      [fa.FaBook, "라이브러리", "미리 만들어 둔 기능 '도서관'", "필요한 책(기능)을 빌려서(import) 사용"],
      [fa.FaDownload, "pip", "라이브러리를 받아오는 '앱스토어'", "pip install 이름 → 설치 끝"],
      [fa.FaBug, "디버깅 (Debugging)", "코드 속 '벌레(오류)' 잡기", "오류를 찾아서 고치는 과정"],
    ];
    const cw = (CW - 0.6) / 3;
    for (let i = 0; i < 6; i++) {
      const [Ic, k, a, b] = g[i];
      const x = MX + (i % 3) * (cw + 0.3), y = 1.65 + Math.floor(i / 3) * 2.55;
      card(s, x, y, cw, 2.3, { fill: T.card });
      await iconCircle(s, Ic, x + 0.25, y + 0.25, 0.7);
      txt(s, k, { x: x + 1.1, y: y + 0.25, w: cw - 1.3, h: 0.7, fontFace: F.b, fontSize: 18, valign: "middle" });
      txt(s, a, { x: x + 0.25, y: y + 1.1, w: cw - 0.5, h: 0.45, fontFace: F.sb, fontSize: 16, color: T.yellow });
      txt(s, b, { x: x + 0.25, y: y + 1.55, w: cw - 0.5, h: 0.6, fontSize: 14, color: T.text });
    }
    footer(s);
  }

  // ======================= SECTION 1.1 =======================
  sec("1.1 파이썬 역사");
  await divider("1.1", "파이썬 역사", "파이썬은 누가, 언제, 왜 만들었을까?", ["프로그래밍 언어란 무엇인가", "35년의 역사 타임라인", "파이썬이 쉬운 이유와 인기 순위"], si.SiPython);

  // programming language concept
  {
    const s = add();
    header(s, S11, "프로그래밍 언어 = 사람과 컴퓨터 사이의 통역");
    const y = 2.1, bw = 3.2, bh = 2.3;
    const boxes = [
      [fa.FaUser, "사람", "\"화면에 '안녕'이라고\n써 줘\"", T.accent2],
      [si.SiPython, "파이썬 코드", "print(\"안녕\")", T.yellow],
      [fa.FaDesktop, "컴퓨터", "화면에  안녕  출력", T.green],
    ];
    const gap = (CW - 3 * bw) / 2;
    for (let i = 0; i < 3; i++) {
      const [Ic, h, b, c] = boxes[i];
      const x = MX + i * (bw + gap);
      card(s, x, y, bw, bh, { fill: T.card, line: c, lw: 1.25 });
      s.addImage({ data: await icon(Ic, "#" + c), x: x + bw / 2 - 0.35, y: y + 0.3, w: 0.7, h: 0.7 });
      txt(s, h, { x, y: y + 1.05, w: bw, h: 0.45, fontFace: F.b, fontSize: 18, color: c, align: "center" });
      txt(s, b, { x: x + 0.2, y: y + 1.5, w: bw - 0.4, h: 0.7, fontFace: i === 1 ? F.code : F.r, fontSize: 16, align: "center", valign: "middle" });
      if (i < 2) {
        s.addShape("rightArrow", { x: x + bw + 0.25, y: y + bh / 2 - 0.25, w: gap - 0.5, h: 0.5, fill: { color: T.accent }, line: { type: "none" } });
        txt(s, i === 0 ? "코드로 작성" : "실행", { x: x + bw, y: y + bh / 2 + 0.35, w: gap, h: 0.35, fontSize: 13, color: T.muted, align: "center" });
      }
    }
    card(s, MX, 4.75, CW, 1.25, { fill: T.card2 });
    txt(s, [
      { text: "컴퓨터는 0과 1만 이해합니다. ", options: { fontFace: F.b, color: T.accent2 } },
      { text: "그래서 사람이 이해하기 쉬운 '프로그래밍 언어'로 명령을 쓰면, 컴퓨터가 알아들을 수 있게 바꿔서 실행해 줍니다. 파이썬은 영어 문장처럼 읽히도록 만들어져 처음 배우기에 좋습니다." },
    ], { x: MX + 0.3, y: 4.75, w: CW - 0.6, h: 1.25, fontSize: 16, valign: "middle" });
    tip(s, MX, 6.2, CW, 0.5, "한 줄 요약", "프로그래밍 언어는 컴퓨터에게 일을 시키기 위한 '외국어'이고, 파이썬은 그중 쉬운 언어입니다.");
    footer(s);
  }

  // timeline (approved test slide)
  {
    const s = add();
    header(s, S11, "파이썬, 한눈에 보는 35년의 역사");
    const tx = MX, tw = CW, ly = 2.55;
    s.addImage({ data: await icon(si.SiPython, "#FACC15"), x: tx, y: 1.62, w: 0.42, h: 0.42 });
    txt(s, "파이썬의 시간표", { x: tx + 0.55, y: 1.62, w: 4, h: 0.42, fontFace: F.b, fontSize: 18, valign: "middle" });
    s.addShape("line", { x: tx, y: ly + 0.35, w: tw, h: 0, line: { color: T.accent, width: 3 } });
    const ev = [["1989", "크리스마스 휴가 중\n취미로 개발 시작", T.accent2], ["1991", "첫 버전 공개\n(0.9.0)", T.accent2], ["2000", "Python 2.0\n유니코드 지원", T.accent2],
      ["2008", "Python 3.0\n지금 문법의 시작", T.yellow], ["2020", "Python 2\n공식 지원 종료", T.pink], ["2025", "Python 3.14\n최신 버전", T.green]];
    const step = tw / ev.length;
    ev.forEach(([yr, t, c], i) => {
      const cx = tx + step * (i + 0.5);
      txt(s, yr, { x: cx - 0.9, y: ly - 0.3, w: 1.8, h: 0.45, fontFace: F.xb, fontSize: 24, color: c, align: "center" });
      s.addShape("ellipse", { x: cx - 0.14, y: ly + 0.21, w: 0.28, h: 0.28, fill: { color: c }, line: { color: T.bg, width: 3 } });
      txt(s, t, { x: cx - 0.95, y: ly + 0.65, w: 1.9, h: 0.7, fontSize: 14, color: T.text, align: "center" });
    });
    const cy = 4.15, ch = 1.75, gap = 0.3, cw = (tw - 2 * gap) / 3;
    const cards = [[fa.FaUserTie, "누가 만들었나?", "귀도 반 로섬 (Guido van Rossum)\n네덜란드 출신 프로그래머"],
      [fa.FaTv, "왜 이름이 '파이썬'?", "영국 코미디 TV 쇼 〈몬티 파이썬〉\n에서 따온 이름 — 뱀이 아니에요!"],
      [fa.FaCodeBranch, "2 버전 vs 3 버전", "서로 호환되지 않아요.\n2는 2020년에 은퇴했습니다."]];
    for (let i = 0; i < 3; i++) {
      const [Ic, h, b] = cards[i];
      const x = tx + i * (cw + gap);
      card(s, x, cy, cw, ch, { fill: T.card });
      await iconCircle(s, Ic, x + 0.25, cy + 0.28, 0.6);
      txt(s, h, { x: x + 1.0, y: cy + 0.28, w: cw - 1.2, h: 0.6, fontFace: F.b, fontSize: 17, color: T.accent2, valign: "middle" });
      txt(s, b, { x: x + 0.25, y: cy + 1.0, w: cw - 0.45, h: 0.65, fontSize: 14 });
    }
    tip(s, tx, 6.2, tw, 0.5, "초보자 포인트", "수업에서는 Python 3을 씁니다. print 'hi' 처럼 괄호 없는 예제는 옛날 Python 2 코드예요.");
    footer(s, SRC + ", python.org 릴리스 기록");
    s.addNotes("파이썬은 1989년 귀도 반 로섬이 취미로 만들기 시작한 언어입니다. 이름은 뱀이 아니라 코미디 쇼에서 왔다는 점을 짚어 주세요. 2와 3은 호환되지 않으며, 수업에서는 Python 3을 사용합니다.");
  }

  // Guido / BDFL & community detail
  {
    const s = add();
    header(s, S11, "파이썬을 이끈 사람들과 커뮤니티");
    const lw = 5.6;
    card(s, MX, 1.7, lw, 4.35, { fill: T.card });
    await iconCircle(s, fa.FaUserTie, MX + 0.35, 2.0, 1.0);
    txt(s, "귀도 반 로섬", { x: MX + 1.6, y: 2.0, w: lw - 1.8, h: 0.5, fontFace: F.b, fontSize: 22 });
    txt(s, "Guido van Rossum · 네덜란드 CWI 연구소", { x: MX + 1.6, y: 2.5, w: lw - 1.8, h: 0.4, fontSize: 14, color: T.text });
    const facts = [["1989.12", "ABC 언어의 뒤를 잇는 언어로 개발 시작"], ["BDFL", "'자비로운 종신 독재자' — 커뮤니티가 붙여 준 별명"], ["2018.07", "리더 자리에서 물러나고 커뮤니티 운영으로 전환"]];
    facts.forEach(([k, v], i) => {
      const y = 3.35 + i * 0.85;
      txt(s, k, { x: MX + 0.35, y, w: 1.4, h: 0.6, fontFace: F.b, fontSize: 16, color: T.yellow, valign: "middle" });
      txt(s, v, { x: MX + 1.8, y, w: lw - 2.05, h: 0.6, fontSize: 15, valign: "middle" });
    });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    txt(s, "파이썬이 성장한 비결 : 열린 커뮤니티", { x: rx, y: 1.7, w: rw, h: 0.45, fontFace: F.b, fontSize: 18, color: T.accent2 });
    const flow = [[fa.FaUsers, "누구나 참여", "전 세계 개발자가 함께 개선 (2.0부터 커뮤니티 중심 개발)"], [fa.FaGift, "무료 · 오픈소스", "누구나 무료로 설치하고 사용 가능"], [fa.FaBuilding, "기업들도 채택", "Google, Dropbox, IBM, Cisco, Mozilla, Quora 등"]];
    for (let i = 0; i < 3; i++) {
      const [Ic, h, b] = flow[i];
      const y = 2.3 + i * 1.27;
      card(s, rx, y, rw, 1.1, { fill: T.card2 });
      await iconCircle(s, Ic, rx + 0.25, y + 0.2, 0.7);
      txt(s, h, { x: rx + 1.15, y: y + 0.13, w: rw - 1.35, h: 0.4, fontFace: F.b, fontSize: 16 });
      txt(s, b, { x: rx + 1.15, y: y + 0.53, w: rw - 1.35, h: 0.5, fontSize: 14, color: T.text });
    }
    tip(s, MX, 6.2, CW, 0.5, "알아 두기", "오픈소스 = 설계도(소스 코드)가 공개되어 누구나 보고, 쓰고, 고칠 수 있는 소프트웨어");
    footer(s, SRC + ", Wikipedia 'History of Python'");
  }

  // Why easy: Java vs Python hello world
  {
    const s = add();
    header(s, S11, "파이썬은 왜 '쉬운 언어'라고 할까?");
    txt(s, "똑같이 화면에 Hello, World! 를 출력하는 코드를 비교해 봅시다.", { x: MX, y: 1.6, w: CW, h: 0.45, fontSize: 18, color: T.text });
    const hw = (CW - 0.4) / 2;
    txt(s, "Java (자바)", { x: MX, y: 2.2, w: hw, h: 0.4, fontFace: F.b, fontSize: 18, color: T.orange });
    const jb = codeBlock(s, MX, 2.65, hw, ["public class Hello {", "  public static void main(String[] a) {", "    System.out.println(\"Hello, World!\");", "  }", "}"], { label: "Hello.java", fs: 13 });
    txt(s, "Python (파이썬)", { x: MX + hw + 0.4, y: 2.2, w: hw, h: 0.4, fontFace: F.b, fontSize: 18, color: T.yellow });
    codeBlock(s, MX + hw + 0.4, 2.65, hw, ["print(\"Hello, World!\")"], { label: "hello.py", fs: 16 });
    const rx = MX + hw + 0.4;
    const pts = [["단 1줄로 끝", "같은 일을 훨씬 짧게"], ["영어 문장처럼", "print = '출력해라'"], ["들여쓰기로 구분", "괄호 { } 대신 칸 맞추기"]];
    for (let i = 0; i < 3; i++) {
      const [k, v] = pts[i];
      const y = 3.75 + i * 0.75;
      card(s, rx, y, hw, 0.62, { fill: T.card });
      s.addImage({ data: await icon(fa.FaCheckCircle, "#34D399"), x: rx + 0.2, y: y + 0.17, w: 0.28, h: 0.28 });
      txt(s, k, { x: rx + 0.65, y, w: 2.2, h: 0.62, fontFace: F.b, fontSize: 16, color: T.yellow, valign: "middle" });
      txt(s, v, { x: rx + 2.85, y, w: hw - 3.0, h: 0.62, fontSize: 15, valign: "middle" });
    }
    txt(s, "자바는 5줄, 괄호와 세미콜론( ; )이 많아\n처음 보면 어디가 핵심인지 찾기 어렵습니다.", { x: MX, y: 2.65 + jb.h + 0.2, w: hw, h: 0.8, fontSize: 15, color: T.text });
    tip(s, MX, 6.2, CW, 0.5, "그래서", "파이썬은 '코드 읽기 쉬운 언어'로 불리며, 비전공자의 첫 프로그래밍 언어로 가장 많이 추천됩니다.");
    footer(s, "python.org, Oracle Java 문서");
  }

  const ctx = { pres, add, sec, divider, summary, SRC, S11, S12, S13, S14 };
  await require("./part2")(ctx);
  await require("./part3")(ctx);
  await pres.writeFile({ fileName: process.argv[2] || "CH01.pptx" });
})();
