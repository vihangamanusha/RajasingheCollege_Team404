package com.rcc.lms.entity.student;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportId;

    private String term;
    private int totalMarks;
    private double average;
    private int rankPosition;
    private LocalDate generatedDate;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    // getters & setters

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks) {
        this.totalMarks = totalMarks;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public double getAverage() {
        return average;
    }

    public void setAverage(double average) {
        this.average = average;
    }

    public int getRankPosition() {
        return rankPosition;
    }

    public void setRankPosition(int rankPosition) {
        this.rankPosition = rankPosition;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public LocalDate getGeneratedDate() {
        return generatedDate;
    }

    public void setGeneratedDate(LocalDate generatedDate) {
        this.generatedDate = generatedDate;
    }
}