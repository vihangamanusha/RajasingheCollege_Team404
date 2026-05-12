package com.rcc.lms.entity.student;

import jakarta.persistence.*;

@Entity
@Table(name = "class")
public class ClassEntity {

    @Id
    @Column(length = 20)
    private String classId;

    @Column(nullable = false, length = 50)
    private String className;

    @Column(nullable = false)
    private int year;

    @Column(length = 20)
    private String teacherId;

    // Constructors
    public ClassEntity() {}

    // Getters and Setters
    public String getClassId() { return classId; }
    public void setClassId(String classId) { this.classId = classId; }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getTeacherId() { return teacherId; }
    public void setTeacherId(String teacherId) { this.teacherId = teacherId; }
}