package com.rcc.lms.entity.student;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "report")
public class StudentReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Integer reportId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(name = "class_id", length = 20)
    private String classId;

    @Column(length = 20)
    private String term;

    @Column(name = "total_marks")
    private Integer totalMarks;

    @Column(precision = 5, scale = 2)
    private BigDecimal average;

    @Column(name = "rank_position")
    private Integer rankPosition;

    @Column(name = "generated_date")
    private LocalDate generatedDate;

    // Constructors
    public StudentReport() {}

    // Getters and Setters
    public Integer getReportId() { return reportId; }
    public void setReportId(Integer reportId) { this.reportId = reportId; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public String getClassId() { return classId; }
    public void setClassId(String classId) { this.classId = classId; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public Integer getTotalMarks() { return totalMarks; }
    public void setTotalMarks(Integer totalMarks) { this.totalMarks = totalMarks; }

    public BigDecimal getAverage() { return average; }
    public void setAverage(BigDecimal average) { this.average = average; }

    public Integer getRankPosition() { return rankPosition; }
    public void setRankPosition(Integer rankPosition) { this.rankPosition = rankPosition; }

    public LocalDate getGeneratedDate() { return generatedDate; }
    public void setGeneratedDate(LocalDate generatedDate) { this.generatedDate = generatedDate; }
}
