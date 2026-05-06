package com.rcc.lms.repository;

import com.rcc.lms.entity.student.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDocument extends JpaRepository<Document, String> {
}