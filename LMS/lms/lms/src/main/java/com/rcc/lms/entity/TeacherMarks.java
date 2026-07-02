package com.rcc.lms.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "marks")
public class TeacherMarks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mark_id")
    private int markId;

    @Column(name="student_id",nullable = false)
    private String studentId;

    @Column(name="subject_id",nullable = false)
    private String subjectId;

    private String term;

    private int assignmentMark;

    @Column(name = "academic_year", nullable = false)
    private int academicYear;

    @Column(name = "exam_date")
    private LocalDate examDate = LocalDate.now();

    public int getMarkId() {
        return markId;
    }

    public int getAssignmentMark() {
        return assignmentMark;
    }

    public String getTerm() {
        return term;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public String getStudentId() {
        return studentId;
    }

    public int getAcademicYear() {
        return academicYear;
    }

    public LocalDate getExamDate() {
        return examDate;
    }

    public void setMarkId(int markId) {
        this.markId = markId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public void setAssignmentMark(int assignmentMark) {
        this.assignmentMark = assignmentMark;
    }

    public void setAcademicYear(int academicYear) {
        this.academicYear = academicYear;
    }

    public void setExamDate(LocalDate examDate) {
        this.examDate = examDate;
    }
}