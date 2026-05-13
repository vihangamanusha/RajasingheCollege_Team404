package com.rcc.lms.dto; // Make sure this matches your package structure!

public class AdminSectionMarkDTO {
    private String studentName;
    private String subjectName;
    private Integer mark;

    // Constructor
    public AdminSectionMarkDTO(String studentName, String subjectName, Integer mark) {
        this.studentName = studentName;
        this.subjectName = subjectName;
        this.mark = mark;
    }

    // Getters and Setters
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public Integer getMark() { return mark; }
    public void setMark(Integer mark) { this.mark = mark; }
}