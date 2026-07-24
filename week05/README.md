# Week 05 · 그룹화 (GROUP BY · HAVING)
> 묶어서 세고, 묶은 결과에 조건 걸기

## 학습 목표
- GROUP BY로 그룹별 집계를 할 수 있다.
- 집계 결과를 정렬할 수 있다.
- HAVING으로 그룹에 조건을 걸 수 있다.

## 준비
[실습 안내](../guide.html)를 참고해 `db/library_schema.sql`을 불러온 뒤 시작하세요.

## 실습 과제
1. 카테고리별 도서 수를 구하세요. (힌트: GROUP BY category, COUNT(*))
2. 출판사별 도서 수를 구하고, 도서 수가 많은 순으로 정렬하세요. (힌트: GROUP BY publisher, ORDER BY COUNT(*) DESC)
3. 학과별 회원 수를 구하세요. (힌트: member 를 GROUP BY dept)
4. 회원 유형별(member_type) 회원 수를 구하세요. (힌트: GROUP BY member_type)
5. 도서가 4권 이상인 카테고리만 골라, 카테고리와 도서 수를 조회하세요. (힌트: GROUP BY 후 HAVING COUNT(*) >= 4)

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
