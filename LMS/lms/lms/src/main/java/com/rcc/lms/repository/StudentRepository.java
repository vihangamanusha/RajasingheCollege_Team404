package com.rcc.lms.repository;


import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<com.rcc.lms.student.Student, Long> {
    boolean existsByStudentId(String studentId);
}