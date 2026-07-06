package com.rcc.lms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "curriculum_subject")
public class CurriculumSubject {

    @Id
    @Column(name = "subject_name", length = 50, nullable = false)
    private String subjectName;

    @Column(name = "status", length = 20)
    private String status = "ACTIVE";

    @Column(name = "deletion_note", length = 255)
    private String deletionNote;

    public CurriculumSubject() {}

    public CurriculumSubject(String subjectName) {
        this.subjectName = subjectName;
        this.status = "ACTIVE";
    }

    public CurriculumSubject(String subjectName, String status, String deletionNote) {
        this.subjectName = subjectName;
        this.status = status;
        this.deletionNote = deletionNote;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDeletionNote() {
        return deletionNote;
    }

    public void setDeletionNote(String deletionNote) {
        this.deletionNote = deletionNote;
    }
}
