package com.rcc.lms.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import com.rcc.lms.entity.student.Student; // Ensure path is correct

import javax.security.auth.Subject;

@Entity
@Table(name = "marks")
public class Mark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mark_id")
    private Integer markId;

    // Link to the Student table
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    // Link to the Subject table
    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "term")
    private String term;

    @Column(name = "assignment_mark")
    private Integer assignmentMark;

    // Fields added specifically for your Reporting/Analytics
    @Column(name = "academic_year")
    private Integer academicYear;

    @Column(name = "exam_date")
    private LocalDate examDate;

    // ===== GETTERS AND SETTERS =====
    public Integer getMarkId() { return markId; }
    public void setMarkId(Integer markId) { this.markId = markId; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public Integer getAssignmentMark() { return assignmentMark; }
    public void setAssignmentMark(Integer assignmentMark) { this.assignmentMark = assignmentMark; }

    public Integer getAcademicYear() { return academicYear; }
    public void setAcademicYear(Integer academicYear) { this.academicYear = academicYear; }

    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }
}