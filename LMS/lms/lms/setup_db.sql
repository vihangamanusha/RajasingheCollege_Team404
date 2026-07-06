CREATE DATABASE IF NOT EXISTS rcc;
USE rcc;

-- =========================
-- USERS TABLE (CORE AUTH)
-- =========================
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(20) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE'
);

-- =========================
-- ADMIN TABLE
-- =========================
CREATE TABLE IF NOT EXISTS admin (
    admin_id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(15),

    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
);

-- =========================
-- TEACHER TABLE
-- =========================
CREATE TABLE IF NOT EXISTS teacher (
    teacher_id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    subject_specialization VARCHAR(50),
    contact_number VARCHAR(15),

    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
);

-- =========================
-- CLASS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS class (
    class_id VARCHAR(20) PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    teacher_id VARCHAR(20),

    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
    ON DELETE SET NULL
);

-- =========================
-- STUDENT TABLE
-- =========================
CREATE TABLE IF NOT EXISTS student (
    student_id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    address VARCHAR(255),
    medium ENUM('Sinhala','English') NOT NULL,
    class_id VARCHAR(20),
    contact_number VARCHAR(15),

    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE,

    FOREIGN KEY (class_id) REFERENCES class(class_id)
    ON DELETE SET NULL
);

-- =========================
-- TECHNICAL OFFICER TABLE
-- =========================
CREATE TABLE IF NOT EXISTS technical_officer (
    technical_officer_id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    contact_number VARCHAR(15),
    position VARCHAR(50),
    assigned_area VARCHAR(100),

    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
);

-- =========================
-- SUBJECT TABLE
-- =========================
CREATE TABLE IF NOT EXISTS subject (
    subject_id VARCHAR(20) PRIMARY KEY,
    subject_name VARCHAR(50) NOT NULL,
    class_id VARCHAR(20),
    teacher_id VARCHAR(20),

    FOREIGN KEY (class_id) REFERENCES class(class_id)
    ON DELETE CASCADE,

    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
    ON DELETE SET NULL
);

-- =========================
-- MARKS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS marks (
    mark_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    subject_id VARCHAR(20) NOT NULL,
    term VARCHAR(20),
    assignment_mark INT,
    academic_year INT,
    exam_date DATE,

    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON DELETE CASCADE,

    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
    ON DELETE CASCADE
);

-- =========================
-- DOCUMENT TABLE
-- =========================
CREATE TABLE IF NOT EXISTS document (
    document_id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    upload_date DATE,
    teacher_id VARCHAR(20),
    subject_id VARCHAR(20),

    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
    ON DELETE SET NULL,

    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
    ON DELETE CASCADE
);

-- =========================
-- REPORT TABLE
-- =========================
CREATE TABLE IF NOT EXISTS report (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20),
    class_id VARCHAR(20),
    term VARCHAR(20),
    total_marks INT,
    average DECIMAL(5,2),
    rank_position INT,
    generated_date DATE,

    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON DELETE CASCADE,

    FOREIGN KEY (class_id) REFERENCES class(class_id)
    ON DELETE CASCADE
);

-- Clear existing test data if any
DELETE FROM marks WHERE student_id LIKE 'S_TEST_%';
DELETE FROM subject WHERE subject_id LIKE 'SUB_TEST_%';
DELETE FROM student WHERE student_id LIKE 'S_TEST_%';
DELETE FROM teacher WHERE teacher_id LIKE 'T_TEST_%';
DELETE FROM users WHERE user_id LIKE 'U_TEST_%';

-- Insert Users
INSERT INTO users (user_id, username, password, role, email, created_date, status) VALUES
('U_TEST_001', 'test_teacher', 'password123', 'Teacher', 'teacher@test.com', '2026-05-15', 'ACTIVE'),
('U_TEST_002', 'test_student1', 'password123', 'Student', 'student1@test.com', '2026-05-15', 'ACTIVE'),
('U_TEST_003', 'test_student2', 'password123', 'Student', 'student2@test.com', '2026-05-15', 'ACTIVE'),
('U_TEST_004', 'test_student3', 'password123', 'Student', 'student3@test.com', '2026-05-15', 'ACTIVE');

-- Insert Teacher
INSERT INTO teacher (teacher_id, user_id, full_name, subject_specialization, contact_number) VALUES
('T_TEST_001', 'U_TEST_001', 'Test Teacher', 'Mathematics', '0711111111');

-- Insert Students
INSERT INTO student (student_id, user_id, full_name, date_of_birth, address, medium, class_id, contact_number) VALUES
('S_TEST_001', 'U_TEST_002', 'Student One', '2010-05-15', 'Address 1', 'English', NULL, '0722222222'),
('S_TEST_002', 'U_TEST_003', 'Student Two', '2010-06-20', 'Address 2', 'English', NULL, '0733333333'),
('S_TEST_003', 'U_TEST_004', 'Student Three', '2010-07-25', 'Address 3', 'English', NULL, '0744444444');

-- Insert Subject
INSERT INTO subject (subject_id, subject_name, class_id, teacher_id) VALUES
('SUB_TEST_001', 'Mathematics', NULL, 'T_TEST_001');

-- Insert Marks
INSERT INTO marks (student_id, subject_id, term, assignment_mark) VALUES
('S_TEST_001', 'SUB_TEST_001', 'Term 1', 85),
('S_TEST_002', 'SUB_TEST_001', 'Term 1', 70),
('S_TEST_003', 'SUB_TEST_001', 'Term 1', 90);
