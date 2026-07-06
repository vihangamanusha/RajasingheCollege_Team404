package com.rcc.lms.dto;

public class TeacherMarksDTO {

    private String studentId;
    private String subjectId;
    private String term;
    private int assignmentMark;
    private int academicYear;

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

    public int getAcademicYear() {
        return academicYear;
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
}