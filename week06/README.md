# Week 06 · 조인 (1) 내부 조인
> 여러 표를 연결해 함께 보기 (INNER JOIN)

## 학습 목표
- JOIN ... ON으로 두 표를 연결할 수 있다.
- 세 개의 표를 연결할 수 있다.
- 조인 결과에 조건을 걸어 원하는 정보를 뽑을 수 있다.

## 준비
[실습 안내](../guide.html)를 참고해 `db/library_schema.sql`을 불러온 뒤 시작하세요.

## 실습 과제
1. 대출 기록에 회원 이름을 붙여, loan_id, 회원 name, loan_date를 조회하세요. (힌트: loan JOIN member ON loan.member_id = member.member_id)
2. 대출 기록에 도서 제목을 붙여, loan_id, 도서 title, loan_date를 조회하세요. (힌트: loan JOIN book ON loan.book_id = book.book_id)
3. 대출 기록에 회원 이름과 도서 제목을 함께 붙여, 회원 name, 도서 title, loan_date를 조회하세요. (힌트: 세 표 연결: loan JOIN member JOIN book)
4. '김민준' 회원이 빌린 도서 제목을 모두 조회하세요. (힌트: 조인 후 WHERE m.name = '김민준')
5. '데이터베이스 개론'을 빌린 적이 있는 회원 이름을 조회하세요. (중복은 없애기) (힌트: 조인 후 WHERE b.title = ..., DISTINCT)

## 제출 방법
1. `answer.sql`에 문제 번호와 함께 SQL을 작성합니다.
2. 실행 결과를 캡처해 `result.png`로 이 폴더에 함께 올립니다.
3. **Commit & Push** 하면 제출 완료입니다.

## 채점 기준
| 항목 | 배점 | 설명 |
|------|------|------|
| 정확성 | 60% | 요구한 결과를 올바르게 반환하는가 |
| 적절성 | 30% | 문제 의도에 맞는 구문을 사용했는가 |
| 완성도 | 10% | 가독성·주석·결과 첨부 |
