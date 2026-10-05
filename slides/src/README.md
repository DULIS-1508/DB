# 강의 슬라이드 생성 스크립트

`BizDataAnalysis_CH01.pptx` 를 만드는 pptxgenjs 스크립트입니다. 원본 CH01 디자인(남색 배경 · 인디고 강조색 · Paperlogy 글꼴)을 그대로 따릅니다.

- `lib.js` : 색상 · 글꼴 토큰, 공통 부품 (머리글, 카드, 팁 상자, 코드 블록, 번호 해설)
- `build.js` : 표지 · 수업 안내 · 목차 · 1.1 파이썬 역사
- `part2.js` : 1.1 인기 순위 ~ 1.3 파이썬 라이브러리
- `part3.js` : 1.4 파이썬이 필요한 이유 · 마무리 · 참고문헌

```bash
npm install pptxgenjs react react-dom react-icons sharp
node build.js BizDataAnalysis_CH01.pptx
```

글꼴 Paperlogy 가 설치되어 있어야 화면과 같이 보입니다.
