package com.rcc.lms.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "assignment")
public class TeacherAssignment {

    @Id
    @Column(name = "assignment_id", length = 50)
    private String assignmentId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "file_path", length = 255)
    private String filePath;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Column(name = "teacher_id", nullable = false, length = 20)
    private String teacherId;

    @Column(name = "subject_id", nullable = false, length = 50)
    private String subjectId;

    @Column(name = "class_id", nullable = false, length = 50)
    private String classId;

    @Column(name = "upload_date", nullable = false)
    private LocalDate uploadDate;

    public TeacherAssignment() {}

    public String getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(String assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public LocalDate getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
    }
}
