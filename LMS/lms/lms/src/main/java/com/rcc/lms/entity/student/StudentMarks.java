package com.rcc.lms.entity.student;

import jakarta.persistence.*;

@Entity
@Table(name = "student_marks")
public class StudentMarks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mark_id")
    private Integer markId;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id", nullable = false)
    private Student student;

    @Column(name = "subject_name")
    private String subjectName; // Using String to avoid conflicts with shared Subject entity

    @Column(length = 20)
    private String term;

    @Column(name = "assignment_mark")
    private Integer assignmentMark;

    // Constructors
    public StudentMarks() {}

    public StudentMarks(Student student, String subjectName, String term, Integer assignmentMark) {
        this.student = student;
        this.subjectName = subjectName;
        this.term = term;
        this.assignmentMark = assignmentMark;
    }

    // Getters and Setters
    public Integer getMarkId() { return markId; }
    public void setMarkId(Integer markId) { this.markId = markId; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public Integer getAssignmentMark() { return assignmentMark; }
    public void setAssignmentMark(Integer assignmentMark) { this.assignmentMark = assignmentMark; }
}
