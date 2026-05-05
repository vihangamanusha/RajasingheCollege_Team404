package com.rcc.lms.entity.student;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "document")
public class Document {

    @Id
    @Column(name = "document_id")
    private String documentId;

    private String title;
    private String filePath;
    private LocalDate uploadDate;

    // getters & setters

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public LocalDate getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
    }
}