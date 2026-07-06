package com.rcc.lms.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore; // Added import!

@Entity
@Table(name = "technical_officer")
public class TechnicalOfficer {

    @Id
    @Column(name = "technical_officer_id", length = 20)
    private String technicalOfficerId;

    // ==========================================
    // @JsonIgnore stops the infinite JSON loop!
    // ==========================================
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "email", length = 100)
    private String profileEmail; // Using profileEmail to avoid confusion with Auth email

    @Column(name = "contact_number", length = 15)
    private String contactNumber;

    @Column(name = "position", length = 50)
    private String position;

    @Column(name = "assigned_area", length = 100)
    private String assignedArea;

    @Column(name = "nic", length = 20, unique = true)
    private String nic;

    // Getters and Setters
    public String getTechnicalOfficerId() { return technicalOfficerId; }
    public void setTechnicalOfficerId(String technicalOfficerId) { this.technicalOfficerId = technicalOfficerId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getProfileEmail() { return profileEmail; }
    public void setProfileEmail(String profileEmail) { this.profileEmail = profileEmail; }
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getAssignedArea() { return assignedArea; }
    public void setAssignedArea(String assignedArea) { this.assignedArea = assignedArea; }
    public String getNic() { return nic; }
    public void setNic(String nic) { this.nic = nic; }
}