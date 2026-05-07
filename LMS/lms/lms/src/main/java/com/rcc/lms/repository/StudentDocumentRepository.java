package com.rcc.lms.repository;

import com.rcc.lms.entity.student.StudentDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentDocumentRepository extends JpaRepository<StudentDocument, Integer> {
}
