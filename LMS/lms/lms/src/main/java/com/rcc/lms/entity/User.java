package com.rcc.lms.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity//this is a entity class
@Table(name = "users")
public class User {

    @Id//primary key
    @Column(name = "user_id", length = 20)
    private String userId;

    @Column(name = "username", unique = true, nullable = false, length = 50)
    private String username;//store login username, can be null

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role")
    private String role;

    // Sub role (Deputy Principal, Section Head, etc.)
    @Column(name = "sub_role")
    private String subRole;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "created_date")//add new coloum to get the date.
    private LocalDate createdDate;

    @Column(name = "status", length = 20)
    private String status;

    // ==========================================
    // NEW: AUDIT TRAIL FOR SOFT DELETE
    // Stores the admin's reason for deleting the user
    // ==========================================
    @Column(name = "deletion_note", length = 500)
    private String deletionNote;

    // ===== CONSTRUCTORS =====

    public User() {
    }

    public User(String userId, String username, String password, String role,
                String subRole, String email, LocalDate createdDate, String status, String deletionNote) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
        this.subRole = subRole;
        this.email = email;
        this.createdDate = createdDate;//add this new
        this.status = status;
        this.deletionNote = deletionNote; // Added to constructor
    }

    // ===== GETTERS AND SETTERS =====

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getSubRole() { return subRole; }
    public void setSubRole(String subRole) { this.subRole = subRole; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalDate getCreatedDate() { return createdDate; }//add this
    public void setCreatedDate(LocalDate createdDate) { this.createdDate = createdDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    // GETTER & SETTER FOR DELETION NOTE
    public String getDeletionNote() { return deletionNote; }
    public void setDeletionNote(String deletionNote) { this.deletionNote = deletionNote; }
}