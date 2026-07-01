package com.rcc.lms.entity.student;

import jakarta.persistence.*;
import com.rcc.lms.entity.Teacher;
import java.time.LocalDate;

@Entity
@Table(name = "class")
public class ClassEntity {

    @Id
    @Column(name = "class_id")
    private String classId;

    @Column(name = "class_name")
    private String className;

    @Column(name = "year")
    private int year;

    @Column(name = "grade")
    private String grade;

    // DOB range that defines which student batch this class belongs to
    @Column(name = "dob_from")
    private LocalDate dobFrom;

    @Column(name = "dob_to")
    private LocalDate dobTo;

    // When true, the assigned teacher can also manage student assignment
    @Column(name = "assignment_open", nullable = false)
    private boolean assignmentOpen = false;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    // =========================
    // GETTERS & SETTERS
    // =========================

    public String getClassId() { return classId; }
    public void setClassId(String classId) { this.classId = classId; }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public LocalDate getDobFrom() { return dobFrom; }
    public void setDobFrom(LocalDate dobFrom) { this.dobFrom = dobFrom; }

    public LocalDate getDobTo() { return dobTo; }
    public void setDobTo(LocalDate dobTo) { this.dobTo = dobTo; }

    public boolean isAssignmentOpen() { return assignmentOpen; }
    public void setAssignmentOpen(boolean assignmentOpen) { this.assignmentOpen = assignmentOpen; }

    public Teacher getTeacher() { return teacher; }
    public void setTeacher(Teacher teacher) { this.teacher = teacher; }
}