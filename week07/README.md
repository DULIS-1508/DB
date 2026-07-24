# Week 07 · 조인 (2) 외부 조인과 NULL
> 한쪽에만 있는 데이터까지 놓치지 않기 (LEFT JOIN)

## 학습 목표
- LEFT JOIN으로 기준 표의 모든 행을 남길 수 있다.
- IS NULL로 '연결되지 않은' 행을 찾을 수 있다.
- 외부 조인과 그룹화를 함께 사용할 수 있다.

## 준비
[실습 안내](../guide.html)를 참고해 `db/library_schema.sql`을 불러온 뒤 시작하세요.

## 실습 과제
1. 모든 회원과 각자의 대출 건수를 구하세요. (한 번도 안 빌린 회원은 0으로) (힌트: member LEFT JOIN loan, GROUP BY, COUNT(loan_id))
2. 한 번도 대출된 적이 없는 도서의 제목을 조회하세요. (힌트: book LEFT JOIN loan, WHERE l.loan_id IS NULL)
3. 한 번도 책을 빌리지 않은 회원의 이름을 조회하세요. (힌트: member LEFT JOIN loan, WHERE l.loan_id IS NULL)
4. 각 도서의 대출 횟수를 구하고(대출 0회 포함), 많이 빌린 순으로 조회하세요. (힌트: book LEFT JOIN loan, GROUP BY, ORDER BY COUNT DESC)
5. 현재 대출 중(미반납)인 도서의 제목과 빌린 회원 이름을 조회하세요. (힌트: 조인 후 WHERE l.return_date IS NULL)

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
