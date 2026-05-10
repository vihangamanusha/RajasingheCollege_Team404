package com.rcc.lms.dto;

public class TechRegistrationRequest {
    // Auth
    private String userId;
    private String username;
    private String email;
    private String password;
    private String role; // "ROLE_TECHNICAL_OFFICER"

    // Profile
    private String fullName;
    private String contactNumber;
    private String position;
    private String assignedArea;

    // Generate all standard Getters and Setters here!
    public String getUserId() { return userId; } public void setUserId(String userId) { this.userId = userId; }
    public String getUsername() { return username; } public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; } public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; } public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; } public void setRole(String role) { this.role = role; }
    public String getFullName() { return fullName; } public void setFullName(String fullName) { this.fullName = fullName; }
    public String getContactNumber() { return contactNumber; } public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public String getPosition() { return position; } public void setPosition(String position) { this.position = position; }
    public String getAssignedArea() { return assignedArea; } public void setAssignedArea(String assignedArea) { this.assignedArea = assignedArea; }
}