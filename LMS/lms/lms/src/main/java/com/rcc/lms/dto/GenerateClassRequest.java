package com.rcc.lms.dto;

import java.time.LocalDate;
import java.util.List;

public class GenerateClassRequest {

    private int grade;
    

    private LocalDate dobFrom;

    private LocalDate dobTo;

    private List<String> classSections;

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public LocalDate getDobFrom() {
        return dobFrom;
    }

    public void setDobFrom(LocalDate dobFrom) {
        this.dobFrom = dobFrom;
    }

    public LocalDate getDobTo() {
        return dobTo;
    }

    public void setDobTo(LocalDate dobTo) {
        this.dobTo = dobTo;
    }

    public List<String> getClassSections() {
        return classSections;
    }

    public void setClassSections(List<String> classSections) {
        this.classSections = classSections;
    }
}