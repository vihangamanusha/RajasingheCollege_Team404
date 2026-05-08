package com.rcc.lms.entity.student;

import jakarta.persistence.*;

@Entity
@Table(name = "student_class")
public class ClassEntity {

    @Id
    @Column(name = "class_id")
    private String classId;

    private String className;
    private int year;

    // getters & setters

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}