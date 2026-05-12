package com.rcc.lms.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

/**
 * Data Transfer Object for Student Registration.
 * Includes validation constraints to ensure data integrity.
 */
public class StudentRegistrationRequest {

    // --- Auth Fields (users table) ---

    @NotBlank(message = "Student ID is required")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Student ID must contain only letters and numbers (no symbols)")
    private String userId;

    @NotBlank(message = "Username is required")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Username must contain only letters and numbers (no symbols)")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email format (e.g., user@example.com)")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    private String role;

    // --- Profile Fields (student table) ---

    @NotBlank(message = "Full Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Full Name can only contain letters and spaces")
    private String fullName;

    @NotNull(message = "Date of Birth is required")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Address is required")
    @Pattern(regexp = "^[a-zA-Z0-9\\s,]+$", message = "Address can only contain letters, numbers, and commas")
    private String address;

    @NotBlank(message = "Contact Number is required")
    @Pattern(regexp = "^\\d+$", message = "Contact Number must contain only digits")
    private String contactNumber;

    @NotBlank(message = "Medium is required")
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