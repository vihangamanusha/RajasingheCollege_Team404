package com.rcc.lms.entity.student;

import jakarta.persistence.*;
import com.rcc.lms.entity.Teacher; // Import your teacher entity

@Entity
@Table(name = "class") // Align this with your actual SQL table name
public class ClassEntity {

    @Id
    @Column(name = "class_id")
    private String classId;

    @Column(name = "class_name")
    private String className;

    @Column(name = "year")
    private int year;

    // ADD THIS: For your Admin Reports to track Teacher performance
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

    public Teacher getTeacher() { return teacher; }
    public void setTeacher(Teacher teacher) { this.teacher = teacher; }
}