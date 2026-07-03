package com.rcc.lms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "non_academic")
public class NonAcademic {

    @Id
    @Column(name = "non_academic_id", length = 20)
    private String nonAcademicId;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "contact_number", length = 15)
    private String contactNumber;

    @Column(name = "nic", length = 20, unique = true)
    private String nic;

    @Column(name = "designation", length = 50)
    private String designation;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "ACTIVE";

    @Column(name = "enroll_date", length = 20)
    private String enrollDate;

    @Column(name = "deletion_note", length = 500)
    private String deletionNote;

    // Getters and Setters
    public String getNonAcademicId() { return nonAcademicId; }
    public void setNonAcademicId(String nonAcademicId) { this.nonAcademicId = nonAcademicId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public String getNic() { return nic; }
    public void setNic(String nic) { this.nic = nic; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getEnrollDate() { return enrollDate; }
    public void setEnrollDate(String enrollDate) { this.enrollDate = enrollDate; }
    public String getDeletionNote() { return deletionNote; }
    public void setDeletionNote(String deletionNote) { this.deletionNote = deletionNote; }
}
