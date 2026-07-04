package com.rcc.lms.repository;

import com.rcc.lms.entity.student.StudentDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentDocumentRepository extends JpaRepository<StudentDocument, String> {
    // Find documents by subject (to show subject-specific materials)
    List<StudentDocument> findBySubjectId(String subjectId);
    // Find documents by teacher
    List<StudentDocument> findByTeacherId(String teacherId);
    // Find documents by class
    List<StudentDocument> findByClassId(String classId);
}
