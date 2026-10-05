// CH02 · 2.2 파이썬 패키지 설치
const si = require("react-icons/si");
const fa = require("react-icons/fa");
const { T, F, W, MX, CW, icon, header, footer, card, tip, iconCircle, numBadge, txt, codeBlock, explainList, outputBox, hlRuns } = require("./lib");

module.exports = async function ({ pres, add, sec, divider, summary, stepFlow, SRC, S22, ANA }) {
  const PIP = "pip documentation (pip.pypa.io)", CONDA = "conda User Guide (docs.conda.io)";
  sec("2.2 파이썬 패키지 설치");
  await divider("2.2", "파이썬 패키지 설치", "필요한 도구를 내 파이썬에 추가하기", ["패키지와 패키지 관리자 (pip · conda)", "꼭 알아야 할 명령어", "자주 만나는 오류와 해결"], fa.FaBoxOpen);

  {
    const s = add();
    header(s, S22, "복습 · 패키지 = 남이 만든 기능 묶음");
    const cw = (CW - 0.6) / 3;
    const boxes = [[si.SiPython, "#FACC15", "기본 탑재 (표준)", "파이썬만 설치해도 들어 있음", "math · random · datetime · os", T.accent2],
      [si.SiAnaconda, "#44A833", "Anaconda가 추가 설치", "Anaconda를 설치하면 함께 들어옴", "pandas · numpy · matplotlib …", T.green],
      [fa.FaPlusCircle, "#FACC15", "직접 추가 설치", "그 외 필요한 것은 사용자가 설치", "wordcloud · folium · …", T.yellow]];
    for (let i = 0; i < 3; i++) {
      const [Ic, c, h, d, ex, lc] = boxes[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.7, cw, 3.5, { fill: T.card, line: lc, lw: 1.25 });
      s.addImage({ data: await icon(Ic, c), x: x + 0.3, y: 1.95, w: 0.7, h: 0.7 });
      txt(s, h, { x: x + 0.3, y: 2.85, w: cw - 0.5, h: 0.45, fontFace: F.b, fontSize: 18, color: lc });
      txt(s, d, { x: x + 0.3, y: 3.35, w: cw - 0.5, h: 0.75, fontSize: 15 });
      s.addShape("roundRect", { x: x + 0.3, y: 4.25, w: cw - 0.6, h: 0.6, rectRadius: 0.1, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, ex, { x: x + 0.4, y: 4.25, w: cw - 0.8, h: 0.6, fontFace: F.code, fontSize: 13, color: T.codeText, valign: "middle", align: "center" });
    }
    card(s, MX, 5.4, CW, 0.7, { fill: T.card2 });
    txt(s, [{ text: "패키지(package) ≈ 라이브러리(library)  ", options: { fontFace: F.b, color: T.accent2 } }, { text: "— 이 수업에서는 같은 뜻으로 써도 괜찮습니다 (01장 1.3 참고)" }],
      { x: MX + 0.3, y: 5.4, w: CW - 0.6, h: 0.7, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "오늘의 질문", "③ 처럼 내 파이썬에 없는 패키지는 어떻게 설치할까?", T.yellow);
    footer(s, SRC + " 2-2");
  }
  {
    const s = add();
    header(s, S22, "패키지 관리자 = 파이썬의 '앱스토어 앱'");
    const hw = (CW - 0.4) / 2;
    const pm = [[si.SiPypi, "#FACC15", "pip", "파이썬 기본 패키지 관리자", ["파이썬을 설치하면 함께 설치됨", "PyPI(파이썬 패키지 저장소)에서 내려받음", "가장 많은 패키지를 찾을 수 있음"], "pip install pandas", T.yellow],
      [si.SiAnaconda, "#44A833", "conda", "Anaconda 전용 패키지 관리자", ["Anaconda 를 설치하면 함께 설치됨", "Anaconda 저장소 · conda-forge 에서 내려받음", "패키지끼리 버전이 맞도록 함께 관리"], "conda install pandas", T.green]];
    for (let i = 0; i < 2; i++) {
      const [Ic, c, n, d, pts, cmd, lc] = pm[i];
      const x = MX + i * (hw + 0.4);
      card(s, x, 1.7, hw, 4.35, { fill: T.card, line: lc, lw: 1.25 });
      s.addImage({ data: await icon(Ic, c), x: x + 0.3, y: 1.95, w: 0.75, h: 0.75 });
      txt(s, n, { x: x + 1.25, y: 1.92, w: hw - 1.5, h: 0.5, fontFace: F.xb, fontSize: 26, color: lc });
      txt(s, d, { x: x + 1.25, y: 2.4, w: hw - 1.5, h: 0.4, fontSize: 15, color: T.text });
      for (let j = 0; j < 3; j++) {
        const y = 3.05 + j * 0.55;
        s.addImage({ data: await icon(fa.FaCheck, "#818CF8"), x: x + 0.35, y: y + 0.12, w: 0.22, h: 0.22 });
        txt(s, pts[j], { x: x + 0.75, y, w: hw - 1.0, h: 0.46, fontSize: 15, valign: "middle" });
      }
      s.addShape("roundRect", { x: x + 0.3, y: 4.9, w: hw - 0.6, h: 0.75, rectRadius: 0.1, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, hlRuns(cmd), { x: x + 0.5, y: 4.9, w: hw - 1.0, h: 0.75, fontFace: F.code, fontSize: 18, valign: "middle" });
    }
    tip(s, MX, 6.3, CW, 0.5, "비유", "PyPI = 앱스토어,  pip / conda = 앱스토어 앱,  install = '받기' 버튼", T.cyan);
    footer(s, SRC + " 2-2, " + PIP + ", " + CONDA);
  }
  {
    const s = add();
    header(s, S22, "명령어는 어디에 입력할까?");
    const cw = (CW - 0.6) / 3;
    const where = [[fa.FaTerminal, "Anaconda Prompt\n(Mac : 터미널)", "pip install pandas", "그대로 입력", T.accent2],
      [si.SiJupyter, "Jupyter Notebook 셀", "%pip install pandas", "앞에 % 를 붙임", "F37626"],
      [si.SiGooglecolab, "Google Colab 셀", "!pip install pandas", "앞에 ! 를 붙임", T.yellow]];
    for (let i = 0; i < 3; i++) {
      const [Ic, h, cmd, note, c] = where[i];
      const x = MX + i * (cw + 0.3);
      card(s, x, 1.7, cw, 3.7, { fill: T.card, line: c, lw: 1.25 });
      await iconCircle(s, Ic, x + cw / 2 - 0.45, 1.95, 0.9, c, "#FFFFFF", 55);
      txt(s, h, { x: x + 0.2, y: 3.0, w: cw - 0.4, h: 0.8, fontFace: F.b, fontSize: 17, align: "center", valign: "middle" });
      s.addShape("roundRect", { x: x + 0.25, y: 3.95, w: cw - 0.5, h: 0.6, rectRadius: 0.1, fill: { color: T.codeBg }, line: { type: "none" } });
      txt(s, hlRuns(cmd), { x: x + 0.3, y: 3.95, w: cw - 0.6, h: 0.6, fontFace: F.code, fontSize: 15, align: "center", valign: "middle" });
      txt(s, note, { x: x + 0.2, y: 4.7, w: cw - 0.4, h: 0.45, fontFace: F.sb, fontSize: 15, color: c, align: "center" });
    }
    card(s, MX, 5.55, CW, 0.6, { fill: T.card2 });
    txt(s, [{ text: "! 와 % 의 뜻  ", options: { fontFace: F.b, color: T.accent2 } }, { text: "'이건 파이썬 코드가 아니라 명령어(터미널) 줄이야' 라고 노트북에 알려 주는 표시" }],
      { x: MX + 0.3, y: 5.55, w: CW - 0.6, h: 0.6, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "우리 수업", "Colab 셀에서  !pip install 패키지이름  만 기억하세요!", T.yellow);
    footer(s, PIP + ", IPython %pip magic, Google Colab");
  }
  {
    const s = add();
    header(s, S22, "pip 필수 명령어 6가지");
    const cmds = [["pip install 패키지", "설치하기", "pip install wordcloud", fa.FaDownload], ["pip install 패키지==버전", "특정 버전 설치", "pip install pandas==2.2.3", fa.FaTag], ["pip install --upgrade 패키지", "최신 버전으로 업데이트", "pip install --upgrade pandas", fa.FaArrowUp],
      ["pip uninstall 패키지", "삭제하기", "pip uninstall wordcloud", fa.FaTrashAlt], ["pip list", "설치된 패키지 목록 보기", "pip list", fa.FaListUl], ["pip show 패키지", "패키지 정보(버전 등) 보기", "pip show pandas", fa.FaInfoCircle]];
    for (let i = 0; i < 6; i++) {
      const [c, d, ex, Ic] = cmds[i];
      const y = 1.7 + i * 0.73;
      card(s, MX, y, CW, 0.63, { fill: i % 2 ? T.card2 : T.card });
      s.addImage({ data: await icon(Ic, "#818CF8"), x: MX + 0.25, y: y + 0.17, w: 0.3, h: 0.3 });
      txt(s, hlRuns(c), { x: MX + 0.8, y, w: 4.6, h: 0.63, fontFace: F.code, fontSize: 15, valign: "middle" });
      txt(s, d, { x: MX + 5.5, y, w: 3.0, h: 0.63, fontFace: F.sb, fontSize: 15, color: T.yellow, valign: "middle" });
      txt(s, "예) " + ex, { x: MX + 8.5, y, w: CW - 8.6, h: 0.63, fontFace: F.code, fontSize: 12, color: T.text, valign: "middle" });
    }
    tip(s, MX, 6.2, CW, 0.55, "Colab 에서는", "모든 명령 앞에 ! 를 붙여요 →  !pip install wordcloud,  !pip list", T.yellow);
    footer(s, PIP + " — User Guide");
  }
  {
    const s = add();
    header(s, S22, "실습 · 설치할 때 화면에 나오는 글 읽기");
    const lw = 7.6;
    codeBlock(s, MX, 1.65, lw, ["!pip install wordcloud"], { label: "Colab 코드 셀", fs: 16, lh: 0.42 });
    s.addShape("roundRect", { x: MX, y: 2.9, w: lw, h: 2.9, rectRadius: 0.08, fill: { color: "FFFFFF", transparency: 94 }, line: { color: T.muted, width: 0.75, dashType: "dash" } });
    txt(s, "실행 결과 (예시)", { x: MX + 0.2, y: 2.98, w: 3, h: 0.3, fontFace: F.sb, fontSize: 12, color: T.green });
    const out = [["Collecting wordcloud", 1], ["  Downloading wordcloud-x.y.z-…whl (…kB)", 1], ["Requirement already satisfied: numpy in …", 2], ["Requirement already satisfied: pillow in …", 2], ["Installing collected packages: wordcloud", 3], ["Successfully installed wordcloud-x.y.z", 4]];
    out.forEach(([l, n], i) => {
      const y = 3.35 + i * 0.38;
      txt(s, l, { x: MX + 0.2, y, w: lw - 0.9, h: 0.36, fontFace: F.code, fontSize: 12, color: n === 4 ? T.green : T.codeText, valign: "middle" });
    });
    [[0, 1], [2, 2], [4, 3], [5, 4]].forEach(([li, n]) => numBadge(s, n, MX + lw - 0.5, 3.38 + li * 0.38, 0.3));
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    explainList(s, rx, 1.65, rw, [[1, "Collecting / Downloading", "PyPI 에서 찾아서 내려받는 중"], [2, "already satisfied", "필요한 패키지는 이미 있음 (오류 X)"], [3, "Installing", "내 환경에 설치하는 중"], [4, "Successfully installed", "설치 성공! 이 줄만 확인하면 OK"]], { ih: 0.95, gap: 0.12 });
    tip(s, MX, 6.3, CW, 0.5, "포인트", "글자가 많이 나와도 당황하지 마세요. 마지막 줄의 Successfully 만 확인하면 됩니다.", T.green);
    footer(s, PIP + " — pip install");
  }
  {
    const s = add();
    header(s, S22, "conda 필수 명령어 (Anaconda 사용자)");
    const cmds = [["conda install 패키지", "설치하기", fa.FaDownload], ["conda install -c conda-forge 패키지", "conda-forge 에서 설치", fa.FaWarehouse], ["conda update 패키지", "업데이트", fa.FaArrowUp], ["conda remove 패키지", "삭제하기", fa.FaTrashAlt], ["conda list", "설치된 패키지 목록", fa.FaListUl]];
    for (let i = 0; i < 5; i++) {
      const [c, d, Ic] = cmds[i];
      const y = 1.7 + i * 0.78;
      card(s, MX, y, 8.4, 0.66, { fill: i % 2 ? T.card2 : T.card });
      s.addImage({ data: await icon(Ic, "#34D399"), x: MX + 0.25, y: y + 0.18, w: 0.3, h: 0.3 });
      txt(s, hlRuns(c), { x: MX + 0.8, y, w: 5.0, h: 0.66, fontFace: F.code, fontSize: 15, valign: "middle" });
      txt(s, d, { x: MX + 5.9, y, w: 2.4, h: 0.66, fontFace: F.sb, fontSize: 15, color: T.green, valign: "middle" });
    }
    const rx = MX + 8.75, rw = CW - 8.75;
    card(s, rx, 1.7, rw, 3.78, { fill: T.card });
    txt(s, [{ text: "conda 가 물어보면?", options: { fontFace: F.b, color: T.yellow, breakLine: true } }, { text: "설치 전에 바뀔 패키지 목록을 보여 주고", options: { breakLine: true } }, { text: "Proceed ([y]/n)?", options: { fontFace: F.code, color: T.yellow, breakLine: true } }, { text: "라고 묻습니다. y 를 입력하고 Enter!" }],
      { x: rx + 0.25, y: 1.7, w: rw - 0.5, h: 3.78, fontSize: 15, valign: "middle", paraSpaceAfter: 8 });
    tip(s, MX, 5.75, CW, 0.5, "pip 과 비슷하죠?", "install · list 는 같고, 삭제는 pip uninstall / conda remove 로 단어만 달라요.", T.cyan);
    footer(s, CONDA + " — Managing packages");
  }
  {
    const s = add();
    header(s, S22, "설치가 잘 되었는지 파이썬으로 확인하기");
    const lw = 6.8;
    const cb = codeBlock(s, MX, 1.65, lw, ["import pandas as pd", "import numpy as np", "print(pd.__version__)", "print(np.__version__)"], { fs: 15, lh: 0.4, markers: { 0: 1, 2: 2 } });
    outputBox(s, MX, 1.65 + cb.h + 0.2, lw, 1.0, "2.2.2\n2.0.2", { fs: 15 });
    txt(s, "(버전 숫자는 예시 — 환경마다 다름)", { x: MX, y: 1.65 + cb.h + 1.25, w: lw, h: 0.3, fontSize: 11, color: T.muted });
    const rx = MX + lw + 0.35, rw = CW - lw - 0.35;
    explainList(s, rx, 1.65, rw, [[1, "import 가 에러 없이 되면", "설치 성공! 아무 메시지도 안 나오는 게 정상"], [2, "__version__", "밑줄 2개씩 — 패키지 버전 확인"]], { ih: 1.05, gap: 0.15 });
    card(s, rx, 4.05, rw, 2.0, { fill: T.card2, line: T.pink });
    txt(s, [{ text: "설치가 안 되어 있으면?", options: { fontFace: F.b, color: T.pink, breakLine: true } }, { text: "ModuleNotFoundError:\nNo module named 'wordcloud'", options: { fontFace: F.code, fontSize: 13, color: T.codeText, breakLine: true } }, { text: "→ 다음 장에서 해결법 확인" }],
      { x: rx + 0.25, y: 4.05, w: rw - 0.5, h: 2.0, fontSize: 14, valign: "middle", paraSpaceAfter: 6 });
    tip(s, MX, 6.3, CW, 0.5, "참고", "pip show pandas 로도 버전을 볼 수 있어요 (Colab 에서는 !pip show pandas).", T.cyan);
    footer(s, "pandas · NumPy 공식 문서");
  }
  {
    const s = add();
    header(s, S22, "자주 만나는 오류 ① — ModuleNotFoundError");
    codeBlock(s, MX, 1.65, CW, ["import wordcloud"], { label: "Colab 코드 셀", fs: 15, lh: 0.4 });
    s.addShape("roundRect", { x: MX, y: 2.8, w: CW, h: 0.95, rectRadius: 0.08, fill: { color: T.pink, transparency: 88 }, line: { color: T.pink, width: 1 } });
    txt(s, "ModuleNotFoundError: No module named 'wordcloud'", { x: MX + 0.3, y: 2.8, w: CW - 0.6, h: 0.95, fontFace: F.code, fontSize: 17, color: T.pink, valign: "middle" });
    const cw = (CW - 0.6) / 3;
    const st = [["읽는 법", "'wordcloud 라는 모듈(패키지)을 찾을 수 없다'", T.accent2], ["원인", "내 환경에 그 패키지가 설치되어 있지 않음", T.yellow], ["해결", "!pip install wordcloud 실행 후 다시 import", T.green]];
    st.forEach(([h, d, c], i) => {
      const x = MX + i * (cw + 0.3);
      card(s, x, 4.0, cw, 1.95, { fill: T.card, line: c });
      txt(s, h, { x: x + 0.3, y: 4.15, w: cw - 0.6, h: 0.45, fontFace: F.b, fontSize: 18, color: c });
      txt(s, d, { x: x + 0.3, y: 4.65, w: cw - 0.6, h: 1.15, fontSize: 15 });
    });
    tip(s, MX, 6.3, CW, 0.5, "오류는 친구", "빨간 글씨는 '무엇이 문제인지' 알려 주는 안내문입니다. 마지막 줄부터 읽어 보세요!", T.cyan);
    footer(s, "Python Documentation — Built-in Exceptions (ModuleNotFoundError)");
  }
  {
    const s = add();
    header(s, S22, "자주 만나는 오류 ② — 설치 이름 ≠ import 이름");
    txt(s, "대부분은 같지만, 몇몇 유명한 패키지는 설치할 때 이름과 불러올 때 이름이 다릅니다.", { x: MX, y: 1.6, w: CW, h: 0.45, fontSize: 17, color: T.text });
    const rows = [["설치할 때 (pip install …)", "불러올 때 (import …)", "쓰는 곳"], ["scikit-learn", "sklearn", "12장 머신러닝"], ["beautifulsoup4", "bs4", "11장 웹 크롤링"], ["pillow", "PIL", "이미지 처리"], ["opencv-python", "cv2", "영상 처리"], ["pandas", "pandas  (같음)", "08장 데이터 처리"]];
    const tbl = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: i === 0 ? F.b : j < 2 ? F.code : F.r, fontSize: i === 0 ? 16 : 16, color: i === 0 ? T.white : j === 0 ? T.yellow : j === 1 ? T.green : T.text,
      fill: { color: i === 0 ? T.card2 : (i % 2 ? T.card : T.bg) }, align: "center", valign: "middle", margin: [0.04, 0.15, 0.04, 0.15] } })));
    s.addTable(tbl, { x: MX, y: 2.2, w: CW, colW: [4.4, 4.4, CW - 8.8], rowH: 0.62, border: { type: "solid", color: "1E2A5A", pt: 1 } });
    tip(s, MX, 6.15, CW, 0.6, "예시", "!pip install scikit-learn  으로 설치하고,  from sklearn.linear_model import LinearRegression  으로 불러와요.", T.yellow, 15);
    footer(s, "PyPI (pypi.org) 각 패키지 페이지");
  }
  {
    const s = add();
    header(s, S22, "pip 과 conda, 무엇을 써야 할까?");
    const q = [["Google Colab 을 쓴다", "!pip install", si.SiGooglecolab, "#F9AB00", true], ["Anaconda 를 설치해서 쓴다", "conda install 먼저 → 없으면 pip install", si.SiAnaconda, "#44A833"], ["python.org 파이썬을 쓴다", "pip install", si.SiPython, "#FACC15"]];
    for (let i = 0; i < 3; i++) {
      const [qq, a, Ic, c, ours] = q[i];
      const y = 1.75 + i * 1.2;
      card(s, MX, y, 5.6, 1.0, { fill: T.card });
      s.addImage({ data: await icon(Ic, c), x: MX + 0.25, y: y + 0.25, w: 0.5, h: 0.5 });
      txt(s, qq, { x: MX + 0.95, y, w: 4.5, h: 1.0, fontSize: 17, valign: "middle" });
      s.addShape("rightArrow", { x: MX + 5.8, y: y + 0.3, w: 0.7, h: 0.4, fill: { color: T.accent }, line: { type: "none" } });
      card(s, MX + 6.7, y, CW - 6.7, 1.0, { fill: T.card2, line: ours ? T.yellow : undefined, lw: 2 });
      txt(s, a, { x: MX + 6.95, y, w: CW - 7.1, h: 1.0, fontFace: F.b, fontSize: 18, valign: "middle", color: ours ? T.yellow : T.white });
    }
    card(s, MX, 5.4, CW, 0.75, { fill: T.card });
    txt(s, [{ text: "주의  ", options: { fontFace: F.b, color: T.pink } }, { text: "한 환경에서 같은 패키지를 pip 과 conda 로 번갈아 설치하면 버전이 꼬일 수 있어요. 하나를 정해서 쓰세요." }],
      { x: MX + 0.3, y: 5.4, w: CW - 0.6, h: 0.75, fontSize: 15, valign: "middle" });
    tip(s, MX, 6.3, CW, 0.5, "우리 수업", "Colab 에는 pandas · numpy · matplotlib 등이 이미 설치되어 있어, 대부분 바로 import 하면 됩니다.", T.green, 15);
    footer(s, CONDA + " — Using pip in an environment, " + SRC + " 2-2");
  }
  await summary(S22, "2.2 핵심 정리", [
    ["패키지 관리자", "pip = 파이썬 기본 (PyPI),  conda = Anaconda 전용"],
    ["어디에 입력?", "Prompt/터미널 : pip install  ·  Jupyter : %pip  ·  Colab : !pip"],
    ["필수 명령", "install · install --upgrade · uninstall(remove) · list · show"],
    ["오류 해결", "ModuleNotFoundError → 설치!  ·  설치 이름 ≠ import 이름 주의"],
  ], "이제 우리 수업의 주 무대로! → 2.3 Google Colab");
};
