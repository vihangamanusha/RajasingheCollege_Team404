package com.rcc.lms.repository;

import com.rcc.lms.entity.student.StudentMarks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentMarksRepository extends JpaRepository<StudentMarks, Integer> {
    List<StudentMarks> findByStudentStudentId(String studentId);
}
