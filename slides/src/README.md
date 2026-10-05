# 강의 슬라이드 생성 스크립트

강의 슬라이드(.pptx)를 만드는 pptxgenjs 스크립트입니다. 원본 CH01 디자인(남색 배경 · 인디고 강조색 · Paperlogy 글꼴)을 그대로 따릅니다.

- `lib.js` : 색상 · 글꼴 토큰, 공통 부품 (머리글, 카드, 팁 상자, 코드 블록, 번호 해설)
- `build.js` : 표지 · 수업 안내 · 목차 · 1.1 파이썬 역사
- `part2.js` : 1.1 인기 순위 ~ 1.3 파이썬 라이브러리
- `part3.js` : 1.4 파이썬이 필요한 이유 · 마무리 · 참고문헌
- `build03.js` : 02장 01. 변수와 연산자 (`c3b.js` 1.2·1.3, `c3c.js` 마무리) — 공통 틀은 `deck.js`
- `build04.js` : 02장 02. 데이터 형식 (`c4b.js` 2.3·2.4 함수, `c4c.js` 2.4 메서드·마무리)
- `build05.js` : 02장 03. 데이터 구조 — 3.1 · 3.2 리스트 (`c5b.js` 3.3 튜플 · 3.4 딕셔너리, `c5c.js` 3.5 집합 · 3.6 부울 · 마무리)
- `build06.js` + `pbl_data.js` : 02장 04. PBL 연습문제 — 인자 `answer` 를 주면 정답 · 해설판
- `build07.js` : 03장 입력과 출력 — 01 입력문 (`c7b.js` 02 출력문, `c7c.js` 03 파일 입출력 · 마무리), 공통 부품 `lib3.js`
- `build08.js` + `pbl3_data.js` : 03장 04. PBL 연습문제 (원문 6문항 + 보충 7문제) — 인자 `answer` 로 정답판
- `build02.js` : 01장 02. 파이썬 시작 — 표지 · 2.1 파이썬 설치 (`c2b.js` 2.2 패키지 설치, `c2c.js` 2.3 Google Colab · 마무리)

```bash
npm install pptxgenjs react react-dom react-icons sharp
node build.js BizDataAnalysis_CH01_01_파이썬이해.pptx
node build02.js BizDataAnalysis_CH01_02_파이썬시작.pptx
node build03.js BizDataAnalysis_CH02_01_변수와연산자.pptx
node build04.js BizDataAnalysis_CH02_02_데이터형식.pptx
node build05.js BizDataAnalysis_CH02_03_데이터구조.pptx
node build06.js BizDataAnalysis_CH02_04_PBL연습문제.pptx
node build06.js BizDataAnalysis_CH02_04_PBL연습문제_정답.pptx answer
node build07.js BizDataAnalysis_CH03_입력과출력.pptx
node build08.js BizDataAnalysis_CH03_04_PBL연습문제.pptx
node build08.js BizDataAnalysis_CH03_04_PBL연습문제_정답.pptx answer
```

글꼴 Paperlogy 가 설치되어 있어야 화면과 같이 보입니다.
