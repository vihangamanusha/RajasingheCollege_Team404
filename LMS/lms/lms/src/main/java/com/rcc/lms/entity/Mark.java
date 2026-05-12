package com.rcc.lms.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import com.rcc.lms.entity.student.Student; // Check your actual package path here
import com.rcc.lms.entity.Subject;// Check your actual package path here
import com.rcc.lms.entity.student.ClassEntity;

@Entity
@Table(name = "marks")
public class Mark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mark_id") // This maps the Java field 'id' to the SQL column 'mark_id'
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "term")
    private String term;

    @Column(name = "assignment_mark")
    private Integer assignmentMark;

    @Column(name = "academic_year")
    private Integer academicYear;

    @Column(name = "exam_date")
    private LocalDate examDate;

    // =========================
    // GETTERS AND SETTERS
    // =========================

    // IMPORTANT: Even though the field is 'id', keep the getter/setter
    // named logically for your other code if needed, but 'getId' is standard.
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

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