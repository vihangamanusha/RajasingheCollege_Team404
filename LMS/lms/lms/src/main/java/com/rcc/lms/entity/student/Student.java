package com.rcc.lms.entity.student;

import com.rcc.lms.entity.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @Column(name = "student_id", length = 20)
    private String studentId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(length = 255)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Medium medium;

    @ManyToOne
    @JoinColumn(name = "class_id", referencedColumnName = "class_id")
    private ClassEntity classEntity;

    @Column(name = "contact_number", length = 15)
    private String contactNumber;

    // Constructors
    public Student() {}

    public Student(String studentId, User user, String fullName, LocalDate dateOfBirth, String address, Medium medium, ClassEntity classEntity, String contactNumber) {
        this.studentId = studentId;
        this.user = user;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.medium = medium;
        this.classEntity = classEntity;
        this.contactNumber = contactNumber;
    }

    // Getters and Setters
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Medium getMedium() { return medium; }
    public void setMedium(Medium medium) { this.medium = medium; }

    public ClassEntity getClassEntity() { return classEntity; }
    public void setClassEntity(ClassEntity classEntity) { this.classEntity = classEntity; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
}