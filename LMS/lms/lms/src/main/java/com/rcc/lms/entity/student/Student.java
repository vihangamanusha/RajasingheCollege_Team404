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
    @JoinColumn(name = "user_id", nullable = false, unique = true)
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
    @JoinColumn(name = "class_id")
    private ClassEntity classEntity;

    @Column(name = "contact_number", length = 15)
    private String contactNumber;

    @Column(name = "father_name", length = 100)
    private String fatherName;

    @Column(name = "mother_name", length = 100)
    private String motherName;

    @Column(name = "father_contact", length = 15)
    private String fatherContact;

    @Column(name = "mother_contact", length = 15)
    private String motherContact;

    @Column(name = "emergency_contact", length = 10)
    private String emergencyContact;

    // Constructors
    public Student() {}

    public Student(String studentId, User user, String fullName, LocalDate dateOfBirth,
                   String address, Medium medium, ClassEntity classEntity, String contactNumber) {
        this.studentId = studentId;
        this.user = user;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.medium = medium;
        this.classEntity = classEntity;
        this.contactNumber = contactNumber;
    }

    public Student(String studentId, User user, String fullName, LocalDate dateOfBirth,
                   String address, Medium medium, ClassEntity classEntity, String contactNumber,
                   String fatherName, String motherName, String fatherContact, String motherContact,
                   String emergencyContact) {
        this.studentId = studentId;
        this.user = user;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.medium = medium;
        this.classEntity = classEntity;
        this.contactNumber = contactNumber;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.fatherContact = fatherContact;
        this.motherContact = motherContact;
        this.emergencyContact = emergencyContact;
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

    public String getFatherName() { return fatherName; }
    public void setFatherName(String fatherName) { this.fatherName = fatherName; }

    public String getMotherName() { return motherName; }
    public void setMotherName(String motherName) { this.motherName = motherName; }

    public String getFatherContact() { return fatherContact; }
    public void setFatherContact(String fatherContact) { this.fatherContact = fatherContact; }

    public String getMotherContact() { return motherContact; }
    public void setMotherContact(String motherContact) { this.motherContact = motherContact; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
}