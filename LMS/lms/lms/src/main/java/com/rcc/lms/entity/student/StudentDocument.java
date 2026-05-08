package com.rcc.lms.entity.student;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "student_document")
public class StudentDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private Integer documentId;

    @Column(nullable = false, length = 100)
    private String title;

    private String description;

    @Column(name = "file_path", nullable = false)
    private String filePath;

    @Column(name = "uploaded_date")
    private LocalDate uploadedDate;

    // Constructors
    public StudentDocument() {}

    // Getters and Setters
    public Integer getDocumentId() { 
        return documentId; }
    public void setDocumentId(Integer documentId) {
        this.documentId = documentId;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public LocalDate getUploadedDate() { return uploadedDate; }
    public void setUploadedDate(LocalDate uploadedDate) { this.uploadedDate = uploadedDate; }
}
