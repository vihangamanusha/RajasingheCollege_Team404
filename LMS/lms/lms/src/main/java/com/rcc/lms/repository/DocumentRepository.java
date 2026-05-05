package com.rcc.lms.repository;

import com.rcc.lms.entity.student.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, String> {
}