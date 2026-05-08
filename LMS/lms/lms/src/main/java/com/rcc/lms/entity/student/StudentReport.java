package com.rcc.lms.entity.student;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "student_report")
public class StudentReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Integer reportId;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id", nullable = false)
    private Student student;

    @Column(length = 20)
    private String term;

    @Column(name = "attendance_percentage")
    private Double attendancePercentage;

    @Column(name = "overall_grade")
    private String overallGrade;

    @Column(name = "teacher_comments")
    private String teacherComments;

    @Column(name = "generated_date")
    private LocalDate generatedDate;

    // Constructors
    public StudentReport() {}

    // Getters and Setters
    public Integer getReportId() { return reportId; }
    public void setReportId(Integer reportId) { this.reportId = reportId; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public Double getAttendancePercentage() { return attendancePercentage; }
    public void setAttendancePercentage(Double attendancePercentage) { this.attendancePercentage = attendancePercentage; }

    public String getOverallGrade() { return overallGrade; }
    public void setOverallGrade(String overallGrade) { this.overallGrade = overallGrade; }

    public String getTeacherComments() { return teacherComments; }
    public void setTeacherComments(String teacherComments) { this.teacherComments = teacherComments; }

    public LocalDate getGeneratedDate() { return generatedDate; }
    public void setGeneratedDate(LocalDate generatedDate) { this.generatedDate = generatedDate; }
}
