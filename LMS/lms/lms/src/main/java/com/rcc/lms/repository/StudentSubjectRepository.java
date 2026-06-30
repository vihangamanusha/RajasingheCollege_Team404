package com.rcc.lms.repository;

import com.rcc.lms.entity.student.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentSubjectRepository extends JpaRepository<Subject, String> {

    List<Subject> findByClassId(String classId);
}