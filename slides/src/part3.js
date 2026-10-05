// Section 1.4 + closing
const si = require("react-icons/si");
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox } = require("./lib");

const GDP = [[1960, 9.9], [1965, 14.6], [1970, 21.7], [1975, 44.2], [1980, 84.4], [1985, 94.5], [1990, 168.7], [1995, 228.8], [2000, 248.4], [2005, 360.5], [2010, 532.4], [2015, 616.0], [2020, 701.7], [2023, 869.8]];

module.exports = async function ({ pres, add, sec, divider, summary, SRC, S14 }) {
  const EX = "FA6F6F"; // excel-side accent (soft red) for contrast with python yellow
  sec("1.4 파이썬이 필요한 이유");
  await divider("1.4", "파이썬이 필요한 이유", "엑셀도 좋지만, 엑셀만으로는 부족한 5가지 순간", ["빅데이터 · 웹 데이터 · 시각화", "반복 업무 자동화", "고급 분석과 머신러닝"], fa.FaChartLine);

  {
    const s = add();
    header(s, S14, "엑셀도 좋지만, 이럴 때는 파이썬이 필요해요");
    const r = [[fa.FaDatabase, "빅데이터 처리", "수백만 줄 데이터도 몇 초 만에"], [fa.FaGlobe, "웹 데이터 연계", "인터넷 데이터를 바로 불러오기"], [fa.FaChartPie, "다양한 시각화", "엑셀에 없는 그래프까지"],
      [fa.FaSyncAlt, "반복 업무 자동화", "매일 하는 일을 버튼 한 번에"], [fa.FaBrain, "고급 분석 · 모델링", "예측 · 머신러닝 · AI"]];
    const cw = (CW - 1.2) / 5;
    for (let i = 0; i < 5; i++) {
      const [Ic, h, d] = r[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.75, cw, 3.4, { fill: T.card });
      txt(s, "0" + (i + 1), { x: x + 0.25, y: 1.9, w: 1, h: 0.5, fontFace: F.xb, fontSize: 22, color: T.accent2 });
      await iconCircle(s, Ic, x + cw / 2 - 0.5, 2.45, 1.0);
      txt(s, h, { x: x + 0.1, y: 3.65, w: cw - 0.2, h: 0.45, fontFace: F.b, fontSize: 17, align: "center" });
      txt(s, d, { x: x + 0.15, y: 4.15, w: cw - 0.3, h: 0.8, fontSize: 14, color: T.text, align: "center" });
    }
    card(s, MX, 5.35, CW, 0.75, { fill: T.card2 });
    txt(s, [{ text: "오해 금지!  ", options: { fontFace: F.b, color: T.yellow } }, { text: "엑셀이 나쁜 도구라는 뜻이 아닙니다. 작은 표 정리는 엑셀, 크고 반복적이고 복잡한 분석은 파이썬 — 역할이 다릅니다." }],
      { x: MX + 0.3, y: 5.35, w: CW - 0.6, h: 0.75, fontSize: 15, valign: "middle" });
    footer(s, SRC);
  }

  // ---- 1) big data
  {
    const s = add();
    header(s, S14, "이유 1 · 빅데이터 — 세계은행 데이터는 얼마나 클까?");
    s.addImage({ data: await icon(si.SiKaggle, "#20BEFF"), x: MX, y: 1.62, w: 0.42, h: 0.42 });
    txt(s, "Kaggle 「World Development Indicators」 (세계은행)  ·  파일 : Indicators.csv", { x: MX + 0.55, y: 1.62, w: CW - 0.6, h: 0.42, fontFace: F.sb, fontSize: 16, color: T.text, valign: "middle" });
    const st = [["574.3MB", "파일 크기", T.yellow], ["150만+", "데이터 행 수", T.green], ["1,000+", "연간 지표 종류", T.cyan]];
    st.forEach(([n, l, c], i) => {
      const w = (CW - 0.6) / 3, x = MX + i * (w + 0.3);
      card(s, x, 2.25, w, 1.5, { fill: T.card });
      txt(s, n, { x: x + 0.3, y: 2.3, w: w - 0.6, h: 0.85, fontFace: F.xb, fontSize: 40, color: c });
      txt(s, l, { x: x + 0.3, y: 3.15, w: w - 0.6, h: 0.45, fontSize: 15, color: T.text });
    });
    txt(s, "어떤 데이터가 들어 있나?", { x: MX, y: 4.0, w: 6, h: 0.4, fontFace: F.b, fontSize: 17, color: T.accent2 });
    const tags = ["기대 수명", "출생률", "사망률", "영아 사망률", "이산화탄소 배출량", "노령 인구 부양비", "국제 이민자", "무기 수출", "유선 전화 가입", "…"];
    let x = MX, y = 4.5;
    tags.forEach((t) => {
      const w = 0.32 + t.length * 0.2;
      if (x + w > MX + CW) { x = MX; y += 0.55; }
      s.addShape("roundRect", { x, y, w, h: 0.42, rectRadius: 0.21, fill: { color: T.accent, transparency: 65 }, line: { type: "none" } });
      txt(s, t, { x, y, w, h: 0.42, fontSize: 14, align: "center", valign: "middle" });
      x += w + 0.15;
    });
    tip(s, MX, 6.3, CW, 0.5, "한마디로", "전 세계 수백 개 국가의 경제 발전 지표를 수십 년치 모아 둔 '초대형 표'입니다.");
    footer(s, SRC + ", Kaggle World Development Indicators");
  }
  {
    const s = add();
    header(s, S14, "이유 1 · 엑셀로 열면 vs 파이썬으로 열면");
    const hw = (CW - 0.4) / 2;
    card(s, MX, 1.65, hw, 2.9, { fill: T.card, line: EX, lw: 1.5 });
    s.addImage({ data: await icon(fa.FaFileExcel, "#" + EX), x: MX + 0.3, y: 1.85, w: 0.6, h: 0.6 });
    txt(s, "엑셀 (Excel)", { x: MX + 1.1, y: 1.85, w: hw - 1.3, h: 0.6, fontFace: F.b, fontSize: 20, valign: "middle" });
    ["파일 여는 데 한참 · 열리지 않기도 함", "수십만 줄 넘으면 멈춤 · 메모리 부족", "한 시트 최대 1,048,576행 — 넘으면 잘림"].forEach((t, i) => {
      txt(s, [{ text: "✗  ", options: { color: EX, fontFace: F.b } }, { text: t }], { x: MX + 0.35, y: 2.7 + i * 0.55, w: hw - 0.6, h: 0.45, fontSize: 15, valign: "middle" });
    });
    const rx = MX + hw + 0.4;
    card(s, rx, 1.65, hw, 2.9, { fill: T.card, line: T.yellow, lw: 1.5 });
    s.addImage({ data: await icon(si.SiPython, "#FACC15"), x: rx + 0.3, y: 1.85, w: 0.6, h: 0.6 });
    txt(s, "파이썬 (pandas)", { x: rx + 1.1, y: 1.85, w: hw - 1.3, h: 0.6, fontFace: F.b, fontSize: 20, valign: "middle" });
    ["574MB 파일도 코드 한 줄로 읽기", "실제로 약 3초도 채 걸리지 않음", "행 수 제한 없음 (컴퓨터 메모리만큼)"].forEach((t, i) => {
      txt(s, [{ text: "✓  ", options: { color: T.green, fontFace: F.b } }, { text: t }], { x: rx + 0.35, y: 2.7 + i * 0.55, w: hw - 0.6, h: 0.45, fontSize: 15, valign: "middle" });
    });
    const cb = codeBlock(s, MX, 4.75, 6.7, ["import pandas as pd", "indicator = pd.read_csv('/content/Indicators.csv')", "indicator"], { fs: 12, lh: 0.33, markers: { 0: 1, 1: 2, 2: 3 } });
    const ex = [["①", "pandas를 pd 라는 별명으로 빌려 오기"], ["②", "CSV 파일을 읽어 indicator 라는 이름에 담기"], ["③", "이름만 쓰면 표가 화면에 보임"]];
    ex.forEach(([n, t], i) => txt(s, [{ text: n + "  ", options: { fontFace: F.b, color: T.accent2 } }, { text: t }], { x: MX + 6.95, y: 4.85 + i * 0.47, w: CW - 6.95, h: 0.42, fontSize: 15, valign: "middle" }));
    footer(s, SRC + ", Microsoft 지원 'Excel 사양 및 제한'");
  }
  {
    const s = add();
    header(s, S14, "실제 비즈니스 데이터는 이만큼 큽니다");
    s.addImage({ data: await icon(fa.FaMotorcycle, "#FACC15"), x: MX, y: 1.65, w: 0.5, h: 0.5 });
    txt(s, "예시 : 중국 최대 배달 플랫폼 메이퇀(美团)의 하루 주문 건수 (2025년 기준)", { x: MX + 0.65, y: 1.65, w: CW - 0.7, h: 0.5, fontFace: F.b, fontSize: 18, valign: "middle" });
    const bars = [["엑셀 한 시트 최대", 0.105, "약 105만 행", T.muted], ["평소 하루 주문", 6, "약 6,000만 건", T.accent2], ["피크 · 프로모션", 15, "최대 1억 5,000만 건", T.yellow]];
    const bx = MX + 3.0, maxW = CW - 3.0 - 2.8;
    bars.forEach(([l, v, lab, c], i) => {
      const y = 2.6 + i * 1.05;
      txt(s, l, { x: MX, y, w: 2.85, h: 0.65, fontFace: F.sb, fontSize: 16, valign: "middle", align: "right" });
      s.addShape("rect", { x: bx, y: y + 0.08, w: Math.max(0.06, maxW * v / 15), h: 0.5, fill: { color: c }, line: { type: "none" } });
      txt(s, lab, { x: bx + Math.max(0.06, maxW * v / 15) + 0.15, y, w: 2.6, h: 0.65, fontFace: F.b, fontSize: 16, color: c, valign: "middle" });
    });
    tip(s, MX, 5.55, CW, 0.6, "생각해 보기", "엑셀 시트 한 장에는 하루 주문의 2%도 못 담습니다. 이런 데이터를 다루려면 파이썬 같은 도구가 필요해요.", T.yellow, 15);
    txt(s, "피크 시간 · 프로모션 기간에는 하루 1억 2,000만 ~ 1억 5,000만 건까지 폭증", { x: MX, y: 6.25, w: CW, h: 0.4, fontSize: 13, color: T.muted });
    footer(s, SRC + " (메이퇀 주문 수치), Microsoft Excel 사양");
  }

  // ---- 2) web
  {
    const s = add();
    header(s, S14, "이유 2 · 인터넷(Web)의 데이터와 바로 연결");
    const src = [[fa.FaLandmark, "공공데이터"], [fa.FaCoins, "금융 데이터"], [fa.FaNewspaper, "뉴스"], [fa.FaHashtag, "SNS"]];
    for (let i = 0; i < 4; i++) {
      const [Ic, l] = src[i];
      const y = 1.75 + i * 1.05;
      card(s, MX, y, 2.8, 0.85, { fill: T.card });
      s.addImage({ data: await icon(Ic, "#38BDF8"), x: MX + 0.25, y: y + 0.22, w: 0.42, h: 0.42 });
      txt(s, l, { x: MX + 0.85, y, w: 1.9, h: 0.85, fontFace: F.sb, fontSize: 16, valign: "middle" });
    }
    s.addShape("rightArrow", { x: MX + 3.0, y: 3.2, w: 1.0, h: 0.6, fill: { color: T.accent }, line: { type: "none" } });
    txt(s, "웹사이트 · API", { x: MX + 2.85, y: 3.85, w: 1.3, h: 0.4, fontSize: 12, color: T.muted, align: "center" });
    card(s, MX + 4.2, 2.3, 2.6, 2.4, { fill: T.card2, line: T.yellow, lw: 1.5 });
    s.addImage({ data: await icon(si.SiPython, "#FACC15"), x: MX + 5.1, y: 2.55, w: 0.8, h: 0.8 });
    txt(s, "파이썬이\n자동으로 수집", { x: MX + 4.2, y: 3.45, w: 2.6, h: 0.9, fontFace: F.b, fontSize: 16, align: "center" });
    s.addShape("rightArrow", { x: MX + 7.0, y: 3.2, w: 0.9, h: 0.6, fill: { color: T.accent }, line: { type: "none" } });
    card(s, MX + 8.1, 2.3, CW - 8.1, 2.4, { fill: T.card2 });
    await iconCircle(s, fa.FaChartLine, MX + 8.1 + (CW - 8.1) / 2 - 0.4, 2.55, 0.8, T.green, "#FFFFFF", 50);
    txt(s, "분석 · 시각화", { x: MX + 8.1, y: 3.5, w: CW - 8.1, h: 0.45, fontFace: F.b, fontSize: 16, align: "center" });
    card(s, MX + 4.2, 4.95, CW - 4.2, 1.1, { fill: T.card });
    txt(s, [{ text: "엑셀  ", options: { fontFace: F.b, color: EX } }, { text: "내 컴퓨터의 파일 중심 → 웹 데이터 자동 수집이 어려움", options: { breakLine: true } },
      { text: "파이썬  ", options: { fontFace: F.b, color: T.yellow } }, { text: "웹 스크래핑(Web Scraping) · API로 인터넷 데이터를 직접 가져옴" }],
      { x: MX + 4.45, y: 4.95, w: CW - 4.7, h: 1.1, fontSize: 15, valign: "middle", paraSpaceAfter: 4 });
    tip(s, MX, 6.3, CW, 0.5, "용어", "API = 프로그램끼리 데이터를 주고받는 '창구'.  웹 스크래핑 = 웹페이지 내용을 자동으로 긁어 오기 (11장)", T.cyan, 15);
    footer(s, SRC);
  }
  {
    const s = add();
    header(s, S14, "이유 2 · 코드 해설 — 인터넷의 GDP 데이터 바로 읽기");
    const lw = 7.6;
    const cb = codeBlock(s, MX, 1.65, lw, ["import pandas as pd", "url = \"https://raw.githubusercontent.com/datasets/gdp/", "       master/data/gdp.csv\"", "data = pd.read_csv(url)", "data.head()"], { fs: 13, lh: 0.3, markers: { 0: 1, 1: 2, 3: 3, 4: 4 } });
    const tbl = [["", "Country Name", "Country Code", "Year", "Value"], ["0", "Afghanistan", "AFG", "2000", "3.521418e+09"], ["1", "Afghanistan", "AFG", "2001", "2.813572e+09"], ["2", "Afghanistan", "AFG", "2002", "3.825701e+09"], ["3", "Afghanistan", "AFG", "2003", "4.520947e+09"], ["4", "Afghanistan", "AFG", "2004", "5.224897e+09"]]
      .map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: F.code, fontSize: 12, color: i === 0 ? T.white : j === 0 ? T.muted : T.codeText, bold: false, fill: { color: i === 0 ? "1E2A5A" : i % 2 ? T.card : T.deep }, align: j === 4 ? "right" : "left", margin: [0.02, 0.08, 0.02, 0.08] } })));
    txt(s, "실행 결과 (앞 5줄)", { x: MX, y: 1.65 + cb.h + 0.1, w: 4, h: 0.3, fontFace: F.sb, fontSize: 12, color: T.green });
    s.addTable(tbl, { x: MX, y: 1.65 + cb.h + 0.42, w: lw, colW: [0.5, 2.3, 1.6, 1.0, 2.2], rowH: 0.27, border: { type: "solid", color: "1E2A5A", pt: 0.5 } });
    const rx = MX + lw + 0.3, rw = CW - lw - 0.3;
    explainList(s, rx, 1.65, rw, [[1, "라이브러리 빌리기", "pandas → pd"], [2, "주소 저장", "CSV 파일의 인터넷 주소를 url 에 담기 (실제로는 한 줄)"], [3, "읽어 오기", "다운로드 없이 인터넷에서 바로 읽기"], [4, "앞부분 보기", "head() = 맨 앞 5줄만 미리 보기"]], { ih: 0.98, gap: 0.12 });
    tip(s, MX, 6.3, CW, 0.5, "읽는 법", "Value 의 3.521418e+09 = 3.52 × 10⁹ ≈ 35억 달러 (2000년 아프가니스탄 GDP)", T.cyan, 15);
    footer(s, SRC + ", datasets/gdp (github.com/datasets/gdp, 세계은행 자료)");
  }

  // ---- 3) visualization
  {
    const s = add();
    header(s, S14, "이유 3 · 숫자보다 그림 — 다양한 시각화");
    const hw = (CW - 0.4) / 2;
    card(s, MX, 1.65, hw, 2.3, { fill: T.card });
    txt(s, "엑셀 차트", { x: MX + 0.3, y: 1.8, w: hw - 0.6, h: 0.4, fontFace: F.b, fontSize: 18, color: EX });
    txt(s, "막대 · 꺾은선 · 원형 등 기본 차트는 쉽게 만들 수 있지만, 종류와 표현 방식(지도, 대화형, 수백 개 자동 생성 등)에 한계가 있습니다.", { x: MX + 0.3, y: 2.3, w: hw - 0.6, h: 1.5, fontSize: 15 });
    card(s, MX + hw + 0.4, 1.65, hw, 2.3, { fill: T.card });
    txt(s, "파이썬 시각화 라이브러리", { x: MX + hw + 0.7, y: 1.8, w: hw - 0.6, h: 0.4, fontFace: F.b, fontSize: 18, color: T.yellow });
    const libs = [[fa.FaChartBar, "#38BDF8", "Matplotlib", "기본 그래프의 표준"], [fa.FaChartArea, "#34D399", "Seaborn", "통계 그래프를 예쁘게"], [si.SiPlotly, "#C7D2FE", "Plotly", "마우스로 움직이는 대화형"]];
    for (let i = 0; i < 3; i++) {
      const [Ic, c, n, d] = libs[i];
      const y = 2.3 + i * 0.52;
      s.addImage({ data: await icon(Ic, c), x: MX + hw + 0.7, y: y + 0.07, w: 0.32, h: 0.32 });
      txt(s, [{ text: n + "  ", options: { fontFace: F.b } }, { text: d, options: { color: T.text } }], { x: MX + hw + 1.15, y, w: hw - 1.3, h: 0.46, fontSize: 15, valign: "middle" });
    }
    const kinds = [[fa.FaChartLine, "꺾은선 (추세)"], [fa.FaChartBar, "막대 (비교)"], [fa.FaChartPie, "원 (비율)"], [fa.FaBraille, "산점도 (관계)"], [fa.FaThLarge, "히트맵 (패턴)"], [fa.FaMapMarkedAlt, "지도 (10장)"]];
    const kw = (CW - 1.5) / 6;
    for (let i = 0; i < 6; i++) {
      const [Ic, l] = kinds[i];
      const x = MX + i * (kw + 0.3);
      card(s, x, 4.15, kw, 1.85, { fill: T.card2 });
      s.addImage({ data: await icon(Ic, "#818CF8"), x: x + kw / 2 - 0.4, y: 4.4, w: 0.8, h: 0.8 });
      txt(s, l, { x, y: 5.35, w: kw, h: 0.45, fontSize: 14, align: "center" });
    }
    tip(s, MX, 6.3, CW, 0.5, "왜 시각화?", "숫자 표로는 안 보이던 패턴과 추세가 그래프 한 장으로 한눈에 보입니다.");
    footer(s, SRC + ", matplotlib.org, seaborn.pydata.org, plotly.com");
  }
  async function gdpCodeSlide(title, lines, markers, items, kind) {
    const s = add();
    header(s, S14, title);
    const lw = 7.3;
    const cb = codeBlock(s, MX, 1.65, lw, lines, { fs: 12, lh: 0.3, markers });
    explainList(s, MX, 1.65 + cb.h + 0.15, lw, items, { ih: 0.55, gap: 0.08, inline: true });
    const rx = MX + lw + 0.3, rw = CW - lw - 0.3;
    card(s, rx, 1.65, rw, 4.45, { fill: T.card });
    txt(s, "실행 결과", { x: rx + 0.25, y: 1.75, w: 2, h: 0.3, fontFace: F.sb, fontSize: 12, color: T.green });
    const opts = { x: rx + 0.1, y: 2.05, w: rw - 0.2, h: 3.95, chartColors: [kind === "bar" ? T.accent2 : T.yellow], showLegend: false,
      catAxisLabelColor: T.text, valAxisLabelColor: T.text, catAxisLabelFontSize: 10, valAxisLabelFontSize: 10, catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt",
      valGridLine: { color: "1E2A5A", size: 0.5 }, catGridLine: { style: "none" }, showValAxisTitle: true, valAxisTitle: "GDP 합계 (조 달러)", valAxisTitleColor: T.text, valAxisTitleFontSize: 10, valAxisTitleFontFace: "+mn-lt",
      showCatAxisTitle: true, catAxisTitle: "Year", catAxisTitleColor: T.text, catAxisTitleFontSize: 10, catAxisTitleFontFace: "+mn-lt", plotArea: { fill: { color: T.card } } };
    if (kind === "bar") Object.assign(opts, { barDir: "col", barGapWidthPct: 40, showTitle: true, title: "World GDP by Year", titleColor: T.white, titleFontSize: 13, titleFontFace: "+mn-lt" });
    else Object.assign(opts, { lineSize: 3, lineDataSymbol: "none" });
    s.addChart(kind === "bar" ? pres.charts.BAR : pres.charts.LINE, [{ name: "GDP", labels: GDP.map((g) => String(g[0])), values: GDP.map((g) => g[1]) }], opts);
    return s;
  }
  {
    const s = await gdpCodeSlide("이유 3 · 코드 해설 — 꺾은선 그래프 그리기",
      ["import matplotlib.pyplot as plt", "", "data.groupby('Year')['Value'].sum().plot()", "plt.show()"], { 0: 1, 2: 2, 3: 3 },
      [[1, "도구 빌리기", "matplotlib.pyplot → plt"], [2, "묶고 · 합치고 · 그리기", "Year로 묶고 → Value 합계 → plot"], [3, "화면에 보여 주기", "plt.show()"]], "line");
    tip(s, MX, 6.3, CW, 0.5, "앞 슬라이드의 data 를 그대로 사용", "그래프 모양 : 1960년 이후 세계 경제 규모가 꾸준히 커진 추세가 한눈에 보입니다.", T.cyan, 14);
    footer(s, "datasets/gdp (세계은행) — 그래프는 해당 코드를 실제 실행한 결과 (5년 간격 표시)");
    s.addNotes("주의: 이 데이터에는 국가뿐 아니라 'World', 'High income' 같은 지역·소득 그룹 합계 행도 섞여 있어, 단순 합계(2023년 약 870조 달러)는 실제 세계 GDP(약 105조 달러)보다 훨씬 큽니다. 추세를 보는 용도로만 해석하고, 정확한 값은 Country Name == 'World' 행으로 확인하도록 안내하세요.");
  }
  {
    const s = await gdpCodeSlide("이유 3 · 코드 해설 — 막대그래프에 제목 · 축 이름 달기",
      ["import matplotlib.pyplot as plt", "data.groupby('Year')['Value'].sum().plot(kind='bar')", "plt.title('World GDP by Year')", "plt.xlabel('Year')", "plt.ylabel('GDP')", "plt.show()"], { 1: 1, 2: 2, 3: 3, 4: 3 },
      [[1, "kind='bar'", "그래프 종류를 막대로 (한 단어만 변경!)"], [2, "plt.title( )", "그래프 맨 위 제목"], [3, "plt.xlabel( ) / ylabel( )", "가로축 · 세로축 이름"]], "bar");
    tip(s, MX, 6.3, CW, 0.5, "포인트", "kind 값만 'line', 'bar', 'pie' … 로 바꾸면 다른 그래프가 됩니다. 9장에서 자세히 배워요.", T.yellow, 15);
    footer(s, "datasets/gdp (세계은행) — 그래프는 해당 코드를 실제 실행한 결과 (5년 간격 표시)");
  }

  // ---- 4) automation
  {
    const s = add();
    header(s, S14, "이유 4 · 매일 · 매주 · 매달 반복되는 업무");
    txt(s, "예) 매일 판매 데이터 정리 · 매주 매출 보고서 · 매월 고객 분석", { x: MX, y: 1.6, w: CW, h: 0.4, fontSize: 17, color: T.text });
    const steps = ["파일 열기", "데이터 정리", "수식 입력", "그래프 만들기"];
    txt(s, "엑셀 방식", { x: MX, y: 2.2, w: 3, h: 0.4, fontFace: F.b, fontSize: 18, color: EX });
    const sw = 2.15, sg = 0.35;
    steps.forEach((t, i) => {
      const x = MX + i * (sw + sg);
      card(s, x, 2.7, sw, 0.75, { fill: T.card, line: EX });
      txt(s, t, { x, y: 2.7, w: sw, h: 0.75, fontSize: 16, align: "center", valign: "middle" });
      if (i < 3) s.addShape("rightArrow", { x: x + sw + 0.05, y: 2.92, w: sg - 0.1, h: 0.3, fill: { color: T.muted }, line: { type: "none" } });
    });
    s.addImage({ data: await icon(fa.FaRedo, "#" + EX), x: MX + 4 * (sw + sg) - 0.1, y: 2.75, w: 0.6, h: 0.6 });
    txt(s, "× 매번\n처음부터", { x: MX + 4 * (sw + sg) + 0.6, y: 2.65, w: CW - 4 * (sw + sg) - 0.6, h: 0.85, fontFace: F.b, fontSize: 16, color: EX, valign: "middle" });
    txt(s, "파이썬 방식", { x: MX, y: 3.8, w: 3, h: 0.4, fontFace: F.b, fontSize: 18, color: T.yellow });
    card(s, MX, 4.3, 4 * sw + 3 * sg, 0.75, { fill: T.card, line: T.yellow });
    txt(s, "한 번 코드로 작성 (위 4단계를 코드에 담기)", { x: MX, y: 4.3, w: 4 * sw + 3 * sg, h: 0.75, fontSize: 16, align: "center", valign: "middle" });
    s.addImage({ data: await icon(fa.FaPlayCircle, "#34D399"), x: MX + 4 * (sw + sg) - 0.1, y: 4.37, w: 0.6, h: 0.6 });
    txt(s, "▶ 실행만\n반복", { x: MX + 4 * (sw + sg) + 0.6, y: 4.25, w: CW - 4 * (sw + sg) - 0.6, h: 0.85, fontFace: F.b, fontSize: 16, color: T.green, valign: "middle" });
    card(s, MX, 5.3, CW, 0.8, { fill: T.card2 });
    txt(s, "데이터가 조금만 바뀌어도 엑셀은 전 과정을 다시 해야 하지만, 파이썬은 새 데이터로 같은 코드를 다시 실행하면 끝입니다.", { x: MX + 0.3, y: 5.3, w: CW - 0.6, h: 0.8, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "업무 자동화", "'한 번 만들고, 계속 쓴다' — 실무자들이 파이썬을 배우는 가장 큰 이유입니다.", T.green);
    footer(s, SRC);
  }
  {
    const s = add();
    header(s, S14, "이유 4 · 코드 해설 — 여러 CSV 파일을 하나로 합치기");
    const files = ["sales_2022.csv", "sales_2023.csv", "sales_2024.csv"];
    for (let i = 0; i < 3; i++) {
      const y = 1.75 + i * 0.75;
      card(s, MX, y, 2.9, 0.6, { fill: T.card });
      s.addImage({ data: await icon(fa.FaFileCsv, "#34D399"), x: MX + 0.2, y: y + 0.13, w: 0.34, h: 0.34 });
      txt(s, files[i], { x: MX + 0.7, y, w: 2.1, h: 0.6, fontFace: F.code, fontSize: 13, valign: "middle" });
    }
    s.addShape("rightArrow", { x: MX + 3.05, y: 2.45, w: 0.8, h: 0.5, fill: { color: T.accent }, line: { type: "none" } });
    txt(s, "concat", { x: MX + 2.95, y: 2.95, w: 1.0, h: 0.3, fontFace: F.code, fontSize: 12, color: T.muted, align: "center" });
    card(s, MX + 4.0, 1.75, 2.4, 2.1, { fill: T.card2, line: T.yellow });
    s.addImage({ data: await icon(fa.FaTable, "#FACC15"), x: MX + 4.85, y: 2.0, w: 0.7, h: 0.7 });
    txt(s, "df\n(합쳐진 표 1개)", { x: MX + 4.0, y: 2.8, w: 2.4, h: 0.85, fontFace: F.b, fontSize: 14, align: "center" });
    codeBlock(s, MX, 4.1, 6.4, ["# 세 개의 CSV 파일을 하나의 데이터로 결합하기", "import pandas as pd", "import glob", "files = glob.glob('/content/*.csv')", "df = pd.concat([pd.read_csv(f) for f in files])", "df"], { fs: 12, lh: 0.28, markers: { 2: 1, 3: 2, 4: 3 } });
    const rx = MX + 6.7, rw = CW - 6.7;
    explainList(s, rx, 1.75, rw, [[1, "import glob", "파일 이름 패턴으로 파일을 찾아 주는 표준 라이브러리"], [2, "glob.glob('/content/*.csv')", "* = '아무 이름이나'. 폴더 안 모든 CSV 파일 목록 만들기"], [3, "pd.concat([ … for f in files ])", "목록의 파일을 하나씩 읽어(read_csv) 위아래로 이어 붙이기(concat)"]], { ih: 1.15, gap: 0.15 });
    tip(s, rx, 5.75, rw, 0.55, "엑셀이라면?", "파일 3개를 열어 복사 · 붙여넣기 반복", T.yellow, 14);
    footer(s, SRC);
  }
  {
    const s = add();
    header(s, S14, "이유 4 · 코드 해설 — 월별 매출 합계 (엑셀의 '통합' 기능)");
    const lw = 7.4;
    const cb = codeBlock(s, MX, 1.65, lw, ["# 월별 통합된 합계 계산하기 (엑셀 통합 기능)", "import pandas as pd", "import glob", "files = glob.glob('/content/*.csv')", "df = pd.concat([pd.read_csv(f) for f in files],", "               ignore_index=True)", "df.groupby('month')['sales'].sum()"], { fs: 12, lh: 0.28, markers: { 5: 1, 6: 2 } });
    explainList(s, MX, 1.65 + cb.h + 0.2, lw, [[1, "ignore_index=True", "합칠 때 행 번호를 0번부터 새로 매기기"], [2, "groupby('month')['sales'].sum()", "month(월)별로 묶어서 → sales(매출)를 → 합계"]], { ih: 0.72, gap: 0.08 });
    const rx = MX + lw + 0.3, rw = CW - lw - 0.3;
    card(s, rx, 1.65, rw, 4.45, { fill: T.card });
    txt(s, "groupby 를 그림으로", { x: rx + 0.25, y: 1.8, w: rw - 0.5, h: 0.4, fontFace: F.b, fontSize: 16, color: T.accent2 });
    const raw = [["1월", "100"], ["2월", "80"], ["1월", "50"], ["2월", "70"]];
    raw.forEach(([m, v], i) => {
      const y = 2.35 + i * 0.42;
      s.addShape("rect", { x: rx + 0.25, y, w: 1.6, h: 0.38, fill: { color: m === "1월" ? T.accent : T.cyan, transparency: 70 }, line: { type: "none" } });
      txt(s, m + "   " + v, { x: rx + 0.25, y, w: 1.6, h: 0.38, fontFace: F.code, fontSize: 13, align: "center", valign: "middle" });
    });
    s.addShape("rightArrow", { x: rx + 2.0, y: 2.85, w: 0.6, h: 0.4, fill: { color: T.accent }, line: { type: "none" } });
    [["1월", "150"], ["2월", "150"]].forEach(([m, v], i) => {
      const y = 2.6 + i * 0.5;
      s.addShape("rect", { x: rx + 2.75, y, w: rw - 3.0, h: 0.42, fill: { color: i ? T.cyan : T.accent, transparency: 40 }, line: { type: "none" } });
      txt(s, m + "   " + v, { x: rx + 2.75, y, w: rw - 3.0, h: 0.42, fontFace: F.code, fontSize: 13, align: "center", valign: "middle" });
    });
    txt(s, "같은 달끼리 모아서(group) 더한다(sum) = 엑셀의 '피벗 테이블 · 부분합'과 같은 일", { x: rx + 0.25, y: 4.25, w: rw - 0.5, h: 1.0, fontSize: 14 });
    txt(s, "(숫자는 이해를 돕기 위한 예시)", { x: rx + 0.25, y: 5.55, w: rw - 0.5, h: 0.35, fontSize: 11, color: T.muted });
    tip(s, MX, 6.3, CW, 0.5, "정리", "파이썬은 반복 작업을 자동화해 업무 효율을 크게 높여 줍니다.", T.green);
    footer(s, SRC);
  }

  // ---- 5) advanced analysis
  {
    const s = add();
    header(s, S14, "이유 5 · 예측하고 판단하는 고급 분석");
    const ex = [[fa.FaUserSlash, "고객 이탈 예측", "어떤 고객이 떠날까?"], [fa.FaChartLine, "매출 예측", "다음 달 매출은?"], [fa.FaThumbsUp, "추천 시스템", "이 고객이 좋아할 상품은?"], [fa.FaCreditCard, "신용 평가", "대출을 갚을 수 있을까?"]];
    const cw = (CW - 0.9) / 4;
    for (let i = 0; i < 4; i++) {
      const [Ic, h, q] = ex[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.7, cw, 2.3, { fill: T.card });
      await iconCircle(s, Ic, x + 0.3, 1.95, 0.8);
      txt(s, h, { x: x + 0.3, y: 2.9, w: cw - 0.5, h: 0.45, fontFace: F.b, fontSize: 18 });
      txt(s, q, { x: x + 0.3, y: 3.35, w: cw - 0.5, h: 0.5, fontSize: 14, color: T.text });
    }
    card(s, MX, 4.2, CW, 1.85, { fill: T.card2 });
    txt(s, [{ text: "엑셀만으로는  ", options: { fontFace: F.b, color: EX } }, { text: "복잡한 통계 분석이나 머신러닝 모델을 적용하기 어렵습니다.", options: { breakLine: true } },
      { text: "파이썬은  ", options: { fontFace: F.b, color: T.yellow } }, { text: "NumPy · Pandas · scikit-learn · TensorFlow · PyTorch 등으로 고급 분석과 머신러닝을 쉽게 구현합니다." }],
      { x: MX + 0.3, y: 4.25, w: CW - 2.6, h: 1.75, fontSize: 16, valign: "middle", paraSpaceAfter: 8 });
    const lg = [[si.SiScikitlearn, "#F7931E"], [si.SiTensorflow, "#FF6F00"], [si.SiPytorch, "#EE4C2C"]];
    for (let i = 0; i < 3; i++) s.addImage({ data: await icon(lg[i][0], lg[i][1]), x: MX + CW - 2.1 + i * 0.65, y: 4.85, w: 0.5, h: 0.5 });
    tip(s, MX, 6.3, CW, 0.5, "용어", "머신러닝 = 컴퓨터가 데이터 속 규칙을 스스로 학습해 예측하는 기술 (12장)", T.cyan);
    footer(s, SRC);
  }
  {
    const s = add();
    header(s, S14, "예시 · 광고비를 늘리면 매출이 얼마나 오를까?");
    // schematic scatter + line
    const px = MX, py = 1.75, pw = 6.2, ph = 4.0;
    card(s, px, py - 0.1, pw + 0.3, ph + 0.4, { fill: T.card });
    s.addShape("line", { x: px + 0.6, y: py + ph - 0.4, w: pw - 0.8, h: 0, line: { color: T.muted, width: 1.5 } });
    s.addShape("line", { x: px + 0.6, y: py + 0.2, w: 0, h: ph - 0.6, line: { color: T.muted, width: 1.5 } });
    txt(s, "광고비 (advertising) →", { x: px + 2.5, y: py + ph - 0.35, w: 3.5, h: 0.35, fontSize: 12, color: T.text, align: "right" });
    txt(s, "↑ 매출 (sales)", { x: px + 0.7, y: py + 0.15, w: 2.5, h: 0.35, fontSize: 12, color: T.text });
    const pts = [[0.1, 0.18], [0.18, 0.22], [0.25, 0.35], [0.33, 0.3], [0.42, 0.45], [0.5, 0.48], [0.58, 0.55], [0.66, 0.62], [0.75, 0.66], [0.84, 0.78], [0.92, 0.82]];
    const X = (u) => px + 0.6 + u * (pw - 0.9), Y = (v) => py + ph - 0.4 - v * (ph - 0.8);
    pts.forEach(([u, v]) => s.addShape("ellipse", { x: X(u) - 0.08, y: Y(v) - 0.08, w: 0.16, h: 0.16, fill: { color: T.accent2 }, line: { type: "none" } }));
    s.addShape("line", { x: X(0.05), y: Y(0.87), w: X(0.97) - X(0.05), h: Y(0.12) - Y(0.87), flipV: true, line: { color: T.yellow, width: 3 } });
    txt(s, "회귀선", { x: X(0.72), y: Y(0.92), w: 1.2, h: 0.35, fontFace: F.b, fontSize: 14, color: T.yellow });
    txt(s, "(모양 이해용 예시 그림)", { x: px + 0.6, y: py + ph - 0.05, w: 3, h: 0.3, fontSize: 11, color: T.muted });
    const rx = MX + pw + 0.6, rw = CW - pw - 0.6;
    txt(s, "선형 회귀 (Linear Regression)", { x: rx, y: 1.7, w: rw, h: 0.45, fontFace: F.b, fontSize: 19, color: T.accent2 });
    txt(s, "점들 사이를 가장 잘 지나는 직선을 찾아, 광고비로 매출을 예측합니다.", { x: rx, y: 2.2, w: rw, h: 0.75, fontSize: 15 });
    card(s, rx, 3.05, rw, 1.0, { fill: T.codeBg, line: T.yellow });
    txt(s, [{ text: "sales = ", options: { color: T.white } }, { text: "a", options: { color: T.yellow } }, { text: " × advertising + ", options: { color: T.white } }, { text: "b", options: { color: T.green } }],
      { x: rx, y: 3.05, w: rw, h: 1.0, fontFace: F.code, fontSize: 18, align: "center", valign: "middle" });
    txt(s, [{ text: "a  회귀계수 (기울기)  ", options: { fontFace: F.b, color: T.yellow } }, { text: "광고비 1 늘 때 매출이 늘어나는 양", options: { breakLine: true } },
      { text: "b  절편  ", options: { fontFace: F.b, color: T.green } }, { text: "광고비가 0일 때 기본 매출" }], { x: rx, y: 4.25, w: rw, h: 1.3, fontSize: 15, paraSpaceAfter: 8 });
    tip(s, MX, 6.3, CW, 0.5, "데이터 파일", "광고비와 매출액 데이터 : data.csv  (열 이름 advertising, sales)", T.cyan);
    footer(s, SRC);
  }
  {
    const s = add();
    header(s, S14, "이유 5 · 코드 해설 — 12줄로 만드는 머신러닝 모델");
    const lw = 7.4;
    codeBlock(s, MX, 1.6, lw, ["import pandas as pd", "from sklearn.linear_model import LinearRegression", "data = pd.read_csv('/content/data.csv')", "x = data[['advertising']]", "y = data['sales']", "model = LinearRegression()", "model.fit(x, y)",
      "a = model.coef_[0]", "b = model.intercept_", "print(\"회귀계수:\", a)", "print(\"절편:\", b)", "print(f\"회귀식: sales = {a:.2f} × advertising + {b:.2f}\")"], { fs: 12, lh: 0.31, markers: { 0: 1, 2: 2, 3: 3, 5: 4, 6: 4, 7: 5, 9: 6 } });
    const rx = MX + lw + 0.3, rw = CW - lw - 0.3;
    explainList(s, rx, 1.6, rw, [[1, "도구 준비", "pandas + 회귀 모델 빌리기"], [2, "데이터 읽기", "data.csv 불러오기"], [3, "x(원인) · y(결과) 정하기", "광고비 → 매출"], [4, "모델 만들고 학습", "fit = 데이터로 공부시키기"], [5, "결과 꺼내기", "기울기 a, 절편 b"], [6, "출력", ":.2f = 소수 둘째 자리까지"]], { ih: 0.7, gap: 0.05 });
    tip(s, MX, 6.3, CW, 0.5, "포인트", "복잡한 통계 계산은 라이브러리가 대신! 우리는 '무엇을 예측할지'만 정하면 됩니다.", T.green);
    footer(s, SRC + ", scikit-learn.org (LinearRegression)");
    s.addNotes("x 는 대괄호 두 겹 [[ ]] — 표(2차원) 형태로, y 는 한 겹 [ ] — 한 열(1차원)로 꺼낸다는 점은 08장에서 다시 설명합니다.");
  }

  // ---- 1.4 summary as Excel vs Python table
  {
    const s = add();
    header(s, S14, "1.4 핵심 정리 — 엑셀 vs 파이썬");
    const rows = [["상황", "엑셀", "파이썬"], ["빅데이터", "약 105만 행 제한 · 느려짐", "수백만 행도 몇 초"], ["웹 데이터", "로컬 파일 중심", "URL · API로 바로 수집"], ["시각화", "기본 차트 위주", "Matplotlib · Seaborn · Plotly"],
      ["반복 업무", "매번 손으로 다시", "코드 한 번 → 실행만 반복"], ["고급 분석", "통계 · 머신러닝 어려움", "scikit-learn · TensorFlow"]];
    const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: i === 0 || j === 0 ? F.b : F.r, fontSize: i === 0 ? 17 : 16,
      color: i === 0 ? T.white : j === 0 ? T.accent2 : j === 2 ? T.yellow : T.text, fill: { color: i === 0 ? (j === 1 ? "7A2E3A" : j === 2 ? "6B5410" : T.card2) : (i % 2 ? T.card : T.bg) }, align: j === 0 ? "left" : "center", valign: "middle", margin: [0.04, 0.15, 0.04, 0.15] } })));
    s.addTable(tbl, { x: MX, y: 1.7, w: CW, colW: [2.4, (CW - 2.4) / 2, (CW - 2.4) / 2], rowH: 0.68, border: { type: "solid", color: "1E2A5A", pt: 1 } });
    tip(s, MX, 6.15, CW, 0.6, "결론", "파이썬은 단순한 데이터 처리부터 통계 분석 · 예측 모델링 · 인공지능까지 할 수 있는 강력한 데이터 분석 도구입니다.", T.yellow, 15);
    footer(s, SRC);
  }

  // ---- chapter wrap-up
  sec("마무리");
  {
    const s = add();
    header(s, "01장 마무리", "오늘 배운 것 한 장 요약");
    const q = [["1.1", "파이썬은?", "1989년 귀도 반 로섬이 만든 '읽기 쉬운' 언어. 지금은 Python 3 시대, 인기 1위권"], ["1.2", "어디에 쓰나?", "에디터에 쓴다. 우리는 설치 없는 Google Colab 사용"],
      ["1.3", "어떻게 강력하나?", "라이브러리를 import 해서 빌려 쓴다. 외부 라이브러리는 pip로 설치"], ["1.4", "왜 배우나?", "빅데이터 · 웹 · 시각화 · 자동화 · 머신러닝 — 엑셀의 한계를 넘는다"]];
    q.forEach(([n, h, d], i) => {
      const y = 1.7 + i * 1.08;
      card(s, MX, y, CW, 0.92, { fill: T.card });
      txt(s, n, { x: MX + 0.25, y, w: 0.9, h: 0.92, fontFace: F.xb, fontSize: 22, color: T.accent2, valign: "middle" });
      txt(s, h, { x: MX + 1.2, y, w: 2.5, h: 0.92, fontFace: F.b, fontSize: 18, valign: "middle" });
      txt(s, d, { x: MX + 3.7, y, w: CW - 3.9, h: 0.92, fontSize: 16, color: T.text, valign: "middle" });
    });
    tip(s, MX, 6.15, CW, 0.6, "다음 시간", "Google Colab을 열고 직접 첫 코드를 실행해 봅니다!", T.cyan);
    footer(s);
  }
  {
    const s = add();
    header(s, "01장 마무리", "참고문헌 및 참고자료");
    const refs = [
      "김진성. 「비즈니스 데이터 분석 with Python」. WikiDocs. https://wikidocs.net/book/9257",
      "Python Software Foundation. The Python Standard Library. https://docs.python.org/3/library/",
      "Python Software Foundation. The Python Tutorial — Modules. https://docs.python.org/3/tutorial/modules.html",
      "Wikipedia. History of Python. https://en.wikipedia.org/wiki/History_of_Python",
      "Stack Overflow. (2025). 2025 Developer Survey. https://survey.stackoverflow.co/2025/",
      "IEEE Spectrum. (2025). The Top Programming Languages 2025. https://spectrum.ieee.org/top-programming-languages-2025",
      "TIOBE Software. TIOBE Index. https://www.tiobe.com/tiobe-index/",
      "Project Jupyter. https://jupyter.org  ·  Google Colab. https://colab.research.google.com",
      "Anaconda Documentation. https://docs.anaconda.com  ·  Conda User Guide. https://docs.conda.io",
      "pip documentation. https://pip.pypa.io  ·  PyPI. https://pypi.org",
      "pandas · NumPy · Matplotlib · scikit-learn · TensorFlow 공식 문서 (pandas.pydata.org, numpy.org, matplotlib.org, scikit-learn.org, tensorflow.org)",
      "Microsoft Support. Excel specifications and limits. https://support.microsoft.com",
      "Kaggle. World Development Indicators. https://www.kaggle.com/datasets/kaggle/world-development-indicators",
      "datasets/gdp — Country, Regional and World GDP. https://github.com/datasets/gdp",
    ];
    txt(s, refs.map((r, i) => ({ text: r, options: { bullet: { type: "number" }, breakLine: i < refs.length - 1 } })), { x: MX, y: 1.6, w: CW, h: 5.2, fontSize: 13, color: T.text, paraSpaceAfter: 4 });
    footer(s);
  }
  {
    const s = add();
    s.background = { color: T.bg };
    s.addShape("rect", { x: 0, y: 0, w: 0.08, h: 7.5, fill: { color: T.accent }, line: { type: "none" } });
    s.addImage({ data: await icon(si.SiPython, "#1E2A5A"), x: 8.6, y: 1.6, w: 4.0, h: 4.0 });
    txt(s, "감사합니다.", { x: 1.0, y: 2.6, w: 8, h: 1.1, fontFace: F.xb, fontSize: 54 });
    txt(s, "비즈니스 데이터 분석 with Python  ·  01장. 파이썬 준비", { x: 1.0, y: 3.8, w: 9, h: 0.5, fontSize: 20, color: T.text });
    txt(s, "질문은 언제든 환영합니다", { x: 1.0, y: 4.5, w: 8, h: 0.5, fontSize: 18, color: T.accent2 });
    footer(s);
  }
};
