package com.rcc.lms.repository;

import com.rcc.lms.entity.student.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, String> {
    // Find subjects by class ID (to list subjects for a specific class)
    List<Subject> findByClassId(String classId);
}
