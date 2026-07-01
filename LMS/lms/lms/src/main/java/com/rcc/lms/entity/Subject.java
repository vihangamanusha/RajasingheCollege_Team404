package com.rcc.lms.entity;
import com.rcc.lms.entity.student.ClassEntity;

import jakarta.persistence.*;
import java.util.List;

@Entity(name = "CoreSubjectEntity")
@Table(name = "subject")
public class Subject {

    @Id
    @Column(name = "subject_id", length = 20)
    private String subjectId;

    @Column(name = "subject_name", nullable = false, length = 50)
    private String subjectName;

    // Many subjects can belong to one class
    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassEntity classEntity; // Use your actual Class entity name here

    // Many subjects can be taught by one teacher
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher; // Use your actual Teacher entity name here

    // =========================
    // GETTERS AND SETTERS
    // =========================
    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public ClassEntity getClassEntity() { return classEntity; }
    public void setClassEntity(ClassEntity classEntity) { this.classEntity = classEntity; }

    public Teacher getTeacher() { return teacher; }
    public void setTeacher(Teacher teacher) { this.teacher = teacher; }
}