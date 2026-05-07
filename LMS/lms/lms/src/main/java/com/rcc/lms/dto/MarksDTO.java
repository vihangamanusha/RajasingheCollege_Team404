package com.rcc.lms.dto;

public class MarksDTO {

    private String studentId;
    private String subjectId;
    private String term;
    private int assignmentMark;

    public String getStudentId() {
        return studentId;
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

    // Getters & Setters
}