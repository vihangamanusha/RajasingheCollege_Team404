package com.rcc.lms.entity.student;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "document")
public class StudentDocument {

    @Id
    @Column(length = 20)
    private String documentId;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 255)
    private String filePath;

    @Column(length = 20)
    private String classId;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Column(name = "youtube_link", length = 255)
    private String youtubeLink;

    private LocalDate uploadDate;

    @Column(length = 20)
    private String teacherId;

    @Column(length = 20)
    private String subjectId;

    // Constructors
    public StudentDocument() {}

    // Getters and Setters
    public String getDocumentId() { return documentId; }
    public void setDocumentId(String documentId) { this.documentId = documentId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public LocalDate getUploadDate() { return uploadDate; }
    public void setUploadDate(LocalDate uploadDate) { this.uploadDate = uploadDate; }

    public String getTeacherId() { return teacherId; }
    public void setTeacherId(String teacherId) { this.teacherId = teacherId; }

    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }

    public String getClassId() { return classId; }
    public void setClassId(String classId) { this.classId = classId; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public String getYoutubeLink() { return youtubeLink; }
    public void setYoutubeLink(String youtubeLink) { this.youtubeLink = youtubeLink; }
}
