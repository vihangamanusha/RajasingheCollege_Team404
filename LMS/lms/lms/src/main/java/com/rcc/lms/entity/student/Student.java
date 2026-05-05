package com.rcc.lms.entity.student;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @Column(name = "student_id")
    private String studentId;

    private String fullName;
    private LocalDate dateOfBirth;
    private String address;
    private String contactNumber;

    @Enumerated(EnumType.STRING)
    private Medium medium;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassEntity classEntity;

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Medium getMedium() {
        return medium;
    }

    public void setMedium(Medium medium) {
        this.medium = medium;
    }

    public ClassEntity getClassEntity() {
        return classEntity;
    }

    public void setClassEntity(ClassEntity classEntity) {
        this.classEntity = classEntity;
    }
}