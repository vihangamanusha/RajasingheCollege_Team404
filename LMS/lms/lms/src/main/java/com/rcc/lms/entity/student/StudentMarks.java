package com.rcc.lms.entity.student;

import jakarta.persistence.*;

@Entity
@Table(name = "marks")
public class StudentMarks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mark_id")
    private Integer markId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    private String term;

    @Column(name = "assignment_mark")
    private Integer assignmentMark;

    // Constructors
    public StudentMarks() {}

    public StudentMarks(Student student, Subject subject, String term, Integer assignmentMark) {
        this.student = student;
        this.subject = subject;
        this.term = term;
        this.assignmentMark = assignmentMark;
    }

    // Getters and Setters
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
}