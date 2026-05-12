package com.rcc.lms.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(length = 20)
    private String userId;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    private String role;

    // Sub role (Deputy Principal, Section Head, etc.) — DB column: sub_role
    private String subRole;

    @Column(length = 100)
    private String email;

    private LocalDate createdDate;

    @Column(length = 20)
    private String status;

    // ===== CONSTRUCTORS =====
    public User() {}

    public User(String userId, String username, String password, String role,
                String subRole, String email, LocalDate createdDate, String status) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
        this.subRole = subRole;
        this.email = email;
        this.createdDate = createdDate;
        this.status = status;
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

    public LocalDate getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDate createdDate) { this.createdDate = createdDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}