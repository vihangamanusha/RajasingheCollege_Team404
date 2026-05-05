package com.rcc.lms.entity.student;

import jakarta.persistence.*;

import javax.security.auth.Subject;

@Entity
@Table(name = "marks")
public class Marks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int markId;

    private String term;
    private int assignmentMark;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    // OPTIONAL (only if you created Subject entity)
    //@ManyToOne
    //private Subject subject;

    public int getMarkId() {
        return markId;
    }

    public void setMarkId(int markId) {
        this.markId = markId;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public int getAssignmentMark() {
        return assignmentMark;
    }

    public void setAssignmentMark(int assignmentMark) {
        this.assignmentMark = assignmentMark;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

}