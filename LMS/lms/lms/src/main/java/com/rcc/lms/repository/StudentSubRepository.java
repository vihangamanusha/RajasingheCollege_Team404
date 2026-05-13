package com.rcc.lms.repository;

import com.rcc.lms.entity.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentSubRepository extends JpaRepository<Student, String> {

}