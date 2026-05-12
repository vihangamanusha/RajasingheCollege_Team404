package com.rcc.lms.entity.student;

import jakarta.persistence.*;

@Entity
@Table(name = "subject")
public class Subject {

    @Id
    @Column(length = 20)
    private String subjectId;

    @Column(length = 50)
    private String subjectName;

    @Column(length = 20)
    private String classId;

    @Column(length = 20)
    private String teacherId;

    // Constructors
    public Subject() {}

    // Getters and Setters
    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getClassId() { return classId; }
    public void setClassId(String classId) { this.classId = classId; }

    public String getTeacherId() { return teacherId; }
    public void setTeacherId(String teacherId) { this.teacherId = teacherId; }
}