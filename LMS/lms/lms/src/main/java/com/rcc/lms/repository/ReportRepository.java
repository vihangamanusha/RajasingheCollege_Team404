package com.rcc.lms.repository;

import com.rcc.lms.entity.student.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Integer> {

    List<Report> findByStudent_StudentId(String studentId);
}