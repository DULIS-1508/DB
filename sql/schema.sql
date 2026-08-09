-- =====================================================================
--  도서관 데이터베이스 교육용 스키마 (schema.sql) — v1
--  『도서관 데이터베이스로 배우는 데이터베이스 개론』 관통 실습 DB
--
--  대상 DBMS : MySQL 8.0+ (MariaDB 10.4+ 호환)
--  문자셋    : utf8mb4 (한글·이모지 포함 안전)
--  엔진      : InnoDB (외래키·트랜잭션 지원 → 11장 실습에 필요)
--
--  설계 메모
--   - 실제 도서관 시스템을 본떠 최소·핵심 엔터티만 담은 '교육용' 스키마다.
--   - 자료(book, 서지 단위)와 소장본(copy, 물리적 개별 책)을 분리한다.
--     같은 책을 여러 권 소장하는 현실을 개체/인스턴스로 표현하기 위함(4장 사례).
--   - KORMARC 필드(245 서명, 100/700 저자, 260 발행)와 정보나루 대출 데이터를
--     참고해 컬럼을 잡았다.
-- =====================================================================

-- 실습 편의를 위해 매번 깨끗하게 다시 만든다(교육용).
DROP DATABASE IF EXISTS library;
CREATE DATABASE library
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE library;

-- ---------------------------------------------------------------------
-- 1) kdc_class : 한국십진분류(KDC) 참조 테이블
--    분류는 값이 정해진 코드 집합이므로 별도 참조 테이블로 둔다.
-- ---------------------------------------------------------------------
CREATE TABLE kdc_class (
  kdc_code   CHAR(3)      NOT NULL COMMENT 'KDC 분류코드(예: 000, 810)',
  kdc_name   VARCHAR(50)  NOT NULL COMMENT '분류명(예: 총류, 한국문학)',
  PRIMARY KEY (kdc_code)
) ENGINE=InnoDB COMMENT='한국십진분류 참조';

-- ---------------------------------------------------------------------
-- 2) publisher : 출판사 (KORMARC 260$b)
-- ---------------------------------------------------------------------
CREATE TABLE publisher (
  publisher_id INT          NOT NULL AUTO_INCREMENT,
  name         VARCHAR(100) NOT NULL COMMENT '출판사명',
  location     VARCHAR(100)     NULL COMMENT '소재지',
  PRIMARY KEY (publisher_id),
  UNIQUE KEY uq_publisher_name (name)
) ENGINE=InnoDB COMMENT='출판사';

-- ---------------------------------------------------------------------
-- 3) author : 저자/역자 (KORMARC 100/700, 전거(authority)의 축소판)
-- ---------------------------------------------------------------------
CREATE TABLE author (
  author_id  INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL COMMENT '저자명',
  nationality VARCHAR(50)     NULL COMMENT '국적',
  PRIMARY KEY (author_id)
) ENGINE=InnoDB COMMENT='저자(전거 축소판)';

-- ---------------------------------------------------------------------
-- 4) book : 자료(서지 단위, 제목 레벨) — KORMARC 245/260 등
--    ISBN·제어번호를 후보키로 갖는다(5장 키 사례).
-- ---------------------------------------------------------------------
CREATE TABLE book (
  book_id      INT          NOT NULL AUTO_INCREMENT,
  isbn         CHAR(13)         NULL COMMENT 'ISBN13(하이픈 없이). 고서 등은 없을 수 있음',
  ctrl_no      VARCHAR(20)      NULL COMMENT '제어번호(도서관 내부 식별자)',
  title        VARCHAR(200) NOT NULL COMMENT '서명(KORMARC 245)',
  publisher_id INT              NULL COMMENT 'FK → publisher',
  pub_year     SMALLINT         NULL COMMENT '출판년도',
  kdc_code     CHAR(3)          NULL COMMENT 'FK → kdc_class',
  PRIMARY KEY (book_id),
  UNIQUE KEY uq_book_isbn (isbn),
  KEY idx_book_title (title),
  CONSTRAINT fk_book_publisher
    FOREIGN KEY (publisher_id) REFERENCES publisher (publisher_id),
  CONSTRAINT fk_book_kdc
    FOREIGN KEY (kdc_code) REFERENCES kdc_class (kdc_code)
) ENGINE=InnoDB COMMENT='자료(서지 단위)';

-- ---------------------------------------------------------------------
-- 5) book_author : 자료 : 저자 = N:M 연결 (교차 테이블, 4·10장 사례)
--    같은 책에 공저·역자가 여럿, 한 저자가 여러 책을 쓴다.
-- ---------------------------------------------------------------------
CREATE TABLE book_author (
  book_id    INT          NOT NULL COMMENT 'FK → book',
  author_id  INT          NOT NULL COMMENT 'FK → author',
  role       ENUM('저자','역자','편저','감수') NOT NULL DEFAULT '저자' COMMENT '역할',
  PRIMARY KEY (book_id, author_id, role),
  CONSTRAINT fk_ba_book
    FOREIGN KEY (book_id)   REFERENCES book (book_id)     ON DELETE CASCADE,
  CONSTRAINT fk_ba_author
    FOREIGN KEY (author_id) REFERENCES author (author_id)
) ENGINE=InnoDB COMMENT='자료-저자(N:M)';

