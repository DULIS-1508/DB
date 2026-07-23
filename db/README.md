# 도서관 데이터베이스 (library)

2026 정보시스템개발(ISD) 데이터베이스 실습용 샘플 데이터입니다.
모든 주차 실습이 이 데이터를 사용합니다.

## 구성

| 테이블 | 설명 | 행 수 |
|--------|------|-------|
| `member` | 도서관 회원 | 15 |
| `book` | 소장 도서 | 30 |
| `loan` | 대출 기록 (반납완료·대출중·연체 혼합) | 42 |

### 관계 (ERD 요약)
```
member (1) ────< loan >──── (1) book
        member_id            book_id
```
- `loan.member_id` → `member.member_id` (누가 빌렸는가)
- `loan.book_id`   → `book.book_id`     (무슨 책을 빌렸는가)
- `loan.return_date` 가 `NULL` 이면 아직 반납하지 않은 상태

## 불러오기

### 로컬 MySQL / Workbench
```bash
mysql -u root -p < library_schema.sql
```
또는 Workbench에서 `File > Open SQL Script`로 열고 실행(⚡).

### 브라우저 도구 (DB Fiddle 등)
맨 위의 `CREATE DATABASE` / `USE library;` 두 줄을 제외한 나머지를
Schema SQL 칸에 붙여넣으세요.

## 확인
```sql
SELECT COUNT(*) FROM member;  -- 15
SELECT COUNT(*) FROM book;    -- 30
SELECT COUNT(*) FROM loan;    -- 42
```

> 기준일(오늘)은 `2026-07-23` 으로 데이터를 구성했습니다.
> "연체 중인 대출"은 `return_date IS NULL AND due_date < '2026-07-23'` 로 찾을 수 있습니다.
