package com.rcc.lms.dto;

public class SubjectLowPerformerDTO {
    private String studentId;
    private String studentName;
    private String subjectName;
    private Integer mark;

    public SubjectLowPerformerDTO(String studentId, String studentName, String subjectName, Integer mark) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.subjectName = subjectName;
        this.mark = mark;
    }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public Integer getMark() { return mark; }
    public void setMark(Integer mark) { this.mark = mark; }
}
