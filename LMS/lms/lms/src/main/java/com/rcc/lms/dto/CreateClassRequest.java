package com.rcc.lms.dto;

import java.time.LocalDate;

public class CreateClassRequest {
    private String grade;
    private String section;     // e.g. "A", "B", "C"
    private int year;
    private LocalDate dobFrom;
    private LocalDate dobTo;

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public LocalDate getDobFrom() { return dobFrom; }
    public void setDobFrom(LocalDate dobFrom) { this.dobFrom = dobFrom; }

    public LocalDate getDobTo() { return dobTo; }
    public void setDobTo(LocalDate dobTo) { this.dobTo = dobTo; }
}
