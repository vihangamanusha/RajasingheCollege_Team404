package com.rcc.lms.repository;

import com.rcc.lms.entity.student.StudentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentReportRepository extends JpaRepository<StudentReport, Integer> {
    List<StudentReport> findByStudentStudentId(String studentId);
}
