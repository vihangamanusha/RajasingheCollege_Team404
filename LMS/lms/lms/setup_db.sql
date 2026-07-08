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
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    father_contact VARCHAR(15),
    mother_contact VARCHAR(15),
    emergency_contact VARCHAR(10),

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
    academic_year INT NOT NULL,
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

-- =========================
-- LIVESTREAMS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS livestreams (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date VARCHAR(255),
    time VARCHAR(255),
    description TEXT,
    videoURL VARCHAR(255),
    is_live TINYINT(1) DEFAULT 0
);

-- =========================
-- NEWS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS news (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date VARCHAR(255) NOT NULL,
    image VARCHAR(255)
);

-- =========================
-- ANNOUNCEMENTS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS announcements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(255),
    targetAudience VARCHAR(255),
    content TEXT,
    createdAt DATETIME
);

-- =========================
-- DOCUMENTS TABLE (WEBSITE PUBLIC UPLOADS)
-- =========================
CREATE TABLE IF NOT EXISTS documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(255),
    fileName VARCHAR(255),
    filePath VARCHAR(255)
);

-- =========================
-- SPORTS TABLE (SPORT ACHIEVEMENTS)
-- =========================
CREATE TABLE IF NOT EXISTS sports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    typesport VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255)
);

-- =========================
-- ASSIGNMENT TABLE
-- =========================
CREATE TABLE IF NOT EXISTS assignment (
    assignment_id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    file_path VARCHAR(255),
    note TEXT,
    teacher_id VARCHAR(20) NOT NULL,
    subject_id VARCHAR(50) NOT NULL,
    class_id VARCHAR(50) NOT NULL,
    upload_date DATE NOT NULL
);

-- =========================
-- SYSTEM CONFIG TABLE
-- =========================
CREATE TABLE IF NOT EXISTS system_config (
    config_key VARCHAR(50) PRIMARY KEY,
    config_value VARCHAR(100) NOT NULL
);

-- =========================
-- NON ACADEMIC TABLE
-- =========================
CREATE TABLE IF NOT EXISTS non_academic (
    non_academic_id VARCHAR(20) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    contact_number VARCHAR(15),
    nic VARCHAR(20) UNIQUE,
    designation VARCHAR(50),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    enroll_date VARCHAR(20),
    deletion_note VARCHAR(500)
);

-- =========================
-- CURRICULUM SUBJECT TABLE
-- =========================
CREATE TABLE IF NOT EXISTS curriculum_subject (
    subject_name VARCHAR(50) PRIMARY KEY,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    deletion_note VARCHAR(255)
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
INSERT INTO student (student_id, user_id, full_name, date_of_birth, address, medium, class_id, contact_number, father_name, mother_name, father_contact, mother_contact, emergency_contact) VALUES
('S_TEST_001', 'U_TEST_002', 'Student One', '2010-05-15', 'Address 1', 'English', NULL, '0722222222', 'Father One', 'Mother One', '0777777777', '0788888888', 'FATHER'),
('S_TEST_002', 'U_TEST_003', 'Student Two', '2010-06-20', 'Address 2', 'English', NULL, '0733333333', 'Father Two', 'Mother Two', '0777777778', '0788888889', 'MOTHER'),
('S_TEST_003', 'U_TEST_004', 'Student Three', '2010-07-25', 'Address 3', 'English', NULL, '0744444444', 'Father Three', 'Mother Three', '0777777779', '0788888890', 'FATHER');

-- Insert Subject
INSERT INTO subject (subject_id, subject_name, class_id, teacher_id) VALUES
('SUB_TEST_001', 'Mathematics', NULL, 'T_TEST_001');

-- Insert Marks
INSERT INTO marks (student_id, subject_id, term, assignment_mark) VALUES
('S_TEST_001', 'SUB_TEST_001', 'Term 1', 85),
('S_TEST_002', 'SUB_TEST_001', 'Term 1', 70),
('S_TEST_003', 'SUB_TEST_001', 'Term 1', 90);
