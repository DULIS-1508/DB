# 2026 정보시스템개발(ISD) · 데이터베이스 실습

MySQL을 사용해 데이터베이스를 실습 중심으로 배우는 수업 사이트입니다.
모든 실습은 **도서관 데이터베이스**(회원 · 도서 · 대출)를 소재로 합니다.

## 구성

```
index.html            수업 홈 (주차별 과제 목록)
guide.html            실습 환경 준비 · 과제 제출 방법
css/style.css         공통 스타일
db/
  library_schema.sql  도서관 DB (스키마 + 샘플 데이터)
  README.md           DB 구조 설명 · 불러오는 법
week01/ ... week15/   주차별 과제
  index.html          과제 설명 페이지
  answer.sql          학생이 답을 작성하는 템플릿
  README.md           (week01) 과제 안내
```

## 사용 방법
- **학생**: 홈에서 해당 주차 과제를 열고, 도서관 DB를 불러온 뒤
  `weekNN/answer.sql`에 SQL을 작성해 제출합니다. (자세한 방법은 `guide.html`)
- **교수**: 각 학생의 `answer.sql`을 실행해 채점하고 커밋에 피드백을 남깁니다.

## GitHub Pages
저장소 Settings → Pages 에서 이 브랜치를 게시하면
`https://<사용자>.github.io/<저장소>/` 로 실습 사이트가 공개됩니다.
