package com.rcc.lms.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "class") // This maps to your 'class' table in SQL
public class ClassEntity {

    @Id
    @Column(name = "class_id", length = 20)
    private String classId;

    @Column(name = "class_name", nullable = false, length = 50)
    private String className;

    @Column(name = "year")
    private Integer year;

    // A class has one lead teacher
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    // =========================
    // GETTERS AND SETTERS
    // =========================
    public String getClassId() { return classId; }
    public void setClassId(String classId) { this.classId = classId; }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public Teacher getTeacher() { return teacher; }
    public void setTeacher(Teacher teacher) { this.teacher = teacher; }
}