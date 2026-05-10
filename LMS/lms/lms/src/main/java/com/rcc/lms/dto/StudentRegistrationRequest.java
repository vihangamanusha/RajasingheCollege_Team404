package com.rcc.lms.dto;

import java.time.LocalDate;

public class StudentRegistrationRequest {

    // --- Auth Fields (users table) ---
    private String userId;
    private String username;
    private String email;
    private String password;
    private String role;

    // --- Profile Fields (student table) ---
    private String fullName;
    private LocalDate dateOfBirth;
    private String address;
    private String contactNumber;
    private String medium;

    // ===== GETTERS AND SETTERS =====

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getMedium() { return medium; }
    public void setMedium(String medium) { this.medium = medium; }
}