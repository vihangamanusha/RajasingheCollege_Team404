package com.rcc.lms.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "teacher")
public class Teacher {

    @Id
    @Column(name = "teacher_id", length = 20)
    private String teacherId;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "teacher", "student", "technicalOfficer"})
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    // This will now store multiple subjects as a comma-separated string (e.g., "Math, Science")
    @Column(name = "subject_specialization", length = 255)
    private String subjectSpecialization;

    // ADD THIS FIELD: To store the professional designation
    @Column(name = "sub_role", length = 100)
    private String subRole;

    @Column(name = "contact_number", length = 15)
    private String contactNumber;

    @Column(name = "nic", unique = true, length = 20)
    private String nic;

    // =========================
    // UPDATED GETTERS AND SETTERS
    // =========================
    public String getTeacherId() { return teacherId; }
    public void setTeacherId(String teacherId) { this.teacherId = teacherId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getSubjectSpecialization() { return subjectSpecialization; }
    public void setSubjectSpecialization(String subjectSpecialization) { this.subjectSpecialization = subjectSpecialization; }
    public String getSubRole() { return subRole; }
    public void setSubRole(String subRole) { this.subRole = subRole; }
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public String getNic() { return nic; }
    public void setNic(String nic) { this.nic = nic; }
}