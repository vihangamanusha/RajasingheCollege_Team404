package com.rcc.lms.dto;

public class SectionMarkDTO {
    private String studentId;
    private String studentName;
    private String className;
    private String subjectName;
    private Integer mark;

    public SectionMarkDTO(String studentId, String studentName, String className, String subjectName, Integer mark) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.className = className;
        this.subjectName = subjectName;
        this.mark = mark;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Integer getMark() {
        return mark;
    }

    public void setMark(Integer mark) {
        this.mark = mark;
    }
}
