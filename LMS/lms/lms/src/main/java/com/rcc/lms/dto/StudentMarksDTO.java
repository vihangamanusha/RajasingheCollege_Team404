package com.rcc.lms.dto;

/**
 * DTO for returning marks data to the frontend.
 * Flattens the nested Subject object so the frontend receives
 * a simple "subjectName" string instead of a nested object.
 */
public class StudentMarksDTO {

    private Integer markId;
    private String subjectName;
    private String term;
    private Integer assignmentMark;

    public StudentMarksDTO() {}

    public StudentMarksDTO(Integer markId, String subjectName, String term, Integer assignmentMark) {
        this.markId = markId;
        this.subjectName = subjectName;
        this.term = term;
        this.assignmentMark = assignmentMark;
    }

    // Getters and Setters
    public Integer getMarkId() { return markId; }
    public void setMarkId(Integer markId) { this.markId = markId; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public Integer getAssignmentMark() { return assignmentMark; }
    public void setAssignmentMark(Integer assignmentMark) { this.assignmentMark = assignmentMark; }
}