-- ---------------------------------------------------------------------
-- 6) branch : 도서관/분관 (정보나루 도서관 코드에 대응)
-- ---------------------------------------------------------------------
CREATE TABLE branch (
  branch_id  INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL COMMENT '도서관/분관명',
  location   VARCHAR(100)     NULL COMMENT '위치',
  PRIMARY KEY (branch_id)
) ENGINE=InnoDB COMMENT='도서관/분관';

-- ---------------------------------------------------------------------
-- 7) copy : 소장본(물리적 개별본) — 등록번호·청구기호 단위
--    자료(book) 1 : 소장본(copy) N
-- ---------------------------------------------------------------------
CREATE TABLE copy (
  copy_id    INT          NOT NULL AUTO_INCREMENT,
  book_id    INT          NOT NULL COMMENT 'FK → book',
  branch_id  INT          NOT NULL COMMENT 'FK → branch(소장 분관)',
  reg_no     VARCHAR(20)  NOT NULL COMMENT '등록번호(도서관 내 유일)',
  call_no    VARCHAR(50)      NULL COMMENT '청구기호(예: 810.8 홍13ㅅ)',
  status     ENUM('대출가능','대출중','분실','폐기') NOT NULL DEFAULT '대출가능'
             COMMENT '소장본 상태',
  PRIMARY KEY (copy_id),
  UNIQUE KEY uq_copy_reg (reg_no),
  KEY idx_copy_book (book_id),
  CONSTRAINT fk_copy_book
    FOREIGN KEY (book_id)   REFERENCES book (book_id),
  CONSTRAINT fk_copy_branch
    FOREIGN KEY (branch_id) REFERENCES branch (branch_id)
) ENGINE=InnoDB COMMENT='소장본(물리적 개별본)';

-- ---------------------------------------------------------------------
-- 8) member : 회원(이용자)
-- ---------------------------------------------------------------------
CREATE TABLE member (
  member_id    INT          NOT NULL AUTO_INCREMENT,
  name         VARCHAR(50)  NOT NULL COMMENT '회원명',
  member_type  ENUM('학생','교직원','일반') NOT NULL DEFAULT '일반' COMMENT '회원 유형',
  join_date    DATE         NOT NULL COMMENT '가입일',
  status       ENUM('정상','정지') NOT NULL DEFAULT '정상' COMMENT '회원 상태',
  PRIMARY KEY (member_id)
) ENGINE=InnoDB COMMENT='회원(이용자)';

-- ---------------------------------------------------------------------
-- 9) loan : 대출/반납 트랜잭션
--    return_date 가 NULL 이면 아직 대출 중.
--    소장본(copy) 1 : 대출(loan) N,  회원(member) 1 : 대출(loan) N
-- ---------------------------------------------------------------------
CREATE TABLE loan (
  loan_id     INT      NOT NULL AUTO_INCREMENT,
  copy_id     INT      NOT NULL COMMENT 'FK → copy',
  member_id   INT      NOT NULL COMMENT 'FK → member',
  loan_date   DATE     NOT NULL COMMENT '대출일',
  due_date    DATE     NOT NULL COMMENT '반납예정일',
  return_date DATE         NULL COMMENT '반납일(NULL=대출중)',
  PRIMARY KEY (loan_id),
  KEY idx_loan_copy (copy_id),
  KEY idx_loan_member (member_id),
  CONSTRAINT fk_loan_copy
    FOREIGN KEY (copy_id)   REFERENCES copy (copy_id),
  CONSTRAINT fk_loan_member
    FOREIGN KEY (member_id) REFERENCES member (member_id)
) ENGINE=InnoDB COMMENT='대출/반납';

-- ---------------------------------------------------------------------
-- 10) reservation : 예약(대출중 자료에 대한 예약)
--     예약은 물리적 소장본이 아니라 자료(book) 단위로 건다.
-- ---------------------------------------------------------------------
CREATE TABLE reservation (
  reservation_id INT      NOT NULL AUTO_INCREMENT,
  book_id        INT      NOT NULL COMMENT 'FK → book',
  member_id      INT      NOT NULL COMMENT 'FK → member',
  reserve_date   DATE     NOT NULL COMMENT '예약일',
  status         ENUM('대기','완료','취소') NOT NULL DEFAULT '대기' COMMENT '예약 상태',
  PRIMARY KEY (reservation_id),
  CONSTRAINT fk_resv_book
    FOREIGN KEY (book_id)   REFERENCES book (book_id),
  CONSTRAINT fk_resv_member
    FOREIGN KEY (member_id) REFERENCES member (member_id)
) ENGINE=InnoDB COMMENT='예약';

-- ---------------------------------------------------------------------
-- 11) fine : 연체료/분실 부과금 (대출 1 : 연체료 N)
--     paid_date 가 NULL 이면 미납.
-- ---------------------------------------------------------------------
CREATE TABLE fine (
  fine_id      INT           NOT NULL AUTO_INCREMENT,
  loan_id      INT           NOT NULL COMMENT 'FK → loan',
  amount       DECIMAL(8,0)  NOT NULL COMMENT '부과 금액(원)',
  imposed_date DATE          NOT NULL COMMENT '부과일',
  paid_date    DATE              NULL COMMENT '납부일(NULL=미납)',
  PRIMARY KEY (fine_id),
  CONSTRAINT fk_fine_loan
    FOREIGN KEY (loan_id) REFERENCES loan (loan_id)
) ENGINE=InnoDB COMMENT='연체료/분실 부과금';

-- =====================================================================
--  끝. 데이터 적재는 seed.sql 을 이어서 실행한다.
-- =====================================================================
