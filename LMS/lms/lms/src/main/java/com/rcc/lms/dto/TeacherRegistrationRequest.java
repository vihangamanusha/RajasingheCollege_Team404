package com.rcc.lms.dto;

public class TeacherRegistrationRequest {
    // Auth
    private String userId;
    private String username;
    private String email;
    private String password;
    private String role;
    private String subRole; // Added this!

    // Profile
    private String fullName;
    private String subjectSpecialization;
    private String contactNumber;
    private String nic;

    // Getters and Setters
    public String getUserId() { return userId; } public void setUserId(String userId) { this.userId = userId; }
    public String getUsername() { return username; } public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; } public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; } public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; } public void setRole(String role) { this.role = role; }
    public String getSubRole() { return subRole; } public void setSubRole(String subRole) { this.subRole = subRole; } // Added!
    public String getFullName() { return fullName; } public void setFullName(String fullName) { this.fullName = fullName; }
    public String getSubjectSpecialization() { return subjectSpecialization; } public void setSubjectSpecialization(String subjectSpecialization) { this.subjectSpecialization = subjectSpecialization; }
    public String getContactNumber() { return contactNumber; } public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public String getNic() { return nic; } public void setNic(String nic) { this.nic = nic; }
}